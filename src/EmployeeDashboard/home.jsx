// import React,{useState,useEffect} from 'react'
// import{BsCart3, BsGrid1X2Fill, BsFillArchiveFill, BsFillGrid3X3GapFill, BsPeopleFill, BsListCheck, BsMenuButtonWideFill, BsFillGearFill }
//  from 'react-icons/bs'
//  import './home.css'
//  import { useParams,useNavigate } from 'react-router-dom';
//  import axios from 'axios';
//  import { getEmployeeWorkData } from '../api/api';


//  const Home = () =>  {
//   const [isCardOpen, setIsCardOpen] = useState(true);
//   const { employeeId } = useParams();
//   const [workData, setWorkData] = useState([]);
//   const [error, setError] = useState("");
//   const [showWorkData, setShowWorkData] = useState(true);


//   const [showUploadExcel, setShowUploadExcel] = useState(false);
//   const [showExcelLists, setShowExcelLists] = useState(false);
//   const [showDailyTarget, setShowDailyTarget] = useState(false);
//   const [showDataComponent, setShowDataComponent] = useState(false);

//   const navigator = useNavigate();

//   useEffect(() => {
//     if (!employeeId) {
//       navigator("/employee-login");
//     } else {
//       getEmployeeWorkData(employeeId)
//         .then((response) => {
//           setWorkData(response.data);
//           setError("");
//           console.log(employeeId + " Employee ID in employee")
//         })
//         .catch((error) => {
//           console.error("Error fetching work data:", error);
//           setError("Error fetching work data.");
//         });
//     } 
//   }, [employeeId]);

//   const handleClose = () => {
//       setIsCardOpen(false);
//   };


//   return (
// <>
// <div>
// <h1>
//   Job Discriptions Page
// </h1>
// </div>
//     <div className='main-home'>
//       <div className='main-cards'>
//       {showWorkData && !showUploadExcel && (
//           <div className="work-data">
//             {workData && (
//               <div className="requirement-div">
//                 {workData.map((data, index) => (
//                   <div key={index} className="col-md-6 mb-3">
//                     <div className="card">
//                       <div className="card-body">
//                         <h5 className="card-title">Work Data</h5>
//                         <ul>
//                           <li>Company Name: {data[2]}</li>
//                           <li>Position: {data[3]}</li>
//                           <li>Experince: {data[4]}</li>
//                           <li>Bond: {data[1]}</li>
//                           <li>Job Type: {data[5]}</li>
//                           <li>Location: {data[6]}</li>
//                           <li>Percentage: {data[7]}</li>
//                           <li>Position: {data[8]}</li>
//                           <li>Qulification: {data[9]}</li>
//                           <li>Salary: {data[10]}</li>
//                           <li>Skills: {data[11]}</li>
//                           <li>Stream: {data[12]}</li>
//                           <li>Year Of Passing: {data[13]}</li>
//                         </ul>
//                         <button
//                           className="btn btn-danger"
//                           onClick={handleClose}
//                         >
//                           Close
//                         </button>
//                       </div>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             )}
//           </div>
//         )}
     
//       </div>
//       </div>
//       </>
//   )
// }

// export default Home

import React, { useState } from 'react';
import './home.css';
import logo from '../LogoImages/ccclogo.jpg';
import add1 from '../LogoImages/add1.jpg';
import add2 from '../LogoImages/add2.mp4';
import 'bootstrap/dist/css/bootstrap.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faMapMarkerAlt, faSearch } from '@fortawesome/free-solid-svg-icons';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { faDownload } from '@fortawesome/free-solid-svg-icons';
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/js/bootstrap.bundle.min.js"></script>
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css" />




const JobDescription = ({ title, experience, keySkills, company, intensive, interviewRounds = [] }) => {
  const [showFullDescription, setShowFullDescription] = useState(false);
  const headingStyle = {
    color: 'rgb(1, 67, 159)',
    fontSize: '15px',
    fontweight:'800',
    fontFamily: 'Poppins, Arial, Helvetica, sans-serif',
    // Add more CSS properties as needed
  };
  
  return (
    <div className="job-description">
      <div className='description'>
      <h2 style={headingStyle}>{title}</h2>
      <p><label htmlFor="">Experience:</label>{experience}</p>
      <p><label htmlFor="">Key Skills:</label> {keySkills.join(', ')}</p>
      <p><label htmlFor="">Company Name:</label>{company}</p>

      <ul>
        {interviewRounds.map((round, index) => (
          <li key={index} className='intli'>
            {round.name}: {round.subRounds.join(', ')}
          </li>
        ))}
      </ul>
      {showFullDescription && (
        <p>This is the full job description.</p>
      )}
      <button className="view-more-button" onClick={() => setShowFullDescription(!showFullDescription)}>
        {showFullDescription ? "Hide" : "View More"}
      </button>
      
      </div>
      <div className='jobdescriptioncontent'>
            <button className='jobsbuttons'><label htmlFor=""><FontAwesomeIcon icon={faDownload}/></label></button>
            <button className='jobsbuttons'><label htmlFor=""><FontAwesomeIcon icon={faEdit}/></label></button>
              <div className="btn-group">
                <button type="button" className="btn btn-danger dropdown-toggle" style={{fontSize:"12px", fontWeight:"600",background:"#e9eeee",border:"none",color:"black"}} data-bs-toggle="dropdown" aria-expanded="true">Share with</button>
                <ul className="dropdown-menu">
                  <li><a className="dropdown-item" href="#">Team Leader</a></li>
                  <li><a className="dropdown-item" href="#">Recruiter</a></li>
                  <li><a className="dropdown-item" href="#">Candidate</a></li>
              </ul>
            </div>
      </div>
    </div>
  );
};

const Jobdiscription = () => {
  const [showJobDescription, setShowJobDescription] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [selectedJobFunction, setSelectedJobFunction] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [selectedSalary, setSelectedSalary] = useState(null);
  const [selectIntensive, setIntensive] = useState(null);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [location, setLocation] = useState('');
  const [keySkills, setKeySkills] = useState('');
  const [experience, setExperience] = useState('');

  const interviewRoundsData = [
    { name: "HR Round", subRounds: ["Interview", "Discussion"] },
    { name: "Technical Round", subRounds: ["Coding Test", "Project Discussion"] },
    { name: "Aptitude Test", subRounds: ["Math", "Logical Reasoning"] }
  ];

  const jobData = {
    title: "Software Engineer",
    experience: "3+ years",
    keySkills: ["JavaScript", "React", "Node.js"],
    company: "Infosys",
    jobFunction: "IT Software",
    location: "Pune",
    salary: "0-2 LPA",
    intensive: "5000",
    interviewRounds: [
      { name: "HR Round", subRounds: ["Interview", "Discussion"] },

      { name: "Technical Round", subRounds: ["Coding Test", "Project Discussion"] }
    ]
  };

  const jobData2 = {
    title: "Python Developer",
    experience: "3+ years",
    keySkills: ["Python", "Django", "Flask"],
    company: "TCS",
    jobFunction: "IT Software",
    location: "Pune",
    salary: "2-5 LPA",
    intensive: "7000",
    interviewRounds: [
      { name: "HR Round", subRounds: ["Interview", "Discussion"] } ,
      { name: "Technical Round", subRounds: ["Coding Test", "Project Discussion"] }
    
    ]
  };

  const handleShowJobDescription = (company, jobFunction, location, salary, intensive) => {
    setShowJobDescription(true);
    setSelectedCompany(company);
    setSelectedJobFunction(jobFunction);
    setSelectedLocation(location);
    setSelectedSalary(salary);
    setIntensive(intensive);
  };

  const handleCloseJobDescription = () => {
    setShowJobDescription(false);
    setSelectedCompany(null);
    setSelectedJobFunction(null);
    setSelectedLocation(null);
    setSelectedSalary(null);
    setIntensive(null);
  };

  const handleSearch = () => {
    const filtered = [jobData, jobData2].filter(job => (
      job.location.toLowerCase() === location.toLowerCase() &&
      job.keySkills.includes(keySkills) &&
      job.experience.toLowerCase().includes(experience.toLowerCase())
    ));
    setFilteredJobs(filtered);
  };
  

  return (
    <div className="job-page">     
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

      <div className="content" >
        <div className="jobDiscription-sidebar" style={{ maxHeight: 'calc(100vh - 200px)', overflowY: 'auto'}}>
          <div className={`toggle-list ${selectedCompany === null ? 'active' : ''}`} onClick={() => handleShowJobDescription(null, selectedJobFunction, selectedLocation, selectedSalary)}>
            All Companies
          </div>
          <div className={`toggle-list ${selectedCompany === "Infosys" ? 'active' : ''}`} onClick={() => handleShowJobDescription("Infosys", selectedJobFunction, selectedLocation, selectedSalary)}>
            Infosys
          </div>
          <div className={`toggle-list ${selectedCompany === "TCS" ? 'active' : ''}`} onClick={() => handleShowJobDescription("TCS", selectedJobFunction, selectedLocation, selectedSalary)}>
            TCS
            
          </div>
          <hr />
          <div className={`toggle-list ${selectedJobFunction === null ? 'active' : ''}`} onClick={() => handleShowJobDescription(selectedCompany, null, selectedLocation, selectedSalary)}>
            All Functions
          </div>
          <div className={`toggle-list ${selectedJobFunction === "IT Software" ? 'active' : ''}`} onClick={() => handleShowJobDescription(selectedCompany, "IT Software", selectedLocation, selectedSalary)}>
            IT Software
          </div>
          <div className={`toggle-list ${selectedJobFunction === "IT Hardware" ? 'active' : ''}`} onClick={() => handleShowJobDescription(selectedCompany, "IT Hardware", selectedLocation, selectedSalary)}>
            IT Hardware
            
          </div>
          <hr />
          <div className={`toggle-list ${selectedLocation === null ? 'active' : ''}`} onClick={() => handleShowJobDescription(selectedCompany, selectedJobFunction, null, selectedSalary)}>
            All Locations
          </div>
          <div className={`toggle-list ${selectedLocation === "Pune" ? 'active' : ''}`} onClick={() => handleShowJobDescription(selectedCompany, selectedJobFunction, "Pune", selectedSalary)}>
            Pune
          </div>
          <div className={`toggle-list ${selectedLocation === "Mumbai" ? 'active' : ''}`} onClick={() => handleShowJobDescription(selectedCompany, selectedJobFunction, "Mumbai", selectedSalary)}>
            Mumbai
          </div>
          <hr />
         
          <div className={`toggle-list ${selectedSalary === null ? 'active' : ''}`} onClick={() => handleShowJobDescription(selectedCompany, selectedJobFunction, selectedLocation, null)}>
          Salary
          </div>
          <div className={`toggle-list ${selectedSalary === "0 - 2 LPA" ? 'active' : ''}`} onClick={() => handleShowJobDescription(selectedCompany, selectedJobFunction, selectedLocation, "0-2 LPA")}>
            0-2 LPA
          </div>
          <div className={`toggle-list ${selectedSalary === "2 - 5 LPA" ? 'active' : ''}`} onClick={() => handleShowJobDescription(selectedCompany, selectedJobFunction, selectedLocation, "2- 5 LPA")}>
            2-5 LPA
          </div>
          <hr />
          <div className={`toggle-list ${selectIntensive === null ? 'active' : ''}`} onClick={() => handleShowJobDescription(selectedCompany, null, selectedLocation, selectedSalary, null)}>
          Intensive
          </div>
          <div className={`toggle-list ${selectIntensive === "5000" ? 'active' : ''}`} onClick={() => handleShowJobDescription(selectedCompany, selectedJobFunction, selectedLocation, selectedSalary, "5000")}>
          0-5000
          </div>
          <div className={`toggle-list ${selectIntensive === "7000" ? 'active' : ''}`} onClick={() => handleShowJobDescription(selectedCompany, selectedJobFunction, selectedLocation, selectedSalary, "7000")}>
          5000-7000
          <hr /></div>
        </div>
        
       
        <div className="job-details" >
          
          <>
          
            {[jobData, jobData2].map((job, index) => (
              
            <React.Fragment key={index}>
              
              
            {(selectedCompany === null || job.company === selectedCompany) &&
            (selectedJobFunction === null || job.jobFunction === selectedJobFunction) &&
            (selectedLocation === null || job.location === selectedLocation) &&
            (selectedSalary === null || job.salary === selectedSalary) &&
            (selectIntensive === null || job.intensive === selectIntensive) &&
            (location === '' || job.location === location) &&
            (keySkills === '' || job.keySkills.includes(keySkills)) ? (
              
           <JobDescription {...job} />
           
            ) : null}
            
        <br />
      </React.Fragment>
    ))}
    {filteredJobs.length === 0 && <p><br /></p>}
    <br />
    <button className="close-button" onClick={handleCloseJobDescription}>Close</button>
  </>
</div>
        <div className='add'>
          <div className="additional-box">
          <video width="500" height="270" controls>
          <source src={add2} type="video/mp4" />
          </video>
          </div><br />
          <div className='advertise'>
          <img src={add1} alt="Advertisement 1" width="450" height="280" controls/>
          </div>
        </div>
      </div>
    </div>
  );
};


export default Jobdiscription;
