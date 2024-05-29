import React, { useState, useEffect } from "react";
import "../CandidateSection/afterSelection.css";
import RightTick from "../LogoImages/Right.jpeg";
import { useNavigate, useParams } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const AfterSelection = () => {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [inquiryFormSubmitted, setInquiryFormSubmitted] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const [mailReceived, setMailReceived] = useState("");
  const [offerLetterReceived, setOfferLetterReceived] = useState("");
  const [offerLetterAccepted, setOfferLetterAccepted] = useState("");
  const [joinStatus, setJoinStatus] = useState("");
  const [joinDate, setJoinDate] = useState("");
  const [joinReason, setJoinReason] = useState("");
  const [isActiveInquiry, setIsActiveInquiry] = useState(false);
  const [callDate, setCallDate] = useState("");
  const [officeEnvironment, setOfficeEnvironment] = useState("");
  const [staffBehavior, setStaffBehavior] = useState("");
  const [dailyWork, setDailyWork] = useState("");
  const [problem, setProblem] = useState("");
  const [inactiveReason, setInactiveReason] = useState("");
  const [activeStatus, setActiveStatus] = useState("");
  const [otherReason, setOtherReason] = useState("");
  const [adharCardUploaded, setAdharCardUploaded] = useState(false);
  const [panCardUploaded, setPanCardUploaded] = useState(false);
  const [drivingLicenseUploaded, setDrivingLicenseUploaded] = useState(false);
  const [degreeMarksheetUplaoded, setDegreeMarksheetUploaded] = useState(false);
  const [hscMarksheetUplaoded, setHscMarksheetUploaded] = useState(false);
  const [sscMarksheetUplaoded, setSscMarksheetUploaded] = useState(false);

  const [shortListedData, setShortListedData] = useState([]);
  const [candidateData, setCandidateData] = useState(null);

  const { candidateId } = useParams();
  console.log(candidateId + " Candidate Id In Selection Form");
  const employeeId = 6;
  const requirementId = 4;

  useEffect(() => {
    const fetchData = async () => {
      await fetchCandidateData();
      await fetchCandidateTableData();
    };
    fetchData();
  }, [candidateId]);

  const fetchCandidateData = async () => {
    try {
      const response = await fetch(
        `http://192.168.1.33:8891/api/ats/157industries/specific-data/${candidateId}`
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setCandidateData(data);
    } catch (error) {
      console.error("Failed to fetch candidate data:", error);
    }
  };

  const fetchCandidateTableData = async () => {
    try {
      const response = await fetch(
        `http://192.268.1.33:8891/api/ats/157industries/fetch-after-selection?candidateId=${candidateId}&employeeId=${employeeId}&requirementId=${requirementId}`
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setShortListedData(data);
    } catch (error) {
      console.error("Failed to fetch candidate data:", error);
    }
  };

  const handleAdharCardUpload = () => {
    setAdharCardUploaded(true);
  };

  const handlePanCardUpload = () => {
    setPanCardUploaded(true);
  };

  const handleDrivingLicenseUpload = () => {
    setDrivingLicenseUploaded(true);
  };
  const handleDegreeMarksheetUpload = () => {
    setDegreeMarksheetUploaded(true);
  };
  const handleHSCMarksheetUpload = () => {
    setHscMarksheetUploaded(true);
  };
  const handleSSCMarksheetUpload = () => {
    setSscMarksheetUploaded(true);
  };

  const handleMailReceivedChange = (e) => {
    const received = e.target.value;
    setMailReceived(received);

    if (received === "received") {
      setOfferLetterReceived("yes");
    } else {
      setOfferLetterReceived("");
    }
  };

  const handleOfferLetterReceivedChange = (e) => {
    const received = e.target.value;
    setOfferLetterReceived(received);
    if (received === "yes") {
      setOfferLetterAccepted("");
    } else {
      setOfferLetterAccepted("");
    }
  };

  const handleOfferLetterAcceptedChange = (e) => {
    const accepted = e.target.value;
    setOfferLetterAccepted(accepted);
    if (accepted === "accepted") {
      setJoinStatus("join");
    } else {
      setJoinStatus("");
    }
  };

  const handleJoinStatusChange = (e) => {
    const status = e.target.value;
    setJoinStatus(status);
    if (status === "join") {
      setJoinReason("");
    } else {
      setJoinDate("");
    }
  };

  const handleInactiveReasonChange = (e) => {
    const reason = e.target.value;
    setInactiveReason(reason);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      candidateId: candidateId,
      employeeId: employeeId,
      requirementId: requirementId,
      activeStatus: activeStatus,
      callDate: callDate,
      officeEnvironment: officeEnvironment,
      staffBehavior: staffBehavior,
      dailyImpact: dailyWork,
      anyProblem: problem,
      inActiveReason: inactiveReason === "Other" ? otherReason : inactiveReason,
    };

    try {
      const response = await fetch(
        "http://192.168.1.33:8891/api/ats/157industries/save-inquiry-data",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      setInquiryFormSubmitted(true); // Set inquiryFormSubmitted to true on successful submission
      setFormSubmitted(true);
      setCallDate("");
      setOfficeEnvironment("");
      setStaffBehavior("");
      setDailyWork("");
      setProblem("");
      setInactiveReason("");
      setOtherReason("");
      setShowSuccessMessage(true);
      setShortListedData([...shortListedData, formData]);
      setTimeout(() => {
        setInquiryFormSubmitted(false);
      }, 3000);
    } catch (error) {
      console.error("Failed to submit form:", error);
      alert("An error occurred while submitting the form");
    }
  };

  return (
    <div>
      <div className="join-container mt-4">
        <h2>After Selection</h2>

        <div className="mb-4">
          <button
            className="btn btn-primary me-3"
            onClick={() => setIsActiveInquiry(false)}
          >
            Joining Process
          </button>
          <button
            className="btn btn-primary"
            onClick={() => setIsActiveInquiry(true)}
          >
            Active Inquiry
          </button>
        </div>

        {!isActiveInquiry ? (
          <form className="Join-form-data" onSubmit={handleSubmit}>
            <h3>Joining Process</h3>
            <hr />
            <div className="  mb-3">
              <div className="col-md-4">
                <label
                  htmlFor="mailReceived"
                  style={{ width: "800px" }}
                  className="form-label"
                >
                  Mail Received:
                </label>
                <select
                  id="mailReceived"
                  className="form-select"
                  value={mailReceived}
                  onChange={handleMailReceivedChange}
                >
                  <option value="">Select Option</option>
                  <option value="received">Received</option>
                  <option value="notReceived">Not Received</option>
                </select>
              </div>
            </div>
            {mailReceived === "received" && (
              <div className="row mb-3">
                <div className="col-md-12">
                  <h4>Document Submission</h4>
                  <div className="row mb-3">
                    <div className="col-md-4">
                      <label htmlFor="adharCard" className="form-label">
                        Adhar Card:
                      </label>
                      <input
                        type="file"
                        className="form-control"
                        onChange={handleAdharCardUpload}
                        name=""
                        id=""
                      />
                      {adharCardUploaded && (
                        <span>
                          <img
                            style={{ width: "20px", marginLeft: "10px" }}
                            src={RightTick}
                            alt=""
                          />
                        </span>
                      )}
                    </div>
                    <div className="col-md-4">
                      <label htmlFor="panCard" className="form-label">
                        Pan Card:
                      </label>
                      <input
                        type="file"
                        onChange={handlePanCardUpload}
                        className="form-control"
                        name=""
                        id=""
                      />
                      {panCardUploaded && (
                        <span>
                          <img
                            style={{ width: "20px", marginLeft: "10px" }}
                            src={RightTick}
                            alt=""
                          />
                        </span>
                      )}
                    </div>
                    <div className="col-md-4">
                      <label htmlFor="degreeMarksheet" className="form-label">
                        Driving License
                      </label>
                      <input
                        type="file"
                        onChange={handleDrivingLicenseUpload}
                        className="form-control"
                        name=""
                        id=""
                      />
                      {drivingLicenseUploaded && (
                        <span>
                          <img
                            style={{ width: "20px", marginLeft: "10px" }}
                            src={RightTick}
                            alt=""
                          />
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="row mb-3">
                    <div className="col-md-4">
                      <label htmlFor="sscMarksheet" className="form-label">
                        Degree Marksheet
                      </label>
                      <input
                        type="file"
                        name=""
                        onChange={handleDegreeMarksheetUpload}
                        className="form-control"
                        id=""
                      />
                      {degreeMarksheetUplaoded && (
                        <span>
                          <img
                            style={{ width: "20px", marginLeft: "10px" }}
                            src={RightTick}
                            alt=""
                          />
                        </span>
                      )}
                    </div>
                    <div className="col-md-4">
                      <label htmlFor="hscMarksheet" className="form-label">
                        HSC Marksheet:
                      </label>
                      <input
                        type="file"
                        name=""
                        onChange={handleHSCMarksheetUpload}
                        className="form-control"
                        id=""
                      />
                      {hscMarksheetUplaoded && (
                        <span>
                          <img
                            style={{ width: "20px", marginLeft: "10px" }}
                            src={RightTick}
                            alt=""
                          />
                        </span>
                      )}
                    </div>
                    <div className="col-md-4">
                      <label htmlFor="sscMarksheet" className="form-label">
                        SSC Marksheet:
                      </label>
                      <input
                        type="file"
                        onChange={handleSSCMarksheetUpload}
                        name=""
                        className="form-control"
                        id=""
                      />
                      {sscMarksheetUplaoded && (
                        <span>
                          <img
                            style={{ width: "20px", marginLeft: "10px" }}
                            src={RightTick}
                            alt=""
                          />
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}
            {mailReceived === "received" && (
              <div className="row mb-3">
                <div className="col-md-4">
                  <label htmlFor="offerLetterReceived" className="form-label">
                    Offer Letter Received:
                  </label>
                  <select
                    id="offerLetterReceived"
                    className="form-select"
                    value={offerLetterReceived}
                    onChange={handleOfferLetterReceivedChange}
                  >
                    <option value="">Select Option</option>
                    <option value="yes">Yes</option>
                    <option value="no">No</option>
                  </select>
                </div>
              </div>
            )}
            {offerLetterReceived === "yes" && (
              <div className="row mb-3">
                <div className="col-md-4">
                  <label htmlFor="offerLetterAccepted" className="form-label">
                    Offer Letter Accepted:
                  </label>
                  <select
                    id="offerLetterAccepted"
                    className="form-select"
                    value={offerLetterAccepted}
                    onChange={handleOfferLetterAcceptedChange}
                  >
                    <option value="">Select Option</option>
                    <option value="accepted">Yes</option>
                    <option value="notAccepted">No</option>
                  </select>
                </div>
              </div>
            )}

            {offerLetterAccepted === "accepted" && (
              <div className="row mb-3">
                <div className="col-md-4">
                  <label htmlFor="joinStatus" className="form-label">
                    Joining Status:
                  </label>
                  <select
                    id="joinStatus"
                    className="form-select"
                    value={joinStatus}
                    onChange={handleJoinStatusChange}
                  >
                    <option value="">Select Option</option>
                    <option value="join">Join</option>
                    <option value="drop">Drop</option>
                    <option value="hold">Hold</option>
                    <option value="toJoin">To Join</option>
                  </select>
                </div>
              </div>
            )}
            {offerLetterAccepted === "notAccepted" && (
              <div className="d-flex" style={{ width: "35%" }}>
                <label>Reason for Not Accepting :</label>
                <input
                  type="text"
                  className="form-control"
                  id="joinReason"
                  value={joinReason}
                  onChange={(e) => setJoinReason(e.target.value)}
                />
              </div>
            )}
            {joinStatus === "join" && (
              <div className="row mb-3">
                <div className="col-md-4">
                  <label htmlFor="joinDate" className="form-label">
                    Join Date:
                  </label>
                  <input
                    type="date"
                    className="form-control"
                    id="joinDate"
                    value={joinDate}
                    onChange={(e) => setJoinDate(e.target.value)}
                  />
                </div>
              </div>
            )}
            {joinStatus !== "join" && joinStatus !== "" && (
              <div className="row mb-3">
                <div className="col-md-12 d-flex" style={{ width: "35%" }}>
                  <label htmlFor="joinReason" className="form-label">
                    Reason for{" "}
                    {joinStatus === "drop" ? "Dropping" : "Not joining"}:
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="joinReason"
                    value={joinReason}
                    onChange={(e) => setJoinReason(e.target.value)}
                  />
                </div>
              </div>
            )}
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </form>
        ) : (
          <div>
            <center>
              <h2>90 Days Follow Up Data Inquiry Section</h2>
            </center>
            <hr />
            <div className="candidate-info">
              {candidateData ? (
                <div className="candidate-selectdata">
                  <div className="col-md-3">
                    <p className="no-space">
                      <strong>Recruiter Name:</strong>{" "}
                      {candidateData.recruiterName}
                    </p>
                    <p className="no-space">
                      <strong>Candidate Name:</strong>{" "}
                      {candidateData.candidateName}
                    </p>
                    <p className="no-space">
                      <strong>Email:</strong> {candidateData.candidateEmail}
                    </p>
                    <p className="no-space">
                      <strong>Date of Birth:</strong>{" "}
                      {candidateData.lineUp?.dateOfBirth}
                    </p>
                    <p className="no-space">
                      <strong>Placed Company:</strong>{" "}
                      {candidateData.requirementCompany}
                    </p>
                    <p className="no-space">
                      <strong>Location:</strong> {candidateData.currentLocation}
                    </p>
                  </div>
                  <div className="col-md-3">
                    <p className="no-space">
                      <strong>Gender:</strong> {candidateData.lineUp?.gender}
                    </p>
                    <p className="no-space">
                      <strong>Qualification:</strong>{" "}
                      {candidateData.lineUp?.qualification}
                    </p>
                    <p className="no-space">
                      <strong>Year of Passing:</strong>{" "}
                      {candidateData.lineUp?.yearOfPassing}
                    </p>
                    <p className="no-space">
                      <strong>Pervious Company Name:</strong>{" "}
                      {candidateData.lineUp?.companyName}
                    </p>
                    <p className="no-space">
                      <strong>Total Experience:</strong>{" "}
                      {candidateData.lineUp?.totalExperience}
                    </p>
                    <p className="no-space">
                      <strong>Notice Period:</strong>{" "}
                      {candidateData.lineUp?.noticePeriod}
                    </p>
                  </div>
                  <div className="col-md-3">
                    <p className="no-space">
                      <strong>Position:</strong> {candidateData.position}
                    </p>
                    <p className="no-space">
                      <strong>Contact Number:</strong>{" "}
                      {candidateData.contactNumber}
                    </p>
                    <p className="no-space">
                      <strong>Alternate Number:</strong>{" "}
                      {candidateData.alternateNumber}
                    </p>
                    <p className="no-space">
                      <strong>Source Name:</strong> {candidateData.sourceName}
                    </p>
                    <p className="no-space">
                      <strong>Holding Any Offer:</strong>{" "}
                      {candidateData.lineUp?.holdingAnyOffer}
                    </p>
                    <p className="no-space">
                      <strong>Feedback:</strong> {candidateData.lineUp?.feedBack}
                    </p>
                    <p className="no-space">
                      <strong style={{color:"green"}}>Join Date :</strong>
                    </p>
                    <p className="no-space">
                      <strong style={{color:"red"}}>End Date :</strong>
                    </p>
                  </div>
                </div>
              ) : (
                <p>Loading candidate data...</p>
              )}
            </div>
            <hr />

            <br />
            <div className="form-select-div">
              <form onSubmit={handleSubmit}>
                <h3>Inquriy Form</h3>
                <div className="mb-1 row">
                  <label
                    style={{ width: "150px" }}
                    className="col-sm-1 col-form-label"
                  >
                    Active Status :
                  </label>
                  <div className="col-sm-3">
                    <select
                      id="activeStatus"
                      style={{ width: "400px" }}
                      className="form-select mb-2"
                      name="activeStatus"
                      value={activeStatus}
                      onChange={(e) => setActiveStatus(e.target.value)}
                    >
                      <option value="">Select</option>
                      <option value="Active">Active</option>
                      <option value="Inactive">Inactive</option>
                    </select>
                  </div>
                </div>

                {activeStatus === "Active" && (
                  <table
                    className="table table-bordered"
                    style={{ width: "1500px" }}
                  >
                    <thead>
                      <tr>
                        <th scope="col">Call Number.</th>
                        <th scope="col">Call Date</th>
                        <th scope="col">Office Environment</th>
                        <th scope="col">Staff Behavior</th>
                        <th scope="col">Your Daily Work</th>
                        <th scope="col">Any Problem</th>
                        <th scope="col">Status</th>
                      </tr>
                    </thead>
                      <tbody>
                        {shortListedData.map((item, index) => (
                          <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{item.callDate}</td>
                            <td>{item.officeEnvironment}</td>
                            <td>{item.staffBehavior}</td>
                            <td>{item.dailyImpact}</td>
                            <td>{item.anyProblem}</td>
                            <td>{item.activeStatus}</td>
                          </tr>
                        ))}
                      <tr>
                        <td>😊</td>
                        <input
                          type="text"
                          hidden
                          name="candidateId"
                          value={candidateId}
                          id=""
                        />

                        <td>
                          <input
                            type="date"
                            className="form-control"
                            value={callDate}
                            onChange={(e) => setCallDate(e.target.value)}
                          />
                        </td>
                        <td>
                          <input
                            type="text"
                            id="officeEnvironment"
                            className="form-control"
                            value={officeEnvironment}
                            onChange={(e) =>
                              setOfficeEnvironment(e.target.value)
                            }
                          />
                        </td>
                        <td>
                          <input
                            type="text"
                            className="form-control"
                            value={staffBehavior}
                            onChange={(e) => setStaffBehavior(e.target.value)}
                          />
                        </td>
                        <td>
                          <input
                            type="text"
                            className="form-control"
                            value={dailyWork}
                            onChange={(e) => setDailyWork(e.target.value)}
                          />
                        </td>
                        <td>
                          <input
                            type="text"
                            className="form-control"
                            value={problem}
                            onChange={(e) => setProblem(e.target.value)}
                          />
                        </td>
                        <td>
                          <select className="form-control">
                            <option value="">select</option>
                            <option value="active">Active</option>
                            <option value="inactive">Inactive</option>
                          </select>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                )}

                {activeStatus === "Inactive" && (
                  <div className="mb-1 row">
                    <label
                      style={{ width: "150px" }}
                      className="col-sm-1 col-form-label"
                    >
                      Reason :
                    </label>
                    <div className="col-sm-3">
                      <select
                        name="inactiveReason"
                        style={{ width: "400px" }}
                        id="inactiveReason"
                        className="form-select mb-2"
                        value={inactiveReason}
                        onChange={handleInactiveReasonChange}
                      >
                        <option value="">Select</option>
                        <option value="Resigned">Resigned</option>
                        <option value="Terminated">Terminated</option>
                        <option value="Attrited">Attrited</option>
                        <option value="Ask Leave">Ask Leave</option>
                        <option value="Other">Other</option>
                      </select>
                      {inactiveReason === "Other" && (
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Enter reason"
                          value={otherReason}
                          onChange={(e) => setOtherReason(e.target.value)}
                        />
                      )}
                    </div>
                  </div>
                )}

                <center>
                  {inquiryFormSubmitted && (
                    <div className="alert alert-success" role="alert">
                      Follow Up Data Added successfully!
                    </div>
                  )}
                  <button type="submit" className="btn btn-primary">
                    Add Details
                  </button>
                </center>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AfterSelection;