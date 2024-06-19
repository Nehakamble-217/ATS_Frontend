import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import "../EmployeeSection/AddCandidate.css";

const UpdateCallingTracker = ({ candidateId, employeeId, onSuccess, onCancel }) => {
  const [callingTracker, setCallingTracker] = useState({
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
    alternateNumber: "",
    incentive: "",
    currentLocation: "",
    fullAddress: "",
    communicationRating: "",
    selectYesOrNo: "",
    callingFeedback: "",
    lineUp: {
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
    },
  });

  const [showAlert, setShowAlert] = useState(false);
  const [requirementOptions, setRequirementOptions] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [employeeResponse, candidateResponse, requirementResponse] = await Promise.all([
          axios.get(`http://192.168.1.33:8891/api/ats/157industries/employeeName/6`),
          axios.get(`http://192.168.1.33:8891/api/ats/157industries/specific-data/28`),
          axios.get(`http://192.168.1.33:8891/api/ats/157industries/company-details`)
        ]);
        setCallingTracker({
          ...candidateResponse.data,
          recruiterName: employeeResponse.data
        });
        setRequirementOptions(requirementResponse.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [employeeId, candidateId]);


  const handlePhoneNumberChange = (value, name) => {
    setCallingTracker((prevState) => ({
      ...prevState,
      [name]: value || "",
    }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.includes("lineUp")) {
      setCallingTracker((prevState) => ({
        ...prevState,
        lineUp: { ...prevState.lineUp, [name.split(".")[1]]: value },
      }));
    } else {
      setCallingTracker((prevState) => ({ ...prevState, [name]: value }));
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
    } else {
      setCallingTracker((prevState) => ({
        ...prevState,
        requirementId: value,
        jobDesignation: "",
        requirementCompany: "",
        incentive: "",
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const dataToUpdate = {
        ...callingTracker,
        recruiterName: callingTracker.recruiterName,
      };


      const response = await axios.post(
        `http://192.168.1.38:8891/api/ats/157industries/update-callingData/28`,
        dataToUpdate
      );

      if (response.status === 200) {
        setShowAlert(true);
        setTimeout(() => {
          setShowAlert(false);
          onSuccess();
        }, 1000);
      } else {
        console.error("Failed to update data");
      }
    } catch (error) {
      console.error("Error updating data:", error);
    }
  };


  return (
    <div>
      <div className="update-page-head">
        <h5>Update Page </h5>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="maintable">
          <table id="studTables" className="table  table-striped  text-center">
            <tbody className="table-group-divider">

              <tr id="table-row">
                <th scope="col">Data & Time</th>
                <td>
                  <input
                    type="text"
                    id="date"
                    name="date"
                    value={callingTracker.date}
                    className="form-control"
                    style={{ marginRight: "20px", width: "180px" }}
                    readOnly
                  />
                  <input
                    type="text"
                    id="candidateAddedTime"
                    name="candidateAddedTime"
                    value={callingTracker.candidateAddedTime}
                    className="form-control"
                    style={{ marginBottom: "9px", width: "180px", marginRight: "30px", paddingLeft: "10px" }}
                    readOnly
                  />
                </td>

                <th>Recruiters Name</th>
                <td>
                  <input
                    type="text"
                    name="recruiterName"
                    value={callingTracker.recruiterName}
                    readOnly
                   
                    className="form-control"
                  />
                </td>
              </tr>

              <div hidden>

                <input type="text" name="employeeId" readOnly value={employeeId} />

              </div>
              <tr id="heading123">

                <th> Candidates Full Name*</th>
                <td>
                  <input
                    type="text"
                    name="candidateName"
                    value={callingTracker.candidateName}
                    onChange={handleChange}
                    className="form-control"
                  />
                </td>

                <th scope="col">Candidate Email</th>
                <td>
                  <input
                    type="email"
                    name="candidateEmail"
                    value={callingTracker.candidateEmail}
                    onChange={handleChange}
                    className="form-control"
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
                    required
                    defaultCountry="IN"
                    maxLength={12}

                  />
                </td>
                <th scope="col">Alternate Number</th>
                <td>
                  <PhoneInput
                    placeholder="Enter phone number"
                    name="alternateNumber"
                    value={callingTracker.alternateNumber}
                    onChange={(value) =>
                      handlePhoneNumberChange(value, "alternateNumber")
                    }
                    defaultCountry="IN"
                    maxLength={11}
                    className="PhoneInputInput"

                  />
                </td>
              </tr>

              <tr>
                <th scope="col">Source Name*</th>
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

                <th scope="col">Job Id</th>
                <td>
                  <select
                    id="requirementId"
                    name="requirementId"
                    value={callingTracker.requirementId}
                    onChange={handleRequirementChange}
                    className="form-control"
                    style={{ height: "38px" }}
                  >
                     <option value="">Select Requirement</option>
                    {requirementOptions.map((requirement) => (
                      <option key={requirement.requirementId} value={requirement.requirementId}>
                        {requirement.requirementId}
                      </option>
                    ))}
                
                  </select>
                </td>
              </tr>

              <tr>
               
                <th scope="col">Applying For Position</th>
                <td style={{ display: "flex", justifyContent: "space-around" }}>
                  <input style={{ width: "260px" }}
                    type="text"
                    id="jobDesignation"
                    name="jobDesignation"
                    value={callingTracker.jobDesignation}
                    onChange={handleChange}
                    readOnly
                  />
                  <input placeholder="Incentive"  name="incentive" value={callingTracker.incentive} readOnly className="form-control" style={{ width: "150px" }} type="text" />
                </td>


                <th scope="col">Applying Company Name</th>
                <td>
                  <input
                    type="text"
                    id="requirementCompany"
                    name="requirementCompany"
                    className="form-control"
                    value={callingTracker.requirementCompany}
                    onChange={handleChange}
                  />
                </td>
              </tr>
              <tr>
                <th>Current Location</th>
                <td>
                  
                    <select
                      name="currentLocation"
                      value={callingTracker.currentLocation}
                      onChange={handleChange}
                      className="form-control">
                      <option value="">Select Location</option>
                      <option value="Pune City">Pune City</option>
                      <option value="PCMC">PCMC</option>
                      <option value="Other">Other</option>
                    </select>

                </td>
                <th> Full Adress</th>
                <td>
                  <input
                    type="text"
                    name="fullAddress"
                    value={callingTracker.fullAddress}
                    onChange={handleChange}
                    className="form-control" />
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
                    name="lineUp.dateOfBirth"
                    value={callingTracker.lineUp.dateOfBirth}
                    onChange={handleChange}
                    className="form-control"
                  />
                </td>

                <th scope="col">Gender</th>
                <td>
                  <div
                    className="main-gender"
                    style={{ display: "flex", alignItems: "center" }}
                  >
                    <input
                      style={{ paddingTop: "8px" }}
                      type="checkbox"
                      name="lineUp.gender"
                      value="male"
                      className="gender"
                      checked={callingTracker.lineUp.gender === "male"}
                      onChange={handleChange}
                    />
                    <label className="px-2">Male</label>

                    <input
                      type="checkbox"
                      name="lineUp.gender"
                      value="female"
                      className="gender"
                      checked={callingTracker.lineUp.gender === "female"}
                      onChange={handleChange}
                    />
                    <label className="px-2">Female</label>
                  </div>
                </td>
              </tr>

              <tr>
                <th>Education</th>
                <td>
                    <select
                      name="lineUp.qualification"
                      value={callingTracker.lineUp.qualification}
                      onChange={handleChange}
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
                      <option value="Bachelor's Degrees">Bachelor s Degrees</option>
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
                      <option value="Master's Degrees">Master s Degrees</option>
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
                 
                </td>

                <th scope="col">Year Of Passing</th>
                <td>
                  <input
                    type="text"
                    name="lineUp.yearOfPassing"
                    value={callingTracker.lineUp.yearOfPassing}
                    className="form-control"
                  />
                </td>
              </tr>

              <tr>
                <th scope="col">
                  Upload Resume
                  {/* {resumeUploaded && (
                    <FaCheckCircle className="upload-success-icon" />
                  )} */}
                </th>
                <td>
                  <input
                    type="file"
                    // onChange={handleResumeFileChange}
                    accept=".pdf,.doc,.docx"
                    className="form-control pt-1"
                  />
                </td>

                <th>Any Extra Certification</th>
                <td>
                  <input
                    type="text"
                    name="lineUp.extraCertification"
                    value={callingTracker.lineUp.extraCertification}
                    onChange={handleChange}
                    className="form-control"
                  />
                </td>
              </tr>

              <tr>
                <th scope="col">Current Company</th>
                <td>
                  <input
                    type="text"
                    name="lineUp.companyName"
                    value={callingTracker.lineUp.companyName}
                    onChange={handleChange}
                    className="form-control"
                  />
                </td>

                <th scope="col">Experince</th>
                <td style={{ paddingLeft: '5px' }}>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <div style={{ display: 'flex', alignItems: 'center', marginRight: '5px', padding: '5px' }}>
                      <label htmlFor="experienceYear" style={{ marginRight: '5px', width: '50px' }}>Years:</label>
                      <input
                        type="text"
                        name="lineUp.experienceYear"
                        value={callingTracker.lineUp.experienceYear}

                        onChange={handleChange}
                        className="form-control"
                        placeholder=""
                        maxLength="2"
                        style={{ width: '50px', border: "1px solid gray" }}
                      />
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', padding: '5px' }}>
                      <label htmlFor="experienceMonths" style={{ marginRight: '23px', width: '50px' }}>Months:</label>
                      <input
                        type="number"
                        name="lineUp.experienceMonth"
                        value={callingTracker.lineUp.experienceMonth}
                        onChange={handleChange}
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
                    name="lineUp.relevantExperience"
                    value={callingTracker.lineUp?.relevantExperience}
                    onChange={handleChange}
                    className="form-control"
                  />
                </td>
                <th scope="col">Communication Rating</th>
                <td>
                  <input
                    type="text"
                    name="lineUp.communicationRating"
                    value={callingTracker.lineUp.communicationRating}
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
                      <label htmlFor="currentCTCLakh" style={{ marginRight: '5px', width: '50px' }}>Lakh:</label>
                      <input
                        type="text"
                        name="lineUp.currentCTCLakh"
                        value={callingTracker.lineUp.currentCTCLakh}
                        onChange={handleChange}
                        className="form-control"
                        placeholder=""
                        maxLength="2"
                        style={{ width: '60px', border: "1px solid gray" }}
                        pattern="\d*"
                      />
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', padding: '5px' }}>
                      <label htmlFor="currentCTCThousand" style={{ marginRight: '40px', width: '50px' }}>Thousand:</label>
                      <input
                        type="text"
                        name="lineUp.currentCTCThousand"
                        value={callingTracker.lineUp.currentCTCThousand}
                        onChange={handleChange}
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
                      <label htmlFor="expectedCTCLakh" style={{ marginRight: '5px', width: '50px' }}>Lakh:</label>
                      <input
                        type="text"

                        name="lineUp.expectedCTCLakh"
                        value={callingTracker.lineUp.expectedCTCLakh}
                        onChange={handleChange}
                        className="form-control"
                        placeholder=""
                        maxLength="2"
                        style={{ width: '60px', border: "1px solid gray" }}
                        pattern="\d*"
                      />
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', padding: '5px' }}>
                      <label htmlFor="expectedCTCThousand" style={{ marginRight: '40px', width: '50px' }}>Thousand:</label>
                      <input
                        type="text"
                        name="lineUp.expectedCTCThousand"
                        value={callingTracker.lineUp.expectedCTCThousand}
                        onChange={handleChange}
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
                    type="text"
                    name="lineUp.noticePeriod"
                    value={callingTracker.lineUp.noticePeriod}
                    onChange={handleChange}
                    className="form-control"
                  />
                </td>


                <th scope="col">Holding Offer Letter</th>
                <td>
                  <select type="text"
                    name="lineUp.holdingAnyOffer"
                    value={callingTracker.lineUp.holdingAnyOffer}
                    onChange={handleChange} className="form-select"
                    style={{ width: '150px', display: 'inline-block', marginRight: '10px' }}>
                    <option value="">Select</option>
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                  </select>
                  <input type="text"
                    name="lineUp.holdingAnyOffer"
                    value={callingTracker.lineUp.holdingAnyOffer}
                    onChange={handleChange}
                    style={{ width: '150px', height: "35px", display: 'inline-block', border: '1px solid #ccc', padding: '5px' }} />
                </td>

              </tr>

              <tr>
                <th scope="col">Recruiters Feedback</th>
                <td>
                  <input
                    type="text"
                    name="lineUp.feedBack"
                    value={callingTracker.lineUp.feedBack}
                    onChange={handleChange}
                    className="form-control"
                  />
                </td>

                <th scope="col">Comment For Eevaluter/TL</th>
                <td>
                  <input
                    type="text"
                    name="lineUp.msgForTeamLeader"
                    value={callingTracker.lineUp.msgForTeamLeader}
                    onChange={handleChange}
                    className="form-control"
                  />
                </td>
              </tr>
              <tr>
                <th scope="col">Availability Of a Interview</th>
                <td
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    paddingTop: "14px",
                  }}
                >
                  <input
                    type="date"
                    name="lineUp.availabilityForInterview"
                    value={callingTracker.lineUp.availabilityForInterview}
                    onChange={handleChange}
                    className="form-control"
                    style={{ marginRight: "10px" }}
                  />
                  <input
                    type="time"
                    name="lineUp.interviewTime"
                    value={callingTracker.lineUp.interviewTime}
                    onChange={handleChange}
                    className="form-control"
                  />
                </td>

                <th scope="col">Final Status</th>
                <td>
                  <select
                    type="text"
                    name="lineUp.finalStatus"
                    value={callingTracker.lineUp.finalStatus}
                    onChange={handleChange}
                    className="form-select"
                  >
                    <option value="">Select</option>
                    <option value="Interview schedule">
                      Interview schedule
                    </option>
                    <option value="Attending After Some time">
                      Attending After Some time
                    </option>
                    <option value="hold">hold</option>
                  </select>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {showAlert && (
          <div className="alert alert-success" role="alert">
            Data updated successfully!
          </div>
        )}

        <center>
          <div className="d-grid gap-2 col-3 max-auto" >
            <button type="submit" className="loging-hr">
              Update Data
            </button>
            <button type="button" className="loging-hr" onClick={onCancel}>Cancel</button>
          </div>
        </center>

      </form>
    </div>
  );
};

UpdateCallingTracker.propTypes = {
  candidateId: PropTypes.number.isRequired,
  employeeId: PropTypes.number.isRequired,
  onSuccess: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};

export default UpdateCallingTracker;