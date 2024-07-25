import React, { useState, useEffect } from "react";
import "../EmployeeDashboard/JobList.css";
import { bottom } from "@popperjs/core";
import ShareDescription from "./shareDescription";
import JobDescriptionEdm from "../JobDiscription/jobDescriptionEdm";
import jobDiscriptions from "../employeeComponents/jobDiscriptions";
import ShareEDM from "../JobDiscription/shareEDM";
import { values } from "pdf-lib";
// SwapnilRokade_JobListing_filter_option__18/07
const JobListing = () => {
  const [jobDescriptions, setJobDescriptions] = useState([]);
  const [filterOptions, setFilterOptions] = useState([]);
  const [activeFilterOption, setActiveFilterOption] = useState(null);
  const [selectedJobIndex, setSelectedJobIndex] = useState(-1); // Track which job description is selected
  const [searchTerm, setSearchTerm] = useState("");
  const [showViewMore, setShowViewMore] = useState(false);
  const [showJobDescriptionShare, setShowJobDescriptionShare] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState({});
  const [showJobDescriptionEdm, setShowJobDescriptionEdm] = useState(false);
  const [filteredJobDescriptions, setFilteredJobDescriptions] = useState([]);
  const [selectedRequirementId, setSelectedRequirementId] = useState(null);
  const [requirementData, setRequirementData] = useState();
  const [showEDM, setShowEDM] = useState(false);
  const [searchQuery, setSearchQuery] = useState({
    designation: "",
    location: "",
    experience: "",
  });
  const limitedOption = [
    "jobRole",
    "jobType",
    "designation",
    "location",
    "salary",
    "stream",
    "requirementId",
    "experience",
    "companyName",
    "field",
    "companyName",
  ];

  useEffect(() => {
    fetch("http://192.168.1.36:9090/api/ats/157industries/all-job-descriptions")
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
  }, [searchQuery, selectedFilters, jobDescriptions]);
  useEffect(() => {
    filterData();
  }, [selectedFilters, jobDescriptions]);

  const filterData = () => {
    let filtereddata = [...jobDescriptions];
    Object.entries(searchQuery).forEach(([key, value]) => {
      if (value) {
        filtereddata = filtereddata.filter((item) =>
          item[key]?.toString().toLowerCase().includes(value.toLowerCase())
        );
      }
    });

    Object.entries(selectedFilters).forEach(([option, values]) => {
      if (values.length > 0) {
        if (option === "requirementId") {
          filtereddata = filtereddata.filter((item) =>
            values.some((value) =>
              item[option]?.toString().toLowerCase().includes(value)
            )
          );
        } else {
          filtereddata = filtereddata.filter((item) =>
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
    setFilteredJobDescriptions(filtereddata);
  };

  const handleFilterSelect = (option, value) => {
    setSelectedFilters((prev) => {
      const updatedFilters = { ...prev };
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

  const handleInputSearch = (event) => {
    const { name, value } = event.target;
    setSearchQuery((prevQuery) => ({ ...prevQuery, [name]: value }));
  };

  useEffect(() => {
    const options = Object.keys(jobDescriptions[0] || {}).filter((key) =>
      limitedOption.includes(key)
    );
    setFilterOptions(options);
  }, [jobDescriptions]);

  console.log(filteredJobDescriptions);

  const handleFilter = () => {
    const filtered = jobDescriptions.filter((job) => {
      return (
        (job.designation &&
          job.designation
            .toLowerCase()
            .includes(searchQuery.designation.toLowerCase())) ||
        (job.location &&
          job.location
            .toLowerCase()
            .includes(searchQuery.location.toLowerCase())) ||
        (job.experience &&
          job.experience
            .toLowerCase()
            .includes(searchQuery.experience.toLowerCase()))
      );
    });
    setFilteredJobDescriptions(filtered);
  };

  const handleFilterOptionClick = (option) => {
    if (activeFilterOption === option) {
      setActiveFilterOption(null);
    } else {
      setActiveFilterOption(option);
    }
  };

  const toggleJobDescription = (requirementId) => {
    console.log(requirementId + "before Api");
    fetch(
      `http://192.168.1.36:9090/api/ats/157industries/requirement-info/${requirementId}`
    )
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
    setShowJobDescriptionShare(res);
  };

  return (
    <>
      <div className="search-container">
        <div className="search-bar">
          <input
            className="search-input"
            placeholder="Enter keyword / designation / companies"
            type="text"
            name="designation"
            value={searchQuery.designation}
            onChange={handleInputSearch}
          />
          <input
            className="search-input"
            list="experienceOptions"
            placeholder="Select experience"
            type="text"
            name="experience"
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
            name="location"
            value={searchQuery.location}
            onChange={handleInputSearch}
          />
          <button className="search-button" onClick={filterData}>
            <span className="search-icon">
              <i className="fas fa-search"></i>
              Search
            </span>
          </button>
        </div>
      </div>
      <div className="filter-section">
        <div className="filter-options-container">
          {filterOptions.map((option) => {
            const uniqueValues = Array.from(
              new Set(jobDescriptions.map((item) => item[option]))
            );
            return (
              <div key={option} className="filter-option">
                <button
                  className="white-Btn"
                  onClick={() => handleFilterOptionClick(option)}
                >
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
                            checked={
                              selectedFilters[option]?.includes(value) || false
                            }
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
