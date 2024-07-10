import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../EmployeeSection/callingList.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import UpdateCallingTracker from "./UpdateSelfCalling";
import Modal from "react-bootstrap/Modal";
import HashLoader from "react-spinners/HashLoader";

const CallingList = ({ updateState, funForGettingCandidateId ,onSuccessAdd}) => {
  const [searchTerm, setSearchTerm] = useState("");
  let [color, setColor] = useState("#ffcb9b");
  const [filterOptions, setFilterOptions] = useState([]);
  const [sortCriteria, setSortCriteria] = useState(null);
  const [sortOrder, setSortOrder] = useState("asc");
  const [callingList, setCallingList] = useState([]);
  const [showFilterSection, setShowFilterSection] = useState(false);
  const [showselectedFilters, setShowselectedFilters] = useState(false);
  const [filteredCallingList, setFilteredCallingList] = useState([]);
  const [showCallingForm, setShowCallingForm] = useState(false);
  const [callingToUpdate, setCallingToUpdate] = useState(null);
  const [selectedFilters, setSelectedFilters] = useState({});
  const [loading, setLoading] = useState(true); // Add loading state

  const [selectedCandidateId, setSelectedCandidateId] = useState();
  const [showSearchBar, setShowSearchBar] = useState(false);

  const [fetchEmployeeNameID, setFetchEmployeeNameID] = useState(null);
  const [showShareButton, setShowShareButton] = useState(true);
  const [selectedEmployeeId, setSelectedEmployeeId] = useState(null);
  const [selectedRows, setSelectedRows] = useState([]);
  const [allSelected, setAllSelected] = useState(false); // New state to track if all rows are selected
  const [showForwardPopup, setShowForwardPopup] = useState(false);

  const { employeeId } = useParams();
  const employeeIdw = parseInt(employeeId);
  // console.log(employeeIdw + "emp @@@@ id");
  // console.log(employeeId + "emp 1111 id");

  const [showUpdateCallingTracker, setShowUpdateCallingTracker] =
    useState(false);

  const navigator = useNavigate();

  const limitedOptions = [
    "date",
    "recruiterName",
    "jobDesignation",
    "requirementId",
    "sourceName",
    "requirementCompany",
    "selectYesOrNo",
  ];

  useEffect(() => {
    fetch(
      `http://192.168.1.48:8891/api/ats/157industries/callingData/${employeeId}`
    )
      .then((response) => response.json())
      .then((data) => {
        setCallingList(data);
        setFilteredCallingList(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        // alert("Failed to Fetch")
        setLoading(false);
      });
  }, [employeeId]);

  useEffect(() => {
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
    fetchEmployeeNameAndID();
  }, []);

  useEffect(() => {
    const options = Object.keys(filteredCallingList[0] || {}).filter((key) =>
      limitedOptions.includes(key)
    );
    setFilterOptions(options);
  }, [filteredCallingList]);

  useEffect(() => {
    console.log("Selected Filters:", selectedFilters);
  }, [selectedFilters]);

  useEffect(() => {
    console.log("Filtered Calling List:", filteredCallingList);
  }, [filteredCallingList]);

  useEffect(() => {
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

  const handleUpdate = (candidateId) => {
    setSelectedCandidateId(candidateId); // Set candidateId for UpdateCallingTracker
    setShowUpdateCallingTracker(true); // Show UpdateCallingTracker
  };

  const handleUpdateSuccess = () => {
    fetch(
      `http://192.168.1.48:8891/api/ats/157industries/callingData/${employeeId}`
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

  const toggleFilterSection = () => {
    setShowFilterSection(!showFilterSection);
  };
  const toggleselectedFilters = () => {
    setShowselectedFilters(!showselectedFilters);
  };

  const handleSelectAll = () => {
    if (allSelected) {
      setSelectedRows([]);
    } else {
      const allRowIds = callingList.map((item) => item.candidateId);
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
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        // Handle success response
        console.log("Candidates forwarded successfully!");
        onSuccessAdd(true);
        setShowForwardPopup(false); // Close the modal or handle any further UI updates
        setShowShareButton(true);
        setSelectedRows([]);
        // Optionally, you can fetch updated data after successful submission
        // fetchShortListedData(); // Uncomment this if you want to refresh the data after forwarding
      } catch (error) {
        console.error("Error while forwarding candidates:", error);
        onSuccessAdd(false);
        // Handle error scenarios or show error messages to the user
      }
    }
  };
  // neha
  // selfcalling tracker form and employee master sheet
  // After share btn click ->close ,select-all, and forword btn
  // 01/07/2024

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
          {!showUpdateCallingTracker && !showCallingForm && (
            <>
              <div className="search">
                <i
                  className="fa-solid fa-magnifying-glass"
                  onClick={() => setShowSearchBar(!showSearchBar)}
                  style={{ margin: "10px", width: "auto", fontSize: "15px" }}
                ></i>
                <h5 style={{ color: "gray", paddingTop: "5px" }}>
                  Calling Tracker
                </h5>

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
                      className="callingList-share-btn"
                      onClick={() => setShowShareButton(false)}
                    >
                      Share
                    </button>
                  ) : (
                    <div style={{ display: "flex", gap: "5px" }}>
                      <button
                        className="callingList-share-btn"
                        onClick={() => {
                          setShowShareButton(true);
                          setSelectedRows([]);
                        }}
                      >
                        Close
                      </button>
                      <button
                        className="callingList-share-btn"
                        onClick={handleSelectAll}
                      >
                        {allSelected ? "Deselect All" : "Select All"}
                      </button>
                      <button
                        className="callingList-share-btn"
                        onClick={forwardSelectedCandidate}
                      >
                        Forward
                      </button>
                    </div>
                  )}
                  <button
                    className="callingList-share-btn"
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
                  <h3>Filter Options</h3>
                  <div className="filter-options-container">
                    {filterOptions.map((option) => {
                      const uniqueValues = Array.from(
                        new Set(callingList.map((item) => item[option]))
                      ).slice(0, 5);
                      return (
                        <div key={option} className="selfcalling-filter-option">
                          <button
                            className="callingList-filter-btn"
                            onClick={toggleselectedFilters}
                          >
                            {option}
                          </button>
                          {uniqueValues.map((value) => (
                            <label
                              key={value}
                              className="selfcalling-filter-value"
                            >
                              <input
                                type="checkbox"
                                checked={
                                  selectedFilters[option]?.includes(value) ||
                                  false
                                }
                                onChange={() =>
                                  handleFilterSelect(option, value)
                                }
                              />
                              {value}
                            </label>
                          ))}
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              <div className="attendanceTableData">
                <table className="selfcalling-table attendance-table">
                  <thead>
                    <tr className="attendancerows-head">
                      {!showShareButton ? (
                        <th className="attendanceheading">
                          <input
                            type="checkbox"
                            onChange={handleSelectAll}
                            checked={selectedRows.length === callingList.length}
                            name="selectAll"
                          />
                        </th>
                      ) : null}
                      <th className="attendanceheading">No.</th>
                      <th
                        className="attendanceheading"
                        onClick={() => handleSort("date")}
                      >
                        Date & Time {getSortIcon("date")}
                      </th>
                      <th className="attendanceheading">Candidate's Id</th>
                      <th
                        className="attendanceheading"
                        onClick={() => handleSort("recruiterName")}
                      >
                        Recruiter's Name {getSortIcon("recruiterName")}
                      </th>
                      <th className="attendanceheading">Candidate's Name</th>
                      <th className="attendanceheading">Candidate's Email</th>
                      <th className="attendanceheading">Contact Number</th>
                      <th className="attendanceheading">Whatsapp Number</th>
                      <th hidden className="attendanceheading">
                        Source Name
                      </th>

                      <th className="attendanceheading">Disignation</th>
                      <th
                        className="attendanceheading"
                        onClick={() => handleSort("requirementId")}
                      >
                        Job Id {getSortIcon("requirementId")}
                      </th>
                      <th className="attendanceheading">Applying Company</th>
                      <th className="attendanceheading">
                        Communication Rating
                      </th>
                      <th className="attendanceheading">Current Location</th>
                      <th className="attendanceheading">Full Address</th>
                      <th className="attendanceheading">Calling Remark</th>
                      <th className="attendanceheading">
                        Recruiter's Incentive
                      </th>
                      <th className="attendanceheading">
                        Interested and Eligible
                      </th>
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

                        <td
                          className="tabledata "
                          onMouseOver={handleMouseOver}
                          onMouseOut={handleMouseOut}
                        >
                          {" "}
                          {index + 1}
                        </td>

                        <td
                          className="tabledata "
                          onMouseOver={handleMouseOver}
                          onMouseOut={handleMouseOut}
                        >
                          {" "}
                          {item.date}
                          <div className="tooltip">
                            <span className="tooltiptext">{item.date}</span>
                          </div>
                          <div className="tooltip">
                            <span className="tooltiptext">
                              {" "}
                              {item.candidateAddedTime}
                            </span>
                          </div>
                        </td>

                        <td
                          className="tabledata "
                          onMouseOver={handleMouseOver}
                          onMouseOut={handleMouseOut}
                        >
                          {item.candidateId}
                          <div className="tooltip">
                            <span className="tooltiptext">
                              {item.candidateId}{" "}
                            </span>
                          </div>
                        </td>

                        <td
                          className="tabledata "
                          onMouseOver={handleMouseOver}
                          onMouseOut={handleMouseOut}
                        >
                          {item.recruiterName}
                          <div className="tooltip">
                            <span className="tooltiptext">
                              {item.recruiterName}{" "}
                            </span>
                          </div>
                        </td>
                        <td
                          className="tabledata "
                          onMouseOver={handleMouseOver}
                          onMouseOut={handleMouseOut}
                        >
                          {item.candidateName}{" "}
                          <div className="tooltip">
                            <span className="tooltiptext">
                              {item.candidateName}
                            </span>
                          </div>
                        </td>
                        <td
                          className="tabledata "
                          onMouseOver={handleMouseOver}
                          onMouseOut={handleMouseOut}
                        >
                          {item.candidateEmail}{" "}
                          <div className="tooltip">
                            <span className="tooltiptext">
                              {item.candidateEmail}
                            </span>
                          </div>
                        </td>
                        <td
                          className="tabledata "
                          onMouseOver={handleMouseOver}
                          onMouseOut={handleMouseOut}
                        >
                          {item.contactNumber}{" "}
                          <div className="tooltip">
                            <span className="tooltiptext">
                              {item.contactNumber}
                            </span>
                          </div>
                        </td>
                        <td
                          className="tabledata "
                          onMouseOver={handleMouseOver}
                          onMouseOut={handleMouseOut}
                        >
                          {item.alternateNumber}{" "}
                          <div className="tooltip">
                            <span className="tooltiptext">
                              {item.alternateNumber}
                            </span>
                          </div>
                        </td>
                        <td
                          hidden
                          className="tabledata "
                          onMouseOver={handleMouseOver}
                          onMouseOut={handleMouseOut}
                        >
                          {item.sourceName}{" "}
                          <div className="tooltip">
                            <span className="tooltiptext">
                              {item.sourceName}
                            </span>
                          </div>
                        </td>
                        <td
                          className="tabledata "
                          onMouseOver={handleMouseOver}
                          onMouseOut={handleMouseOut}
                        >
                          {item.jobDesignation}{" "}
                          <div className="tooltip">
                            <span className="tooltiptext">
                              {item.jobDesignation}
                            </span>
                          </div>
                        </td>
                        <td
                          className="tabledata "
                          onMouseOver={handleMouseOver}
                          onMouseOut={handleMouseOut}
                        >
                          {item.requirementId}{" "}
                          <div className="tooltip">
                            <span className="tooltiptext">
                              {" "}
                              {item.requirementId}{" "}
                            </span>
                          </div>{" "}
                        </td>
                        <td
                          className="tabledata "
                          onMouseOver={handleMouseOver}
                          onMouseOut={handleMouseOut}
                        >
                          {item.requirementCompany}{" "}
                          <div className="tooltip">
                            <span className="tooltiptext">
                              {item.requirementCompany}{" "}
                            </span>
                          </div>
                        </td>
                        <td
                          className="tabledata"
                          onMouseOver={handleMouseOver}
                          onMouseOut={handleMouseOut}
                        >
                          {item.communicationRating}{" "}
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
                          {item.currentLocation}{" "}
                          <div className="tooltip">
                            <span className="tooltiptext">
                              {item.currentLocation}{" "}
                            </span>
                          </div>
                        </td>
                        <td
                          className="tabledata "
                          onMouseOver={handleMouseOver}
                          onMouseOut={handleMouseOut}
                        >
                          {item.fullAddress}{" "}
                          <div className="tooltip">
                            <span className="tooltiptext">
                              {item.fullAddress}{" "}
                            </span>
                          </div>
                        </td>
                        <td
                          className="tabledata "
                          onMouseOver={handleMouseOver}
                          onMouseOut={handleMouseOut}
                        >
                          {item.callingFeedback}{" "}
                          <div className="tooltip">
                            <span className="tooltiptext">
                              {item.callingFeedback}{" "}
                            </span>
                          </div>
                        </td>
                        <td
                          className="tabledata "
                          onMouseOver={handleMouseOver}
                          onMouseOut={handleMouseOut}
                        >
                          {item.incentive}{" "}
                          <div className="tooltip">
                            <span className="tooltiptext">
                              {item.incentive}{" "}
                            </span>
                          </div>
                        </td>
                        <td
                          className="tabledata "
                          onMouseOver={handleMouseOver}
                          onMouseOut={handleMouseOut}
                        >
                          {item.selectYesOrNo}{" "}
                          <div className="tooltip">
                            <span className="tooltiptext">
                              {item.selectYesOrNo}{" "}
                            </span>
                          </div>
                        </td>
                        <td className="tabledata">
                          <i
                            onClick={() =>
                              handleUpdate(item.candidateId, item.employeeId)
                            }
                            className="fa-regular fa-pen-to-square"
                          ></i>
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
                          style={{
                            fontSize: "18px",
                            backgroundColor: "#f2f2f2",
                          }}
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
                            className="callingList-share-forward-popup-btn"
                          >
                            Share
                          </button>
                          <button
                            onClick={() => setShowForwardPopup(false)}
                            className="callingList-close-forward-popup-btn"
                          >
                            Close
                          </button>
                        </Modal.Footer>
                      </Modal.Dialog>
                    </div>
                  </>
                ) : null}
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
          {showFilterSection && (
            <div className="filter-section">
              <h3>Filter Options</h3>
              <div className="filter-options-container">
                {filterOptions.map((option) => {
                  const uniqueValues = Array.from(
                    new Set(callingList.map((item) => item[option]))
                  ).slice(0, 5);
                  return (
                    <div key={option} className="selfcalling-filter-option">
                      <button
                        className="callingList-filter-btn"
                        onClick={toggleselectedFilters}
                      >
                        {option}
                      </button>
                      {showselectedFilters && (
                        <>
                          {uniqueValues.map((value) => (
                            <label
                              key={value}
                              className="selfcalling-filter-value"
                            >
                              <input
                                type="checkbox"
                                checked={
                                  selectedFilters[option]?.includes(value) ||
                                  false
                                }
                                onChange={() =>
                                  handleFilterSelect(option, value)
                                }
                              />
                              {value}
                            </label>
                          ))}
                        </>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default CallingList;
