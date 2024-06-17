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
  const [showFilterSection, setShowFilterSection] = useState(false);
  const [filteredCallingList, setFilteredCallingList] = useState([]);
  const [showCallingForm, setShowCallingForm] = useState(false);
  const [callingToUpdate, setCallingToUpdate] = useState(null);
  const [selectedFilters, setSelectedFilters] = useState({});
  const [selectedCandidateId,setSelectedCandidateId] =useState();

const [selectedRows, setSelectedRows] = useState([]);

  const [showSearchBar, setShowSearchBar] = useState(false); 
  const { employeeId } = useParams();
  const employeeIdw = parseInt(employeeId);
  console.log(employeeIdw + "emp @@@@ id");
  console.log(employeeId + "emp 1111 id");

  const [showUpdateCallingTracker, setShowUpdateCallingTracker] = useState(false);

  const navigator = useNavigate();

  useEffect(() => {
    fetch(`http://192.168.1.36:8891/api/ats/157industries/callingData/${employeeId}`)
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
  console.log("Selected Filters:", selectedFilters);
}, [selectedFilters]);


useEffect(() => {
  console.log("Filtered Calling List:", filteredCallingList);
}, [filteredCallingList]);

useEffect(() => {
    const limitedOptions = ['date', 'recruiterName', 'jobDesignation', 'requirementId'];
    setFilterOptions(limitedOptions);
  }, [callingList]);


    useEffect(() => {
    filterData();
  }, [selectedFilters, callingList]);

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
     //   (item.position && item.position.toLowerCase().includes(searchTermLower)) ||
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


    const filterData = () => {
    let filteredData = [...callingList];
    Object.entries(selectedFilters).forEach(([option, values]) => {
      if (values.length > 0) {
        if (option === 'requirementId') {
          filteredData = filteredData.filter(item => values.includes(item[option]?.toString()));
        } else {
          filteredData = filteredData.filter(item => values.some(value => item[option]?.toString().toLowerCase().includes(value.toLowerCase())));
        }
      }
    });
    setFilteredCallingList(filteredData);
  };

 const handleFilterSelect = (option, value) => {
    setSelectedFilters(prevFilters => {
      const updatedFilters = { ...prevFilters };
      if (!updatedFilters[option]) {
        updatedFilters[option] = [];
      }

      const index = updatedFilters[option].indexOf(value);
      if (index === -1) {
        updatedFilters[option] = [...updatedFilters[option], value];
      } else {
        updatedFilters[option] = updatedFilters[option].filter(item => item !== value);
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

  const handleUpdate = (candidateId) => {
    setSelectedCandidateId(candidateId); // Set candidateId for UpdateCallingTracker
    setShowUpdateCallingTracker(true); // Show UpdateCallingTracker
  };

 
  const handleUpdateSuccess = () => {
    fetch(
      `http://192.168.1.36:8891/api/ats/157industries/callingData/${employeeId}`
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

   const toggleFilterSection = () => {
    setShowFilterSection(!showFilterSection);
  };

  
  const handleSelectAll = (event) => {
    if (event.target.checked) {
      const allRowIds = filteredCallingList.map(item => item.candidateId);
      setSelectedRows(allRowIds);
    } else {
      setSelectedRows([]);
    }
  };

  const handleSelectRow = (candidateId) => {
    setSelectedRows(prevSelectedRows => {
      if (prevSelectedRows.includes(candidateId)) {
        return prevSelectedRows.filter(id => id !== candidateId);
      } else {
        return [...prevSelectedRows, candidateId];
      }
    });
  };






  return (
    <div className="App-after">
      {!showUpdateCallingTracker && !showCallingForm && (
        <>
          <div className="search">
<i className="fa-solid fa-magnifying-glass" onClick={() => setShowSearchBar(!showSearchBar)}
              style={{ margin: "10px", width: "auto", fontSize: "15px" }}></i>
            <h5 style={{ color: "gray", paddingTop: "5px" }}>Calling List</h5>
            
              <button onClick={toggleFilterSection}>Filter <i class="fa-solid fa-filter"></i></button>
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
    <h5 style={{ color: "gray", paddingTop: "5px" }}>Filter</h5>
    <div className="filter-dropdowns">
      {filterOptions.map(option => (
        <div key={option} className="filter-dropdown">
          {/* <label htmlFor={option}>{option}</label> */}
          <div className="dropdown">
            <button className="dropbtn">{option}</button>
            <div className="dropdown-content">
              <div key={`${option}-All`}>
                <input
                  type="checkbox"
                  id={`${option}-All`}
                  value="All"
                  checked={!selectedFilters[option] || selectedFilters[option].length === 0}
                  onChange={() => handleFilterSelect(option, "All")}
                />
                <label htmlFor={`${option}-All`}>All</label>
              </div>
              {[...new Set(callingList.map(item => item[option]))].map(value => (
                <div key={value}>
                  <input
                    type="checkbox"
                    id={`${option}-${value}`}
                    value={value}
                    checked={selectedFilters[option]?.includes(value) || false}
                    onChange={() => handleFilterSelect(option, value)}
                  />
                  <label htmlFor={`${option}-${value}`}>{value}</label>
                </div>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
)}

          <div className="attendanceTableData">
            <table className="selfcalling-table attendance-table">
              <thead>
                <tr className="attendancerows-head">
                  <th className='attendanceheading'>
                    <input
                      type="checkbox"
                      onChange={handleSelectAll}
                      checked={selectedRows.length === filteredCallingList.length}
                    />
                  </th>

                  <th className='attendanceheading'>Sr No.</th>
                  <th className='attendanceheading' onClick={() => handleSort("date")}>Date & Time {getSortIcon("date")}</th>
                  <th className='attendanceheading'>Candidate Id</th>
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
                  <th className='attendanceheading'>Full Address</th>
                  <th className='attendanceheading'>CallingFeedback</th>
                  <th className='attendanceheading'>Candidate Incentive</th>
                  <th className='attendanceheading'>Interested / Eligible</th>
                  <th className='attendanceheading'>Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredCallingList.map((item, index) => (
                  <tr key={item.candidateId} className="attendancerows">
                    <td className='tabledata '>
                      <input
                        type="checkbox"
                        checked={selectedRows.includes(item.candidateId)}
                        onChange={() => handleSelectRow(item.candidateId)}
                      />
                    </td>

                    <td className='tabledata ' onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}> {index + 1}</td>
                    
                    <td className='tabledata ' onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}> {item.date} 
                      <div className="tooltip">
                        <span className="tooltiptext">{item.date}</span>
                      </div>
                      <div className="tooltip">
                        <span className="tooltiptext"> {item.candidateAddedTime}</span>
                      </div>
                      
                    </td>

                    <td className='tabledata ' onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>{item.candidateId} 
                      <div className="tooltip">
                        <span className="tooltiptext">{item.candidateId} </span>
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
                    <td className='tabledata ' onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>{item.jobDesignation} <div className="tooltip">
                      <span className="tooltiptext">{item.jobDesignation}</span>
                    </div></td>
                    <td className='tabledata ' onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>{item.requirementId} <div className="tooltip">
                      <span className="tooltiptext"> {item.requirementId} </span>
                    </div> </td>
                    <td className='tabledata ' onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>{item.requirementCompany} <div className="tooltip">
                      <span className="tooltiptext">{item.requirementCompany} </span>
                    </div></td>
                    <td className='tabledata ' onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>{item.communicationRating} <div className="tooltip">
                      <span className="tooltiptext">{item.communicationRating}</span>
                    </div></td>
                    <td className='tabledata ' onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>{item.currentLocation} <div className="tooltip">
                      <span className="tooltiptext">{item.currentLocation} </span>
                    </div></td>
                    <td className='tabledata ' onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>{item.fullAddress} <div className="tooltip">
                      <span className="tooltiptext">{item.fullAddress} </span>
                    </div></td>
                    <td className='tabledata ' onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>{item.callingFeedback} <div className="tooltip">
                      <span className="tooltiptext">{item.callingFeedback} </span>
                    </div></td>
                    <td className='tabledata ' onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>{item.incentive} <div className="tooltip">
                      <span className="tooltiptext">{item.incentive} </span>
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
