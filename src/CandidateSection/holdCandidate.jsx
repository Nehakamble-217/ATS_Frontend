// // SelectedCandidate component
// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { useParams } from "react-router-dom";
// import '../EmployeeSection/callingList.css'

// const HoldCandidate = () => {
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
//           `http://192.168.1.40:8891/api/ats/157industries/hold-candidate/${employeeId}`
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
//       <h2 className="mb-4">Hold Candidate Details</h2>
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
//               <tr>
//                 <td>{candidate[8]}</td>
//                 <td>{candidate[4]}</td>
//                 <td>{candidate[2]}</td>
//                 <td>{candidate[10]}</td>
//                 <td>{candidate[6]}</td>
//                 <td>{candidate[3]}</td>
//                 <td>{candidate[5]}</td>
//                 <td>{candidate[7]}</td>
//                 <td>{candidate[9]}</td>
//                 <td>{candidate[11]}</td>
//                 <td>{candidate[13]}</td>
//                 <td>{candidate[14]}</td>
//                 <td>{candidate[15]}</td>
//                 <td>{candidate[1]}</td>
//                 <td>
//                   <button>Follow Up</button>
//                 </td>
//               </tr>
//             </tbody>
//           </table>
//         </div>
//       )}
//     </div>
//   );
// };

// export default HoldCandidate;

// import React, { useState, useEffect } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import '../CandidateSection/holdCandidate.css'

// const HoldCandidate = () => {
//     const [shortListedData, setShortListedData] = useState([]);
//     const [selectedCandidate, setSelectedCandidate] = useState(null);

//     const { employeeId } = useParams();
//     const newEmployeeId = parseInt(employeeId, 10);

//     const navigator = useNavigate();

//     useEffect(() => {
//         fetchShortListedData();
//     }, []);

//     const fetchShortListedData = async () => {
//         try {
//             const response = await fetch(
//               `http://192.168.1.38:8891/api/ats/157industries/hold-candidate/${employeeId}`
//             );
//             const data = await response.json();
//             setShortListedData(data);
//         } catch (error) {
//             console.error("Error fetching shortlisted data:", error);
//         }
//     };

//     const viewPage = (candidateId) => {
//         navigator`(/view-dates/${candidateId})`;
//     }

//     return (
//         <div className="c1-mainDiv">
//             <div className="c1-subdiv" >
//                 <div >
//                     <h2>HoldCandidate Candidates 77</h2>
//                     <div>
//                         <table className="c1-shortTable">
//                             <thead>
//                                 <tr>
//                                     <th className="c1-tableheading1" >Candidate ID</th>
//                                     <th className="c1-tableheading1" >Date</th>
//                                     <th className="c1-tableheading1">Recruiter Name</th>
//                                     <th className="c1-tableheading1">Candidate Name</th>
//                                     <th className="c1-tableheading1">Position</th>
//                                     <th className="c1-tableheading1">Requirement Company</th>
//                                     <th className="c1-tableheading1">Contact Number</th>
//                                     <th className="c1-tableheading1">Alternate Number</th>
//                                     <th className="c1-tableheading1">Candidate Email</th>
//                                     <th className="c1-tableheading1">Current Company</th>
//                                     <th className="c1-tableheading1">Current CTC</th>
//                                     <th className="c1-tableheading1">Expected CTC</th>
//                                     <th className="c1-tableheading1">Current Location</th>
//                                     <th className="c1-tableheading1">Total Experience</th>
//                                     <th className="c1-tableheading1">Notice Period</th>
//                                     <th className="c1-tableheading1">Holding Any Offer</th>
//                                     <th className="c1-tableheading1">Feedback</th>
//                                     <th className="c1-tableheading1">Final Status</th>
//                                     <th className="c1-tableheading1">Action</th>
//                                 </tr>
//                             </thead>
//                             <tbody>
//                                 {shortListedData.map((item) => (
//                                     <tr key={item.candidateId}>
//                                         <td className="c1-tabledate">{item.candidateId}</td>
//                                         <td className="c1-tabledate">{item.date}</td>
//                                         <td className="c1-tabledate">{item.recruiterName}</td>
//                                         <td className="c1-tabledate">{item.candidateName}</td>
//                                         <td className="c1-tabledate">{item.position}</td>
//                                         <td className="c1-tabledate">{item.requirementCompany}</td>
//                                         <td className="c1-tabledate">{item.contactNumber}</td>
//                                         <td className="c1-tabledate">{item.alternateNumber}</td>
//                                         <td className="c1-tabledate">{item.lineUp?.candidateEmail}</td>
//                                         <td className="c1-tabledate">{item.lineUp?.companyName}</td>
//                                         <td className="c1-tabledate">{item.lineUp?.currentCTC}</td>
//                                         <td className="c1-tabledate">{item.lineUp?.expectedCTC}</td>
//                                         <td className="c1-tabledate">{item.lineUp?.currentLocation}</td>
//                                         <td className="c1-tabledate">{item.lineUp?.totalExperience}</td>
//                                         <td className="c1-tabledate">{item.lineUp?.noticePeriod}</td>
//                                         <td className="c1-tabledate">{item.lineUp?.holdingAnyOffer}</td>
//                                         <td className="c1-tabledate">{item.lineUp?.feedBack}</td>
//                                         <td className="c1-tabledate">{item.lineUp?.finalStatus}</td>
//                                         <td className="c1-tabledate">
//                                             <button className="btn btn-info" onClick={() => viewPage(item.candidateId)}>View</button>
//                                         </td>
//                                     </tr>
//                                 ))}
//                             </tbody>
//                         </table>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default HoldCandidate;


// ---------------------------                    --------------------------------       ---------------------------



import React, { useState, useEffect } from "react";
// import "../CandidateSection/holdCandidate.css";
import { useNavigate, useParams } from "react-router-dom";
import './holdCandidate.css'

const HoldCandidate = () => {
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
        `http://192.168.1.40:8891/api/ats/157industries/hold-candidate/${employeeId}`
      );
      const data = await response.json();
      setShortListedData(data);
    } catch (error) {
      console.error("Error fetching shortlisted data:", error);
    }
  };

  const viewPage = (candidateId) => {
    navigator(`/update-calling-data/${employeeId}/${candidateId}`);
  };

  return (
    <div>
      <div>
        <div>
          {/* <h2>HoldCandidate Candidates 77</h2> */}
          <div>
            <table className="shortlistedcandidate">
              <thead className="shortlisted-tablehead">
                <tr className="shortlistedheading" >
                  <th>Sr No.</th>
                  <th>Candidate Id.</th>
                  <th>Date</th>
                  <th>Recruiter Name</th>
                  <th >Candidate Name</th>
                  <th >Candidate Email</th>
                  <th >Contact Number</th>
                  <th >Alternate Number</th>
                  <th >Source Name</th>
                  <th >Position</th>
                  <th >Requirement id</th>
                  <th >Requirement Company</th>
                  <th >Communication Rating</th>
                  <th >Location</th>
                  <th >CallingFeedback</th>
                  <th >Interested / Eligible</th>
                  <th >Line Up Id</th>
                  <th >Date Of Birth</th>
                  <th >Gender</th>
                  <th >Qualification</th>
                  <th >Year Of Passing</th>
                  <th >Extra Certification</th>
                  <th >Current Company Name</th>
                  <th >Total Experince</th>
                  <th >Current CTC</th>
                  <th >Expected CTC</th>
                  <th >Notice Period</th>
                  <th >Any Offer Letter</th>
                  <th >Feed Back</th>
                  <th >Messege For Team Leader</th>
                  <th >Interview Date</th>
                  <th >interview Time</th>
                  <th >Candidate Status</th>
                  <th >Action</th>
                </tr>
              </thead>
              <tbody>
                {shortListedData.map((item, index) => (
                  <tr key={item.candidateId} className="tabledaterow">
                    <td>{index + 1}</td>
                    <td >{item.date}</td>
                    <td>{item.candidateId}</td>
                    <td >{item.recruiterName}</td>
                    <td >{item.candidateName}</td>
                    <td >{item.candidateEmail}</td>
                    <td >{item.contactNumber}</td>
                    <td >{item.alternateNumber}</td>
                    <td >{item.sourceName}</td>
                    <td >{item.position}</td>
                    <td >{item.requirementId}</td>
                    <td >{item.requirementCompany}</td>
                    <td >{item.communicationRating}</td>
                    <td >{item.currentLocation}</td>
                    <td >{item.callingFeedback}</td>
                    <td >{item.selectYesOrNo}</td>
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
                    <td >
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

export default HoldCandidate;