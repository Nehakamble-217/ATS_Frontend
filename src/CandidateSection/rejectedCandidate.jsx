
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import'./rejectedcandidate.css'
import UpdateCallingTracker from "../EmployeeSection/UpdateSelfCalling";

const RejectedCandidate = ({ updateState, funForGettingCandidateId }) => {
  const [showRejectedData, setShowRejectedData] = useState([]);
  const [showUpdateCallingTracker, setShowUpdateCallingTracker] = useState(false);
  const [selectedCandidateId, setSelectedCandidateId] = useState(null);

  const { employeeId } = useParams();
  const newEmployeeId = parseInt(employeeId, 10);

  const navigator = useNavigate();

  useEffect(() => {
    fetchRejectedData();
  }, []);

  const fetchRejectedData = async () => {
    try {
      const response = await fetch(
        `http://192.168.1.43:8891/api/ats/157industries/rejected-candidate/${employeeId}`
      );
      const data = await response.json();
      setShowRejectedData(data);
    } catch (error) {
      console.error("Error fetching shortlisted data:", error);
    }
  };

  const handleUpdateSuccess = () => {
    setShowUpdateCallingTracker(false);
    fetchRejectedData();
  };

  const handleUpdate = (candidateId) => {
    setSelectedCandidateId(candidateId);
    setShowUpdateCallingTracker(true);
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

      // Adjust if the tooltip is out of the viewport
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
    <div className="App-after">
       <h5 style={{color:"gray",paddingTop:"5px"}}>RejectedCandidate List</h5> 
      <div className="attendanceTableData">
      {!showUpdateCallingTracker ? (
          <table className="attendance-table">
              <thead >
                <tr className="attendancerows-head">
                  <th className='attendanceheading' style={{ fontSize: "16px", whiteSpace:"nowrap" }}>Sr No.</th>
                  <th className='attendanceheading' style={{ fontSize: "16px" , whiteSpace:"nowrap"}}>Candidate Id.</th>
                  <th className='attendanceheading' style={{ fontSize: "16px" , whiteSpace:"nowrap"}}>Date</th>
                  <th className='attendanceheading' style={{ fontSize: "16px" , whiteSpace:"nowrap"}}>Recruiter Name</th>
                  <th className='attendanceheading' style={{ fontSize: "16px" , whiteSpace:"nowrap"}}>Candidate Name</th>
                  <th className='attendanceheading' style={{ fontSize: "16px" , whiteSpace:"nowrap"}}>Candidate Email</th>
                  <th className='attendanceheading' style={{ fontSize: "16px" , whiteSpace:"nowrap"}}>Contact Number</th>
                  <th className='attendanceheading' style={{ fontSize: "16px" , whiteSpace:"nowrap"}}>Alternate Number</th>
                  <th className='attendanceheading' style={{ fontSize: "16px" , whiteSpace:"nowrap"}}>Source Name</th>
                  <th className='attendanceheading' style={{ fontSize: "16px" , whiteSpace:"nowrap"}}>Position</th>
                  <th className='attendanceheading' style={{ fontSize: "16px" , whiteSpace:"nowrap"}}>Requirement id</th>
                  <th className='attendanceheading' style={{ fontSize: "16px" , whiteSpace:"nowrap"}}>Requirement Company</th>
                  <th className='attendanceheading' style={{ fontSize: "16px" , whiteSpace:"nowrap"}}>Communication Rating</th>
                  <th className='attendanceheading' style={{ fontSize: "16px" , whiteSpace:"nowrap"}}>Location</th>
                  <th className='attendanceheading' style={{ fontSize: "16px" , whiteSpace:"nowrap"}}>CallingFeedback</th>
                  <th className='attendanceheading' style={{ fontSize: "16px" , whiteSpace:"nowrap"}}>Interested / Eligible</th>
                  <th className='attendanceheading' style={{ fontSize: "16px" , whiteSpace:"nowrap"}}>Line Up Id</th>
                  <th className='attendanceheading' style={{ fontSize: "16px" , whiteSpace:"nowrap"}}>Date Of Birth</th>
                  <th className='attendanceheading' style={{ fontSize: "16px" , whiteSpace:"nowrap"}}>Gender</th>
                  <th className='attendanceheading' style={{ fontSize: "16px" , whiteSpace:"nowrap"}}>Qualification</th>
                  <th className='attendanceheading' style={{ fontSize: "16px" , whiteSpace:"nowrap"}}>Year Of Passing</th>
                  <th className='attendanceheading' style={{ fontSize: "16px" , whiteSpace:"nowrap"}}>Extra Certification</th>
                  <th className='attendanceheading' style={{ fontSize: "16px" , whiteSpace:"nowrap"}}>Current Company Name</th>
                  <th className='attendanceheading' style={{ fontSize: "16px" , whiteSpace:"nowrap"}}>Total Experince</th>
                  <th className='attendanceheading' style={{ fontSize: "16px" , whiteSpace:"nowrap"}}>Current CTC</th>
                  <th className='attendanceheading' style={{ fontSize: "16px" , whiteSpace:"nowrap"}}>Expected CTC</th>
                  <th className='attendanceheading' style={{ fontSize: "16px" , whiteSpace:"nowrap"}}>Notice Period</th>
                  <th className='attendanceheading' style={{ fontSize: "16px" , whiteSpace:"nowrap"}}>Any Offer Letter</th>
                  <th className='attendanceheading' style={{ fontSize: "16px" , whiteSpace:"nowrap"}}>Feed Back</th>
                  <th className='attendanceheading' style={{ fontSize: "16px" , whiteSpace:"nowrap"}}>Messege For Team Leader</th>
                  <th className='attendanceheading' style={{ fontSize: "16px" , whiteSpace:"nowrap"}}>Interview Date</th>
                  <th className='attendanceheading' style={{ fontSize: "16px" , whiteSpace:"nowrap"}}>interview Time</th>
                  <th className='attendanceheading' style={{ fontSize: "16px" , whiteSpace:"nowrap"}}>Candidate Status</th>
                  <th className='attendanceheading' style={{ fontSize: "16px" , whiteSpace:"nowrap"}}>Action</th>
                </tr>
              </thead>
              <tbody>
                {showRejectedData.map((item, index) => (
                  <tr key={item.candidateId} className="attendancerows">
                    <td className='tabledata ' onMouseOver={handleMouseOver} onMouseOut={handleMouseOut} style={{ fontSize: "16px" }}>{index + 1}
                    
                    
                    
                    </td>
                    <td className='tabledata ' onMouseOver={handleMouseOver} onMouseOut={handleMouseOut} style={{ fontSize: "16px" }}>{item.date}
                     <div className="tooltip">
                      <span className="tooltiptext">{item.date}</span>
                    </div>
                    
                    
                    </td>
                    <td className='tabledata ' onMouseOver={handleMouseOver} onMouseOut={handleMouseOut} >{item.candidateId}
                     <div className="tooltip">
                      <span className="tooltiptext">{item.candidateId}</span>
                    </div>
                    
                    
                    </td>
                    <td className='tabledata ' onMouseOver={handleMouseOver} onMouseOut={handleMouseOut} style={{ fontSize: "16px" }}>{item.recruiterName}
                     <div className="tooltip">
                      <span className="tooltiptext">{item.recruiterName}</span>
                    </div>
                    
                    
                    </td>
                    <td className='tabledata ' onMouseOver={handleMouseOver} onMouseOut={handleMouseOut} style={{ fontSize: "16px" }}>{item.candidateName}
                     <div className="tooltip">
                      <span className="tooltiptext">{item.candidateName}</span>
                    </div>
                    
                    
                    </td>
                    <td className='tabledata ' onMouseOver={handleMouseOver} onMouseOut={handleMouseOut} style={{ fontSize: "16px" }}>{item.candidateEmail}
                     <div className="tooltip">
                      <span className="tooltiptext">{item.candidateEmail}</span>
                    </div>
                    
                    
                    </td>
                    <td className='tabledata ' onMouseOver={handleMouseOver} onMouseOut={handleMouseOut} style={{ fontSize: "16px" }}>{item.contactNumber}
                     <div className="tooltip">
                      <span className="tooltiptext">{item.contactNumber}</span>
                    </div>
                    
                    
                    </td>
                    <td className='tabledata ' onMouseOver={handleMouseOver} onMouseOut={handleMouseOut} style={{ fontSize: "16px" }}>{item.alternateNumber}
                     <div className="tooltip">
                      <span className="tooltiptext">{item.alternateNumber}</span>
                    </div>
                    
                    
                    </td>
                    <td className='tabledata ' onMouseOver={handleMouseOver} onMouseOut={handleMouseOut} style={{ fontSize: "16px" }}>{item.sourceName}
                     <div className="tooltip">
                      <span className="tooltiptext">{item.sourceName}</span>
                    </div>
                    
                    
                    </td>
                    <td className='tabledata ' onMouseOver={handleMouseOver} onMouseOut={handleMouseOut} style={{ fontSize: "16px" }}>{item.position}
                     <div className="tooltip">
                      <span className="tooltiptext">{item.position}</span>
                    </div>
                    
                    
                    </td>
                    <td className='tabledata ' onMouseOver={handleMouseOver} onMouseOut={handleMouseOut} style={{ fontSize: "16px" }}>{item.requirementId}
                     <div className="tooltip">
                      <span className="tooltiptext">{item.requirementId}</span>
                    </div>
                    
                    
                    </td>
                    <td className='tabledata ' onMouseOver={handleMouseOver} onMouseOut={handleMouseOut} style={{ fontSize: "16px" }}>
                      {item.requirementCompany}
                    
                     <div className="tooltip">
                      <span className="tooltiptext">{item.requirementCompany}</span>
                    </div>
                    
                    
                    </td>
                    <td className='tabledata ' onMouseOver={handleMouseOver} onMouseOut={handleMouseOut} style={{ fontSize: "16px" }}>
                      {item.communicationRating}
                    
                     <div className="tooltip">
                      <span className="tooltiptext">{item.communicationRating}</span>
                    </div>
                    
                    
                    </td>
                    <td className='tabledata ' onMouseOver={handleMouseOver} onMouseOut={handleMouseOut} style={{ fontSize: "16px" }}>{item.currentLocation}
                     <div className="tooltip">
                      <span className="tooltiptext">{item.currentLocation}</span>
                    </div>
                    
                    
                    </td>
                    <td className='tabledata ' onMouseOver={handleMouseOver} onMouseOut={handleMouseOut} style={{ fontSize: "16px" }}>{item.callingFeedback}
                     <div className="tooltip">
                      <span className="tooltiptext">{item.callingFeedback}</span>
                    </div>
                    
                    
                    </td>
                    <td className='tabledata ' onMouseOver={handleMouseOver} onMouseOut={handleMouseOut} style={{ fontSize: "16px" }}>{item.selectYesOrNo}
                     <div className="tooltip">
                      <span className="tooltiptext">{item.selectYesOrNo}</span>
                    </div>
                    
                    
                    </td>
                    <td className='tabledata ' onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>{item.lineUp?.lineUpId}
                     <div className="tooltip">
                      <span className="tooltiptext">{item.lineUp?.lineUpId}</span>
                    </div>
                    
                    
                    </td>
                    <td className='tabledata ' onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>{item.lineUp?.dateOfBirth}
                     <div className="tooltip">
                      <span className="tooltiptext">{item.lineUp?.dateOfBirth}</span>
                    </div>
                    
                    
                    </td>
                    <td className='tabledata ' onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>{item.lineUp?.gender}
                     <div className="tooltip">
                      <span className="tooltiptext">{item.lineUp?.gender}</span>
                    </div>
                    
                    
                    </td>
                    <td className='tabledata ' onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>{item.lineUp?.qualification}
                     <div className="tooltip">
                      <span className="tooltiptext">{item.lineUp?.qualification}</span>
                    </div>
                    
                    
                    </td>
                    <td className='tabledata ' onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>{item.lineUp?.yearOfPassing}
                     <div className="tooltip">
                      <span className="tooltiptext">{item.lineUp?.yearOfPassing}</span>
                    </div>
                    
                    
                    </td>
                    <td className='tabledata ' onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>{item.lineUp?.extraCertification}
                     <div className="tooltip">
                      <span className="tooltiptext">{item.lineUp?.extraCertification}</span>
                    </div>
                    
                    
                    </td>
                    <td className='tabledata ' onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>{item.lineUp?.companyName}
                     <div className="tooltip">
                      <span className="tooltiptext">{item.lineUp?.companyName}</span>
                    </div>
                    
                    
                    </td>
                    <td className='tabledata ' onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>{item.lineUp?.totalExperience}
                     <div className="tooltip">
                      <span className="tooltiptext">{item.lineUp?.totalExperience}</span>
                    </div>
                    
                    
                    </td>
                    <td className='tabledata ' onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>{item.lineUp?.currentCTC}
                     <div className="tooltip">
                      <span className="tooltiptext">{item.lineUp?.currentCTC}</span>
                    </div>
                    
                    
                    </td>
                    <td className='tabledata ' onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>{item.lineUp?.expectedCTC}
                     <div className="tooltip">
                      <span className="tooltiptext">{item.lineUp?.expectedCTC}</span>
                    </div>
                    
                    
                    </td>
                    <td className='tabledata ' onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>{item.lineUp?.noticePeriod}
                     <div className="tooltip">
                      <span className="tooltiptext">{item.lineUp?.noticePeriod}</span>
                    </div>
                    
                    
                    </td>
                    <td className='tabledata ' onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>{item.lineUp?.holdingAnyOffer}
                     <div className="tooltip">
                      <span className="tooltiptext">{item.lineUp?.holdingAnyOffer}</span>
                    </div>
                    
                    
                    </td>
                    <td className='tabledata ' onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>{item.lineUp?.feedBack}
                     <div className="tooltip">
                      <span className="tooltiptext">{item.lineUp?.feedBack}</span>
                    </div>
                    
                    
                    </td>
                    <td className='tabledata ' onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>{item.lineUp?.msgForTeamLeader}
                     <div className="tooltip">
                      <span className="tooltiptext">{item.lineUp?.msgForTeamLeader}</span>
                    </div>
                    
                    
                    </td>
                    <td className='tabledata ' onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>{item.lineUp?.availabilityForInterview}
                     <div className="tooltip">
                      <span className="tooltiptext">{item.lineUp?.availabilityForInterview}</span>
                    </div>
                    
                    
                    </td>
                    <td className='tabledata ' onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>{item.lineUp?.interviewTime}
                     <div className="tooltip">
                      <span className="tooltiptext">{item.lineUp?.interviewTime}</span>
                    </div>
                    
                    
                    </td>
                    <td className='tabledata ' onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>{item.lineUp?.finalStatus}
                     <div className="tooltip">
                      <span className="tooltiptext">{item.lineUp?.finalStatus}</span>
                    </div>
                    
                    
                    </td>
                    <td  className="tabledata" style={{ fontSize: "16px" , whiteSpace:"nowrap"}}>
                         <i  onClick={() => handleUpdate(item.candidateId)} className="fa-solid fa-person-walking-arrow-right"></i>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
         
        ) : (
          <UpdateCallingTracker
          candidateId={selectedCandidateId}
          employeeId={employeeId}
          onSuccess={handleUpdateSuccess}
          onCancel={() => setShowUpdateCallingTracker(false)}
          />
        )}
 </div>
        </div>

     
  );
};

export default RejectedCandidate