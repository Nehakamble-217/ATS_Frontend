import React, { useState, useMemo, useCallback, useEffect } from "react";
import "../AdminSection/Team_Leader.css";
import axios from "axios";
import { Button, Modal } from "react-bootstrap";

function Accesstable() {
  const [searchTerm, setSearchTerm] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  // const [selectedMainAdmin, setSelectedMainAdmin] = useState(null);
  const [selectedTeamLeader, setSelectedTeamLeader] = useState(null);
  const [selectedRecruiters, setSelectedRecruiters] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState([]);
  // const [assignments, setAssignments] = useState({});
  const [allSelected, setAllSelected] = useState(false);
  // const [editRecruiter, setEditRecruiter] = useState(null);  
  const [openCategory, setOpenCategory] = useState(""); // New state for open category
  // const [showSelection, setShowSelection] = useState(true);
  const [columnName, setColumnName] = useState(null);
  const [response, setResponse] = useState("");

  //Name:-Akash Pawar Component:-Team_Leadder Subcategory:-Assign Column TeamLeader Names and Recruiter Names(changed) Start LineNo:-17  Date:-03/07
  const [teamLeaderNames, setTeamLeaderNames] = useState([]);
  const [recruiterUnderTeamLeader, setRecruiterUnderTeamLeader] = useState([]);
  const [assignedColumnsCount, setAssignedColumnsCount] = useState([]);
  const [openUpdateModal, setOpenupdateModal] = useState(false);
  const [fetchUpdateAssignedColumn, setFetchupdateAssignedColumn] = useState(
    []
  );
  const [assignedColumnRecruiterUpdate, setAssignedColumnRecruiterUpdate] =
    useState([]);

  useEffect(() => {
    const fetchTeamLeaderNames = async () => {
      const response = await axios.get(

        `http://192.168.1.38:8891/api/ats/157industries/tl-namesIds`
      );
      setTeamLeaderNames(response.data);
    };
    fetchTeamLeaderNames();
  }, []);

  const fetchRecruiterUnderTeamLeader = useCallback(async () => {
    const response = await axios.get(

      `http://192.168.1.46:8891/api/ats/157industries/byTeamLeader/${selectedTeamLeader}`
    );
    setRecruiterUnderTeamLeader(response.data);
  }, [selectedTeamLeader]);

  useEffect(() => {
    if (selectedTeamLeader != null) {
      fetchRecruiterUnderTeamLeader();
    }
  }, [selectedTeamLeader, fetchRecruiterUnderTeamLeader]);

  //Name:-Akash Pawar Component:-Team_Leadder Subcategory:-Assign Column TeamLeader Names and Recruiter Names(changed) End LineNo:-44  Date:-03/07

  const fetchColumnsNames = async () => {
    const response = await axios.get(
      `http://192.168.1.46:8891/api/ats/157industries/fetch-columns-names`
    );
    setColumnName(response.data);
  };
  useEffect(() => {
    fetchColumnsNames();
  }, []);

  const handleSearchChange = useCallback((event) => {
    setSearchTerm(event.target.value);
  }, []);

  const toggleDropdown = useCallback(() => {
    setDropdownOpen((prev) => !prev);
  }, []);

  const handleOptionChange = (columnId) => {
    setSelectedOptions((prevSelectedRows) => {
      if (prevSelectedRows.includes(columnId)) {
        return prevSelectedRows.filter((id) => id !== columnId);
      } else {
        return [...prevSelectedRows, columnId];
      }
    });
  };

  const filteredRecruiters = useMemo(() => {
    return teamLeaderNames.reduce((acc, leader) => {
      const leaderNameMatch = leader.teamLeaderName
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const recruiters = leader.recruiters || []; // Ensure recruiters is defined
      const filteredRecruiters = recruiters.filter((recruiter) =>
        recruiter[1].toLowerCase().includes(searchTerm.toLowerCase())
      );

      if (leaderNameMatch || filteredRecruiters.length > 0) {
        acc.push({
          ...leader,
          recruiters: leaderNameMatch ? recruiters : filteredRecruiters,
        });
      }

      return acc;
    }, []);
  }, [teamLeaderNames, searchTerm]);

  const toggleCategoryDropdown = (category) => {
    setOpenCategory((prev) => (prev === category ? null : category));
    console.log(category);
  };

  const handleUpdateClick = (assigneID, assigneeName) => {
    setOpenupdateModal(true);
    fetchAssignedColumn(assigneID);
    setAssignedColumnRecruiterUpdate({ id: assigneID, name: assigneeName });
  };
  const fetchAssignedColumn = async (assigneID) => {
    const response = await axios.get(
      `http://192.168.1.46:8891/api/ats/157industries/column-by-id/${assigneID}`
    );
    setFetchupdateAssignedColumn(response.data);
  };

  // const handleRemoveClick = (recruiter) => {
  //   setSelectedRecruiters((prev) => prev.filter((item) => item !== recruiter));
  //   const updatedAssignments = { ...assignments };
  //   delete updatedAssignments[recruiter];
  //   setAssignments(updatedAssignments);
  // };

  // function getClassForCategory(category) {
  //   switch (category) {
  //     case "Common Assign":
  //       return "common-assign";
  //     case "Important Assign":
  //       return "important-assign";
  //     case "Most Important Assign":
  //       return "most-important-assign";
  //     default:
  //       return "";
  //   }
  // }
  const handleOkClick = () => {
    setDropdownOpen(false);
  };

  const handleAssignColumns = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `http://192.168.1.46:8891/api/ats/157industries/${selectedRecruiters}/assign-column`,
        JSON.stringify(selectedOptions),
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setResponse(response.data);

      setTimeout(() => {
        setSelectedRecruiters([]);
        setSelectedOptions([]);
        setResponse("");
      }, 5000);
      // Handle success, update state or show a success message
    } catch (error) {
      console.error("Error assigning columns:", error);
      // Handle error, show an error message or retry logic
    }
  };

  const handleSelectAll = () => {
    if (allSelected) {
      setSelectedOptions([]);
    } else {
      const allRowIds = columnName
        .filter((cat) => openCategory === cat.columnCategory)
        .map((item) => item.columnId);
      setSelectedOptions(allRowIds);
    }
    setAllSelected(!allSelected);
  };

  useEffect(() => {
    const fetchAssignedColumn = async () => {
      const response = await axios.get(
        `http://192.168.1.46:8891/api/ats/157industries/column-category-counts`
      );
      setAssignedColumnsCount(response.data);
    };
    fetchAssignedColumn();
  }, [response]);
  return (
    <div className="AppsTL">
      <div className="selection-containerTL">
        <div className="hierarchy-sectionTL">
          <div className="custom-dropdownTL">
            <div className="dropdown-headerTL" onClick={toggleDropdown}>
              {selectedRecruiters.length === 0
                ? "Select Team Leaders or Recruiters"
                : `${selectedRecruiters.length} Recruiter(s) selected`}
              <span
                className={`dropdown-icon_open ${dropdownOpen ? "open" : ""}`}
              >
                &#9660;
              </span>
            </div>
            {dropdownOpen && (
              <div className="dropdown-bodyTL">
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchTerm}
                  onChange={handleSearchChange}
                  className="search-inputTL"
                />
                {/* <button
                  className="select-all-buttonTL"
                  onClick={toggleSelectAll}
                >
                  {allSelected ? "Deselect All" : "Select All"}
                </button> */}
                <div className="TLR-buttons-div">
                  <button className="ok-button" onClick={handleOkClick}>
                    OK
                  </button>
                  <button
                    className="reset-selectTL-button"
                    onClick={() => {
                      setSelectedTeamLeader(null);
                      setSelectedRecruiters([]);
                    }}
                  >
                    Reset
                  </button>
                </div>
                <div className="team-leadersTL">
                  {filteredRecruiters.map((leader, index) => (
                    <div
                      key={index}
                      className="team-leader-itemTL checkbox-teamleader-assign radio-teamleader-assign"
                    >
                      <label>
                        <input
                          type="radio"
                          name="teamLeader"
                          value={leader.teamLeaderId}
                          checked={selectedTeamLeader === leader.teamLeaderId}
                          onChange={() =>
                            setSelectedTeamLeader(leader.teamLeaderId)
                          }
                        />
                        {leader.teamLeaderName}
                      </label>
                      {selectedTeamLeader === leader.teamLeaderId &&
                        recruiterUnderTeamLeader && (
                          <div className="recruitersTL">
                            {recruiterUnderTeamLeader.map(
                              (recruiter, rIndex) => (
                                <label key={rIndex}>
                                  <input
                                    type="radio"
                                    name="recruiter"
                                    value={recruiter[0]}
                                    checked={selectedRecruiters.includes(
                                      recruiter[0]
                                    )}
                                    onChange={() =>
                                      setSelectedRecruiters([recruiter[0]])
                                    }
                                  />
                                  {recruiter[1]}
                                </label>
                              )
                            )}
                          </div>
                        )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="options-section">
          <div className="options-listTL">
            <div className={`options-category common-assign`}>
              <div
                className="category-header"
                onClick={() => toggleCategoryDropdown("common assign")}
              >
                Common Assign
                <span className={`dropdown-icon`}> &#9660;</span>
              </div>
              {openCategory === "common assign" && (
                <div className="category-options checkbox-teamleader-assign">
                  <button
                    className="category-share-btn"
                    onClick={() => {
                      setOpenCategory("");
                    }}
                  >
                    Close
                  </button>
                  <button
                    className="category-share-btn"
                    onClick={handleSelectAll}
                  >
                    {allSelected ? "Deselect All" : "Select All"}
                  </button>
                  {selectedOptions.length != 0 && (
                    <button
                      className="category-share-btn"
                      onClick={() => setOpenCategory("")}
                    >
                      Ok
                    </button>
                  )}
                  {columnName &&
                    columnName
                      .filter((item) => item.columnCategory === "common assign")
                      .map((option, optIndex) => (
                        <label key={optIndex} className="option-itemTL">
                          <input
                            type="checkbox"
                            value={option.columnId}
                            checked={selectedOptions.includes(option.columnId)}
                            onChange={() => handleOptionChange(option.columnId)}
                          />
                          {option.columnName}
                        </label>
                      ))}
                </div>
              )}
            </div>
            <div className={`options-category important-assign`}>
              <div
                className="category-header"
                onClick={() => toggleCategoryDropdown("important assign")}
              >
                Important Assign
                <span className={`dropdown-icon`}> &#9660;</span>
              </div>
              {openCategory === "important assign" && (
                <div className="category-options checkbox-teamleader-assign">
                  <button
                    className="category-share-btn"
                    onClick={() => setOpenCategory("")}
                  >
                    Close
                  </button>
                  <button
                    className="category-share-btn"
                    onClick={handleSelectAll}
                  >
                    {allSelected ? "Deselect All" : "Select All"}
                  </button>
                  {selectedOptions.length != 0 && (
                    <button
                      className="category-share-btn"
                      onClick={() => setOpenCategory("")}
                    >
                      Ok
                    </button>
                  )}
                  {columnName &&
                    columnName
                      .filter(
                        (item) => item.columnCategory === "important assign"
                      )
                      .map((option, optIndex) => (
                        <label key={optIndex} className="option-itemTL">
                          <input
                            type="checkbox"
                            value={option.columnId}
                            checked={selectedOptions.includes(option.columnId)}
                            onChange={() => handleOptionChange(option.columnId)}
                          />
                          {option.columnName}
                        </label>
                      ))}
                </div>
              )}
            </div>
            <div className={`options-category most-important-assign`}>
              <div
                className="category-header"
                onClick={() => toggleCategoryDropdown("most important assign")}
              >
                Most Important Assign
                <span className={`dropdown-icon`}> &#9660;</span>
              </div>
              {openCategory === "most important assign" && (
                <div className="category-options checkbox-teamleader-assign">
                  <button
                    className="category-share-btn"
                    onClick={() => setOpenCategory("")}
                  >
                    Close
                  </button>
                  <button
                    className="category-share-btn"
                    onClick={handleSelectAll}
                  >
                    {allSelected ? "Deselect All" : "Select All"}
                  </button>
                  {selectedOptions.length != 0 && (
                    <button
                      className="category-share-btn"
                      onClick={() => setOpenCategory("")}
                    >
                      Ok
                    </button>
                  )}

                  {columnName &&
                    columnName
                      .filter(
                        (item) =>
                          item.columnCategory === "most important assign"
                      )
                      .map((option, optIndex) => (
                        <label key={optIndex} className="option-itemTL">
                          <input
                            type="checkbox"
                            value={option.columnId}
                            checked={selectedOptions.includes(option.columnId)}
                            onChange={() => handleOptionChange(option.columnId)}
                          />
                          {option.columnName}
                        </label>
                      ))}
                </div>
              )}
            </div>
          </div>
          <div className="assignOptionBtnCss">
            {response != "" ? (
              <div className="response-msg">{response}</div>
            ) : null}
            <button onClick={handleAssignColumns} className="assignoptionbtn">
              Assign Options
            </button>
          </div>
        </div>
      </div>
      <div className="assignments-tableTL">
        <center>
          <div className="container-after1">
            <div className="attendanceTableData1">
              <table className="attendance-table">
                <thead>
                  <tr className="attendancerows-head">
                    <th className="attendanceheading">Employee Id</th>
                    <th className="attendanceheading">Employee Name</th>
                    <th className="attendanceheading">Common Assign</th>
                    <th className="attendanceheading">Important Assign</th>
                    <th className="attendanceheading">Most Important Assign</th>
                    <th className="attendanceheading">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {assignedColumnsCount.map((assignee, index) => (
                    <tr key={index} className="attendancerows">
                      <td className="tabledata">{index + 1}</td>
                      <td className="tabledata">{assignee[1]}</td>
                      <td className="tabledata">{assignee[2]}</td>
                      <td className="tabledata">{assignee[3]}</td>
                      <td className="tabledata">{assignee[4]}</td>
                      <td className="tabledata">
                        <button
                          onClick={() =>
                            handleUpdateClick(assignee[0], assignee[1])
                          }
                          className="all_assignbtn-Action"
                        >
                          Update
                        </button>
                        {/* <button onClick={() => handleRemoveClick(assignee)} className='remove_assignbtn'>
                          Remove
                        </button> */}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </center>
      </div>
      {openUpdateModal ? (
        <UpdateAccesstable
          columnName={columnName}
          assignedColumnRecruiterUpdate={assignedColumnRecruiterUpdate}
          fetchUpdateAssignedColumn={fetchUpdateAssignedColumn}
        />
      ) : null}
    </div>
  );
}

const UpdateAccesstable = ({
  columnName,
  assignedColumnRecruiterUpdate,
  fetchUpdateAssignedColumn,
}) => {
  return (
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
            width: "800px",
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
            Update Column Assigned
          </Modal.Header>
          <Modal.Body
            style={{
              display: "grid",
              gap: "10px",
              gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
              backgroundColor: "#f2f2f2",
            }}
          >
            <>
              <div
                className=""
                style={{
                  display: "flex",
                  gap: "20px",
                  columnSpan: "span 1 / span 1",
                }}
              >
                Recruiter Name : {assignedColumnRecruiterUpdate.name}
              </div>
            </>
          </Modal.Body>
          <Modal.Footer style={{ backgroundColor: "#f2f2f2" }}>
            <Button>Share</Button>
            <Button>Close</Button>
          </Modal.Footer>
        </Modal.Dialog>
      </div>
    </>
  );
};

export default Accesstable;






