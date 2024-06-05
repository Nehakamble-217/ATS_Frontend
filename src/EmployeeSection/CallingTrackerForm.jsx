
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
  // employeeId,
  onDataAdditionSuccess,
}) => {

  const { employeeId } = useParams();
  const initialCallingTrackerState = {
    date: new Date().toISOString().slice(0, 10),
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
    communicationRating: "",
    selectYesOrNo: "No",
    personalFeedback: "",
    callingFeedback: "",
    employee: {
      employeeId: parseInt(employeeId, 10) // Pass the employeeId here
    }
  };

  const initialLineUpState = {
    date: new Date().toISOString().slice(0, 10),
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
  };

  const [callingTracker, setCallingTracker] = useState(
    initialCallingTrackerState
  );
  const [showLineUpForm, setShowLineUpForm] = useState(false);
  const [lineUpData, setLineUpData] = useState(initialLineUpState);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [selectedDateTime, setSelectedDateTime] = useState(new Date());
  const [resumeUploaded, setResumeUploaded] = useState(false);

  const [successfulDataAdditions, setSuccessfulDataAdditions] = useState(0);
  const [requirementOptions, setRequirementOptions] = useState([]);

  // const employeeIdNew = parseInt(employeeId, 10);
  // console.log(employeeIdNew + "new Id form");

  useEffect(() => {
    fetchRecruiterName();
    fetchRequirementOptions();
  }, [employeeId]);

  const fetchRecruiterName = async () => {
    try {
      const response = await axios.get(
        `http://192.168.1.41:8891/api/ats/157industries/employeeName/${employeeId}`
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
        `http://192.168.1.41:8891/api/ats/157industries/company-list/${employeeId}`
      );
      const { data } = response;
      setRequirementOptions(data);
    } catch (error) {
      console.error("Error fetching requirement options:", error);
    }
  };

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

      if (callingTracker.selectYesOrNo === "Interested" ) {
        onDataAdditionSuccess();
        dataToUpdate.lineUp = lineUpData;
        setSuccessfulDataAdditions(true);
        message = "In Calling & Line Up Data Added";
      } else {
        message = "Only Calling data added";
      }

      await axios.post(
        `http://192.168.1.41:8891/api/ats/157industries/${employeeId}/addCallingData`,
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

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="maintable">
          <table id="studTables" className="table  table-striped  text-center">
            <tbody className="table-group-divider">
              <tr id="table-row">
                <th scope="col">Date:</th>
                <td>
                  <input
                    type="text"
                    id="currentDate"
                    name="currentDate"
                    value={callingTracker.date}
                    className="form-control"
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
                    className="form-control"
                  />
                </td>
              </tr>
              <tr hidden>
                <th>Employee ID</th>
                <td>
                  <input type="text" name="employeeId" readOnly value={employeeId} />
                </td>
              </tr>

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
                    value={callingTracker.contactNumber}
                    onChange={(value) =>
                      handlePhoneNumberChange(value, "contactNumber")
                    }
                    defaultCountry="IN"
                    maxLength={12}
                    className="PhoneInputInput"
                    name="contactNumber"
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
                    maxLength={12}
                    className="PhoneInputInput"
                    name="alternateNumber"
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

                <th scope="col">Applying For Position</th>
                <td>
                  <input
                    type="text"
                    name="position"
                    value={callingTracker.position}
                    onChange={handleChange}
                    className="form-control"
                  />
                </td>
              </tr>

              <tr>
                <th scope="col">Applying Company Id</th>
                <td>
                  <select
                    className="form-select mb-1"
                    name="requirementId"
                    value={callingTracker.requirementId}
                    onChange={handleChange}
                  >
                    <option value="">Select ID</option>
                    {requirementOptions.map((option) => (
                      <option key={option[0]} value={option[0]}>
                        {option[0]}
                      </option>
                    ))}
                  </select>
                </td>

                <th scope="col">Applying Company Name</th>
                <td>
                  <select
                    className="form-select"
                   
                    name="requirementCompany"
                    value={callingTracker.requirementCompany}
                    onChange={handleChange}
                  >
                    <option value="">Select Company</option>
                    {requirementOptions.map((option) => (
                      <option key={option.requirement_id} value={option[1]}>
                        {option[1]}
                      </option>
                    ))}
                  </select>
                </td>
              </tr>

              <tr>
                <th>Current Location</th>
                <td>
                  <input
                    type="text"
                
                    name="currentLocation"
                    value={callingTracker.currentLocation}
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
                    onChange={(e) =>
                      setLineUpData({
                        ...lineUpData,
                        dateOfBirth: e.target.value,
                      })
                    }
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
                <th scope="col">Education</th>
                <td>
                  <input
                    type="text"
                    name="qualification"
                    value={lineUpData.qualification}
                    onChange={(e) =>
                      setLineUpData({
                        ...lineUpData,
                        qualification: e.target.value,
                      })
                    }
                    className="form-control"
                  />
                </td>

                <th scope="col">Year Of Passing</th>
                <td>
                  <input
                    type="text"
                    name="yearOfPassing"
                    value={lineUpData.yearOfPassing}
                    onChange={(e) =>
                      setLineUpData({
                        ...lineUpData,
                        yearOfPassing: e.target.value,
                      })
                    }
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
                <td>
                  <input
                    type="text"
        
                    name="totalExperience"
                    value={lineUpData.totalExperience}
                    onChange={(e) =>
                      setLineUpData({
                        ...lineUpData,
                        totalExperience: e.target.value,
                      })
                    }
                    className="form-control"
                  />
                </td>
              </tr>

              <tr>
                <th scope="col">Current CTC(LPA)</th>
                <td>
                  <input
                    type="text"
                
                    name="currentCTC"
                    value={lineUpData.currentCTC}
                    onChange={(e) =>
                      setLineUpData({
                        ...lineUpData,
                        currentCTC: e.target.value,
                      })
                    }
                    className="form-control"
                  />
                </td>
                <th scope="col">Expected CTC(LPA)</th>
                <td>
                  <input
                    type="text"
                  
                    name="expectedCTC"
                    value={lineUpData.expectedCTC}
                    onChange={(e) =>
                      setLineUpData({
                        ...lineUpData,
                        expectedCTC: e.target.value,
                      })
                    }
                    className="form-control"
                  />
                </td>
              </tr>

              <tr>
                <th scope="col">Notice Period(Days)</th>
                <td>
                  <input
                    type="text"
                  
                    name="noticePeriod"
                    value={lineUpData.noticePeriod}
                    onChange={(e) =>
                      setLineUpData({
                        ...lineUpData,
                        noticePeriod: e.target.value,
                      })
                    }
                    className="form-control"
                  />
                </td>
                <th scope="col">Holding Offer Letter</th>
                <td>
                  <input
                    type="text"
              
                    name="holdingAnyOffer"
                    value={lineUpData.holdingAnyOffer}
                    onChange={(e) =>
                      setLineUpData({
                        ...lineUpData,
                        holdingAnyOffer: e.target.value,
                      })
                    }
                    className="form-control"
                  />
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
                      })
                    }
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

        {formSubmitted && (
          <div className="alert alert-success" role="alert">
            Data Added successfully!
          </div>
        )}

        <div className="buttonDiv">
          {callingTracker.selectYesOrNo !== "Interested" && (
            <button type="submit" className="ctf-btn" id="uploadbtn2">
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