import React, { useState, useEffect } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import { useParams } from "react-router-dom";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import "bootstrap/dist/css/bootstrap.css";
import { FaCheckCircle } from "react-icons/fa";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../EmployeeSection/CallingTrackerForm.css";


const CallingTrackerForm = ({ initialData, onDataAdditionSuccess }) => {
  const { employeeId } = useParams();
  const initialCallingTrackerState = {
    date: new Date().toISOString().slice(0, 10),
    candidateAddedTime: '',
    recruiterName: "",
    candidateName: "",
    candidateEmail: "",
    jobDesignation: "",
    requirementId: "",
    requirementCompany: "",
    sourceName: "",
    contactNumber: "",
    incentive: '',
    alternateNumber: "",
    currentLocation: "",
    fullAddress: "",
    communicationRating: "",
    selectYesOrNo: "No",
    callingFeedback: "",
    employee: {
      employeeId: parseInt(employeeId, 10),
    },
  };

  const initialLineUpState = {
    date: new Date().toISOString().slice(0, 10),
    candidateAddedTime: '',
    recruiterName: "",
    candidateName: "",
    candidateEmail: "",
    jobDesignation: "",
    incentive: '',
    requirementId: "",
    requirementCompany: "",
    sourceName: "",
    contactNumber: "",
    alternateNumber: "",
    currentLocation: "",
    communicationRating: "",
    selectYesOrNo: "No",
    callingFeedback: "",
    companyName: "",
    experienceYear: '',
    experienceMonth: '',
    relevantExperience: "",
    currentCTCLakh: '',
    currentCTCThousand: '',
    expectedCTCLakh: '',
    expectedCTCThousand: '',
    dateOfBirth: "",
    gender: "",
    qualification: "",
    yearOfPassing: "",
    extraCertification: "",
    feedBack: "",
    holdingAnyOffer: "",
    offerLetterMsg: "",
    noticePeriod: "",
    msgForTeamLeader: "",
    availabilityForInterview: "",
    interviewTime: "",
    finalStatus: "",
  };

  const [callingTracker, setCallingTracker] = useState(initialCallingTrackerState);
  const [lineUpData, setLineUpData] = useState(initialLineUpState);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [resumeUploaded, setResumeUploaded] = useState(false);
  const [successfulDataAdditions, setSuccessfulDataAdditions] = useState(0);
  const [requirementOptions, setRequirementOptions] = useState([]);
  const [candidateAddedTime, setCandidateAddedTime] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [isOtherLocationSelected, setIsOtherLocationSelected] = useState(false);
  const [isOtherEducationSelected, setIsOtherEducationSelected] = useState(false);

  const [candidateName, setCandidateName] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [sourceName, setSourceName] = useState('');
  const [errors, setErrors] = useState({
    candidateName: "",
    contactNumber: "",
    sourceName: "",
  });

  useEffect(() => {
    fetchRecruiterName();
    fetchRequirementOptions();
  }, [employeeId]);

  useEffect(() => {
    if (initialData) {
      setCallingTracker({
        ...initialCallingTrackerState,
        ...initialData,
      });
      if (initialData.selectYesOrNo === "Interested") {
        setLineUpData(initialData.lineUp || initialLineUpState);
      }
    }
  }, [initialData]);

  useEffect(() => {
    const updateTimer = () => {
      const now = new Date();
      const hours = String(now.getHours()).padStart(2, '0');
      const minutes = String(now.getMinutes()).padStart(2, '0');
      const seconds = String(now.getSeconds()).padStart(2, '0');
      const time = `${hours}:${minutes}:${seconds}`;
      setCandidateAddedTime(time);
      setCallingTracker(prevState => ({ ...prevState, candidateAddedTime: time }));
    };

    updateTimer();
    const timerInterval = setInterval(updateTimer, 1000);
    return () => clearInterval(timerInterval);
  }, []);

  const fetchRecruiterName = async () => {
    try {
      const response = await axios.get(

        `http://192.168.1.35:8891/api/ats/157industries/employeeName/${employeeId}`

      );
      const { data } = response;
      setCallingTracker((prevState) => ({
        ...prevState,
        recruiterName: data,
      }));
      setLineUpData((prevState) => ({
        ...prevState,
        recruiterName: data,
      }));
    } catch (error) {
      console.error("Error fetching employee name:", error);
    }
  };


  const fetchRequirementOptions = async () => {
    try {
      const response = await axios.get(
        `http://192.168.1.35:8891/api/ats/157industries/company-details`

      );
      const { data } = response;
      setRequirementOptions(data);
    } catch (error) {
      console.error("Error fetching requirement options:", error);
    }
  };


  const handleChange = (e) => {
    const { name, value } = e.target || e;
    if (name === "selectYesOrNo" && value === "No") {
      setLineUpData(initialLineUpState);

    } else if (name === "selectYesOrNo" && value === "Interested") {
      //setShowLineUpForm(true);
    }
    setCallingTracker({ ...callingTracker, [name]: value });
  };

  const handlePhoneNumberChange = (value, name) => {
    setCallingTracker((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleLineUpChange = (e) => {
    const { name, value } = e.target;
    setLineUpData({ ...lineUpData, [name]: value });
  };


  // const validateForm = () => {
  //   let valid = true;
  //   const errorsCopy = { ...errors };

  //   if (!candidateName.trim()) {
  //     errorsCopy.candidateName = "Please enter candidate name";
  //     valid = false;
  //   } else {
  //     errorsCopy.candidateName = "";
  //   }

  //   if (!contactNumber.trim()) {
  //     errorsCopy.contactNumber = "Please enter contact number";
  //     valid = false;
  //   } else {
  //     errorsCopy.contactNumber = "";
  //   }

  //   if (!sourceName.trim()) {
  //     errorsCopy.sourceName = "Please select source name";
  //     valid = false;
  //   } else {
  //     errorsCopy.sourceName = "";
  //   }

  //   setErrors(errorsCopy);
  //   return valid;
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
  

    try {
      const dataToUpdate = {
        ...callingTracker,
        employee: {
          employeeId: parseInt(employeeId, 10),
        },
      };

      let message = "";

      if (callingTracker.selectYesOrNo === "Interested") {
        dataToUpdate.lineUp = lineUpData;
        setSuccessfulDataAdditions(true);
        message = "In Calling & Line Up Data Added";
      } else {
        message = "Only Calling data added";
      }

      await axios.post(
        `http://192.168.1.35:8891/api/ats/157industries/calling-tracker`,

        dataToUpdate
      );

      setFormSubmitted(true);
      setTimeout(() => {
        setFormSubmitted(false);
        setCallingTracker(initialCallingTrackerState);
        setLineUpData(initialLineUpState);
        fetchRecruiterName();
        setSuccessfulDataAdditions(false);
      }, 3000);
    } catch (error) {
      console.error("Error:", error);
    }
  };


  const handleChangeemail = (event) => {
    setEmail(event.target.value);
    setError('');
  };

  const handleSubmitemail = (event) => {
    event.preventDefault();
    if (!email) {
      setError('Email is mandatory');
    } else {
      alert('Form submitted successfully!');
    }
  };

  const handleExperienceChange = (e) => {
    const { name, value } = e.target;
    if (name === 'totalExperienceYears' && value.length <= 2 && /^\d*$/.test(value)) {
      setLineUpData({ ...lineUpData, [name]: value });
    }
    if (name === 'totalExperienceMonths' && value.length <= 2 && /^\d*$/.test(value)) {
      setLineUpData({ ...lineUpData, [name]: value });
    }
  };

  const handleLocationChange = (e) => {
    const value = e.target.value;
    if (value === 'Other') {
      setIsOtherLocationSelected(true);
      setCallingTracker({ ...callingTracker, currentLocation: '' });
    } else {
      setIsOtherLocationSelected(false);
      setCallingTracker({ ...callingTracker, currentLocation: value });
    }
  };

  const handleLocationInputChange = (e) => {
    const { value } = e.target;
    setCallingTracker((prevState) => ({
      ...prevState,
      currentLocation: value,
    }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCallingTracker({ ...callingTracker, [name]: value });
  };

  const handleEducationChange = (e) => {
    const value = e.target.value;
    if (value === 'Other') {
      setIsOtherEducationSelected(true);
      setCallingTracker({ ...callingTracker, currentEducation: '' });
    } else {
      setIsOtherEducationSelected(false);
      setCallingTracker({ ...callingTracker, currentEducation: value });
    }
  };

  const handleeducationInputChange = (e) => {
    const { value } = e.target;
    setCallingTracker((prevState) => ({
      ...prevState,
      currentEducation: value,
    }));
  };

  const handleDateChange = (e) => {
    const { value } = e.target;
    const today = new Date();
    const birthDate = new Date(value);

    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    const dayDiff = today.getDate() - birthDate.getDate();

    if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
      age--;
    }

    if (age >= 18 && age <= 60) {
      setLineUpData({ ...lineUpData, dateOfBirth: value });
    } else {
      alert('Date of birth must make the user between 18 and 60 years old.');
      e.target.value = '';
    }
  };

  const handleExpectedCTCChange = (e) => {
    const value = e.target.value;
    if (/^\d*$/.test(value)) {
      setLineUpData({
        ...lineUpData,
        expectedCTC: value,
      });
    }
  };

  const handleLakhChange = (e) => {
    const value = e.target.value;
    if (/^\d*$/.test(value)) {
      setLineUpData({
        ...lineUpData,
        currentsalarylakh: value,
      });
    }
  };

  const handleThousandChange = (e) => {
    const value = e.target.value;
    if (/^\d*$/.test(value)) {
      setLineUpData({
        ...lineUpData,
        currentsalaryth: value,
      });
    }
  };

  const handleResumeFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setLineUpData({ ...lineUpData, resume: file });
      setResumeUploaded(true);
    }
  };

  const handleRequirementChange = (e) => {
    const { value } = e.target;
    const selectedRequirement = requirementOptions.find(
      (requirement) => requirement.requirementId === parseInt(value)
    );

    if (selectedRequirement) {
      setCallingTracker((prevState) => ({
        ...prevState,
        requirementId: selectedRequirement.requirementId,
        jobDesignation: selectedRequirement.designation,
        requirementCompany: selectedRequirement.companyName,
        incentive: selectedRequirement.incentive,
      }));
      setLineUpData((prevState) => ({
        ...prevState,
        requirementId: selectedRequirement.requirementId,
        jobDesignation: selectedRequirement.designation,
        requirementCompany: selectedRequirement.companyName,
        incentive: selectedRequirement.incentive,
      }));
    } else {
      setCallingTracker((prevState) => ({
        ...prevState,
        requirementId: value,
        jobDesignation: '',
        requirementCompany: '',
        incentive: '',
      }));
      setLineUpData((prevState) => ({
        ...prevState,
        requirementId: value,
        jobDesignation: '',
        requirementCompany: '',
        incentive: '',
      }));
    }
  };


  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="maintable">
          <table className="table  table-striped  text-center studTables" >
            <tbody >
              <tr  >


                <th scope="col" style={{ textAlign: "left" }} >Date & Time:</th>
                <td style={{ display: "flex", alignItems: "center", justifyContent: "center",  }}>
                  


                  <input
                    type="text"
                    //id="currentDate"
                    name="date"
                    value={callingTracker.date}
                    className="form-control"
                    style={{height:"30px",width:"100px",alignItems:"center",lineHeight:1,marginRight:"10px"}}
                    readOnly
                  />
                  <input
                    type="text"
                    id="candidateAddedTime"
                    name="candidateAddedTime"
                    value={candidateAddedTime}
                    className="form-control"
                    style={{height:"30px",width:"100px",alignItems:"center",lineHeight:1,marginLeft:"10px"}}
                    
                    readOnly
                  />
                </td>
                <th >Recruiters Name</th>
                <td>
                  <input
                    type="text"
                    name="recruiterName"
                    value={callingTracker.recruiterName}
                    readOnly
                    onChange={handleChange}

                    className="form-control"
                    style={{height:"30px",width:"100px",alignItems:"center",lineHeight:1,marginRight: "10px"}}
                  />
                </td>
              </tr>
              <div hidden>
                <input type="text" name="employeeId" readOnly value={callingTracker.employee.employeeId} />
              </div>

              <tr>

                <th> Candidates Full Name* </th>
                <td>
                  <input
                    type="text"
                    name="candidateName"
                    value={callingTracker.candidateName}
                    className={`form-control ${errors.candidateName ? 'is-invalid' : ''}`}
                    style={{height:"30px",width:"100%",alignItems:"center",lineHeight:1,marginRight: "10px"}}
                    onChange={handleChange}
                    required={callingTracker.selectYesOrNo !== "Interested"}
                  />
                  {errors.candidateName && (
                    <div className="invalid-feedback">{errors.candidateName}</div>
                  )}

                </td>

                <th scope="col">Candidate Email</th>
                <td>
                  <input
                    type="email"
                    name="candidateEmail"
                    value={callingTracker.candidateEmail}
                    onChange={handleChange}
                    className={`form-control ${error ? 'is-invalid' : ''}`}
                    style={{height:"30px",width:"100%",alignItems:"center",lineHeight:1,marginRight: "10px"}}
                    // required

                  />

                </td>

              </tr>
              <tr>
                <th scope="col">Contact Number*</th>
                <td>
                  <PhoneInput
                    placeholder="Enter phone number"
                    name="contactNumber"
                    value={callingTracker.contactNumber}
                    onChange={(value) => handlePhoneNumberChange(value, 'contactNumber')}
                    required={callingTracker.selectYesOrNo !== "Interested"}
                    defaultCountry="IN"
                    maxLength={11}
                    style={{height:"30px",width:"100%",alignItems:"center",lineHeight:1,marginRight: "10px"}}

                  />
                  {errors.contactNumber && (
                    <div className="invalid-feedback">{errors.contactNumber}</div>
                  )}

                </td>

                <th scope="col">Whatsapp Number</th>
                <td>
                  <PhoneInput
                    placeholder="Enter phone number"
                    name="alternateNumber"
                    value={callingTracker.alternateNumber}
                    onChange={(value) =>
                      handlePhoneNumberChange(value, "alternateNumber")
                    }
                    defaultCountry="IN"
                    maxLength={10}
                    className="PhoneInputInput"
                    style={{height:"30px",width:"100%",alignItems:"center",lineHeight:1,marginRight: "10px"}}

                  />
                </td>
              </tr>
              <tr >
                <th scope="col">Source Name* </th>
                <td className="onlyselect">
                  <select
                    className={`form-control ${errors.sourceName ? 'is-invalid' : ''}`}
                    name="sourceName"
                    value={callingTracker.sourceName}
                    onChange={handleChange}
                    required={callingTracker.selectYesOrNo !== "Interested"}
                    style={{height:"30px",width:"100%",alignItems:"center",lineHeight:1}}
                  >
                    <option value="">Select Source Name</option>
                    <option value="LinkedIn">linkedIn</option>
                    <option value="Naukri">Naukri</option>
                    <option value="Indeed">Indeed </option>
                    <option value="Times">Times</option>
                    <option value="Social Media">Social Media</option>
                    <option value="Company Page">Company Page</option>
                    <option value="Excel">Excel</option>
                    <option value="Friends">Friends</option>
                    <option value="others">others</option>
                  </select>
                  {errors.sourceName && (
                    <div className="invalid-feedback">{errors.sourceName}</div>
                  )}
                </td>


                <th scope="col">Job Id</th>
                <td style={{display:"flex"}}>
                  <select
                    className="form-control"
                    id="requirementId"
                    name="requirementId"
                    value={callingTracker.requirementId}
                    onChange={handleRequirementChange}
                    required={callingTracker.selectYesOrNo === "Interested"}
                    style={{height:"30px",width:"100%",alignItems:"center",lineHeight:1,marginRight: "10px"}}


                  >
                    <option value="">Select Requirement</option>
                    {requirementOptions.map((option) => (
                      <option key={option.requirementId} value={option.requirementId}>
                        {option.requirementId}
                      </option>
                    ))}
                  </select>
                  <div>
                  <input
                    type="text"
                    placeholder="Company"
                    id="requirementCompany"
                    name="requirementCompany"
                    className="form-control"
                    style={{height:"30px",width:"100%",alignItems:"center",lineHeight:1,marginRight: "10px"}}
                    value={callingTracker.requirementCompany}
                    readOnly
                  />
                  </div>
                </td>
              </tr>
              <tr>
                <th scope="col">Applying For Position</th>
                <td style={{ display: "flex"}}>
                  <input 
                    type="text"
                    id="jobDesignation"
                    name="jobDesignation"
                    className="form-control"
                    style={{height:"30px",width:"100%",alignItems:"center",lineHeight:1,marginRight: "10px"}}
                    value={callingTracker.jobDesignation}
                    readOnly
                  />
                  <input placeholder="Incentive" value={callingTracker.incentive} readOnly className="form-control" style={{height:"30px",width:"100%",alignItems:"center",lineHeight:1,marginRight: "10px"}} type="text" />
                </td>
                <th>Current Location</th>
                <td style={{ display: "flex", justifyContent: "space-around" }}>
                  {!isOtherLocationSelected ? (
                    <select 
                    required={callingTracker.selectYesOrNo === "Interested"}
                      name="currentLocation"
                      value={callingTracker.currentLocation}
                      onChange={handleLocationChange}
                      className="form-control"
                      style={{height:"30px",width:"100%",alignItems:"center",lineHeight:1,marginRight: "10px"}}

                    >
                      <option value="">Select Location</option>
                      <option value="Pune City">Pune City</option>
                      <option value="PCMC">PCMC</option>
                      <option value="Other">Other</option>

                    </select>
                  ) : (
                    <input
                      type="text"
                      name="currentLocation"
                      value={callingTracker.currentLocation}
                      onChange={handleLocationInputChange}
                      className="form-control"
                      placeholder="Enter your location"
                      required
                    />
                  )}
                  <input
                    type="text"
                    name="fullAddress"
                    placeholder="Full Address"
                    value={callingTracker.fullAddress}
                    onChange={handleChange}
                    required={callingTracker.selectYesOrNo === "Interested"}
                    className="form-control"
                    style={{height:"30px",width:"100%",alignItems:"center",lineHeight:1,marginRight: "10px"}}
                  />
                </td>
              </tr>

              <tr>
                <th>Calling Feedback</th>
                <td style={{display:"flex"}}>
                  <select
                    required={callingTracker.selectYesOrNo === "Interested"}
                    className="form-select"
                    name="callingFeedback"
                    value={callingTracker.callingFeedback}

                    onChange={handleChange}
                    style={{height:"30px",width:"100%",alignItems:"center",lineHeight:1,marginRight: "10px"}}

                  >
                    <option value="">Select Feedback Type</option>
                    <option value="Call Done">Call Done</option>
                    <option value="Asked for Call Back">
                      Asked for Call Back
                    </option>
                    <option value="No Answer">No Answer</option>
                    <option value="Call Disconnected by Candidate">
                      Call Disconnected by Candidate
                    </option>
                    <option value="Network Issue">Network Issue</option>
                    <option value="Invalid Number">Invalid Number</option>
                    <option value="Need to call back">Need to call back</option>
                    <option value="Do not call again">Do not call again</option>
                    <option value="Other">Other</option>
                  </select>
                  <select
                    required
                    className="form-select"
                    name="selectYesOrNo"
                    placeholder="Candidate Interested"
                    value={callingTracker.selectYesOrNo}
                    onChange={handleChange}
                    style={{height:"30px",width:"100%",alignItems:"center",lineHeight:1,marginRight: "10px"}}

                  >
                    <option value="">Select</option>
                    <option value="Interested">Interested</option>
                    <option value="No Interested">No Interested</option>
                    <option value="Interested But Not Eligible">
                      Intersted But Not Eligible
                    </option>
                    <option value="Eligible">Eligible</option>
                    <option value="No Interested">No Eligible</option>
                    <option value="Not Eligible But Interested">
                      Not Eligible But Intersted
                    </option>

                  </select>
                </td>
                <th scope="col">Date Of Birth</th>
                <td style={{display:"flex"}}>
                  <input
                    type="date"
                    name="dateOfBirth"
                    value={lineUpData.dateOfBirth}
                    onChange={handleDateChange}
                    className="form-control"
                    style={{height:"30px",width:"150px",alignItems:"center",lineHeight:1,marginRight:"0px",padding:"0px"}}

                  />
                  <div
                    className="main-gender"
                    style={{ display: "flex", alignItems: "center",textAlign:"center" , gap:"0px", marginLeft:"10px"}}
                    required={callingTracker.selectYesOrNo === "Interested"}
                  >

                    <input
                     
                      type="checkbox"
                      name="male"
                      value="male"
                      className="gender" 
                    
                      checked={lineUpData.gender === "male"}
                      onChange={(e) =>
                        setLineUpData({
                          ...lineUpData,
                          gender: e.target.value,
                        })
                      }
                    />
                    <label className="px-2">
                      Male
                    </label>

                    <input
                      type="checkbox"
                      name="female"
                      value="female"
                      className="gender"
                      style={{ paddingLeft: "auto" }}
                      checked={lineUpData.gender === "female"}
                      onChange={(e) =>
                        setLineUpData({
                          ...lineUpData,
                          gender: e.target.value,
                        })
                      }
                    />
                    <label className="px-2">
                      Female
                    </label>
                  </div>
                </td>

                
                
                
              </tr>

              <tr>
                
                <th scope="col">Education</th>
                <td style={{display:"flex" }}>
                  {!isOtherEducationSelected ? (
                    <select
                      name="qualification"
                      value={lineUpData.qualification}
                      onChange={handleLineUpChange}
                      className="form-control"
                      style={{height:"30px",width:"100%",alignItems:"center",lineHeight:1,marginRight: "10px"}}

                      required={callingTracker.selectYesOrNo === "Interested"}
                    >
                      <option value="">__Select __</option>
                      <option value="Other">Other</option>
                      <option value="10th">10th</option>
                      <option value="12th">12 th</option>
                      <option value="ITI">ITI</option>
                      <option value="diploma in CS">Diploma in Computer science</option>
                      <option value="Degree In CS">BTech in Computer Science</option>
                      <option value="M-Tech In CS">MTech in Computer Science</option>
                      <option value="PhD ">PhD</option>
                      <option value="BSC">BSC in chemestry</option>
                      <option value="MSC">MSC </option>
                      <option value="BCA">BCA</option>
                      <option value="MCA">MCA</option>
                      <option value="Associate of Arts (AA)">Associate of Arts (AA)</option>
                      <option value="Associate of Science (AS)">Associate of Science (AS)</option>
                      <option value="Associate of Applied Science (AAS)">Associate of Applied Science (AAS)</option>
                      <option value="Associate of Fine Arts (AFA)">Associate of Fine Arts (AFA)</option>
                      <option value="Associate of Business Administration (ABA)">Associate of Business Administration (ABA)</option>
                      <option value="Associate of Engineering (AE)">Associate of Engineering (AE)</option>
                      <option value="Associate of Nursing (AN)">Associate of Nursing (AN)</option>
                      <option value="Associate of General Studies (AGS)">Associate of General Studies (AGS)</option>
                      <option value="Associate of Occupational Studies (AOS)">Associate of Occupational Studies (AOS)</option>
                      <option value="Associate of Information Technology (AIT)">Associate of Information Technology (AIT)</option>
                      <option value="Bachelor's Degrees">Bachelor's Degrees</option>
                      <option value="Bachelor of Arts (BA)">Bachelor of Arts (BA)</option>
                      <option value="Bachelor of Science (BS)">Bachelor of Science (BS)</option>
                      <option value="Bachelor of Fine Arts (BFA)">Bachelor of Fine Arts (BFA)</option>
                      <option value="Bachelor of Business Administration (BBA)">Bachelor of Business Administration (BBA)</option>
                      <option value="Bachelor of Engineering (BEng)">Bachelor of Engineering (BEng)</option>
                      <option value="Bachelor of Technology (BTech)">Bachelor of Technology (BTech)</option>
                      <option value="Bachelor of Education (BEd)">Bachelor of Education (BEd)</option>
                      <option value="Bachelor of Nursing (BN)">Bachelor of Nursing (BN)</option>
                      <option value="Bachelor of Social Work (BSW)">Bachelor of Social Work (BSW)</option>
                      <option value="Bachelor of Music (BM)">Bachelor of Music (BM)</option>
                      <option value="Bachelor of Architecture (BArch)">Bachelor of Architecture (BArch)</option>
                      <option value="Bachelor of Science in Nursing (BSN)">Bachelor of Science in Nursing (BSN)</option>
                      <option value="Bachelor of Computer Science (BCS)">Bachelor of Computer Science (BCS)</option>
                      <option value="Bachelor of Laws (LLB)">Bachelor of Laws (LLB)</option>
                      <option value="Bachelor of Medicine, Bachelor of Surgery (MBBS)">Bachelor of Medicine, Bachelor of Surgery (MBBS)</option>
                      <option value="Bachelor of Dental Surgery (BDS)">Bachelor of Dental Surgery (BDS)</option>
                      <option value="Bachelor of Pharmacy (BPharm)">Bachelor of Pharmacy (BPharm)</option>
                      <option value="Bachelor of Public Health (BPH)">Bachelor of Public Health (BPH)</option>
                      <option value="Bachelor of Environmental Science (BES)">Bachelor of Environmental Science (BES)</option>
                      <option value="Bachelor of Communication (BComm)">Bachelor of Communication (BComm)</option>
                      <option value="Bachelor of Information Technology (BIT)">Bachelor of Information Technology (BIT)</option>
                      <option value="Bachelor of Science in Engineering (BSE)">Bachelor of Science in Engineering (BSE)</option>
                      <option value="Bachelor of Business (BBus)">Bachelor of Business (BBus)</option>
                      <option value="Bachelor of Design (BDes)">Bachelor of Design (BDes)</option>
                      <option value="Bachelor of Journalism (BJ)">Bachelor of Journalism (BJ)</option>
                      <option value="Bachelor of Applied Science (BAS)">Bachelor of Applied Science (BAS)</option>
                      <option value="Bachelor of Agriculture (BAgri)">Bachelor of Agriculture (BAgri)</option>
                      <option value="Bachelor of Veterinary Science (BVSc)">Bachelor of Veterinary Science (BVSc)</option>
                      <option value="Bachelor of Physiotherapy (BPT)">Bachelor of Physiotherapy (BPT)</option>
                      <option value="Master's Degrees">Master's Degrees</option>
                      <option value="Master of Arts (MA)">Master of Arts (MA)</option>
                      <option value="Master of Science (MS or MSc)">Master of Science (MS or MSc)</option>
                      <option value="Master of Business Administration (MBA)">Master of Business Administration (MBA)</option>
                      <option value="Master of Fine Arts (MFA)">Master of Fine Arts (MFA)</option>
                      <option value="Master of Education (MEd)">Master of Education (MEd)</option>
                      <option value="Master of Engineering (MEng)">Master of Engineering (MEng)</option>
                      <option value="Master of Technology (MTech)">Master of Technology (MTech)</option>
                      <option value="Master of Social Work (MSW)">Master of Social Work (MSW)</option>
                      <option value="Master of Music (MM)">Master of Music (MM)</option>
                      <option value="Master of Architecture (MArch)">Master of Architecture (MArch)</option>
                      <option value="Master of Public Health (MPH)">Master of Public Health (MPH)</option>
                      <option value="Master of Laws (LLM)">Master of Laws (LLM)</option>
                      <option value="Master of Computer Applications (MCA)">Master of Computer Applications (MCA)</option>
                      <option value="Master of Science in Nursing (MSN)">Master of Science in Nursing (MSN)</option>
                      <option value="Master of Library Science (MLS)">Master of Library Science (MLS)</option>
                      <option value="Master of Public Administration (MPA)">Master of Public Administration (MPA)</option>
                      <option value="Master of Philosophy (MPhil)">Master of Philosophy (MPhil)</option>
                      <option value="Master of Professional Studies (MPS)">Master of Professional Studies (MPS)</option>
                      <option value="Master of Design (MDes)">Master of Design (MDes)</option>
                      <option value="Master of Journalism (MJ)">Master of Journalism (MJ)</option>
                      <option value="Master of Environmental Science (MES)">Master of Environmental Science (MES)</option>
                      <option value="Master of Communication (MComm)">Master of Communication (MComm)</option>
                      <option value="Master of International Business (MIB)">Master of International Business (MIB)</option>
                      <option value="Master of Finance (MFin)">Master of Finance (MFin)</option>
                      <option value="Master of Management (MMgt)">Master of Management (MMgt)</option>
                      <option value="Master of Science in Engineering (MSE)">Master of Science in Engineering (MSE)</option>
                      <option value="Master of Health Administration (MHA)">Master of Health Administration (MHA)</option>
                      <option value="Master of Urban Planning (MUP)">Master of Urban Planning (MUP)</option>
                      <option value="Master of Data Science (MDS)">Master of Data Science (MDS)</option>
                      <option value="Doctoral Degrees">Doctoral Degrees</option>
                      <option value="Doctor of Philosophy (PhD)">Doctor of Philosophy (PhD)</option>
                      <option value="Doctor of Medicine (MD)">Doctor of Medicine (MD)</option>
                      <option value="Doctor of Education (EdD)">Doctor of Education (EdD)</option>
                      <option value="Doctor of Business Administration (DBA)">Doctor of Business Administration (DBA)</option>
                      <option value="Doctor of Dental Surgery (DDS)">Doctor of Dental Surgery (DDS)</option>
                      <option value="Doctor of Dental Medicine (DMD)">Doctor of Dental Medicine (DMD)</option>
                      <option value="Doctor of Veterinary Medicine (DVM)">Doctor of Veterinary Medicine (DVM)</option>
                      <option value="Doctor of Nursing Practice (DNP)">Doctor of Nursing Practice (DNP)</option>
                      <option value="Doctor of Psychology (PsyD)">Doctor of Psychology (PsyD)</option>
                      <option value="Juris Doctor (JD)">Juris Doctor (JD)</option>
                      <option value="Doctor of Public Health (DrPH)">Doctor of Public Health (DrPH)</option>
                      <option value="Doctor of Pharmacy (PharmD)">Doctor of Pharmacy (PharmD)</option>
                      <option value="Doctor of Physical Therapy (DPT)">Doctor of Physical Therapy (DPT)</option>
                      <option value="Doctor of Engineering (DEng or DScEng)">Doctor of Engineering (DEng or DScEng)</option>
                      <option value="Doctor of Science (DSc)">Doctor of Science (DSc)</option>
                      <option value="Doctor of Musical Arts (DMA)">Doctor of Musical Arts (DMA)</option>
                      <option value="Doctor of Social Work (DSW)">Doctor of Social Work (DSW)</option>
                      <option value="Doctor of Information Technology (DIT)">Doctor of Information Technology (DIT)</option>
                      <option value="Doctor of Health Science (DHSc)">Doctor of Health Science (DHSc)</option>
                      <option value="Doctor of Public Administration (DPA)">Doctor of Public Administration (DPA)</option>
                      <option value="Diplomas and Certificates">Diplomas and Certificates</option>
                      <option value="Diploma in Engineering">Diploma in Engineering</option>
                      <option value="Diploma in Nursing">Diploma in Nursing</option>
                      <option value="Diploma in Education">Diploma in Education</option>
                      <option value="Diploma in Business Studies">Diploma in Business Studies</option>
                      <option value="Diploma in Computer Applications">Diploma in Computer Applications</option>
                      <option value="Diploma in Culinary Arts">Diploma in Culinary Arts</option>
                      <option value="Diploma in Graphic Design">Diploma in Graphic Design</option>
                      <option value="Diploma in Information Technology">Diploma in Information Technology</option>
                      <option value="Diploma in Pharmacy">Diploma in Pharmacy</option>
                      <option value="Diploma in Accounting">Diploma in Accounting</option>
                      <option value="Diploma in Marketing">Diploma in Marketing</option>
                      <option value="Diploma in Hospitality Management">Diploma in Hospitality Management</option>
                      <option value="Diploma in Fashion Design">Diploma in Fashion Design</option>
                      <option value="Diploma in Project Management">Diploma in Project Management</option>
                      <option value="Diploma in Electrical Engineering">Diploma in Electrical Engineering</option>
                      <option value="Diploma in Mechanical Engineering">Diploma in Mechanical Engineering</option>
                      <option value="Diploma in Civil Engineering">Diploma in Civil Engineering</option>
                      <option value="Diploma in Health Sciences">Diploma in Health Sciences</option>
                      <option value="Diploma in Environmental Science">Diploma in Environmental Science</option>
                      <option value="Diploma in Journalism">Diploma in Journalism</option>
                      <option value="Diploma in Social Work">Diploma in Social Work</option>
                      <option value="Diploma in Early Childhood Education">Diploma in Early Childhood Education</option>
                      <option value="Diploma in Interior Design">Diploma in Interior Design</option>
                      <option value="Diploma in Event Management">Diploma in Event Management</option>
                      <option value="Diploma in Human Resource Management">Diploma in Human Resource Management</option>
                      <option value="Diploma in Digital Marketing">Diploma in Digital Marketing</option>
                      <option value="Diploma in Financial Management">Diploma in Financial Management</option>
                      <option value="Diploma in Logistics and Supply Chain Management">Diploma in Logistics and Supply Chain Management</option>
                      <option value="Diploma in Biotechnology">Diploma in Biotechnology</option>
                      <option value="Diploma in Tourism Management">Diploma in Tourism Management</option>
                      <option value="Diploma in Public Relations">Diploma in Public Relations</option>
                      <option value="Diploma in Web Development">Diploma in Web Development</option>
                      <option value="Diploma in Film and Television Production">Diploma in Film and Television Production</option>
                      <option value="Diploma in Software Engineering">Diploma in Software Engineering</option>
                      <option value="Diploma in Agriculture">Diploma in Agriculture</option>
                      <option value="Diploma in Cybersecurity">Diploma in Cybersecurity</option>
                      <option value="Diploma in Data Science">Diploma in Data Science</option>
                      <option value="Diploma in Artificial Intelligence">Diploma in Artificial Intelligence</option>

                    </select>
                  ) : (
                    <input
                      type="text"
                      name="education"
                      value={lineUpData.qualification}
                      onChange={handleeducationInputChange}
                      className="form-control"
                      placeholder="Enter your Education"
                    />
                  )}
                   <div>
                         <input type="text"
                          name="yearOfPassing"
                          placeholder="YOP"
                          value={lineUpData.yearOfPassing}
                          required={callingTracker.selectYesOrNo === "Interested"}
                          onChange={(e) => {
                            const value = e.target.value;
                            if (/^\d{0,4}$/.test(value)) {
                              if (value === "" || parseInt(value) <= 2025)
                                 {
                                  setLineUpData({
                                    ...lineUpData,
                                    yearOfPassing: value,
                                  });
      } else {
        alert("Cannot enter year above 2025");
      }
    }
  }}
                    className="form-control"
                    style={{height:"30px",width:"90px",alignItems:"center",lineHeight:1,marginRight: "5px"}}
                  />
                    </div>  
                    
                                  </td>




                  <th scope="col" >
                  Upload Resume
                  {resumeUploaded && (
                    <FaCheckCircle className="upload-success-icon" />
                  )}
                </th>
                <td style={{display:"flex"}}>
                  <input
                    type="file"
                    onChange={handleResumeFileChange}
                    accept=".pdf,.doc,.docx"
                    className="form-control pt-1"
                   // required={callingTracker.selectYesOrNo === "Interested"}
                    style={{height:"30px",width:"100%",alignItems:"center",lineHeight:1, marginRight:"10px"}}

                  />
                  <input
                    type="text"
                    name="extraCertification"
                    placeholder="Certification"
                    value={lineUpData.extraCertification}
                    style={{height:"30px",width:"100%",alignItems:"center",lineHeight:1}}
                    onChange={(e) =>
                      setLineUpData({
                        ...lineUpData,
                        extraCertification: e.target.value,
                      })
                    }
                    className="form-control"
                    required={callingTracker.selectYesOrNo === "Interested"}
                  />
                </td>
              </tr>
              <tr >






                <th scope="col">Current Company</th>
                <td>
                  <input
                    type="text"
                    name="companyName"
                    value={lineUpData.companyName}
                    onChange={(e) =>
                      setLineUpData({
                        ...lineUpData,
                        companyName: e.target.value,
                      })
                    }
                    className="form-control"
                    style={{height:"30px",width:"100%",alignItems:"center",lineHeight:1,marginRight: "10px"}}
                    required={callingTracker.selectYesOrNo === "Interested"}
                  />
                </td>

                <th scope="col">Experience</th>
                <td style={{display:"flex"}} >
                  <div style={{ display: 'flex', alignItems: 'center', margin: 'auto',padding:"0px"  }} required={callingTracker.selectYesOrNo === "Interested"}>
                    <div style={{ display: 'flex', alignItems: 'center', marginRight: 'auto', padding: '0px' }}>
                      <label htmlFor="experienceYear" style={{ marginRight: '5px', width: '40px' }}>Years:</label>
                      <input
                        type="text"
                        name="experienceYear"
                        value={lineUpData.experienceYear}
                        onChange={handleLineUpChange}
                        className="form-control"
                        placeholder=""
                        maxLength="2"
                        style={{ height:"30px",width: '60px', border: "1px solid gray", fontSize:"16px", marginRight:"30px" }}
                      />
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      <label htmlFor="totalExperienceMonths" style={{ marginRight: '23px', width: '40px' }}>Months:</label>
                      <input
                        type="number"
                        name="experienceMonth"
                        value={lineUpData.experienceMonth}
                        onChange={handleLineUpChange}
                        className="form-control"
                        placeholder=""
                        maxLength="2"
                        style={{ height:"30px",width: '60px', border: "1px solid gray", fontSize:"16px" }}
                        min="1"
                        max="12"
                      />

                    </div>
                  </div>
                </td>

              </tr>
              <tr>

                <th scope="col">Relavent Experince</th>
                <td style={{display:"flex"}}>
                  <input
                    type="text"
                    name="relevantExperience"
                    value={lineUpData.relevantExperience}
                    onChange={handleLineUpChange}
                    className="form-control"
                    style={{height:"30px",width:"100%",alignItems:"center",lineHeight:1,marginRight: "10px"}}
                    required={callingTracker.selectYesOrNo === "Interested"}

                  />
                  <div>
                  <input
                    type="text"
                    name="noticePeriod"
                    placeholder="Notice Period"
                    value={lineUpData.noticePeriod}
                    onChange={handleLineUpChange}
                    required={callingTracker.selectYesOrNo === "Interested"}
                    // onChange={(e) => {
                    //   const value = e.target.value;
                    //   if (value === '' || (Number(value) >= 0 && Number(value) <= 90)) {
                    //     setLineUpData({
                    //       ...lineUpData,
                    //       noticePeriod: value,
                    //     });
                    //   }
                    // }}
                    className="form-control"
                    style={{height:"30px",width:"100%",alignItems:"center",lineHeight:1,marginRight: "10px"}}
                    min="0"
                    max="90"
                  />
                  </div>



                </td>
                <th scope="col">Communication Rating</th>
                <td >
                  <input
                    type="text"
                    name="communicationRating"
                    value={callingTracker.communicationRating}
                    onChange={handleChange}
                    className="form-control"
                    style={{height:"30px",width:"100%",alignItems:"center",lineHeight:1,marginRight: "10px"}}
                    required={callingTracker.selectYesOrNo === "Interested"}
                  />
                  
                </td>
              </tr>

              <tr>
                <th scope="col">Current CTC(LPA)</th>

                <td style={{ display:"flex"}} >
                  <div style={{ display: 'flex', alignItems: 'center' }} required={callingTracker.selectYesOrNo === "Interested"}>
                    <div style={{ display: 'flex', alignItems: 'center', marginRight: 'auto',padding:'5px',justifyContent:"center" }}>
                      <label htmlFor="currentCTCLakh" style={{ marginRight: '5px', width: '40px',}}>Lakh:</label>
                      <input
                        type="text"
                        name="currentCTCLakh"
                        value={lineUpData.currentCTCLakh}
                        onChange={handleLineUpChange}
                        className="form-control"
                        placeholder=""

                        maxLength="2"
                        style={{ height:"30px",width: '60px', border: "1px solid gray", fontSize:"16px" }}
                        pattern="\d*"
                      />
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', padding: '5px' }}>
                      <label htmlFor="currentCTCThousand" style={{ marginRight: '40px', width: '40px' }}>Thousand:</label>
                      <input
                        type="text"
                        name="currentCTCThousand"
                        value={lineUpData.currentCTCThousand}
                        onChange={handleLineUpChange}
                        className="form-control"
                        placeholder=""
                        maxLength="2"
                        style={{ height:"30px",width: '60px', border: "1px solid gray" }}
                        pattern="\d*"
                        inputMode="numeric"
                      />
                    </div>
                  </div>
                </td>
                <th scope="col" style={{textAlign:"left"}}>Expected CTC(LPA)</th>
                <td style={{display:"flex"}} >
                  <div style={{ display: 'flex', alignItems: 'center' }} required={callingTracker.selectYesOrNo === "Interested"}>
                    <div style={{ display: 'flex', alignItems: 'center', marginRight: 'auto', padding: '5px',justifyContent:"center" }}>
                      <label htmlFor="expectedCTCLakh" style={{ marginRight: '5px', width: '40px' }}>Lakh:</label>
                      <input
                        type="text"
                        name="expectedCTCLakh"
                        value={lineUpData.expectedCTCLakh}
                        onChange={handleLineUpChange}
                        className="form-control"
                        placeholder=""
                        maxLength="2"
                        style={{height:"30px",width:"100%",alignItems:"center",lineHeight:1,marginRight: "10px"}}
                        pattern="\d*"
                      />
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', padding: '5px' }}>
                      <label htmlFor="expectedCTCThousand" style={{ marginRight: '40px', width: '40px' }}>Thousand:</label>
                      <input
                        type="text"
                        name="expectedCTCThousand"
                        value={lineUpData.expectedCTCThousand}
                        onChange={handleLineUpChange}
                        className="form-control"
                        placeholder=""
                        maxLength="2"
                        style={{height:"30px",width:"100%",alignItems:"center",lineHeight:1,marginRight: "10px"}}
                        pattern="\d*"
                        inputMode="numeric"
                      />
                    </div>
                  </div>
                </td>
              </tr>

              <tr>
                {/* <th scope="col" style={{textAlign:"left"}}>Notice Period(Days)</th>
                <td >
                  <input
                    type="text"
                    name="noticePeriod"
                    value={lineUpData.noticePeriod}
                    onChange={handleLineUpChange}
                    required={callingTracker.selectYesOrNo === "Interested"}
                    // onChange={(e) => {
                    //   const value = e.target.value;
                    //   if (value === '' || (Number(value) >= 0 && Number(value) <= 90)) {
                    //     setLineUpData({
                    //       ...lineUpData,
                    //       noticePeriod: value,
                    //     });
                    //   }
                    // }}
                    className="form-control"
                    min="0"
                    max="90"
                  />
                </td> */}

                <th scope="col" style={{textAlign:"left"}}>Holding Offer Letter</th>
                <td>
                  <select type="text"
                    name="holdingAnyOffer"
                    value={lineUpData.holdingAnyOffer} 
                    required={callingTracker.selectYesOrNo === "Interested"}
                    //onChange={handleLineUpChange}
                    onChange={(e) => setLineUpData({ ...lineUpData, holdingAnyOffer: e.target.value })} className="form-select"
                    style={{height:"30px", width: '90px',lineHeight:1,display: 'inline-block', marginRight: '10px' }}

>
                    <option value="">Select</option>
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                  </select>
                  <input type="text"
                    name="offerLetterMsg"
                    value={lineUpData.offerLetterMsg}
                    // onChange={handleLineUpChange}
                    onChange={(e) => setLineUpData({ ...lineUpData, offerLetterMsg: e.target.value })}
                    style={{ height:"30px",width: '150px',lineHeight:1, border: '1px solid #ccc', padding: '5px' }}
                     />
                </td>
                <th scope="col">Comment For TL</th>
                <td >
                  
                  <input
                    type="text"

                    name="msgForTeamLeader"
                    placeholder="Comment For TL"
                    value={lineUpData.msgForTeamLeader}
                    //onChange={handleLineUpChange}
                    onChange={(e) =>
                      setLineUpData({
                        ...lineUpData,
                        msgForTeamLeader: e.target.value,
                      })
                    }
                    className="form-control"
                    style={{height:"30px",width:"100%",alignItems:"center",lineHeight:1,marginRight: "10px"}}
                  />

                </td>



              </tr>

              

              {/* <tr>
               

                <th scope="col" style={{textAlign:"left"}}>Comment For Eevaluter/TL</th>
                <td>
                  <input
                    type="text"

                    name="msgForTeamLeader"
                    placeholder="comment For TL"
                    value={lineUpData.msgForTeamLeader}
                    //onChange={handleLineUpChange}
                    onChange={(e) =>
                      setLineUpData({
                        ...lineUpData,
                        msgForTeamLeader: e.target.value,
                      })
                    }
                    className="form-control"
                  />
                </td>
              </tr> */}
              <tr>
                <th scope="col" style={{textAlign:"left"}}>Availability of Interview</th>
                <td style={{ display: "flex" }}
                >
                  <input
                    type="date"
                    name="availabilityForInterview"
                    value={lineUpData.availabilityForInterview}
                    //onChange={handleLineUpChange}
                    onChange={(e) =>
                      setLineUpData({
                        ...lineUpData,
                        availabilityForInterview: e.target.value,
                      })
                    }
                    className="form-control"
                    style={{height:"30px",width:"100px",alignItems:"center",lineHeight:1,marginRight: "10px"}}
                  />
                  <input
                    type="time"
                    name="interviewTime"
                    value={lineUpData.interviewTime}
                    //onChange={handleLineUpChange}
                    onChange={(e) =>
                      setLineUpData({
                        ...lineUpData,
                        interviewTime: e.target.value,
                      })
                    }
                    className="form-control"
                    style={{height:"30px",alignItems:"center",lineHeight:1,whiteSpace:"nowrap",marginLeft:"10px"}}
                  />
                </td>

                <th scope="col">Final Status</th>
                <td style={{display:"flex"}}> 
                  <select
                    type="text"
                    name="finalStatus"
                    value={lineUpData.finalStatus}
                    onChange={(e) =>
                      setLineUpData({
                        ...lineUpData,
                        finalStatus: e.target.value,
                      })
                    }
                    className="form-select"
                    style={{height:"30px",width:"100%",alignItems:"center",lineHeight:1,marginRight: "10px"}}
                    required={callingTracker.selectYesOrNo === "Interested"}
                  >
                    <option value="">Select</option>
                    <option value="Interview schedule">Interview schedule</option>
                    <option value="Attending After Some time">Attending After Some time</option>
                    <option value="hold">hold</option>
                  </select>
                  <input
                    type="text"

                    name="msgForTeamLeader"
                    placeholder="FeedBack"
                    value={lineUpData.msgForTeamLeader}
                    //onChange={handleLineUpChange}
                    onChange={(e) =>
                      setLineUpData({
                        ...lineUpData,
                        msgForTeamLeader: e.target.value,
                      })
                    }
                    className="form-control"
                    style={{height:"30px",width:"100%",alignItems:"center",lineHeight:1}}
                    required={callingTracker.selectYesOrNo === "Interested"}
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {formSubmitted && (
          <div className="alert alert-success" role="alert">
            Data Added successfully!
          </div>
        )}
        <center>
        <div className="callingbutton">
          {callingTracker.selectYesOrNo !== "Interested" && (
            <button type="submit" className="ctf-btn" >
              Add To Calling
            </button>
          )}
          {callingTracker.selectYesOrNo === "Interested" && (
            <button type="submit" className="ctf-btn" id="uploadbtn2">
              Add To LineUp
            </button>
          )}
        </div>
        </center>

      </form>
    </div>
  );
};

// CallingTrackerForm.propTypes = {
//   initialData: PropTypes.object,
//   employeeId: PropTypes.string.isRequired,
//   onDataAdditionSuccess: PropTypes.func.isRequired,
// };

CallingTrackerForm.propTypes = {
  initialData: PropTypes.object,
  onDataAdditionSuccess: PropTypes.func.isRequired,
};

CallingTrackerForm.defaultProps = {
  initialData: null,
};

export default CallingTrackerForm;