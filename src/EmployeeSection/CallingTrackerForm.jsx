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

const CallingTrackerForm = ({
  initialData,
  onDataAdditionSuccess,
}) => {

  const { employeeId } = useParams();

  const initialCallingTrackerState = {
    date: new Date().toISOString().slice(0, 10),
    time: "",
    recruiterName: "",
    candidateName: "",
    candidateEmail: "",
    position: "",
    requirementId: "",
    requirementCompany: "",
    sourceName: "",
    contactNumber: "",
    alternateNumber: "",
    currentLocation: "",
    currentEducation:"",
    communicationRating: "",
    selectYesOrNo: "No",
    personalFeedback: "",
    callingFeedback: "",
    totalExperienceYears: '',
    totalExperienceMonths: '',
    relaventExperience: '',
    currentsalarylakh: '',
    currentsalaryth: '',
    employee: {
      employeeId: parseInt(employeeId, 10)
    },
    
  };

  const initialLineUpState = {
    date: new Date().toISOString().slice(0, 10),
    time: "",
    recruiterName: "",
    candidateName: "",
    candidateEmail: "",
    position: "",
    requirementId: "",
    requirementCompany: "",
    sourceName: "",
    contactNumber: "",
    alternateNumber: "",
    currentLocation: "",
    currentEducation:"",
    communicationRating: "",
    personalFeedback: "",
    selectYesOrNo: "No",
    callingFeedback: "",
    dateOfBirth: "",
    gender: "",
    qualification: "",
    yearOfPassing: "",
    totalExperience: "",
    resume: "",
    extraCertification: "",
    companyName: "",
    currentCompany: "",
    currentCTC: "",
    expectedCTC: "",
    noticePeriod: "",
    holdingAnyOffer: "",
    feedBack: "",
    availabilityForInterview: "",
    msgForTeamLeader: "",
    finalStatus: "",
    interviewTime: "",
    totalExperienceYears: '',
    totalExperienceMonths: '',
    currentsalarylakh: '',
    currentsalaryth: '',

    
  };

  const [callingTracker, setCallingTracker] = useState(initialCallingTrackerState);
  const [showLineUpForm, setShowLineUpForm] = useState(false);
  const [lineUpData, setLineUpData] = useState(initialLineUpState);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [resumeUploaded, setResumeUploaded] = useState(false);
  const [successfulDataAdditions, setSuccessfulDataAdditions] = useState(0);
  const [requirementOptions, setRequirementOptions] = useState([]);
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const [time, setTime] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [isOtherLocationSelected, setIsOtherLocationSelected] = useState(false);
  const [isOtherEducationSelected,setIsOtherEducationSelected] = useState(false);
  const [currentSalaryLakh, setCurrentSalaryLakh] = useState('');
  const [currentSalaryThousand, setCurrentSalaryThousand] = useState('');
  const [inputValue, setInputValue] = useState('');
  const [suggestions, setSuggestions] = useState([]);

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
      setTime(`${hours}:${minutes}:${seconds}`);
    };

    updateTimer(); // Initial call to set the timer immediately
    const timerInterval = setInterval(updateTimer, 1000); // Update the timer every second

    return () => clearInterval(timerInterval); // Cleanup on component unmount
  }, []);

  const fetchRecruiterName = async () => {
    try {
      const response = await axios.get(
        `http://192.168.1.43:8891/api/ats/157industries/employeeName/${employeeId}`
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
        `http://192.168.1.43:8891/api/ats/157industries/company-list/${employeeId}`
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
        onDataAdditionSuccess();
        dataToUpdate.lineUp = lineUpData;
        setSuccessfulDataAdditions(true);
        message = "In Calling & Line Up Data Added";
      } else {
        message = "Only Calling data added";
      }

      await axios.post(
        `http://192.168.1.43:8891/api/ats/157industries/${employeeId}/addCallingData`,
        dataToUpdate
      );

      setFormSubmitted(true);
      setTimeout(() => {
        setFormSubmitted(false);
        setCallingTracker(initialCallingTrackerState);
        setLineUpData(initialLineUpState);
        fetchRecruiterName();
        setSuccessfulDataAdditions(false);

        console.log(message);
        console.log("Data added successfully.");
      }, 3000);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleChangeemail = (event) => {
    setEmail(event.target.value);
    setError(''); // Clear the error message when the user starts typing
  };

  const handleSubmitemail = (event) => {
    event.preventDefault();
    if (!email) {
      setError('Email is mandatory');
    } else {
      // Proceed to the next step
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

    // Calculate age
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    const dayDiff = today.getDate() - birthDate.getDate();

    // Adjust age if birth date hasn't occurred yet this year
    if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
      age--;
    }

    // Ensure date is within the 18 to 60 years old range
    if (age >= 18 && age <= 60) {
      setLineUpData({ ...lineUpData, dateOfBirth: value });
    } else {
      alert('Date of birth must make the user between 18 and 60 years old.');
      e.target.value = ''; // Reset the input if the date is invalid
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
  

  const handleChangecompany = async (e) => {
    const { name, employeeId } = e.target;
    setCallingTracker({ ...callingTracker, [name]: employeeId });

    if (name === 'requirementId') {
      try {
        const response = await axios.get(
          `http://192.168.1.43:8891/api/ats/157industries/company-details/${employeeId}`
        );
        const { requirementCompany, positions } = response.data;
        setCallingTracker((prevState) => ({
          ...prevState,
          requirementCompany,
          position: positions.length > 0 ? positions[0] : ''
        }));
      } catch (error) {
        console.error("Error fetching company details:", error);
      }
    }
  };
  

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="maintable">
          <table id="studTables" className="table  table-striped  text-center" >
            <tbody className="table-group-divider">
              
              <tr id="table-row" >
              <th scope="col" >Date & Time:</th>
              <td style={{ display: "flex", alignItems: "center",justifyContent:"center",paddingTop:"14px", }}>
              <input
                type="text"
                id="currentDate"
                name="currentDate"
                value={date}
                className="form-control mb-2"
                style={{ marginRight: "20px",width:"180px" }}
                
                readOnly
              />
              <input
                type="text"
                id="currentTimer"
                name="currentTimer"
                value={time}
                className="form-control"
                style={{ marginBottom: "9px",width:"180px" , marginRight:"30px",paddingLeft:"10px" }}
                readOnly
              />
            </td>
                <th >Recruiters Name</th>
                <td>
                  <input
                    type="text"
                    name="recruiterName"
                    value={callingTracker.recruiterName}
                    onChange={handleChange}
                    readOnly
                    className="form-control"
                  />
                </td>
              </tr>
              <tr></tr>

              <tr id="heading123">
                
               
              </tr>

              <div hidden>
              <tr >
                <th>Employee ID</th>
                <td>
                  <input type="text" name="employeeId" readOnly value={employeeId} />
                </td>
              </tr>
              </div>

              <tr id="heading123">
                <th> Candidates Full Name* </th>
                <td>
                  <input
                    type="text"
                    name="candidateName"
                    value={callingTracker.candidateName}
                    
                    onChange={handleChange}
                    className="form-control"
                    required
                  />
                </td>
                <th scope="col">Candidate Email</th>
                <td>
                <input
                  type="email"
                  name="candidateEmail"
                  value={email}
                  onChange={handleChangeemail}


                  className={`form-control ${error ? 'is-invalid' : ''}`}
                  required
                />
                
              </td>
              </tr>
              <tr>
                <th scope="col">Contact Number*</th>
                <td>
                  <PhoneInput
                    placeholder="Enter phone number"
                    value={callingTracker.contactNumber}
                    onChange={(value) =>
                      handlePhoneNumberChange(value, "contactNumber")
                    }
                    defaultCountry="IN"
                    maxLength={11}
                    className="PhoneInputInput"
                    name="contactNumber"
                    required
                  />
                </td>

                <th scope="col">Alternate Number</th>
                <td>
                  <PhoneInput
                    placeholder="Enter phone number"
                    value={callingTracker.alternateNumber}
                    onChange={(value) =>
                      handlePhoneNumberChange(value, "alternateNumber")
                    }
                    defaultCountry="IN"
                    maxLength={11}
                    className="PhoneInputInput"
                    name="alternateNumber"
                  />
                </td>
              </tr>
              <tr>
                <th scope="col">Source Name* </th>
                <td>
                  <select
                    className="form-select"
                    name="sourceName"
                    value={callingTracker.sourceName}
                    onChange={handleChange}
                    
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
                </td>
                <th scope="col">Applying Company Id</th>
                <td>
                  <select
                    className="form-select mb-1"
                    name="requirementId"
                    value={callingTracker.requirementId}
                    onChange={handleChangecompany}
                  >
                    <option value="">Select ID</option>
                    {requirementOptions.map((option) => (
                      <option key={option[0]} value={option[0]}>
                        {option[0]}
                      </option>
                    ))}
                  </select>
                </td>

                
              </tr>

              <tr>
              <th scope="col">Applying For Position</th>
                <td>
                  <input
                    type="text"
                    name="position"
                    value={callingTracker.position}
                    onChange={handleChangecompany}
                    className="form-control"
                  />
                </td>
                

                <th scope="col">Applying Company Name</th>
                <td>
                  <select
                    className="form-select"
                   
                    name="requirementCompany"
                    value={callingTracker.requirementCompany}
                    onChange={handleChangecompany}
                  >
                    <option value="">Select Company</option>
                    {requirementOptions.map((option) => (
                      <option key={option.requirement_id} employeeId={option[1]}>
                        {option[1]}
                      </option>
                    ))}
                  </select>
                </td>
              </tr>

              <tr>
                <th>Current Location</th>
                <td>
            {!isOtherLocationSelected ? (
              <select
                name="currentLocation"
                value={callingTracker.currentLocation}
                onChange={handleLocationChange}
                className="form-control"
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
          </td> 

          <th> Full Adress</th>
                <td>
                  <input
                    type="text"
                    name="fullAddress"
                    value={callingTracker.fullAddress}
                    onChange={handleChange}
                    className="form-control"
                  />
                </td>
                
                
              </tr>

              <tr>
                <th>Calling Feedback</th>
                <td>
                  <select
                    className="form-select"
                    name="callingFeedback"
                    value={callingTracker.callingFeedback}
                    onChange={handleChange}
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
                </td>
                <th>Candidate Interested</th>
                <td>
                  <select
                    className="form-select"
                    name="selectYesOrNo"
                    value={callingTracker.selectYesOrNo}
                    onChange={handleChange}
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
              </tr>

              <tr>
                <th scope="col">Date Of Birth</th>
                <td>
            <input
              type="date"
              name="dateOfBirth"
              value={lineUpData.dateOfBirth}
              onChange={handleDateChange}
              className="form-control"
              required
            />
          </td>

                <th scope="col">Gender</th>
                <td>
                  <div
                    className="main-gender"
                    style={{ display: "flex", alignItems: "center" }}
                  >
                    
                      <input
                      style={{paddingTop:"8px"}}
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
              <th>Education</th>
                <td>
            {!isOtherEducationSelected ? (
              <select
                name="currentEducation"
                value={callingTracker.currentEducation}
                onChange={handleEducationChange}
                className="form-control"
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
                <option value= "Associate of Arts (AA)">Associate of Arts (AA)</option>
<option value ="Associate of Science (AS)">Associate of Science (AS)</option>
<option value= "Associate of Applied Science (AAS)">Associate of Applied Science (AAS)</option>
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
                value={callingTracker.currentEducation}
                onChange={handleeducationInputChange}
                className="form-control"
                placeholder="Enter your Education"
              />
            )}
          </td> 
                <th scope="col">Year Of Passing</th>
                
                  <td>
                    <input
                      type="text"
                      name="yearOfPassing" 
                      value={lineUpData.yearOfPassing}
                      onChange={(e) => {
                      const value = e.target.value;
                      if (/^\d{0,4}$/.test(value)) {
                      setLineUpData({
                      ...lineUpData,
                      yearOfPassing: value,
                    
                    });
                  }
                }}
              className="form-control"
            />
          </td>
        </tr>

              <tr>
                <th scope="col">
                  Upload Resume
                  {resumeUploaded && (
                    <FaCheckCircle className="upload-success-icon" />
                  )}
                </th>
                <td>
                  <input
                    type="file"
                    onChange={handleResumeFileChange}
                    accept=".pdf,.doc,.docx"
                    className="form-control pt-1"
                  />
                </td>

                <th>Any Extra Certification</th>
                <td>
                  <input
                    type="text"
                    name="extraCerification"
                    value={lineUpData.extraCertification}
                    onChange={(e) =>
                      setLineUpData({
                        ...lineUpData,
                        extraCertification: e.target.value,
                      })
                    }
                    className="form-control"
                  />
                </td>
              </tr>

              <tr>
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
                  />
                </td>

                <th scope="col">Experince</th>
                <td style={{ paddingLeft: '5px' }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', marginRight: '5px',  padding: '5px' }}>
                <label htmlFor="totalExperienceYears" style={{ marginRight: '5px', width: '50px' }}>Years:</label>
                <input
                  type="text"
                  name="totalExperienceYears"
                  value={lineUpData.totalExperienceYears}
                  onChange={handleExperienceChange}
                  className="form-control"
                  placeholder=""
                  maxLength="2"
                  style={{ width: '50px',border:"1px solid gray" }}
                />
              </div>
              <div style={{ display: 'flex', alignItems: 'center',  padding: '5px' }}>
                <label htmlFor="totalExperienceMonths" style={{ marginRight: '23px', width: '50px' }}>Months:</label>
                <input
                  type="number"
                  name="totalExperienceMonths" 
                  value={lineUpData.totalExperienceMonths}
                  onChange={(e) => {
                  const value = e.target.value;
                  if (value === '' || (Number(value) >= 1 && Number(value) <= 12)) {
                  setLineUpData({
                  ...lineUpData,
                  totalExperienceMonths: value,
                  
                  });
                }
              }}
             className="form-control"
            placeholder=""
            maxLength="2"
            style={{ width: '60px', border: '1px solid gray' }}
            min="1"
            max="12"
            />

              </div>
            </div>
          </td>
          
              </tr>
              <tr>

              <th scope="col">Relavent Experince</th>
                <td>
                <input
                  type="text"
                  name="relaventExperience"
                  value={lineUpData.relaventExperience}
                  onChange={handleChange}
                  className="form-control"
                 
                />
               
              </td>
              <th scope="col">Communication Rating</th>
                <td>
                  <input
                    type="text"
                    name="communicationRating"
                    value={callingTracker.communicationRating}
                    onChange={handleChange}
                    className="form-control"
                  />
                </td>
              </tr>

              <tr>
            <th scope="col">Current CTC(LPA)</th>
                
          <td style={{ paddingLeft: '5px' }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', marginRight: '5px', padding: '5px' }}>
                <label htmlFor="currentsalarylakh" style={{ marginRight: '5px', width: '50px' }}>Lakh:</label>
                <input
                  type="text"
                  name="currentsalarylakh"
                  onChange={handleLakhChange}
                  className="form-control"
                  placeholder=""
                  maxLength="2"
                  style={{ width: '60px', border: "1px solid gray" }}
                  pattern="\d*"
                />
              </div>
              <div style={{ display: 'flex', alignItems: 'center', padding: '5px' }}>
                <label htmlFor="currentsalaryth" style={{ marginRight: '40px', width: '50px' }}>Thousand:</label>
                <input
                  type="text"
                  name="currentsalaryth"
                  // value={currentSalaryThousand}
                  onChange={handleThousandChange}
                  className="form-control"
                  placeholder=""
                  maxLength="2"
                  style={{ width: '70px', border: "1px solid gray" }}
                  pattern="\d*"
                  inputMode="numeric"
                />
              </div>
            </div>
          </td>  
              <th scope="col">Expected CTC(LPA)</th>
              <td style={{ paddingLeft: '5px' }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', marginRight: '5px', padding: '5px' }}>
                <label htmlFor="currentsalarylakh" style={{ marginRight: '5px', width: '50px' }}>Lakh:</label>
                <input
                  type="text"
                  name="currentsalarylakh"
                 
                  onChange={handleLakhChange}
                  className="form-control"
                  placeholder=""
                  maxLength="2"
                  style={{ width: '60px', border: "1px solid gray" }}
                  pattern="\d*" 
                />
              </div>
              <div style={{ display: 'flex', alignItems: 'center', padding: '5px' }}>
                <label htmlFor="currentsalaryth" style={{ marginRight: '40px', width: '50px' }}>Thousand:</label>
                <input
                  type="text"
                  name="currentsalaryth"
                  onChange={handleThousandChange}
                  className="form-control"
                  placeholder=""
                  maxLength="2"
                  style={{ width: '70px', border: "1px solid gray" }}
                  pattern="\d*"
                  inputMode="numeric"
                />
              </div>
            </div>
          </td>
                </tr>

              <tr>
                <th scope="col">Notice Period(Days)</th>
                <td>
  <input
    type="number"
    name="noticePeriod"
    value={lineUpData.noticePeriod}
    onChange={(e) => {
      const value = e.target.value;
      if (value === '' || (Number(value) >= 0 && Number(value) <= 90)) {
        setLineUpData({
          ...lineUpData,
          noticePeriod: value,
        });
      }
    }}
    className="form-control"
    min="0"
    max="90"
  />
</td>

                <th scope="col">Holding Offer Letter</th>
                <td><select type="text" name="finalStatus" 
                value={lineUpData.holdingAnyOffer} 
                onChange={(e) => setLineUpData({ ...lineUpData, holdingAnyOffer: e.target.value })} className="form-select" 
                style={{ width: '150px', display: 'inline-block', marginRight: '10px' }}>
                  <option value="">Select</option>
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                  </select>
                  <input type="text" name="Holdingofferlatter" 
                  value={lineUpData.holdingOfferInput} 
                  onChange={(e) => setLineUpData({ ...lineUpData, holdingOfferInput: e.target.value })}
                  style={{ width: '150px',height:"35px", display: 'inline-block', border: '1px solid #ccc', padding: '5px' }} />
                  </td>

              </tr>

              <tr>
                <th scope="col">Recruiters Feedback</th>
                <td>
                  <input
                    type="text"
              
                    name="feedBack"
                    value={lineUpData.feedBack}
                    onChange={(e) =>
                      setLineUpData({ ...lineUpData, feedBack: e.target.value })
                    }
                    className="form-control"
                  />
                </td>

                <th scope="col">Comment For Eevaluter/TL</th>
                <td>
                  <input
                    type="text"
                 
                    name="msgForTeamLeader"
                    value={lineUpData.msgForTeamLeader}
                    onChange={(e) =>
                      setLineUpData({
                        ...lineUpData,
                        msgForTeamLeader: e.target.value,
                      })
                    }
                    className="form-control"
                  />
                </td>
              </tr>
              <tr>
                <th scope="col">Availability Of a Interview</th>
                <td style={{ display: "flex", alignItems: "center",justifyContent:"center",paddingTop:"14px" }}>
                  <input
                    type="date"
                    name="availabilityForInterview"
                    value={lineUpData.availabilityForInterview}
                    onChange={(e) =>
                      setLineUpData({
                        ...lineUpData,
                        availabilityForInterview: e.target.value,
                      })
                    }
                    className="form-control"
                    style={{ marginRight: "10px" }}
                  />
                  <input
                    type="time"
                    name="interviewTime"
                    value={lineUpData.interviewTime}
                    onChange={(e) =>
                      setLineUpData({
                        ...lineUpData,
                        interviewTime: e.target.value,
                      })
                    }
                    className="form-control"
                  />
                </td>

                <th scope="col">Final Status</th>
                <td>
                  <select
                    type="text"
                    name="finalStatus"
                    value={lineUpData.finalStatus}
                    onChange={(e) =>
                      setLineUpData({
                        ...lineUpData,
                        finalStatus: e.target.value,
                        required
                      })
                    }
                    className="form-select"
                  >
                    <option value="">Select</option>
                    <option value="Interview schedule">Interview schedule</option>
                    <option value="Attending After Some time">Attending After Some time</option>
                    <option value="hold">hold</option>
                  </select>
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

        <div className="buttonDiv">
          {callingTracker.selectYesOrNo !== "Interested" && (
            <button type="submit" className="ctf-btn" id="uploadbtn1">
              Add To Calling
            </button>
          )}
          {callingTracker.selectYesOrNo === "Interested" && (
            <button type="submit" className="ctf-btn" id="uploadbtn2">
              Add To LineUp
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

CallingTrackerForm.propTypes = {
  initialData: PropTypes.object,
  employeeId: PropTypes.string.isRequired,
  onDataAdditionSuccess: PropTypes.func.isRequired,
};

export default CallingTrackerForm;







