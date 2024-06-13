import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../EmployeeSection/callingList.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import UpdateCallingTracker from "./UpdateSelfCalling";

const CallingList = ({ updateState, funForGettingCandidateId }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterOptions, setFilterOptions] = useState([]);
  const [sortCriteria, setSortCriteria] = useState(null);
  const [sortOrder, setSortOrder] = useState("asc");
  const [callingList, setCallingList] = useState([]);

  const [filteredCallingList, setFilteredCallingList] = useState([]);
  const [showCallingForm, setShowCallingForm] = useState(false);
  const [callingToUpdate, setCallingToUpdate] = useState(null);
  const [selectedFilters, setSelectedFilters] = useState({});

  const [showSearchBar, setShowSearchBar] = useState(false); 
  const { employeeId } = useParams();
  const employeeIdw = parseInt(employeeId);
  console.log(employeeIdw + "emp @@@@ id");
  console.log(employeeId + "emp 1111 id");

  const [showUpdateCallingTracker, setShowUpdateCallingTracker] = useState(false);

  const navigator = useNavigate();

  useEffect(() => {
    fetch(`http://192.168.1.43:8891/api/ats/157industries/callingData/${employeeId}`)
      .then((response) => response.json())
      .then((data) => {
        setCallingList(data);
        setFilteredCallingList(data); 
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, [employeeId]);

  useEffect(() => {
    const options = Object.keys(filteredCallingList[0] || {}).filter(key => key !== 'candidateId'); 
    setFilterOptions(options);
  }, [filteredCallingList]);

  useEffect(() => {
    filterData();
  }, [selectedFilters]);

  useEffect(() => {
    const filtered = callingList.filter((item) => {
      const searchTermLower = searchTerm.toLowerCase();
      return (
        (item.date && item.date.toLowerCase().includes(searchTermLower)) ||
        (item.recruiterName && item.recruiterName.toLowerCase().includes(searchTermLower)) ||
        (item.candidateName && item.candidateName.toLowerCase().includes(searchTermLower)) ||
        (item.candidateEmail && item.candidateEmail.toLowerCase().includes(searchTermLower)) ||
        (item.contactNumber && item.contactNumber.toString().includes(searchTermLower)) ||
        (item.alternateNumber && item.alternateNumber.toString().includes(searchTermLower)) ||
        (item.sourceName && item.sourceName.toLowerCase().includes(searchTermLower)) ||
        (item.position && item.position.toLowerCase().includes(searchTermLower)) ||
        (item.requirementId && item.requirementId.toString().toLowerCase().includes(searchTermLower)) ||
        (item.requirementCompany && item.requirementCompany.toLowerCase().includes(searchTermLower)) ||
        (item.communicationRating && item.communicationRating.toLowerCase().includes(searchTermLower)) ||
        (item.currentLocation && item.currentLocation.toLowerCase().includes(searchTermLower)) ||
        (item.personalFeedback && item.personalFeedback.toLowerCase().includes(searchTermLower)) ||
        (item.callingFeedback && item.callingFeedback.toLowerCase().includes(searchTermLower)) ||
        (item.selectYesOrNo && item.selectYesOrNo.toLowerCase().includes(searchTermLower))
      );
    });
    setFilteredCallingList(filtered);
  }, [searchTerm, callingList]);

  useEffect(() => {
    if (sortCriteria) {
      const sortedList = [...filteredCallingList].sort((a, b) => {
        const aValue = a[sortCriteria];
        const bValue = b[sortCriteria];

        if (typeof aValue === 'number' && typeof bValue === 'number') {
          return sortOrder === 'asc' ? aValue - bValue : bValue - aValue;
        } else if (typeof aValue === 'string' && typeof bValue === 'string') {
          return sortOrder === 'asc' ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue);
        } else {
          return 0; 
        }
      });
      setFilteredCallingList(sortedList);
    }
  }, [sortCriteria, sortOrder]);

  const handleFilterSelect = (option, value) => {
    if (value === "") {
      const { [option]: removedFilter, ...rest } = selectedFilters;
      setSelectedFilters(rest);
    } else {
      setSelectedFilters({ ...selectedFilters, [option]: value });
    }
  };

  const filterData = () => {
    let filteredData = [...callingList];
    Object.entries(selectedFilters).forEach(([option, value]) => {
      filteredData = filteredData.filter(item => item[option].toString() === value);
    });
    setFilteredCallingList(filteredData);
  };

  const handleSort = (criteria) => {
    if (criteria === sortCriteria) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortCriteria(criteria);
      setSortOrder("asc");
    }
  };

  const handleUpdate = (candidateId) => {
    setSelectedCandidateId(candidateId); // Set candidateId for UpdateCallingTracker
    setShowUpdateCallingTracker(true); // Show UpdateCallingTracker
  };

 
  const handleUpdateSuccess = () => {
    fetch(
      `http://localhost:8891/api/ats/157industries/callingData/${employeeId}`
    )

      .then((response) => response.json())
      .then((data) => {
        setCallingList(data);
        setFilteredCallingList(data);
        setShowUpdateCallingTracker(false); 
      })
      .catch((error) => console.error("Error fetching data:", error));
  };

  const handleMouseOver = (event) => {
    const tableData = event.currentTarget;
    const tooltip = tableData.querySelector('.tooltip');

    if (tooltip) {
      const isOverflowing = tableData.scrollWidth > tableData.clientWidth;
      if (isOverflowing) {
        tooltip.style.visibility = 'visible';
        tooltip.style.opacity = '1';

        const tableDataRect = tableData.getBoundingClientRect();
        const tooltipRect = tooltip.getBoundingClientRect();

        tooltip.style.top = `${tableDataRect.top - tooltipRect.height - 5}px`;
        tooltip.style.left = `${tableDataRect.left}px`;
      } else {
        tooltip.style.visibility = 'hidden';
        tooltip.style.opacity = '0';
      }
    }
  };

  const handleMouseOut = (event) => {
    const tooltip = event.currentTarget.querySelector('.tooltip');
    if (tooltip) {
      tooltip.style.visibility = 'hidden';
      tooltip.style.opacity = '0';
    }
  };

  const getSortIcon = (criteria) => {
    if (sortCriteria === criteria) {
      return sortOrder === "asc" ? <i className="fa-solid fa-arrow-up"></i> : <i className="fa-solid fa-arrow-down"></i>;
    }
    return null;
  };

  return (
    <div className="calling-list-container">
      {!showUpdateCallingTracker && !showCallingForm && (
        <>
          <div className="search">

            <h5 style={{ color: "gray", paddingTop: "5px" }}>Calling List</h5>
            <i className="fa-solid fa-magnifying-glass" onClick={() => setShowSearchBar(!showSearchBar)}
              style={{ margin: "10px", width: "auto", fontSize: "15px" }}></i>
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
          <div className="filter-section">
            <h5 style={{ color: "gray", paddingTop: "5px" }}>Filter</h5>
            <div className="filter-dropdowns">
              {filterOptions.map(option => (
                <div key={option} className="filter-dropdown">
                  <label htmlFor={option}>{option}</label>
                  <select id={option} onChange={(e) => handleFilterSelect(option, e.target.value)}>
                    <option value="">All</option>
                    {[...new Set(callingList.map(item => item[option]))].map(value => (
                      <option key={value} value={value}>{value}</option>
                    ))}
                  </select>
                </div>
              ))}
            </div>
          </div>
          <div className="attendanceTableData">
            <table className="selfcalling-table attendance-table">
              <thead>
                <tr className="attendancerows-head">
                  <th className='attendanceheading'>Sr No.</th>
                  <th className='attendanceheading' onClick={() => handleSort("date")}>Date {getSortIcon("date")}</th>
                  <th className='attendanceheading' onClick={() => handleSort("recruiterName")}>Recruiter Name {getSortIcon("recruiterName")}</th>
                  <th className='attendanceheading'>Candidate Name</th>
                  <th className='attendanceheading'>Candidate Email</th>
                  <th className='attendanceheading'>Contact Number</th>
                  <th className='attendanceheading'>Alternate Number</th>
                  <th className='attendanceheading'>Source Name</th>
                  <th className='attendanceheading'>Position</th>
                  <th className='attendanceheading' onClick={() => handleSort("requirementId")}>Job Id {getSortIcon("requirementId")}</th>
                  <th className='attendanceheading'>Applying Company</th>
                  <th className='attendanceheading'>Communication Rating</th>
                  <th className='attendanceheading'>Current Location</th>
                  <th className='attendanceheading'>PersonalFeedback</th>
                  <th className='attendanceheading'>CallingFeedback</th>
                  <th className='attendanceheading'>Interested / Eligible</th>
                  <th className='attendanceheading'>Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredCallingList.map((item, index) => (
                  <tr key={item.candidateId} className="attendancerows">
                    <td className='tabledata ' onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>{index + 1}</td>
                    <td className='tabledata ' onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>{item.date}
                      <div className="tooltip">
                        <span className="tooltiptext">{item.date}</span>
                      </div>
                    </td>
                    <td className='tabledata ' onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>{item.recruiterName}
                      <div className="tooltip">
                        <span className="tooltiptext">{item.recruiterName} </span>
                      </div>
                    </td>
                    <td className='tabledata ' onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>{item.candidateName} <div className="tooltip">
                      <span className="tooltiptext">{item.candidateName}</span>
                    </div></td>
                    <td className='tabledata ' onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>{item.candidateEmail} <div className="tooltip">
                      <span className="tooltiptext">{item.candidateEmail}</span>
                    </div></td>
                    <td className='tabledata ' onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>{item.contactNumber} <div className="tooltip">
                      <span className="tooltiptext">{item.contactNumber}</span>
                    </div></td>
                    <td className='tabledata ' onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>{item.alternateNumber} <div className="tooltip">
                      <span className="tooltiptext">{item.alternateNumber}</span>
                    </div></td>
                    <td className='tabledata ' onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>{item.sourceName} <div className="tooltip">
                      <span className="tooltiptext">{item.sourceName}</span>
                    </div></td>
                    <td className='tabledata ' onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>{item.position} <div className="tooltip">
                      <span className="tooltiptext">{item.position}</span>
                    </div></td>
                    <td className='tabledata ' onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>{item.requirementId} <div className="tooltip">
                      <span className="tooltiptext">{item.requirementId}</span>
                    </div></td>
                    <td className='tabledata ' onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>{item.requirementCompany} <div className="tooltip">
                      <span className="tooltiptext">{item.requirementCompany} </span>
                    </div></td>
                    <td className='tabledata ' onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>{item.communicationRating} <div className="tooltip">
                      <span className="tooltiptext">{item.communicationRating}</span>
                    </div></td>
                    <td className='tabledata ' onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>{item.currentLocation} <div className="tooltip">
                      <span className="tooltiptext">{item.currentLocation} </span>
                    </div></td>
                    <td className='tabledata ' onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>{item.personalFeedback} <div className="tooltip">
                      <span className="tooltiptext">{item.personalFeedback} </span>
                    </div></td>
                    <td className='tabledata ' onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>{item.callingFeedback} <div className="tooltip">
                      <span className="tooltiptext">{item.callingFeedback} </span>
                    </div></td>
                    <td className='tabledata ' onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>{item.selectYesOrNo} <div className="tooltip">
                      <span className="tooltiptext">{item.selectYesOrNo} </span>
                    </div></td>
                    <td className="tabledata">
                      <i onClick={() => handleUpdate(item.candidateId)} className="fa-regular fa-pen-to-square"></i>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}

      {showUpdateCallingTracker && (
        <UpdateCallingTracker
          candidateId={selectedCandidateId}
          employeeId={employeeId}
          onSuccess={handleUpdateSuccess}
          onCancel={() => setShowUpdateCallingTracker(true)}
        />
      )}
    </div>
  );
};

export default CallingList;
