import React, { useState, useMemo, useCallback, useEffect } from "react";
import "../AdminSection/Team_Leader.css";
import axios from "axios";

function Accesstable() {
  const [searchTerm, setSearchTerm] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selectedMainAdmin, setSelectedMainAdmin] = useState(null);
  const [selectedTeamLeader, setSelectedTeamLeader] = useState(null);
  const [selectedRecruiters, setSelectedRecruiters] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [assignments, setAssignments] = useState({});
  const [allSelected, setAllSelected] = useState(false);
  const [editRecruiter, setEditRecruiter] = useState(null);
  const [openCategory, setOpenCategory] = useState(null); // New state for open category

  //Name:-Akash Pawar Component:-Team_Leadder Subcategory:-Assign Column TeamLeader Names and Recruiter Names(changed) Start LineNo:-17  Date:-03/07
  const [teamLeaderNames, setTeamLeaderNames] = useState([]);
  const [recruiterUnderTeamLeader, setRecruiterUnderTeamLeader] = useState([]);

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
      `http://192.168.1.38:8891/api/ats/157industries/byTeamLeader/${selectedTeamLeader}`
    );
    setRecruiterUnderTeamLeader(response.data);
  }, [selectedTeamLeader]);

  useEffect(() => {
    if (selectedTeamLeader != null) {
      fetchRecruiterUnderTeamLeader();
    }
  }, [selectedTeamLeader, fetchRecruiterUnderTeamLeader]);

  //Name:-Akash Pawar Component:-Team_Leadder Subcategory:-Assign Column TeamLeader Names and Recruiter Names(changed) End LineNo:-44  Date:-03/07

  const teamLeaders = useMemo(
    () => [
      {
        label: "Team Leader 1",
        recruiters: [
          "Recruiter 1",
          "Recruiter 2",
          "Recruiter 3",
          "Recruiter 4",
          "Recruiter 5",
        ],
      },
      {
        label: "Team Leader 2",
        recruiters: [
          "Recruiter 6",
          "Recruiter 7",
          "Recruiter 8",
          "Recruiter 9",
          "Recruiter 10",
        ],
      },
    ],
    []
  );

  const options = useMemo(
    () => [
      { label: "Date", category: "Common Assign" },
      { label: "Recruiter Name", category: "Common Assign" },
      { label: "Candidate ID", category: "Common Assign" },
      { label: "Date Of Birth", category: "Common Assign" },
      { label: "Candidate Name", category: "Common Assign" },
      { label: "Candidate Email", category: "Common Assign" },
      { label: "Contact Number", category: "Common Assign" },
      { label: "Alternate Number", category: "Common Assign" },
      { label: "Education", category: "Common Assign" },
      { label: "Current Location", category: "Common Assign" },
      { label: "Gender", category: "Common Assign" },
      { label: "Year of passing", category: "Common Assign" },
      { label: "Resume uploaded", category: "Common Assign" },
      { label: "Any Extra Certification", category: "Common Assign" },
      { label: "Experience", category: "Common Assign" },
      { label: "Candidate interested /not", category: "Common Assign" },

      { label: "Source Name", category: "Important Assign" },
      { label: "Applying Company ID", category: "Important Assign" },
      { label: "Applying For Position", category: "Important Assign" },
      { label: "Applying Company Name", category: "Important Assign" },
      { label: "Current company Location", category: "Important Assign" },
      { label: "Communication Rating", category: "Important Assign" },
      { label: "Candidate Interested", category: "Important Assign" },

      { label: "Calling Feedback", category: "Most Important Assign" },
      { label: "Interview Feedback", category: "Most Important Assign" },
      { label: "Candidate Feedback", category: "Most Important Assign" },
      { label: "Job ID", category: "Most Important Assign" },
      { label: "Current Company Location", category: "Most Important Assign" },
    ],
    []
  );

  const handleSearchChange = useCallback((event) => {
    setSearchTerm(event.target.value);
  }, []);

  const toggleDropdown = useCallback(() => {
    setDropdownOpen((prev) => !prev);
  }, []);

  const handleOptionChange = useCallback((event) => {
    const { value, checked } = event.target;
    setSelectedOptions((prev) =>
      checked ? [...prev, value] : prev.filter((option) => option !== value)
    );
  }, []);

  const assignOptionsToRecruiters = useCallback(() => {
    const updatedAssignments = { ...assignments };

    const recruitersToUpdate =
      selectedRecruiters.length > 0
        ? selectedRecruiters
        : selectedTeamLeader
        ? [selectedTeamLeader]
        : selectedMainAdmin
        ? [selectedMainAdmin]
        : [];

    recruitersToUpdate.forEach((recruiter) => {
      if (!updatedAssignments[recruiter]) {
        updatedAssignments[recruiter] = {
          "Common Assign": [],
          "Important Assign": [],
          "Most Important Assign": [],
        };
      }
      selectedOptions.forEach((option) => {
        const category = options.find((opt) => opt.label === option)?.category;
        if (
          category &&
          !updatedAssignments[recruiter][category].includes(option)
        ) {
          updatedAssignments[recruiter][category].push(option);
        }
      });
    });

    setAssignments(updatedAssignments);
    setSelectedMainAdmin(null);
    setSelectedTeamLeader(null);
    setSelectedRecruiters([]);
    setSelectedOptions([]);
    setEditRecruiter(null);
  }, [
    assignments,
    selectedMainAdmin,
    selectedTeamLeader,
    selectedRecruiters,
    selectedOptions,
    options,
  ]);

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

  const groupedOptions = useMemo(
    () =>
      options.reduce((grouped, option) => {
        const category = option.category;
        if (!grouped[category]) {
          grouped[category] = [];
        }
        grouped[category].push(option);
        return grouped;
      }, {}),
    [options]
  );

  const toggleCategoryDropdown = (category) => {
    setOpenCategory((prev) => (prev === category ? null : category));
  };

  // const toggleSelectAll = useCallback(() => {
  //   if (allSelected) {
  //     setSelectedRecruiters([]);
  //   } else {
  //     setSelectedRecruiters(filteredRecruiters);
  //   }
  //   setAllSelected((prev) => !prev);
  // }, [allSelected, filteredRecruiters]);

  const handleUpdateClick = (recruiter) => {
    setEditRecruiter(recruiter);
    setSelectedRecruiters([recruiter]);
    setSelectedOptions(
      Object.keys(assignments[recruiter] || {}).reduce(
        (options, category) => [
          ...options,
          ...assignments[recruiter][category],
        ],
        []
      )
    );
    setDropdownOpen(false);
  };

  const handleRemoveClick = (recruiter) => {
    setSelectedRecruiters((prev) => prev.filter((item) => item !== recruiter));
    const updatedAssignments = { ...assignments };
    delete updatedAssignments[recruiter];
    setAssignments(updatedAssignments);
  };

  function getClassForCategory(category) {
    switch (category) {
      case "Common Assign":
        return "common-assign";
      case "Important Assign":
        return "important-assign";
      case "Most Important Assign":
        return "most-important-assign";
      default:
        return "";
    }
  }

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
            {Object.keys(groupedOptions).map((category, index) => (
              <div
                key={index}
                className={`options-category ${category
                  .replace(/\s+/g, "-")
                  .toLowerCase()}`}
              >
                <div
                  className={`category-header ${getClassForCategory(category)}`}
                  onClick={() => toggleCategoryDropdown(category)}
                >
                  {category}
                  <span
                    className={`dropdown-icon ${
                      openCategory === category ? "open" : ""
                    }`}
                  >
                    &#9660;
                  </span>
                </div>
                {openCategory === category && (
                  <div className="category-options checkbox-teamleader-assign">
                    {groupedOptions[category].map((option, optIndex) => (
                      <label key={optIndex} className="option-itemTL">
                        <input
                          type="checkbox"
                          value={option.label}
                          checked={selectedOptions.includes(option.label)}
                          onChange={handleOptionChange}
                        />
                        {option.label}
                      </label>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
          <div className="assignOptionBtnCss">
            <button
              onClick={assignOptionsToRecruiters}
              disabled={
                selectedOptions.length === 0 ||
                (selectedRecruiters.length === 0 &&
                  !selectedTeamLeader &&
                  !selectedMainAdmin)
              }
              className="assignoptionbtn"
            >
              {editRecruiter ? "Update Options" : "Assign Options"}
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
                    <th className="attendanceheading">Assignee</th>
                    <th className="attendanceheading">Common Assign</th>
                    <th className="attendanceheading">Important Assign</th>
                    <th className="attendanceheading">Most Important Assign</th>
                    <th className="attendanceheading">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {Object.keys(assignments).map((assignee, index) => (
                    <tr key={index} className="attendancerows">
                      <td className="tabledata">{assignee}</td>
                      <td className="tabledata">
                        {assignments[assignee]["Common Assign"].length}
                      </td>
                      <td className="tabledata">
                        {assignments[assignee]["Important Assign"].length}
                      </td>
                      <td className="tabledata">
                        {assignments[assignee]["Most Important Assign"].length}
                      </td>
                      <td className="tabledata">
                        <button
                          onClick={() => handleUpdateClick(assignee)}
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
    </div>
  );
}

export default Accesstable;
