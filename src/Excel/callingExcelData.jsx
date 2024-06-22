import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
//import '../Upload3/Upload3.css'; // Uncomment and provide the correct path to your CSS file
//import UpdateCallingTracker from "./UpdateSelfCalling"; // Uncomment and provide the correct path to your UpdateCallingTracker component

const LineUpList = ({ updateState, funForGettingCandidateId }) => {
  const [callingList, setCallingList] = useState([]);
  const { employeeId } = useParams();
  console.log(employeeId);
  

  const [showUpdateCallingTracker, setShowUpdateCallingTracker] = useState(false);
  const [selectedCandidateId, setSelectedCandidateId] = useState(null);


  const navigate = useNavigate();

  
  useEffect(() => {
    fetch(`http://192.168.1.38:8891/api/ats/157industries/all-Data/6`)
      .then((response) => response.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setCallingList(data);
        } else {
          console.error("Fetched data is not an array:", data);
        }
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, [employeeId]);

  const handleUpdate = (candidateId) => {
    setSelectedCandidateId(candidateId);
    setShowUpdateCallingTracker(true);
  };

  const handleUpdateSuccess = () => {
    setShowUpdateCallingTracker(false);
    fetch(`http://192.168.1.38:8891/api/ats/157industries/all-Data/6`)
      .then((response) => response.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setCallingList(data);
        } else {
          console.error("Fetched data is not an array:", data);
        }
      })
      .catch((error) => console.error("Error fetching data:", error));
  };

  const handleMouseOver = (event) => {
    const tooltip = event.currentTarget.querySelector('.tooltip');
    if (tooltip) {
      const rect = event.currentTarget.getBoundingClientRect();
      const tooltipRect = tooltip.getBoundingClientRect();
      const tooltipWidth = tooltipRect.width;
      const tooltipHeight = tooltipRect.height;
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;

      let top = rect.top - tooltipHeight + 40; // above the cell
      let left = rect.left + (rect.width - tooltipWidth) / 2; // centered horizontally

      if (top < 0) top = rect.bottom + 5; // below the cell
      if (left < 0) left = 5; // align to the left edge
      if (left + tooltipWidth > viewportWidth) left = viewportWidth - tooltipWidth - 5; // align to the right edge

      tooltip.style.top = `${top}px`;
      tooltip.style.left = `${left}px`;
      tooltip.classList.add('visible');
    }
  };

  const handleMouseOut = (event) => {
    const tooltip = event.currentTarget.querySelector('.tooltip');
    if (tooltip) {
      tooltip.classList.remove('visible');
    }
  };

  return (
    <div className="calling-list-container">
      {!showUpdateCallingTracker ? (
        <div className="attendanceTableData">
          <h5 style={{ color: "gray" }}>Line Up List</h5>
          <table className="attendance-table">
            <thead>
              <tr className="attendancerows-head">
                <th className="attendanceheading">Sr No.</th>
                <th className="attendanceheading">Date</th>
                <th className="attendanceheading">Time</th>
                <th className="attendanceheading">Candidate Id</th>
                <th className="attendanceheading">Recruiter Name</th>
                <th className="attendanceheading">Candidate Name</th>
                <th className="attendanceheading">Candidate Email</th>
                <th className="attendanceheading">Contact Number</th>
                <th className="attendanceheading">Alternate Number</th>
                <th className="attendanceheading">sourceName</th>
                <th className="attendanceheading">job Designation</th>
                <th className="attendanceheading">Job Id</th>
                <th className="attendanceheading">Applying Company</th>
                <th className="attendanceheading">Communication Rating</th>
                <th className="attendanceheading">Current Location</th>
                <th className="attendanceheading">Full Address</th>
                <th className="attendanceheading">Calling Feedback</th>
                <th className="attendanceheading">Incentive</th>
                <th className="attendanceheading">Interseed or Not</th>
                <th className="attendanceheading">Current Company</th>
                <th className="attendanceheading">Total Experience</th>
                <th className="attendanceheading">relevantExperience</th>
                <th className="attendanceheading">Current CTC</th>
                <th className="attendanceheading">Expected CTC</th>
                <th className="attendanceheading">Date Of Birth</th>
                <th className="attendanceheading">Gender</th>
                <th className="attendanceheading">Qualification</th>
                <th className="attendanceheading">Year Of Passing</th>
                <th className="attendanceheading">Extra Certification</th>
                <th className="attendanceheading">Feed Back</th>
                <th className="attendanceheading">Holding Any Offer</th>
                <th className="attendanceheading">Offer Letter Msg</th>
                <th className="attendanceheading">Resume</th>
                <th className="attendanceheading">NoticePeriod</th>
                <th className="attendanceheading">Msg For TeamLeader</th>
                <th className="attendanceheading">Availability For Interview</th>
                <th className="attendanceheading">Interview Time</th>
                <th className="attendanceheading">Final Status</th>
                <th className="attendanceheading">Action</th>
              </tr>
            </thead>
            <tbody>
              {Array.isArray(callingList) && callingList.map((item, index) => (
                <tr key={item.candidateId} className="attendancerows">
                  <td className="tabledata">{index + 1}</td>
                  <td className="tabledata" onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>
                    {item.date}
                    <div className="tooltip">
                      <span className="tooltiptext">{item.date}</span>
                    </div>
                  </td>
                  <td className="tabledata" onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>
                    {item.candidateAddedTime || "-"}
                    <div className="tooltip">
                      <span className="tooltiptext">{item.candidateAddedTime}</span>
                    </div>
                  </td>
                  <td className="tabledata" onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>
                    {item.candidateId}
                    <div className="tooltip">
                      <span className="tooltiptext">{item.candidateId}</span>
                    </div>
                  </td>
                  <td className="tabledata" onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>
                    {item.recruiterName}
                    <div className="tooltip">
                      <span className="tooltiptext">{item.recruiterName}</span>
                    </div>
                  </td>
                  <td className="tabledata" onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>
                    {item.candidateName}
                    <div className="tooltip">
                      <span className="tooltiptext">{item.candidateName}</span>
                    </div>
                  </td>
                  <td className="tabledata" onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>
                    {item.candidateEmail || "-"}
                    <div className="tooltip">
                      <span className="tooltiptext">{item.candidateEmail}</span>
                    </div>
                  </td>
                  <td className="tabledata" onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>
                    {item.contactNumber || "-"}
                    <div className="tooltip">
                      <span className="tooltiptext">{item.contactNumber}</span>
                    </div>
                  </td>
                  <td className="tabledata" onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>
                    {item.alternateNumber || 0}
                    <div className="tooltip">
                      <span className="tooltiptext">{item.alternateNumber}</span>
                    </div>
                  </td>
                  <td className="tabledata" onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>
                    {item.sourceName || 0}
                    <div className="tooltip">
                      <span className="tooltiptext">{item.sourceName}</span>
                    </div>
                  </td>
                  <td className="tabledata" onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>
                    {item.jobDesignation}
                    <div className="tooltip">
                      <span className="tooltiptext">{item.jobDesignation}</span>
                    </div>
                  </td>
                  <td className="tabledata" onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>
                    {item.jobId}
                    <div className="tooltip">
                      <span className="tooltiptext">{item.jobId}</span>
                    </div>
                  </td>
                  <td className="tabledata" onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>
                    {item.applyingCompany}
                    <div className="tooltip">
                      <span className="tooltiptext">{item.applyingCompany}</span>
                    </div>
                  </td>
                  <td className="tabledata" onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>
                    {item.communicationRating}
                    <div className="tooltip">
                      <span className="tooltiptext">{item.communicationRating}</span>
                    </div>
                  </td>
                  <td className="tabledata" onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>
                    {item.currentLocation}
                    <div className="tooltip">
                      <span className="tooltiptext">{item.currentLocation}</span>
                    </div>
                  </td>
                  <td className="tabledata" onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>
                    {item.fullAddress}
                    <div className="tooltip">
                      <span className="tooltiptext">{item.fullAddress}</span>
                    </div>
                  </td>
                  <td className="tabledata" onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>
                    {item.callingFeedback}
                    <div className="tooltip">
                      <span className="tooltiptext">{item.callingFeedback}</span>
                    </div>
                  </td>
                  <td className="tabledata" onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>
                    {item.incentive || 0}
                    <div className="tooltip">
                      <span className="tooltiptext">{item.incentive}</span>
                    </div>
                  </td>
                  <td className="tabledata" onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>
                    {item.interseedOrNot}
                    <div className="tooltip">
                      <span className="tooltiptext">{item.interseedOrNot}</span>
                    </div>
                  </td>
                  <td className="tabledata" onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>
                    {item.currentCompany || "-"}
                    <div className="tooltip">
                      <span className="tooltiptext">{item.currentCompany}</span>
                    </div>
                  </td>
                  <td className="tabledata" onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>
                    {item.totalExperience || 0}
                    <div className="tooltip">
                      <span className="tooltiptext">{item.totalExperience}</span>
                    </div>
                  </td>
                  <td className="tabledata" onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>
                    {item.relevantExperience || 0}
                    <div className="tooltip">
                      <span className="tooltiptext">{item.relevantExperience}</span>
                    </div>
                  </td>
                  <td className="tabledata" onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>
                    {item.currentCtc || 0}
                    <div className="tooltip">
                      <span className="tooltiptext">{item.currentCtc}</span>
                    </div>
                  </td>
                  <td className="tabledata" onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>
                    {item.expectedCtc || 0}
                    <div className="tooltip">
                      <span className="tooltiptext">{item.expectedCtc}</span>
                    </div>
                  </td>
                  <td className="tabledata" onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>
                    {item.dateOfBirth || "-"}
                    <div className="tooltip">
                      <span className="tooltiptext">{item.dateOfBirth}</span>
                    </div>
                  </td>
                  <td className="tabledata" onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>
                    {item.gender || "-"}
                    <div className="tooltip">
                      <span className="tooltiptext">{item.gender}</span>
                    </div>
                  </td>
                  <td className="tabledata" onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>
                    {item.qualification || "-"}
                    <div className="tooltip">
                      <span className="tooltiptext">{item.qualification}</span>
                    </div>
                  </td>
                  <td className="tabledata" onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>
                    {item.yearOfPassing || "-"}
                    <div className="tooltip">
                      <span className="tooltiptext">{item.yearOfPassing}</span>
                    </div>
                  </td>
                  <td className="tabledata" onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>
                    {item.extraCertification || "-"}
                    <div className="tooltip">
                      <span className="tooltiptext">{item.extraCertification}</span>
                    </div>
                  </td>
                  <td className="tabledata" onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>
                    {item.feedBack || "-"}
                    <div className="tooltip">
                      <span className="tooltiptext">{item.feedBack}</span>
                    </div>
                  </td>
                  <td className="tabledata" onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>
                    {item.holdingAnyOffer || "-"}
                    <div className="tooltip">
                      <span className="tooltiptext">{item.holdingAnyOffer}</span>
                    </div>
                  </td>
                  <td className="tabledata" onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>
                    {item.offerLetterMsg || "-"}
                    <div className="tooltip">
                      <span className="tooltiptext">{item.offerLetterMsg}</span>
                    </div>
                  </td>
                  <td className="tabledata" onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>
                    {item.resume || "-"}
                    <div className="tooltip">
                      <span className="tooltiptext">{item.resume}</span>
                    </div>
                  </td>
                  <td className="tabledata" onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>
                    {item.noticePeriod || 0}
                    <div className="tooltip">
                      <span className="tooltiptext">{item.noticePeriod}</span>
                    </div>
                  </td>
                  <td className="tabledata" onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>
                    {item.msgForTeamLeader || "-"}
                    <div className="tooltip">
                      <span className="tooltiptext">{item.msgForTeamLeader}</span>
                    </div>
                  </td>
                  <td className="tabledata" onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>
                    {item.availabilityForInterview || "-"}
                    <div className="tooltip">
                      <span className="tooltiptext">{item.availabilityForInterview}</span>
                    </div>
                  </td>
                  <td className="tabledata" onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>
                    {item.interviewTime || "-"}
                    <div className="tooltip">
                      <span className="tooltiptext">{item.interviewTime}</span>
                    </div>
                  </td>
                  <td className="tabledata" onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>
                    {item.finalStatus || "-"}
                    <div className="tooltip">
                      <span className="tooltiptext">{item.finalStatus}</span>
                    </div>
                  </td>
                  <td className="tabledata">
                    <button
                      className="update-button"
                      onClick={() => handleUpdate(item.candidateId)}
                    >
                      Update
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        // Assuming UpdateCallingTracker is correctly imported and available
        <UpdateCallingTracker
          candidateId={selectedCandidateId}
          onSuccess={handleUpdateSuccess}
          onCancel={() => setShowUpdateCallingTracker(false)}
        />
      )}
    </div>
  );
};

export default LineUpList;
