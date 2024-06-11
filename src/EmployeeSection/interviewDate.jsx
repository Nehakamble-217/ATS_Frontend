
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./interviewDate.css";
import ShortListedCandidates from "../CandidateSection/ShortListedCandidate";
import UpdateCallingTracker from "./UpdateSelfCalling";

const InterviewDates = ({ toggleShowShortListedCandidateData }) => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [interviewData, setInterviewData] = useState(null);
  const [interviewDates, setInterviewDates] = useState([]);
  const [showAllData, setShowAllData] = useState(false);
  const [noDataMessage, setNoDataMessage] = useState(false);

  const [feedbackOptions] = useState([
    "Shortlisted For Hr Round",
    "Shortlisted For Technical Round",
    "Shortlisted For L1 Round",
    "Shortlisted For L2 Round",
    "Shortlisted For L3 Round",
    "Selected",
    "Rejected",
    "No Show",
    "Result Pending",
    "Hold"
  ]);
  const [updateSuccess, setUpdateSuccess] = useState(false);

  const navigate = useNavigate();
  const { employeeId } = useParams();
  const employeeIdNew = parseInt(employeeId, 10);
  console.log(employeeIdNew + " Interview ID");

  useEffect(() => {
    fetchInterviewDates();
  }, []);

  const fetchInterviewDates = async () => {
    try {
      const response = await fetch(
        `http://192.168.1.43:8891/api/ats/157industries/interview-date/${employeeIdNew}`
      );
      const data = await response.json();
      setInterviewDates(data);
    } catch (error) {
      console.error("Error fetching interview dates:", error);
    }
  };

  const handleDateChange = async (date) => {
    setSelectedDate(date);

    if (!date) {
      return;
    }

    const adjustedDate = new Date(date);
    adjustedDate.setHours(adjustedDate.getHours() + 10);

    const formattedDate = adjustedDate.toISOString().split("T")[0];
    console.log("Selected date:", formattedDate);

    try {
      const response = await fetch(
        `http://192.168.1.43:8891/api/ats/157industries/today-interview/${employeeIdNew}?date=${formattedDate}`
      );
      const data = await response.json();
      if (data.length === 0) {
        setNoDataMessage(true);
        setInterviewData(null);
      } else {
        setInterviewData(data);
        setNoDataMessage(false);
      }
      setShowAllData(false);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const updateInterviewStatus = async (candidateId, feedback) => {
    try {
      await fetch(
        `http://192.168.1.43:8891/api/ats/157industries/update-interview-status?id=${candidateId}&status=${feedback}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json"
          }
        }
      );
      console.log("Interview status updated successfully");
      setUpdateSuccess(true);
      setTimeout(() => {
        setUpdateSuccess(false);
      }, 2000);
    } catch (error) {
      console.error("Error updating interview status:", error);
    }
  };

  const handleFeedbackChange = async (candidateId, event) => {
    const feedback = event.target.value;
    await updateInterviewStatus(candidateId, feedback);
    await handleDateChange(selectedDate);
  };

  const handleInterviewResponseSubmit = async (
    event,
    candidateId,
    requirementId
  ) => {
    event.preventDefault();

    const interviewRound = event.target.querySelector('select[name="interviewRound"]').value;
    const interviewResponse = event.target.querySelector('select[name="interviewResponse"]').value;
    const responseUpdatedDate = event.target.querySelector('input[name="responseUpdatedDate"]').value;
    const nextInterviewDate = event.target.querySelector('input[name="nextInterviewDate"]').value;

    const data = {
      interviewRound,
      interviewResponse,
      responseUpdatedDate,
      nextInterviewDate,
      callingTracker: { candidateId },
      requirementInfo: { requirementId },
      employee: { employeeId: employeeIdNew }
    };

    try {
      const response = await fetch(
        "http://192.168.1.43:8891/api/ats/157industries/save-interview-response", data,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(data)
        }
      );
      if (response.ok) {
        console.log("Interview response saved successfully");
        setUpdateSuccess(true);
        await handleDateChange(selectedDate);
      } else {
        console.error(
          "Failed to save interview response:",
          response.statusText
        );
      }
    } catch (error) {
      console.error("Error saving interview response:", error);
    }
  };

  const renderInterviewTable = () => {
    if (!interviewData) {
      return (
        <h3 style={{ color: "red" }}>
          No data available for the selected date.
        </h3>
      );
    }

    return (
      <div className="App-after">
        {updateSuccess && (
          <div className="alert alert-success" role="alert">
            Status updated successfully!
          </div>
        )}
        <div className="attendanceTableData">
          <table className="attendance-table">
            <thead>
              <tr className="attendancerows-head">
                <th className="attendanceheading">Sr No.</th>
                <th className="attendanceheading">candidate Id</th>
                <th className="attendanceheading">Added Date</th>
                <th className="attendanceheading">Interview Date</th>
                <th className="attendanceheading">Interview Round</th>
                <th className="attendanceheading">Interview Response</th>
                <th className="attendanceheading">Response Update Date</th>
                <th className="attendanceheading">Next Interview Date</th>
                <th className="attendanceheading">Recruiter Name</th>
                <th className="attendanceheading">Candidate Name</th>
                <th className="attendanceheading">Position</th>
                <th className="attendanceheading">Company Name</th>
                <th className="attendanceheading">Contact Number</th>
                <th className="attendanceheading">Alternate Number</th>
                <th className="attendanceheading">Communication Rating</th>
                <th className="attendanceheading">Personal Feedback</th>
                <th className="attendanceheading">Calling Feedback</th>
                <th className="attendanceheading">Interested</th>
                <th className="attendanceheading">Candidate Email</th>
                <th className="attendanceheading">Your Current Company</th>
                <th className="attendanceheading">Current Location</th>
                <th className="attendanceheading">Current CTC</th>
                <th className="attendanceheading">Expected CTC</th>
                <th className="attendanceheading">Notice Period</th>
                <th className="attendanceheading">Total Experience</th>
                <th className="attendanceheading">Any Offer Letter</th>
                <th className="attendanceheading">Feedback</th>
                <th className="attendanceheading">Action</th>
              </tr>
            </thead>
            <tbody>
              {interviewData.map((item, index) => (
                <tr className="attendancerows" key={item.candidateId}>
                  <td className="tabledata">{index + 1}</td>
                  <td className="tabledata">{item.candidateId}</td>
                  <td className="tabledata">{item.date}</td>
                  <td className="tabledata">
                    {item.lineUp ? item.lineUp.availabilityForInterview : ""}
                  </td>
                  <td className="tabledata">
                    <select name="interviewRound" defaultValue="">
                      <option value="" disabled hidden>Select Round</option>
                      <option value="Hr Round">Hr Round</option>
                      <option value="Technical Round">Technical Round</option>
                      <option value="L1 Round">L1 Round</option>
                      <option value="L2 Round">L2 Round</option>
                      <option value="L3 Round">L3 Round</option>
                    </select>
                  </td>
                  <td className="tabledata">
                    <select name="interviewResponse" defaultValue="">
                      <option value="" disabled hidden>Select Response</option>
                      {feedbackOptions.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td className="tabledata">
                    <input
                      type="date"
                      name="responseUpdatedDate"
                      className="form-control"
                    />
                  </td>
                  <td className="tabledata">
                    <input
                      type="date"
                      name="nextInterviewDate"
                      className="form-control"
                    />
                  </td>
                  <td className="tabledata">{item.recruiterName}</td>
                  <td className="tabledata">{item.candidateName}</td>
                  <td className="tabledata">{item.position}</td>
                  <td className="tabledata">{item.requirementCompany}</td>
                  <td className="tabledata">{item.contactNumber}</td>
                  <td className="tabledata">{item.alternateNumber}</td>
                  <td className="tabledata">{item.communicationRating}</td>
                  <td className="tabledata">{item.personalFeedback}</td>
                  <td className="tabledata">{item.callingFeedback}</td>
                  <td className="tabledata">{item.selectYesOrNo}</td>
                  {item.lineUp && (
                    <>
                      <td className="tabledata">{item.lineUp.candidateEmail}</td>
                      <td className="tabledata">{item.lineUp.companyName}</td>
                      <td className="tabledata">{item.lineUp.currentLocation}</td>
                      <td className="tabledata">{item.lineUp.currentCTC}</td>
                      <td className="tabledata">{item.lineUp.expectedCTC}</td>
                      <td className="tabledata">{item.lineUp.noticePeriod}</td>
                      <td className="tabledata">{item.lineUp.totalExperience}</td>
                      <td className="tabledata">{item.lineUp.holdingAnyOffer}</td>
                      <td className="tabledata">{item.lineUp.feedBack}</td>
                    </>
                  )}
                  <td className="tabledata">
                    <i className="fa-solid fa-floppy-disk"></i>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  const tileContent = ({ date }) => {
    const tempdate = new Date(date);
    tempdate.setHours(tempdate.getHours() + 10);

    const formattedDate = tempdate.toISOString().split("T")[0];

    const isInterviewDate = interviewDates.includes(formattedDate);

    return isInterviewDate && <div className="highlighted-date"></div>;
  };

  return (
    <div className="calendar-container">
      <div className="calendar">
        <div className="calendar-div">
          <Calendar
            value={selectedDate}
            onChange={handleDateChange}
            tileContent={tileContent}
          />
        </div>
      </div>

      {!showAllData && interviewData && (
        <div className="interview-table">
          {renderInterviewTable()}
        </div>
      )}

      {!showAllData && noDataMessage && (
        <h3 style={{ color: "red" }}>No interviews scheduled on this date.</h3>
      )}
    </div>
  );
};

export default InterviewDates;

