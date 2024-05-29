// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { useParams } from "react-router-dom";


// const SelectedCandidate = () => {
//   const { employeeId } = useParams();
//   const [candidate, setCandidate] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     console.log("Fetching candidate with ID:", employeeId);
//     const fetchCandidate = async () => {
//       setLoading(true);
//       setError(null);

//       try {
//         console.log("Fetching candidate with ID:", employeeId);

//         const response = await axios.get(
//           `http://192.168.1.40:8891/api/ats/157industries/selected-candidate/${employeeId}`
//         );
//         console.log("Response from API:", response.data);
//         setCandidate(response.data[0]);
//       } catch (error) {
//         console.error("Error fetching candidate:", error);
//         setError("Error fetching candidate. Please try again.");
//       } finally {
//         setLoading(false);
//       }
//     };
//     if (employeeId) {
//       fetchCandidate();
//     }
//   }, [employeeId]);

//   return (
//     <div className="calling-list-container">
//       <h2 className="mb-4">Selected Candidate Details</h2>
//       <hr />
//       {loading && <p>Loading...</p>}
//       {error && <p className="text-danger">{error}</p>}
//       {candidate && (
//         <div className="table-container">
//           <table className="calling-table">
//             <thead>
//               <tr>
//                 <th>Name</th>
//                 <th>Email</th>
//                 <th>Contact</th>
//                 <th>Designation</th>
//                 <th>Experience</th>
//                 <th>Current Salary</th>
//                 <th>Expected Salary</th>
//                 <th>Location</th>
//                 <th>Previous Company</th>
//                 <th>Qualification</th>
//                 <th>Skills</th>
//                 <th>Feedback</th>
//                 <th>Notice Period</th>
//                 <th>Any Offer Letter</th>
//                 <th>Action</th>
//               </tr>
//             </thead>
//             <tbody>
//                                 {shortListedData.map((item) => (
//                                     <tr key={item.candidateId}>
//                                         <td className="c1-tabledate"  style={{whiteSpace:"nowrap"}}>{item.candidateId}</td>
//                                         <td className="c1-tabledate"  style={{whiteSpace:"nowrap"}}>{item.date}</td>
//                                         <td className="c1-tabledate"  style={{whiteSpace:"nowrap"}}>{item.recruiterName}</td>
//                                         <td className="c1-tabledate"  style={{whiteSpace:"nowrap"}}>{item.candidateName}</td>
//                                         <td className="c1-tabledate"  style={{whiteSpace:"nowrap"}}>{item.position}</td>
//                                         <td className="c1-tabledate"  style={{whiteSpace:"nowrap"}}>{item.requirementCompany}</td>
//                                         <td className="c1-tabledate"  style={{whiteSpace:"nowrap"}}>{item.contactNumber}</td>
//                                         <td className="c1-tabledate"  style={{whiteSpace:"nowrap"}}>{item.alternateNumber}</td>
//                                         <td className="c1-tabledate"  style={{whiteSpace:"nowrap"}}>{item.lineUp.candidateEmail}</td>
//                                         <td className="c1-tabledate"  style={{whiteSpace:"nowrap"}}>{item.lineUp.companyName}</td>
//                                         <td className="c1-tabledate"  style={{whiteSpace:"nowrap"}}>{item.lineUp.currentCTC}</td>
//                                         <td className="c1-tabledate"  style={{whiteSpace:"nowrap"}}>{item.lineUp.expectedCTC}</td>
//                                         <td className="c1-tabledate"  style={{whiteSpace:"nowrap"}}>{item.lineUp.currentLocation}</td>
//                                         <td className="c1-tabledate"  style={{whiteSpace:"nowrap"}}>{item.lineUp.totalExperience}</td>
//                                         <td className="c1-tabledate"  style={{whiteSpace:"nowrap"}}>{item.lineUp.noticePeriod}</td>
//                                         <td className="c1-tabledate"  style={{whiteSpace:"nowrap"}}>{item.lineUp.holdingAnyOffer}</td>
//                                         <td className="c1-tabledate"  style={{whiteSpace:"nowrap"}}>{item.lineUp.feedBack}</td>
//                                         <td className="c1-tabledate"  style={{whiteSpace:"nowrap"}}>{item.lineUp.finalStatus}</td>
//                                         <td className="c1-tabledate" style={{whiteSpace:"nowrap"}} >
//                                             <button onClick={() => viewPage(item.candidateId)}>View</button>
//                                         </td>
//                                     </tr>
//                                 ))}
//                             </tbody>

//           </table>
//         </div>
//       )}
//     </div>
//   );
// };

// export default SelectedCandidate;
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import './selectedcandidate.css'

const SelectedCandidate = () => {
  const [shortListedData, setShortListedData] = useState([]);
  const [selectedCandidate, setSelectedCandidate] = useState(null);

  const { employeeId } = useParams();
  const newEmployeeId = parseInt(employeeId, 10);

  const navigator = useNavigate();

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

  const viewPage = (candidateId) => {
    navigator(`/follow-up/${candidateId}`);
  };

  return (
    <div className="c1-mainDiv">
      <div className="c1-subdiv">
        <div>
          {/* <h2>Selected Candidates 16</h2> */}
          <div>
          <table className="selected-candidate-table">
              <thead>
                <tr>
                  <th style={{ fontSize: "16px", whiteSpace:"nowrap" }}>Sr No.</th>
                  <th style={{ fontSize: "16px" , whiteSpace:"nowrap"}}>Candidate Id.</th>
                  <th style={{ fontSize: "16px" , whiteSpace:"nowrap"}}>Date</th>
                  <th style={{ fontSize: "16px" , whiteSpace:"nowrap"}}>Recruiter Name</th>
                  <th style={{ fontSize: "16px" , whiteSpace:"nowrap"}}>Candidate Name</th>
                  <th style={{ fontSize: "16px" , whiteSpace:"nowrap"}}>Candidate Email</th>
                  <th style={{ fontSize: "16px" , whiteSpace:"nowrap"}}>Contact Number</th>
                  <th style={{ fontSize: "16px" , whiteSpace:"nowrap"}}>Alternate Number</th>
                  <th style={{ fontSize: "16px" , whiteSpace:"nowrap"}}>Source Name</th>
                  <th style={{ fontSize: "16px" , whiteSpace:"nowrap"}}>Position</th>
                  <th style={{ fontSize: "16px" , whiteSpace:"nowrap"}}>Requirement id</th>
                  <th style={{ fontSize: "16px" , whiteSpace:"nowrap"}}>Requirement Company</th>
                  <th style={{ fontSize: "16px" , whiteSpace:"nowrap"}}>Communication Rating</th>
                  <th style={{ fontSize: "16px" , whiteSpace:"nowrap"}}>Location</th>
                  <th style={{ fontSize: "16px" , whiteSpace:"nowrap"}}>CallingFeedback</th>
                  <th style={{ fontSize: "16px" , whiteSpace:"nowrap"}}>Interested / Eligible</th>
                  <th style={{ fontSize: "16px" , whiteSpace:"nowrap"}}>Line Up Id</th>
                  <th style={{ fontSize: "16px" , whiteSpace:"nowrap"}}>Date Of Birth</th>
                  <th style={{ fontSize: "16px" , whiteSpace:"nowrap"}}>Gender</th>
                  <th style={{ fontSize: "16px" , whiteSpace:"nowrap"}}>Qualification</th>
                  <th style={{ fontSize: "16px" , whiteSpace:"nowrap"}}>Year Of Passing</th>
                  <th style={{ fontSize: "16px" , whiteSpace:"nowrap"}}>Extra Certification</th>
                  <th style={{ fontSize: "16px" , whiteSpace:"nowrap"}}>Current Company Name</th>
                  <th style={{ fontSize: "16px" , whiteSpace:"nowrap"}}>Total Experince</th>
                  <th style={{ fontSize: "16px" , whiteSpace:"nowrap"}}>Current CTC</th>
                  <th style={{ fontSize: "16px" , whiteSpace:"nowrap"}}>Expected CTC</th>
                  <th style={{ fontSize: "16px" , whiteSpace:"nowrap"}}>Notice Period</th>
                  <th style={{ fontSize: "16px" , whiteSpace:"nowrap"}}>Any Offer Letter</th>
                  <th style={{ fontSize: "16px" , whiteSpace:"nowrap"}}>Feed Back</th>
                  <th style={{ fontSize: "16px" , whiteSpace:"nowrap"}}>Messege For Team Leader</th>
                  <th style={{ fontSize: "16px" , whiteSpace:"nowrap"}}>Interview Date</th>
                  <th style={{ fontSize: "16px" , whiteSpace:"nowrap"}}>interview Time</th>
                  <th style={{ fontSize: "16px" , whiteSpace:"nowrap"}}>Candidate Status</th>
                  <th style={{ fontSize: "16px" , whiteSpace:"nowrap"}}>Action</th>
                </tr>
              </thead>
              <tbody>
                {shortListedData.map((item, index) => (
                  <tr key={item.candidateId} className="selectedcandidaterows">
                    <td style={{ fontSize: "16px" }}>{index + 1}</td>
                    <td style={{ fontSize: "16px" }}>{item.date}</td>
                    <td className="c1-tabledate">{item.candidateId}</td>
                    <td style={{ fontSize: "16px" }}>{item.recruiterName}</td>
                    <td style={{ fontSize: "16px" }}>{item.candidateName}</td>
                    <td style={{ fontSize: "16px" }}>{item.candidateEmail}</td>
                    <td style={{ fontSize: "16px" }}>{item.contactNumber}</td>
                    <td style={{ fontSize: "16px" }}>{item.alternateNumber}</td>
                    <td style={{ fontSize: "16px" }}>{item.sourceName}</td>
                    <td style={{ fontSize: "16px" }}>{item.position}</td>
                    <td style={{ fontSize: "16px" }}>{item.requirementId}</td>
                    <td style={{ fontSize: "16px" }}>
                      {item.requirementCompany}
                    </td>
                    <td style={{ fontSize: "16px" }}>
                      {item.communicationRating}
                    </td>
                    <td style={{ fontSize: "16px" }}>{item.currentLocation}</td>
                    <td style={{ fontSize: "16px" }}>{item.callingFeedback}</td>
                    <td style={{ fontSize: "16px" }}>{item.selectYesOrNo}</td>
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
                    <td style={{ fontSize: "16px" , whiteSpace:"nowrap"}}>
                      <button
                      
                        // className="btn btn-info"
                        onClick={() => viewPage(item.candidateId)}
                      >
                        Flow Up
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SelectedCandidate;