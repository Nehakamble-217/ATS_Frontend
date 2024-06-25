import React, { useState } from "react";
import '../EmployeeSection/addEmployee.css';

const AddEmployee = () => {
  const [formData, setFormData] = useState({
    employeeName: "",
    dateOfJoining: "",
    designation: "",
    department: "",
    officialMail: "",
    employeeEmail: "",
    employeeNumber: "",
    officialContactNumber: "",
    alternateContactNo: "",
    dateOfBirth: "",
    gender: "",
    companyMobileNumber: "",
    whatsAppNumber: "",
    emergencyContactPerson: "",
    emergencyContactNumber: "",
    emergencyPersonRelation: "",
    employeePresentAddress: "",
    employeeExperience: "",
    perks: "",
    maritalStatus: "",
    anniversaryDate: "",
    tshirtSize: "",
    lastCompany: "",
    workLocation: "",
    entrySource: "",
    employeeStatus: "",
    lastWorkingDate: "",
    reasonForLeaving: "",
    inductionYesOrNo: "",
    inductionComment: "",
    trainingSource: "",
    trainingCompletedYesOrNo: "",
    trainingTakenCount: "",
    roundsOfInterview: "",
    interviewTakenPerson: "",
    warningComments: "",
    performanceIndicator: "",
    teamLeaderMsg: "",
    editDeleteAuthority: "",
    linkedInURl: "",
    faceBookURL: "",
    twitterURl: "",
    employeeAddress: "",
    bloodGroup: "",
    aadhaarNo: "",
    panNo: "",
    educationalQualification: "",
    offeredSalary: "",
    jobRole: "",
    professionalPtNo: "",
    esIcNo: "",
    pfNo: "",
    employeePassword: "",
    confirmPassword: "",
    profileImage: null,
    document: null,
    resumeFile: null,
  });

  const [passwordVisible, setPasswordVisible] = useState(false);
  const [passwordMatch, setPasswordMatch] = useState(true);
  const [passwordError, setPasswordError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleInputChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === "file") {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: files[0],
      }));
    } else {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: value,
      }));
    }
  };

  const handleConfirmPasswordBlur = () => {
    if (formData.employeePassword !== formData.confirmPassword) {
      setPasswordMatch(false);
      setPasswordError("Passwords do not match");
    } else {
      setPasswordMatch(true);
      setPasswordError("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!passwordMatch) {
      setPasswordError("Passwords do not match");
      return;
    }

    const formDataToSend = new FormData();
    for (const key in formData) {
      if (formData[key] instanceof File) {
        formDataToSend.append(key, formData[key]);
      } else {
        formDataToSend.append(key, formData[key]);
      }
    }

    try {
      const response = await fetch("http://192.168.1.38:8891/api/ats/157industries/add-employee", {
        method: "POST",
        body: formDataToSend,
      });

      const data = await response.json();

      if (response.ok) {
        setSuccessMessage("Employee Data Added Successfully.");
      } else {
        setSuccessMessage(data.message || "Failed to add employee data.");
      }
    } catch (error) {
      console.error("Error:", error);
      setSuccessMessage("Error occurred while adding employee data.");
    }
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible((prev) => !prev);
  };

    return (
        <div className="form-container">
            <form className="form-group" onSubmit={handleSubmit} encType="multipart/form-data">

                <div className="form-row">
                    <label>Employee Name:</label>
                    <input type="text" name="employeeName" className="employee-inputs" value={formData.employeeName} onChange={handleInputChange} />
                </div>

                <div className="form-row">
                    <label>Date of Joining:</label>
                    <input type="date" name="dateOfJoining" value={formData.dateOfJoining} onChange={handleInputChange} />
                </div>

                <div className="form-row">
                    <label>Employee Password:</label>
                    <div className="password-input-container">
                        <input
                            type={passwordVisible ? "text" : "password"}
                            name="employeePassword"
                            placeholder="Enter Password (max 8 characters)"
                            maxLength={8}
                            value={formData.employeePassword}
                            onChange={handleInputChange}
                        />
                        <button
                            type="button"
                            className="show-pass-btn"
                            onClick={togglePasswordVisibility}
                        >
                            {passwordVisible ? "Hide" : "Show"}
                        </button>
                    </div>
                </div>

                <div className="form-row">
                    <label>Confirm Password:</label>
                    <input
                        type="password"
                        name="confirmPassword"
                        placeholder="Confirm Password (max 8 characters)"
                        value={formData.confirmPassword}
                        onChange={handleInputChange}
                        onBlur={handleConfirmPasswordBlur}
                        maxLength={8}
                        className={passwordError || !passwordMatch ? "error" : "success"}
                    />
                    {passwordError && <div className="error-message">{passwordError}</div>}
                    {!passwordError && passwordMatch && <div className="success-message">Password is correct</div>}
                    {!passwordError && !passwordMatch && <div className="error-message">Password is incorrect</div>}
                </div>

                

                <div className="form-row">
                    <label>Designation:</label>
                    <input type="text" name="designation" placeholder="Eg: FrontEnd Developer" value={formData.designation} onChange={handleInputChange} />
                </div>

                <div className="form-row">
                    <label>Department:</label>
                    <input type="text" name="department" placeholder="Enter Department" value={formData.department} onChange={handleInputChange} />
                </div>

                <div className="form-row">
                    <label>Official Email:</label>
                    <input type="email" name="officialMail" value={formData.officialMail} onChange={handleInputChange} />
                </div>

                <div className="form-row">
                    <label>Personal Email:</label>
                    <input type="email" name="employeeEmail" value={formData.employeeEmail} onChange={handleInputChange} />
                </div>

                <div className="form-row">
                    <label>Mobile Number:</label>
                    <input type="text" name="employeeNumber" placeholder="Enter Mobile Number" value={formData.employeeNumber} onChange={handleInputChange} />
                </div>

                <div className="form-row">
                    <label>Alternate Mobile Number:</label>
                    <input type="text" name="alternateContactNo" placeholder="Enter Alternate Mobile Number" value={formData.alternateContactNo} onChange={handleInputChange} />
                </div>

                <div className="form-row">
                    <label>Company Mobile Number:</label>
                    <input type="text" name="companyMobileNumber" placeholder="Enter Company Mobile Number" value={formData.companyMobileNumber} onChange={handleInputChange} />
                </div>

                <div className="form-row">
                    <label>WhatsApp Number:</label>
                    <input type="text" name="whatsAppNumber" placeholder="Enter WhatsApp Number" value={formData.whatsAppNumber} onChange={handleInputChange} />
                </div>

                <div className="form-row">
                    <label>Date of Birth:</label>
                    <input type="date" name="dateOfBirth" value={formData.dateOfBirth} onChange={handleInputChange} />
                </div>

                <div className="form-row">
                    <label>Gender:</label>
                    <select name="gender" value={formData.gender} onChange={handleInputChange}>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                    </select>
                </div>

                <div className="form-row">
                    <label>Marital Status:</label>
                    <select name="maritalStatus" value={formData.maritalStatus} onChange={handleInputChange}>
                        <option value="single">Single</option>
                        <option value="married">Married</option>
                        <option value="divorced">Divorced</option>
                        <option value="widowed">Widowed</option>
                    </select>
                </div>

                <div className="form-row">
                    <label>Anniversary Date:</label>
                    <input type="date" name="anniversaryDate" value={formData.anniversaryDate} onChange={handleInputChange} />
                </div>

                <div className="form-row">
                    <label>T-shirt Size:</label>
                    <input type="text" name="tshirtSize" placeholder="Enter T-shirt Size" value={formData.tshirtSize} onChange={handleInputChange} />
                </div>

                <div className="form-row">
                    <label>Blood Group:</label>
                    <input type="text" name="bloodGroup" placeholder="Enter Blood Group" value={formData.bloodGroup} onChange={handleInputChange} />
                </div>

                <div className="form-row">
                    <label>Aadhaar Number:</label>
                    <input type="text" name="aadhaarNo" placeholder="Enter Aadhaar Number" value={formData.aadhaarNo} onChange={handleInputChange} />
                </div>

                <div className="form-row">
                    <label>PAN Number:</label>
                    <input type="text" name="panNo" placeholder="Enter PAN Number" value={formData.panNo} onChange={handleInputChange} />
                </div>

                <div className="form-row">
                    <label>Educational Qualification:</label>
                    <input type="text" name="educationalQualification" placeholder="Enter Educational Qualification" value={formData.educationalQualification} onChange={handleInputChange} />
                </div>

                <div className="form-row">
                    <label>Offered Salary:</label>
                    <input type="number" name="offeredSalary" placeholder="Enter Offered Salary" value={formData.offeredSalary} onChange={handleInputChange} />
                </div>

                <div className="form-row">
                    <label>Job Role:</label>
                    <input type="text" name="jobRole" placeholder="Enter Job Role" value={formData.jobRole} onChange={handleInputChange} />
                </div>

                <div className="form-row">
                    <label>Profile Image:</label>
                    <input type="file" name="profileImage" accept="image/*" onChange={handleInputChange} />
                </div>

                <div className="form-row">
                    <label>Document:</label>
                    <input type="file" name="document" accept=".pdf,.doc,.docx" onChange={handleInputChange} />
                </div>

                <div className="form-row">
                    <label>Resume File:</label>
                    <input type="file" name="resumeFile"  accept=".pdf,.doc,.docx,.png,.jpg" onChange={handleInputChange} />
                </div>

                <div className="form-row">
                    <label>Employee Present Address:</label>
                    <input type="text" name="employeePresentAddress" placeholder="Enter Present Address" value={formData.employeePresentAddress} onChange={handleInputChange} />
                </div>

                <div className="form-row">
                    <label>Employee Experience:</label>
                    <input type="text" name="employeeExperience" placeholder="Enter Experience" value={formData.employeeExperience} onChange={handleInputChange} />
                </div>

                <div className="form-row">
                    <label>Perks:</label>
                    <input type="text" name="perks" placeholder="Enter Perks" value={formData.perks} onChange={handleInputChange} />
                </div>

                <div className="form-row">
                    <label>Last Company:</label>
                    <input type="text" name="lastCompany" placeholder="Enter Last Company" value={formData.lastCompany} onChange={handleInputChange} />
                </div>

                <div className="form-row">
                    <label>Work Location:</label>
                    <input type="text" name="workLocation" placeholder="Enter Work Location" value={formData.workLocation} onChange={handleInputChange} />
                </div>

                <div className="form-row">
                    <label>Entry Source:</label>
                    <input type="text" name="entrySource" placeholder="Enter Entry Source" value={formData.entrySource} onChange={handleInputChange} />
                </div>

                <div className="form-row">
                    <label>Employee Status:</label>
                    <input type="text" name="employeeStatus" placeholder="Enter Employee Status" value={formData.employeeStatus} onChange={handleInputChange} />
                </div>

                <div className="form-row">
                    <label>Last Working Date:</label>
                    <input type="date" name="lastWorkingDate" value={formData.lastWorkingDate} onChange={handleInputChange} />
                </div>

                <div className="form-row">
                    <label>Reason for Leaving:</label>
                    <input type="text" name="reasonForLeaving" placeholder="Enter Reason for Leaving" value={formData.reasonForLeaving} onChange={handleInputChange} />
                </div>

                <div className="form-row">
                    <label>Induction (Yes/No):</label>
                    <input type="text" name="inductionYesOrNo" placeholder="Enter Induction (Yes/No)" value={formData.inductionYesOrNo} onChange={handleInputChange} />
                </div>

                <div className="form-row">
                    <label>Induction Comment:</label>
                    <input type="text" name="inductionComment" placeholder="Enter Induction Comment" value={formData.inductionComment} onChange={handleInputChange} />
                </div>

                <div className="form-row">
                    <label>Training Source:</label>
                    <input type="text" name="trainingSource" placeholder="Enter Training Source" value={formData.trainingSource} onChange={handleInputChange} />
                </div>

                <div className="form-row">
                    <label>Training Completed (Yes/No):</label>
                    <input type="text" name="trainingCompletedYesOrNo" placeholder="Enter Training Completed (Yes/No)" value={formData.trainingCompletedYesOrNo} onChange={handleInputChange} />
                </div>

                <div className="form-row">
                    <label>Training Taken Count:</label>
                    <input type="number" name="trainingTakenCount" placeholder="Enter Training Taken Count" value={formData.trainingTakenCount} onChange={handleInputChange} />
                </div>

                <div className="form-row">
                    <label>Rounds of Interview:</label>
                    <input type="text" name="roundsOfInterview" placeholder="Enter Rounds of Interview" value={formData.roundsOfInterview} onChange={handleInputChange} />
                </div>

                <div className="form-row">
                    <label>Interview Taken By:</label>
                    <input type="text" name="interviewTakenPerson" placeholder="Enter Interview Taken By" value={formData.interviewTakenPerson} onChange={handleInputChange} />
                </div>

                <div className="form-row">
                    <label>Warning Comments:</label>
                    <input type="text" name="warningComments" placeholder="Enter Warning Comments" value={formData.warningComments} onChange={handleInputChange} />
                </div>

                <div className="form-row">
                    <label>Performance Indicator:</label>
                    <input type="text" name="performanceIndicator" placeholder="Enter Performance Indicator" value={formData.performanceIndicator} onChange={handleInputChange} />
                </div>

                <div className="form-row">
                    <label>Team Leader Message:</label>
                    <input type="text" name="teamLeaderMsg" placeholder="Enter Team Leader Message" value={formData.teamLeaderMsg} onChange={handleInputChange} />
                </div>

                <div className="form-row">
                    <label>Edit/Delete Authority:</label>
                    <input type="text" name="editDeleteAuthority" placeholder="Enter Edit/Delete Authority" value={formData.editDeleteAuthority} onChange={handleInputChange} />
                </div>

                <div className="form-row">
                    <label>LinkedIn URL:</label>
                    <input type="text" name="linkedInURl" placeholder="Enter LinkedIn URL" value={formData.linkedInURl} onChange={handleInputChange} />
                </div>

                <div className="form-row">
                    <label>Facebook URL:</label>
                    <input type="text" name="faceBookURL" placeholder="Enter Facebook URL" value={formData.faceBookURL} onChange={handleInputChange} />
                </div>

                <div className="form-row">
                    <label>Twitter URL:</label>
                    <input type="text" name="twitterURl" placeholder="Enter Twitter URL" value={formData.twitterURl} onChange={handleInputChange} />
                </div>

                <div className="form-row">
                    <label>Employee Address:</label>
                    <input type="text" name="employeeAddress" placeholder="Enter Employee Address" value={formData.employeeAddress} onChange={handleInputChange} />
                </div>

                <div className="form-row">
                    <label>Professional PT Number:</label>
                    <input type="text" name="professionalPtNo" placeholder="Enter Professional PT Number" value={formData.professionalPtNo} onChange={handleInputChange} />
                </div>

                {/* <div className="form-row">
                    <label>ESIC Number:</label>
                    <input type="text" name="esIcNo" placeholder="Enter ESIC Number" value={formData.esIcNo} onChange={handleInputChange} />
                </div> */}

                <div className="form-row">
                    <label>PF Number:</label>
                    <input type="text" name="pfNo" placeholder="Enter PF Number" value={formData.pfNo} onChange={handleInputChange} />
                </div>

                <div className="add-employee-submit-div">
                    <button type="submit" className="submit-button-add-emp">Submit</button>
                </div>
            </form>
            {successMessage && <p>{successMessage}</p>}
        </div>
    );
};

export default AddEmployee;
