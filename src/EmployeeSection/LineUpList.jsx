import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../EmployeeSection/LineUpList.css";

const LineUpList = ({updateState,funForGettingCandidateId}) => {
  const [callingList, setCallingList] = useState([]);

  const { employeeId } = useParams(); 
  const employeeIdnew = parseInt(employeeId);
  console.log(employeeId);

  const navigator = useNavigate();

  useEffect(() => {
    fetch(`http://192.168.1.37:8891/api/ats/157industries/all-Data/${employeeIdnew}`)
      .then((response) => response.json())
      .then((data) => setCallingList(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, [employeeIdnew]);

  
  const handleUpdate = (candidateId) => {
    updateState();
    const selectedCandidate = callingList.find(
      (item) => item.candidateId === candidateId
    );

    funForGettingCandidateId(selectedCandidate.candidateId);
  };


  return (
    <div className="calling-list-container">
      <h2 className="m-4">Line Up  List</h2>
      <div className="attendanceTableData">
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
                <td className='tabledata'>{index + 1}</td>
                <td className='tabledata'>{item.date}</td>
                <td className='tabledata'>{item.recruiterName}</td>
                <td className='tabledata'>{item.candidateName}</td>
                <td className='tabledata'>{item.position}</td>
                <td className='tabledata'>{item.requirementCompany}</td>
                <td className='tabledata'>{item.contactNumber}</td>
                <td className='tabledata'>{item.alternateNumber}</td>
                <td className='tabledata'>{item.communicationRating}</td>
                <td className='tabledata'>{item.personalFeedback}</td>
                <td className='tabledata'>{item.callingFeedback}</td>
                <th className='attendanceheading'>{item.selectYesOrNo}</th>
                {item.lineUp && (
                  <>
                    <td className='tabledata'>{item.lineUp.candidateEmail}</td>
                    <td className='tabledata'>{item.lineUp.companyName}</td>
                    <td className='tabledata'>{item.lineUp.currentLocation}</td>
                    <td className='tabledata'>{item.lineUp.currentCTC}</td>
                    <td className='tabledata'>{item.lineUp.expectedCTC}</td>
                    <td className='tabledata'>{item.lineUp.noticePeriod}</td>
                    <td className='tabledata'>{item.lineUp.totalExperience}</td>
                    <td className='tabledata'>{item.lineUp.holdingAnyOffer}</td>
                    <td className='tabledata'>{item.lineUp.feedBack}</td>
                    <td className='tabledata'>{item.lineUp.availabilityForInterview}</td>
                    <td className='tabledata'>{item.lineUp.finalStatus}</td>

                    <td className='tabledata'>
                      <button
                        onClick={() => handleUpdate(item.candidateId)}
                      >
                        Update & Follow Up
                      </button>
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

export default LineUpList;