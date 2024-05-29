// import React, { useState, useEffect } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import Calendar from "react-calendar";
// import "react-calendar/dist/Calendar.css";
// import "../EmployeeSection/interviewDate.css";

// const InterviewDates = () => {
//   const [selectedDate, setSelectedDate] = useState(new Date());
//   const [interviewData, setInterviewData] = useState(null);
//   const [interviewDates, setInterviewDates] = useState([]);
//   const [feedbackOptions] = useState([
//     "Shortlisted For Hr",
//     "Shortlisted For Technical",
//     "Shortlisted For L1",
//     "Shortlisted For L2",
//     "Shortlisted For L3",
//     "Selected",
//     "No Show",
//     "Result Pending",
//     "Hold"
//   ]);
//   const [updateSuccess, setUpdateSuccess] = useState(false);

//   const navigator = useNavigate();

//   const { employeeId } = useParams();
//   const employeeIdNew = parseInt(employeeId, 10);
//   console.log(employeeIdNew+ " Interview ID");

//   useEffect(() => {
//     fetchInterviewDates();
//   }, []);

//   const fetchInterviewDates = async () => {
//     try {
//       const response = await fetch(
//         `http://192.168.1.34:8891/api/ats/157industries/interview-date/${employeeIdNew}`
//       );
//       const data = await response.json();
//       setInterviewDates(data);
//     } catch (error) {
//       console.error("Error fetching interview dates:", error);
//     }
//   };

//   const handleDateChange = async (date) => {
//     setSelectedDate(date);

//     if (!date) {
//       return;
//     }

//     const adjustedDate = new Date(date);
//     adjustedDate.setHours(adjustedDate.getHours() + 10);

//     const formattedDate = adjustedDate.toISOString().split("T")[0];
//     console.log("Selected date:", formattedDate);

//     try {
//       const response = await fetch(
//         `http://192.168.1.34:8891/api/ats/157industries/today-interview/${employeeIdNew}?date=${formattedDate}`
//       );
//       const data = await response.json();
//       setInterviewData(data);
//     } catch (error) {
//       console.error("Error fetching data:", error);
//     }
//   };

//   const updateInterviewStatus = async (candidateId, feedback) => {
//     try {
//       await fetch(
//         `http://192.168.1.34:8891/api/ats/157industries/update-interview-status?id=${candidateId}&status=${feedback}`,
//         {
//           method: "PUT",
//           headers: {
//             "Content-Type": "application/json"
//           }
//         }
//       );
//       console.log("Interview status updated successfully");
//       setUpdateSuccess(true);
//       setTimeout(() => {
//         setUpdateSuccess(false);
//       }, 3000);
//     } catch (error) {
//       console.error("Error updating interview status:", error);
//     }
//   };

//   const handleFeedbackChange = async (candidateId, event) => {
//     const feedback = event.target.value;
//     await updateInterviewStatus(candidateId, feedback);
//     await handleDateChange(selectedDate);
//   };

//   const renderInterviewTable = () => {
//     if (!interviewData || interviewData.length === 0) {
//       return (
//         <h3 style={{ color: "red" }}>
//           No data available for the selected date.
//         </h3>
//       );
//     }

//     return (
//       <div className="calling-list-container">
//         {updateSuccess && (
//           <div className="alert alert-success" role="alert">
//             Status updated successfully!
//           </div>
//         )}
//         <div className="table-container">
//           <table className="calling-table">
//             <thead>
//               <tr>
//                 <th>Sr No.</th>
//                 <th>Added Date</th>
//                 <th>Interview Date</th>
//                 <th>Final Status</th>
//                 <th>Recruiter Name</th>
//                 <th>Candidate Name</th>
//                 <th>Position</th>
//                 <th>Company Name</th>
//                 <th>Contact Number</th>
//                 <th>Alternate Number</th>
//                 <th>Communication Rating</th>
//                 <th>Personal Feedback</th>
//                 <th>Calling Feedback</th>
//                 <th>Interested</th>
//                 <th>Candidate Email</th>
//                 <th>Your Current Company</th>
//                 <th>Current Location</th>
//                 <th>Current CTC</th>
//                 <th>Expected CTC</th>
//                 <th>Notice Period</th>
//                 <th>Total Experience</th>
//                 <th>Any Offer Letter</th>
//                 <th>Feedback</th>
                
//               </tr>
//             </thead>
//             <tbody>
//               {interviewData.map((item, index) => (
//                 <tr key={item.candidateId}>
//                   <td>{index + 1}</td>
//                   <td>{item.date}</td>
//                   <td>{item.lineUp.availabilityForInterview}</td>
//                   <td>
//                         <select
//                           value={item.lineUp.finalStatus}
//                           onChange={(event) =>
//                             handleFeedbackChange(item.candidateId, event)
//                           }
//                         >
//                           {feedbackOptions.map((option) => (
//                             <option key={option} value={option}>
//                               {option}
//                             </option>
//                           ))}
//                         </select>
//                       </td>
//                   <td>{item.recruiterName}</td>
//                   <td>{item.candidateName}</td>
//                   <td>{item.position}</td>
//                   <td>{item.requirementCompany}</td>
//                   <td>{item.contactNumber}</td>
//                   <td>{item.alternateNumber}</td>
//                   <td>{item.communicationRating}</td>
//                   <td>{item.personalFeedback}</td>
//                   <td>{item.callingFeedback}</td>
//                   <td>{item.selectYesOrNo}</td>
//                   {item.lineUp && (
//                     <>
//                       <td>{item.lineUp.candidateEmail}</td>
//                       <td>{item.lineUp.companyName}</td>
//                       <td>{item.lineUp.currentLocation}</td>
//                       <td>{item.lineUp.currentCTC}</td>
//                       <td>{item.lineUp.expectedCTC}</td>
//                       <td>{item.lineUp.noticePeriod}</td>
//                       <td>{item.lineUp.totalExperience}</td>
//                       <td>{item.lineUp.holdingAnyOffer}</td>
//                       <td>{item.lineUp.feedBack}</td>
                      
//                     </>
//                   )}
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     );
//   };

//   const tileContent = ({ date }) => {
//     const tempdate = new Date(date);
//     tempdate.setHours(tempdate.getHours() + 10);

//     const formattedDate = tempdate.toISOString().split("T")[0];

//     const isInterviewDate = interviewDates.includes(formattedDate);

//     return isInterviewDate && <div className="highlighted-date"></div>;
//   };

//   return (
//     <div className="calendar-container">
     
//       <div className="calendar">
//       <div className="calendar-div">
//       <Calendar
//           value={selectedDate}
//           onChange={handleDateChange}
//           tileContent={tileContent}
//         />
//          </div>
//           <div>
//           <h2 className="m-4">Todays Interviews</h2>
//           </div>
     
//       </div>

//       <div className="interview-table">
//         {interviewData && renderInterviewTable()}
//       </div>
//     </div>
//   );
// };

// export default InterviewDates;

import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./interviewDate.css";

const InterviewDates = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [interviewData, setInterviewData] = useState(null);
  const [interviewDates, setInterviewDates] = useState([]);
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

  const navigator = useNavigate();

  const { employeeId } = useParams();
  const employeeIdNew = parseInt(employeeId, 10);
  console.log(employeeIdNew + " Interview ID");

  useEffect(() => {
    fetchInterviewDates();
  }, []);

  const fetchInterviewDates = async () => {
    try {
      const response = await fetch(
        `http://192.168.1.33:8891/api/ats/157industries/interview-date/${employeeIdNew}`
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
        `http://192.168.1.33:8891/api/ats/157industries/today-interview/${employeeIdNew}?date=${formattedDate}`
      );
      const data = await response.json();
      setInterviewData(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const updateInterviewStatus = async (candidateId, feedback) => {
    try {
      await fetch(
        `http://192.168.1.33:8891/api/ats/157industries/update-interview-status?id=${candidateId}&status=${feedback}`,
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
        "http://192.168.1.33:8891/api/ats/157industries/save-interview-response",data,
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
        // Refresh interview data
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
    if (!interviewData || interviewData.length === 0) {
      return (
        <h3 style={{ color: "red" }}>
          No data available for the selected date.
        </h3>
      );
    }

    return (
      <div className="calling-list-container">
        {updateSuccess && (
          <div className="alert alert-success" role="alert">
            Status updated successfully!
          </div>
        )}
        <div className="table-container">
          <table className="calling-table">
            <thead>
              <tr>
                <th>Sr No.</th>
                <th>candidate Id</th>
                <th>Added Date</th>
                <th>Interview Date</th>
                <th>Interview Round</th>
                <th>Interview Response</th>
                <th>Response Update Date</th>
                <th>Next Interview Date</th>
                <th>Recruiter Name</th>
                <th>Candidate Name</th>
                <th>Position</th>
                <th>Company Name</th>
                <th>Contact Number</th>
                <th>Alternate Number</th>
                <th>Communication Rating</th>
                <th>Personal Feedback</th>
                <th>Calling Feedback</th>
                <th>Interested</th>
                <th>Candidate Email</th>
                <th>Your Current Company</th>
                <th>Current Location</th>
                <th>Current CTC</th>
                <th>Expected CTC</th>
                <th>Notice Period</th>
                <th>Total Experience</th>
                <th>Any Offer Letter</th>
                <th>Feedback</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {interviewData.map((item, index) => (
                <tr key={item.candidateId}>
                  <td>{index + 1}</td>
                  <td>{item.candidateId}</td>
                  <td>{item.date}</td>
                  <td>
                    {item.lineUp ? item.lineUp.availabilityForInterview : ""}
                  </td>
                  <td>
                    <select name="interviewRound" defaultValue="">
                      <option value="" disabled hidden>Select Round</option>
                      <option value="Hr Round">Hr Round</option>
                      <option value="Technical Round">Technical Round</option>
                      <option value="L1 Round">L1 Round</option>
                      <option value="L2 Round">L2 Round</option>
                      <option value="L3 Round">L3 Round</option>
                    </select>
                  </td>
                  <td>
                    <select name="interviewResponse" defaultValue="">
                      <option value="" disabled hidden>Select Response</option>
                      {feedbackOptions.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td>
                    <input
                      type="date"
                      name="responseUpdatedDate"
                      className="form-control"
                    />
                  </td>
                  <td>
                    <input
                      type="date"
                      name="nextInterviewDate"
                      className="form-control"
                    />
                  </td>
                  <td>{item.recruiterName}</td>
                  <td>{item.candidateName}</td>
                  <td>{item.position}</td>
                  <td>{item.requirementCompany}</td>
                  <td>{item.contactNumber}</td>
                  <td>{item.alternateNumber}</td>
                  <td>{item.communicationRating}</td>
                  <td>{item.personalFeedback}</td>
                  <td>{item.callingFeedback}</td>
                  <td>{item.selectYesOrNo}</td>
                  {item.lineUp && (
                    <>
                      <td>{item.lineUp.candidateEmail}</td>
                      <td>{item.lineUp.companyName}</td>
                      <td>{item.lineUp.currentLocation}</td>
                      <td>{item.lineUp.currentCTC}</td>
                      <td>{item.lineUp.expectedCTC}</td>
                      <td>{item.lineUp.noticePeriod}</td>
                      <td>{item.lineUp.totalExperience}</td>
                      <td>{item.lineUp.holdingAnyOffer}</td>
                      <td>{item.lineUp.feedBack}</td>
                    </>
                  )}
                  <td>
                    <button
                      className="calender-saveresponse"
                      // onClick={(event) =>
                      //   handleInterviewResponseSubmit(
                      //     event,
                      //     item.candidateId,
                      //     item.requirementId
                      //   )
                      // }
                    >
                      Save Response
                    </button>
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
        <div>
          <h2 className="m-4">Todays Interviews 11</h2>
        </div>
      </div>

      <div className="interview-table">
        {interviewData && renderInterviewTable()}
      </div>
    </div>
  );
};

export default InterviewDates;