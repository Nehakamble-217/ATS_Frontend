  import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../EmployeeSection/LineUpList.css";
import UpdateCallingTracker from "./UpdateSelfCalling";

const LineUpList = ({updateState,funForGettingCandidateId}) => {
  const [callingList, setCallingList] = useState([]);

  const { employeeId } = useParams(); 
  const employeeIdnew = parseInt(employeeId);
  console.log(employeeId);

  const [showUpdateCallingTracker, setShowUpdateCallingTracker] = useState(false);
  const [selectedCandidateId, setSelectedCandidateId] = useState(null);

  const navigator = useNavigate();

  useEffect(() => {
    fetch(`http://192.168.1.41:8891/api/ats/157industries/all-Data/${employeeIdnew}`)
      .then((response) => response.json())
      .then((data) => setCallingList(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, [employeeIdnew]);

  
  const handleUpdate = (candidateId) => {
    setSelectedCandidateId(candidateId);
    setShowUpdateCallingTracker(true);
  };

  const handleUpdateSuccess = () => {
    setShowUpdateCallingTracker(false);
    fetch(`http://192.168.1.41:8891/api/ats/157industries/all-Data/${employeeIdnew}`)
      .then((response) => response.json())
      .then((data) => setCallingList(data))
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
    <div className="calling-list-container">
      
      {!showUpdateCallingTracker ? (
        
      <div className="attendanceTableData">
        <h5 style={{color:"gray"}}>Line Up  List</h5>
        <table className="attendance-table">
          <thead>
            <tr className='attendancerows-head'>
              <th className='attendanceheading'>Sr No.</th>
              <th className='attendanceheading'>Date</th>
              <th className='attendanceheading'>Recruiter Name</th>
              <th className='attendanceheading'>Candidate Name</th>
              <th className='attendanceheading'>Position</th>
              <th className='attendanceheading'>Company Name</th>
              <th className='attendanceheading'>Contact Number</th>
              <th className='attendanceheading'>Alternate Number</th>
              <th className='attendanceheading'>Communication Rating</th>
              <th className='attendanceheading'>Personal Feedback</th>
              <th className='attendanceheading'>Calling Feedback</th>
              <th className='attendanceheading'>Intrsted</th>
              <th className='attendanceheading'>Candidate Email</th>
              <th className='attendanceheading'>Your Current Comany</th>
              <th className='attendanceheading'>Current Location</th>
              <th className='attendanceheading'>Current CTC</th>
              <th className='attendanceheading'>Expected CTC</th>
              <th className='attendanceheading'>Notice Period</th>
              <th className='attendanceheading'>Total Experience</th>
              <th className='attendanceheading'>Any Offer letter</th>
              <th className='attendanceheading'>Feed Back</th>
              <th className='attendanceheading'>Availbale For Interview</th>
              <th className='attendanceheading'>Final Status</th>
              <th className='attendanceheading'>Action</th>
            </tr>
          </thead>
          <tbody>
            {callingList.map((item, index) => (
              <tr key={item.candidateId} className='attendancerows'>
                <td className='tabledata'>{index + 1}
                </td>
                <td className='tabledata' onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>{item.date}
                <div className="tooltip">
                      
                      <span className="tooltiptext">{item.date}</span>
                    </div>
                </td>
                <td className='tabledata' onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>{item.recruiterName}
                <div className="tooltip">
                      
                      <span className="tooltiptext">{item.recruiterName}</span>
                    </div>
                </td>
                <td className='tabledata' onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>{item.candidateName}
                <div className="tooltip">
                      
                      <span className="tooltiptext">{item.candidateName}</span>
                    </div>
                </td>
                <td className='tabledata' onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>{item.position}
                <div className="tooltip">
                      
                      <span className="tooltiptext">{item.position}</span>
                    </div>
                </td>
                <td className='tabledata' onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>{item.requirementCompany}
                <div className="tooltip">
                      
                      <span className="tooltiptext">{item.requirementCompany}</span>
                    </div>
                </td>
                <td className='tabledata' onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>{item.contactNumber}
                <div className="tooltip">
                      
                      <span className="tooltiptext">{item.contactNumber}</span>
                    </div>
                </td>
                <td className='tabledata' onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>{item.alternateNumber}
                <div className="tooltip">
                      
                      <span className="tooltiptext">{item.alternateNumber}</span>
                    </div>
                </td>
                <td className='tabledata' onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>{item.communicationRating}
                <div className="tooltip">
                      
                      <span className="tooltiptext">{item.communicationRating}</span>
                    </div>
                </td>
                <td className='tabledata' onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>{item.personalFeedback}
                <div className="tooltip">
                      
                      <span className="tooltiptext">{item.personalFeedback}</span>
                    </div>
                </td>
                <td className='tabledata' onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>{item.callingFeedback}
                <div className="tooltip">
                      
                      <span className="tooltiptext">{item.callingFeedback}</span>
                    </div>
                </td>
                <th className='attendanceheading'>{item.selectYesOrNo}</th>
                {item.lineUp && (
                  <>
                    <td className='tabledata' onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>{item.lineUp.candidateEmail}
                    <div className="tooltip">
                      
                      <span className="tooltiptext">{item.lineUp.candidateEmail}</span>
                    </div>
                    </td>
                    <td className='tabledata' onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>{item.lineUp.companyName}
                    <div className="tooltip">
                      
                      <span className="tooltiptext">{item.lineUp.companyName}</span>
                    </div>
                    </td>
                    <td className='tabledata' onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>{item.lineUp.currentLocation}
                    <div className="tooltip">
                      
                      <span className="tooltiptext">{item.lineUp.currentLocation}</span>
                    </div>
                    </td>
                    <td className='tabledata' onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>{item.lineUp.currentCTC}
                    <div className="tooltip">
                      
                      <span className="tooltiptext">{item.lineUp.currentCTC}</span>
                    </div>
                    </td>
                    <td className='tabledata' onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>{item.lineUp.expectedCTC}
                    <div className="tooltip">
                      
                      <span className="tooltiptext">{item.lineUp.expectedCTC}</span>
                    </div>
                    </td>
                    <td className='tabledata' onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>{item.lineUp.noticePeriod}
                    <div className="tooltip">
                      
                      <span className="tooltiptext">{item.lineUp.noticePeriod}</span>
                    </div>
                    </td>
                    <td className='tabledata' onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>{item.lineUp.totalExperience}
                    <div className="tooltip">
                      
                      <span className="tooltiptext">{item.lineUp.totalExperience}</span>
                    </div>
                    </td>
                    <td className='tabledata' onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>{item.lineUp.holdingAnyOffer}
                    <div className="tooltip">
                      
                      <span className="tooltiptext">{item.lineUp.holdingAnyOffer}</span>
                    </div>
                    </td>
                    <td className='tabledata' onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>{item.lineUp.feedBack}
                    <div className="tooltip">
                      
                      <span className="tooltiptext">{item.lineUp.feedBack}</span>
                    </div>
                    </td>
                    <td className='tabledata' onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>{item.lineUp.availabilityForInterview}
                    <div className="tooltip">
                      
                      <span className="tooltiptext">{item.lineUp.availabilityForInterview}</span>
                    </div>
                    </td>
                    <td className='tabledata' onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>{item.lineUp.finalStatus}
                    <div className="tooltip">
                      
                      <span className="tooltiptext">{item.lineUp.finalStatus}</span>
                    </div>
                    </td>

                    <td className='tabledata'>
                     
                      <i onClick={() => handleUpdate(item.candidateId)} className="fa-regular fa-pen-to-square"></i>
                     
                    </td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      ) : (

        <UpdateCallingTracker
          candidateId={selectedCandidateId}
          employeeId={employeeId}
          onSuccess={handleUpdateSuccess}
          onCancel={() => setShowUpdateCallingTracker(false)}
        />
        
      )}
    </div>

  );

 
};

export default LineUpList;