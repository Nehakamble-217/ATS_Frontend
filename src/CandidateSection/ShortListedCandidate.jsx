import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import '../CandidateSection/shortlistedcandidate.css'
import UpdateCallingTracker from "../EmployeeSection/UpdateSelfCalling";
import InterviewDates from "../EmployeeSection/interviewDate";

const ShortListedCandidates = ({ closeComponents, viewUpdatedPage}) => {
    const [shortListedData, setShortListedData] = useState([]);
    const [showUpdateCallingTracker, setShowUpdateCallingTracker] = useState(false);
    const [selectedCandidateId, setSelectedCandidateId] = useState(null);

    const { employeeId } = useParams();
    const newEmployeeId = parseInt(employeeId, 10);
    const navigator = useNavigate();

    useEffect(() => {
        fetchShortListedData();
    }, []);

    const fetchShortListedData = async () => {  
        try {
            const response = await fetch(
                `http://192.168.1.33:8891/api/ats/157industries/shortListed-date/${newEmployeeId}`
            );
            const data = await response.json();
            setShortListedData(data);
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
    <div className="calling-list-container">
    {!showUpdateCallingTracker ? (
      <div className="attendanceTableData">
        <h6 style={{ color: "gray" }}>ShortListed Candidate Data </h6>
        <table id="shortlisted-table-id" className="attendance-table">
          <thead>
            <tr className='attendancerows-head'>
              <th className='attendanceheading'>Sr No.</th>
              <th className='attendanceheading'>Date</th>
              <th className='attendanceheading'>Time</th>
              <th className='attendanceheading'>Candidate Id</th>
              <th className='attendanceheading'>Recruiter Name</th>
              <th className='attendanceheading'>Candidate Name</th>
              <th className='attendanceheading'>Candidate Email</th>
              <th className='attendanceheading'>Contact Number</th>
              <th className='attendanceheading'>Alternate Number</th>
              <th className='attendanceheading'>sourceName</th>
              <th className='attendanceheading'>job Designation</th>
              <th className='attendanceheading'>Job Id</th>
              <th className='attendanceheading'>Applying Company</th>
              <th className='attendanceheading'>Communication Rating</th>
              <th className='attendanceheading'>Current Location</th>
              <th className='attendanceheading'>Full Address</th>
              <th className='attendanceheading'>Calling Feedback</th>
              <th className='attendanceheading'>Incentive</th>
              <th className='attendanceheading'>Interseed or Not</th>
              <th className='attendanceheading'>Current Company</th>
              <th className='attendanceheading'>Total Experience</th>
              <th className='attendanceheading'>relevantExperience</th>
              <th className='attendanceheading'>Current CTC</th>
              <th className='attendanceheading'>Expected CTC</th>
              <th className='attendanceheading'>Date Of Birth</th>
              <th className='attendanceheading'>Gender</th>
              <th className='attendanceheading'>Qualification</th>
              <th className='attendanceheading'>Year Of Passing</th>
              <th className='attendanceheading'>Extra Certification</th>
              <th className='attendanceheading'>Feed Back</th>
              <th className='attendanceheading'>Holding Any Offer</th>
              <th className='attendanceheading'>Offer Letter Msg</th>
              <th className='attendanceheading'>Resume</th>
              <th className='attendanceheading'>NoticePeriod</th>
              <th className='attendanceheading'>Msg For TeamLeader</th>
              <th className='attendanceheading'>Availability For Interview</th>
              <th className='attendanceheading'>Interview Time</th>
              <th className='attendanceheading'>Final Status</th>
              <th className='attendanceheading'>Action</th>

            </tr>
          </thead>
          <tbody>
            {shortListedData.map((item, index) => (
              <tr key={item.candidateId} className='attendancerows'>
                <td className='tabledata'>{index + 1}</td>
                
                <td className='tabledata' onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>
                  {item.date}
                  <div className="tooltip">
                    <span className="tooltiptext">{item.date}</span>
                  </div>
                </td>
    
                <td className='tabledata' onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>
                  {item.candidateAddedTime || "-"}
                  <div className="tooltip">
                    <span className="tooltiptext">{item.candidateAddedTime}</span>
                  </div>
                </td>

                <td className='tabledata' onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>
                  {item.candidateId}
                  <div className="tooltip">
                    <span className="tooltiptext">{item.candidateId}</span>
                  </div>
                </td>

                <td className='tabledata' onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>
                  {item.recruiterName}
                  <div className="tooltip">
                    <span className="tooltiptext">{item.recruiterName}</span>
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
                  {item.contactNumber || "-"}
                  <div className="tooltip">
                    <span className="tooltiptext">{item.contactNumber}</span>
                  </div>
                </td>

                <td className='tabledata' onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>
                  {item.alternateNumber || 0}
                  <div className="tooltip">
                    <span className="tooltiptext">{item.alternateNumber}</span>
                  </div>
                </td>

                <td className='tabledata' onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>
                  {item.sourceName || 0}
                  <div className="tooltip">
                    <span className="tooltiptext">{item.sourceName}</span>
                  </div>
                </td>

                <td className='tabledata' onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>
                  {item.jobDesignation || "-"}
                  <div className="tooltip">
                    <span className="tooltiptext">{item.jobDesignation}</span>
                  </div>
                </td>

                <td className='tabledata' onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>
                  {item.requirementId || "-"}
                  <div className="tooltip">
                    <span className="tooltiptext">{item.requirementId}</span>
                  </div>
                </td>

                <td className='tabledata' onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>
                  {item.requirementCompany || "-"}
                  <div className="tooltip">
                    <span className="tooltiptext">{item.requirementCompany}</span>
                  </div>
                </td>

                <td className='tabledata' onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>
                  {item.communicationRating || "-"}
                  <div className="tooltip">
                    <span className="tooltiptext">{item.communicationRating}</span>
                  </div>
                </td>

                <td className='tabledata' onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>
                  {item.currentLocation || "-"}
                  <div className="tooltip">
                    <span className="tooltiptext">{item.currentLocation}</span>
                  </div>
                </td>

                <td className='tabledata' onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>
                  {item.fullAddress || "-"}
                  <div className="tooltip">
                    <span className="tooltiptext">{item.fullAddress} </span>
                  </div>
                </td>

                <td className='tabledata' onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>
                  {item.callingFeedback || "-"}
                  <div className="tooltip">
                    <span className="tooltiptext">{item.callingFeedback}</span>
                  </div>
                </td>

                <td className='tabledata' onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>
                  {item.incentive || "-"}
                  <div className="tooltip">
                    <span className="tooltiptext">{item.incentive}</span>
                  </div>
                </td>

                <td className='tabledata' onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>
                  {item.selectYesOrNo || "-"}
                  <div className="tooltip">
                    <span className="tooltiptext">{item.selectYesOrNo}</span>
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
                    {item.lineUp.relevantExperience || "-"}
                      <div className="tooltip">
                        <span className="tooltiptext">{item.lineUp.relevantExperience}</span>
                      </div>
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
                      {item.lineUp.dateOfBirth || "-"}
                      <div className="tooltip">
                        <span className="tooltiptext">{item.lineUp.dateOfBirth}</span>
                      </div>
                    </td>

                    <td className='tabledata' onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>
                      {item.lineUp.gender || "-"}
                      <div className="tooltip">
                        <span className="tooltiptext">{item.lineUp.gender}</span>
                      </div>
                    </td>

                    <td className='tabledata' onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>
                      {item.lineUp.qualification || "-"}
                      <div className="tooltip">
                        <span className="tooltiptext">{item.lineUp.qualification}</span>
                      </div>
                    </td>

                    <td className='tabledata' onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>
                      {item.lineUp.yearOfPassing || "-"}
                      <div className="tooltip">
                        <span className="tooltiptext">{item.lineUp.yearOfPassing}</span>
                      </div>
                    </td>

                    <td className='tabledata' onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>
                      {item.lineUp.extraCertification || "-"}
                      <div className="tooltip">
                        <span className="tooltiptext">{item.lineUp.extraCertification}</span>
                      </div>
                    </td>

                    <td className='tabledata' onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>
                      {item.lineUp.feedBack || "-"}
                      <div className="tooltip">
                        <span className="tooltiptext">{item.lineUp.feedBack}</span>
                      </div>
                    </td>

                    <td className='tabledata' onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>
                      {item.lineUp.holdingAnyOffer || "-"}
                      <div className="tooltip">
                        <span className="tooltiptext">{item.lineUp.holdingAnyOffer}</span>
                      </div>
                    </td>

                    <td className='tabledata' onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>
                      {item.lineUp.offerLetterMsg || "-"}
                      <div className="tooltip">
                        <span className="tooltiptext">{item.lineUp.offerLetterMsg}</span>
                      </div>
                    </td>

                    <td className='tabledata' onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>
                      {item.lineUp.resume || "-"}
                      <div className="tooltip">
                        <span className="tooltiptext">{item.lineUp.resume}</span>
                      </div>
                    </td>

                    <td className='tabledata' onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>
                      {item.lineUp.noticePeriod || "-"}
                      <div className="tooltip">
                        <span className="tooltiptext">{item.lineUp.noticePeriod}</span>
                      </div>
                    </td>

                    <td className='tabledata' onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>
                      {item.lineUp.msgForTeamLeader || "-"}
                      <div className="tooltip">
                        <span className="tooltiptext">{item.lineUp.msgForTeamLeader}</span>
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
                      {item.lineUp.finalStatus || "-"}
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
    )
};

export default ShortListedCandidates;
