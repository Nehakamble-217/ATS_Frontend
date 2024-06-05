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
        `http://192.168.1.41:8891/api/ats/157industries/hold-candidate/${employeeId}`
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
    <div>
       <h5 style={{color:"gray",paddingTop:"5px"}}>HoldCandidate List</h5> 
      <div className="attendanceTableData">
       
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
                {shortListedData.map((item, index) => (
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

export default HoldCandidate;