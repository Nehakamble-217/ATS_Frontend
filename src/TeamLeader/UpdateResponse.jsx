import React, { useEffect, useState } from "react";
import "./UpdateResponse.css";
import { Button, Modal } from "react-bootstrap";
import { data } from "autoprefixer";
import UpdateResponseFrom from "./UpdateResponseFrom";

const UpdateResponse = ({ onSuccessAdd }) => {
  const [updateResponseList, setUpdateResponseList] = useState([]);
  const [filteredResponseList, setFilteredResponseList] = useState([]);
  const [showUpdateResponseForm, setShowUpdateResponseForm] = useState(false);
  const [showUpdateResponseID, setShowUpdateResponseID] = useState();
  const [showEmployeeId, setShowEmployeeId] = useState();
  const [showRequirementId, setShowRequirementId] = useState();
  const [showSearch, setShowSearch] = useState(false);
  const [filterType, setFilterType] = useState("");
  const [filterValue, setFilterValue] = useState("");
  const [callingList, setCallingList] = useState([]);
  const [filteredCallingList, setFilteredCallingList] = useState([]);
  const [selectedFilters, setSelectedFilters] = useState({});
  const [showFilterOptions, setShowFilterOptions] = useState(false);
  const [activeFilterOption, setActiveFilterOption] = useState(null); // New state to track the active filter option
  const filterOptions = ["candidateId", "candidateName", "jobDesignation","requirementId","employeeId","employeeName"];

  useEffect(() => {
    fetchUpdateResponseList();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [filterType, filterValue, updateResponseList]);

  useEffect(() => {
    filterData();
  }, [selectedFilters, callingList]);

  const fetchUpdateResponseList = async () => {
    try {
      const res = await fetch(
        `http://192.168.1.48:8891/api/ats/157industries/fetch-all-shortlisted-data`
      );
      const data = await res.json();
      setCallingList(data);
      setFilteredCallingList(data);
    } catch (err) {
      console.log("Error fetching shortlisted data:", err);
    }
  };

  const applyFilters = () => {
    if (!filterType || !filterValue) {
      setFilteredResponseList(updateResponseList);
      return;
    }

    const filteredList = updateResponseList.filter((data) => {
      return data[filterType]?.toString().toLowerCase().includes(filterValue.toLowerCase());
    });

    setFilteredResponseList(filteredList);
  };

  const handleFilterTypeChange = (e) => {
    setFilterType(e.target.value);
    setFilterValue("");
  };

  const handleFilterValueChange = (e) => {
    setFilterValue(e.target.value);
  };

  const convertToDocumentLink = (byteCode, fileName) => {
    if (byteCode) {
      try {
        const fileType = fileName.split(".").pop().toLowerCase();

        if (fileType === "pdf") {
          const binary = atob(byteCode);
          const array = new Uint8Array(binary.length);
          for (let i = 0; i < binary.length; i++) {
            array[i] = binary.charCodeAt(i);
          }
          const blob = new Blob([array], { type: "application/pdf" });
          return URL.createObjectURL(blob);
        }

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

  const handleUpdateClick = (candidateId, employeeId, requirementId) => {
    setShowUpdateResponseID(candidateId);
    setShowEmployeeId(employeeId);
    setShowRequirementId(requirementId);
    setShowUpdateResponseForm(true);
  };

  const closeUpdateForm = () => {
    setShowUpdateResponseID(null);
    setShowEmployeeId(null);
    setShowRequirementId(null);
    setShowUpdateResponseForm(false);
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

  const filterData = () => {
    let filteredData = [...callingList];
    Object.entries(selectedFilters).forEach(([option, values]) => {
      if (values.length > 0) {
        if (option === "candidateId") {
          filteredData = filteredData.filter((item) =>
            values.some((value) =>
              item[option]
                ?.toString()
                .toLowerCase()
                .includes(value)
            )
          );
        } else if(option === "requirementId")
        {
          filteredData = filteredData.filter((item) =>
            values.some((value) =>
              item[option]
                ?.toString()
                .toLowerCase()
                .includes(value)
            )
          );
        }
        else if(option === "employeeId")
          {
            filteredData = filteredData.filter((item) =>
              values.some((value) =>
                item[option]
                  ?.toString()
                  .toLowerCase()
                  .includes(value)
              )
            );
          }
         else {
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

  const handleFilterOptionClick = (option) => {
    if (activeFilterOption === option) {
      setActiveFilterOption(null); // Hide if already active
    } else {
      setActiveFilterOption(option); // Show selected option
    }
  };

  return (

    // SwapnilRokade_UpdateResponse_FilterAdded_7_to_504_10/07"
    <div className="TeamLead-main">
      {!showUpdateResponseForm ? (
        <>
          <div className="TeamLead-main-filter-section">
            <div className="TeamLead-main-filter-section-header">
              <div className="search" onClick={() => setShowSearch(!showSearch)}>
                <i className="fa-solid fa-magnifying-glass"></i>
              </div>
              <h1>Update Response</h1>
              <div>
                <button className="lineUp-share-btn" onClick={() => setShowFilterOptions(!showFilterOptions)}>
                  Filter
                </button>
              </div>
            </div>
            {showSearch && (
              <div className="TeamLead-main-filter-section-container">
                <input
                  type="text"
                  placeholder="Enter filter value"
                  className="search-input"
                  value={filterValue}
                  onChange={handleFilterValueChange}
                  disabled={!filterType}
                />
                <select className="white-Btn" value={filterType} onChange={handleFilterTypeChange}>
                  <option value="">Select Filter Type</option>
                  <option value="candidateId">Candidate ID</option>
                  <option value="candidateName">Candidate Name</option>
                  <option value="requirementId">Requirement ID</option>
                  <option value="requirementCompany">Requirement Company</option>
                  <option value="jobDesignation">Job Designation</option>
                  <option value="employeeName">Employee Name</option>
                  <option value="employeeId">Employee ID</option>
                </select>
              </div>
            )}
            {showFilterOptions && (
              <div className="filter-options-container">
                {filterOptions.map((option) => {
                  const uniqueValues = Array.from(
                    new Set(callingList.map((item) => item[option]))
                  );
                  return (
                    <div key={option} className="filter-option">
                      <button className="white-Btn" onClick={() => handleFilterOptionClick(option)}>
                        {option}
                        <span className="filter-icon">&#x25bc;</span>
                      </button>
                      {activeFilterOption === option && (
                        <div className="city-filter">
                          <div className="optionDiv">
                            {uniqueValues.map((value) => (
                              <label key={value} className="selfcalling-filter-value">
                                <input
                                  type="checkbox"
                                  checked={selectedFilters[option]?.includes(value) || false}
                                  onChange={() => handleFilterSelect(option, value)}
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
          <div className="attendanceTableData">
          <table className="attendance-table">
              <thead>
                <tr className="attendancerows-head">
                  <th className="attendanceheading">Sr No</th>
                  <th className="attendanceheading">Candidate ID</th>
                  <th className="attendanceheading">Candidate Name</th>
                  <th className="attendanceheading">Candidate Email</th>
                  <th className="attendanceheading">Contact Number</th>
                  <th className="attendanceheading">Requirement ID</th>
                  <th className="attendanceheading">Requirement Company</th>
                  <th className="attendanceheading">Job Designation</th>
                  <th className="attendanceheading">Comment for TL</th>
                  <th className="attendanceheading">Final Status</th>
                  <th className="attendanceheading">Interview Round</th>
                  <th className="attendanceheading">Interview Response</th>
                  <th className="attendanceheading">Response Updated Date</th>
                  <th className="attendanceheading">Next Interview Date</th>
                  <th className="attendanceheading">Next Interview Timing</th>
                  <th className="attendanceheading">Employee ID</th>
                  <th className="attendanceheading">Employee Name</th>
                  <th className="attendanceheading">Official Mail</th>
                  <th className="attendanceheading">Job Role</th>
                  <th className="attendanceheading">View Resume</th>
                  <th className="attendanceheading">Reporting Manager Name</th>
                  <th className="attendanceheading">Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredCallingList.map((data, index) => (
                  <tr key={index} className="attendancerows">
                    <td className="tabledata">{index +1}</td>
                    <td className="tabledata">{data.candidateId}</td>
                    <td
                      className="tabledata"
                      onMouseOver={handleMouseOver}
                      onMouseOut={handleMouseOut}
                    >
                      {data.candidateName || "-"}
                      <div className="tooltip">
                        <span className="tooltiptext">
                          {data.candidateName}
                        </span>
                      </div>
                    </td>
                    <td
                      className="tabledata"
                      onMouseOver={handleMouseOver}
                      onMouseOut={handleMouseOut}
                    >
                      {data.candidateEmail || "-"}
                      <div className="tooltip">
                        <span className="tooltiptext">
                          {data.candidateEmail}
                        </span>
                      </div>
                    </td>
                    <td className="tabledata">{data.contactNumber}</td>
                    <td className="tabledata">{data.requirementId}</td>
                    <td
                      className="tabledata"
                      onMouseOver={handleMouseOver}
                      onMouseOut={handleMouseOut}
                    >
                      {data.requirementCompany || "-"}
                      <div className="tooltip">
                        <span className="tooltiptext">
                          {data.requirementCompany }
                        </span>
                      </div>
                    </td>
                    <td className="tabledata"  onMouseOver={handleMouseOver}
                      onMouseOut={handleMouseOut}
                    >
                      {data.jobDesignation || "-"}
                      <div className="tooltip">
                        <span className="tooltiptext">
                          {data.jobDesignation}
                        </span>
                      </div>
                      </td>
                    <td className="tabledata">{data.commentForTL || "-"}
                    <div className="tooltip"  onMouseOver={handleMouseOver}
                      onMouseOut={handleMouseOut}
                     >
                        <span className="tooltiptext">
                          {data.commentForTL}
                        </span>
                      </div>
                    </td>
                    <td className="tabledata"  onMouseOver={handleMouseOver}
                      onMouseOut={handleMouseOut}
                    >{data.finalStatus || "-"}
                    <div className="tooltip">
                        <span className="tooltiptext">
                          {data.finalStatus}
                        </span>
                      </div>

                    </td>
                    <td className="tabledata"  onMouseOver={handleMouseOver}
                      onMouseOut={handleMouseOut}
                    >{data.interviewRound || "-"}
                    <div className="tooltip">
                        <span className="tooltiptext">
                          {data.interviewRound}
                        </span>
                      </div>

                    </td>
                    <td className="tabledata"  onMouseOver={handleMouseOver}
                      onMouseOut={handleMouseOut}
                    >{data.interviewResponse || "-"}
                    <div className="tooltip">
                        <span className="tooltiptext">
                          {data.interviewResponse}
                        </span>
                      </div>
                    </td>
                    <td className="tabledata"  onMouseOver={handleMouseOver}
                      onMouseOut={handleMouseOut}
                    >{data.responseUpdatedDate || "-"}
                    <div className="tooltip">
                        <span className="tooltiptext">
                          {data.responseUpdatedDate}
                        </span>
                      </div>
                    </td>
                    <td className="tabledata">{data.nextInterviewDate}</td>
                    <td className="tabledata">{data.nextInterviewTiming}</td>
                    <td className="tabledata">{data.employeeId}</td>
                    <td className="tabledata">{data.employeeName}</td>
                    <td className="tabledata"  onMouseOver={handleMouseOver}
                      onMouseOut={handleMouseOut}
                    >{data.officialMail || "-"}
                    <div className="tooltip">
                        <span className="tooltiptext">
                          {data.officialMail}
                        </span>
                      </div>
                    </td>
                    <td className="tabledata">{data.jobRole}</td>
                    <td className="tabledata">
                      <button
                        className="text-secondary"
                        onClick={() => openResumeModal(data.resume)}
                      >
                        <i className="fas fa-eye"></i>
                      </button>
                    </td>
                    <td className="tabledata">{data.reportingManagerName}</td>
                    <td className=" TeamLead-main-table-td">
                      <button
                        className="TeamLead-main-table-button"
                        onClick={() => handleUpdateClick(data.candidateId, data.employeeId, data.requirementId)}
                      >
                        Update
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
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
        </>
      ) : (
        <>
          <Modal
            show={showUpdateResponseForm}
            onHide={closeUpdateForm}
            size="xl"
            centered
          >
            <Modal.Body>
              <div className="TeamLead-main-table-container">
              <UpdateResponseFrom
                  candidateId={showUpdateResponseID}
                  employeeId={showEmployeeId}
                  requirementId={showRequirementId}
                  onClose={closeUpdateForm}
                  onSuccessAdd={onSuccessAdd}
                />
              </div>
            </Modal.Body>
          </Modal>
        </>
      )}
    </div>
  );
};

export default UpdateResponse;
