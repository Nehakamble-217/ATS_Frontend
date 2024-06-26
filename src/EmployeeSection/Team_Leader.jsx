

import React, { useState, useMemo, useCallback } from 'react';
import './access_mastersheet_to.css';

function Accesstable() {
  const [searchTerm, setSearchTerm] = useState('');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selectedMainAdmin, setSelectedMainAdmin] = useState(null);
  const [selectedTeamLeader, setSelectedTeamLeader] = useState(null);
  const [selectedRecruiters, setSelectedRecruiters] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [assignments, setAssignments] = useState({});
  const [allSelected, setAllSelected] = useState(false);
  const [editRecruiter, setEditRecruiter] = useState(null);

  const teamLeaders = useMemo(() => [
    { label: 'Team Leader 1', recruiters: 
      ['Recruiter 1',
      'Recruiter 2',    
      'Recruiter 3',    
      'Recruiter 4',    
      'Recruiter 5'
    ] },
    { label: 'Team Leader 2', recruiters:
       ['Recruiter 6', 
        'Recruiter 7', 
        'Recruiter 8', 
        'Recruiter 9', 
        'Recruiter 10'] }
  ], []);

  const options = useMemo(() => [
        { label: 'Date', category: 'Common Assign' },
        { label: 'Recruiter Name', category: 'Common Assign' },
        { label: 'Candidate ID', category: 'Common Assign' },
        { label: 'Date Of Birth', category: 'Common Assign' },
        { label: 'Candidate Name', category: 'Common Assign' },
        { label: 'Candidate Email', category: 'Common Assign' },
        { label: 'Contact Number', category: 'Common Assign' },
        { label: 'Alternate Number', category: 'Common Assign' },
        { label: 'Education', category: 'Common Assign' },
        { label: 'Current Location', category: 'Common Assign' },
        { label: 'Gender', category: 'Common Assign' },
        { label: 'Year of passing', category: 'Common Assign' },
        { label: 'Resume uploaded', category: 'Common Assign' },
        { label: 'Any Extra Certification', category: 'Common Assign' },
        { label: 'Experience', category: 'Common Assign' },
        { label: 'Candidate interested /not', category: 'Common Assign' },
    
        { label: 'Source Name', category: 'Important Assign' },
        { label: 'Applying Company ID', category: 'Important Assign' },
        { label: 'Applying For Position', category: 'Important Assign' },
        { label: 'Applying Company Name', category: 'Important Assign' },
        { label: 'Current company Location', category: 'Important Assign' },
        { label: 'Communication Rating', category: 'Important Assign' },
        { label: 'Candidate Interested', category: 'Important Assign' },
    
        { label: 'Calling Feedback', category: 'Most Important Assign' },
        { label: 'Interview Feedback', category: 'Most Important Assign' },
        { label: 'Candidate Feedback', category: 'Most Important Assign' },
        { label: 'Job ID', category: 'Most Important Assign' },
        { label: 'Current Company Location', category: 'Most Important Assign' },
      ], []);
    

  // const handleMainAdminChange = useCallback((event) => {
  //   setSelectedMainAdmin(event.target.value);
  // }, []);

  const handleRecruiterChange = useCallback((event) => {
    const { value, checked } = event.target;
    setSelectedRecruiters((prev) =>
      checked ? [...prev, value] : prev.filter((item) => item !== value)
    );
  }, []);

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

    const recruitersToUpdate = selectedRecruiters.length > 0 ? selectedRecruiters
                          : selectedTeamLeader ? [selectedTeamLeader]
                          : selectedMainAdmin ? [selectedMainAdmin]
                          : [];

    recruitersToUpdate.forEach((recruiter) => {
      if (!updatedAssignments[recruiter]) {
        updatedAssignments[recruiter] = { 'Common Assign': [], 'Important Assign': [], 'Most Important Assign': [] };
      }
      selectedOptions.forEach((option) => {
        const category = options.find((opt) => opt.label === option)?.category;
        if (category && !updatedAssignments[recruiter][category].includes(option)) {
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
  }, [assignments, selectedMainAdmin, selectedTeamLeader, selectedRecruiters, selectedOptions, options]);

  const filteredRecruiters = useMemo(() => {
    const allRecruiters = teamLeaders.reduce((acc, leader) => [...acc, ...leader.recruiters], []);
    return allRecruiters.filter((recruiter) =>
      recruiter.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [teamLeaders, searchTerm]);

  const groupedOptions = useMemo(() => options.reduce((grouped, option) => {
    const category = option.category;
    if (!grouped[category]) {
      grouped[category] = [];
    }
    grouped[category].push(option);
    return grouped;
  }, {}), [options]);

  const toggleSelectAll = useCallback(() => {
    if (allSelected) {
      setSelectedRecruiters((prev) =>
        prev.filter((recruiter) => !filteredRecruiters.includes(recruiter))
      );
    } else {
      setSelectedRecruiters((prev) => [...new Set([...prev, ...filteredRecruiters])]);
    }
    setAllSelected((prev) => !prev);
  }, [allSelected, filteredRecruiters]);

  const handleUpdateClick = (recruiter) => {
    setEditRecruiter(recruiter);
    setSelectedRecruiters([recruiter]);
    setSelectedOptions(
      Object.keys(assignments[recruiter] || {}).reduce((options, category) => [
        ...options,
        ...assignments[recruiter][category]
      ], [])
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
    case 'Common Assign':
      return 'common-assign';
    case 'Important Assign':
      return 'important-assign';
    case 'Most Important Assign':
      return 'most-important-assign';
    default:
      return '';
  }
}



  return (
    <div className="Apps">
      <div className="selection-container">
        <div className="hierarchy-section">
          {/* <div className="dropdown">
            <label htmlFor="mainAdminDropdown">Admin:</label>
            <select id="mainAdminDropdown" value={selectedMainAdmin || ''} onChange={handleMainAdminChange}>
              <option value="" disabled>Select Team Leader</option>
              {teamLeaders.map((leader, index) => (
                <option key={index} value={leader.label}>{leader.label}</option>
              ))}
            </select>
          </div> */}
          <div className="custom-dropdown">
          {/* <label htmlFor="mainAdminDropdown">Admin:</label> */}
            <div className="dropdown-header" onClick={toggleDropdown}>
              {selectedRecruiters.length === 0
                ? 'Select Team Leaders'
                : `${selectedRecruiters.length} Recruiter(s) selected`}
              <span className={`dropdown-icon ${dropdownOpen ? 'open' : ''}`}>&#9660;</span>
            </div>
            {dropdownOpen && (
              <div className="dropdown-body">
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchTerm}
                  onChange={handleSearchChange}
                  className="search-input"
                />
                <button className="select-all-button" onClick={toggleSelectAll}>
                  {allSelected ? 'Deselect All' : 'Select All'}
                </button>
                <div className="team-leaders">
                  {teamLeaders.map((leader, index) => (
                    <div key={index} className="team-leader">
                      <label>
                        <input
                          type="radio"
                          value={leader.label}
                          checked={selectedTeamLeader === leader.label}
                          onChange={() => setSelectedTeamLeader(leader.label)}
                        />
                        {leader.label}
                      </label>
                      {selectedTeamLeader === leader.label && (
                        <div className="recruiters">
                          {leader.recruiters.map((recruiter, rIndex) => (
                            <label key={rIndex}>
                              <input
                                type="checkbox"
                                value={recruiter}
                                checked={selectedRecruiters.includes(recruiter)}
                                onChange={handleRecruiterChange}
                              />
                              {recruiter}
                            </label>
                          ))}
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
          {/* <h3>Give permissions: <hr /></h3> */}
          


<div className="options-list">
  {Object.keys(groupedOptions).map((category, index) => (
    <div key={index} className={`options-category ${category.replace(/\s+/g, '-').toLowerCase()}`}>
      <div className={`category-header ${getClassForCategory(category)}`}>{category}</div>
      {groupedOptions[category].map((option, optIndex) => (
        <label key={optIndex} className="option-item">
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
  ))}
</div>
          <center><button
            onClick={assignOptionsToRecruiters}
            disabled={selectedOptions.length === 0 ||
              (selectedRecruiters.length === 0 && !selectedTeamLeader && !selectedMainAdmin)} className='assignoptionbtn'
          >
            {editRecruiter ? 'Update Options' : 'Assign Options'}
          </button></center>
        </div>
      </div>
      <div className="assignments-table">
        {/* <h4>Assigned Options</h4> */}
        <center>
        <table>
          <thead>
            <tr className='assigntablehead'>
              <th>Assignee</th>
              <th>Common Assign</th>
              <th>Important Assign</th>
              <th>Most Important Assign</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {Object.keys(assignments).map((assignee, index) => (
              <tr key={index} className='assigntabledata'>
                <td>{assignee}</td>
                <td>{assignments[assignee]['Common Assign'].length}</td>
                <td>{assignments[assignee]['Important Assign'].length}</td>
                <td>{assignments[assignee]['Most Important Assign'].length}</td>
                <td>
                  <button onClick={() => handleUpdateClick(assignee)} className='all_assignbtn'>
                    Update
                  </button>
                 
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        </center>
      </div>
    </div>
  );
}
export default Accesstable;
