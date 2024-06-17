import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import './selectedcandidate.css';
import AfterSelection from "./afterSelection";

const SelectedCandidate = () => {
  const [shortListedData, setShortListedData] = useState([]);
  const [selectedCandidateId, setSelectedCandidateId] = useState(null);
  const [selectedEmployeeId, setSelectedEmployeeId] = useState(null);
  const [selectedRequirementId, setSelectedRequirementId] = useState(null);

  const { employeeId } = useParams();

  useEffect(() => {
    fetchShortListedData();
  }, []);

  const fetchShortListedData = async () => {
    try {
      const response = await fetch(
        `http://192.168.1.36:8891/api/ats/157industries/selected-candidate/${employeeId}`
      );
      const data = await response.json();
      setShortListedData(data);
    } catch (error) {
      console.error("Error fetching shortlisted data:", error);
    }
  };                             

  const viewPage = (candidateId, requirementId) => {
    setSelectedCandidateId(candidateId);
    setSelectedEmployeeId(employeeId);
    setSelectedRequirementId(requirementId);
  };

  const handleReturn = () => {
    setSelectedCandidateId(null);
    setSelectedEmployeeId(null);
    setSelectedRequirementId(null);
    fetchShortListedData();
  };

  return (
    <div className="App-after">
       <h5>Selected Candidates 16</h5>
      {!selectedCandidateId ? (
        
        <div className="attendanceTableData">
         
          <table className="attendance-table">
            <thead>
              <tr className='attendancerows-head'>
                <th className='attendanceheading'>Sr No.</th>
                <th className='attendanceheading'>Candidate Id.</th>
                <th className='attendanceheading'>Date</th>
                <th className='attendanceheading'>Recruiter Name</th>
                <th className='attendanceheading'>Candidate Name</th>
                <th className='attendanceheading'>Candidate Email</th>
                <th className='attendanceheading'>Contact Number</th>
                <th className='attendanceheading'>Alternate Number</th>
                <th className='attendanceheading'>Source Name</th>
                <th className='attendanceheading'>Position</th>
                <th className='attendanceheading'>Requirement id</th>
                <th className='attendanceheading'>Requirement Company</th>
                <th className='attendanceheading'>Communication Rating</th>
                <th className='attendanceheading'>Location</th>
                <th className='attendanceheading'>CallingFeedback</th>
                <th className='attendanceheading'>Interested / Eligible</th>
                <th className='attendanceheading'>Line Up Id</th>
                <th className='attendanceheading'>Date Of Birth</th>
                <th className='attendanceheading'>Gender</th>
                <th className='attendanceheading'>Qualification</th>
                <th className='attendanceheading'>Year Of Passing</th>
                <th className='attendanceheading'>Extra Certification</th>
                <th className='attendanceheading'>Current Company Name</th>
                <th className='attendanceheading'>Total Experience</th>
                <th className='attendanceheading'>Current CTC</th>
                <th className='attendanceheading'>Expected CTC</th>
                <th className='attendanceheading'>Notice Period</th>
                <th className='attendanceheading'>Any Offer Letter</th>
                <th className='attendanceheading'>Feed Back</th>
                <th className='attendanceheading'>Message For Team Leader</th>
                <th className='attendanceheading'>Interview Date</th>
                <th className='attendanceheading'>Interview Time</th>
                <th className='attendanceheading'>Candidate Status</th>
                <th className='attendanceheading'>Action</th>
              </tr>
            </thead>
            <tbody>
              {Array.isArray(shortListedData) && shortListedData.map((item, index) => (
                <tr key={item.candidateId} className='attendancerows'>
                  <td className='tabledata '>{index + 1}</td>
                  <td className='tabledata '>{item.candidateId}</td>
                  <td className='tabledata '>{item.date}</td>
                  <td className='tabledata '>{item.recruiterName}</td>
                  <td className='tabledata '>{item.candidateName}</td>
                  <td className='tabledata '>{item.candidateEmail}</td>
                  <td className='tabledata '>{item.contactNumber}</td>
                  <td className='tabledata '>{item.alternateNumber}</td>
                  <td className='tabledata '>{item.sourceName}</td>
                  <td className='tabledata '>{item.position}</td>
                  <td className='tabledata '>{item.requirementId}</td>
                  <td className='tabledata '>{item.requirementCompany}</td>
                  <td className='tabledata '>{item.communicationRating}</td>
                  <td className='tabledata '>{item.currentLocation}</td>
                  <td className='tabledata '>{item.callingFeedback}</td>
                  <td className='tabledata '>{item.selectYesOrNo}</td>
                  <td className='tabledata '>{item.lineUp?.lineUpId}</td>
                  <td className='tabledata '>{item.lineUp?.dateOfBirth}</td>
                  <td className='tabledata '>{item.lineUp?.gender}</td>
                  <td className='tabledata '>{item.lineUp?.qualification}</td>
                  <td className='tabledata '>{item.lineUp?.yearOfPassing}</td>
                  <td className='tabledata '>{item.lineUp?.extraCertification}</td>
                  <td className='tabledata '>{item.lineUp?.companyName}</td>
                  <td className='tabledata '>{item.lineUp?.totalExperience}</td>
                  <td className='tabledata '>{item.lineUp?.currentCTC}</td>
                  <td className='tabledata '>{item.lineUp?.expectedCTC}</td>
                  <td className='tabledata '>{item.lineUp?.noticePeriod}</td>
                  <td className='tabledata '>{item.lineUp?.holdingAnyOffer}</td>
                  <td className='tabledata '>{item.lineUp?.feedBack}</td>
                  <td className='tabledata '>{item.lineUp?.msgForTeamLeader}</td>
                  <td className='tabledata '>{item.lineUp?.availabilityForInterview}</td>
                  <td className='tabledata '>{item.lineUp?.interviewTime}</td>
                  <td className='tabledata '>{item.lineUp?.finalStatus}</td>
                  <td className='tabledata '>
                     <i  onClick={() => viewPage(item.candidateId)} class="fa-solid fa-person-walking-arrow-right"></i>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <AfterSelection
          candidateId={selectedCandidateId}
          employeeId={selectedEmployeeId}
          requirementId={selectedRequirementId}
          onReturn={handleReturn}
        />
      )}
    </div>
  );
};

export default SelectedCandidate;
