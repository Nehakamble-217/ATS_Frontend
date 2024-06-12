import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import './holdCandidate.css';
import UpdateCallingTracker from "../EmployeeSection/UpdateSelfCalling";

const HoldCandidate = ({ updateState, funForGettingCandidateId }) => {
  const [showHoldData, setShowHoldData] = useState([]);
  const [showUpdateCallingTracker, setShowUpdateCallingTracker] = useState(false);
  const [selectedCandidateId, setSelectedCandidateId] = useState(null);

  const { employeeId } = useParams();
  const newEmployeeId = parseInt(employeeId, 10);

  const navigator = useNavigate();

  useEffect(() => {
    fetchHoldCandidateData();
  }, []);

  const fetchHoldCandidateData = async () => {
    try {
      const response = await fetch(
        `http://192.168.1.43:8891/api/ats/157industries/hold-candidate/${employeeId}`
      );
      const data = await response.json();
      setShowHoldData(data);
    } catch (error) {
      console.error("Error fetching hold candidate data:", error);
    }
  };

  const handleUpdateSuccess = () => {
    setShowUpdateCallingTracker(false);
    fetchHoldCandidateData();
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

      let top = rect.top - tooltipHeight + 40;
      let left = rect.left + (rect.width - tooltipWidth) / 2;

      if (top < 0) top = rect.bottom + 5;
      if (left < 0) left = 5;
      if (left + tooltipWidth > viewportWidth) left = viewportWidth - tooltipWidth - 5;

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
    <div>
      
       <h5 style={{color:"gray",paddingTop:"5px"}}>HoldCandidate List</h5> 
      <div className="attendanceTableData">
      {!showUpdateCallingTracker ? (
        <div>
         <div>
            <table className="shortlistedcandidate attendance-table">
              <thead>
                <tr className="shortlistedheading attendancerows-head" >
                  <th className='attendanceheading'>Sr No.</th>
                  <th className='attendanceheading'>Candidate Id.</th>
                  <th className='attendanceheading'>Date</th>
                  <th className='attendanceheading'>Recruiter Name</th>
                  <th className='attendanceheading' >Candidate Name</th>
                  <th className='attendanceheading' >Candidate Email</th>
                  <th className='attendanceheading' >Contact Number</th>
                  <th className='attendanceheading' >Alternate Number</th>
                  <th className='attendanceheading' >Source Name</th>
                  <th className='attendanceheading' >Position</th>
                  <th className='attendanceheading' >Requirement id</th>
                  <th className='attendanceheading' >Requirement Company</th>
                  <th className='attendanceheading' >Communication Rating</th>
                  <th className='attendanceheading' >Location</th>
                  <th className='attendanceheading' >CallingFeedback</th>
                  <th className='attendanceheading' >Interested / Eligible</th>
                  <th className='attendanceheading' >Line Up Id</th>
                  <th className='attendanceheading' >Date Of Birth</th>
                  <th className='attendanceheading' >Gender</th>
                  <th className='attendanceheading' >Qualification</th>
                  <th className='attendanceheading' >Year Of Passing</th>
                  <th className='attendanceheading' >Extra Certification</th>
                  <th className='attendanceheading' >Current Company Name</th>
                  <th className='attendanceheading' >Total Experince</th>
                  <th className='attendanceheading' >Current CTC</th>
                  <th className='attendanceheading' >Expected CTC</th>
                  <th className='attendanceheading' >Notice Period</th>
                  <th className='attendanceheading' >Any Offer Letter</th>
                  <th className='attendanceheading' >Feed Back</th>
                  <th className='attendanceheading' >Messege For Team Leader</th>
                  <th className='attendanceheading' >Interview Date</th>
                  <th className='attendanceheading' >interview Time</th>
                  <th className='attendanceheading' >Candidate Status</th>
                  <th className='attendanceheading' >Action</th>
                </tr>
              </thead>
              <tbody>
                {showHoldData.map((item, index) => (
                  <tr key={item.candidateId} className="attendancerows">
                    <td className='tabledata '  onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>{index + 1}</td>
                    <td  className='tabledata ' onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>{item.date}
                    
                     <div className="tooltip">
                      
                      <span className="tooltiptext">{item.date}</span>
                    </div>
                    
                    </td>
                    <td className='tabledata ' onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>{item.candidateId}
                    
                     <div className="tooltip">
                      
                      <span className="tooltiptext">{item.candidateId}</span>
                    </div>
                    
                    </td>
                    <td  className='tabledata ' onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>{item.recruiterName}
                    
                     <div className="tooltip">
                      
                      <span className="tooltiptext">{item.recruiterName}</span>
                    </div>
                    
                    </td>
                    <td  className='tabledata ' onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>{item.candidateName}
                    
                     <div className="tooltip">
                      
                      <span className="tooltiptext">{item.candidateName}</span>
                    </div>
                    
                    </td>
                    <td  className='tabledata ' onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>{item.candidateEmail}
                    
                     <div className="tooltip">
                      
                      <span className="tooltiptext">{item.candidateEmail}</span>
                    </div>
                    
                    </td>
                    <td  className='tabledata ' onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>{item.contactNumber}
                    
                     <div className="tooltip">
                      
                      <span className="tooltiptext">{item.contactNumber}</span>
                    </div>
                    
                    </td>
                    <td  className='tabledata ' onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>{item.alternateNumber}
                    
                     <div className="tooltip">
                      
                      <span className="tooltiptext">{item.alternateNumber}</span>
                    </div>
                    
                    </td>
                    <td  className='tabledata ' onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>{item.sourceName}
                    
                     <div className="tooltip">
                      
                      <span className="tooltiptext">{item.sourceName}</span>
                    </div>
                    
                    </td>
                    <td  className='tabledata ' onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>{item.position}
                    
                     <div className="tooltip">
                      
                      <span className="tooltiptext">{item.position}</span>
                    </div>
                    
                    </td>
                    <td  className='tabledata ' onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>{item.requirementId}
                    
                     <div className="tooltip">
                      
                      <span className="tooltiptext">{item.requirementId}</span>
                    </div>
                    
                    </td>
                    <td  className='tabledata ' onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>{item.requirementCompany}
                    
                     <div className="tooltip">
                      
                      <span className="tooltiptext">{item.requirementCompany}</span>
                    </div>
                    
                    </td>
                    <td  className='tabledata ' onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>{item.communicationRating}
                    
                     <div className="tooltip">
                      
                      <span className="tooltiptext">{item.communicationRating}</span>
                    </div>
                    
                    </td>
                    <td  className='tabledata ' onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>{item.currentLocation}
                    
                     <div className="tooltip">
                      
                      <span className="tooltiptext">{item.currentLocation}</span>
                    </div>
                    
                    </td>
                    <td  className='tabledata ' onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>{item.callingFeedback}
                    
                     <div className="tooltip">
                      
                      <span className="tooltiptext">{item.callingFeedback}</span>
                    </div>
                    
                    </td>
                    <td  className='tabledata ' onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>{item.selectYesOrNo}
                    
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
                    <td >
                      
                          <i  onClick={() => handleUpdate(item.candidateId)} className="fa-solid fa-person-walking-arrow-right"></i>
                     
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
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
    </div>
  );
};

export default HoldCandidate;