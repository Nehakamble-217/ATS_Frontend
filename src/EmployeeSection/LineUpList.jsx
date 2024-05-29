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
    fetch(`http://192.168.1.33:8891/api/ats/157industries/all-Data/${employeeIdnew}`)
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
      <div className="table-container">
        <table className="calling-table">
          <thead>
            <tr>
              <th>Sr No.</th>
              <th>Date</th>
              <th>Recruiter Name</th>
              <th>Candidate Name</th>
              <th>Position</th>
              <th>Company Name</th>
              <th>Contact Number</th>
              <th>Alternate Number</th>
              <th>Communication Rating</th>
              <th>Personal Feedback</th>
              <th>Calling Feedback</th>
              <th>Intrsted</th>
              <th>Candidate Email</th>
              <th>Your Current Comany</th>
              <th>Current Location</th>
              <th>Current CTC</th>
              <th>Expected CTC</th>
              <th>Notice Period</th>
              <th>Total Experience</th>
              <th>Any Offer letter</th>
              <th>Feed Back</th>
              <th>Availbale For Interview</th>
              <th>Final Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {callingList.map((item, index) => (
              <tr key={item.candidateId}>
                <td>{index + 1}</td>
                <td>{item.date}</td>
                <td>{item.recruiterName}</td>
                <td>{item.candidateName}</td>
                <td>{item.position}</td>
                <td>{item.requirementCompany}</td>
                <td>{item.contactNumber}</td>
                <td>{item.alternateNumber}</td>
                <td>{item.communicationRating}</td>
                <td>{item.personalFeedback}</td>
                <td>{item.callingFeedback}</td>
                <th>{item.selectYesOrNo}</th>
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
                    <td>{item.lineUp.availabilityForInterview}</td>
                    <td>{item.lineUp.finalStatus}</td>

                    <td>
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