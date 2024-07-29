// Akash_Pawar_CallingTracker_Validation_&_Distance_&_Salary_Calculation_23/07
import { useState, useEffect } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import { Form, useParams } from "react-router-dom";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import "bootstrap/dist/css/bootstrap.css";
import { FaCheckCircle } from "react-icons/fa";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../EmployeeSection/CallingTrackerForm.css";
import { toast } from "react-toastify";
import { Button, Modal } from "react-bootstrap";

const CallingTrackerForm = ({
  onsuccessfulDataAdditions,
  initialData,
  loginEmployeeName,
}) => {
  const { employeeId } = useParams();
  const { userType } = useParams();
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
    resume: null,
  };

  const [callingTracker, setCallingTracker] = useState(
    initialCallingTrackerState
  );
  const [lineUpData, setLineUpData] = useState(initialLineUpState);
  const [resumeUploaded, setResumeUploaded] = useState(false);
  const [successfulDataAdditions, setSuccessfulDataAdditions] = useState(0);
  const [requirementOptions, setRequirementOptions] = useState([]);
  const [candidateAddedTime, setCandidateAddedTime] = useState("");
  const [isOtherLocationSelected, setIsOtherLocationSelected] = useState(false);
  const [startTime, setStartTime] = useState(null);
  const [isOtherEducationSelected, setIsOtherEducationSelected] =
    useState(false);
  const [errors, setErrors] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [convertedExpectedCTC, setconvertedExpectedCTC] = useState("");
  const [convertedCurrentCTC, setconvertedCurrentCTC] = useState("");
  const [startpoint, setStartPoint] = useState("");
  const [endpoint, setendPoint] = useState("");

  useEffect(() => {
    // fetchRecruiterName();
    fetchRequirementOptions();
  }, [employeeId]);

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
        `http://192.168.1.42:9090/api/ats/157industries/employeeName/${employeeId}/Recruiters`
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
        `http://localhost:9090/api/ats/157industries/company-details`
      );
      const { data } = response;
      setRequirementOptions(data);
    } catch (error) {
      console.error("Error fetching requirement options:", error);
    }
  };

  const validateCallingTracker = () => {
    let errors = {};
    if (!callingTracker.candidateName) {
      errors.candidateName = "Candidate Name is required";
    }
    if (!callingTracker.contactNumber) {
      errors.contactNumber = "Contact Number is required";
    }
    if (!callingTracker.sourceName) {
      errors.sourceName = "Source Name is required";
    }
    if (!callingTracker.candidateEmail) {
      errors.candidateEmail = "Email is required";
    }
    return errors;
  };

  const validateLineUpData = () => {
    let errors = {};

    if (callingTracker.selectYesOrNo === "Interested") {
      if (!lineUpData.requirementId) {
        errors.requirementId = "Requirement ID is required";
      }
      if (!lineUpData.dateOfBirth) {
        errors.dateOfBirth = "Date of Birth is required";
      }
      // if (!lineUpData.resume) {
      //   errors.resume = "Resume is required";
      // }
      if (!lineUpData.experienceYear || !lineUpData.experienceMonth) {
        errors.experienceYear = "Experience is required";
      }
      if (!lineUpData.relevantExperience) {
        errors.relevantExperience = "Relevent Experience is required";
      }
      if (!lineUpData.currentLocation) {
        errors.currentLocation = "Location is required";
      }
      if (!lineUpData.qualification) {
        errors.qualification = "Education is required";
      }
      if (!lineUpData.communicationRating) {
        errors.communicationRating = "Communication Rating is required";
      }
      if (!lineUpData.expectedCTCLakh && !lineUpData.expectedCTCThousand) {
        errors.expectedCTCLakh = "Expected CTC is required";
      }
      if (!lineUpData.currentCTCLakh && !lineUpData.currentCTCThousand) {
        errors.currentCTCLakh = "Current CTC is required";
      }
      if (!lineUpData.holdingAnyOffer) {
        errors.holdingAnyOffer = "Holding Any Offer is required";
      }
    }
    return errors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target || e;
    if (
      (name === "contactNumber" ||
        name === "alternateNumber" ||
        name === "experienceYear" ||
        name === "experienceMonth") &&
      !/^\d*$/.test(value)
    ) {
      return;
    }

    if (
      (name === "candidateName" ||
        name === "sourceName" ||
        name === "currentLocation" ||
        name === "qualification") &&
      !/^[a-zA-Z\s]*$/.test(value)
    ) {
      return;
    }

    setCallingTracker({ ...callingTracker, [name]: value });

    if (!startTime) {
      setStartTime(Date.now());
      console.log("timmer Start");
    }
    if (name === "selectYesOrNo" && value === "No") {
      setLineUpData(initialLineUpState);
    } else if (name === "selectYesOrNo" && value === "Interested") {
      //setShowLineUpForm(true);
    }
    setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
  };

  const handlePhoneNumberChange = (value, name) => {
    const sanitizedValue =
      typeof value === "string" ? value.replace(/\s+/g, "") : value;
    setCallingTracker((prevState) => ({
      ...prevState,
      [name]: sanitizedValue,
    }));
    setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
  };

  const handleLineUpChange = (e) => {
    const { name, value } = e.target;
    if (
      (name === "contactNumber" ||
        name === "alternateNumber" ||
        name === "experienceYear" ||
        name === "experienceMonth" ||
        name === "currentCTCLakh" ||
        name === "currentCTCThousand" ||
        name === "expectedCTCLakh" ||
        name === "expectedCTCThousand") &&
      !/^\d*$/.test(value)
    ) {
      return;
    }

    if (
      (name === "candidateName" ||
        name === "sourceName" ||
        name === "qualification") &&
      !/^[a-zA-Z\s]*$/.test(value)
    ) {
      return;
    }

    setLineUpData({ ...lineUpData, [name]: value });
    setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
    if (name === "currentLocation") {
      console.log(value);
      setStartPoint(value);
    }

    if (name === "dateOfBirth") {
      const today = new Date();
      const birthDate = new Date(value);

      let age = today.getFullYear() - birthDate.getFullYear();
      const monthDiff = today.getMonth() - birthDate.getMonth();
      const dayDiff = today.getDate() - birthDate.getDate();

      if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
        age--;
      }

      if (age < 18 || age > 60) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          dateOfBirth:
            "Date of birth must make the user between 18 and 60 years old.",
        }));
      } else {
        setErrors((prevErrors) => ({ ...prevErrors, dateOfBirth: "" }));
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let callingTrackerErrors = validateCallingTracker();
    let lineUpDataErrors = validateLineUpData();
    if (
      Object.keys(callingTrackerErrors).length > 0 ||
      Object.keys(lineUpDataErrors).length > 0
    ) {
      setErrors({ ...callingTrackerErrors, ...lineUpDataErrors });
      return;
    }

    if (startTime) {
      const endTime = Date.now();
      const timeTaken = (endTime - startTime) / 1000; // Time in seconds
      const minutes = Math.floor(timeTaken / 60);
      const seconds = Math.floor(timeTaken % 60);
      console.log(
        `Time taken to fill the form: ${minutes} minutes and ${seconds} seconds`
      );
    }

    try {
      let dataToUpdate = {
        ...callingTracker,
      };

      if (userType === "Recruiters") {
        dataToUpdate.employee = { employeeId: employeeId };
      } else if (userType === "TeamLeader") {
        dataToUpdate.teamLeader = { teamLeaderId: employeeId };
      }
      if (callingTracker.selectYesOrNo === "Interested") {
        dataToUpdate.lineUp = lineUpData;
      }
      const response = await axios.post(
        `http://192.168.1.42:9090/api/ats/157industries/calling-tracker/${userType}`,
        dataToUpdate
      );
      //Name:-Akash Pawar Component:-CallingTrackerForm Subcategory:-CheckedIfCandidateIsLineUp and successfulDataAdditions Start LineNo:-217 Date:-01/07
      if (response.ok) {
        onsuccessfulDataAdditions(true);
      } else {
        onsuccessfulDataAdditions(false);
      }
      //Name:-Akash Pawar Component:-CallingTrackerForm Subcategory:-CheckedIfCandidateIsLineUp and successfulDataAdditions End LineNo:-223 Date:-01/07
      toast.success("Data Added successfully:");
      setCallingTracker(initialCallingTrackerState);
      setLineUpData(initialLineUpState);
    } catch (error) {
      toast.error(error);
    }
  };

  const handleLocationChange = (e) => {
    const value = e.target.value;
    if (value === "Other") {
      setIsOtherLocationSelected(true);
      setCallingTracker({ ...callingTracker, currentLocation: "" });
      setLineUpData({ ...lineUpData, currentLocation: "" });
    } else {
      setIsOtherLocationSelected(false);
      setCallingTracker({ ...callingTracker, currentLocation: value });
      setLineUpData({ ...lineUpData, currentLocation: value });
    }
    setErrors((prevErrors) => ({ ...prevErrors, currentLocation: "" }));
  };

  const handleEducationChange = (e) => {
    const value = e.target.value;
    if (value === "Other") {
      setIsOtherEducationSelected(true);
      setCallingTracker({ ...callingTracker, qualification: "" });
      setLineUpData({ ...lineUpData, qualification: "" });
    } else {
      setCallingTracker({ ...callingTracker, qualification: value });
      setLineUpData({ ...lineUpData, qualification: value });
    }
  };

  const handleResumeFileChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = (event) => {
        const arrayBuffer = event.target.result;
        const byteArray = new Uint8Array(arrayBuffer);

        setLineUpData((prevState) => ({
          ...prevState,
          resume: byteArray,
        }));
        setResumeUploaded(true);
        // setErrors((prevErrors) => ({ ...prevErrors, resume: "" }));
      };

      reader.readAsArrayBuffer(file);
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
      setendPoint(selectedRequirement.detailAddress);
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
    setErrors((prevErrors) => ({ ...prevErrors, requirementId: "" }));
  };
  const handleShow = () => {
    setShowModal(true);
  };
  const handleClose = () => setShowModal(false);
  useEffect(() => {
    // Update currentCTC when lineUpData changes
    updateCurrentCTC(lineUpData.currentCTCLakh, lineUpData.currentCTCThousand);
    updateExpectedCTC(
      lineUpData.expectedCTCLakh,
      lineUpData.expectedCTCThousand
    );
  }, [lineUpData]);

  const updateCurrentCTC = (lakh, thousand) => {
    // Convert lakh and thousand values to numbers
    const lakhValue = parseFloat(lakh) || 0;
    const thousandValue = parseFloat(thousand) || 0;
    // Combine lakh and thousand to a single CTC value in thousands
    const combinedCTC = lakhValue * 100000 + thousandValue;
    // Format the combined CTC
    setconvertedCurrentCTC(combinedCTC.toFixed(2));
  };

  const updateExpectedCTC = (lakh, thousand) => {
    // Convert lakh and thousand values to numbers
    const lakhValue = parseFloat(lakh) || 0;
    const thousandValue = parseFloat(thousand) || 0;
    // Combine lakh and thousand to a single CTC value in thousands
    const combinedCTC = lakhValue * 100000 + thousandValue;
    // Format the combined CTC
    setconvertedExpectedCTC(combinedCTC.toFixed(2));
  };
  const handleUpdateExpectedCTCLakh = (value) => {
    setLineUpData({ ...lineUpData, expectedCTCLakh: value });
  };

  const handleUpdateExpectedCTCThousand = (value) => {
    setLineUpData({ ...lineUpData, expectedCTCThousand: value });
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
                  <div className="calling-tracker-two-input">
                    <input
                      type="text"
                      //id="currentDate"
                      name="date"
                      value={callingTracker.date}
                      readOnly
                    />
                  </div>
                  <div className="calling-tracker-two-input">
                    <input
                      type="text"
                      id="candidateAddedTime"
                      name="candidateAddedTime"
                      value={candidateAddedTime}
                      readOnly
                    />
                  </div>
                </div>
              </div>
              <div className="calling-tracker-field">
                <label>Recruiter </label>
                <div className="calling-tracker-two-input-container">
                  <div className="calling-tracker-two-input">
                    <input
                      type="text"
                      name="recruiterName"
                      value={loginEmployeeName}
                      readOnly
                      onChange={handleChange}
                      className="plain-input"
                    />
                  </div>
                  <div className="calling-tracker-two-input">
                    <button
                      type="button"
                      onClick={handleShow}
                      className="calling-tracker-popup-open-btn"
                    >
                      View More
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="calling-tracker-row-white">
              <div className="calling-tracker-field">
                <label>Candidate's Full Name</label>
                <div className="calling-tracker-field-sub-div">
                  <input
                    type="text"
                    name="candidateName"
                    value={callingTracker.candidateName}
                    className={`plain-input`}
                    onChange={handleChange}
                    placeholder="Enter Candidate Name"
                  />
                  {errors.candidateName && (
                    <div className="error-message">{errors.candidateName}</div>
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
                    className={`plain-input`}
                    placeholder="Enter Candidate Email"
                  />
                  {errors.candidateEmail && (
                    <div className="error-message">{errors.candidateEmail}</div>
                  )}
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
                    defaultCountry="IN"
                    maxLength={11}
                  />
                  {errors.contactNumber && (
                    <div className="error-message">{errors.contactNumber}</div>
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
                    className={`plain-input`}
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
                    <option value="others">Others</option>
                  </select>
                  {errors.sourceName && (
                    <div className="error-message">{errors.sourceName}</div>
                  )}
                </div>
              </div>
              <div className="calling-tracker-field">
                <label>Job Id</label>
                <div className="calling-tracker-two-input-container">
                  <div className="calling-tracker-two-input">
                    <select
                      id="requirementId"
                      name="requirementId"
                      value={callingTracker.requirementId}
                      onChange={handleRequirementChange}
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
                    {errors.requirementId && (
                      <div className="error-message">
                        {errors.requirementId}
                      </div>
                    )}
                  </div>
                  <div className="calling-tracker-two-input">
                    <input
                      placeholder=" Your Incentive"
                      value={callingTracker.incentive}
                      readOnly
                      type="text"
                    />
                  </div>
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
                  <div className="calling-tracker-two-input">
                    {!isOtherLocationSelected ? (
                      <select
                        name="currentLocation"
                        value={callingTracker.currentLocation}
                        onChange={handleLocationChange}
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
                        value={lineUpData.currentLocation}
                        onChange={handleLineUpChange}
                        placeholder="Enter your location"
                      />
                    )}
                    {errors.currentLocation && (
                      <div className="error-message">
                        {errors.currentLocation}
                      </div>
                    )}
                  </div>
                  <div className="calling-tracker-two-input">
                    <input
                      type="text"
                      name="fullAddress"
                      placeholder="Full Address"
                      value={callingTracker.fullAddress}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* From Here */}

            <div className="calling-tracker-row-white">
              <div className="calling-tracker-field">
                <label>Calling Remark</label>
                <div className="calling-tracker-field-sub-div">
                  <select
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
                  <div className="calling-tracker-two-input">
                    <input
                      type="date"
                      name="dateOfBirth"
                      value={lineUpData.dateOfBirth}
                      onChange={handleLineUpChange}
                    />
                    {errors.dateOfBirth && (
                      <div className="error-message">{errors.dateOfBirth}</div>
                    )}
                  </div>

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
                  />
                </div>
              </div>
              <div className="calling-tracker-field">
                <label>Education</label>
                <div className="calling-tracker-two-input-container">
                  <div className="calling-tracker-two-input">
                    {!isOtherEducationSelected ? (
                      <select
                        name="qualification"
                        value={lineUpData.qualification}
                        onChange={handleEducationChange}
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
                        <option value="Master's Degrees">
                          Master's Degrees
                        </option>
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
                        <option value="Doctoral Degrees">
                          Doctoral Degrees
                        </option>
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
                        name="qualification"
                        value={lineUpData.qualification}
                        onChange={handleLineUpChange}
                        placeholder="Enter your Education"
                      />
                    )}
                    {errors.qualification && (
                      <div className="error-message">
                        {errors.qualification}
                      </div>
                    )}
                  </div>
                  <input
                    type="text"
                    name="yearOfPassing"
                    placeholder="YOP"
                    value={lineUpData.yearOfPassing}
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
                  {errors.resume && (
                    <div className="error-message">{errors.resume}</div>
                  )}
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
                  />
                </div>
              </div>
              <div className="calling-tracker-field">
                <label>Total Experience</label>
                <div className="calling-tracker-two-input-container">
                  <div className="calling-tracker-two-input">
                    <input
                      type="text"
                      name="experienceYear"
                      value={lineUpData.experienceYear}
                      onChange={handleLineUpChange}
                      placeholder="Years"
                      maxLength="2"
                    />
                    {(errors.experienceYear || errors.experienceMonth) && (
                      <div className="error-message error-two-input-box">
                        {errors.experienceYear || errors.experienceMonth}
                      </div>
                    )}
                  </div>
                  <div className="calling-tracker-two-input">
                    <input
                      type="text"
                      name="experienceMonth"
                      value={lineUpData.experienceMonth}
                      onChange={handleLineUpChange}
                      placeholder="Months"
                      maxLength="2"
                      min="1"
                      max="12"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="calling-tracker-row-white">
              <div className="calling-tracker-field">
                <label>Relevant Experience</label>
                <div className="calling-tracker-two-input-container">
                  <div className="calling-tracker-two-input">
                    <input
                      type="text"
                      name="relevantExperience"
                      value={lineUpData.relevantExperience}
                      onChange={handleLineUpChange}
                      placeholder="Enter Relevant Experience"
                    />
                    {errors.relevantExperience && (
                      <div className="error-message">
                        {errors.relevantExperience || errors.relevantExperience}
                      </div>
                    )}
                  </div>
                  <div className="calling-tracker-two-input">
                    <input
                      type="text"
                      name="noticePeriod"
                      placeholder="Notice Period"
                      value={lineUpData.noticePeriod}
                      onChange={handleLineUpChange}

                      min="0"
                      max="90"
                    />
                  </div>
                </div>
              </div>
              <div className="calling-tracker-field">
                <label>Communication Rating </label>
                <div className="calling-tracker-field-sub-div">
                  <input
                    type="text"
                    name="communicationRating"
                    value={callingTracker.communicationRating}
                    onChange={handleLineUpChange}
                    className="plain-input"
                    placeholder="Enter Communication Rating"
                  />
                  {errors.communicationRating && (
                    <div className="error-message error-two-input-box">
                      {errors.communicationRating}
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="calling-tracker-row-gray">
              <div className="calling-tracker-field">
                <label>Current CTC(LPA)</label>
                <div className="calling-tracker-two-input-container">
                  <div className="calling-tracker-two-input">
                    <input
                      type="text"
                      name="currentCTCLakh"
                      value={lineUpData.currentCTCLakh}
                      onChange={handleLineUpChange}
                      placeholder="Lakh"
                      maxLength="2"
                      pattern="\d*"
                    />
                    {errors.currentCTCLakh && (
                      <div className="error-message error-two-input-box">
                        {errors.currentCTCLakh}
                      </div>
                    )}
                  </div>
                  <div className="calling-tracker-two-input">
                    <input
                      type="text"
                      name="currentCTCThousand"
                      value={lineUpData.currentCTCThousand}
                      onChange={handleLineUpChange}
                      placeholder="Thousand"
                      maxLength="2"
                      pattern="\d*"
                      inputMode="numeric"
                    />
                  </div>
                </div>
              </div>
              <div className="calling-tracker-field">
                <label>Expected CTC (LPA)</label>
                <div className="calling-tracker-two-input-container">
                  <div className="calling-tracker-two-input">
                    <input
                      type="text"
                      name="expectedCTCLakh"
                      value={lineUpData.expectedCTCLakh}
                      onChange={handleLineUpChange}
                      placeholder="Lakh"
                      maxLength="2"
                      pattern="\d*"
                    />
                    {errors.expectedCTCLakh && (
                      <div className="error-message error-two-input-box">
                        {errors.expectedCTCLakh}
                      </div>
                    )}
                  </div>
                  <div className="calling-tracker-two-input">
                    <input
                      type="text"
                      name="expectedCTCThousand"
                      value={lineUpData.expectedCTCThousand}
                      onChange={handleLineUpChange}
                      placeholder="Thousand"
                      maxLength="2"
                      pattern="\d*"
                      inputMode="numeric"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="calling-tracker-row-white">

              <div className="calling-tracker-field">
                <label>Holding Offer Letter</label>
                <div className="calling-tracker-two-input-container">
                  <div className="calling-tracker-two-input">
                    <select
                      type="text"
                      name="holdingAnyOffer"
                      value={lineUpData.holdingAnyOffer}
                      onChange={handleLineUpChange}
                    >
                      <option value="">Select</option>
                      <option value="Yes">Yes</option>
                      <option value="No">No</option>
                    </select>
                    {errors.holdingAnyOffer && (
                      <div className="error-message error-two-input-box">
                        {errors.holdingAnyOffer}
                      </div>
                    )}
                  </div>
                  <div className="calling-tracker-two-input">
                    <input
                      type="text"
                      name="offerLetterMsg"
                      placeholder="Letter Message"
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
            <div className="calling-tracker-row-gray">
              <div className="calling-tracker-field">
                <label>Status Type</label>
                <div className="calling-tracker-two-input-container">
                  <div className="calling-tracker-two-input">
                    <select
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
                  </div>
                  <div className="calling-tracker-two-input">
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
                    >
                      <option value="">Whats Now</option>
                      <option value="Interview schedule">
                        Interview schedule
                      </option>
                      <option value="Attending After Some time">
                        Attending After Some time
                      </option>
                      <option value="hold">Hold</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="calling-tracker-field">
                <label>Interview Slots</label>
                <div className="calling-tracker-two-input-container">
                  <div className="calling-tracker-two-input">
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
                    />
                  </div>
                  <div className="calling-tracker-two-input">
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
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
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
      <ModalComponent
        show={showModal}
        handleClose={handleClose}
        startingPoint={startpoint}
        endingPoint={endpoint}
        currentCTCInLakh={lineUpData.currentCTCLakh}
        currentCTCInThousand={lineUpData.currentCTCThousand}
        expectedCTCInLakh={lineUpData.expectedCTCLakh}
        expectedCTCInThousand={lineUpData.expectedCTCThousand}
        convertedCurrentCTC={convertedCurrentCTC}
        convertedExpectedCTC={convertedExpectedCTC}
        onUpdateExpectedCTCLakh={handleUpdateExpectedCTCLakh}
        onUpdateExpectedCTCThousand={handleUpdateExpectedCTCThousand}
      />
    </div>
  );
};

const ModalComponent = ({
  show,
  handleClose,
  startingPoint,
  endingPoint,
  currentCTCInLakh = "",
  currentCTCInThousand = "",
  expectedCTCInLakh = "",
  expectedCTCInThousand = "",
  convertedCurrentCTC,
  convertedExpectedCTC,
  onUpdateExpectedCTCLakh,
  onUpdateExpectedCTCThousand,
}) => {
  const [activeField, setActiveField] = useState("distance");
  const [origin, setOrigin] = useState(startingPoint);
  const [destination, setDestination] = useState(endingPoint);
  const [expectedHike, setExpectedHike] = useState("");
  const [calculatedHike, setCalculatedHike] = useState("");
  const [expectedCTC, setExpectedCTC] = useState("");
  const [expectedCTCLakh, setExpectedCTCLakh] = useState(expectedCTCInLakh);
  const [expectedCTCThousand, setExpectedCTCThousand] = useState(
    expectedCTCInThousand
  );
  const [showHikeInput, setShowHikeInput] = useState(false);

  useEffect(() => {
    setOrigin(startingPoint);
    setDestination(endingPoint);
    setExpectedCTCLakh(expectedCTCInLakh);
    setExpectedCTCThousand(expectedCTCInThousand);
    setExpectedCTC("");
    setShowHikeInput(true); // Reset hike input visibility on prop change
  }, [startingPoint, endingPoint, expectedCTCInLakh, expectedCTCInThousand]);

  const handleExpectedCTCCalculation = () => {
    setShowHikeInput(true);
    if (!expectedHike) {
      return;
    }

    const currentCTCNum = parseFloat(convertedCurrentCTC);
    const expectedHikeNum = parseFloat(expectedHike);
    const expectedCTCNum =
      currentCTCNum + (currentCTCNum * expectedHikeNum) / 100;
    setExpectedCTC(expectedCTCNum.toFixed(2));
    setCalculatedHike("");
  };

  const updateExpectedCTC = (lakh, thousand) => {
    const lakhValue = parseFloat(lakh) || 0;
    const thousandValue = parseFloat(thousand) || 0;
    const combinedCTC = lakhValue * 100000 + thousandValue;
    return combinedCTC.toFixed(2);
  };

  const handleHikeCalculation = () => {
    if (!convertedExpectedCTC) {
      alert("Please enter the expected CTC.");
      return;
    }
    const convertedExpected = updateExpectedCTC(
      expectedCTCLakh,
      expectedCTCThousand
    );
    const currentCTCNum = parseFloat(convertedCurrentCTC);
    const expectedCTCNum = parseFloat(convertedExpected);
    const hikePercentage =
      ((expectedCTCNum - currentCTCNum) / currentCTCNum) * 100;
    setCalculatedHike(hikePercentage.toFixed(2));
    setExpectedHike("");
    setShowHikeInput(false);
  };

  return (
    <Modal size="lg" centered show={show} onHide={handleClose}>
      <Modal.Body className="p-0">
        <div className="calling-tracker-popup">
          <div className="calling-tracker-popup-sidebar">
            <p
              className={`sidebar-item ${activeField === "distance" ? "active" : ""
                }`}
              onClick={() => setActiveField("distance")}
            >
              Distance Calculation
            </p>
            <p
              className={`sidebar-item ${activeField === "salary" ? "active" : ""
                }`}
              onClick={() => setActiveField("salary")}
            >
              Salary Calculation
            </p>
          </div>
          <div className="calling-tracker-popup-dashboard">
            {activeField === "distance" && (
              <div className="distance-calculation">
                <h5>Distance Calculation</h5>
                <div className="form-group">
                  <label htmlFor="origin">Origin</label>
                  <input
                    type="text"
                    id="origin"
                    className="form-control"
                    placeholder="Enter origin"
                    value={origin}
                    onChange={(e) => setOrigin(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="destination">Destination</label>
                  <input
                    type="text"
                    id="destination"
                    className="form-control"
                    placeholder="Enter destination"
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                  />
                </div>
                {origin && destination && (
                  <iframe
                    title="Google Maps"
                    width="100%"
                    height="450"
                    frameBorder="0"
                    style={{ border: 0 }}
                    src={`https://maps.google.com/maps?q=${origin}+to+${destination}&output=embed`}
                    allowFullScreen
                  ></iframe>
                )}
              </div>
            )}
            {activeField === "salary" && (
              <div className="salary-calculation">
                <div className="form-group">
                  <label htmlFor="currentCTCLakh">Current CTC (Lakh)</label>
                  <input
                    type="number"
                    id="currentCTCLakh"
                    className="form-control"
                    placeholder="Enter current CTC in lakh"
                    value={currentCTCInLakh}
                    readOnly
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="currentCTCThousand">
                    Current CTC (Thousand)
                  </label>
                  <input
                    type="number"
                    id="currentCTCThousand"
                    className="form-control"
                    placeholder="Enter current CTC in thousand"
                    value={currentCTCInThousand}
                    readOnly
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="expectedCTCLakh">Expected CTC (Lakh)</label>
                  <input
                    type="number"
                    id="expectedCTCLakh"
                    className="form-control"
                    placeholder="Enter expected CTC in lakh"
                    value={expectedCTCLakh}
                    onChange={(e) => {
                      const value = e.target.value;
                      setExpectedCTCLakh(value);
                      onUpdateExpectedCTCLakh(value); // Send to parent
                    }}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="expectedCTCThousand">
                    Expected CTC (Thousand)
                  </label>
                  <input
                    type="number"
                    id="expectedCTCThousand"
                    className="form-control"
                    placeholder="Enter expected CTC in thousand"
                    value={expectedCTCThousand}
                    onChange={(e) => {
                      const value = e.target.value;
                      setExpectedCTCThousand(value);
                      onUpdateExpectedCTCThousand(value); // Send to parent
                    }}
                  />
                </div>
                {showHikeInput && (
                  <div className="form-group">
                    <label htmlFor="expectedHike">Expected Hike (%)</label>
                    <input
                      type="number"
                      id="expectedHike"
                      className="form-control"
                      placeholder="Enter expected hike percentage"
                      value={expectedHike}
                      onChange={(e) => setExpectedHike(e.target.value)}
                    />
                  </div>
                )}
                <div className="callingTracker-calculations">
                  <button
                    className="calling-tracker-popup-calExeCtc"
                    onClick={handleExpectedCTCCalculation}
                  >
                    Calculate Expected CTC
                  </button>
                  <p>
                    Expected CTC:{" "}
                    <input
                      type="text"
                      className="border-1 rounded-lg"
                      readOnly
                      value={expectedCTC}
                    />
                  </p>
                </div>
                <div className="callingTracker-calculations">
                  <button
                    className="calling-tracker-popup-calHike"
                    onClick={handleHikeCalculation}
                  >
                    Calculate Hike Percentage
                  </button>
                  <p>
                    Calculated Hike:{" "}
                    <input
                      type="text"
                      className="border-1 rounded-lg"
                      readOnly
                      value={calculatedHike}
                    />
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <button
          className="callingTracker-popup-close-btn"
          onClick={handleClose}
        >
          Close
        </button>
      </Modal.Footer>
    </Modal>
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
