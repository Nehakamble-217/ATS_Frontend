import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./holdCandidate.css";
import UpdateCallingTracker from "../EmployeeSection/UpdateSelfCalling";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import HashLoader from "react-spinners/HashLoader";
// SwapnilRokade_HoldCandidate_ModifyFilters_47to534_11/07
const HoldCandidate = ({
  updateState,
  funForGettingCandidateId,
  loginEmployeeName,
}) => {
  const [showHoldData, setShowHoldData] = useState([]);
  const [showUpdateCallingTracker, setShowUpdateCallingTracker] =
    useState(false);
  const [selectedCandidateId, setSelectedCandidateId] = useState(null);
  const [showFilterSection, setShowFilterSection] = useState(false);
  const [filterOptions, setFilterOptions] = useState([]);
  const [showSearchBar, setShowSearchBar] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortCriteria, setSortCriteria] = useState(null);
  const [sortOrder, setSortOrder] = useState("asc");
  const [callingList, setCallingList] = useState([]);
  const [filteredCallingList, setFilteredCallingList] = useState([]);
  const [showCallingForm, setShowCallingForm] = useState(false);
  const [callingToUpdate, setCallingToUpdate] = useState(null);
  const [selectedFilters, setSelectedFilters] = useState({});
  const [activeFilterOption, setActiveFilterOption] = useState(null);
  const [fetchTeamleader, setFetchTeamleader] = useState([]); //akash_pawar_SelectedCandidate_ShareFunctionality_16/07_30
  const [recruiterUnderTeamLeader, setRecruiterUnderTeamLeader] = useState([]); //akash_pawar_SelectedCandidate_ShareFunctionality_16/07_31
  const [showShareButton, setShowShareButton] = useState(true);
  const [selectedEmployeeId, setSelectedEmployeeId] = useState(null);
  const [selectedRows, setSelectedRows] = useState([]);
  const [allSelected, setAllSelected] = useState(false); // New state to track if all rows are selected
  const [showForwardPopup, setShowForwardPopup] = useState(false);
  const [loading, setLoading] = useState(true);
  let [color, setColor] = useState("#ffcb9b");
  const { employeeId } = useParams();
  const newEmployeeId = parseInt(employeeId, 10);

  //akash_pawar_SelectedCandidate_ShareFunctionality_16/07_43
  const [selectedTeamLeader, setSelectedTeamLeader] = useState({
    teamLeaderId: "",
    teamLeaderJobRole: "",
  });

  const [selectedRecruiters, setSelectedRecruiters] = useState({
    index: "",
    recruiterId: "",
    recruiterJobRole: "",
  });
  //akash_pawar_SelectedCandidate_ShareFunctionality_16/07_52

  const navigator = useNavigate();
  const limitedOptions = [
    "alternateNumber",
    "availabilityForInterview",
    "callingFeedback",
    "callingTrackerId",
    "candidateAddedTime",
    "candidateEmail",
    "candidateId",
    "candidateName",
    "communicationRating",
    "companyName",
    "contactNumber",
    "currentCtcLakh",
    "currentCtcThousand",
    "currentLocation",
    "date",
    "dateOfBirth",
    "empId",
    "expectedCtcLakh",
    "expectedCtcThousand",
    "experienceMonth",
    "experienceYear",
    "extraCertification",
    "feedBack",
    "finalStatus",
    "fullAddress",
    "gender",
    "holdingAnyOffer",
    "incentive",
    "interviewTime",
    "jobDesignation",
    "msgForTeamLeader",
    "noticePeriod",
    "offerLetterMsg",
    "oldEmployeeId",
    "qualification",
    "recruiterName",
    "relevantExperience",
    "requirementCompany",
    "requirementId",
    "selectYesOrNo",
    "sourceName",
    "yearOfPassing",
  ];
  const { userType } = useParams();
  //akash_pawar_SelectedCandidate_ShareFunctionality_16/07_100
  useEffect(() => {
    if (userType === "Manager") {
      fetchTeamLeader();
    }
    fetchHoldCandidateData();
  }, []);

  const fetchTeamLeader = async () => {
    try {
      const response = await fetch(
        `http://192.168.1.46:9090/api/ats/157industries/tl-namesIds/${employeeId}`
      );
      const data = await response.json();
      setFetchTeamleader(data);
    } catch (error) {
      console.error("Error fetching shortlisted data:", error);
    }
  };
  const fetchRecruiters = async (teamLeaderId) => {
    try {
      const response = await fetch(
        `http://192.168.1.46:9090/api/ats/157industries/employeeId-names/${teamLeaderId}`
      );
      const data = await response.json();
      setRecruiterUnderTeamLeader(data);
    } catch (error) {
      console.error("Error fetching shortlisted data:", error);
    }
  };
  useEffect(() => {
    if (selectedTeamLeader.teamLeaderId != "") {
      fetchRecruiters(selectedTeamLeader.teamLeaderId);
    }
    if (userType === "TeamLeader") {
      fetchRecruiters(employeeId);
    }
  }, [selectedTeamLeader]);
  //akash_pawar_SelectedCandidate_ShareFunctionality_16/07_137

  useEffect(() => {
    const options = Object.keys(filteredCallingList[0] || {}).filter((key) =>
      limitedOptions.includes(key)
    );
    setFilterOptions(options);
  }, [filteredCallingList]);

  useEffect(() => {}, [selectedFilters]);

  useEffect(() => {}, [filteredCallingList]);

  useEffect(() => {
    setFilterOptions(limitedOptions);
  }, [callingList]);

  const fetchHoldCandidateData = async () => {
    try {
      const response = await fetch(
        `http://192.168.1.46:9090/api/ats/157industries/hold-candidate/${employeeId}/${userType}`
      );
      const data = await response.json();
      setCallingList(data);
      setFilteredCallingList(data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching hold candidate data:", error);
      setLoading(false);
    }
  };
  useEffect(() => {
    filterData();
  }, [selectedFilters, callingList]);

  useEffect(() => {
    const filtered = callingList.filter((item) => {
      const searchTermLower = searchTerm.toLowerCase();
      return (
        (item.date && item.date.toLowerCase().includes(searchTermLower)) ||
        (item.recruiterName &&
          item.recruiterName.toLowerCase().includes(searchTermLower)) ||
        (item.candidateName &&
          item.candidateName.toLowerCase().includes(searchTermLower)) ||
        (item.candidateEmail &&
          item.candidateEmail.toLowerCase().includes(searchTermLower)) ||
        (item.contactNumber &&
          item.contactNumber.toString().includes(searchTermLower)) ||
        (item.alternateNumber &&
          item.alternateNumber.toString().includes(searchTermLower)) ||
        (item.sourceName &&
          item.sourceName.toLowerCase().includes(searchTermLower)) ||
        (item.requirementId &&
          item.requirementId
            .toString()
            .toLowerCase()
            .includes(searchTermLower)) ||
        (item.requirementCompany &&
          item.requirementCompany.toLowerCase().includes(searchTermLower)) ||
        (item.communicationRating &&
          item.communicationRating.toLowerCase().includes(searchTermLower)) ||
        (item.currentLocation &&
          item.currentLocation.toLowerCase().includes(searchTermLower)) ||
        (item.personalFeedback &&
          item.personalFeedback.toLowerCase().includes(searchTermLower)) ||
        (item.callingFeedback &&
          item.callingFeedback.toLowerCase().includes(searchTermLower)) ||
        (item.selectYesOrNo &&
          item.selectYesOrNo.toLowerCase().includes(searchTermLower))
      );
    });
    setFilteredCallingList(filtered);
  }, [searchTerm, callingList]);

  useEffect(() => {
    if (sortCriteria) {
      const sortedList = [...filteredCallingList].sort((a, b) => {
        const aValue = a[sortCriteria];
        const bValue = b[sortCriteria];

        if (typeof aValue === "number" && typeof bValue === "number") {
          return sortOrder === "asc" ? aValue - bValue : bValue - aValue;
        } else if (typeof aValue === "string" && typeof bValue === "string") {
          return sortOrder === "asc"
            ? aValue.localeCompare(bValue)
            : bValue.localeCompare(aValue);
        } else {
          return 0;
        }
      });
      setFilteredCallingList(sortedList);
    }
  }, [sortCriteria, sortOrder]);

  const filterData = () => {
    let filteredData = [...callingList];
    Object.entries(selectedFilters).forEach(([option, values]) => {
      if (values.length > 0) {
        if (option === "candidateId") {
          filteredData = filteredData.filter((item) =>
            values.some((value) =>
              item[option]?.toString().toLowerCase().includes(value)
            )
          );
        } else if (option === "requirementId") {
          filteredData = filteredData.filter((item) =>
            values.some((value) =>
              item[option]?.toString().toLowerCase().includes(value)
            )
          );
        } else if (option === "employeeId") {
          filteredData = filteredData.filter((item) =>
            values.some((value) =>
              item[option]?.toString().toLowerCase().includes(value)
            )
          );
        } else if (option === "contactNumber") {
          filteredData = filteredData.filter((item) =>
            values.some((value) =>
              item[option]?.toString().toLowerCase().includes(value)
            )
          );
        } else if (option === "alternateNumber") {
          filteredData = filteredData.filter((item) =>
            values.some((value) =>
              item[option]?.toString().toLowerCase().includes(value)
            )
          );
        } else {
          filteredData = filteredData.filter((item) =>
            values.some((value) =>
              item[option]
                ?.toString()
                .toLowerCase()
                .includes(value.toLowerCase())
            )
          );
        }
      }
    });
    setFilteredCallingList(filteredData);
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

  const handleSort = (criteria) => {
    if (criteria === sortCriteria) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortCriteria(criteria);
      setSortOrder("asc");
    }
  };

  const handleUpdateSuccess = () => {
    setShowUpdateCallingTracker(false);
    fetchHoldCandidateData();
  };

  const handleUpdate = (candidateId) => {
    setSelectedCandidateId(candidateId);
    setShowUpdateCallingTracker(true);
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

  const toggleFilterSection = () => {
    setShowSearchBar(false);
    setShowFilterSection(!showFilterSection);
  };
  const handleFilterOptionClick = (option) => {
    if (activeFilterOption === option) {
      setActiveFilterOption(null);
    } else {
      setActiveFilterOption(option);
    }
  };

  const getSortIcon = (criteria) => {
    if (sortCriteria === criteria) {
      return sortOrder === "asc" ? (
        <i className="fa-solid fa-arrow-up"></i>
      ) : (
        <i className="fa-solid fa-arrow-down"></i>
      );
    }
    return null;
  };

  const handleSelectAll = () => {
    if (allSelected) {
      setSelectedRows([]);
    } else {
      const allRowIds = filteredCallingList.map((item) => item.candidateId);
      setSelectedRows(allRowIds);
    }
    setAllSelected(!allSelected);
  };

  const handleSelectRow = (candidateId) => {
    setSelectedRows((prevSelectedRows) => {
      if (prevSelectedRows.includes(candidateId)) {
        return prevSelectedRows.filter((id) => id !== candidateId);
      } else {
        return [...prevSelectedRows, candidateId];
      }
    });
  };

  const forwardSelectedCandidate = (e) => {
    e.preventDefault();
    if (selectedRows.length > 0) {
      setShowForwardPopup(true);
    }
  };

  //akash_pawar_SelectedCandidate_ShareFunctionality_16/07_395
  const handleShare = async () => {
    if (
      (selectedRecruiters.recruiterId != "" ||
        selectedTeamLeader.teamLeaderId != "") &&
      selectedRows.length > 0
    ) {
      const url = `http://192.168.1.46:9090/api/ats/157industries/updateEmployeeIds`; // Replace with your actual API endpoint
      let requestData;
      if (selectedRecruiters.recruiterId != "") {
        requestData = {
          employeeId: selectedRecruiters.recruiterId,
          candidateIds: selectedRows,
        };
      } else {
        requestData = {
          employeeId: selectedTeamLeader.teamLeaderId,
          candidateIds: selectedRows,
        };
      }

      const requestOptions = {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          // Add any additional headers as needed
        },
        body: JSON.stringify(requestData),
      };

      try {
        const response = await fetch(url, requestOptions);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        // Handle success response
        console.log("Candidates forwarded successfully!");
        fetchCallingTrackerData();
        onSuccessAdd(true);
        setShowForwardPopup(false); // Close the modal or handle any further UI updates
        setShowShareButton(true);
        setSelectedRows([]);
        setSelectedRecruiters({
          index: "",
          recruiterId: "",
          recruiterJobRole: "",
        });
        setSelectedTeamLeader({ teamLeaderId: "", teamLeaderJobRole: "" });
        // Optionally, you can fetch updated data after successful submission
        // fetchShortListedData(); // Uncomment this if you want to refresh the data after forwarding
      } catch (error) {
        console.error("Error while forwarding candidates:", error);
        // Handle error scenarios or show error messages to the user
      }
    }
  };
  //akash_pawar_SelectedCandidate_ShareFunctionality_16/07_449

  //Name:-Akash Pawar Component:-HoldCandidate Subcategory:-ResumeViewButton(added) start LineNo:-325 Date:-02/07
  const convertToDocumentLink = (byteCode, fileName) => {
    if (byteCode) {
      try {
        // Detect file type based on file name extension or content
        const fileType = fileName.split(".").pop().toLowerCase();

        // Convert PDF
        if (fileType === "pdf") {
          const binary = atob(byteCode);
          const array = new Uint8Array(binary.length);
          for (let i = 0; i < binary.length; i++) {
            array[i] = binary.charCodeAt(i);
          }
          const blob = new Blob([array], { type: "application/pdf" });
          return URL.createObjectURL(blob);
        }

        // Convert Word document (assuming docx format)
        if (fileType === "docx") {
          const binary = atob(byteCode);
          const array = new Uint8Array(binary.length);
          for (let i = 0; i < binary.length; i++) {
            array[i] = binary.charCodeAt(i);
          }
          const blob = new Blob([array], {
            type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
          });
          return URL.createObjectURL(blob);
        }

        // Handle other document types here if needed

        // If file type is not supported
        console.error(`Unsupported document type: ${fileType}`);
        return "Unsupported Document";
      } catch (error) {
        console.error("Error converting byte code to document:", error);
        return "Invalid Document";
      }
    }
    return "Document Not Found";
  };
  const [showResumeModal, setShowResumeModal] = useState(false);
  const [selectedCandidateResume, setSelectedCandidateResume] = useState("");

  const openResumeModal = (byteCode) => {
    setSelectedCandidateResume(byteCode);
    setShowResumeModal(true);
  };

  const closeResumeModal = () => {
    setSelectedCandidateResume("");
    setShowResumeModal(false);
  };
  //Name:-Akash Pawar Component:-HoldCandidate Subcategory:-ResumeViewButton(added) End LineNo:-356 Date:-02/07

  return (
    <div className="App-after">
      {loading ? (
        <div className="register">
          <HashLoader
            color={color}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        </div>
      ) : (
        <>
          {!showUpdateCallingTracker ? (
            <>
              <div className="search">
                <i
                  className="fa-solid fa-magnifying-glass"
                  onClick={() => {
                    setShowSearchBar(!showSearchBar);
                    setShowFilterSection(false);
                  }}
                  style={{ margin: "10px", width: "auto", fontSize: "15px" }}
                ></i>
                <h5 style={{ color: "gray" }}>Hold Candidates</h5>
                <div
                  style={{
                    display: "flex",
                    gap: "5px",
                    justifyContent: "center",
                    alignItems: "center",
                    padding: "10px",
                  }}
                >
                  {showShareButton ? (
                    <button
                      className="hold-share-btn"
                      onClick={() => setShowShareButton(false)}
                    >
                      Share
                    </button>
                  ) : (
                    <div style={{ display: "flex", gap: "5px" }}>
                      <button
                        className="hold-share-close-btn"
                        onClick={() => {
                          setShowShareButton(true);
                          setSelectedRows([]);
                          setAllSelected(false);
                        }}
                      >
                        Close
                      </button>
                      <button
                        className="hold-share-select-btn"
                        onClick={handleSelectAll}
                      >
                        {allSelected ? "Deselect All" : "Select All"}
                      </button>
                      <button
                        className="lineUp-forward-btn"
                        onClick={forwardSelectedCandidate}
                      >
                        Forward
                      </button>
                    </div>
                  )}
                  <button
                    className="lineUp-Filter-btn"
                    onClick={toggleFilterSection}
                  >
                    Filter <i className="fa-solid fa-filter"></i>
                  </button>
                </div>
              </div>
              {showSearchBar && (
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search here..."
                  value={searchTerm}
                  style={{ marginBottom: "10px" }}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              )}
              {showFilterSection && (
                <div className="filter-section">
                  <div className="filter-options-container">
                    {filterOptions.map((option) => {
                      const uniqueValues = Array.from(
                        new Set(callingList.map((item) => item[option]))
                      );
                      return (
                        <div key={option} className="filter-option">
                          <button
                            className="white-Btn"
                            onClick={() => handleFilterOptionClick(option)}
                          >
                            {option}
                            <span className="filter-icon">&#x25bc;</span>
                          </button>
                          {activeFilterOption === option && (
                            <div className="city-filter">
                              <div className="optionDiv">
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
                </div>
              )}

              <div className="attendanceTableData">
                <table className="attendance-table">
                  <thead>
                    <tr className="attendancerows-head">
                      {!showShareButton ? (
                        <th className="attendanceheading">
                          <input
                            type="checkbox"
                            onChange={handleSelectAll}
                            checked={
                              selectedRows.length === filteredCallingList.length
                            }
                            name="selectAll"
                          />
                        </th>
                      ) : null}
                      <th className="attendanceheading">No.</th>
                      <th
                        className="attendanceheading"
                        onClick={() => handleSort("date")}
                      >
                        Date
                      </th>
                      <th className="attendanceheading">Time</th>
                      <th className="attendanceheading">Candidate's Id</th>
                      <th
                        className="attendanceheading"
                        onClick={() => handleSort("recruiterName")}
                      >
                        Recruiter's Name
                      </th>
                      <th className="attendanceheading">Candidate's Name</th>
                      <th className="attendanceheading">Candidate's Email</th>
                      <th className="attendanceheading">Contact Number</th>
                      <th className="attendanceheading">Whatsapp Number</th>
                      <th className="attendanceheading">Source Name</th>
                      <th className="attendanceheading">Job Designation</th>
                      <th
                        className="attendanceheading"
                        onClick={() => handleSort("requirementId")}
                      >
                        Job Id
                      </th>
                      <th className="attendanceheading">Applying Company</th>
                      <th className="attendanceheading">
                        Communication Rating
                      </th>
                      <th className="attendanceheading">Current Location</th>
                      <th className="attendanceheading">Full Address</th>
                      <th className="attendanceheading">Calling Feedback</th>
                      <th className="attendanceheading">
                        Recruiter's Incentive
                      </th>
                      <th className="attendanceheading">Interested or Not</th>
                      <th className="attendanceheading">Current Company</th>
                      <th className="attendanceheading">Total Experience</th>
                      <th className="attendanceheading">Relevant Experience</th>
                      <th className="attendanceheading">Current CTC</th>
                      <th className="attendanceheading">Expected CTC</th>
                      <th className="attendanceheading">Date Of Birth</th>
                      <th className="attendanceheading">Gender</th>
                      <th className="attendanceheading">Qualification</th>
                      <th className="attendanceheading">Year Of Passing</th>
                      <th className="attendanceheading">Extra Certification</th>
                      <th className="attendanceheading">Calling Remark</th>
                      <th className="attendanceheading">Holding any offer</th>
                      <th className="attendanceheading">
                        Offer Letter Message
                      </th>
                      <th className="attendanceheading">Resume</th>
                      <th className="attendanceheading">NoticePeriod</th>
                      <th className="attendanceheading">
                        Message For Team Leader
                      </th>
                      <th className="attendanceheading">
                        Availability For Interview
                      </th>
                      <th className="attendanceheading">Interview Time</th>
                      <th className="attendanceheading">Final Status</th>
                      <th className="attendanceheading">Reason for Hold</th>
                      <th className="attendanceheading">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredCallingList.map((item, index) => (
                      <tr key={item.candidateId} className="attendancerows">
                        {!showShareButton ? (
                          <td className="tabledata">
                            <input
                              type="checkbox"
                              checked={selectedRows.includes(item.candidateId)}
                              onChange={() => handleSelectRow(item.candidateId)}
                            />
                          </td>
                        ) : null}
                        <td className="tabledata">{index + 1}</td>

                        <td
                          className="tabledata"
                          onMouseOver={handleMouseOver}
                          onMouseOut={handleMouseOut}
                        >
                          {item.date}
                          <div className="tooltip">
                            <span className="tooltiptext">{item.date}</span>
                          </div>
                        </td>

                        <td
                          className="tabledata"
                          onMouseOver={handleMouseOver}
                          onMouseOut={handleMouseOut}
                        >
                          {item.candidateAddedTime || "-"}
                          <div className="tooltip">
                            <span className="tooltiptext">
                              {item.candidateAddedTime}
                            </span>
                          </div>
                        </td>

                        <td
                          className="tabledata"
                          onMouseOver={handleMouseOver}
                          onMouseOut={handleMouseOut}
                        >
                          {item.candidateId}
                          <div className="tooltip">
                            <span className="tooltiptext">
                              {item.candidateId}
                            </span>
                          </div>
                        </td>

                        <td
                          className="tabledata"
                          onMouseOver={handleMouseOver}
                          onMouseOut={handleMouseOut}
                        >
                          {item.recruiterName}
                          <div className="tooltip">
                            <span className="tooltiptext">
                              {item.recruiterName}
                            </span>
                          </div>
                        </td>

                        <td
                          className="tabledata"
                          onMouseOver={handleMouseOver}
                          onMouseOut={handleMouseOut}
                        >
                          {item.candidateName}
                          <div className="tooltip">
                            <span className="tooltiptext">
                              {item.candidateName}
                            </span>
                          </div>
                        </td>

                        <td
                          className="tabledata"
                          onMouseOver={handleMouseOver}
                          onMouseOut={handleMouseOut}
                        >
                          {item.candidateEmail || "-"}
                          <div className="tooltip">
                            <span className="tooltiptext">
                              {item.candidateEmail}
                            </span>
                          </div>
                        </td>

                        <td
                          className="tabledata"
                          onMouseOver={handleMouseOver}
                          onMouseOut={handleMouseOut}
                        >
                          {item.contactNumber || "-"}
                          <div className="tooltip">
                            <span className="tooltiptext">
                              {item.contactNumber}
                            </span>
                          </div>
                        </td>

                        <td
                          className="tabledata"
                          onMouseOver={handleMouseOver}
                          onMouseOut={handleMouseOut}
                        >
                          {item.alternateNumber || 0}
                          <div className="tooltip">
                            <span className="tooltiptext">
                              {item.alternateNumber}
                            </span>
                          </div>
                        </td>

                        <td
                          className="tabledata"
                          onMouseOver={handleMouseOver}
                          onMouseOut={handleMouseOut}
                        >
                          {item.sourceName || 0}
                          <div className="tooltip">
                            <span className="tooltiptext">
                              {item.sourceName}
                            </span>
                          </div>
                        </td>

                        <td
                          className="tabledata"
                          onMouseOver={handleMouseOver}
                          onMouseOut={handleMouseOut}
                        >
                          {item.jobDesignation || "-"}
                          <div className="tooltip">
                            <span className="tooltiptext">
                              {item.jobDesignation}
                            </span>
                          </div>
                        </td>

                        <td
                          className="tabledata"
                          onMouseOver={handleMouseOver}
                          onMouseOut={handleMouseOut}
                        >
                          {item.requirementId || "-"}
                          <div className="tooltip">
                            <span className="tooltiptext">
                              {item.requirementId}
                            </span>
                          </div>
                        </td>

                        <td
                          className="tabledata"
                          onMouseOver={handleMouseOver}
                          onMouseOut={handleMouseOut}
                        >
                          {item.requirementCompany || "-"}
                          <div className="tooltip">
                            <span className="tooltiptext">
                              {item.requirementCompany}
                            </span>
                          </div>
                        </td>

                        <td
                          className="tabledata"
                          onMouseOver={handleMouseOver}
                          onMouseOut={handleMouseOut}
                        >
                          {item.communicationRating || "-"}
                          <div className="tooltip">
                            <span className="tooltiptext">
                              {item.communicationRating}
                            </span>
                          </div>
                        </td>

                        <td
                          className="tabledata"
                          onMouseOver={handleMouseOver}
                          onMouseOut={handleMouseOut}
                        >
                          {item.currentLocation || "-"}
                          <div className="tooltip">
                            <span className="tooltiptext">
                              {item.currentLocation}
                            </span>
                          </div>
                        </td>

                        <td
                          className="tabledata"
                          onMouseOver={handleMouseOver}
                          onMouseOut={handleMouseOut}
                        >
                          {item.fullAddress || "-"}
                          <div className="tooltip">
                            <span className="tooltiptext">
                              {item.fullAddress}{" "}
                            </span>
                          </div>
                        </td>

                        <td
                          className="tabledata"
                          onMouseOver={handleMouseOver}
                          onMouseOut={handleMouseOut}
                        >
                          {item.callingFeedback || "-"}
                          <div className="tooltip">
                            <span className="tooltiptext">
                              {item.callingFeedback}
                            </span>
                          </div>
                        </td>

                        <td
                          className="tabledata"
                          onMouseOver={handleMouseOver}
                          onMouseOut={handleMouseOut}
                        >
                          {item.incentive || "-"}
                          <div className="tooltip">
                            <span className="tooltiptext">
                              {item.incentive}
                            </span>
                          </div>
                        </td>

                        <td
                          className="tabledata"
                          onMouseOver={handleMouseOver}
                          onMouseOut={handleMouseOut}
                        >
                          {item.selectYesOrNo || "-"}
                          <div className="tooltip">
                            <span className="tooltiptext">
                              {item.selectYesOrNo}
                            </span>
                          </div>
                        </td>

                        {item.lineUp && (
                          <>
                            <td
                              className="tabledata"
                              onMouseOver={handleMouseOver}
                              onMouseOut={handleMouseOut}
                            >
                              {item.lineUp.companyName || "-"}
                              <div className="tooltip">
                                <span className="tooltiptext">
                                  {item.lineUp.companyName}
                                </span>
                              </div>
                            </td>

                            <td
                              className="tabledata"
                              onMouseOver={handleMouseOver}
                              onMouseOut={handleMouseOut}
                            >
                              {item.lineUp.experienceYear || "0"}
                              <div className="tooltip">
                                <span className="tooltiptext">
                                  {item.lineUp.experienceYear}{" "}
                                </span>
                              </div>
                              Years
                              {item.lineUp.experienceMonth || "0"}
                              <div className="tooltip">
                                <span className="tooltiptext">
                                  {item.lineUp.experienceMonth}
                                </span>
                              </div>
                              Months
                            </td>

                            <td
                              className="tabledata"
                              onMouseOver={handleMouseOver}
                              onMouseOut={handleMouseOut}
                            >
                              {item.lineUp.relevantExperience || "-"}
                              <div className="tooltip">
                                <span className="tooltiptext">
                                  {item.lineUp.relevantExperience}
                                </span>
                              </div>
                            </td>

                            <td
                              className="tabledata"
                              onMouseOver={handleMouseOver}
                              onMouseOut={handleMouseOut}
                            >
                              {`${item.lineUp.currentCTCLakh || 0} Lakh ${
                                item.lineUp.currentCTCThousand || 0
                              } Thousand`}
                              <div className="tooltip">
                                <span className="tooltiptext">{`${
                                  item.lineUp.expectedCTCLakh || 0
                                } Lakh ${
                                  item.lineUp.expectedCTCThousand || 0
                                } Thousand`}</span>
                              </div>
                            </td>

                            <td
                              className="tabledata"
                              onMouseOver={handleMouseOver}
                              onMouseOut={handleMouseOut}
                            >
                              {`${item.lineUp.expectedCTCLakh || 0} Lakh ${
                                item.lineUp.expectedCTCThousand || 0
                              } Thousand`}
                              <div className="tooltip">
                                <span className="tooltiptext">{`${
                                  item.lineUp.expectedCTCLakh || 0
                                } Lakh ${
                                  item.lineUp.expectedCTCThousand || 0
                                } Thousand`}</span>
                              </div>
                            </td>

                            <td
                              className="tabledata"
                              onMouseOver={handleMouseOver}
                              onMouseOut={handleMouseOut}
                            >
                              {item.lineUp.dateOfBirth || "-"}
                              <div className="tooltip">
                                <span className="tooltiptext">
                                  {item.lineUp.dateOfBirth}
                                </span>
                              </div>
                            </td>

                            <td
                              className="tabledata"
                              onMouseOver={handleMouseOver}
                              onMouseOut={handleMouseOut}
                            >
                              {item.lineUp.gender || "-"}
                              <div className="tooltip">
                                <span className="tooltiptext">
                                  {item.lineUp.gender}
                                </span>
                              </div>
                            </td>

                            <td
                              className="tabledata"
                              onMouseOver={handleMouseOver}
                              onMouseOut={handleMouseOut}
                            >
                              {item.lineUp.qualification || "-"}
                              <div className="tooltip">
                                <span className="tooltiptext">
                                  {item.lineUp.qualification}
                                </span>
                              </div>
                            </td>

                            <td
                              className="tabledata"
                              onMouseOver={handleMouseOver}
                              onMouseOut={handleMouseOut}
                            >
                              {item.lineUp.yearOfPassing || "-"}
                              <div className="tooltip">
                                <span className="tooltiptext">
                                  {item.lineUp.yearOfPassing}
                                </span>
                              </div>
                            </td>

                            <td
                              className="tabledata"
                              onMouseOver={handleMouseOver}
                              onMouseOut={handleMouseOut}
                            >
                              {item.lineUp.extraCertification || "-"}
                              <div className="tooltip">
                                <span className="tooltiptext">
                                  {item.lineUp.extraCertification}
                                </span>
                              </div>
                            </td>

                            <td
                              className="tabledata"
                              onMouseOver={handleMouseOver}
                              onMouseOut={handleMouseOut}
                            >
                              {item.lineUp.feedBack || "-"}
                              <div className="tooltip">
                                <span className="tooltiptext">
                                  {item.lineUp.feedBack}
                                </span>
                              </div>
                            </td>

                            <td
                              className="tabledata"
                              onMouseOver={handleMouseOver}
                              onMouseOut={handleMouseOut}
                            >
                              {item.lineUp.holdingAnyOffer || "-"}
                              <div className="tooltip">
                                <span className="tooltiptext">
                                  {item.lineUp.holdingAnyOffer}
                                </span>
                              </div>
                            </td>

                            <td
                              className="tabledata"
                              onMouseOver={handleMouseOver}
                              onMouseOut={handleMouseOut}
                            >
                              {item.lineUp.offerLetterMsg || "-"}
                              <div className="tooltip">
                                <span className="tooltiptext">
                                  {item.lineUp.offerLetterMsg}
                                </span>
                              </div>
                            </td>

                            {/* <td
                          className="tabledata"
                          onMouseOver={handleMouseOver}
                          onMouseOut={handleMouseOut}
                        >
                          {item.lineUp.resume || "-"}
                          <div className="tooltip">
                            <span className="tooltiptext">
                              {item.lineUp.resume}
                            </span>
                          </div>
                        </td> */}
                            {/* Name:-Akash Pawar Component:-HoldCandidate
                  Subcategory:-ResumeViewButton(added) start LineNo:-987
                  Date:-02/07 */}
                            <td className="tabledata">
                              <button
                                className="text-secondary"
                                onClick={() =>
                                  openResumeModal(item.lineUp.resume)
                                }
                              >
                                <i className="fas fa-eye"></i>
                              </button>
                            </td>
                            {/* Name:-Akash Pawar Component:-HoldCandidate
                  Subcategory:-ResumeViewButton(added) End LineNo:-999
                  Date:-02/07 */}

                            <td
                              className="tabledata"
                              onMouseOver={handleMouseOver}
                              onMouseOut={handleMouseOut}
                            >
                              {item.lineUp.noticePeriod || "-"}
                              <div className="tooltip">
                                <span className="tooltiptext">
                                  {item.lineUp.noticePeriod}
                                </span>
                              </div>
                            </td>

                            <td
                              className="tabledata"
                              onMouseOver={handleMouseOver}
                              onMouseOut={handleMouseOut}
                            >
                              {item.lineUp.msgForTeamLeader || "-"}
                              <div className="tooltip">
                                <span className="tooltiptext">
                                  {item.lineUp.msgForTeamLeader}
                                </span>
                              </div>
                            </td>

                            <td
                              className="tabledata"
                              onMouseOver={handleMouseOver}
                              onMouseOut={handleMouseOut}
                            >
                              {item.lineUp.availabilityForInterview || "-"}
                              <div className="tooltip">
                                <span className="tooltiptext">
                                  {item.lineUp.availabilityForInterview}
                                </span>
                              </div>
                            </td>

                            <td
                              className="tabledata"
                              onMouseOver={handleMouseOver}
                              onMouseOut={handleMouseOut}
                            >
                              {item.lineUp.interviewTime || "-"}
                              <div className="tooltip">
                                <span className="tooltiptext">
                                  {item.lineUp.interviewTime}
                                </span>
                              </div>
                            </td>

                            <td
                              className="tabledata"
                              onMouseOver={handleMouseOver}
                              onMouseOut={handleMouseOut}
                            >
                              {item.lineUp.finalStatus || "-"}
                              <div className="tooltip">
                                <span className="tooltiptext">
                                  {item.lineUp.finalStatus}
                                </span>
                              </div>
                            </td>
                            <td
                              className="tabledata"
                              onMouseOver={handleMouseOver}
                              onMouseOut={handleMouseOut}
                            >
                              {item.lineUp.remarks || "-"}
                              <div className="tooltip">
                                <span className="tooltiptext">
                                  {item.lineUp.remarks || "-"}
                                </span>
                              </div>
                            </td>

                            <td className="tabledata">
                              <i
                                onClick={() => handleUpdate(item.candidateId)}
                                className="fa-regular fa-pen-to-square"
                              ></i>
                            </td>
                          </>
                        )}
                      </tr>
                    ))}
                  </tbody>
                </table>
                {showForwardPopup ? (
                  <>
                    <div
                      className="bg-black bg-opacity-50 modal show"
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        position: "fixed",
                        width: "100%",
                        height: "100vh",
                      }}
                    >
                      <Modal.Dialog
                        style={{
                          width: "500px",
                          height: "800px",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          marginTop: "100px",
                        }}
                      >
                        <Modal.Header
                          style={{
                            fontSize: "18px",
                            backgroundColor: "#f2f2f2",
                          }}
                        >
                          Forward To
                        </Modal.Header>
                        <Modal.Body
                          style={{
                            backgroundColor: "#f2f2f2",
                          }}
                        >
                          {/* akash_pawar_SelectedCandidate_ShareFunctionality_16/07_1309 */}
                          <div className="accordion">
                            {fetchTeamleader &&
                              userType === "Manager" &&
                              fetchTeamleader.map((teamleaders) => (
                                <div className="accordion-item">
                                  <div className="accordion-header">
                                    <label
                                      htmlFor={`${teamleaders.teamLeaderId}`}
                                      className="accordion-title"
                                    >
                                      <input
                                        type="radio"
                                        name="teamLeaders"
                                        id={`${teamleaders.teamLeaderId}`}
                                        value={teamleaders.teamLeaderId}
                                        checked={
                                          selectedTeamLeader.teamLeaderId ===
                                          teamleaders.teamLeaderId
                                        }
                                        onChange={() =>
                                          setSelectedTeamLeader({
                                            teamLeaderId:
                                              teamleaders.teamLeaderId,
                                            teamLeaderJobRole:
                                              teamleaders.jobRole,
                                          })
                                        }
                                      />{" "}
                                      {teamleaders.teamLeaderName}
                                    </label>
                                  </div>
                                  {selectedTeamLeader.teamLeaderId ===
                                    teamleaders.teamLeaderId && (
                                    <div className="accordion-content">
                                      <form>
                                        {recruiterUnderTeamLeader &&
                                          recruiterUnderTeamLeader.map(
                                            (recruiters) => (
                                              <div className="form-group">
                                                <label
                                                  htmlFor={
                                                    recruiters.employeeId
                                                  }
                                                >
                                                  <input
                                                    type="radio"
                                                    id={recruiters.employeeId}
                                                    name="recruiter"
                                                    value={
                                                      recruiters.employeeId
                                                    }
                                                    checked={
                                                      selectedRecruiters.recruiterId ===
                                                      recruiters.employeeId
                                                    }
                                                    onChange={() =>
                                                      setSelectedRecruiters({
                                                        index: 1,
                                                        recruiterId:
                                                          recruiters.employeeId,
                                                        recruiterJobRole:
                                                          recruiters.jobRole,
                                                      })
                                                    }
                                                  />{" "}
                                                  {recruiters.employeeName}
                                                </label>
                                              </div>
                                            )
                                          )}
                                      </form>
                                    </div>
                                  )}
                                </div>
                              ))}
                            {userType === "TeamLeader" && (
                              <div className="accordion-item">
                                <div className="accordion-header">
                                  <label className="accordion-title">
                                    {loginEmployeeName}
                                  </label>
                                </div>
                                <div className="accordion-content">
                                  <form>
                                    {recruiterUnderTeamLeader &&
                                      recruiterUnderTeamLeader.map(
                                        (recruiters) => (
                                          <div className="form-group">
                                            <label
                                              htmlFor={recruiters.employeeId}
                                            >
                                              <input
                                                type="radio"
                                                id={recruiters.employeeId}
                                                name="recruiter"
                                                value={recruiters.employeeId}
                                                checked={
                                                  selectedRecruiters.recruiterId ===
                                                  recruiters.employeeId
                                                }
                                                onChange={() =>
                                                  setSelectedRecruiters({
                                                    index: 1,
                                                    recruiterId:
                                                      recruiters.employeeId,
                                                    recruiterJobRole:
                                                      recruiters.jobRole,
                                                  })
                                                }
                                              />{" "}
                                              {recruiters.employeeName}
                                            </label>
                                          </div>
                                        )
                                      )}
                                  </form>
                                </div>
                              </div>
                            )}
                          </div>
                          {/* akash_pawar_SelectedCandidate_ShareFunctionality_16/07_1430 */}
                        </Modal.Body>
                        <Modal.Footer style={{ backgroundColor: "#f2f2f2" }}>
                          <button
                            onClick={handleShare}
                            className="hold-share-forward-popup-btn"
                          >
                            Share
                          </button>
                          <button
                            onClick={() => setShowForwardPopup(false)}
                            className="hold-close-forward-popup-btn"
                          >
                            Close
                          </button>
                        </Modal.Footer>
                      </Modal.Dialog>
                    </div>
                  </>
                ) : null}

                {/* Name:-Akash Pawar Component:-HoldCandidate
          Subcategory:-ResumeModel(added) End LineNo:-1170 Date:-02/07 */}
                <Modal
                  show={showResumeModal}
                  onHide={closeResumeModal}
                  size="md"
                >
                  <Modal.Header closeButton>
                    <Modal.Title>Resume</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    {selectedCandidateResume ? (
                      <iframe
                        src={convertToDocumentLink(
                          selectedCandidateResume,
                          "Resume.pdf"
                        )}
                        width="100%"
                        height="550px"
                        title="PDF Viewer"
                      ></iframe>
                    ) : (
                      <p>No resume available</p>
                    )}
                  </Modal.Body>
                  <Modal.Footer>
                    <Button variant="secondary" onClick={closeResumeModal}>
                      Close
                    </Button>
                  </Modal.Footer>
                </Modal>
                {/* Name:-Akash Pawar Component:-HoldCandidate
          Subcategory:-ResumeModel(added) End LineNo:-1199 Date:-02/07 */}
              </div>
            </>
          ) : (
            <UpdateCallingTracker
              candidateId={selectedCandidateId}
              employeeId={employeeId}
              onSuccess={handleUpdateSuccess}
              onCancel={() => setShowUpdateCallingTracker(false)}
            />
          )}
        </>
      )}
    </div>
  );
};

export default HoldCandidate;
