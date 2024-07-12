import React, { useState, useEffect } from "react";
import "../EmployeeDashboard/JobList.css";
import { bottom } from "@popperjs/core";
import ShareDescription from "./shareDescription";
import JobDescriptionEdm from "../JobDiscription/jobDescriptionEdm";
import jobDiscriptions from "../employeeComponents/jobDiscriptions";
import ShareEDM from "../JobDiscription/shareEDM";

const JobListing = () => {
  const [jobDescriptions, setJobDescriptions] = useState([]);
  const [jobDescription, setJobDescription] = useState([]);
  const [selectedJobIndex, setSelectedJobIndex] = useState(-1); // Track which job description is selected
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCities, setSelectedCities] = useState(new Set());
  const [selectedExperience, setSelectedExperience] = useState(new Set());
  const [selectedIndustry, setSelectedIndustry] = useState(new Set());
  const [selectedRole, setSleectedRole] = useState(new Set());
  const [selectedSalary, setSelectedSalary] = useState(new Set());
  const [selectedIncentive, setSelectedIncentive] = useState(new Set());
  const [showViewMore, setShowViewMore] = useState(false);
  const [showCityFilter, setShowCityFilter] = useState(false);
  const [showExperience, setShowExperience] = useState(false);
  const [showSalary, setShowSalary] = useState(false);
  const [showIncentive, setShowIncentive] = useState(false);
  const [showJobDescriptionShare, setShowJobDescriptionShare] = useState(false);
  const [showIndustry, setShowIndustry] = useState(false);
  const [showRoles, setShowRoles] = useState(false);
  const [showJobRole, setShowJobRole] = useState(false);
  const [showJobDescriptionEdm, setShowJobDescriptionEdm] = useState(false);
  const [filteredJobDescriptions, setFilteredJobDescriptions] =
    useState(jobDescriptions);
  const [selectedRequirementId, setSelectedRequirementId] = useState(null);
  const [requirementData, setRequirementData] = useState();
  const [showEDM, setShowEDM] = useState(false);
  const [designation, setDesignation] = useState('');
const [location, setLocation] = useState('');
const [experience, setExperience] = useState('');
  const [searchQuery, setSearchQuery] = useState({
  designation: '',
  location: '',
  experience: '',
});




  useEffect(() => {
    fetch("http://192.168.1.51:8891/api/ats/157industries/all-job-descriptions")
      .then((response) => response.json())
      .then((data) => {
        console.log(data); // Log the fetched data to inspect its structure
        setJobDescriptions(data);
        setFilteredJobDescriptions(data); // Show all jobs initially
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);
useEffect(() => {
  handleFilter();
}, [searchQuery, jobDescriptions]);


const handleInputSearch = (event) => {
  const { name, value } = event.target;
  setSearchQuery((prevQuery) => ({ ...prevQuery, [name]: value }));
};


    const handleFilter = () => {
  const filtered = jobDescriptions.filter((job) => {
    return (
      (job.designation && job.designation.toLowerCase().includes(searchQuery.designation.toLowerCase())) ||
      (job.location && job.location.toLowerCase().includes(searchQuery.location.toLowerCase())) ||
      (job.experience && job.experience.toLowerCase().includes(searchQuery.experience.toLowerCase()))
    );
  });
  setFilteredJobDescriptions(filtered);
};

 

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };
  const handleCheckboxChange3 = (incentive) => {
    const newSelectedIncentive = new Set(selectedIncentive);
    if (newSelectedIncentive.has(incentive)) {
      newSelectedIncentive.delete(incentive);
    } else {
      newSelectedIncentive.add(incentive);
    }
    setSelectedIncentive(newSelectedIncentive);
  };

  const handleCheckboxChange2 = (salary) => {
    const newSelectedSalary = new Set(selectedSalary);
    if (newSelectedSalary.has(salary)) {
      newSelectedSalary.delete(salary);
    } else {
      newSelectedSalary.add(salary);
    }
    setSelectedSalary(newSelectedSalary);
  };
  const handleCheckboxChange1 = (experience) => {
    const newSelectedExperiences = new Set(selectedExperience);
    if (newSelectedExperiences.has(experience)) {
      newSelectedExperiences.delete(experience);
    } else {
      newSelectedExperiences.add(experience);
    }
    setSelectedExperience(newSelectedExperiences);
  };

  const handleCheckboxChange = (city) => {
    const newSelectedCities = new Set(selectedCities);

    if (newSelectedCities.has(city)) {
      newSelectedCities.delete(city);
    } else {
      newSelectedCities.add(city);
    }
    setSelectedCities(newSelectedCities);
  };

  const handleApply = () => {
    // Logic for applying the selected cities
    console.log(Array.from(selectedCities));
    console.log(Array.from(selectedExperience));
    console.log(Array.from(selectedIndustry));
    console.log(Array.from(selectedRole));
    console.log(Array.from(selectedIncentive));

    const filtered = jobDescriptions.filter(
      (job) =>
        selectedCities.has(job.location) ||
        selectedExperience.has(job.experience) ||
        selectedSalary.has(job.salary) ||
        selectedIncentive.has(job.incentive)
    );
    setFilteredJobDescriptions(filtered);
    setShowCityFilter(false);
    setFilteredJobDescriptions(filtered);
    if (filtered == "") {
      setFilteredJobDescriptions(jobDescriptions);
    }
    setShowCityFilter(false);
    setShowCityFilter(false);
    setShowExperience(false);
    setShowIncentive(false);
    setShowIndustry(false);
    setShowRoles(false);
    setShowJobRole(false);
    setShowSalary(false);
  };

  const handleReset = () => {
    setSelectedCities(new Set());
    setSelectedIndustry(new Set());
    setSelectedIncentive(new Set());
    setSelectedExperience(new Set());
    setSelectedSalary(new Set());
    // setSelectedRole(new Set());
    setSearchTerm("");
    setFilteredJobDescriptions(jobDescriptions);
    setShowCityFilter(false);
    setShowCityFilter(false);
    setShowExperience(false);
    setShowIncentive(false);
    setShowIndustry(false);
    setShowRoles(false);
    setShowJobRole(false);
    setShowSalary(false);
  };

  const filteredCities = jobDescriptions.filter((city) =>
    city.location.toLowerCase().includes(searchTerm.toLowerCase())
  );
  // const filteredIndustry= industry.filter(industrys=>
  //   industrys.name.toLowerCase().includes(searchTerm.toLowerCase())
  // )
  // const filteredRoles=role.filter(roles=>
  //   roles.name.toLowerCase().includes(searchTerm.toLowerCase())
  // )

  const toggleJobDescription = (requirementId) => {
    console.log(requirementId + "before Api");
    fetch(`http://192.168.1.51:8891/api/ats/157industries/requirement-info/${requirementId}`)

      .then((response) => response.json())
      .then((data) => {
        console.log(data); // Log the fetched data to inspect its structure
        setRequirementData(data);
        // setJobDescription(data)
        setShowViewMore(true);
        console.log(requirementId + "after Api");
      })
      .catch((error) => console.error("Error fetching data:", error));
  };




  const toggleEdm2 = () => {
    setShowEDM(!showEDM);
    // document.querySelector(".main-description-share2").style.display = "block";
  };

  const handleclose = () => {
    setShowViewMore(false);
  };

  const toggleCityFilter = () => {
    setShowCityFilter(!showCityFilter); // Toggle city filter visibility
    setShowExperience(false);
    setShowSalary(false);
    setShowIncentive(false);
    setShowIndustry(false);
    setShowRoles(false);
    setShowJobRole(false);
  };
  const toggleExperience = () => {
    setShowExperience(!showExperience);
    setShowCityFilter(false); // Toggle experience filter visibility
    setShowSalary(false);
    setShowIncentive(false);
    setShowIndustry(false);
    setShowRoles(false);
    setShowJobRole(false);
  };
  const toggleSalary = () => {
    setShowSalary(!showSalary);
    setShowCityFilter(false);
    setShowExperience(false);
    setShowIncentive(false);
    setShowIndustry(false);
    setShowRoles(false);
    setShowJobRole(false);
  };
  const toggleIncentive = () => {
    setShowIncentive(!showIncentive);
    setShowCityFilter(false);
    setShowExperience(false);
    setShowSalary(false);
    setShowIndustry(false);
    setShowRoles(false);
    setShowJobRole(false);
  };
  const toggleIndustry = () => {
    setShowIndustry(!showIndustry);
    setShowCityFilter(false);
    setShowExperience(false);
    setShowSalary(false);
    setShowIncentive(false);
    setShowRoles(false);
    setShowJobRole(false);
  };
  const toggleRoles = () => {
    setShowRoles(!showRoles);
    setShowCityFilter(false);
    setShowExperience(false);
    setShowSalary(false);
    setShowIncentive(false);
    setShowIndustry(false);
    setShowJobRole(false);
  };
  const toggleJobRole = () => {
    setShowJobRole(!showJobRole);
    setShowCityFilter(false);
    setShowExperience(false);
    setShowSalary(false);
    setShowIncentive(false);
    setShowIndustry(false);
    setShowRoles(false);
  };

  const sharejobdescription = (e) => {
    e.preventDefault();
    setShowJobDescriptionShare(!showJobDescriptionShare);
    // document.querySelector(".main-description-share").style.display = "block";
  };

  const toggleEdm = () => {
    setShowJobDescriptionEdm(!showJobDescriptionEdm);
  };

  const handleShareEdm = (res) => {
    setShowEDM(res);
  };
  const handleJobDescriptionEdm = (res) => {
    setShowJobDescriptionEdm(res);
  };
  const handleShareJobDescription = (res) => {
    setShowJobDescriptionShare(res)
  }
  
  

  const uniqueCities = Array.from(
    new Set(filteredCities.map((job) => job.location))
  );
  const uniqueExperiences = Array.from(
    new Set(jobDescriptions.map((job) => job.experience))
  );
  const uniqueSalary = Array.from(
    new Set(jobDescriptions.map((job) => job.salary))
  );
  const uniqueIncentive = Array.from(
    new Set(jobDescriptions.map((job) => job.incentive))
  );

  return (
    <>
      <div className="search-container">
        <div className="search-bar">
          <input
            className="search-input"
            placeholder="Enter keyword / designation / companies"
            type="text"
              value={searchQuery.designation}
  onChange={handleInputSearch}
          />
          <input
            className="search-input"
            list="experienceOptions"
            placeholder="Select experience"
            type="text"
            value={searchQuery.experience}
  onChange={handleInputSearch}
            
          />
          <datalist id="experienceOptions">
            <option value="0-1 years" />
            <option value="1-3 years" />
            <option value="3-5 years" />
            <option value="5+ years" />
          </datalist>

          <input
            className="search-input"
            placeholder="Enter location"
            type="text"
            value={searchQuery.location}
           onChange={handleInputSearch}
          />
          <button className="search-button" onClick={handleFilter} >
            <span className="search-icon">
              {/* Font Awesome icon for search */}
              <i className="fas fa-search"></i>
            </span>
            <span>Search</span>
          </button>
        </div>
      </div>
      <div className="filter-buttons">
        <ul>
          <li>
            <button className=" white-Btn" onClick={toggleCityFilter}>
              Location <span className="filter-icon">&#x25bc;</span>
            </button>
            {showCityFilter && (
              <div className="city-filter">
                <input
                  type="text"
                  placeholder="Search"
                  value={searchTerm}
                  onChange={handleSearch}
                  style={{ width: "100%", padding: "5px" }}
                />
                <div className="optionDiv">
                  {uniqueCities.map((city) => (
                    <div key={city}>
                      <label>
                        <input
                          type="checkbox"
                          checked={selectedCities.has(city)}
                          onChange={() => handleCheckboxChange(city)}
                        />
                        {city}
                      </label>
                    </div>
                  ))}
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginTop: "10px",
                    boxShadow: " 0 -4px 5px rgba(0, 0, 0, .05)",
                    padding: "10px 24px",
                  }}
                >
                  <button
                    onClick={handleReset}
                    style={{
                      backgroundColor: "white",
                      color: "#ffcb9b",
                      padding: "5px 10px",
                      border: "none",
                    }}
                  >
                    Reset
                  </button>
                  <button
                    onClick={handleApply}
                    style={{
                      backgroundColor: "#ffcb9b",
                      color: "white",
                      padding: "5px 10px",
                      border: "none",
                      width: "50%",
                    }}
                  >
                    Apply
                  </button>
                </div>
              </div>
            )}
          </li>

          <li>
            <button className=" white-Btn" onClick={toggleExperience}>
              Experience <span className="filter-icon">&#x25bc;</span>
            </button>
            {showExperience && (
              <div className="city-filter">
                {/* <input
        type="text"
        placeholder="Search"
        value={searchTerm}
        onChange={handleSearch}
        style={{ width: '100%', padding: '5px' }}
      /> */}
                <div className="optionDiv">
                  {uniqueExperiences.map((experience) => (
                    <div key={experience}>
                      <label>
                        <input
                          type="checkbox"
                          checked={selectedExperience.has(experience)}
                          onChange={() => handleCheckboxChange1(experience)}
                        />
                        {experience}
                      </label>
                    </div>
                  ))}
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginTop: "10px",
                    boxShadow: " 0 -4px 5px rgba(0, 0, 0, .05)",
                    padding: "10px 24px",
                  }}
                >
                  <button
                    onClick={handleReset}
                    style={{
                      backgroundColor: "white",
                      color: "#ffcb9b",
                      padding: "5px 10px",
                      border: "none",
                    }}
                  >
                    Reset
                  </button>
                  <button
                    onClick={handleApply}
                    style={{
                      backgroundColor: "#ffcb9b",
                      color: "white",
                      padding: "5px 10px",
                      border: "none",
                      width: "50%",
                    }}
                  >
                    Apply
                  </button>
                </div>
              </div>
            )}
          </li>

          <li>
            <button className=" white-Btn" onClick={toggleSalary}>
              Salary <span className="filter-icon">&#x25bc;</span>
            </button>
            {showSalary && (
              <div className="city-filter">
                {/* <input
        type="text"
        placeholder="Search"
        value={searchTerm}
        onChange={handleSearch}
        style={{ width: '100%', padding: '5px' }}
      /> */}
                <div className="optionDiv">
                  {uniqueSalary.map((salary) => (
                    <div key={salary}>
                      <label>
                        <input
                          type="checkbox"
                          checked={selectedSalary.has(salary)}
                          onChange={() => handleCheckboxChange2(salary)}
                        />
                        <i class="fa-solid fa-indian-rupee-sign"></i>
                        {salary}
                      </label>
                    </div>
                  ))}
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginTop: "10px",
                    boxShadow: " 0 -4px 5px rgba(0, 0, 0, .05)",
                    padding: "10px 24px",
                  }}
                >
                  <button
                    onClick={handleReset}
                    style={{
                      backgroundColor: "white",
                      color: "#ffcb9b",
                      padding: "5px 10px",
                      border: "none",
                    }}
                  >
                    Reset
                  </button>
                  <button
                    onClick={handleApply}
                    style={{
                      backgroundColor: "#ffcb9b",
                      color: "white",
                      padding: "5px 10px",
                      border: "none",
                      width: "50%",
                    }}
                  >
                    Apply
                  </button>
                </div>
              </div>
            )}
          </li>
          <li>
            <button className=" white-Btn" onClick={toggleIncentive}>
              Incentive <span className="filter-icon">&#x25bc;</span>
            </button>
            {showIncentive && (
              <div className="city-filter">
                {/* <input
        type="text"
        placeholder="Search"
        value={searchTerm}
        onChange={handleSearch}
        style={{ width: '100%', padding: '5px' }}
      /> */}
                <div className="optionDiv">
                  {uniqueIncentive.map((incentive) => (
                    <div key={incentive}>
                      <label>
                        <input
                          type="checkbox"
                          checked={selectedIncentive.has(incentive)}
                          onChange={() => handleCheckboxChange3(incentive)}
                        />
                        <i class="fa-solid fa-indian-rupee-sign"></i>
                        {incentive}
                      </label>
                    </div>
                  ))}
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginTop: "10px",
                    boxShadow: " 0 -4px 5px rgba(0, 0, 0, .05)",
                    padding: "10px 24px",
                  }}
                >
                  <button
                    onClick={handleReset}
                    style={{
                      backgroundColor: "white",
                      color: "#ffcb9b",
                      padding: "5px 10px",
                      border: "none",
                    }}
                  >
                    Reset
                  </button>
                  <button
                    onClick={handleApply}
                    style={{
                      backgroundColor: "#ffcb9b",
                      color: "white",
                      padding: "5px 10px",
                      border: "none",
                      width: "50%",
                    }}
                  >
                    Apply
                  </button>
                </div>
              </div>
            )}
          </li>
          <li>
            <button className=" white-Btn" onClick={toggleIndustry}>
              Industry <span className="filter-icon">&#x25bc;</span>
            </button>
          </li>
          <li>
            <button className=" white-Btn" onClick={toggleRoles}>
              Role <span className="filter-icon">&#x25bc;</span>
            </button>
          </li>
          <li>
            <button className=" white-Btn" onClick={toggleJobRole}>
              Job Type <span className="filter-icon">&#x25bc;</span>
            </button>
            {showJobRole && (
              <div className="city-filter">
                <div className="optionDiv">
                  <div>
                    <label>
                      <input type="checkbox" />
                      Permanent Job
                    </label>
                  </div>
                  <div>
                    <label>
                      <input type="checkbox" />
                      International
                    </label>
                  </div>
                  <div>
                    <label>
                      <input type="checkbox" />
                      Jobs for Women
                    </label>
                  </div>
                  <div>
                    <label>
                      <input type="checkbox" />
                      Work From Home
                    </label>
                  </div>
                  <div>
                    <label>
                      <input type="checkbox" />
                      Contract Job
                    </label>
                  </div>
                  <div>
                    <label>
                      <input type="checkbox" />
                      Jobs for COVID-19 Layoffs
                    </label>
                  </div>
                  <div>
                    <label>
                      <input type="checkbox" />
                      Walkin Job
                    </label>
                  </div>
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginTop: "10px",
                    boxShadow: " 0 -4px 5px rgba(0, 0, 0, .05)",
                    padding: "10px 24px",
                  }}
                >
                  <button
                    onClick={handleReset}
                    style={{
                      backgroundColor: "white",
                      color: "#ffcb9b",
                      padding: "5px 10px",
                      border: "none",
                    }}
                  >
                    Reset
                  </button>
                  <button
                    onClick={handleApply}
                    style={{
                      backgroundColor: "#ffcb9b",
                      color: "white",
                      padding: "5px 10px",
                      border: "none",
                      width: "50%",
                    }}
                  >
                    Apply
                  </button>
                </div>
              </div>
            )}
          </li>
          <li>
            <button className=" white-Btn">
              Job Freshness <span className="filter-icon">&#x25bc;</span>
            </button>
          </li>
          <li>
            <button className=" white-Btn">
              <span className="filter-icon">&#x2600;</span>
              All Filters
            </button>
          </li>
        </ul>
      </div>

      {!showViewMore && (
        <div className="jdCards">
          {filteredJobDescriptions.map((item, index) => (
            <div className="job-listing" key={index}>
              <div className="job-header">
                {/* <h3 >{item.requirementId}</h3> */}
                <h2 className="job-title">{item.designation} </h2>
                <div className="job-company">{item.companyName}</div>
              </div>
              <div className="job-details">
                <div className="job-location">
                  <i className="fas fa-map-marker-alt"></i>
                  {item.location}
                </div>
                <div className="job-experience">
                  <i className="fas fa-calendar-alt"></i>
                  {item.experience}
                </div>
                <div className="job-skills">
                  <i className="fas fa-tags"></i>
                  {item.skills}
                </div>
                <div className="job-incentive">
                  <i class="fa-solid fa-indian-rupee-sign"></i>
                  {item.incentive}
                </div>
                {/* <div className="job-posted">
          <i className="fas fa-clock"></i>
          {item.fild}
        </div> */}
                {/* <div className="job-posted">
          <i className="fas fa-clock"></i>
          {item.requirementId}
        </div> */}
              </div>
              {/* Arshad Added this button to share edm  */}
              <div className="job-actions">
                <button
                  className="daily-tr-btn"
                  onClick={() => toggleJobDescription(item.requirementId)}
                >
                  View More
                </button>
                {/* <button className='daily-tr-btn' onClick={()=>toggleEdm(index)}> EDM  <i id='edm-share-icon'  className="fa-solid fa-eye"></i></button> */}
              </div>
            </div>
          ))}
        </div>
      )}

      {showViewMore && (
        <>
          <h1>{selectedRequirementId}</h1>
          <main className="name">
            <section className="overview">
              <div className="scroll-container">
                <div className="info">
                  <div className="info-title">Position Overview</div>
                  <div className="info-value">
                    {requirementData.positionOverview?.overview || "N/A"}
                  </div>
                </div>
                <div className="info">
                  <div className="info-title">Responsibilities</div>
                  <div className="info-value">
                    <ul>
                      {requirementData.responsibilities.map(
                        (responsibility, idx) => (
                          <li key={idx}>
                            {responsibility.responsibilitiesMsg}
                          </li>
                        )
                      ) || "N/A"}
                    </ul>
                  </div>
                </div>
                <div className="info">
                  <div className="info-title">Requirements</div>
                  <div className="info-value">
                    <ul>
                      {requirementData.jobRequirements.map((item) => (
                        <li key={item.jobRequirementsId}>
                          {item.jobRequirementMsg}
                        </li>
                      )) || "N/A"}
                    </ul>
                  </div>
                </div>
                <div className="info">
                  <div className="info-title">Preferred Qualifications</div>
                  <div className="info-value">
                    <ul>
                      {requirementData.preferredQualifications.map((item) => (
                        <li key={item.preferredQualificationsId}>
                          {item.preferredQualificationMsg}
                        </li>
                      )) || "N/A"}
                    </ul>
                  </div>
                </div>
              </div>
            </section>
            <section className="job-performance1">
              <span>
                <article>
                  <b>SOFTWARE DEVELOPER</b>
                </article>
                <div className="save">
                  <button className="saved daily-tr-btn" onClick={toggleEdm}>
                    Share Video
                  </button>
                  <button className=" daily-tr-btn" onClick={toggleEdm2}>
                    Share EDM
                  </button>
                  <button
                    className="share daily-tr-btn"
                    onClick={sharejobdescription}
                  >
                    Share
                  </button>
                  <button onClick={handleclose} className="daily-tr-btn">
                    Close
                  </button>
                </div>
              </span>
              <div className="names">
                <p>
                  <b>Id : </b>
                  {requirementData.requirementId || "N/A"}
                </p>
                <p>
                  <b>Field : </b>
                  {requirementData.field}
                </p>
                <p>
                  <b>Location :</b>
                  {requirementData.location || "N/A"}
                </p>
                <p>
                  <b>Salary :</b> {requirementData.salary || "N/A"}
                </p>
                <p>
                  <b>Designation :</b>
                  {requirementData.designation || "N/A"}
                </p>
                <p>
                  <b>Educational Qualifications :</b>
                  {requirementData.qualification || "N/A"}
                </p>
                <p>
                  <b>Experience :</b>
                  {requirementData.experience || "N/A"}
                </p>
                <p>
                  <b>Key Skills :</b>
                  {requirementData.skills || "N/A"}
                </p>
                <p>
                  <b>Company Link :</b>
                  <a href={requirementData.companyLink || "#"}>Website</a>
                </p>
                <p>
                  <b>Shifts : </b>
                  {requirementData.shift || "N/A"}
                </p>
                <p>
                  <b>Week Off's : </b>
                  {requirementData.weekOff || "N/A"}
                </p>
                <p>
                  <b>Notice Period :</b> {requirementData.noticePeriod || "N/A"}
                </p>
                <p>
                  <b>Job Role : </b>
                  {requirementData.jobRole || "N/A"}
                </p>
                <p>
                  <b>Job Type : </b>
                  {requirementData.jobType || "N/A"}
                </p>
                <p>
                  <b>Perks:</b>
                  {requirementData.perks || "N/A"}
                </p>
                <p>
                  <b>Incentives For Recruiters : </b>
                  {requirementData.incentive || "N/A"}
                </p>
                <p>
                  <b>Reporting Hierarchy : </b>
                  {requirementData.reportingHierarchy || "N/A"}
                </p>
                <p>
                  <b>Number of Positions : </b>
                  {requirementData.position || "N/A"}
                </p>
                <p>
                  <b>Documentation : </b>
                  {requirementData.documentation || "N/A"}
                </p>
                <p>
                  <b>Gender : </b>
                  {requirementData.gender || "N/A"}
                </p>
              </div>
            </section>
          </main>
        </>
      )}
      {showJobDescriptionShare && (
        <>
          <ShareDescription
            onShareDescription={handleShareJobDescription}
            Descriptions={requirementData}
          />
        </>
      )}
      {showJobDescriptionEdm && (
        <>
          <JobDescriptionEdm
            onJobDescriptionEdm={handleJobDescriptionEdm}
            Descriptions={requirementData.requirementId}
          />
        </>
      )}
      {showEDM && (
        <>
          <ShareEDM
            onShareEdm={handleShareEdm}
            Descriptions={requirementData.requirementId}
          />
        </>
      )}
    </>
  );
};

const JobList = () => {
  return (
    <div className="job-list">
      <JobListing />
      {/* Add more job listings as needed */}
    </div>
  );
};

export default JobList;
