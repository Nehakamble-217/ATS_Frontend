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
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const [interviewResponses, setInterviewResponses] = useState([]);
  const [showShortlistTable, setShowShortlistTable] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);

  const [candidateId, setCandidateId] = useState('');
  const [requirementId, setRequirementId] = useState('');

  const navigate = useNavigate();
  const { employeeId } = useParams();
  const employeeIdNew = parseInt(employeeId, 10);
  console.log(employeeIdNew + " Interview Page Employe ID");
  
  useEffect(() => {
    fetchInterviewDates();
  }, []);

  const fetchAndUpdateInterviewResponse = async (candidateId, requirementId) => {
    try {
      const response = await fetch(`http://192.168.1.35:8891/api/ats/157industries/interview-response/${candidateId}/${employeeIdNew}/${requirementId}`);
      const data = await response.json();
      if (Array.isArray(data)) {
        setInterviewResponses(data);
      } else {
        console.error("Invalid data received:", data);
        setInterviewResponses([]); 
      }
    } catch (error) {
      console.error("Error fetching interview response:", error);
      setInterviewResponses([]); 
    }
  };

  const fetchInterviewDates = async () => {
    try {
      const response = await fetch(
        `http://192.168.1.35:8891/api/ats/157industries/interview-date/${employeeIdNew}`
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
        `http://192.168.1.35:8891/api/ats/157industries/today-interview/${employeeIdNew}?date=${formattedDate}`
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

  const handleMonthChange = async (activeStartDate) => {
    if (activeStartDate) {
      const month = activeStartDate.getMonth() + 1;
      const year = activeStartDate.getFullYear();
      const monthString = `${year}-${month.toString().padStart(2, "0")}`;
      console.log("Selected month:", monthString);

      try {
        const response = await fetch(
          `http://192.168.1.35:8891/api/ats/157industries/fetch-by-month?id=${employeeIdNew}&month=${monthString}`
        );
        const data = await response.json();
        if (data.length === 0) {
          setNoDataMessage(true);
          setInterviewData(null);
        } else {
          setInterviewData(data);
          setNoDataMessage(false);
        }
        setShowAllData(true);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
  };


  const handleInterviewResponseSubmit = async (event) => {
    event.preventDefault();
  
    const interviewRound = event.target.querySelector('select[name="interviewRound"]').value;
    const interviewResponse = event.target.querySelector('select[name="interviewResponse"]').value;
    const responseUpdatedDate = event.target.querySelector('input[name="responseUpdatedDate"]').value;
    const nextInterviewDate = event.target.querySelector('input[name="nextInterviewDate"]').value;
    const nextInterviewTiming = event.target.querySelector('input[name="nextInterviewTiming"]').value;
  
    const data = {
      interviewRound,
      interviewResponse,
      responseUpdatedDate,
      nextInterviewDate,
      nextInterviewTiming,
      callingTracker: {
        candidateId
      },
      requirementInfo: {
        requirementId 
      },
      employee: {
        employeeId: employeeIdNew
      }
    };
  
    try {
      const response = await fetch("http://192.168.1.35:8891/api/ats/157industries/save-interview-response", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      });
      if (response.ok) {
        setFormSubmitted(true);
        console.log("Interview response saved successfully");
        setTimeout(() => {
          setFormSubmitted(false);
          setShowShortlistTable(false);
        }, 2000); 
      } else {
        console.error("Failed to save interview response:", response.statusText);
      }
    } catch (error) {
      console.error("Error saving interview response:", error);
    }
  };

  

  const handleFeedbackChange = async (candidateId, event) => {
    const feedback = event.target.value;
    await handleDateChange(selectedDate);
  };

  const renderInterviewTable = () => {
    if (!interviewData) {
      return (
        <h3 style={{ color: "#ffb281", marginTop: "20px" }}>
          No data available for the selected date.
        </h3>
      );
    }

    const handleMouseOver = (event) => {
      const tableData = event.currentTarget;
      const tooltip = tableData.querySelector('.tooltip');
      const tooltiptext = tableData.querySelector('.tooltiptext');

      if (tooltip && tooltiptext) {
        const textOverflowing = tableData.offsetWidth < tableData.scrollWidth || tableData.offsetHeight < tableData.scrollHeight;
        if (textOverflowing) {
          const rect = tableData.getBoundingClientRect();
          tooltip.style.top = `${rect.top - 10}px`;
          tooltip.style.left = `${rect.left + rect.width / 100}px`;
          tooltip.style.visibility = 'visible';
        } else {
          tooltip.style.visibility = 'hidden';
        }
      }
    };

    const handleMouseOut = (event) => {
      const tooltip = event.currentTarget.querySelector('.tooltip');
      if (tooltip) {
        tooltip.style.visibility = 'hidden';
      }
    };


    const handleRowClick = async (candidateId, requirementId) => {
      setCandidateId(candidateId);
      setRequirementId(requirementId);
      await fetchAndUpdateInterviewResponse(candidateId, requirementId);
      setShowShortlistTable(true);
    };
    
    


    return (
      <div className="App-after">
        <div className="attendanceTableData" id="interview-table-scroll">
          <table id="interviewDates-id" className="attendance-table">
            <thead>
              <tr className="attendancerows-head">
                <th className="attendanceheading">No</th>
                <th className="attendanceheading">Candidate Id</th>
                <th className="attendanceheading">Added Date</th>
                <th className="attendanceheading">Interview Date</th>
                <th className="attendanceheading">Interview Time</th>
                <th className="attendanceheading">Candidate Name</th>
                <th className="attendanceheading">Candidate Email</th>
                <th className="attendanceheading">Job Id</th>
                <th className="attendanceheading">Applying Position</th>
                <th className="attendanceheading">Applying Compnay</th>
                <th className="attendanceheading">Contact Number</th>
                <th className="attendanceheading">Current Location</th>
                <th className="attendanceheading">Current Company</th>
                <th className="attendanceheading">Total Experience</th>
                <th className="attendanceheading">Current CTC</th>
                <th className="attendanceheading">Expected CTC</th>
                <th className="attendanceheading">Notice Period</th>
                <th className="attendanceheading">Any Offer Letter</th>
                <th className="attendanceheading">Resume</th>
                <th className="attendanceheading">Incentive</th>
                <th className="attendanceheading">Interview Status</th>
                <th className="attendanceheading">Action</th>
              </tr>
            </thead>
            <tbody>
              {interviewData.map((item, index) => (
                <tr key={item.candidateId} className={item.candidateId === candidateId ? 'highlighted-row' : 'attendancerows'} onClick={() => handleRowClick(item.candidateId, item.requirementId)}>
                  <td className='tabledata'>{index + 1}</td>
                  <td className='tabledata' onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>
                    {item.candidateId}
                    <div className="tooltip">
                      <span className="tooltiptext">{item.candidateId}</span>
                    </div>
                  </td>
                  <td className='tabledata' onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>
                    {item.date}
                    <div className="tooltip">
                      <span className="tooltiptext">{item.date}</span>
                    </div>
                  </td>
                  <td className='tabledata' onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>
                    {item.lineUp.availabilityForInterview || "-"}
                    <div className="tooltip">
                      <span className="tooltiptext">{item.lineUp.availabilityForInterview}</span>
                    </div>
                  </td>


                  <td className='tabledata' onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>
                    {item.lineUp.interviewTime || "-"}
                    <div className="tooltip">
                      <span className="tooltiptext">{item.lineUp.interviewTime}</span>
                    </div>
                  </td>


                  <td className='tabledata' onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>
                    {item.candidateName}
                    <div className="tooltip">
                      <span className="tooltiptext">{item.candidateName}</span>
                    </div>
                  </td>

                  <td className='tabledata' onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>
                    {item.candidateEmail || "-"}
                    <div className="tooltip">
                      <span className="tooltiptext">{item.candidateEmail}</span>
                    </div>
                  </td>


                  <td className='tabledata' onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>
                    {item.requirementId || "-"}
                    <div className="tooltip">
                      <span className="tooltiptext">{item.requirementId}</span>
                    </div>
                  </td>


                  <td className='tabledata' onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>
                    {item.jobDesignation || "-"}
                    <div className="tooltip">
                      <span className="tooltiptext">{item.jobDesignation}</span>
                    </div>
                  </td>

                  <td className='tabledata' onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>
                    {item.requirementCompany || "-"}
                    <div className="tooltip">
                      <span className="tooltiptext">{item.requirementCompany}</span>
                    </div>
                  </td>

                  <td className='tabledata' onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>
                    {item.contactNumber || "-"}
                    <div className="tooltip">
                      <span className="tooltiptext">{item.contactNumber}</span>
                    </div>
                  </td>
                  <td className='tabledata' onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>
                    {item.currentLocation || "-"}
                    <div className="tooltip">
                      <span className="tooltiptext">{item.currentLocation}</span>
                    </div>
                  </td>
                  {item.lineUp && (
                    <>
                      <td className='tabledata' onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>
                        {item.lineUp.companyName || "-"}
                        <div className="tooltip">
                          <span className="tooltiptext">{item.lineUp.companyName}</span>
                        </div>
                      </td>
                      <td className='tabledata' onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>
                        {item.lineUp.experienceYear || "0"}
                        <div className="tooltip">
                          <span className="tooltiptext">{item.lineUp.experienceYear} </span>
                        </div>
                        Years
                        {item.lineUp.experienceMonth || "0"}
                        <div className="tooltip">
                          <span className="tooltiptext">{item.lineUp.experienceMonth}</span>
                        </div>
                        Months
                      </td>
                      <td className='tabledata' onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>
                        {`${item.lineUp.currentCTCLakh || 0} Lakh ${item.lineUp.currentCTCThousand || 0} Thousand`}
                        <div className="tooltip">
                          <span className="tooltiptext">{`${item.lineUp.expectedCTCLakh || 0} Lakh ${item.lineUp.expectedCTCThousand || 0} Thousand`}</span>
                        </div>
                      </td>
                      <td className='tabledata' onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>
                        {`${item.lineUp.expectedCTCLakh || 0} Lakh ${item.lineUp.expectedCTCThousand || 0} Thousand`}
                        <div className="tooltip">
                          <span className="tooltiptext">{`${item.lineUp.expectedCTCLakh || 0} Lakh ${item.lineUp.expectedCTCThousand || 0} Thousand`}</span>
                        </div>
                      </td>
                      <td className='tabledata' onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>
                        {item.lineUp.noticePeriod || "-"}
                        <div className="tooltip">
                          <span className="tooltiptext">{item.lineUp.noticePeriod}</span>
                        </div>
                      </td>
                      <td className='tabledata' onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>
                        {item.lineUp.holdingAnyOffer || "-"}
                        <div className="tooltip">
                          <span className="tooltiptext">{item.lineUp.holdingAnyOffer}</span>
                        </div>
                      </td>
                      <td className='tabledata' onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>
                        {item.lineUp.resume || "-"}
                        <div className="tooltip">
                          <span className="tooltiptext">{item.lineUp.resume}</span>
                        </div>
                      </td>
                      <td className='tabledata' onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>
                        {item.incentive || "-"}
                        <div className="tooltip">
                          <span className="tooltiptext">{item.incentive}</span>
                        </div>
                      </td>
                      <td className='tabledata' onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>
                        {item.lineUp.finalStatus || "-"}
                        <div className="tooltip">
                          <span className="tooltiptext">{item.lineUp.finalStatus}</span>
                        </div>
                      </td>
                      <td className='tabledata'>
                        <i onClick={() => { fetchAndUpdateInterviewResponse(item.candidateId, item.requirementId); setShowShortlistTable(!showShortlistTable); }}
                          className="fa-regular fa-pen-to-square"></i>


                      </td>
                    </>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  const tileContent = ({ date, view }) => {
    if (view === "month") {
      const tempdate = new Date(date);
      tempdate.setHours(tempdate.getHours() + 10);
      const formattedDate = tempdate.toISOString().split("T")[0];
      const isInterviewDate = interviewDates.includes(formattedDate);
      return isInterviewDate && <div className="highlighted-date"></div>;
    }
  };

  return (
    <div className="calendar-container">

      <div className="calender-main-div">
        <div className="calendar">

          <div className="calendar-div">
            <Calendar
              value={selectedDate}
              onChange={handleDateChange}
              onActiveStartDateChange={({ activeStartDate, view }) =>
                view === "month" && handleMonthChange(activeStartDate)
              }
              tileContent={tileContent}
            />
          </div>
        </div>
6
        {showShortlistTable && (
          <div className="shortlist-table-div">
            <div className="interview-response-update">
              <h6>Response Update-Candidate Name</h6>
            </div>
            <form onSubmit={handleInterviewResponseSubmit}>
              <table id="table-shortlisted" className="table table-bordered">
                <thead className="thead-dark">
                  <tr>
                    <th>No</th>
                    <th>Interview Date</th>
                    <th>Interview Round</th>
                    <th>Interview Response</th>
                    <th>Update Date</th>
                    <th>Next Interview Date</th>
                    <th> Interview Time</th>
                  </tr>
                </thead>
                <tbody>
                  {interviewResponses.map((response, index) => (
                    <tr key={index}>
                      <td >{index + 1}</td>
                      <td></td>
                      <td >{response.interviewRound}</td>
                      <td >{response.interviewResponse}</td>
                      <td >{response.responseUpdatedDate}</td>
                      <td >{response.nextInterviewDate}</td>
                      <td >{response.nextInterviewTiming}</td>
                    </tr>
                  ))}
                  <tr>


                    <td></td>
                    <td>
                     <p>take date by defult</p>
                    </td>

                    <td >
                      <select
                        name="interviewRound"
                        required
                      >
                        <option value="">Select Interview</option>
                        <option value="Hr Round">Hr Round</option>
                        <option value="Technical Round">Technical Round</option>
                        <option value="L1 Round"> L1 Round</option>
                        <option value="L2 Round"> L2 Round</option>
                        <option value="L3 Round"> L3 Round</option>
                      </select>
                    </td>
                    <td>
                      <select
                        name="interviewResponse"
                        required
                      >
                        <option value="">Update Response</option>
                        <option value="Shortlisted For Hr Round">Shortlisted For Hr Round</option>
                        <option value="Shortlisted For Technical Round">Shortlisted For Technical Round</option>
                        <option value="Shortlisted For L1 Round">Shortlisted For L1 Round</option>
                        <option value="Shortlisted For L2 Round">Shortlisted For L2 Round</option>
                        <option value="Shortlisted For L3 Round">Shortlisted For L3 Round</option>
                        <option value="Selected">Selected</option>
                        <option value="Rejected">Rejected</option>
                        <option value="Result Pending">Hold</option>
                        <option value="Result Pending">Result Pending</option>
                        <option value="No Show">No Show</option>
                      </select>
                    </td>
                    <td>
                      <input type="date" name="responseUpdatedDate" />
                    </td>
                    <td>
                      <input type="date" name="nextInterviewDate" />
                    </td>
                    <td>
                      <input type="time" name="nextInterviewTiming" />
                    </td>
                  </tr>

                </tbody>
              </table>
              {formSubmitted && (
                <div className="alert alert-success" role="alert">
                  Interview Response Updated Successfully!
                </div>
              )}
              <div className="shortlisted-submite-btn">
                <button type="submit">Update</button>
                <button onClick={() => setShowShortlistTable(false)}>Close</button>
              </div>
            </form>
          </div>
        )}
      </div>

      {!showAllData && interviewData && (
        <div className="interview-table">
          {renderInterviewTable()}
        </div>
      )}
      {showAllData && (
        <div className="interview-table">
          {renderInterviewTable()}
        </div>
      )}
      {!showAllData && noDataMessage && (
        <h3 style={{ color: "#ffb281" , marginTop:"20px" }}>No interviews scheduled on this date.</h3>
      )}
    </div>

  );
};

export default InterviewDates;

