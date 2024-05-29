import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useLocation, useParams } from "react-router-dom";

const UpdateCallingTracker = ({ initialData, candidateId }) => {
  const [callingTracker, setCallingTracker] = useState({
    date: new Date().toISOString().slice(0, 10),
    recruiterName: "",
    candidateName: "",
    position: "",
    requirementCompany: "",
    contactNumber: "",
    alternateNumber: "",
    communicationRating: "",
    selectYesOrNo: "",
    personalFeedback: "",
    callingFeedback: "",
    lineUp: {
      candidateEmail: "",
      companyName: "",
      totalExperience: "",
      currentCTC: "",
      expectedCTC: "",
      noticePeriod: "",
      holdingAnyOffer: "",
      currentLocation: "",
      feedBack: "",
      availabilityForInterview: "",
      finalStatus: "",
    },
  });

  const { employeeId } = useParams();
  const newEmployeeId = parseInt(employeeId, 10);

  const [formSubmitted, setFormSubmitted] = useState(false);
  const [recruiterName, setRecruiterName] = useState("");
  const [candidateFetched, setCandidateFetched] = useState(initialData);
  const [showAlert, setShowAlert] = useState(false);

  const location = useLocation();

  useEffect(() => {
    fetchEmployeeName();
    fetchCandidateData(candidateId);
    // }, [employeeId, candidateId]);
  }, [employeeId, candidateId]);

  // const candidatesId = parseInt(candidateId, 10);
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
        `http://192.168.1.33:8891/api/ats/157industries/employeeName/${employeeId}`
      );
      const data = await response.text();
      setRecruiterName(data);
    } catch (error) {
      console.error("Error fetching employee name:", error);
    }
  };

  const fetchCandidateData = async (candidateId) => {
    try {
      const response = await fetch(
        `http://192.168.1.33:8891/api/ats/157industries/specific-data/${candidateId}`
      );
      const data = await response.json();
      setCallingTracker(data);
      setCandidateFetched(true);
    } catch (error) {
      console.error("Error fetching candidate data:", error);
    }
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
        `http://192.168.1.33:8891/api/ats/157industries/update-callingData/${candidateId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(dataToUpdate),
        }
      );

      if (response.ok) {
        const data = response.text();
        console.log("Data updated successfully:", data);
        setFormSubmitted(true);
        setShowAlert(true);
        setTimeout(() => {
          setShowAlert(false);
          setFormSubmitted(false);
        }, 4000);
      } else {
        console.error("Failed to update data");
      }
    } catch (error) {
      console.error("Error updating data:", error);
    }
  };

  return (
    <div>
      <h1>Update Page</h1>
      <form onSubmit={handleSubmit} className="m-3 px-2">
        <div className="row">
          <div className="col-md-6">
            <div className="mb-1 row">
              <label className="col-sm-4 col-form-label">Updated Date</label>
              <div className="col-sm-4">
                <input
                  type="date"
                  name="date"
                  style={{ width: "300px" }}
                  value={callingTracker.date}
                  onChange={handleChange}
                  className="form-control mb-3"
                  placeholder="Date"
                />
              </div>
            </div>

            <div className="mb-1 row">
              <label className="col-sm-4 col-form-label">Recruiter Name</label>
              <div className="col-sm-4">
                <input
                  type="text"
                  style={{ width: "300px" }}
                  name="recruiterName"
                  value={recruiterName}
                  readOnly
                  className="form-control mb-3"
                />
              </div>
            </div>

            <div className="mb-1 row">
              <label className="col-sm-4 col-form-label">Employee Id</label>
              <div className="col-sm-4">
                <input
                  type="text"
                  style={{ width: "300px" }}
                  name="employeeId"
                  value={employeeId}
                  className="form-control mb-3"
                  readOnly
                />
              </div>
            </div>

            <div className="mb-1 row">
              <label className="col-sm-4 col-form-label">Candidate Name</label>
              <div className="col-sm-4">
                <input
                  type="text"
                  style={{ width: "300px" }}
                  name="candidateName"
                  value={callingTracker.candidateName}
                  onChange={handleChange}
                  className="form-control mb-3"
                />
              </div>
            </div>

            <div className="mb-1 row">
              <label className="col-sm-4 col-form-label">
                Candidate Position
              </label>
              <div className="col-sm-4">
                <input
                  type="text"
                  style={{ width: "300px" }}
                  name="position"
                  value={callingTracker.position}
                  onChange={handleChange}
                  className="form-control mb-3"
                />
              </div>
            </div>

            <div className="mb-1 row">
              <label className="col-sm-4 col-form-label">
                Requirement Company
              </label>
              <div className="col-sm-4">
                <input
                  type="text"
                  style={{ width: "300px" }}
                  name="requirementCompany"
                  value={callingTracker.requirementCompany}
                  onChange={handleChange}
                  className="form-control mb-3"
                />
              </div>
            </div>

            <div className="mb-1 row">
              <label className="col-sm-4 col-form-label">Contact Number</label>
              <div className="col-sm-4">
                <input
                  type="text"
                  style={{ width: "300px" }}
                  name="contactNumber"
                  value={callingTracker.contactNumber}
                  onChange={handleChange}
                  className="form-control mb-3"
                />
              </div>
            </div>

            <div className="mb-1 row">
              <label className="col-sm-4 col-form-label">
                Alternate Number
              </label>
              <div className="col-sm-4">
                <input
                  type="text"
                  style={{ width: "300px" }}
                  name="alternateNumber"
                  value={callingTracker.alternateNumber}
                  onChange={handleChange}
                  className="form-control mb-3"
                />
              </div>
            </div>

            <div className="mb-1 row">
              <label className="col-sm-4 col-form-label">
                Communication Rating
              </label>
              <div className="col-sm-4">
                <input
                  type="text"
                  style={{ width: "300px" }}
                  name="communicationRating"
                  value={callingTracker.communicationRating}
                  onChange={handleChange}
                  className="form-control mb-3"
                />
              </div>
            </div>

            <div className="mb-1 row">
              <label className="col-sm-4 col-form-label">
                Personal Feedback
              </label>
              <div className="col-sm-4">
                <input
                  type="text"
                  style={{ width: "300px" }}
                  name="personalFeedback"
                  value={callingTracker.personalFeedback}
                  onChange={handleChange}
                  className="form-control mb-3"
                />
              </div>
            </div>

            <div className="mb-1 row">
              <label className="col-sm-4 col-form-label">
                Calling Feedback
              </label>
              <div className="col-sm-8">
                <select
                  className="form-select mb-2"
                  style={{ width: "300px" }}
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
              </div>
            </div>

            <div className="mb-1 row">
              <label className="col-sm-4 col-form-label">
                Candidate Interested
              </label>
              <div className="col-sm-8">
                <select
                  className="form-select mb-2"
                  style={{ width: "300px" }}
                  name="selectYesOrNo"
                  value={callingTracker.selectYesOrNo}
                  onChange={handleChange}
                >
                  <option value="">Select</option>
                  <option value="Interested">Interested</option>
                  <option value="Not Interested">Not Interested</option>
                  <option value="Interested But Not Eligible">
                    Interested But Not Eligible
                  </option>
                  <option value="Eligible">Eligible</option>
                  <option value="Not Eligible">Not Eligible</option>
                  <option value="Not Eligible But Interested">
                    Not Eligible But Interested
                  </option>
                </select>
              </div>
            </div>
          </div>

          <div className="col-md-6">
            <div className="mb-1 row">
              <label className="col-sm-4 col-form-label">Candidate Email</label>
              <div className="col-sm-8">
                <input
                  type="text"
                  style={{ width: "300px" }}
                  name="lineUp.candidateEmail"
                  value={callingTracker.lineUp?.candidateEmail}
                  className="form-control mb-3"
                />
              </div>
            </div>

            <div className="mb-1 row">
              <label className="col-sm-4 col-form-label">Current Company</label>
              <div className="col-sm-8">
                <input
                  type="text"
                  style={{ width: "300px" }}
                  name="lineUp.companyName"
                  value={callingTracker.lineUp?.companyName}
                  onChange={handleChange}
                  className="form-control mb-3"
                />
              </div>
            </div>

            <div className="mb-1 row">
              <label className="col-sm-4 col-form-label">Total Experince</label>
              <div className="col-sm-8">
                <input
                  type="text"
                  style={{ width: "300px" }}
                  name="lineUp.totalExperience"
                  value={callingTracker.lineUp?.totalExperience}
                    onChange={handleChange}

                  className="form-control mb-3"
                />
              </div>
            </div>

            <div className="mb-1 row">
              <label className="col-sm-4 col-form-label">Current CTC</label>
              <div className="col-sm-8">
                <input
                  type="text"
                  style={{ width: "300px" }}
                  name="lineUp.currentCTC"
                  value={callingTracker.lineUp?.currentCTC}
                  onChange={handleChange}

                  className="form-control mb-3"
                />
              </div>
            </div>

            <div className="mb-1 row">
              <label className="col-sm-4 col-form-label">Expected CTC</label>
              <div className="col-sm-8">
                <input
                  type="text"
                  style={{ width: "300px" }}
                  name="lineUp.expectedCTC"
                  value={callingTracker.lineUp?.expectedCTC}
                  onChange={handleChange}

                  className="form-control mb-3"
                />
              </div>
            </div>

            <div className="mb-1 row">
              <label className="col-sm-4 col-form-label">Notice Period</label>
              <div className="col-sm-8">
                <input
                  type="text"
                  style={{ width: "300px" }}
                  name="lineUp.noticePeriod"
                  value={callingTracker.lineUp?.noticePeriod}
                  onChange={handleChange}

                  className="form-control mb-3"
                />
              </div>
            </div>

            <div className="mb-1 row">
              <label className="col-sm-4 col-form-label">
                Any Offere letter{" "}
              </label>
              <div className="col-sm-8">
                <input
                  type="text"
                  style={{ width: "300px" }}
                  name="lineUp.holdingAnyOffer"
                  value={callingTracker.lineUp?.holdingAnyOffer}
                  onChange={handleChange}

                  className="form-control mb-3"
                />
              </div>
            </div>

            <div className="mb-1 row">
              <label className="col-sm-4 col-form-label">
                Current Location
              </label>
              <div className="col-sm-8">
                <input
                  type="text"
                  style={{ width: "300px" }}
                  name="lineUp.currentLocation"
                  value={callingTracker.lineUp?.currentLocation}
                  onChange={handleChange}

                  className="form-control mb-3"
                />
              </div>
            </div>

            <div className="mb-1 row">
              <label className="col-sm-4 col-form-label">Final Feedback</label>
              <div className="col-sm-8">
                <input
                  type="text"
                  style={{ width: "300px" }}
                  name="feedBack"
                  value={callingTracker.lineUp?.feedBack}

                  onChange={handleChange}

                />
              </div>
            </div>

            <div className="mb-1 row">
              <label className="col-sm-4 col-form-label">
                Availble For Interview
              </label>
              <div className="col-sm-8">
                <input
                  type="date"
                  style={{ width: "300px" }}
                  name="lineUp.availabilityForInterview}"
                  value={callingTracker.lineUp?.availabilityForInterview}
                  onChange={handleChange}

                  className="form-control mb-3"
                />
              </div>
            </div>

            <div className="mb-1 row">
              <label className="col-sm-4 col-form-label">Final Status</label>
              <div className="col-sm-8">
                <select
                  type="text"
                  style={{ width: "300px" }}
                  name="lineUp.finalStatus"
                  value={callingTracker.lineUp?.finalStatus}
                  onChange={handleChange}
                  className="form-control mb-3"
                >
                  <option value=""></option>
                  <option value="Shortlisted">Shortlisted</option>
                  <option value="rejected">Rejected</option>
                  <option value="hold">hold</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {showAlert && ( // Display alert only if showAlert is true
          <div className="alert alert-success" role="alert">
            Data updated successfully!
          </div>
        )}

        <button type="submit" className="btn btn-dark">
          Update Data
        </button>
      </form>
    </div>
  );
};

UpdateCallingTracker.propTypes = {
  initialData: PropTypes.object,
};

export default UpdateCallingTracker;
