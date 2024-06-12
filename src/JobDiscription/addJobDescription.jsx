import React from 'react';
import './addJobDescription.css';

const addJobDescription = () => (
  <main className="job-desc">
    <section className="job-performance">
      <article><b>ADD JOB DESCRIPTION</b></article>
      <div className="form-container">
        <div className="field-column">
          {renderFields([
            { label: "Field", type: "text", name: "field" },
            { label: "Location", type: "text", name: "location" },
            { label: "Salary", type: "text", name: "salary" },
            { label: "Designation", type: "select", name: "designation", options: ["Select Designation", "Junior Developer", "Senior Developer", "Team Lead", "Project Manager"] },
            { label: "Educational Qualifications", type: "text", name: "educational-qualifications" },
            { label: "Experience", type: "text", name: "experience" },
            { label: "Key Skills", type: "select", name: "key-skills", options: ["Select Key Skills", "JavaScript", "Python", "Java", "C++"] },
            { label: "Company Link", type: "text", name: "company-link" },
            { label: "Address", type: "text", name: "address" },
            { label: "Shifts", type: "text", name: "shifts" },
          ])}
        </div>
        <div className="field-column">
          {renderFields([
            { label: "Week Offs", type: "text", name: "week-offs" },
            { label: "Notice Period", type: "text", name: "notice-period" },
            { label: "Job Role", type: "select", name: "job-role", options: ["Select Job Role", "Developer", "Designer", "Manager", "Analyst"] },
            { label: "Job Type", type: "select", name: "job-type", options: ["Select Job Type", "Full-Time", "Part-Time", "Contract", "Internship"] },
            { label: "Perks", type: "text", name: "perks" },
            { label: "Incentives For Recruiters", type: "text", name: "incentives" },
            { label: "Number of Positions", type: "number", name: "positions" },
            { label: "Documentation", type: "text", name: "documentation" },
            { label: "Reporting Hierarchy", type: "text", name: "reporting-hierarchy" },
            { label: "Gender", type: "select", name: "gender", options: ["Select Gender", "Male", "Female", "Other"] },
          ])}
        </div>
      </div>
      <div className="save">
        <button className="apply">View More</button>
      </div>
    </section>
  </main>
);

const renderFields = (fields) =>
  fields.map(({ label, type, name, options }) => (
    <div className="field" key={name}>
      <label><b>{label}: </b></label>
      {type === "select" ? (
        <select name={name}>
          {options.map(option => (
            <option key={option} value={option === "Select Designation" || option === "Select Key Skills" || option === "Select Job Role" || option === "Select Job Type" || option === "Select Gender" ? "" : option}>
              {option}
            </option>
          ))}
        </select>
      ) : (
        <input type={type} name={name} />
      )}
    </div>
  ));

export default addJobDescription;