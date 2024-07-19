import { useState, useEffect } from "react";
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

const CallingTrackerForm = ({ onsuccessfulDataAdditions, initialData }) => {
  const { employeeId } = useParams();
  const initialCallingTrackerState = {
    date: new Date().toISOString().slice(0, 10),
    candidateAddedTime: "",
    recruiterName: "",
    candidateName: "",
    candidateEmail: "",
    jobDesignation: "",
    requirementId: "",
    requirementCompany: "",
    sourceName: "",
    contactNumber: "",
    incentive: "",
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
    candidateAddedTime: "",
    recruiterName: "",
    candidateName: "",
    candidateEmail: "",
    jobDesignation: "",
    incentive: "",
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
    experienceYear: "",
    experienceMonth: "",
    relevantExperience: "",
    currentCTCLakh: "",
    currentCTCThousand: "",
    expectedCTCLakh: "",
    expectedCTCThousand: "",
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

  const [callingTracker, setCallingTracker] = useState(
    initialCallingTrackerState
  );
  const [lineUpData, setLineUpData] = useState(initialLineUpState);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [resumeUploaded, setResumeUploaded] = useState(false);
  const [successfulDataAdditions, setSuccessfulDataAdditions] = useState(0);
  const [requirementOptions, setRequirementOptions] = useState([]);
  const [candidateAddedTime, setCandidateAddedTime] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [isOtherLocationSelected, setIsOtherLocationSelected] = useState(false);
    const [startTime, setStartTime] = useState(null);


  const [isOtherEducationSelected, setIsOtherEducationSelected] =
    useState(false);
  const [formData, setFormData] = useState();
  const [candidateName, setCandidateName] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [sourceName, setSourceName] = useState("");

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
      const hours = String(now.getHours()).padStart(2, "0");
      const minutes = String(now.getMinutes()).padStart(2, "0");
      const seconds = String(now.getSeconds()).padStart(2, "0");
      const time = `${hours}:${minutes}:${seconds}`;
      setCandidateAddedTime(time);
      setCallingTracker((prevState) => ({
        ...prevState,
        candidateAddedTime: time,
      }));
    };

    updateTimer();
    const timerInterval = setInterval(updateTimer, 1000);
    return () => clearInterval(timerInterval);
  }, []);

  const fetchRecruiterName = async () => {
    try {
      const response = await axios.get(
        `http://192.168.1.46:9090/api/ats/157industries/employeeName/${employeeId}`
      );
      const { data } = response;
      setCallingTracker((prevState) => ({
        ...prevState,
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
        `http://192.168.1.46:9090/api/ats/157industries/company-details`
      );
      const { data } = response;  
      setRequirementOptions(data);
    } catch (error) {
      console.error("Error fetching requirement options:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target || e;
     if (!startTime) {
      setStartTime(Date.now());
      console.log("timmer Start");
    }
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

  const handleSubmit = async (e) => {
    e.preventDefault();
     if (startTime) {
       const endTime = Date.now();
    const timeTaken = (endTime - startTime) / 1000; // Time in seconds
    const minutes = Math.floor(timeTaken / 60);
    const seconds = Math.floor(timeTaken % 60);
    console.log(`Time taken to fill the form: ${minutes} minutes and ${seconds} seconds`);
    }

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

        message = "In Calling & Line Up Data Added";
      } else {
        message = "Only Calling data added";
      }
      const response = await axios.post(
        `http://192.168.1.46:9090/api/ats/157industries/calling-tracker`,
        dataToUpdate
      );
      //Name:-Akash Pawar Component:-CallingTrackerForm Subcategory:-CheckedIfCandidateIsLineUp and successfulDataAdditions Start LineNo:-217 Date:-01/07
      if (response.data.body.lineUp != null) {
        onsuccessfulDataAdditions(true);
      } else {
        onsuccessfulDataAdditions(false);
      }
      //Name:-Akash Pawar Component:-CallingTrackerForm Subcategory:-CheckedIfCandidateIsLineUp and successfulDataAdditions End LineNo:-223 Date:-01/07

      setFormSubmitted(true);
      // handleDataAdditionSuccess();
      setTimeout(() => {
        setFormSubmitted(false);
        setCallingTracker(initialCallingTrackerState);
        setLineUpData(initialLineUpState);
        fetchRecruiterName();
      }, 3000);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleChangeemail = (event) => {
    setEmail(event.target.value);
    setError("");
  };

  const handleSubmitemail = (event) => {
    event.preventDefault();
    if (!email) {
      setError("Email is mandatory");
    } else {
      alert("Form submitted successfully!");
    }
  };

  const handleExperienceChange = (e) => {
    const { name, value } = e.target;
    if (
      name === "totalExperienceYears" &&
      value.length <= 2 &&
      /^\d*$/.test(value)
    ) {
      setLineUpData({ ...lineUpData, [name]: value });
    }
    if (
      name === "totalExperienceMonths" &&
      value.length <= 2 &&
      /^\d*$/.test(value)
    ) {
      setLineUpData({ ...lineUpData, [name]: value });
    }
  };

  const handleLocationChange = (e) => {
    const value = e.target.value;
    if (value === "Other") {
      setIsOtherLocationSelected(true);
      setCallingTracker({ ...callingTracker, currentLocation: "" });
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
    if (value === "Other") {
      setIsOtherEducationSelected(true);
      setCallingTracker({ ...callingTracker, currentEducation: "" });
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
      alert("Date of birth must make the user between 18 and 60 years old.");
      e.target.value = "";
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
        jobDesignation: "",
        requirementCompany: "",
        incentive: "",
      }));
      setLineUpData((prevState) => ({
        ...prevState,
        requirementId: value,
        jobDesignation: "",
        requirementCompany: "",
        incentive: "",
      }));
    }
  };

  return (
    <div className="calling-tracker-main">
      <section className="calling-tracker-submain">
        <form onSubmit={handleSubmit}>
          <div className="calling-tracker-form">
            <div className="calling-tracker-row-gray">
              <div className="calling-tracker-field">
                <label>Date & Time:</label>
                <div className="calling-tracker-two-input-container">
                  <input
                    type="text"
                    //id="currentDate"
                    name="date"
                    value={callingTracker.date}
                    className="calling-tracker-two-input"
                    readOnly
                  />
                  <input
                    type="text"
                    id="candidateAddedTime"
                    name="candidateAddedTime"
                    value={candidateAddedTime}
                    className="calling-tracker-two-input"
                    readOnly
                  />
                </div>
              </div>
              <div className="calling-tracker-field">
                <label>Recruiter </label>
                <div className="calling-tracker-field-sub-div">
                  <input
                    type="text"
                    name="recruiterName"
                    value={callingTracker.recruiterName}
                    readOnly
                    onChange={handleChange}
                    className="plain-input"
                  />
                </div>
              </div>
            </div>
            <div hidden>
              <input
                type="text"
                name="employeeId"
                readOnly
                value={callingTracker.employee.employeeId}
              />
            </div>

            <div className="calling-tracker-row-white">
              <div className="calling-tracker-field">
                <label>Candidate's Full Name</label>
                <div className="calling-tracker-field-sub-div">
                  <input
                    type="text"
                    name="candidateName"
                    value={callingTracker.candidateName}
                    className={`plain-input ${
                      errors.candidateName ? "is-invalid" : ""
                    }`}
                    onChange={handleChange}
                    required={callingTracker.selectYesOrNo !== "Interested"}
                    placeholder="Enter Candidate Name"
                  />
                  {errors.candidateName && (
                    <div className="invalid-feedback">
                      {errors.candidateName}
                    </div>
                  )}
                </div>
              </div>
              <div className="calling-tracker-field">
                <label>Candidate's Email</label>
                <div className="calling-tracker-field-sub-div">
                  <input
                    type="email"
                    name="candidateEmail"
                    value={callingTracker.candidateEmail}
                    onChange={handleChange}
                    className={`plain-input ${error ? "is-invalid" : ""}`}
                    placeholder="Enter Candidate Email"
                    required
                  />
                </div>
              </div>
            </div>

            <div className="calling-tracker-row-gray">
              <div className="calling-tracker-field">
                <label>Contact Number</label>
                <div className="calling-tracker-field-sub-div">
                  <PhoneInput
                    placeholder="Enter phone number"
                    name="contactNumber"
                    className="plain-input"
                    value={callingTracker.contactNumber}
                    onChange={(value) =>
                      handlePhoneNumberChange(value, "contactNumber")
                    }
                    required={callingTracker.selectYesOrNo !== "Interested"}
                    defaultCountry="IN"
                    maxLength={11}
                  />
                  {errors.contactNumber && (
                    <div className="invalid-feedback">
                      {errors.contactNumber}
                    </div>
                  )}
                </div>
              </div>
              <div className="calling-tracker-field">
                <label>Whatsapp Number</label>
                <div className="calling-tracker-field-sub-div">
                  <PhoneInput
                    placeholder="Enter phone number"
                    name="alternateNumber"
                    className="plain-input"
                    value={callingTracker.alternateNumber}
                    onChange={(value) =>
                      handlePhoneNumberChange(value, "alternateNumber")
                    }
                    required={callingTracker.selectYesOrNo !== "Interested"}
                    defaultCountry="IN"
                    maxLength={11}
                  />
                </div>
              </div>
            </div>

            <div className="calling-tracker-row-white">
              <div className="calling-tracker-field">
                <label>Source Name</label>
                <div className="calling-tracker-field-sub-div">
                  <select
                    className={`plain-input ${
                      errors.sourceName ? "is-invalid" : ""
                    }`}
                    name="sourceName"
                    value={callingTracker.sourceName}
                    onChange={handleChange}
                    required={callingTracker.selectYesOrNo !== "Interested"}
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
                </div>
              </div>
              <div className="calling-tracker-field">
                <label>Job Id</label>
                <div className="calling-tracker-two-input-container">
                  <select
                    className="calling-tracker-two-input"
                    id="requirementId"
                    name="requirementId"
                    value={callingTracker.requirementId}
                    onChange={handleRequirementChange}
                    required={callingTracker.selectYesOrNo === "Interested"}
                  >
                    <option value="">Select Job Id</option>
                    {requirementOptions.map((option) => (
                      <option
                        key={option.requirementId}
                        value={option.requirementId}
                      >
                        {option.requirementId}
                      </option>
                    ))}
                  </select>

                  <input
                    placeholder=" Your Incentive"
                    value={callingTracker.incentive}
                    readOnly
                    className="calling-tracker-two-input"
                    type="text"
                  />
                </div>
              </div>
            </div>
            <div className="calling-tracker-row-gray">
              <div className="calling-tracker-field">
                <label>Applying For Position</label>
                <div className="calling-tracker-two-input-container">
                  <input
                    type="text"
                    id="jobDesignation"
                    name="jobDesignation"
                    className="calling-tracker-two-input"
                    value={callingTracker.jobDesignation}
                    placeholder="Enter Position"
                    readOnly
                  />
                  <input
                    type="text"
                    placeholder="Company"
                    id="requirementCompany"
                    name="requirementCompany"
                    className="calling-tracker-two-input"
                    value={callingTracker.requirementCompany}
                    readOnly
                  />
                </div>
              </div>
              <div className="calling-tracker-field">
                <label style={{ color: "gray" }}>Current Location</label>
                <div className="calling-tracker-two-input-container">
                  {!isOtherLocationSelected ? (
                    <select
                      required={callingTracker.selectYesOrNo === "Interested"}
                      name="currentLocation"
                      value={callingTracker.currentLocation}
                      onChange={handleLocationChange}
                      className="calling-tracker-two-input"
                    >
                      <option value="" style={{ color: "gray" }}>
                        Select Location
                      </option>
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
                      className="calling-tracker-two-input"
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
                    className="calling-tracker-two-input"
                  />
                </div>
              </div>
            </div>

            {/* From Here */}

            <div className="calling-tracker-row-white">
              <div className="calling-tracker-field">
                <label>Calling Remark</label>
                <div className="calling-tracker-field-sub-div">
                  <select
                    required={callingTracker.selectYesOrNo === "Interested"}
                    className="plain-input"
                    name="callingFeedback"
                    value={callingTracker.callingFeedback}
                    onChange={handleChange}
                  >
                    <option value="">Feedback</option>
                    <option value="Call Done">Call Done</option>
                    <option value="Asked for Call Back">
                      Asked for Call Back
                    </option>
                    <option value="No Answer">No Answer</option>
                    {/* <option value="Call Disconnected by Candidate">
                      Call Disconnected by Candidate
                    </option> */}
                    <option value="Network Issue">Network Issue</option>
                    <option value="Invalid Number">Invalid Number</option>
                    <option value="Need to call back">Need to call back</option>
                    <option value="Do not call again">Do not call again</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>
              <div className="calling-tracker-field">
                <label>Date Of Birth</label>
                <div className="calling-check-box-main-container">
                  <input
                    type="date"
                    name="dateOfBirth"
                    value={lineUpData.dateOfBirth}
                    onChange={handleDateChange}
                    className="calling-tracker-two-input"
                  />
                  <div className="calling-check-box-container">
                    <div className="calling-check-box">
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
                      Male
                    </div>

                    <div className="calling-check-box">
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
                      Female
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="calling-tracker-row-gray">
              <div className="calling-tracker-field">
                <label>Call Summary</label>
                <div className="calling-tracker-field-sub-div">
                  <input
                    type="text"
                    name="Call Summary"
                    value={callingTracker.extraCertification}
                    onChange={handleChange}
                    className="plain-input"
                    placeholder="Enter Call Summary"
                    required={callingTracker.selectYesOrNo === "Interested"}
                  />
                </div>
              </div>
              <div className="calling-tracker-field">
                <label>Education</label>
                <div className="calling-tracker-two-input-container">
                  {!isOtherEducationSelected ? (
                    <select
                      name="qualification"
                      value={lineUpData.qualification}
                      onChange={handleLineUpChange}
                      className="calling-tracker-two-input"
                      required={callingTracker.selectYesOrNo === "Interested"}
                    >
                      <option value="">Select</option>
                      <option value="Other">Other</option>
                      <option value="10th">10th</option>
                      <option value="12th">12 th</option>
                      <option value="ITI">ITI</option>
                      <option value="diploma in CS">
                        Diploma in Computer science
                      </option>
                      <option value="Degree In CS">
                        BTech in Computer Science
                      </option>
                      <option value="M-Tech In CS">
                        MTech in Computer Science
                      </option>
                      <option value="PhD ">PhD</option>
                      <option value="BSC">BSC in chemestry</option>
                      <option value="MSC">MSC </option>
                      <option value="BCA">BCA</option>
                      <option value="MCA">MCA</option>
                      <option value="Associate of Arts (AA)">
                        Associate of Arts (AA)
                      </option>
                      <option value="Associate of Science (AS)">
                        Associate of Science (AS)
                      </option>
                      <option value="Associate of Applied Science (AAS)">
                        Associate of Applied Science (AAS)
                      </option>
                      <option value="Associate of Fine Arts (AFA)">
                        Associate of Fine Arts (AFA)
                      </option>
                      <option value="Associate of Business Administration (ABA)">
                        Associate of Business Administration (ABA)
                      </option>
                      <option value="Associate of Engineering (AE)">
                        Associate of Engineering (AE)
                      </option>
                      <option value="Associate of Nursing (AN)">
                        Associate of Nursing (AN)
                      </option>
                      <option value="Associate of General Studies (AGS)">
                        Associate of General Studies (AGS)
                      </option>
                      <option value="Associate of Occupational Studies (AOS)">
                        Associate of Occupational Studies (AOS)
                      </option>
                      <option value="Associate of Information Technology (AIT)">
                        Associate of Information Technology (AIT)
                      </option>
                      <option value="Bachelor's Degrees">
                        Bachelor's Degrees
                      </option>
                      <option value="Bachelor of Arts (BA)">
                        Bachelor of Arts (BA)
                      </option>
                      <option value="Bachelor of Science (BS)">
                        Bachelor of Science (BS)
                      </option>
                      <option value="Bachelor of Fine Arts (BFA)">
                        Bachelor of Fine Arts (BFA)
                      </option>
                      <option value="Bachelor of Business Administration (BBA)">
                        Bachelor of Business Administration (BBA)
                      </option>
                      <option value="Bachelor of Engineering (BEng)">
                        Bachelor of Engineering (BEng)
                      </option>
                      <option value="Bachelor of Technology (BTech)">
                        Bachelor of Technology (BTech)
                      </option>
                      <option value="Bachelor of Education (BEd)">
                        Bachelor of Education (BEd)
                      </option>
                      <option value="Bachelor of Nursing (BN)">
                        Bachelor of Nursing (BN)
                      </option>
                      <option value="Bachelor of Social Work (BSW)">
                        Bachelor of Social Work (BSW)
                      </option>
                      <option value="Bachelor of Music (BM)">
                        Bachelor of Music (BM)
                      </option>
                      <option value="Bachelor of Architecture (BArch)">
                        Bachelor of Architecture (BArch)
                      </option>
                      <option value="Bachelor of Science in Nursing (BSN)">
                        Bachelor of Science in Nursing (BSN)
                      </option>
                      <option value="Bachelor of Computer Science (BCS)">
                        Bachelor of Computer Science (BCS)
                      </option>
                      <option value="Bachelor of Laws (LLB)">
                        Bachelor of Laws (LLB)
                      </option>
                      <option value="Bachelor of Medicine, Bachelor of Surgery (MBBS)">
                        Bachelor of Medicine, Bachelor of Surgery (MBBS)
                      </option>
                      <option value="Bachelor of Dental Surgery (BDS)">
                        Bachelor of Dental Surgery (BDS)
                      </option>
                      <option value="Bachelor of Pharmacy (BPharm)">
                        Bachelor of Pharmacy (BPharm)
                      </option>
                      <option value="Bachelor of Public Health (BPH)">
                        Bachelor of Public Health (BPH)
                      </option>
                      <option value="Bachelor of Environmental Science (BES)">
                        Bachelor of Environmental Science (BES)
                      </option>
                      <option value="Bachelor of Communication (BComm)">
                        Bachelor of Communication (BComm)
                      </option>
                      <option value="Bachelor of Information Technology (BIT)">
                        Bachelor of Information Technology (BIT)
                      </option>
                      <option value="Bachelor of Science in Engineering (BSE)">
                        Bachelor of Science in Engineering (BSE)
                      </option>
                      <option value="Bachelor of Business (BBus)">
                        Bachelor of Business (BBus)
                      </option>
                      <option value="Bachelor of Design (BDes)">
                        Bachelor of Design (BDes)
                      </option>
                      <option value="Bachelor of Journalism (BJ)">
                        Bachelor of Journalism (BJ)
                      </option>
                      <option value="Bachelor of Applied Science (BAS)">
                        Bachelor of Applied Science (BAS)
                      </option>
                      <option value="Bachelor of Agriculture (BAgri)">
                        Bachelor of Agriculture (BAgri)
                      </option>
                      <option value="Bachelor of Veterinary Science (BVSc)">
                        Bachelor of Veterinary Science (BVSc)
                      </option>
                      <option value="Bachelor of Physiotherapy (BPT)">
                        Bachelor of Physiotherapy (BPT)
                      </option>
                      <option value="Master's Degrees">Master's Degrees</option>
                      <option value="Master of Arts (MA)">
                        Master of Arts (MA)
                      </option>
                      <option value="Master of Science (MS or MSc)">
                        Master of Science (MS or MSc)
                      </option>
                      <option value="Master of Business Administration (MBA)">
                        Master of Business Administration (MBA)
                      </option>
                      <option value="Master of Fine Arts (MFA)">
                        Master of Fine Arts (MFA)
                      </option>
                      <option value="Master of Education (MEd)">
                        Master of Education (MEd)
                      </option>
                      <option value="Master of Engineering (MEng)">
                        Master of Engineering (MEng)
                      </option>
                      <option value="Master of Technology (MTech)">
                        Master of Technology (MTech)
                      </option>
                      <option value="Master of Social Work (MSW)">
                        Master of Social Work (MSW)
                      </option>
                      <option value="Master of Music (MM)">
                        Master of Music (MM)
                      </option>
                      <option value="Master of Architecture (MArch)">
                        Master of Architecture (MArch)
                      </option>
                      <option value="Master of Public Health (MPH)">
                        Master of Public Health (MPH)
                      </option>
                      <option value="Master of Laws (LLM)">
                        Master of Laws (LLM)
                      </option>
                      <option value="Master of Computer Applications (MCA)">
                        Master of Computer Applications (MCA)
                      </option>
                      <option value="Master of Science in Nursing (MSN)">
                        Master of Science in Nursing (MSN)
                      </option>
                      <option value="Master of Library Science (MLS)">
                        Master of Library Science (MLS)
                      </option>
                      <option value="Master of Public Administration (MPA)">
                        Master of Public Administration (MPA)
                      </option>
                      <option value="Master of Philosophy (MPhil)">
                        Master of Philosophy (MPhil)
                      </option>
                      <option value="Master of Professional Studies (MPS)">
                        Master of Professional Studies (MPS)
                      </option>
                      <option value="Master of Design (MDes)">
                        Master of Design (MDes)
                      </option>
                      <option value="Master of Journalism (MJ)">
                        Master of Journalism (MJ)
                      </option>
                      <option value="Master of Environmental Science (MES)">
                        Master of Environmental Science (MES)
                      </option>
                      <option value="Master of Communication (MComm)">
                        Master of Communication (MComm)
                      </option>
                      <option value="Master of International Business (MIB)">
                        Master of International Business (MIB)
                      </option>
                      <option value="Master of Finance (MFin)">
                        Master of Finance (MFin)
                      </option>
                      <option value="Master of Management (MMgt)">
                        Master of Management (MMgt)
                      </option>
                      <option value="Master of Science in Engineering (MSE)">
                        Master of Science in Engineering (MSE)
                      </option>
                      <option value="Master of Health Administration (MHA)">
                        Master of Health Administration (MHA)
                      </option>
                      <option value="Master of Urban Planning (MUP)">
                        Master of Urban Planning (MUP)
                      </option>
                      <option value="Master of Data Science (MDS)">
                        Master of Data Science (MDS)
                      </option>
                      <option value="Doctoral Degrees">Doctoral Degrees</option>
                      <option value="Doctor of Philosophy (PhD)">
                        Doctor of Philosophy (PhD)
                      </option>
                      <option value="Doctor of Medicine (MD)">
                        Doctor of Medicine (MD)
                      </option>
                      <option value="Doctor of Education (EdD)">
                        Doctor of Education (EdD)
                      </option>
                      <option value="Doctor of Business Administration (DBA)">
                        Doctor of Business Administration (DBA)
                      </option>
                      <option value="Doctor of Dental Surgery (DDS)">
                        Doctor of Dental Surgery (DDS)
                      </option>
                      <option value="Doctor of Dental Medicine (DMD)">
                        Doctor of Dental Medicine (DMD)
                      </option>
                      <option value="Doctor of Veterinary Medicine (DVM)">
                        Doctor of Veterinary Medicine (DVM)
                      </option>
                      <option value="Doctor of Nursing Practice (DNP)">
                        Doctor of Nursing Practice (DNP)
                      </option>
                      <option value="Doctor of Psychology (PsyD)">
                        Doctor of Psychology (PsyD)
                      </option>
                      <option value="Juris Doctor (JD)">
                        Juris Doctor (JD)
                      </option>
                      <option value="Doctor of Public Health (DrPH)">
                        Doctor of Public Health (DrPH)
                      </option>
                      <option value="Doctor of Pharmacy (PharmD)">
                        Doctor of Pharmacy (PharmD)
                      </option>
                      <option value="Doctor of Physical Therapy (DPT)">
                        Doctor of Physical Therapy (DPT)
                      </option>
                      <option value="Doctor of Engineering (DEng or DScEng)">
                        Doctor of Engineering (DEng or DScEng)
                      </option>
                      <option value="Doctor of Science (DSc)">
                        Doctor of Science (DSc)
                      </option>
                      <option value="Doctor of Musical Arts (DMA)">
                        Doctor of Musical Arts (DMA)
                      </option>
                      <option value="Doctor of Social Work (DSW)">
                        Doctor of Social Work (DSW)
                      </option>
                      <option value="Doctor of Information Technology (DIT)">
                        Doctor of Information Technology (DIT)
                      </option>
                      <option value="Doctor of Health Science (DHSc)">
                        Doctor of Health Science (DHSc)
                      </option>
                      <option value="Doctor of Public Administration (DPA)">
                        Doctor of Public Administration (DPA)
                      </option>
                      <option value="Diplomas and Certificates">
                        Diplomas and Certificates
                      </option>
                      <option value="Diploma in Engineering">
                        Diploma in Engineering
                      </option>
                      <option value="Diploma in Nursing">
                        Diploma in Nursing
                      </option>
                      <option value="Diploma in Education">
                        Diploma in Education
                      </option>
                      <option value="Diploma in Business Studies">
                        Diploma in Business Studies
                      </option>
                      <option value="Diploma in Computer Applications">
                        Diploma in Computer Applications
                      </option>
                      <option value="Diploma in Culinary Arts">
                        Diploma in Culinary Arts
                      </option>
                      <option value="Diploma in Graphic Design">
                        Diploma in Graphic Design
                      </option>
                      <option value="Diploma in Information Technology">
                        Diploma in Information Technology
                      </option>
                      <option value="Diploma in Pharmacy">
                        Diploma in Pharmacy
                      </option>
                      <option value="Diploma in Accounting">
                        Diploma in Accounting
                      </option>
                      <option value="Diploma in Marketing">
                        Diploma in Marketing
                      </option>
                      <option value="Diploma in Hospitality Management">
                        Diploma in Hospitality Management
                      </option>
                      <option value="Diploma in Fashion Design">
                        Diploma in Fashion Design
                      </option>
                      <option value="Diploma in Project Management">
                        Diploma in Project Management
                      </option>
                      <option value="Diploma in Electrical Engineering">
                        Diploma in Electrical Engineering
                      </option>
                      <option value="Diploma in Mechanical Engineering">
                        Diploma in Mechanical Engineering
                      </option>
                      <option value="Diploma in Civil Engineering">
                        Diploma in Civil Engineering
                      </option>
                      <option value="Diploma in Health Sciences">
                        Diploma in Health Sciences
                      </option>
                      <option value="Diploma in Environmental Science">
                        Diploma in Environmental Science
                      </option>
                      <option value="Diploma in Journalism">
                        Diploma in Journalism
                      </option>
                      <option value="Diploma in Social Work">
                        Diploma in Social Work
                      </option>
                      <option value="Diploma in Early Childhood Education">
                        Diploma in Early Childhood Education
                      </option>
                      <option value="Diploma in Interior Design">
                        Diploma in Interior Design
                      </option>
                      <option value="Diploma in Event Management">
                        Diploma in Event Management
                      </option>
                      <option value="Diploma in Human Resource Management">
                        Diploma in Human Resource Management
                      </option>
                      <option value="Diploma in Digital Marketing">
                        Diploma in Digital Marketing
                      </option>
                      <option value="Diploma in Financial Management">
                        Diploma in Financial Management
                      </option>
                      <option value="Diploma in Logistics and Supply Chain Management">
                        Diploma in Logistics and Supply Chain Management
                      </option>
                      <option value="Diploma in Biotechnology">
                        Diploma in Biotechnology
                      </option>
                      <option value="Diploma in Tourism Management">
                        Diploma in Tourism Management
                      </option>
                      <option value="Diploma in Public Relations">
                        Diploma in Public Relations
                      </option>
                      <option value="Diploma in Web Development">
                        Diploma in Web Development
                      </option>
                      <option value="Diploma in Film and Television Production">
                        Diploma in Film and Television Production
                      </option>
                      <option value="Diploma in Software Engineering">
                        Diploma in Software Engineering
                      </option>
                      <option value="Diploma in Agriculture">
                        Diploma in Agriculture
                      </option>
                      <option value="Diploma in Cybersecurity">
                        Diploma in Cybersecurity
                      </option>
                      <option value="Diploma in Data Science">
                        Diploma in Data Science
                      </option>
                      <option value="Diploma in Artificial Intelligence">
                        Diploma in Artificial Intelligence
                      </option>
                    </select>
                  ) : (
                    <input
                      type="text"
                      name="education"
                      value={lineUpData.qualification}
                      onChange={handleeducationInputChange}
                      className="calling-tracker-two-input"
                      placeholder="Enter your Education"
                    />
                  )}
                  <input
                    type="text"
                    name="yearOfPassing"
                    placeholder="YOP"
                    value={lineUpData.yearOfPassing}
                    required={callingTracker.selectYesOrNo === "Interested"}
                    onChange={(e) => {
                      const value = e.target.value;
                      if (/^\d{0,4}$/.test(value)) {
                        if (value === "" || parseInt(value) <= 2025) {
                          setLineUpData({
                            ...lineUpData,
                            yearOfPassing: value,
                          });
                        } else {
                          alert("Cannot enter year above 2025");
                        }
                      }
                    }}
                    className="calling-tracker-two-input"
                  />
                </div>
              </div>
            </div>
            <div className="calling-tracker-row-white">
              <div className="calling-tracker-field">
                <label>
                  Upload Resume
                  {resumeUploaded && (
                    <FaCheckCircle className="upload-success-icon" />
                  )}
                </label>
                <div className="calling-tracker-field-sub-div">
                  <input
                    type="file"
                    onChange={handleResumeFileChange}
                    accept=".pdf,.doc,.docx"
                    className="plain-input"
                  />
                </div>
              </div>
              <div className="calling-tracker-field">
                <label>Any Extra Certification</label>
                <div className="calling-tracker-field-sub-div">
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
                    className="plain-input"
                    placeholder="Enter Extra Certification"
                  />
                </div>
              </div>
            </div>
            <div className=" calling-tracker-row-gray">
              <div className="calling-tracker-field">
                <label>Current Company</label>
                <div className="calling-tracker-field-sub-div">
                  <input
                    type="text"
                    name="currentcompany"
                    placeholder="Current Company"
                    value={lineUpData.currentcompany}
                    onChange={(e) =>
                      setLineUpData({
                        ...lineUpData,
                        currentcompany: e.target.value,
                      })
                    }
                    className="plain-input"
                    required={callingTracker.selectYesOrNo === "Interested"}
                  />
                </div>
              </div>
              <div className="calling-tracker-field">
                <label>Total Experience</label>

                <div
                  className="calling-tracker-two-input-container"
                  required={callingTracker.selectYesOrNo === "Interested"}
                >
                  <input
                    type="text"
                    name="experienceYear"
                    value={lineUpData.experienceYear}
                    onChange={handleLineUpChange}
                    className="calling-tracker-two-input"
                    placeholder="Years"
                    maxLength="2"
                  />
                  <input
                    type="number"
                    name="experienceMonth"
                    value={lineUpData.experienceMonth}
                    onChange={handleLineUpChange}
                    className="calling-tracker-two-input"
                    placeholder="Months"
                    maxLength="2"
                    min="1"
                    max="12"
                  />
                </div>
              </div>
            </div>

            <div className="calling-tracker-row-white">
              <div className="calling-tracker-field">
                <label>Relevant Experience</label>
                <div className="calling-tracker-two-input-container">
                  <input
                    type="text"
                    name="relevantExperience"
                    value={lineUpData.relevantExperience}
                    onChange={handleLineUpChange}
                    className="calling-tracker-two-input"
                    placeholder="Enter Relevant Experience"
                    required={callingTracker.selectYesOrNo === "Interested"}
                  />
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
                    className="calling-tracker-two-input"
                    min="0"
                    max="90"
                  />
                </div>
              </div>
              <div className="calling-tracker-field">
                <label>Communication Rating </label>
                <div className="calling-tracker-field-sub-div">
                  <input
                    type="text"
                    name="communicationRating"
                    value={callingTracker.communicationRating}
                    onChange={handleChange}
                    className="plain-input"
                    placeholder="Enter Communication Rating"
                    required={callingTracker.selectYesOrNo === "Interested"}
                  />
                </div>
              </div>
            </div>
            <div className="calling-tracker-row-gray">
              <div className="calling-tracker-field">
                <label>Current CTC(LPA)</label>
                <div
                  className="calling-tracker-two-input-container"
                  required={callingTracker.selectYesOrNo === "Interested"}
                >
                  <input
                    type="text"
                    name="currentCTCLakh"
                    value={lineUpData.currentCTCLakh}
                    onChange={handleLineUpChange}
                    className="calling-tracker-two-input"
                    placeholder="Lakh"
                    maxLength="2"
                    pattern="\d*"
                  />

                  <input
                    type="text"
                    name="currentCTCThousand"
                    value={lineUpData.currentCTCThousand}
                    onChange={handleLineUpChange}
                    className="calling-tracker-two-input"
                    placeholder="Thousand"
                    maxLength="2"
                    pattern="\d*"
                    inputMode="numeric"
                  />
                </div>
              </div>
              <div className="calling-tracker-field">
                <label>Expected CTC (LPA)</label>
                <div
                  className="calling-tracker-two-input-container"
                  required={callingTracker.selectYesOrNo === "Interested"}
                >
                  <input
                    type="text"
                    name="expectedCTCLakh"
                    value={lineUpData.expectedCTCLakh}
                    onChange={handleLineUpChange}
                    className="calling-tracker-two-input"
                    placeholder="Lakh"
                    maxLength="2"
                    pattern="\d*"
                  />

                  <input
                    type="text"
                    name="expectedCTCThousand"
                    value={lineUpData.expectedCTCThousand}
                    onChange={handleLineUpChange}
                    className="calling-tracker-two-input"
                    placeholder="Thousand"
                    maxLength="2"
                    pattern="\d*"
                    inputMode="numeric"
                  />
                </div>
              </div>
            </div>

            <div className="calling-tracker-row-white">
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
              <div className="calling-tracker-field">
                <label>Holding Offer Letter</label>
                <div className="calling-tracker-two-input-container">
                  <select
                    type="text"
                    name="holdingAnyOffer"
                    value={lineUpData.holdingAnyOffer}
                    required={callingTracker.selectYesOrNo === "Interested"}
                    //onChange={handleLineUpChange}
                    onChange={(e) =>
                      setLineUpData({
                        ...lineUpData,
                        holdingAnyOffer: e.target.value,
                      })
                    }
                    className="calling-tracker-two-input"
                  >
                    <option value="">Select</option>
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                  </select>
                  <input
                    type="text"
                    name="offerLetterMsg"
                    placeholder="Letter Message"
                    className="calling-tracker-two-input"
                    value={lineUpData.offerLetterMsg}
                    // onChange={handleLineUpChange}
                    onChange={(e) =>
                      setLineUpData({
                        ...lineUpData,
                        offerLetterMsg: e.target.value,
                      })
                    }
                  />
                </div>
              </div>
              <div className="calling-tracker-field">
                <label>Comment For TL</label>
                <div className="calling-tracker-field-sub-div">
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
                    className="plain-input"
                  />
                </div>
              </div>
            </div>

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
            <div className="calling-tracker-row-gray">
              <div className="calling-tracker-field">
                <label>Status Type</label>
                <div className="calling-tracker-two-input-container">
                  <select
                    required
                    className="calling-tracker-two-input"
                    name="selectYesOrNo"
                    placeholder="Candidate Interested"
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
                    className="calling-tracker-two-input"
                    required={callingTracker.selectYesOrNo === "Interested"}
                  >
                    <option value="">Whats Now</option>
                    <option value="Interview schedule">
                      Interview schedule
                    </option>
                    <option value="Attending After Some time">
                      Attending After Some time
                    </option>
                    <option value="hold">hold</option>
                  </select>
                </div>
              </div>
              <div className="calling-tracker-field">
                <label>Interview Slots</label>
                <div className="calling-tracker-two-input-container">
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
                    className="calling-tracker-two-input"
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
                    className="calling-tracker-two-input"
                  />
                </div>
              </div>
            </div>
          </div>

          {formSubmitted && (
            <div className="alert alert-success" role="alert">
              Data Added successfully!
            </div>
          )}
          <center>
            <div className="buttonDiv">
              {callingTracker.selectYesOrNo !== "Interested" && (
                <button type="submit" className="ctf-btn">
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
      </section>
    </div>
  );
};

CallingTrackerForm.propTypes = {
  initialData: PropTypes.object,
  handleDataAdditionSuccess: PropTypes.func.isRequired,
  updateCount: PropTypes.func.isRequired,
  candidateData: PropTypes.object,
  onClose: PropTypes.func.isRequired,
  onSuccess: PropTypes.func.isRequired,
};

CallingTrackerForm.defaultProps = {
  initialData: null,
};

export default CallingTrackerForm;
