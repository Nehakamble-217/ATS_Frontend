import React, { useState, useEffect, useCallback, useMemo } from "react";
import Calendar from "react-calendar";
import axios from "axios";
import {
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
  isSaturday,
  isSunday,
  startOfMonth,
  endOfMonth,
  subMonths,
  subYears,
  format,
  startOfDay,
  endOfDay,
  isWeekend,
  parseISO,
} from "date-fns";

import '../EmployeeSection/Attendence_sheet.css';
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";

const Attendance = () => {
  const { employeeId, userType } = useParams();
  const [attendanceData, setAttendanceData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showCustomDiv, setShowCustomDiv] = useState(false);
  const [showCalculation, setShowCalculation] = useState(false);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selectedRecruiters, setSelectedRecruiters] = useState([]);
  const [showFilterOptions, setShowFilterOptions] = useState(false);
  const [dateRange, setDateRange] = useState("");
  const [customStartDate, setCustomStartDate] = useState("");
  const [customEndDate, setCustomEndDate] = useState("");
  const [managers, setManagers] = useState([]);
  const [teamLeaders, setTeamLeaders] = useState([]);
  const [recruiters, setRecruiters] = useState([]);
  const [selectedManagers, setSelectedManagers] = useState([]);
  const [selectedTeamLeaders, setSelectedTeamLeaders] = useState([]);
  const [expandedManagerId, setExpandedManagerId] = useState(null);
  const [expandedTeamLeaderId, setExpandedTeamLeaderId] = useState(null);
  const [weekendCount, setWeekendCount] = useState(0);
  const [employeeCount, setEmployeeCount] = useState([]);
  const [activeFilterOption, setActiveFilterOption] = useState(null);
  const [selectedFilters, setSelectedFilters] = useState({});
  const [summary, setSummary] = useState({
    workingDays: 0,
    totalTarget: 0,
    totalWorkingHours: 0,
    archived: 0,
    pending: 0,
    present: 0,
    absent: 0,
    weekends: 0,
    achievementRate: "",
    performanceStatus: "",
  });
  const limitedOption = ["employeeName", "jobRole"];

  useEffect(() => {
    filterData();
  }, [selectedFilters]);
  const filterData = () => {
    let filteredData = [...attendanceData];
    Object.entries(selectedFilters).forEach(([option, values]) => {
      filteredData = filteredData.filter((item) =>
        values.some((value) =>
          item[option]?.toString().toLowerCase().includes(value.toLowerCase())
        )
      );
      setAttendanceData(filteredData);
    });
  };

  const handleDateRangeChange = (event) => {
    const selectedRange = event.target.value;
    setDateRange(selectedRange);

    const today = new Date();
    let start, end;

    switch (selectedRange) {
      case "currentMonth":
        start = startOfMonth(today);
        end = today;
        break;
      case "lastMonth":
        start = startOfMonth(subMonths(today, 1));
        end = endOfMonth(subMonths(today, 1));
        break;
      case "last3Months":
        start = startOfMonth(subMonths(today, 2));
        end = endOfMonth(today);
        break;
      case "last6Months":
        start = startOfMonth(subMonths(today, 5));
        end = endOfMonth(today);
        break;
      case "lastYear":
        start = startOfMonth(subYears(today, 1));
        end = today;
        break;
      case "custom":
        // Don't set dates for custom option
        return;
      default:
        return;
    }

    setStartDate(format(start, "yyyy-MM-dd"));
    setEndDate(format(end, "yyyy-MM-dd"));
    calculateWeekends(start, end);
  };

  const handleCustomStartDateChange = (event) => {
    const date = new Date(event.target.value);
    setCustomStartDate(event.target.value);
    setStartDate(format(startOfDay(date), "yyyy-MM-dd"));
  };

  const handleCustomEndDateChange = (event) => {
    const date = new Date(event.target.value);
    setCustomEndDate(event.target.value);
    setEndDate(format(endOfDay(date), "yyyy-MM-dd"));
  };

  useEffect(() => {
    const fetchManagerNames = async () => {
      try {
        const response = await axios.get(
          `http://93.127.199.85:9090/api/ats/157industries/get-all-managers`
        );
        setManagers(response.data);
      } catch (error) {
        console.error("Error fetching manager names:", error);
      }
    };

    if (userType === "SuperUser") {
      fetchManagerNames();
    } else if (userType === "Manager") {
      fetchTeamLeaderNames(employeeId);
    } else if (userType === "TeamLeader") {
      fetchRecruiterUnderTeamLeaderData(employeeId);
    }
  }, [userType, employeeId]);

  useEffect(() => {
    if (expandedManagerId != null) {
      fetchTeamLeaderNames(expandedManagerId);
    }
  }, [expandedManagerId]);

  useEffect(() => {
    if (expandedTeamLeaderId != null) {
      fetchRecruiterUnderTeamLeaderData(expandedTeamLeaderId);
    }
  }, [expandedTeamLeaderId]);

  const fetchTeamLeaderNames = async (id) => {
    try {
      const response = await axios.get(
        `http://93.127.199.85:9090/api/ats/157industries/tl-namesIds/${id}`
      );
      setTeamLeaders(response.data);
    } catch (error) {
      console.error("Error fetching team leader names:", error);
    }
  };

  const fetchRecruiterUnderTeamLeaderData = useCallback(async (id) => {
    try {
      const response = await axios.get(
        `http://93.127.199.85:9090/api/ats/157industries/employeeId-names/${id}`
      );
      setRecruiters(response.data);
    } catch (error) {
      console.error("Error fetching recruiter data:", error);
    }
  }, []);
  useEffect(() => {
    if (attendanceData.length > 0) {
      calculateSummary();
    }
  }, [attendanceData]);

  // const getMonthInterval = () => {
  //   const start = startOfMonth(new Date());
  //   const end = endOfMonth(new Date());
  //   return { start, end };
  // };

  const calculateWeekendsAndHolidays = (startDate, endDate) => {
    const interval = eachDayOfInterval({ start: startDate, end: endDate });
    let weekendCount = 0;
    let holidayCount = 0;

    interval.forEach((date) => {
      if (isSaturday(date) || isSunday(date)) {
        weekendCount++;
      }
      if (governmentHolidays.includes(format(date, "yyyy-MM-dd"))) {
        holidayCount++;
      }
    });
    return { weekendCount, holidayCount };
  };

  const fetchData = async (id, roles, startDate, endDate) => {
    try {
      const response = await fetch(
        `http://93.127.199.85:9090/api/ats/157industries/attendance-data/${id}/${roles}/${startDate}/${endDate}`
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setAttendanceData(data);
      console.log(data);
      setShowCalculation(true);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data 😒:", error);
      setError(error);
      setLoading(false);
    }
  };

  const handleStartDateChange = (e) => {
    setStartDate(e.target.value);
  };

  const handleEndDateChange = (e) => {
    setEndDate(e.target.value);
  };

  const calculateWeekends = (start, end) => {
    const interval = eachDayOfInterval({ start, end });
    const weekendCount = interval.filter(
      (date) => isSaturday(date) || isSunday(date)
    ).length;
    setWeekendCount(weekendCount);
  };
  const calculateSummary = () => {
    let workingDays = 0;
    let totalTarget = 0;
    let totalWorkingHours = 0;
    let archived = 0;
    let pending = 0;
    let present = 0;
    let absent = 0;
    let weekends = 0;

    attendanceData.forEach((data) => {
      const date = parseISO(data.date);
      if (isWeekend(date)) {
        weekends = weekendCount;
      } else {
        workingDays += 1;
        totalTarget += 10;
        totalWorkingHours += data.totalHoursWork || 0;
        archived += data.dailyArchived || 0;
        pending += data.dailyPending || 0;
        if (data.dayPresentStatus === "Present") {
          present += 1;
        } else {
          absent += 1;
        }
      }
    });

    const calculatedWorkingHours = workingDays * 8;
    const { status, achievementRate } = categorizePerformance(
      totalTarget,
      archived
    );
    setSummary({
      workingDays,
      totalTarget,
      totalWorkingHours: calculatedWorkingHours,
      archived,
      pending,
      present,
      absent,
      weekends,
      achievementRate,
      performanceStatus: status,
    });
  };

  const showDataReport = async () => {
    if (
      selectedManagers.length === 0 &&
      selectedTeamLeaders.length === 0 &&
      selectedRecruiters.length === 0 &&
      userType === "SuperUser"
    ) {
      toast.error("Please Select At Least One Manager/TeamLeader/Recruiter");
    }

    if (
      userType === "Manager" &&
      selectedTeamLeaders.length === 0 &&
      selectedRecruiters.length === 0
    ) {
      toast.error("Please Select At Least One TeamLeader/Recruiter");
      return;
    }

    if (userType === "TeamLeader" && selectedRecruiters.length === 0) {
      toast.error("Please Select At Least 1 Recruiter");
      return;
    }

    if (dateRange === "") {
      toast.error("Please Select Date");
      return;
    }
    let ids;
    let role;
    if (selectedManagers.length > 0) {
      ids = selectedManagers.map((manager) => manager.managerId).join(","); // Join IDs with commas
      role = selectedManagers[0].managerJobRole;
    } else if (selectedTeamLeaders.length > 0) {
      ids = selectedTeamLeaders
        .map((teamLeader) => teamLeader.teamLeaderId)
        .join(","); // Join IDs with commas
      role = selectedTeamLeaders[0].teamLeaderJobRole;
    } else {
      ids = selectedRecruiters
        .map((recruiter) => recruiter.recruiterId)
        .join(","); // Join IDs with commas
      role = selectedRecruiters[0].recruiterJobRole;
    }
    fetchData(ids, role, startDate, endDate);
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const fetchEmployeeCount = async (ids, role) => {
    try {
      const response = await axios.get(
        `http://93.127.199.85:9090/api/ats/157industries/head-count/${role}/${ids}`
      );
      setEmployeeCount(response.data);
    } catch (error) { }
  };

  useEffect(() => {
    if (userType) {
      fetchEmployeeCount(employeeId, userType);
    }
    if (selectedManagers.length > 0) {
      const ids = selectedManagers
        .map((manager) => manager.managerId)
        .join(","); // Join IDs with commas
      const role = selectedManagers[0].managerJobRole; // Assuming all selected managers have the same role

      fetchEmployeeCount(ids, role);
    } else if (selectedTeamLeaders.length > 0) {
      const ids = selectedTeamLeaders
        .map((teamLeader) => teamLeader.teamLeaderId)
        .join(","); // Join IDs with commas
      const role = selectedTeamLeaders[0].teamLeaderJobRole; // Assuming all selected managers have the same role

      fetchEmployeeCount(ids, role);
    }
  }, [selectedManagers, selectedTeamLeaders]); // Dependency array to run effect on selectedManagers change

  const handleManagerCheckboxChange = (manager) => {
    setSelectedManagers((prev) =>
      prev.some((item) => item.managerId === manager.managerId)
        ? prev.filter((item) => item.managerId !== manager.managerId)
        : [
          ...prev,
          {
            managerId: manager.managerId,
            managerJobRole: manager.jobRole,
          },
        ]
    );
  };

  const getStatusClassName = (status) => {
    switch (status) {
      case "Poor":
        return "status-poor";
      case "Average":
        return "status-average";
      case "Yellow":
        return "status-yellow";
      case "Green":
        return "status-green";
      default:
        return ""; // Default class if status does not match
    }
  };

  const handleMouseOver = (event) => {
    const tableData = event.currentTarget;
    const tooltip = tableData.querySelector(".tooltip");
    const tooltiptext = tableData.querySelector(".tooltiptext");

    if (tooltip && tooltiptext) {
      const textOverflowing =
        tableData.offsetWidth < tableData.scrollWidth ||
        tableData.offsetHeight < tableData.scrollHeight;
      if (textOverflowing) {
        const rect = tableData.getBoundingClientRect();
        tooltip.style.top = `${rect.top - 10}px`;
        tooltip.style.left = `${rect.left + rect.width / 100}px`;
        tooltip.style.visibility = "visible";
      } else {
        tooltip.style.visibility = "hidden";
      }
    }
  };

  const handleMouseOut = (event) => {
    const tooltip = event.currentTarget.querySelector(".tooltip");
    if (tooltip) {
      tooltip.style.visibility = "hidden";
    }
  };

  const handleTeamLeaderCheckboxChange = (teamLeader) => {
    setSelectedTeamLeaders((prev) =>
      prev.some((item) => item.teamLeaderId === teamLeader.teamLeaderId)
        ? prev.filter((item) => item.teamLeaderId !== teamLeader.teamLeaderId)
        : [
          ...prev,
          {
            teamLeaderId: teamLeader.teamLeaderId,
            teamLeaderJobRole: teamLeader.jobRole,
          },
        ]
    );
  };

  const handleRecruiterCheckboxChange = (recruiter) => {
    setSelectedRecruiters((prev) =>
      prev.some((item) => item.recruiterId === recruiter.employeeId)
        ? prev.filter((item) => item.recruiterId !== recruiter.employeeId)
        : [
          ...prev,
          {
            recruiterId: recruiter.employeeId,
            recruiterJobRole: recruiter.jobRole,
          },
        ]
    );
  };
  const formatOption = (option) => {
    return option
      .split("")
      .map((char, index) => {
        if (index === 0) {
          return char.toUpperCase();
        } else if (char === char.toUpperCase()) {
          return " " + char;
        } else {
          return char;
        }
      })
      .join("");
  };

  const toggleManagerExpand = (managerId) => {
    setExpandedManagerId(expandedManagerId === managerId ? null : managerId);
    setExpandedTeamLeaderId(null); // Close any open team leaders when a new manager is expanded
  };

  const toggleTeamLeaderExpand = (teamLeaderId) => {
    setExpandedTeamLeaderId(
      expandedTeamLeaderId === teamLeaderId ? null : teamLeaderId
    );
  };

  const renderManagers = () => {
    return managers.map((manager) => (
      <div key={manager.managerId} className="dropdown-section">
        <div className="PI-dropdown-row">
          <input
            type="checkbox"
            checked={selectedManagers.some(
              (item) => item.managerId === manager.managerId
            )}
            onChange={() => handleManagerCheckboxChange(manager)}
          />
          <label
            className="clickable-label"
            onClick={() => toggleManagerExpand(manager.managerId)}
          >
            {manager.managerName}
            <i
              className={`fa-solid ${expandedManagerId === manager.managerId
                ? "fa-angle-up"
                : "fa-angle-down"
                }`}
            ></i>
          </label>
        </div>
        {expandedManagerId === manager.managerId && (
          <div className="PI-dropdown-column ">
            {renderTeamLeaders(manager.managerId)}
          </div>
        )}
      </div>
    ));
  };

  const renderTeamLeaders = (managerId) => {
    return teamLeaders.map((teamLeader) => (
      <div key={teamLeader.teamLeaderId} className="PI-dropdown-section">
        <div className="PI-dropdown-row">
          <input
            type="checkbox"
            checked={selectedTeamLeaders.some(
              (item) => item.teamLeaderId === teamLeader.teamLeaderId
            )}
            onChange={() => handleTeamLeaderCheckboxChange(teamLeader)}
          />
          <label
            className="clickable-label"
            onClick={() => toggleTeamLeaderExpand(teamLeader.teamLeaderId)}
          >
            {teamLeader.teamLeaderName}
            <i
              className={`fa-solid ${expandedTeamLeaderId === teamLeader.teamLeaderId
                ? "fa-angle-up"
                : "fa-angle-down"
                }`}
            ></i>
          </label>
        </div>
        {expandedTeamLeaderId === teamLeader.teamLeaderId && (
          <div className="PI-dropdown-column ">{renderRecruiters()}</div>
        )}
      </div>
    ));
  };

  const renderRecruiters = () => {
    return recruiters.map((recruiter) => (
      <div key={recruiter.employeeId} className="PI-dropdown-row">
        <input
          type="checkbox"
          checked={selectedRecruiters.some(
            (item) => item.recruiterId === recruiter.employeeId
          )}
          onChange={() => handleRecruiterCheckboxChange(recruiter)}
        />
        <label>{recruiter.employeeName}</label>
      </div>
    ));
  };
  const handleFilterSelect = (option, value) => {
    setSelectedFilters((prevFilters) => {
      const updatedFilters = { ...prevFilters };
      if (!updatedFilters[option]) {
        updatedFilters[option] = [];
      }

      const index = updatedFilters[option].indexOf(value);
      if (index === -1) {
        updatedFilters[option] = [...updatedFilters[option], value];
      } else {
        updatedFilters[option] = updatedFilters[option].filter(
          (item) => item !== value
        );
      }

      return updatedFilters;
    });
  };
  const handleFilterOptionClick = (option) => {
    if (activeFilterOption === option) {
      setActiveFilterOption(null); // Hide if already active
    } else {
      setActiveFilterOption(option); // Show selected option
    }
  };

  const categorizePerformance = (target, achieved) => {
    const achievementRate = (achieved / target) * 100;

    let status;
    if (achievementRate > 80) {
      status = "Green";
    } else if (achievementRate >= 61) {
      status = "Yellow";
    } else if (achievementRate >= 26) {
      status = "Average";
    } else {
      status = "Poor";
    }

    return {
      status,
      achievementRate: achievementRate.toFixed(2) + "%",
    };
  };

  return (
    <div>
      <div className="PI-full-width PI-half-height">
        <div className="PI-container">
          <div className="PI-dropdown-container-main">
            <div className="PI-header">{userType}</div>
            <div className="PI-dropdown-container">
              <div className="PI-Dropdown" onClick={toggleDropdown}>
                {userType === "SuperUser" && <span>Select  Manager</span>}
                {userType === "Manager" && <span>Select Team Leader</span>}
                {userType === "TeamLeader" && <span>Select Recruiters</span>}
                <span className={`dropdown-icon`} />
                <i
                  className={`fa-solid ${dropdownOpen ? "fa-angle-up" : "fa-angle-down"
                    }`}
                ></i>
              </div>
              {dropdownOpen && (
                <div className="PI-dropdown-content">
                  {userType === "SuperUser" && renderManagers()}
                  {userType === "Manager" && renderTeamLeaders(employeeId)}
                  {userType === "TeamLeader" && renderRecruiters(employeeId)}
                  <button
                    onClick={() => setDropdownOpen(false)}
                    className="PI-Ok"
                  >
                    Ok
                  </button>
                  <button
                    onClick={() => {
                      setSelectedManagers([]);
                      setTeamLeaders([]);
                      setRecruiters([]);
                    }}
                    className="PI-reset"
                  >
                    Reset
                  </button>
                </div>
              )}
            </div>
            <div className="PI-Count">
              {userType === "SuperUser" && (
                <>
                  <p>
                    Manager Count :{" "}
                    {selectedManagers.length || employeeCount.managerCount}
                  </p>
                  <p>
                    TeamLeader Count :{" "}
                    {employeeCount.teamLeaderCount ||
                      selectedTeamLeaders.length}
                  </p>
                  <p>Recruiter Count : {employeeCount.employeeCount}</p>
                </>
              )}
              {userType === "Manager" && (
                <>
                  <p>
                    TeamLeader Count :{" "}
                    {selectedTeamLeaders.length ||
                      employeeCount.teamLeaderCount}
                  </p>
                  <p>Recruiter  Count : {employeeCount.employeeCount}</p>
                </>
              )}
              {userType === "TeamLeader" && (
                <>
                  <p>Recruiter Count : {employeeCount.employeeCount}</p>
                </>
              )}
            </div>
            {showCalculation && (
              <div className="PI-table-container">
                <table className="summary-table" >
                  <tbody >
                    <tr >
                      <td className="text-gray">Working Days</td>
                      <td className="text-gray">{summary.workingDays}</td>
                      <td className="text-gray">Total Working Hours</td>
                      <td className="text-gray">{summary.totalWorkingHours}</td>
                    </tr>
                    <tr>
                      <td className="text-gray">Total Target</td>
                      <td className="text-gray">{summary.totalTarget}</td>
                      <td className="text-gray">Weekends</td>
                      <td className="text-gray">{summary.weekends}</td>
                    </tr>
                    <tr>
                      <td className="text-gray">Archived</td>
                      <td className="text-gray">{summary.archived}</td>
                      <td className="text-gray">Pending</td>
                      <td className="text-gray">{summary.pending}</td>
                    </tr>
                    <tr>
                      <td className="text-gray">Present</td>
                      <td className="text-gray">{summary.present}</td>
                      <td className="text-gray">Absent</td>
                      <td className="text-gray">{summary.absent}</td>
                    </tr>

                  </tbody>
                </table>
              </div>
            )}
          </div>

          <div className="PI-attendance-form">
            <div className="PI-radio-buttons">
              <label className="PI-radio-label">
                <input
                  type="radio"
                  id="currentMonth"
                  name="dateRange"
                  value="currentMonth"
                  checked={dateRange === "currentMonth"}
                  onChange={handleDateRangeChange}
                  className="form-radio"
                />
                <span>Current Month</span>
              </label>
              <label className="PI-radio-label">
                <input
                  type="radio"
                  id="lastMonth"
                  name="dateRange"
                  value="lastMonth"
                  checked={dateRange === "lastMonth"}
                  onChange={handleDateRangeChange}
                  className="form-radio"
                />
                <span>Last Month</span>
              </label>
              <label className="PI-radio-label">
                <input
                  type="radio"
                  id="last3Months"
                  name="dateRange"
                  value="last3Months"
                  checked={dateRange === "last3Months"}
                  onChange={handleDateRangeChange}
                  className="form-radio"
                />
                <span>Last 3 Months</span>
              </label>
              <label className="PI-radio-label">
                <input
                  type="radio"
                  id="last6Months"
                  name="dateRange"
                  value="last6Months"
                  checked={dateRange === "last6Months"}
                  onChange={handleDateRangeChange}
                  className="form-radio"
                />
                <span>Last 6 Months</span>
              </label>
              <label className="PI-radio-label">
                <input
                  type="radio"
                  id="lastYear"
                  name="dateRange"
                  value="lastYear"
                  checked={dateRange === "lastYear"}
                  onChange={handleDateRangeChange}
                  className="form-radio"
                />
                <span>Last 1 Year</span>
              </label>
              <label className="PI-radio-label">
                <input
                  type="radio"
                  id="custom"
                  name="dateRange"
                  value="custom"
                  checked={dateRange === "custom"}
                  onChange={handleDateRangeChange}
                  className="form-radio"
                />
                <span>Custom Date</span>
              </label>
            </div>
            {dateRange === "custom" && (
              <div className="PI-date-inputs">
                <input
                  type="date"
                  value={customStartDate}
                  onChange={handleCustomStartDateChange}
                  className="PI-date-input"
                />
                <input
                  type="date"
                  value={customEndDate}
                  onChange={handleCustomEndDateChange}
                  className="PI-date-input"
                />
              </div>
            )}
  
            <div className="PI-filters" >
              <button className="PI-attendence-btn" onClick={showDataReport}>
                Get Attendance
              </button>
              <div>
                <button
                  className="PI-attendence-btn"
                  onClick={() => {
                    setShowFilterOptions(!showFilterOptions);
                  }}
                >
                  Filter
                </button>
              </div>
              {showFilterOptions && (
                <div className="PI-filter-options-container">
                  {limitedOption.map((option) => {
                    const uniqueValues = Array.from(
                      new Set(attendanceData.map((item) => item[option]))
                    );
                    return (
                      <div key={option} className="filter-option">
                        <button
                          className="PI-white-Btn"
                          onClick={() => handleFilterOptionClick(option)}
                        >
                          {formatOption(option)}
                          <span className="PI-filter-icon">&#x25bc;</span>
                        </button>
                        {activeFilterOption === option && (
                          <div className="PI-option-filter">
                            <div className="PI-optionDiv">
                              {uniqueValues.map((value) => (
                                <label
                                  key={value}
                                  className="selfcalling-filter-value"
                                >
                                  <input
                                    type="checkbox"
                                    checked={
                                      selectedFilters[option]?.includes(
                                        value
                                      ) || false
                                    }
                                    onChange={() =>
                                      handleFilterSelect(option, value)
                                    }
                                  />
                                  {value}
                                </label>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
            
            <div
              className={`${getStatusClassName(
                summary.performanceStatus
              )}`}
              id="total-Performance-percentage"
            >
              <p>Achievement Rate</p>
              <p>{summary.achievementRate}</p>
              <p>Performance Status</p> -
              <p>{summary.performanceStatus}</p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="PI-attendance-container">
        <table className="PI-attendance-table">
          <thead className="PI-attendancerows-head" >
              <th className="PI-attendanceheading">Sr No</th>
              <th className="PI-attendanceheading">Working Date</th>
              <th className="PI-attendanceheading">Employee Name</th>
              <th className="PI-attendanceheading">Job Role</th>
              <th className="PI-attendanceheading">Login Time</th>
              <th className="PI-attendanceheading">Late Mark</th>
              <th className="PI-attendanceheading">Calling Count</th>
              <th className="PI-attendanceheading">Target</th>
              <th className="PI-attendanceheading">Archived</th>
              <th className="PI-attendanceheading">Pending</th>
              <th className="PI-attendanceheading">Leave Type</th>
              <th className="PI-attendanceheading">Half Days</th>
              <th className="PI-attendanceheading">Holiday Leave</th>
              <th className="PI-attendanceheading">Work Type</th>
              <th className="PI-attendanceheading">Day Status</th>
              <th className="PI-attendanceheading">Working Hours</th>
              <th className="PI-attendanceheading">Logout Time</th>
              <th className="PI-attendanceheading">Employee Id</th>
              <th className="PI-attendanceheading">Team Leader Id</th>
          </thead>
          <tbody>
            {attendanceData.map((data, index) => (
              <tr key={data.workId} className="PI-attendancerows">
                <td
                  className="tabledata"
                  onMouseOver={handleMouseOver}
                  onMouseOut={handleMouseOut}
                >
                  {index + 1}
                  <div className="tooltip">
                    <span className="tooltiptext">{index + 1}</span>
                  </div>
                </td>
                <td
                  className="tabledata"
                  onMouseOver={handleMouseOver}
                  onMouseOut={handleMouseOut}
                >
                  {data.date}
                  <div className="tooltip">
                    <span className="tooltiptext">{data.date}</span>
                  </div>
                </td>
                <td
                  className="tabledata"
                  onMouseOver={handleMouseOver}
                  onMouseOut={handleMouseOut}
                >
                  {data.employeeName}
                  <div className="tooltip">
                    <span className="tooltiptext">{data.employeeName}</span>
                  </div>
                </td>
                <td
                  className="tabledata"
                  onMouseOver={handleMouseOver}
                  onMouseOut={handleMouseOut}
                >
                  {data.jobRole}
                  <div className="tooltip">
                    <span className="tooltiptext">{data.jobRole}</span>
                  </div>
                </td>
                <td
                  className="tabledata"
                  onMouseOver={handleMouseOver}
                  onMouseOut={handleMouseOut}
                >
                  {data.loginTime}
                  <div className="tooltip">
                    <span className="tooltiptext">{data.loginTime}</span>
                  </div>
                </td>
                <td
                  className="tabledata"
                  onMouseOver={handleMouseOver}
                  onMouseOut={handleMouseOut}
                >
                  {data.lateMark}
                  <div className="tooltip">
                    <span className="tooltiptext">{data.lateMark}</span>
                  </div>
                </td>
                <td
                  className="tabledata"
                  onMouseOver={handleMouseOver}
                  onMouseOut={handleMouseOut}
                >
                  {data.callingCount}
                  <div className="tooltip">
                    <span className="tooltiptext">{data.callingCount}</span>
                  </div>
                </td>
                <td
                  className="tabledata"
                  onMouseOver={handleMouseOver}
                  onMouseOut={handleMouseOut}
                >
                  {data.dailyTarget}
                  <div className="tooltip">
                    <span className="tooltiptext">{data.dailyTarget}</span>
                  </div>
                </td>
                <td
                  className="tabledata"
                  onMouseOver={handleMouseOver}
                  onMouseOut={handleMouseOut}
                >
                  {data.dailyArchived}
                  <div className="tooltip">
                    <span className="tooltiptext">{data.dailyArchived}</span>
                  </div>
                </td>
                <td
                  className="tabledata"
                  onMouseOver={handleMouseOver}
                  onMouseOut={handleMouseOut}
                >
                  {data.dailyPending}
                  <div className="tooltip">
                    <span className="tooltiptext">{data.dailyPending}</span>
                  </div>
                </td>
                <td
                  className="tabledata"
                  onMouseOver={handleMouseOver}
                  onMouseOut={handleMouseOut}
                >
                  {data.leaveType}
                  <div className="tooltip">
                    <span className="tooltiptext">{data.leaveType}</span>
                  </div>
                </td>
                <td
                  className="tabledata"
                  onMouseOver={handleMouseOver}
                  onMouseOut={handleMouseOut}
                >
                  {data.halfDay}
                  <div className="tooltip">
                    <span className="tooltiptext">{data.halfDay}</span>
                  </div>
                </td>
                <td
                  className="tabledata"
                  onMouseOver={handleMouseOver}
                  onMouseOut={handleMouseOut}
                >
                  {data.holidayLeave}
                  <div className="tooltip">
                    <span className="tooltiptext">{data.holidayLeave}</span>
                  </div>
                </td>
                <td
                  className="tabledata"
                  onMouseOver={handleMouseOver}
                  onMouseOut={handleMouseOut}
                >
                  {data.remoteWork}
                  <div className="tooltip">
                    <span className="tooltiptext">{data.remoteWork}</span>
                  </div>
                </td>
                <td
                  className="tabledata"
                  onMouseOver={handleMouseOver}
                  onMouseOut={handleMouseOut}
                >
                  {data.dayPresentStatus}
                  <div className="tooltip">
                    <span className="tooltiptext">{data.dayPresentStatus}</span>
                  </div>
                </td>
                {/* <td
                    className="tabledata"
                    onMouseOver={handleMouseOver}
                    onMouseOut={handleMouseOut}
                  >
                    <button>Breaks</button>
                  </td> */}
                <td
                  className="tabledata"
                  onMouseOver={handleMouseOver}
                  onMouseOut={handleMouseOut}
                >
                  {data.totalHoursWork}
                  <div className="tooltip">
                    <span className="tooltiptext">{data.totalHoursWork}</span>
                  </div>
                </td>
                <td
                  className="tabledata"
                  onMouseOver={handleMouseOver}
                  onMouseOut={handleMouseOut}
                >
                  {data.logoutTime}
                  <div className="tooltip">
                    <span className="tooltiptext">{data.logoutTime}</span>
                  </div>
                </td>
                <td
                  className="tabledata"
                  onMouseOver={handleMouseOver}
                  onMouseOut={handleMouseOut}
                >
                  {data.employeeId}
                  <div className="tooltip">
                    <span className="tooltiptext">{data.employeeId}</span>
                  </div>
                </td>
                <td
                  className="tabledata"
                  onMouseOver={handleMouseOver}
                  onMouseOut={handleMouseOut}
                >
                  {data.teamLeader}
                  <div className="tooltip">
                    <span className="tooltiptext">{data.teamLeader}</span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Attendance;
