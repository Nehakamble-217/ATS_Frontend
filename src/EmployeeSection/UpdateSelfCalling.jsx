import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { useLocation, useParams } from "react-router-dom";

import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import "../EmployeeSection/AddCandidate.css";

const UpdateCallingTracker = ({ initialData, candidateId, employeeId, onSuccess, onCancel }) => {
  const [callingTracker, setCallingTracker] = useState({
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
    selectYesOrNo: "",
    personalFeedback: "",
    callingFeedback: "",
    lineUp: {
      dateOfBirth: "",
      gender: "",
      qualification: "",
      yearOfPassing: "",
      totalExperience: "",
      resume: "",
      extraCertification: "",
      companyName: "",

      currentCTC: "",
      expectedCTC: "",
      noticePeriod: "",
      holdingAnyOffer: "",
      feedBack: "",
      availabilityForInterview: "",
      msgForTeamLeader: "",
      finalStatus: "",
      interviewTime: "",
    },
  });

  // const { employeeId} = useParams();
  // const employeeIdNew = parseInt(employeeId, 10);

  const [formSubmitted, setFormSubmitted] = useState(false);
  const [recruiterName, setRecruiterName] = useState("");
  const [candidateFetched, setCandidateFetched] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [requirementOptions, setRequirementOptions] = useState([]);
  const [candidateData, setCandidateData] = useState(null);

  const location = useLocation();
  const previousUrl = location.state && location.state.from;

  useEffect(() => {
    fetchEmployeeName();
    fetchCandidateData();
    fetchRequirementOptions();
  }, [employeeId, candidateId]);

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
      setCallingTracker(initialData);
      setRecruiterName(initialData.recruiterName);
      setCandidateFetched(true);
    }
  }, [initialData]);

  const fetchEmployeeName = async () => {
    try {
      const response = await fetch(
        `http://192.168.1.41:8891/api/ats/157industries/employeeName/${employeeId}`
      );
      const data = await response.text();
      setRecruiterName(data);
    } catch (error) {
      console.error("Error fetching employee name:", error);
    }
  };

  const fetchCandidateData = async () => {
    try {
      const response = await fetch(
        `http://192.168.1.41:8891/api/ats/157industries/specific-data/${candidateId}`
      );
      const data = await response.json();
      setCallingTracker(data);
      setCandidateFetched(true);
    } catch (error) {
      console.error("Error fetching candidate data:", error);
    }
  };

  const handlePhoneNumberChange = (value, name) => {
    setCallingTracker((prevState) => ({
      ...prevState,
      [name]: value ? value : "",
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const dataToUpdate = {
        ...callingTracker,
        recruiterName: recruiterName,
      };

      const response = await fetch(
        `http://192.168.1.41:8891/api/ats/157industries/update-callingData/${candidateId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(dataToUpdate),
        }
      );

      if (response.ok) {
        const data = await response.text();
        console.log("Data updated successfully:", data);
        setFormSubmitted(true);
        setShowAlert(true);
        setTimeout(() => {
          setShowAlert(false);
          setFormSubmitted(false);
          onSuccessfulUpdate();
        }, 2000);
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
                <th scope="col">Added Date:</th>
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

                <th>Recruiters Name</th>
                <td>
                  <input
                    type="text"
                    name="recruiterName"
                    value={recruiterName}
                    readOnly
                    className="form-control"
                  />
                </td>
              </tr>

              <tr id="heading123">
                <th hidden>Employee Id</th>
                <td hidden>
                  <input
                    type="text"
                    name="employeeId"
                    value={employeeId}
                    className="form-control mb-3"
                    readOnly
                    hidden
                  />
                </td>

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
                  <input
                    placeholder="Enter phone number"
                    name="contactNumber"
                    value={callingTracker.contactNumber}
                    onChange={(value) =>
                      handlePhoneNumberChange(value, "contactNumber")
                    }

                    maxLength={12}
                    className="PhoneInputInput"
                  />
                </td>

                <th scope="col">Alternate Number</th>
                <td>
                  <input
                    placeholder="Enter phone number"
                    name="alternateNumber"
                    value={callingTracker.alternateNumber}
                    onChange={(value) =>
                      handlePhoneNumberChange(value, "alternateNumber")
                    }

                    maxLength={12}
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
                    name="lineUp.dateOfBirth"
                    value={callingTracker.lineUp?.dateOfBirth}
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
                      checked={callingTracker.lineUp?.gender === "male"}
                      onChange={handleChange}
                    />
                    <label className="px-2">Male</label>

                    <input
                      type="checkbox"
                      name="lineUp.gender"
                      value="female"
                      className="gender"
                      checked={callingTracker.lineUp?.gender === "female"}
                      onChange={handleChange}
                    />
                    <label className="px-2">Female</label>
                  </div>
                </td>
              </tr>

              <tr>
                <th scope="col">Education</th>
                <td>
                  <input
                    type="text"
                    name="lineUp.qualification"
                    value={callingTracker.lineUp?.qualification}
                    onChange={handleChange}
                    className="form-control"
                  />
                </td>

                <th scope="col">Year Of Passing</th>
                <td>
                  <input
                    type="text"
                    name="lineUp.yearOfPassing"
                    value={callingTracker.lineUp?.yearOfPassing}
                    onChange={handleChange}
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
                    value={callingTracker.lineUp?.extraCertification}
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
                    value={callingTracker.lineUp?.companyName}
                    onChange={handleChange}
                    className="form-control"
                  />
                </td>

                <th scope="col">Experince</th>
                <td>
                  <input
                    type="text"
                    name="lineUp.totalExperience"
                    value={callingTracker.lineUp?.totalExperience}
                    onChange={handleChange}
                    className="form-control"
                  />
                </td>
              </tr>

              <tr>
                <th scope="col">Current CTC(LPA)</th>
                <td>
                  <input
                    type="text"
                    name="lineUp.currentCTC"
                    value={callingTracker.lineUp?.currentCTC}
                    onChange={handleChange}
                    className="form-control"
                  />
                </td>
                <th scope="col">Expected CTC(LPA)</th>
                <td>
                  <input
                    type="text"
                    name="lineUp.expectedCTC"
                    value={callingTracker.lineUp?.expectedCTC}
                    onChange={handleChange}
                    className="form-control"
                  />
                </td>
              </tr>

              <tr>
                <th scope="col">Notice Period(Days)</th>
                <td>
                  <input
                    type="text"
                    name="lineUp.noticePeriod"
                    value={callingTracker.lineUp?.noticePeriod}
                    onChange={handleChange}
                    className="form-control"
                  />
                </td>
                <th scope="col">Holding Offer Letter</th>
                <td>
                  <input
                    type="text"
                    name="lineUp.holdingAnyOffer"
                    value={callingTracker.lineUp?.holdingAnyOffer}
                    onChange={handleChange}
                    className="form-control"
                  />
                </td>
              </tr>

              <tr>
                <th scope="col">Recruiters Feedback</th>
                <td>
                  <input
                    type="text"
                    name="lineUp.feedBack"
                    value={callingTracker.lineUp?.feedBack}
                    onChange={handleChange}
                    className="form-control"
                  />
                </td>

                <th scope="col">Comment For Eevaluter/TL</th>
                <td>
                  <input
                    type="text"
                    name="lineUp.msgForTeamLeader"
                    value={callingTracker.lineUp?.msgForTeamLeader}
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
                    value={callingTracker.lineUp?.availabilityForInterview}
                    onChange={handleChange}
                    className="form-control"
                    style={{ marginRight: "10px" }}
                  />
                  <input
                    type="time"
                    name="lineUp.interviewTime"
                    value={callingTracker.lineUp?.interviewTime}
                    onChange={handleChange}
                    className="form-control"
                  />
                </td>

                <th scope="col">Final Status</th>
                <td>
                  <select
                    type="text"
                    name="lineUp.finalStatus"
                    value={callingTracker.lineUp?.finalStatus}
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
          </div>
        </center>

      </form>
    </div>
  );
};

UpdateCallingTracker.propTypes = {
  candidateId: PropTypes.number.isRequired,
  employeeId: PropTypes.string.isRequired,
  onComplete: PropTypes.func.isRequired,
};

export default UpdateCallingTracker;