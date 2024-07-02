import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import RightTick from "../photos/greenTick.jpg";
import "./afterSelection.css";

const AfterSelection = ({
  candidateId,
  employeeId,
  requirementId,
  onReturn,
}) => {
  useEffect(() => {
    console.log("Received Props:", { candidateId, employeeId, requirementId });
  }, [candidateId, employeeId, requirementId]);

  const [formSubmitted, setFormSubmitted] = useState(false);
  const [showJoinSuccessMessage, setShowJoinSuccessMessage] = useState(false);
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
  const [aadhaarCard, setAdharCardUploaded] = useState(false);
  const [panCard, setPanCardUploaded] = useState(false);
  const [drivingLicense, setDrivingLicenseUploaded] = useState(false);
  const [degreeMarkSheet, setDegreeMarksheetUploaded] = useState(false);
  const [hscMarkSheet, setHscMarksheetUploaded] = useState(false);
  const [sscMarkSheet, setSscMarksheetUploaded] = useState(false);

  const [shortListedData, setShortListedData] = useState([]);
  const [candidateData, setCandidateData] = useState(null);
  const [reasonForRejectionOfferLetter, setReasonForRejectionOfferLetter] =
    useState("");
  const [reasonForNotJoin, setReasonForNotJoin] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      await fetchCandidateData();
      await fetchCandidateTableData();
    };
    fetchData();
    JoininghandleSubmit();
  }, [candidateId]);

  const fetchCandidateData = async () => {
    try {
      const response = await fetch(
        `http://192.168.1.42:8891/api/ats/157industries/specific-data/${candidateId}`
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
    console.log(candidateId + "---candidateId");
    console.log(employeeId + "---> employeeId");
    console.log(requirementId + "-->requirementId");
    try {
      const response = await fetch(
        `http://192.168.1.42:8891/api/ats/157industries/fetch-after-selection?candidateId=${candidateId}&employeeId=${employeeId}&requirementId=${requirementId}`
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

  const handleAdharCardUpload = (e) => {
    const file = e.target.files[0];
    setAdharCardUploaded(file);
  };

  const handlePanCardUpload = (e) => {
    const file = e.target.files[0];
    setPanCardUploaded(file);
  };

  const handleDrivingLicenseUpload = (e) => {
    const file = e.target.files[0];
    setDrivingLicenseUploaded(file);
  };
  const handleDegreeMarksheetUpload = (e) => {
    const file = e.target.files[0];
    setDegreeMarksheetUploaded(file);
  };
  const handleHSCMarksheetUpload = (e) => {
    const file = e.target.files[0];
    setHscMarksheetUploaded(file);
  };
  const handleSSCMarksheetUpload = (e) => {
    const file = e.target.files[0];
    setSscMarksheetUploaded(file);
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
        "http://192.168.1.42:8891/api/ats/157industries/add-after-selection",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      setInquiryFormSubmitted(true);
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

  const JoininghandleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    formData.append("employeeId", employeeId);
    formData.append("candidateId", candidateId);
    formData.append("requirementId", requirementId);
    formData.append("mailReceived", mailReceived);

    if (aadhaarCard) formData.append("aadhaarCard", aadhaarCard);
    if (panCard) formData.append("panCard", panCard);
    if (drivingLicense) formData.append("drivingLicense", drivingLicense);
    if (degreeMarkSheet) formData.append("degreeMarkSheet", degreeMarkSheet);
    if (hscMarkSheet) formData.append("hscMarkSheet", hscMarkSheet);
    if (sscMarkSheet) formData.append("sscMarkSheet", sscMarkSheet);

    formData.append("offerLetterReceived", offerLetterReceived);
    formData.append("offerLetterAccepted", offerLetterAccepted);
    formData.append(
      "reasonForRejectionOfferLetter",
      reasonForRejectionOfferLetter
    );
    formData.append("joinStatus", joinStatus);
    formData.append("reasonForNotJoin", reasonForNotJoin);
    formData.append("joinDate", joinDate);

    try {
      const response = await fetch(
        "http://192.168.1.42:8891/api/ats/157industries/save-join-data",
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error(`Network response was not ok: ${response.statusText}`);
      }

      const contentType = response.headers.get("content-type");

      let result;
      if (contentType && contentType.includes("application/json")) {
        result = await response.json();
      } else {
        result = await response.text();
      }

      console.log("Response received:", result);

      if (
        (typeof result === "string" &&
          result.includes("Data Added successfully")) ||
        (result && result.success)
      ) {
        onReturn();
      } else {
        throw new Error("Unexpected response format or error status");
      }
    } catch (error) {
      console.error("Failed to submit form:", error);
    }
  };

  return (
    <div>
      <div className="join-container">
        <div className="after-head">
          <button
            className="after-button"
            onClick={() => setIsActiveInquiry(false)}
          >
            Joining Process
          </button>
          <button
            className="after-button"
            onClick={() => setIsActiveInquiry(true)}
          >
            Active Inquiry
          </button>
        </div>

        {!isActiveInquiry ? (
          <div className="after-main-div">
            <form className="Join-form-data" onSubmit={JoininghandleSubmit}>
              <div className="after-h3">
                <h3>Joining Processe </h3>
              </div>

              <div className="after-mail-div">
                <label htmlFor="mailReceived" className="after-label">
                  Mail Received:
                </label>
                <select
                  className="after-select"
                  id="mailReceived"
                  value={mailReceived}
                  onChange={handleMailReceivedChange}
                >
                  <option value="">Select Option</option>
                  <option className="as-nofilechosen" value="received">
                    Received
                  </option>
                  <option className="as-nofilechosen" value="notReceived">
                    Not Received
                  </option>
                </select>
              </div>

              <div className="after-documnet-main">
                <div className="after-documnet-sub">
                  <hr />
                  <div className="after-document-fisrt">
                    <div className="after-document-files">
                      <label htmlFor="adharCard" className="after-label">
                        Aadhar Card:
                      </label>

                      <input
                        type="file"
                        className="after-file-input"
                        onChange={handleAdharCardUpload}
                        name=""
                        id=""
                      />
                      {aadhaarCard && (
                        <span>
                          <img
                            style={{ width: "20px" }}
                            src={RightTick}
                            alt=""
                          />
                        </span>
                      )}
                    </div>

                    <div className="after-document-files">
                      <label htmlFor="panCard" className="after-label">
                        Pan Card:
                      </label>
                      <input
                        type="file"
                        className="after-file-input"
                        onChange={handlePanCardUpload}
                        name=""
                        id=""
                      />
                      {panCard && (
                        <span>
                          <img
                            style={{ width: "20px", marginLeft: "10px" }}
                            src={RightTick}
                            alt=""
                          />
                        </span>
                      )}
                    </div>

                    <div className="after-document-files">
                      <label htmlFor="degreeMarksheet" className="after-label">
                        Driving License:
                      </label>
                      <input
                        className="after-file-input"
                        type="file"
                        onChange={handleDrivingLicenseUpload}
                        name=""
                        id=""
                      />
                      {drivingLicense && (
                        <span>
                          <img
                            style={{ width: "20px", marginLeft: "10px" }}
                            src={RightTick}
                            alt=""
                          />
                        </span>
                      )}
                    </div>

                    <div className="after-document-files">
                      <label htmlFor="sscMarksheet" className="after-label">
                        Degree Marksheet:
                      </label>
                      <input
                        type="file"
                        name=""
                        onChange={handleDegreeMarksheetUpload}
                        className="after-file-input"
                        id=""
                      />
                      {degreeMarkSheet && (
                        <span>
                          <img
                            style={{ width: "20px", marginLeft: "10px" }}
                            src={RightTick}
                            alt=""
                          />
                        </span>
                      )}
                    </div>

                    <div className="after-document-files">
                      <label htmlFor="hscMarksheet" className="after-label">
                        HSC Marksheet:
                      </label>
                      <input
                        type="file"
                        name=""
                        onChange={handleHSCMarksheetUpload}
                        className="after-file-input"
                        id=""
                      />
                      {hscMarkSheet && (
                        <span>
                          <img
                            style={{ width: "20px", marginLeft: "10px" }}
                            src={RightTick}
                            alt=""
                          />
                        </span>
                      )}
                    </div>

                    <div className="after-document-files">
                      <label htmlFor="sscMarksheet" className="after-label">
                        SSC Marksheet:
                      </label>
                      <input
                        type="file"
                        onChange={handleSSCMarksheetUpload}
                        name=""
                        className="after-file-input"
                        id=""
                      />
                      {sscMarkSheet && (
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

                  <div className="after-document-fisrt">
                    <div className="after-mail-div">
                      <div className="after-lable-div">
                        <label
                          htmlFor="offerLetterAccepted"
                          className="after-label"
                        >
                          Offer Letter Accepted:
                        </label>
                      </div>

                      <select
                        id="offerLetterAccepted"
                        className="after-select"
                        value={offerLetterAccepted}
                        onChange={handleOfferLetterAcceptedChange}
                      >
                        <option value="">Select Option</option>
                        <option value="accepted">Yes</option>
                        <option value="notAccepted">No</option>
                      </select>
                    </div>

                    <div className="after-mail-div">
                      <div className="after-lable-div">
                        <label htmlFor="joinStatus" className="after-label">
                          Joining Status:
                        </label>
                      </div>

                      <select
                        id="joinStatus"
                        className="after-select"
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
                    <div className="after-mail-div">
                      <div className="after-lable-div">
                        <label
                          htmlFor="offerLetterReceived"
                          className="after-label"
                        >
                          Offer Letter Received:
                        </label>
                      </div>

                      <select
                        id="offerLetterReceived"
                        className="after-select"
                        value={offerLetterReceived}
                        onChange={handleOfferLetterReceivedChange}
                      >
                        <option value="">Select Option</option>
                        <option value="yes">Yes</option>
                        <option value="no">No</option>
                      </select>
                    </div>

                    <div className="after-mail-div">
                      <div className="after-lable-div">
                        <label className="after-label">
                          Reason for Not Accepting:
                        </label>
                      </div>

                      <input
                        type="text"
                        className="after-input"
                        id="joinReason"
                        value={joinReason}
                        onChange={(e) => setJoinReason(e.target.value)}
                      />
                    </div>

                    <div className="after-mail-div">
                      <div className="after-lable-div">
                        <label htmlFor="joinDate" className="after-label">
                          Join Date:
                        </label>
                      </div>

                      <input
                        type="date"
                        className="after-input"
                        id="joinDate"
                        value={joinDate}
                        onChange={(e) => setJoinDate(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div hidden className="after-mail-div">
                <label htmlFor="joinReason" className="after-label">
                  Reason for{" "}
                  {joinStatus === "drop" ? "Dropping" : "Not joining"}:
                </label>
                <input
                  type="text"
                  className="after-input"
                  id="joinReason"
                  value={joinReason}
                  onChange={(e) => setJoinReason(e.target.value)}
                />
              </div>

              <br />
              <button type="submit" className="after-button">
                Update Candidate
              </button>
              {showJoinSuccessMessage && (
                <div className="alert alert-success" role="alert">
                  Data Added Successfully!
                </div>
              )}
            </form>
          </div>
        ) : (
          <div>
            <div className="candidate-info">
              {candidateData ? (
                <div className="candidate-selectdata">
                  <table
                    id="studTables"
                    className="table text-center table-striped"
                  >
                    <tbody className="table-group-divider">
                      <tr id="table-row">
                        <th scope="col"> Recruiter Name:</th>
                        <td>{candidateData.recruiterName}</td>
                        <th scope="col">Candidate Name:</th>
                        <td> {candidateData.candidateName}</td>
                        <th scope="col"> Email:</th>
                        <td> {candidateData.candidateEmail}</td>
                      </tr>

                      <tr id="table-row">
                        <th scope="col"> Date of Birth:</th>
                        <td>{candidateData.lineUp?.dateOfBirth}</td>
                        <th scope="col">Placed Company:</th>
                        <td> {candidateData.requirementCompany}</td>
                        <th scope="col"> Location:</th>
                        <td> {candidateData.currentLocation}</td>
                      </tr>

                      <tr id="table-row">
                        <th scope="col">Gender</th>
                        <td>{candidateData.lineUp?.gender}</td>
                        <th scope="col">Qualification:</th>
                        <td> {candidateData.lineUp?.qualification} </td>
                        <th scope="col"> Year of Passing:</th>
                        <td> {candidateData.lineUp?.yearOfPassing} </td>
                      </tr>

                      <tr id="table-row">
                        <th scope="col">Pervious Company Name:</th>
                        <td>{candidateData.lineUp?.companyName}</td>
                        <th scope="col">Total Experience:</th>
                        <td> {candidateData.lineUp?.totalExperience} </td>
                        <th scope="col"> Notice Period:</th>
                        <td> {candidateData.lineUp?.noticePeriod} </td>
                      </tr>

                      <tr id="table-row">
                        <th scope="col">Position:</th>
                        <td>{candidateData.position}</td>
                        <th scope="col">Contact Number:</th>
                        <td> {candidateData.lineUp?.totalExperience} </td>
                        <th scope="col"> Alternate Number:</th>
                        <td> {candidateData.alternateNumber}</td>
                      </tr>

                      <tr id="table-row">
                        <th scope="col">Source Name :</th>
                        <td>{candidateData.sourceName}</td>
                        <th scope="col">Holding Any Offer :</th>
                        <td> {candidateData.lineUp?.holdingAnyOffer} </td>
                        <th scope="col"> Feedback:</th>
                        <td> {candidateData.lineUp?.feedBack}</td>
                      </tr>

                      <tr id="table-row">
                        <th style={{ color: "green", fontWeight: "bold" }}>
                          Join Date :
                        </th>
                        <td>dd-mm-yyyy</td>
                        <th scope="col">Date After 90 Days :</th>
                        <td> dd-mm-yyyy </td>
                        <th scope="col"> Days Remainig :</th>
                        <td style={{ color: "red", fontWeight: "bold" }}>
                          {" "}
                          dd-mm-yyyy
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              ) : (
                <p>Loading candidate data...</p>
              )}
            </div>
            <div className="form-select-div">
              <form onSubmit={handleSubmit}>
                <div className="after-mail-div">
                  <label style={{ paddingTop: "5px" }} className="after-label">
                    Active Status :
                  </label>

                  <select
                    id="activeStatus"
                    style={{ width: "400px" }}
                    className="after-select"
                    name="activeStatus"
                    value={activeStatus}
                    onChange={(e) => setActiveStatus(e.target.value)}
                  >
                    <option value="">Select</option>
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                </div>

                {activeStatus === "Active" && (
                  <table
                    className="attendance-table"
                    style={{ width: "1200px" }}
                  >
                    <thead>
                      <tr className="attendancerows">
                        <th className="attendanceheading">Call Number.</th>
                        <th className="attendanceheading">Call Date</th>
                        <th className="attendanceheading">
                          Office Environment
                        </th>
                        <th className="attendanceheading">Staff Behavior</th>
                        <th className="attendanceheading">Your Daily Work</th>
                        <th className="attendanceheading">Any Problem</th>
                        <th className="attendanceheading">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {shortListedData.map((item, index) => (
                        <tr key={index} className="attendancerows">
                          <td className="tabledata">{index + 1}</td>
                          <td className="tabledata">{item.callDate}</td>
                          <td className="tabledata">
                            {item.officeEnvironment}
                          </td>
                          <td className="tabledata">{item.staffBehavior}</td>
                          <td className="tabledata">{item.dailyImpact}</td>
                          <td className="tabledata">{item.anyProblem}</td>
                          <td className="tabledata">{item.activeStatus}</td>
                        </tr>
                      ))}
                      <tr className="attendancerows">
                        <td className="tabledata">😊</td>
                        <input
                          type="text"
                          hidden
                          name="candidateId"
                          value={candidateId}
                          id=""
                        />

                        <td className="tabledata">
                          <input
                            type="date"
                            className="form-control"
                            value={callDate}
                            onChange={(e) => setCallDate(e.target.value)}
                          />
                        </td>
                        <td className="tabledata">
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
                        <td className="tabledata">
                          <input
                            type="text"
                            className="form-control"
                            value={staffBehavior}
                            onChange={(e) => setStaffBehavior(e.target.value)}
                          />
                        </td>
                        <td className="tabledata">
                          <input
                            type="text"
                            className="form-control"
                            value={dailyWork}
                            onChange={(e) => setDailyWork(e.target.value)}
                          />
                        </td>
                        <td className="tabledata">
                          <input
                            type="text"
                            className="form-control"
                            value={problem}
                            onChange={(e) => setProblem(e.target.value)}
                          />
                        </td>
                        <td className="tabledata">
                          <select>
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
                  <div className="after-mail-div">
                    <div className="active-resone">
                      <label className="after-label">Reason :</label>
                    </div>
                    <select
                      name="inactiveReason"
                      id="inactiveReason"
                      style={{
                        width: inactiveReason === "Other" ? "150px" : "400px",
                      }}
                      className="after-select"
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
                      <div style={{ paddingLeft: "10px" }}>
                        <input
                          type="text"
                          placeholder="Enter reason"
                          value={otherReason}
                          style={{ width: "350px" }}
                          onChange={(e) => setOtherReason(e.target.value)}
                        />
                      </div>
                    )}
                  </div>
                )}

                <center>
                  {inquiryFormSubmitted && (
                    <div className="alert alert-success" role="alert">
                      Follow Up Data Added successfully!
                    </div>
                  )}
                  <button
                    type="submit"
                    style={{ marginTop: "25px" }}
                    className="after-button"
                  >
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
