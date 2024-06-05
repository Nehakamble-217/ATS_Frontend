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
        `http://192.168.1.41:8891/api/ats/157industries/selected-candidate/${employeeId}`
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
    <div className="c1-mainDiv">
      {!selectedCandidateId ? (
        <div className="c1-subdiv">
          <h5>Selected Candidates 16</h5>
          <table className="selected-candidate-table">
            <thead>
              <tr>
                {/* Table headers */}
                <th>Sr No.</th>
                <th>Candidate Id.</th>
                <th>Date</th>
                <th>Recruiter Name</th>
                <th>Candidate Name</th>
                <th>Candidate Email</th>
                <th>Contact Number</th>
                <th>Alternate Number</th>
                <th>Source Name</th>
                <th>Position</th>
                <th>Requirement id</th>
                <th>Requirement Company</th>
                <th>Communication Rating</th>
                <th>Location</th>
                <th>CallingFeedback</th>
                <th>Interested / Eligible</th>
                <th>Line Up Id</th>
                <th>Date Of Birth</th>
                <th>Gender</th>
                <th>Qualification</th>
                <th>Year Of Passing</th>
                <th>Extra Certification</th>
                <th>Current Company Name</th>
                <th>Total Experience</th>
                <th>Current CTC</th>
                <th>Expected CTC</th>
                <th>Notice Period</th>
                <th>Any Offer Letter</th>
                <th>Feed Back</th>
                <th>Message For Team Leader</th>
                <th>Interview Date</th>
                <th>Interview Time</th>
                <th>Candidate Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {Array.isArray(shortListedData) && shortListedData.map((item, index) => (
                <tr key={item.candidateId} className="selectedcandidaterows">
                  <td>{index + 1}</td>
                  <td>{item.candidateId}</td>
                  <td>{item.date}</td>
                  <td>{item.recruiterName}</td>
                  <td>{item.candidateName}</td>
                  <td>{item.candidateEmail}</td>
                  <td>{item.contactNumber}</td>
                  <td>{item.alternateNumber}</td>
                  <td>{item.sourceName}</td>
                  <td>{item.position}</td>
                  <td>{item.requirementId}</td>
                  <td>{item.requirementCompany}</td>
                  <td>{item.communicationRating}</td>
                  <td>{item.currentLocation}</td>
                  <td>{item.callingFeedback}</td>
                  <td>{item.selectYesOrNo}</td>
                  <td>{item.lineUp?.lineUpId}</td>
                  <td>{item.lineUp?.dateOfBirth}</td>
                  <td>{item.lineUp?.gender}</td>
                  <td>{item.lineUp?.qualification}</td>
                  <td>{item.lineUp?.yearOfPassing}</td>
                  <td>{item.lineUp?.extraCertification}</td>
                  <td>{item.lineUp?.companyName}</td>
                  <td>{item.lineUp?.totalExperience}</td>
                  <td>{item.lineUp?.currentCTC}</td>
                  <td>{item.lineUp?.expectedCTC}</td>
                  <td>{item.lineUp?.noticePeriod}</td>
                  <td>{item.lineUp?.holdingAnyOffer}</td>
                  <td>{item.lineUp?.feedBack}</td>
                  <td>{item.lineUp?.msgForTeamLeader}</td>
                  <td>{item.lineUp?.availabilityForInterview}</td>
                  <td>{item.lineUp?.interviewTime}</td>
                  <td>{item.lineUp?.finalStatus}</td>
                  <td>
                    <button onClick={() => viewPage(item.candidateId, item.requirementId)}>
                      Follow Up
                    </button>
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
