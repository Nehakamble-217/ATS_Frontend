import React, { useState } from "react";
import '../EmployeeSection/addEmployee.css';

const Employee = () => {
  const [formData, setFormData] = useState({
    employeeName: "",
    dateOfJoining: "",
    designation: "",
    department: "",
    officialMail: "",
    employeeEmail:"",
    employeeNumber:"",
    officialContactNumber:"",
    alternateContactNo: "",
    dateOfBirth: "",
    gender:"",
    companyMobileNumber: "",
    whatsAppNumber: "",
    emergencyContactPerson: "",
    emergencyContactNumber: "",
    emergencyPersonRelation: "",
    employeePresentAddress: "",
    employeeExperience:"",
    perks: "",
    maritalStatus: "",
    anniversaryDate: "",
    tshirtSize: "",
    lastCompany: "",
    workLocation:"",
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
    profileImage: "",
    document: "",
    resumeFile: "",
  });

  const [passwordVisible, setPasswordVisible] = useState(false);
  const [passwordMatch, setPasswordMatch] = useState(true);
  const [passwordError, setPasswordError] = useState("");
  const [successmessage,setSuccessMessage] =useState();
 
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
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
    try {
      const response = await fetch('http://192.168.1.38:8891/api/ats/157industries/add-employee', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      const data = await response.json();
      console.log(data);
      if (response.ok) {
        setSuccessMessage("Data added successfully!");  // Set success message
      } else {
        setSuccessMessage("Failed to add data.");
      }
    } catch (error) {
      console.error('Error:', error);
      setSuccessMessage("Error occurred while adding data.");  // Set error message
    }
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible((prev) => !prev);
  };

  return (
    <div className="form-container">
      <form className="form-group" onSubmit={handleSubmit}>
       


      <div className="form-row">
          <label>Employee Name:</label>
          <input type="text" name="employeeName" value={formData.employeeName} onChange={handleInputChange} />
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
              className="password-toggle"
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
          <label>Date of Joining:</label>
          <input type="date" name="dateOfJoining" 
          value={formData.dateOfJoining}
          onChange={handleInputChange} />
        </div>

        <div className="form-row">
          <label>Designation:</label>
          <input type="text" name="designation" placeholder="Eg: FrontEnd Developer"
           value={formData.designation}
           onChange={handleInputChange} 
           />
        </div>

        <div className="form-row">
          <label>Department:</label>
          <input type="text" name="department" placeholder="Enter Department"
          value={formData.department} 
          onChange={handleInputChange}/>
        </div>

        <div className="form-row">
          <label>Official Email:</label>
          <input type="email" name="officialEmail" 
          value={formData.officialMail}
          onChange={handleInputChange}/>
        </div>

        <div className="form-row">
          <label>Personal Email:</label>
          <input type="email" name="personalEmail" 
          value={formData.employeeEmail}
          onChange={handleInputChange}/>
        </div>

        <div className="form-row">
          <label>Mobile Number:</label>
          <input type="text" name="mobileNumber" placeholder="Enter Mobile Number" 
          value={formData.employeeNumber}
          onChange={handleInputChange}/>
        </div>

        <div className="form-row">
          <label>Alternate Mobile Number:</label>
          <input type="text" name="alternateMobileNumber" placeholder="Enter Alternate Mobile Number" 
          value={formData.alternateContactNo}
          onChange={handleInputChange}/>
        </div>

        <div className="form-row">
          <label>Company Mobile Number:</label>
          <input type="text" name="companyMobileNumber" placeholder="Enter Company Mobile Number"
          value={formData.officialContactNumber}
          onChange={handleInputChange}/>
        </div>

        <div className="form-row">
          <label>WhatsApp Number:</label>
          <input type="text" name="whatsappNumber" placeholder="Enter WhatsApp Number"
          value={formData.whatsAppNumber}
          onChange={handleInputChange}/>
        </div>

        <div className="form-row">
          <label>Date of Birth:</label>
          <input type="date" name="dateOfBirth" 
          value={formData.dateOfBirth}
          onChange={handleInputChange}/>
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
          <label>Emergency Contact Number:</label>
          <input type="text" name="emergencyContactNumber" 
          value={formData.emergencyContactNumber}
          onChange={handleInputChange}
          />
        </div>

        <div className="form-row">
          <label>Emergency Contact Name:</label>
          <input type="text" name="emergencyContactName" 
          value={formData.emergencyContactPerson}
          onChange={handleInputChange}/>
        </div>

        <div className="form-row">
          <label>Emergency Contact Relation:</label>
          <input type="text" name="emergencyContactRelation" 
          value={formData.emergencyPersonRelation}
          onChange={handleInputChange}/>
        </div>

        <div className="form-row">
          <label>Permanent Address:</label>
          <input type="text" name="permanentAddress" 
          value={formData.employeeAddress}
          onChange={handleInputChange}/>
        </div>

        <div className="form-row">
          <label>Present Address:</label>
          <input type="text" name="presentAddress" 
          value={formData.employeePresentAddress}
          onChange={handleInputChange}/>
        </div>

        <div className="form-row">
          <label>Blood Group:</label>
          <input type="text" name="bloodGroup" 
          value={formData.bloodGroup}
          onChange={handleInputChange}/>
        </div>

        <div className="form-row">
          <label>Aadhar Number:</label>
          <input type="text" name="aadharNumber" 
          value={formData.aadhaarNo}
          onChange={handleInputChange}/>
        </div>

        <div className="form-row">
          <label>PAN Number:</label>
          <input type="text" name="panNumber" 
          value={formData.panNo}
          onChange={handleInputChange}/>
        </div>

        <div className="form-row">
          <label>Educational Details:</label>
          <input type="text" name="educationalDetails" 
          value={formData.educationalQualification}
          onChange={handleInputChange}/>
        </div>

        <div className="form-row">
          <label>Experience:</label>
          <input type="text" name="experience" 
          value={formData.employeeExperience}
          onChange={handleInputChange}/>
        </div>

        <div className="form-row">
          <label>Salary:</label>
          <input type="text" name="salary" 
          value={formData.offeredSalary}
          onChange={handleInputChange}/>
        </div>

        <div className="form-row">
          <label>Compliances:</label>
          <input type="text" name="compliances" 
          value={formData.perks}
          onChange={handleInputChange}/>
        </div>

        <div className="form-row">
          <label>Professional PT Number:</label>
          <input type="text" name="professionalPtNo" 
          value={formData.professionalPtNo}
          onChange={handleInputChange}/>
        </div>

        <div className="form-row">
          <label>ESIC Number:</label>
          <input type="text" name="esicNumber" 
          value={formData.esIcNo}
          onChange={handleInputChange}/>
        </div>

        <div className="form-row">
          <label>PF Number:</label>
          <input type="text" name="pfNumber" 
          value={formData.pfNo}
          onChange={handleInputChange}/>
        </div>

        <div className="form-row">
          <label>Anniversary Date:</label>
          <input type="date" name="anniversaryDate" 
          value={formData.anniversaryDate}
          onChange={handleInputChange}/>
        </div>

        <div className="form-row">
          <label>T-Shirt Size:</label>
          <input type="text" name="tshirtSize" 
          value={formData.tshirtSize}
          onChange={handleInputChange}/>
        </div>

        <div className="form-row">
          <label>Last Company:</label>
          <input type="text" name="lastCompany" 
          value={formData.lastCompany}
          onChange={handleInputChange}/>
        </div>

        <div className="form-row">
          <label>Work Location:</label>
          <input type="text" name="workLocation" 
          value={formData.workLocation}
          onChange={handleInputChange}/>
        </div>

        <div className="form-row">
          <label>Source:</label>
          <input type="text" name="source" 
          value={formData.entrySource}
          onChange={handleInputChange}/>
        </div>

        <div className="form-row">
          <label>Status:</label>
          <input type="text" name="status" 
          value={formData.employeeStatus}
          onChange={handleInputChange}/>
        </div>

        <div className="form-row">
          <label>Last Date of Working:</label>
          <input type="date" name="lastDateOfWorking" 
          value={formData.lastWorkingDate}
          onChange={handleInputChange}/>
        </div>

        <div className="form-row">
          <label>Reason of Leaving:</label>
          <input type="text" name="reasonOfLeaving" 
          value={formData.reasonForLeaving}
          onChange={handleInputChange}/>
        </div>

        <div className="form-row">
          <label>Induction:</label>
          <input type="text" name="induction" 
          value={formData.inductionYesOrNo}
          onChange={handleInputChange}/>
        </div>

        <div className="form-row">
          <label>Induction Comment:</label>
          <input type="text" name="inductionComment" 
          value={formData.inductionComment}
          onChange={handleInputChange}/>
        </div>

        <div className="form-row">
          <label>Training:</label>
          <input type="text" name="training" 
          value={formData.trainingCompletedYesOrNo}
          onChange={handleInputChange}/>
        </div>

        <div className="form-row">
          <label>Rounds of Interview:</label>
          <input type="text" name="roundsOfInterview" 
          value={formData.roundsOfInterview}
          onChange={handleInputChange}/>
        </div>


        <div className="form-row">
          <label>Warning Comments:</label>
          <input type="text" name="warningComments" 
          value={formData.warningComments}
          onChange={handleInputChange}/>
        </div>

        <div className="form-row">
          <label>Performance Indicator:</label>
          <input type="text" name="performanceIndicator" 
          value={formData.performanceIndicator}
          onChange={handleInputChange}/>
        </div>

        <div className="form-row">
          <label>Team Leader:</label>
          <input type="text" name="teamLeader" 
          value={formData.teamLeaderMsg}
          onChange={handleInputChange}/>
        </div>


        <div className="form-row">
          <label>LinkedIn:</label>
          <input type="text" name="linkedin" 
          value={formData.linkedInURl}
          onChange={handleInputChange}/>
        </div>

        <div className="form-row">
          <label>Facebook:</label>
          <input type="text" name="facebook" 
          value={formData.faceBookURL}
          onChange={handleInputChange}/>
        </div>

        <div className="form-row">
          <label>Twitter:</label>
          <input type="text" name="twitter" 
          value={formData.twitterURl}
          onChange={handleInputChange}/>
        </div>
    
         <div className="form-row">
          <label>Level:</label>
          <input type="text" name="level" 
          value={formData.jobRole}
          onChange={handleInputChange}/>
        </div> 

        <div className="form-row">
          <label>Resume:</label>
          <input type="file" name="resumeFile" 
          value={formData.resumeFile}
          onChange={handleInputChange}/>
        </div>

        <div className="form-row">
          <label>Profile Image:</label>
          <input type="file" name="profileImage"
          value={formData.profileImage}
          onChange={handleInputChange}/>
        </div>

        <div className="form-row">
          <label>Training Source</label>
          <input type="text" name="trainingSource" 
          value={formData.trainingSource}
          onChange={handleInputChange}/>
        </div>      


        <div className="form-row">
        <label>Training Taken Count:</label>
        <input
          type="text"
          name="trainingTakenCount"
          value={formData.trainingTakenCount}
          onChange={handleInputChange}
        />
      </div>

      <div className="form-row">
        <label>Edit Delete Authority:</label>
        <input
          type="text"
          name="editDeleteAuthority"
          value={formData.editDeleteAuthority}
          onChange={handleInputChange}
        />
      </div>

      <div className="form-row">
        <label>Upload Document:</label>
        <input
          type="file"
          name="document"
          value={formData.document}
          onChange={handleInputChange}
        />
      </div>



        <div className="form-row">
          <label>Interview Taken Person:</label>
          <input type="text" name="interviewTakenPerson" 
          value={formData.interviewTakenPerson}
          onChange={handleInputChange}/>
        </div>


        
        <button type="submit" className="submit-button">Submit</button>
      </form>
      
    </div>
  );
};

export default Employee;
