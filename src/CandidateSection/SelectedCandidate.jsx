import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import './selectedcandidate.css';
import AfterSelection from "./afterSelection";

const SelectedCandidate = () => {
  const [shortListedData, setShortListedData] = useState([]);
  const [selectedEmployeeId, setSelectedEmployeeId] = useState(null);
  const [selectedRequirementId, setSelectedRequirementId] = useState(null);
  const [selectedCandidateId, setSelectedCandidateId] = useState(null);
  const [showSearchBar, setShowSearchBar] = useState(false);
  const [showFilterSection, setShowFilterSection] = useState(false);
  const [filterOptions, setFilterOptions] = useState([]);
     const [searchTerm, setSearchTerm] = useState("");
  const [sortCriteria, setSortCriteria] = useState(null);
  const [sortOrder, setSortOrder] = useState("asc");
  const [callingList, setCallingList] = useState([]);
  const [filteredCallingList, setFilteredCallingList] = useState([]);
  const [selectedFilters, setSelectedFilters] = useState({});

  const [selectedRows, setSelectedRows] = useState([]);

  const { employeeId } = useParams();

  useEffect(() => {
    fetchShortListedData();
  }, []);


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


  const fetchShortListedData = async () => {
    try {
      const response = await fetch(
        `http://192.168.1.39:8891/api/ats/157industries/selected-candidate/${employeeId}`
      );
      const data = await response.json();
      setShortListedData(data);
      setFilteredCallingList(data);

    } catch (error) {
      console.error("Error fetching shortlisted data:", error);
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
        (item.recruiterName && item.recruiterName.toLowerCase().includes(searchTermLower)) ||
        (item.candidateName && item.candidateName.toLowerCase().includes(searchTermLower)) ||
        (item.candidateEmail && item.candidateEmail.toLowerCase().includes(searchTermLower)) ||
        (item.contactNumber && item.contactNumber.toString().includes(searchTermLower)) ||
        (item.alternateNumber && item.alternateNumber.toString().includes(searchTermLower)) ||
        (item.sourceName && item.sourceName.toLowerCase().includes(searchTermLower)) ||

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

  const toggleFilterSection = () => {
    setShowFilterSection(!showFilterSection);
  };

  const getSortIcon = (criteria) => {
    if (sortCriteria === criteria) {
      return sortOrder === "asc" ? <i className="fa-solid fa-arrow-up"></i> : <i className="fa-solid fa-arrow-down"></i>;
    }
    return null;
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

  const viewPage = (candidateId, requirementId) => {
    setSelectedCandidateId(candidateId);
    setSelectedEmployeeId(employeeId);
    setSelectedRequirementId(requirementId);
  };

  const handleReturn = () => {
    setSelectedCandidateId(null);
    setSelectedEmployeeId(null);
    setSelectedRequirementId(null);
    fetchShortListedData();
  };

    const handleMouseOver = (event) => {
    const tableData = event.currentTarget;
    const tooltip = tableData.querySelector('.tooltip');
    const tooltiptext = tableData.querySelector('.tooltiptext');

    if (tooltip && tooltiptext) {
      const textOverflowing = tableData.offsetWidth < tableData.scrollWidth || tableData.offsetHeight < tableData.scrollHeight;
      if (textOverflowing) {
        const rect = tableData.getBoundingClientRect();
        tooltip.style.top = `${rect.top - 10}px`;
        tooltip.style.left = `${rect.left + rect.width / 100}px`;
        tooltip.style.visibility = 'visible';
      } else {
        tooltip.style.visibility = 'hidden';
      }
    }
  };

  const handleMouseOut = (event) => {
    const tooltip = event.currentTarget.querySelector('.tooltip');
    if (tooltip) {
      tooltip.style.visibility = 'hidden';
    }
  };




  return (
    <div className="App-after">
      {!selectedCandidateId ? (
        <>
         <div className="search">
            <i className="fa-solid fa-magnifying-glass" onClick={() => setShowSearchBar(!showSearchBar)}
              style={{ margin: "10px", width: "auto", fontSize: "15px" }}></i>
       <h5 style={{color:"grey"}}>Selected Candidates 16</h5>


            <button className="selectedCan-filter-btn" onClick={toggleFilterSection}>Filter <i className="fa-solid fa-filter"></i></button>
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
         
          <table className="attendance-table">
            <thead>
              <tr className='attendancerows-head'>
                 <th className='attendanceheading'>
                    <input
                      type="checkbox"
                      onChange={handleSelectAll}
                      checked={selectedRows.length === filteredCallingList.length}
                    />
                  </th>
                <th className='attendanceheading'>Sr No.</th>
                <th className='attendanceheading' onClick={() => handleSort("date")}>Date</th>
                <th className='attendanceheading'>Time</th>
                <th className='attendanceheading'>Candidate Id</th>
                <th className='attendanceheading' onClick={() => handleSort("recruiterName")}>Recruiter Name</th>
                <th className='attendanceheading'>Candidate Name</th>
                <th className='attendanceheading'>Candidate Email</th>
                <th className='attendanceheading'>Contact Number</th>
                <th className='attendanceheading'>Alternate Number</th>
                <th className='attendanceheading'>sourceName</th>
                <th className='attendanceheading'>job Designation</th>
                <th className='attendanceheading' onClick={() => handleSort("requirementId")}>Job Id</th>
                <th className='attendanceheading'>Applying Company</th>
                <th className='attendanceheading'>Communication Rating</th>
                <th className='attendanceheading'>Current Location</th>
                <th className='attendanceheading'>Full Address</th>
                <th className='attendanceheading'>Calling Feedback</th>
                <th className='attendanceheading'>Incentive</th>
                <th className='attendanceheading'>Interseed or Not</th>

                <th className='attendanceheading'>Current Company</th>
                <th className='attendanceheading'>Total Experience</th>
                <th className='attendanceheading'>relevantExperience</th>
                <th className='attendanceheading'>Current CTC</th>
                <th className='attendanceheading'>Expected CTC</th>
                <th className='attendanceheading'>Date Of Birth</th>
                <th className='attendanceheading'>Gender</th>
                <th className='attendanceheading'>Qualification</th>
                <th className='attendanceheading'>Year Of Passing</th>
                <th className='attendanceheading'>Extra Certification</th>
                <th className='attendanceheading'>Feed Back</th>
                <th className='attendanceheading'>Holding Any Offer</th>
                <th className='attendanceheading'>Offer Letter Msg</th>
                <th className='attendanceheading'>Resume</th>
                <th className='attendanceheading'>NoticePeriod</th>
                <th className='attendanceheading'>Msg For TeamLeader</th>
                <th className='attendanceheading'>Availability For Interview</th>
                <th className='attendanceheading'>Interview Time</th>
                <th className='attendanceheading'>Final Status</th>
                <th className='attendanceheading'>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredCallingList.map((item, index) => (
                <tr key={item.candidateId} className='attendancerows'>
                  <td className='tabledata '>
                      <input
                        type="checkbox"
                        checked={selectedRows.includes(item.candidateId)}
                        onChange={() => handleSelectRow(item.candidateId)}
                      />
                    </td>
                  <td className='tabledata '  onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>{index + 1}</td>
                  <td className='tabledata '  onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>{item.date} <div className="tooltip">
                      <span className="tooltiptext">{item.date}</span>
                    </div></td>
                  <td className='tabledata '  onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>{item.candidateAddedTime || "0"} <div className="tooltip">
                      <span className="tooltiptext">{item.candidateAddedTime || "0"}</span>
                    </div></td>
                  <td className='tabledata '  onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>{item.candidateId} <div className="tooltip">
                      <span className="tooltiptext">{item.candidateId}</span>
                    </div></td>
                  <td className='tabledata '  onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>{item.recruiterName} <div className="tooltip">
                      <span className="tooltiptext">{item.recruiterName}</span>
                    </div></td>
                  <td className='tabledata '  onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>{item.candidateName} <div className="tooltip">
                      <span className="tooltiptext">{item.candidateName}</span>
                    </div></td>
                  <td className='tabledata '  onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>{item.candidateEmail} <div className="tooltip">
                      <span className="tooltiptext">{item.candidateEmail}</span>
                    </div></td>
                  <td className='tabledata '  onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>{item.contactNumber} <div className="tooltip">
                      <span className="tooltiptext">{item.contactNumber}</span>
                    </div></td>
                  <td className='tabledata '  onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>{item.alternateNumber} <div className="tooltip">
                      <span className="tooltiptext">{item.alternateNumber}</span>
                    </div></td>
                  <td className='tabledata '  onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>{item.sourceName} <div className="tooltip">
                      <span className="tooltiptext">{item.sourceName}</span>
                    </div></td>
                  <td className='tabledata '  onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>{item.jobDesignation} <div className="tooltip">
                      <span className="tooltiptext">{item.jobDesignation}</span>
                    </div></td>
                  <td className='tabledata '  onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>{item.requirementId} <div className="tooltip">
                      <span className="tooltiptext">{item.requirementId}</span>
                    </div></td>
                  <td className='tabledata '  onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>{item.requirementCompany} <div className="tooltip">
                      <span className="tooltiptext">{item.requirementCompany}</span>
                    </div></td>
                  <td className='tabledata '  onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>{item.communicationRating} <div className="tooltip">
                      <span className="tooltiptext">{item.communicationRating}</span>
                    </div></td>
                  <td className='tabledata '  onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>{item.currentLocation} <div className="tooltip">
                      <span className="tooltiptext">{item.currentLocation}</span>
                    </div></td>
                  <td className='tabledata '  onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>{item.fullAddress || "-"} <div className="tooltip">
                      <span className="tooltiptext">{item.fullAddress || "-"}</span>
                    </div></td>
                  <td className='tabledata '  onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>{item.callingFeedback} <div className="tooltip">
                      <span className="tooltiptext">{item.callingFeedback} </span>
                    </div></td>
                  <td className='tabledata '  onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>{item.incentive} <div className="tooltip">
                      <span className="tooltiptext">{item.incentive}</span>
                    </div></td>
                  <td className='tabledata '  onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>{item.selectYesOrNo} <div className="tooltip">
                      <span className="tooltiptext">{item.selectYesOrNo}</span>
                    </div></td>
                  
                  <td className='tabledata '  onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>{item.lineUp?.companyName} <div className="tooltip">
                      <span className="tooltiptext">{item.lineUp?.companyName}</span>
                    </div></td>
                  <td className='tabledata '  onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>
                    {item.lineUp?.experienceYear} Years
                    {item.lineUp?.experienceMonth} Month
                   <div className="tooltip">
                      <span className="tooltiptext"> {item.lineUp?.experienceYear} Years
                    {item.lineUp?.experienceMonth} Month</span>
                    </div></td>
                  <td className='tabledata '  onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>{item.lineUp?.relevantExperience} <div className="tooltip">
                      <span className="tooltiptext">{item.lineUp?.relevantExperience}</span>
                    </div></td>
                  <td className='tabledata '  onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>
                    {item.lineUp?.currentCTCLakh} Lakh
                    {item.lineUp?.currentCTCThousand} Thousand
                   <div className="tooltip">
                      <span className="tooltiptext">{item.lineUp?.currentCTCLakh} Lakh
                    {item.lineUp?.currentCTCThousand} Thousand</span>
                    </div></td>
                  <td className='tabledata '  onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>
                    {item.lineUp?.expectedCTCLakh} Lakh
                    {item.lineUp?.expectedCTCThousand} Thousand
                   <div className="tooltip">
                      <span className="tooltiptext">{item.lineUp?.expectedCTCLakh} Lakh
                    {item.lineUp?.expectedCTCThousand} Thousand</span>
                    </div></td>
                  <td className='tabledata '  onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>{item.lineUp?.dateOfBirth} <div className="tooltip">
                      <span className="tooltiptext">{item.lineUp?.dateOfBirth}</span>
                    </div></td>
                  <td className='tabledata '  onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>{item.lineUp?.gender} <div className="tooltip">
                      <span className="tooltiptext">{item.lineUp?.gender}</span>
                    </div></td>
                  <td className='tabledata '  onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>{item.lineUp?.qualification} <div className="tooltip">
                      <span className="tooltiptext">{item.lineUp?.qualification}</span>
                    </div></td>
                  <td className='tabledata '  onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>{item.lineUp?.yearOfPassing} <div className="tooltip">
                      <span className="tooltiptext">{item.lineUp?.yearOfPassing}</span>
                    </div></td>
                  <td className='tabledata '  onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>{item.lineUp?.extraCertification} <div className="tooltip">
                      <span className="tooltiptext">{item.lineUp?.extraCertification}</span>
                    </div></td>
                  <td className='tabledata '  onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>{item.lineUp?.feedBack} <div className="tooltip">
                      <span className="tooltiptext">{item.lineUp?.feedBack} </span>
                    </div></td>
                  <td className='tabledata '  onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>{item.lineUp?.holdingAnyOffer} <div className="tooltip">
                      <span className="tooltiptext">{item.lineUp?.holdingAnyOffer}</span>
                    </div></td>
                  <td className='tabledata '  onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>{item.lineUp?.offerLetterMsg} <div className="tooltip">
                      <span className="tooltiptext">{item.lineUp?.offerLetterMsg}</span>
                    </div></td>
                  <td className='tabledata '  onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>{item.lineUp?.resume || "-"} <div className="tooltip">
                      <span className="tooltiptext">{item.lineUp?.resume || "-"} </span>
                    </div></td>
                  <td className='tabledata '  onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>{item.lineUp?.noticePeriod} <div className="tooltip">
                      <span className="tooltiptext">{item.lineUp?.noticePeriod}</span>
                    </div></td>
                  <td className='tabledata '  onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>{item.lineUp?.msgForTeamLeader} <div className="tooltip">
                      <span className="tooltiptext">{item.lineUp?.msgForTeamLeader}</span>
                    </div></td>
                  <td className='tabledata '  onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>{item.lineUp?.availabilityForInterview} <div className="tooltip">
                      <span className="tooltiptext">{item.lineUp?.availabilityForInterview} </span>
                    </div></td>
                  <td className='tabledata '  onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>{item.lineUp?.interviewTime} <div className="tooltip">
                      <span className="tooltiptext">{item.lineUp?.interviewTime}</span>
                    </div></td>
                  <td className='tabledata '  onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>{item.lineUp?.finalStatus} <div className="tooltip">
                      <span className="tooltiptext">{item.lineUp?.finalStatus}</span>
                    </div></td>
                  <td className='tabledata '>
                     <i  onClick={() => viewPage(item.candidateId)} className="fa-solid fa-person-walking-arrow-right"></i>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        </>
      ) : (
        <AfterSelection
          candidateId={selectedCandidateId}
          employeeId={selectedEmployeeId}
          requirementId={selectedRequirementId}
          onReturn={handleReturn}
        />
      )}
    </div>
  );
};

export default SelectedCandidate;
