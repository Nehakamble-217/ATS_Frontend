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
        `http://192.168.1.40:8891/api/ats/157industries/selected-candidate/${employeeId}`
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
      <h5 style={{color:"gray",paddingTop:"5px"}}>SelectedCandidate List</h5>
      <div className="c1-subdiv attendanceTableData">
        <div  >
          
          <div>
          <table className="selected-candidate-table attendance-table">
              <thead>
                <tr className='attendancerows-head'>
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
                {shortListedData.map((item, index) => (
                  <tr key={item.candidateId} className=" attendancerows">
                    <td className="tabledata" style={{ fontSize: "16px" }}>{index + 1} 
                    
                    </td>
                    <td className="tabledata" style={{ fontSize: "16px" }}>{item.date} 
                     <div className="tooltip">
                      
                      <span className="tooltiptext">{item.date} </span>
                    </div>
                    </td>
                    <td className="tabledata c1-tabledate" style={{ fontSize: "16px" }} >{item.candidateId} 
                     <div className="tooltip">
                      
                      <span className="tooltiptext">{item.candidateId}</span>
                    </div>
                    </td>
                    <td className="tabledata" style={{ fontSize: "16px" }}>{item.recruiterName} 
                     <div className="tooltip">
                      
                      <span className="tooltiptext">{item.recruiterName} </span>
                    </div>
                    </td>
                    <td className="tabledata" style={{ fontSize: "16px" }}>{item.candidateName} 
                     <div className="tooltip">
                      
                      <span className="tooltiptext">{item.candidateName}</span>
                    </div>
                    </td>
                    <td className="tabledata" style={{ fontSize: "16px" }}>{item.candidateEmail} 
                     <div className="tooltip">
                      
                      <span className="tooltiptext">{item.candidateEmail} </span>
                    </div>
                    </td>
                    <td className="tabledata" style={{ fontSize: "16px" }}>{item.contactNumber} 
                     <div className="tooltip">
                      
                      <span className="tooltiptext">{item.contactNumber}</span>
                    </div>
                    </td>
                    <td className="tabledata" style={{ fontSize: "16px" }}>{item.alternateNumber} 
                     <div className="tooltip">
                      
                      <span className="tooltiptext">{item.alternateNumber} </span>
                    </div>
                    </td>
                    <td className="tabledata" style={{ fontSize: "16px" }}>{item.sourceName} 
                     <div className="tooltip">
                      
                      <span className="tooltiptext">{item.sourceName}</span>
                    </div>
                    </td>
                    <td className="tabledata" style={{ fontSize: "16px" }}>{item.position} 
                     <div className="tooltip">
                      
                      <span className="tooltiptext">{item.position}</span>
                    </div>
                    </td>
                    <td className="tabledata" style={{ fontSize: "16px" }}>{item.requirementId} 
                     <div className="tooltip">
                      
                      <span className="tooltiptext">{item.requirementId} </span>
                    </div>
                    </td>
                    <td className="tabledata" style={{ fontSize: "16px" }}>
                      {item.requirementCompany}
                     
                      <div className="tooltip">
                      
                      <span className="tooltiptext">{item.requirementCompany}</span>
                    </div>
                     </td>
                    <td className="tabledata" style={{ fontSize: "16px" }}>
                      {item.communicationRating}
                     
                      <div className="tooltip">
                      
                      <span className="tooltiptext">{item.communicationRating}</span>
                    </div>
                     </td>
                    <td className="tabledata" style={{ fontSize: "16px" }}>{item.currentLocation} 
                     <div className="tooltip">
                      
                      <span className="tooltiptext">{item.currentLocation}</span>
                    </div>
                    </td>
                    <td className="tabledata" style={{ fontSize: "16px" }}>{item.callingFeedback} 
                     <div className="tooltip">
                      
                      <span className="tooltiptext">{item.callingFeedback} </span>
                    </div>
                    </td>
                    <td className="tabledata" style={{ fontSize: "16px" }}>{item.selectYesOrNo} 
                     <div className="tooltip">
                      
                      <span className="tooltiptext">{item.selectYesOrNo}</span>
                    </div>
                    </td>
                    <td className="tabledata">{item.lineUp?.lineUpId} 
                     <div className="tooltip">
                      
                      <span className="tooltiptext">{item.lineUp?.lineUpId} </span>
                    </div>
                    </td>
                    <td className="tabledata">{item.lineUp?.dateOfBirth} 
                     <div className="tooltip">
                      
                      <span className="tooltiptext">{item.lineUp?.dateOfBirth} </span>
                    </div>
                    </td>
                    <td className="tabledata">{item.lineUp?.gender} 
                     <div className="tooltip">
                      
                      <span className="tooltiptext">{item.lineUp?.gender} </span>
                    </div>
                    </td>
                    <td className="tabledata">{item.lineUp?.qualification} 
                     <div className="tooltip">
                      
                      <span className="tooltiptext">{item.lineUp?.qualification} </span>
                    </div>
                    </td>
                    <td className="tabledata">{item.lineUp?.yearOfPassing} 
                     <div className="tooltip">
                      
                      <span className="tooltiptext">{item.lineUp?.yearOfPassing}</span>
                    </div>
                    </td>
                    <td className="tabledata">{item.lineUp?.extraCertification} 
                     <div className="tooltip">
                      
                      <span className="tooltiptext">{item.lineUp?.extraCertification} </span>
                    </div>
                    </td>
                    <td className="tabledata">{item.lineUp?.companyName} 
                     <div className="tooltip">
                      
                      <span className="tooltiptext">{item.lineUp?.companyName} </span>
                    </div>
                    </td>
                    <td className="tabledata">{item.lineUp?.totalExperience} 
                     <div className="tooltip">
                      
                      <span className="tooltiptext">{item.lineUp?.totalExperience}</span>
                    </div>
                    </td>
                    <td className="tabledata">{item.lineUp?.currentCTC} 
                     <div className="tooltip">
                      
                      <span className="tooltiptext">{item.lineUp?.currentCTC} </span>
                    </div>
                    </td>
                    <td className="tabledata">{item.lineUp?.expectedCTC} 
                     <div className="tooltip">
                      
                      <span className="tooltiptext">{item.lineUp?.expectedCTC} </span>
                    </div>
                    </td>
                    <td className="tabledata">{item.lineUp?.noticePeriod} 
                     <div className="tooltip">
                      
                      <span className="tooltiptext">{item.lineUp?.noticePeriod} </span>
                    </div>
                    </td>
                    <td className="tabledata">{item.lineUp?.holdingAnyOffer} 
                     <div className="tooltip">
                      
                      <span className="tooltiptext">{item.lineUp?.holdingAnyOffer} </span>
                    </div>
                    </td>
                    <td className="tabledata">{item.lineUp?.feedBack} 
                     <div className="tooltip">
                      
                      <span className="tooltiptext">{item.lineUp?.feedBack}</span>
                    </div>
                    </td>
                    <td className="tabledata">{item.lineUp?.msgForTeamLeader} 
                     <div className="tooltip">
                      
                      <span className="tooltiptext">{item.lineUp?.msgForTeamLeader} </span>
                    </div>
                    </td>
                    <td className="tabledata">{item.lineUp?.availabilityForInterview} 
                     <div className="tooltip">
                      
                      <span className="tooltiptext">{item.lineUp?.availabilityForInterview}</span>
                    </div>
                    </td>
                    <td className="tabledata">{item.lineUp?.interviewTime} 
                     <div className="tooltip">
                      
                      <span className="tooltiptext">{item.lineUp?.interviewTime} </span>
                    </div>
                    </td>
                    <td className="tabledata">{item.lineUp?.finalStatus} 
                     <div className="tooltip">
                      
                      <span className="tooltiptext">{item.lineUp?.finalStatus}</span>
                    </div>
                    </td>
                    <td style={{ fontSize: "16px" ,textAlign:"center", whiteSpace:"nowrap"}}>
                     
                        <i  onClick={() => viewPage(item.candidateId)} class="fa-solid fa-person-walking-arrow-right"></i>
                   
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