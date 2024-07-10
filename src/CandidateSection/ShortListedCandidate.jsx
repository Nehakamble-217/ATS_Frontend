import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../CandidateSection/shortlistedcandidate.css";
import UpdateCallingTracker from "../EmployeeSection/UpdateSelfCalling";
import InterviewDates from "../EmployeeSection/interviewDate";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

const ShortListedCandidates = ({ closeComponents, viewUpdatedPage }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterOptions, setFilterOptions] = useState([]);

  const [sortCriteria, setSortCriteria] = useState(null);
  const [sortOrder, setSortOrder] = useState("asc");

  const [shortListedData, setShortListedData] = useState([]);
  const [showUpdateCallingTracker, setShowUpdateCallingTracker] =
    useState(false);
  const [selectedCandidateId, setSelectedCandidateId] = useState(null);
  const [showFilterSection, setShowFilterSection] = useState(false);
  const [showselectedFilters, setShowselectedFilters] = useState(false);
  const [filteredShortListed, setFilteredShortListed] = useState([]);
  const [selectedFilters, setSelectedFilters] = useState({});
  const [showSearchBar, setShowSearchBar] = useState(false);
  const [fetchEmployeeNameID, setFetchEmployeeNameID] = useState(null);
  const [showShareButton, setShowShareButton] = useState(true);
  const [selectedEmployeeId, setSelectedEmployeeId] = useState(null);
  const [selectedRows, setSelectedRows] = useState([]);
  const [allSelected, setAllSelected] = useState(false); // New state to track if all rows are selected
  const [showForwardPopup, setShowForwardPopup] = useState(false);

  const { employeeId } = useParams();
  const newEmployeeId = parseInt(employeeId, 10);
  const navigator = useNavigate();

  useEffect(() => {
    fetchShortListedData();
    fetchEmployeeNameAndID();
  }, []);

  const fetchEmployeeNameAndID = async () => {
    try {
      const response = await fetch(
        `http://192.168.1.48:8891/api/ats/157industries/names-and-ids`
      );
      const data = await response.json();
      setFetchEmployeeNameID(data);
    } catch (error) {
      console.error("Error fetching shortlisted data:", error);
    }
  };
  const handleSort = (criteria) => {
    if (criteria === sortCriteria) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortCriteria(criteria);
      setSortOrder("asc");
    }
  };

  const fetchShortListedData = async () => {
    try {
      const response = await fetch(
        `http://192.168.1.48:8891/api/ats/157industries/shortListed-date/${newEmployeeId}`
      );
      const data = await response.json();
      setShortListedData(data);
      setFilteredShortListed(data);
      console.log(data);
    } catch (error) {
      console.error("Error fetching shortlisted data:", error);
    }
  };

  const handleUpdateSuccess = () => {
    setShowUpdateCallingTracker(false);
    fetchShortListedData(); // Corrected from fetchRejectedData to fetchShortListedData
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

  const handleSelectAll = (event) => {
    if (event.target.checked) {
      const allRowIds = filteredLineUpList.map((item) => item.candidateId);
      setSelectedRows(allRowIds);
    } else {
      setSelectedRows([]);
    }
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

  const handleShare = async () => {
    if (selectedEmployeeId && selectedRows.length > 0) {
      const url = `http://192.168.1.48:8891/api/ats/157industries/updateEmployeeIds`; // Replace with your actual API endpoint
      const requestData = {
        employeeId: selectedEmployeeId,
        candidateIds: selectedRows,
      };

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
          throw new Error(`error! Status: ${response.status}`);
        }

        // Handle success response
        console.log("Candidates forwarded successfully!");
        setShowForwardPopup(false); // Close the modal or handle any further UI updates
        setShowShareButton(true);
        setSelectedRows([]);
        // Optionally, you can fetch updated data after successful submission
        // fetchShortListedData(); // Uncomment this if you want to refresh the data after forwarding
      } catch (error) {
        console.error("Error while forwarding candidates:", error);
        // Handle error scenarios or show error messages to the user
      }
    }

  };
  useEffect(() => {
    const options = Object.keys(filteredShortListed[0] || {}).filter(
      (key) => key !== "candidateId"
    );
    setFilterOptions(options);
  }, [filteredShortListed]);

  useEffect(() => {
    console.log("Selected Filters:", selectedFilters);
  }, [selectedFilters]);

  useEffect(() => {
    console.log("Filtered ShortListed List:", filteredShortListed);
  }, [filteredShortListed]);

  useEffect(() => {
    const limitedOptions = [
      "date",
      "recruiterName",
      "jobDesignation",
      "requirementId",
    ];
    setFilterOptions(limitedOptions);
  }, [shortListedData]);

  useEffect(() => {
    filterData();
  }, [selectedFilters, shortListedData]);

  useEffect(() => {
    const filtered = shortListedData.filter((item) => {
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
          item.selectYesOrNo.toLowerCase().includes(searchTermLower)) ||
        (item.totalExperience &&
          item.totalExperience.toLowerCase().includes(searchTermLower)) ||
        (item.dateOfBirth &&
          item.dateOfBirth.toLowerCase().includes(searchTermLower)) ||
        (item.gender && item.gender.toLowerCase().includes(searchTermLower)) ||
        (item.qualification &&
          item.qualification.toLowerCase().includes(searchTermLower)) ||
        (item.companyName &&
          item.companyName.toLowerCase().includes(searchTermLower))
      );
    });
    setFilteredShortListed(filtered);
  }, [searchTerm, shortListedData]);

  useEffect(() => {
    if (sortCriteria) {
      const sortedList = [...filteredShortListed].sort((a, b) => {
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
      setFilteredShortListed(sortedList);
    }
  }, [sortCriteria, sortOrder]);

  const filterData = () => {
    let filteredData = [...shortListedData];
    Object.entries(selectedFilters).forEach(([option, values]) => {
      if (values.length > 0) {
        if (option === "requirementId") {
          filteredData = filteredData.filter((item) =>
            values.includes(item[option]?.toString())
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
    setFilteredShortListed(filteredData);
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

  const toggleFilterSection = () => {
    setShowFilterSection(!showFilterSection);
  };
  const toggleselectedFilters = () => {
    setShowselectedFilters(!showselectedFilters);
  };

  //Name:-Akash Pawar Component:-ShortListedCandidate Subcategory:-ResumeViewButton(added) start LineNo:-165 Date:-02/07
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
  //Name:-Akash Pawar Component:-ShortListedCandidate Subcategory:-ResumeViewButton(added) End LineNo:-196 Date:-02/07

  return (
    <div className="calling-list-container">
      {!showUpdateCallingTracker ? (
        <div className="attendanceTableData">
          <div className="search">
            <i
              className="fa-solid fa-magnifying-glass"
              onClick={() => setShowSearchBar(!showSearchBar)}
              style={{ margin: "10px", width: "auto", fontSize: "15px" }}
            ></i>
            <h5 style={{ color: "gray", paddingTop: "5px" }}>
              Shortlisted Candidate
            </h5>

            <div
              style={{
                display: "flex",
                gap: "5px",
                justifyContent: "center",
                alignItems: "center",
                paddingTop: "3px",
              }}
            >
              {showShareButton ? (
                <button
                  className="lineUp-share-btn"
                  onClick={() => setShowShareButton(false)}
                >
                  Share
                </button>
              ) : (
                <div style={{ display: "flex", gap: "5px" }}>
                  <button
                    className="lineUp-share-btn"
                    onClick={() => {
                      setShowShareButton(true);
                      setSelectedRows([]);
                    }}
                  >
                    Close
                  </button>
                  <button
                    className="lineUp-share-btn"
                    onClick={handleSelectAll}
                  >
                    {allSelected ? "Deselect All" : "Select All"}
                  </button>
                  <button
                    className="lineUp-share-btn"
                    onClick={forwardSelectedCandidate}
                  >
                    Forward
                  </button>
                </div>
              )}
              <button
                className="lineUp-share-btn"
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
              <h5 style={{ color: "gray", paddingTop: "5px" }}>Filter</h5>

              <div className="filter-dropdowns">
                {/* <button onClick={onCloseTable} style={{ float: 'right' }}>Close</button> */}

                {filterOptions.map((option) => (
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
                            checked={
                              !selectedFilters[option] ||
                              selectedFilters[option].length === 0
                            }
                            onChange={() => handleFilterSelect(option, "All")}
                          />
                          <label htmlFor={`${option}-All`}>All</label>
                        </div>
                        {[
                          ...new Set(
                            shortListedData.map((item) => item[option])
                          ),
                        ].map((value) => (
                          <div key={value}>
                            <input
                              type="checkbox"
                              id={`${option}-${value}`}
                              value={value}
                              checked={
                                selectedFilters[option]?.includes(value) ||
                                false
                              }
                              onChange={() => handleFilterSelect(option, value)}
                            />
                            <label htmlFor={`${option}-${value}`}>
                              {value}
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          <table id="shortlisted-table-id" className="attendance-table">
            <thead>
              <tr className="attendancerows-head">
                {!showShareButton ? (
                  <th className="attendanceheading">
                    <input
                      type="checkbox"
                      onChange={handleSelectAll}
                      checked={selectedRows.length === shortListedData.length}
                      name="selectAll"
                    />
                  </th>
                ) : null}
                <th className="attendanceheading"> No.</th>
                <th className="attendanceheading">Date</th>
                <th className="attendanceheading">Time</th>
                <th className="attendanceheading">Candidate's Id</th>
                <th className="attendanceheading">Recruiter's Name</th>
                <th className="attendanceheading">Candidate's Name</th>
                <th className="attendanceheading">Candidate's Email</th>
                <th className="attendanceheading">Contact Number</th>
                <th className="attendanceheading">Whatsapp Number</th>
                <th className="attendanceheading">Source Name</th>
                <th className="attendanceheading">Job Designation</th>
                <th className="attendanceheading">Job Id</th>
                <th className="attendanceheading">Applying Company</th>
                <th className="attendanceheading">Communication Rating</th>
                <th className="attendanceheading">Current Location</th>
                <th className="attendanceheading">Full Address</th>
                <th className="attendanceheading">Calling Remark</th>
                <th className="attendanceheading">Recruiter's Incentive</th>
                <th className="attendanceheading">Interested or Not</th>
                <th className="attendanceheading">Current Company</th>
                <th className="attendanceheading">Total Experience</th>
                <th className="attendanceheading">Relevant Experience</th>
                <th className="attendanceheading">Current CTC</th>
                <th className="attendanceheading">Expected CTC</th>
                <th className="attendanceheading">Date Of Birth</th>
                <th className="attendanceheading">Gender</th>
                <th className="attendanceheading">Education</th>
                <th className="attendanceheading">Year Of Passing</th>
                <th className="attendanceheading">Call Summary</th>
                {/* call summary */}
                {/* <th className="attendanceheading">Feedback</th> */}
                <th className="attendanceheading">Holding Any Offer</th>
                <th className="attendanceheading">Offer Letter Message</th>
                <th className="attendanceheading">Resume</th>
                <th className="attendanceheading">Notice Period</th>
                <th className="attendanceheading">Message For Team Leader</th>
                <th className="attendanceheading">Interview Slot</th>
                <th className="attendanceheading">Interview Time</th>
                <th className="attendanceheading">Final Status</th>
                <th className="attendanceheading">Action</th>
              </tr>
            </thead>
            <tbody>
              {shortListedData.map((item, index) => (
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
                    {item.candidateAddedTime}
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
                      <span className="tooltiptext">{item.candidateId}</span>
                    </div>
                  </td>
                  <td
                    className="tabledata"
                    onMouseOver={handleMouseOver}
                    onMouseOut={handleMouseOut}
                  >
                    {item.recruiterName}
                    <div className="tooltip">
                      <span className="tooltiptext">{item.recruiterName}</span>
                    </div>
                  </td>
                  <td
                    className="tabledata"
                    onMouseOver={handleMouseOver}
                    onMouseOut={handleMouseOut}
                  >
                    {item.candidateName}
                    <div className="tooltip">
                      <span className="tooltiptext">{item.candidateName}</span>
                    </div>
                  </td>
                  <td
                    className="tabledata"
                    onMouseOver={handleMouseOver}
                    onMouseOut={handleMouseOut}
                  >
                    {item.candidateEmail}
                    <div className="tooltip">
                      <span className="tooltiptext">{item.candidateEmail}</span>
                    </div>
                  </td>
                  <td
                    className="tabledata"
                    onMouseOver={handleMouseOver}
                    onMouseOut={handleMouseOut}
                  >
                    {item.contactNumber}
                    <div className="tooltip">
                      <span className="tooltiptext">{item.contactNumber}</span>
                    </div>
                  </td>
                  <td
                    className="tabledata"
                    onMouseOver={handleMouseOver}
                    onMouseOut={handleMouseOut}
                  >
                    {item.alternateNumber}
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
                    {item.sourceName}
                    <div className="tooltip">
                      <span className="tooltiptext">{item.sourceName}</span>
                    </div>
                  </td>
                  <td
                    className="tabledata"
                    onMouseOver={handleMouseOver}
                    onMouseOut={handleMouseOut}
                  >
                    {item.jobDesignation}
                    <div className="tooltip">
                      <span className="tooltiptext">{item.jobDesignation}</span>
                    </div>
                  </td>
                  <td
                    className="tabledata"
                    onMouseOver={handleMouseOver}
                    onMouseOut={handleMouseOut}
                  >
                    {item.jobId}
                    <div className="tooltip">
                      <span className="tooltiptext">{item.jobId}</span>
                    </div>
                  </td>
                  <td
                    className="tabledata"
                    onMouseOver={handleMouseOver}
                    onMouseOut={handleMouseOut}
                  >
                    {item.applyingCompany}
                    <div className="tooltip">
                      <span className="tooltiptext">
                        {item.applyingCompany}
                      </span>
                    </div>
                  </td>
                  <td
                    className="tabledata"
                    onMouseOver={handleMouseOver}
                    onMouseOut={handleMouseOut}
                  >
                    {item.communicationRating}
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
                    {item.currentLocation}
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
                    {item.fullAddress}
                    <div className="tooltip">
                      <span className="tooltiptext">{item.fullAddress}</span>
                    </div>
                  </td>
                  <td className="tabledata">{item.callingFeedback}</td>
                  <td className="tabledata">{item.incentive}</td>
                  <td className="tabledata">{item.interseedOrNot}</td>
                  <td className="tabledata">{item.currentCompany}</td>
                  <td className="tabledata">{item.totalExperience}</td>
                  <td className="tabledata">{item.relevantExperience}</td>
                  <td className="tabledata">{item.currentCTC}</td>
                  <td className="tabledata">{item.expectedCTC}</td>
                  <td className="tabledata">{item.dateOfBirth}</td>
                  <td className="tabledata">{item.gender}</td>
                  <td className="tabledata">{item.qualification}</td>
                  <td className="tabledata">{item.yearOfPassing}</td>
                  <td className="tabledata">
                    {item.linup?.extraCertification}
                  </td>
                  {/* <td className="tabledata">{item.feedback}</td> */}
                  <td className="tabledata">{item.holdingAnyOffer}</td>
                  <td className="tabledata">{item.offerLetterMsg}</td>
                  {/* <td className="tabledata">{item.lineUp.resume}</td> */}
                  {/* Name:-Akash Pawar Component:-ShortListedCandidate
                  Subcategory:-ResumeViewButton(added) start LineNo:-546
                  Date:-02/07 */}
                  <td className="tabledata">
                    <button
                      className="text-secondary"
                      onClick={() => openResumeModal(item.resume)}
                    >
                      <i className="fas fa-eye"></i>
                    </button>
                  </td>
                  {/* Name:-Akash Pawar Component:-ShortListedCandidate
                  Subcategory:-ResumeViewButton(added) End LineNo:-558
                  Date:-02/07 */}
                  <td className="tabledata">{item.noticePeriod}</td>
                  <td className="tabledata">{item.msgForTeamLeader}</td>
                  <td className="tabledata">{item.availabilityForInterview}</td>
                  <td className="tabledata">{item.interviewTime}</td>
                  <td className="tabledata">{item.finalStatus}</td>
                  <td className="tabledata">
                    <button
                      className="lineUp-share-btn"
                      onClick={() => handleUpdate(item.candidateId)}
                    >
                      Update
                    </button>
                  </td>
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
                    style={{ fontSize: "18px", backgroundColor: "#f2f2f2" }}
                  >
                    Forward To
                  </Modal.Header>
                  <Modal.Body
                    style={{
                      display: "grid",
                      gap: "10px",
                      gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
                      backgroundColor: "#f2f2f2",
                    }}
                  >
                    {fetchEmployeeNameID.map((item) => (
                      <>
                        <div
                          key={`${item[0]}`}
                          className=""
                          style={{
                            display: "flex",
                            gap: "20px",
                            columnSpan: "span 1 / span 1",
                          }}
                        >
                          <input
                            type="radio"
                            id={`${item[0]}`}
                            name="forward"
                            value={`${item[0]}`}
                            onChange={(e) =>
                              setSelectedEmployeeId(e.target.value)
                            }
                          />
                          <label htmlFor={`${item[0]}`}>{item[1]}</label>
                        </div>
                      </>
                    ))}
                  </Modal.Body>
                  <Modal.Footer style={{ backgroundColor: "#f2f2f2" }}>
                    <button
                      onClick={handleShare}
                      className="shortlistedcan-share-forward-popup-btn"
                    >
                      Share
                    </button>
                    <button
                      onClick={() => setShowForwardPopup(false)}
                      className="shortlistedcan-close-forward-popup-btn"
                    >
                      Close
                    </button>
                  </Modal.Footer>
                </Modal.Dialog>
              </div>
            </>
          ) : null}
          {/* Name:-Akash Pawar Component:-ShortListedCandidate
          Subcategory:-ResumeModel(added) End LineNo:-656 Date:-02/07 */}
          <Modal show={showResumeModal} onHide={closeResumeModal} size="md">
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
          {/* Name:-Akash Pawar Component:-ShortListedCandidate
          Subcategory:-ResumeModel(added) End LineNo:-681 Date:-02/07 */}
        </div>
      ) : (
        <UpdateCallingTracker
          candidateId={selectedCandidateId}
          closeComponent={() => setShowUpdateCallingTracker(false)}
          updateSuccess={handleUpdateSuccess}
        />
      )}
    </div>
  );
};

export default ShortListedCandidates;
