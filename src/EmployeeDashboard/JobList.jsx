import React,{useState,useEffect} from 'react';
import "../EmployeeDashboard/JobList.css"

const JobListing = () => {
 const [jobDescriptions, setJobDescriptions] = useState([]);
  const [selectedJobIndex, setSelectedJobIndex] = useState(-1); // Track which job description is selected
const [selectedCities, setSelectedCities] = useState([]);
const [showViewMore,setShowViewMore]=useState(false);

useEffect(() => {
    fetch("http://192.168.1.38:8891/api/ats/157industries/all-job-descriptions")
      .then((response) => response.json())
      .then((data) => {
        console.log(data); // Log the fetched data to inspect its structure
        setJobDescriptions(data);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  
  const toggleJobDescription = (index) => {
    setShowViewMore(true);
    if (selectedJobIndex === index) {
      setSelectedJobIndex(-1); // Toggle off if already selected
    } else {
      setSelectedJobIndex(index); // Toggle on for the selected index
    }
  };


  const handleclose =()=>{
    setShowViewMore(false);
  }

  return (
    <>
    <div className="search-container">

        <div className="search-bar">

          <input
            className="search-input"
            placeholder="Enter keyword / designation / companies"
            type="text"
          />
          <input
            className="search-input"
            list="experienceOptions"
            placeholder="Select experience"
            type="text"
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
          />
          <button className="search-button">
            <span className="search-icon">
              {/* Font Awesome icon for search */}
              <i className="fas fa-search"></i>
            </span>
            <span>Search</span>
          </button>
        </div>
      </div>
    <div className="filter-buttons">
      
      <button className="daily-tr-btn">
        Location <span className="filter-icon">&#x25bc;</span>
      </button>
      {/* <div className='dropdown'>
      <h2>Select Cities</h2>
      <input type="text" placeholder="search" />
      <ul>
        <li>
          <input
            type="checkbox"
            value="Bengaluru / Bangalore"
            onChange={handleCheckboxChange}
          />
          Bengaluru / Bangalore (9495)
        </li>
        <li>
          <input
            type="checkbox"
            value="Hyderabad / Secunderabad, Telangana"
            onChange={handleCheckboxChange}
          />
          Hyderabad / Secunderabad, Telangana (5478)
        </li>
        <li>
          <input
            type="checkbox"
            value="Chennai"
            onChange={handleCheckboxChange}
          />
          Chennai (4959)
        </li>
        <li>
          <input
            type="checkbox"
            value="Mumbai"
            onChange={handleCheckboxChange}
          />
          Mumbai (3825)
        </li>
        <li>
          <input
            type="checkbox"
            value="Pune"
            onChange={handleCheckboxChange}
          />
          Pune (2905)
        </li>
        <li>
          <input
            type="checkbox"
            value="Delhi"
            onChange={handleCheckboxChange}
          />
          Delhi (2203)
        </li>
        <li>
          <input
            type="checkbox"
            value="Mumbai City"
            onChange={handleCheckboxChange}
          />
          Mumbai City (2055)
        </li>
        <li>
          <input
            type="checkbox"
            value="Gurgaon / Gurugram"
            onChange={handleCheckboxChange}
          />
          Gurgaon / Gurugram (1904)
        </li>
        <li>
          <input
            type="checkbox"
            value="Navi Mumbai"
            onChange={handleCheckboxChange}
          />
          Navi Mumbai (1574)
        </li>
        <li>
          <input
            type="checkbox"
            value="Ahmedabad"
            onChange={handleCheckboxChange}
          />
          Ahmedabad (1407)
        </li>
        <li>
          <input
            type="checkbox"
            value="Noida"
            onChange={handleCheckboxChange}
          />
          Noida (1309)
        </li>
        <li>
          <input
            type="checkbox"
            value="Thane"
            onChange={handleCheckboxChange}
          />
          Thane (1233)
        </li>
      </ul>
      <button onClick={handleReset}>Reset</button>
      <button onClick={handleApply}>Apply</button>
    </div> */}
      <button className="daily-tr-btn">
        Experience <span className="filter-icon">&#x25bc;</span>
      </button>
      <button className="daily-tr-btn">
        Salary <span className="filter-icon">&#x25bc;</span>
      </button>
      <button className="daily-tr-btn">
        Function <span className="filter-icon">&#x25bc;</span>
      </button>
      <button className="daily-tr-btn">
        Industry <span className="filter-icon">&#x25bc;</span>
      </button>
      <button className="daily-tr-btn">
        Role <span className="filter-icon">&#x25bc;</span>
      </button>
      <button className="daily-tr-btn">
        Job Type <span className="filter-icon">&#x25bc;</span>
      </button>
      <button className="daily-tr-btn">
        Job Freshness <span className="filter-icon">&#x25bc;</span>
      </button>
      <button className="daily-tr-btn">
        <span className="filter-icon">&#x2600;</span>
        All Filters
      </button>
    </div>
    {!showViewMore && (
      
    <div className='jdCards'>
      {jobDescriptions.map((item, index) => (
      <div className="job-listing"  key={index}>
      <div className="job-header">
        <h2 className="job-title">{item.designation}</h2>
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
        {/* <div className="job-posted">
          <i className="fas fa-clock"></i>
          a day ago
        </div> */}
      </div>
      <div className="job-actions">
        <button className='daily-tr-btn' onClick={()=>toggleJobDescription(index)}>View More</button>
      </div>
    </div>
        ))}
    </div>
  
  )}


  {showViewMore && (
        <main className="name">
          {selectedJobIndex !== -1 && (
            <section className="overview">
              <div className="scroll-container">
                <div className="info">
                  <div className="info-title">Position Overview</div>
                  <div className="info-value">
                    {jobDescriptions[selectedJobIndex]?.positionOverview?.overview || "N/A"}
                  </div>
                </div>
                <div className="info">
                  <div className="info-title">Responsibilities</div>
                  <div className="info-value">
                    <ul>
                      {jobDescriptions[selectedJobIndex]?.responsibilities?.map((responsibility, idx) => (
                        <li key={idx}>{responsibility.responsibilitiesMsg}</li>
                      )) || "N/A"}
                    </ul>
                  </div>
                </div>
                <div className="info">
                  <div className="info-title">Requirements</div>
                  <div className="info-value">
                    <ul>
                      {jobDescriptions[selectedJobIndex]?.jobRequirements?.map((jobRequirement, idx) => (
                        <li key={idx}>{jobRequirement.jobRequirementMsg}</li>
                      )) || "N/A"}
                    </ul>
                  </div>
                </div>
                <div className="info">
                  <div className="info-title">Preferred Qualifications</div>
                  <div className="info-value">
                    <ul>
                      {jobDescriptions[selectedJobIndex]?.preferredQualifications?.map((qualification, idx) => (
                        <li key={idx}>{qualification.preferredQualificationMsg}</li>
                      )) || "N/A"}
                    </ul>
                  </div>
                </div>
              </div>
            </section>
          )}
          <section className="job-performance">
            <span>
              <article>
                <b>SOFTWARE DEVELOPER</b>
              </article>
              <div className="save">
                <button className="saved daily-tr-btn">Save</button>
                <button className="apply daily-tr-btn">Apply</button>
                <button className="share daily-tr-btn">Share</button>
                <button onClick={handleclose} className='daily-tr-btn'>Close</button>
              </div>
            </span>
            {selectedJobIndex !== -1 && (
              <div className="names">
                <p><b>Field : </b>{jobDescriptions[selectedJobIndex]?.field || "N/A"}</p>
                <p><b>Location :</b>{jobDescriptions[selectedJobIndex]?.location || "N/A"}</p>
                <p><b>Salary :</b> {jobDescriptions[selectedJobIndex]?.salary || "N/A"}</p>
                <p><b>Designation :</b>{jobDescriptions[selectedJobIndex]?.designation || "N/A"}</p>
                <p><b>Educational Qualifications :</b>{jobDescriptions[selectedJobIndex]?.qualification || "N/A"}</p>
                <p><b>Experience :</b>{jobDescriptions[selectedJobIndex]?.experience || "N/A"}</p>
                <p><b>Key Skills :</b>{jobDescriptions[selectedJobIndex]?.skills || "N/A"}</p>
                <p><b>Company Link :</b><a href={jobDescriptions[selectedJobIndex]?.companyLink || "#"}>Website</a></p>
                <p><b>Shifts : </b>{jobDescriptions[selectedJobIndex]?.shift || "N/A"}</p>
                <p><b>Week Off's : </b>{jobDescriptions[selectedJobIndex]?.weekOff || "N/A"}</p>
                <p><b>Notice Period :</b> {jobDescriptions[selectedJobIndex]?.noticePeriod || "N/A"}</p>
                <p><b>Job Role : </b>{jobDescriptions[selectedJobIndex]?.jobRole || "N/A"}</p>
                <p><b>Job Type : </b>{jobDescriptions[selectedJobIndex]?.job_type || "N/A"}</p>
                <p><b>Perks:</b>
                  {jobDescriptions[selectedJobIndex]?.perks || "N/A"}
                </p>
                <p><b>Incentives For Recruiters : </b>{jobDescriptions[selectedJobIndex]?.incentive || "N/A"}</p>
                <p><b>Reporting Hierarchy : </b>{jobDescriptions[selectedJobIndex]?.reportingHierarchy || "N/A"}</p>
                <p><b>Number of Positions : </b>{jobDescriptions[selectedJobIndex]?.position || "N/A"}</p>
                <p><b>Documentation : </b>{jobDescriptions[selectedJobIndex]?.documentation || "N/A"}</p>
                <p><b>Gender : </b>{jobDescriptions[selectedJobIndex]?.gender || "N/A"}</p>
              </div>
            )}
          </section>
        </main>
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