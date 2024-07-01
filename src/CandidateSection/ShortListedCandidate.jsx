// import React, { useState, useEffect } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import "../CandidateSection/shortlistedcandidate.css";
// import UpdateCallingTracker from "../EmployeeSection/UpdateSelfCalling";
// import InterviewDates from "../EmployeeSection/interviewDate";

// const ShortListedCandidates = ({ closeComponents, viewUpdatedPage }) => {
//   const [shortListedData, setShortListedData] = useState([]);
//   const [showUpdateCallingTracker, setShowUpdateCallingTracker] =
//     useState(false);
//   const [selectedCandidateId, setSelectedCandidateId] = useState(null);
//   const [showShareButton, setShowShareButton] = useState(true);
//   const [selectedEmployeeId, setSelectedEmployeeId] = useState(null);
//   const [selectedRequirementId, setSelectedRequirementId] = useState(null);
//   const [selectedRows, setSelectedRows] = useState([]);

//   const { employeeId } = useParams();
//   const newEmployeeId = parseInt(employeeId, 10);
//   const navigator = useNavigate();

//   useEffect(() => {
//     fetchShortListedData();
//   }, []);

//   const fetchShortListedData = async () => {
//     try {
//       const response = await fetch(
//         `http://192.168.1.38:8891/api/ats/157industries/shortListed-date/${newEmployeeId}`
//       );
//       const data = await response.json();
//       setShortListedData(data);
//     } catch (error) {
//       console.error("Error fetching shortlisted data:", error);
//     }
//   };

//   const handleUpdateSuccess = () => {
//     setShowUpdateCallingTracker(false);
//     fetchRejectedData();
//   };

//   const handleUpdate = (candidateId) => {
//     setSelectedCandidateId(candidateId);
//     setShowUpdateCallingTracker(true);
//   };

//   const handleMouseOver = (event) => {
//     const tableData = event.currentTarget;
//     const tooltip = tableData.querySelector(".tooltip");
//     const tooltiptext = tableData.querySelector(".tooltiptext");

//     if (tooltip && tooltiptext) {
//       const textOverflowing =
//         tableData.offsetWidth < tableData.scrollWidth ||
//         tableData.offsetHeight < tableData.scrollHeight;
//       if (textOverflowing) {
//         const rect = tableData.getBoundingClientRect();
//         tooltip.style.top = `${rect.top - 10}px`;
//         tooltip.style.left = `${rect.left + rect.width / 100}px`;
//         tooltip.style.visibility = "visible";
//       } else {
//         tooltip.style.visibility = "hidden";
//       }
//     }
//   };

//   const handleMouseOut = (event) => {
//     const tooltip = event.currentTarget.querySelector(".tooltip");
//     if (tooltip) {
//       tooltip.style.visibility = "hidden";
//     }
//   };
//   const handleShortlistedShare = (e) => {
//     e.preventDefault();
//     setShowShareButton(false);
//   };

//   const handleSelectAll = (event) => {
//     if (event.target.checked) {
//       const allRowIds = shortListedData.map((item) => item.candidateId);
//       setSelectedRows(allRowIds);
//     } else {
//       setSelectedRows([]);
//     }
//   };

//   const handleSelectRow = (candidateId) => {
//     setSelectedRows((prevSelectedRows) => {
//       if (prevSelectedRows.includes(candidateId)) {
//         return prevSelectedRows.filter((id) => id !== candidateId);
//       } else {
//         return [...prevSelectedRows, candidateId];
//       }
//     });
//   };

//   const handleSelectAllButton = (e) => {
//     e.preventDefault();
//     handleSelectAll();
//   };

//   return (
//     <div className="calling-list-container">
//       {!showUpdateCallingTracker ? (
//         <div className="attendanceTableData">
//           <div className="attendanceTableHeader">
//             <h6 style={{ color: "gray" }}>ShortListed Candidate Data </h6>
//             {showShareButton ? (
//               <button onClick={handleShortlistedShare}>Share</button>
//             ) : (
//               <>
//                 <div style={{ display: "flex", gap: "5px" }}>
//                   <button onClick={handleSelectAllButton}>Select All</button>
//                   <button>Forward</button>
//                 </div>
//               </>
//             )}
//           </div>
//           <table id="shortlisted-table-id" className="attendance-table">
//             <thead>
//               <tr className="attendancerows-head">
//                 {!showShareButton ? (
//                   <th className="attendanceheading">
//                     <input
//                       type="checkbox"
//                       onChange={handleSelectAll}
//                       checked={selectedRows.length === shortListedData.length}
//                       name="selectAll"
//                     />
//                   </th>
//                 ) : null}

//                 <th className="attendanceheading">Sr No.</th>
//                 <th className="attendanceheading">Date</th>
//                 <th className="attendanceheading">Time</th>
//                 <th className="attendanceheading">Candidate Id</th>
//                 <th className="attendanceheading">Recruiter Name</th>
//                 <th className="attendanceheading">Candidate Name</th>
//                 <th className="attendanceheading">Candidate Email</th>
//                 <th className="attendanceheading">Contact Number</th>
//                 <th className="attendanceheading">Alternate Number</th>
//                 <th className="attendanceheading">sourceName</th>
//                 <th className="attendanceheading">job Designation</th>
//                 <th className="attendanceheading">Job Id</th>
//                 <th className="attendanceheading">Applying Company</th>
//                 <th className="attendanceheading">Communication Rating</th>
//                 <th className="attendanceheading">Current Location</th>
//                 <th className="attendanceheading">Full Address</th>
//                 <th className="attendanceheading">Calling Feedback</th>
//                 <th className="attendanceheading">Incentive</th>
//                 <th className="attendanceheading">Interseed or Not</th>
//                 <th className="attendanceheading">Current Company</th>
//                 <th className="attendanceheading">Total Experience</th>
//                 <th className="attendanceheading">relevantExperience</th>
//                 <th className="attendanceheading">Current CTC</th>
//                 <th className="attendanceheading">Expected CTC</th>
//                 <th className="attendanceheading">Date Of Birth</th>
//                 <th className="attendanceheading">Gender</th>
//                 <th className="attendanceheading">Qualification</th>
//                 <th className="attendanceheading">Year Of Passing</th>
//                 <th className="attendanceheading">Extra Certification</th>
//                 <th className="attendanceheading">Feed Back</th>
//                 <th className="attendanceheading">Holding Any Offer</th>
//                 <th className="attendanceheading">Offer Letter Msg</th>
//                 <th className="attendanceheading">Resume</th>
//                 <th className="attendanceheading">NoticePeriod</th>
//                 <th className="attendanceheading">Msg For TeamLeader</th>
//                 <th className="attendanceheading">
//                   Availability For Interview
//                 </th>
//                 <th className="attendanceheading">Interview Time</th>
//                 <th className="attendanceheading">Final Status</th>
//                 <th className="attendanceheading">Action</th>
//               </tr>
//             </thead>
//             <tbody>
//               {shortListedData.map((item, index) => (
//                 <tr key={item.candidateId} className="attendancerows">
//                   {!showShareButton ? (
//                     <td className="tabledata">
//                       <input
//                         checked={selectedRows.includes(item.candidateId)}
//                         onChange={() => handleSelectRow(item.candidateId)}
//                         type="checkbox"
//                       />
//                     </td>
//                   ) : null}
//                   <td className="tabledata">{index + 1}</td>

//                   <td
//                     className="tabledata"
//                     onMouseOver={handleMouseOver}
//                     onMouseOut={handleMouseOut}
//                   >
//                     {item.date}
//                     <div className="tooltip">
//                       <span className="tooltiptext">{item.date}</span>
//                     </div>
//                   </td>

//                   <td
//                     className="tabledata"
//                     onMouseOver={handleMouseOver}
//                     onMouseOut={handleMouseOut}
//                   >
//                     {item.candidateAddedTime || "-"}
//                     <div className="tooltip">
//                       <span className="tooltiptext">
//                         {item.candidateAddedTime}
//                       </span>
//                     </div>
//                   </td>

//                   <td
//                     className="tabledata"
//                     onMouseOver={handleMouseOver}
//                     onMouseOut={handleMouseOut}
//                   >
//                     {item.candidateId}
//                     <div className="tooltip">
//                       <span className="tooltiptext">{item.candidateId}</span>
//                     </div>
//                   </td>

//                   <td
//                     className="tabledata"
//                     onMouseOver={handleMouseOver}
//                     onMouseOut={handleMouseOut}
//                   >
//                     {item.recruiterName}
//                     <div className="tooltip">
//                       <span className="tooltiptext">{item.recruiterName}</span>
//                     </div>
//                   </td>

//                   <td
//                     className="tabledata"
//                     onMouseOver={handleMouseOver}
//                     onMouseOut={handleMouseOut}
//                   >
//                     {item.candidateName}
//                     <div className="tooltip">
//                       <span className="tooltiptext">{item.candidateName}</span>
//                     </div>
//                   </td>

//                   <td
//                     className="tabledata"
//                     onMouseOver={handleMouseOver}
//                     onMouseOut={handleMouseOut}
//                   >
//                     {item.candidateEmail || "-"}
//                     <div className="tooltip">
//                       <span className="tooltiptext">{item.candidateEmail}</span>
//                     </div>
//                   </td>

//                   <td
//                     className="tabledata"
//                     onMouseOver={handleMouseOver}
//                     onMouseOut={handleMouseOut}
//                   >
//                     {item.contactNumber || "-"}
//                     <div className="tooltip">
//                       <span className="tooltiptext">{item.contactNumber}</span>
//                     </div>
//                   </td>

//                   <td
//                     className="tabledata"
//                     onMouseOver={handleMouseOver}
//                     onMouseOut={handleMouseOut}
//                   >
//                     {item.alternateNumber || 0}
//                     <div className="tooltip">
//                       <span className="tooltiptext">
//                         {item.alternateNumber}
//                       </span>
//                     </div>
//                   </td>

//                   <td
//                     className="tabledata"
//                     onMouseOver={handleMouseOver}
//                     onMouseOut={handleMouseOut}
//                   >
//                     {item.sourceName || 0}
//                     <div className="tooltip">
//                       <span className="tooltiptext">{item.sourceName}</span>
//                     </div>
//                   </td>

//                   <td
//                     className="tabledata"
//                     onMouseOver={handleMouseOver}
//                     onMouseOut={handleMouseOut}
//                   >
//                     {item.jobDesignation || "-"}
//                     <div className="tooltip">
//                       <span className="tooltiptext">{item.jobDesignation}</span>
//                     </div>
//                   </td>

//                   <td
//                     className="tabledata"
//                     onMouseOver={handleMouseOver}
//                     onMouseOut={handleMouseOut}
//                   >
//                     {item.requirementId || "-"}
//                     <div className="tooltip">
//                       <span className="tooltiptext">{item.requirementId}</span>
//                     </div>
//                   </td>

//                   <td
//                     className="tabledata"
//                     onMouseOver={handleMouseOver}
//                     onMouseOut={handleMouseOut}
//                   >
//                     {item.requirementCompany || "-"}
//                     <div className="tooltip">
//                       <span className="tooltiptext">
//                         {item.requirementCompany}
//                       </span>
//                     </div>
//                   </td>

//                   <td
//                     className="tabledata"
//                     onMouseOver={handleMouseOver}
//                     onMouseOut={handleMouseOut}
//                   >
//                     {item.communicationRating || "-"}
//                     <div className="tooltip">
//                       <span className="tooltiptext">
//                         {item.communicationRating}
//                       </span>
//                     </div>
//                   </td>

//                   <td
//                     className="tabledata"
//                     onMouseOver={handleMouseOver}
//                     onMouseOut={handleMouseOut}
//                   >
//                     {item.currentLocation || "-"}
//                     <div className="tooltip">
//                       <span className="tooltiptext">
//                         {item.currentLocation}
//                       </span>
//                     </div>
//                   </td>

//                   <td
//                     className="tabledata"
//                     onMouseOver={handleMouseOver}
//                     onMouseOut={handleMouseOut}
//                   >
//                     {item.fullAddress || "-"}
//                     <div className="tooltip">
//                       <span className="tooltiptext">{item.fullAddress} </span>
//                     </div>
//                   </td>

//                   <td
//                     className="tabledata"
//                     onMouseOver={handleMouseOver}
//                     onMouseOut={handleMouseOut}
//                   >
//                     {item.callingFeedback || "-"}
//                     <div className="tooltip">
//                       <span className="tooltiptext">
//                         {item.callingFeedback}
//                       </span>
//                     </div>
//                   </td>

//                   <td
//                     className="tabledata"
//                     onMouseOver={handleMouseOver}
//                     onMouseOut={handleMouseOut}
//                   >
//                     {item.incentive || "-"}
//                     <div className="tooltip">
//                       <span className="tooltiptext">{item.incentive}</span>
//                     </div>
//                   </td>

//                   <td
//                     className="tabledata"
//                     onMouseOver={handleMouseOver}
//                     onMouseOut={handleMouseOut}
//                   >
//                     {item.selectYesOrNo || "-"}
//                     <div className="tooltip">
//                       <span className="tooltiptext">{item.selectYesOrNo}</span>
//                     </div>
//                   </td>

//                   {item.lineUp && (
//                     <>
//                       <td
//                         className="tabledata"
//                         onMouseOver={handleMouseOver}
//                         onMouseOut={handleMouseOut}
//                       >
//                         {item.lineUp.companyName || "-"}
//                         <div className="tooltip">
//                           <span className="tooltiptext">
//                             {item.lineUp.companyName}
//                           </span>
//                         </div>
//                       </td>

//                       <td
//                         className="tabledata"
//                         onMouseOver={handleMouseOver}
//                         onMouseOut={handleMouseOut}
//                       >
//                         {item.lineUp.experienceYear || "0"}
//                         <div className="tooltip">
//                           <span className="tooltiptext">
//                             {item.lineUp.experienceYear}{" "}
//                           </span>
//                         </div>
//                         Years
//                         {item.lineUp.experienceMonth || "0"}
//                         <div className="tooltip">
//                           <span className="tooltiptext">
//                             {item.lineUp.experienceMonth}
//                           </span>
//                         </div>
//                         Months
//                       </td>

//                       <td
//                         className="tabledata"
//                         onMouseOver={handleMouseOver}
//                         onMouseOut={handleMouseOut}
//                       >
//                         {item.lineUp.relevantExperience || "-"}
//                         <div className="tooltip">
//                           <span className="tooltiptext">
//                             {item.lineUp.relevantExperience}
//                           </span>
//                         </div>
//                       </td>

//                       <td
//                         className="tabledata"
//                         onMouseOver={handleMouseOver}
//                         onMouseOut={handleMouseOut}
//                       >
//                         {`${item.lineUp.currentCTCLakh || 0} Lakh ${
//                           item.lineUp.currentCTCThousand || 0
//                         } Thousand`}
//                         <div className="tooltip">
//                           <span className="tooltiptext">{`${
//                             item.lineUp.expectedCTCLakh || 0
//                           } Lakh ${
//                             item.lineUp.expectedCTCThousand || 0
//                           } Thousand`}</span>
//                         </div>
//                       </td>

//                       <td
//                         className="tabledata"
//                         onMouseOver={handleMouseOver}
//                         onMouseOut={handleMouseOut}
//                       >
//                         {`${item.lineUp.expectedCTCLakh || 0} Lakh ${
//                           item.lineUp.expectedCTCThousand || 0
//                         } Thousand`}
//                         <div className="tooltip">
//                           <span className="tooltiptext">{`${
//                             item.lineUp.expectedCTCLakh || 0
//                           } Lakh ${
//                             item.lineUp.expectedCTCThousand || 0
//                           } Thousand`}</span>
//                         </div>
//                       </td>

//                       <td
//                         className="tabledata"
//                         onMouseOver={handleMouseOver}
//                         onMouseOut={handleMouseOut}
//                       >
//                         {item.lineUp.dateOfBirth || "-"}
//                         <div className="tooltip">
//                           <span className="tooltiptext">
//                             {item.lineUp.dateOfBirth}
//                           </span>
//                         </div>
//                       </td>

//                       <td
//                         className="tabledata"
//                         onMouseOver={handleMouseOver}
//                         onMouseOut={handleMouseOut}
//                       >
//                         {item.lineUp.gender || "-"}
//                         <div className="tooltip">
//                           <span className="tooltiptext">
//                             {item.lineUp.gender}
//                           </span>
//                         </div>
//                       </td>

//                       <td
//                         className="tabledata"
//                         onMouseOver={handleMouseOver}
//                         onMouseOut={handleMouseOut}
//                       >
//                         {item.lineUp.qualification || "-"}
//                         <div className="tooltip">
//                           <span className="tooltiptext">
//                             {item.lineUp.qualification}
//                           </span>
//                         </div>
//                       </td>

//                       <td
//                         className="tabledata"
//                         onMouseOver={handleMouseOver}
//                         onMouseOut={handleMouseOut}
//                       >
//                         {item.lineUp.yearOfPassing || "-"}
//                         <div className="tooltip">
//                           <span className="tooltiptext">
//                             {item.lineUp.yearOfPassing}
//                           </span>
//                         </div>
//                       </td>

//                       <td
//                         className="tabledata"
//                         onMouseOver={handleMouseOver}
//                         onMouseOut={handleMouseOut}
//                       >
//                         {item.lineUp.extraCertification || "-"}
//                         <div className="tooltip">
//                           <span className="tooltiptext">
//                             {item.lineUp.extraCertification}
//                           </span>
//                         </div>
//                       </td>

//                       <td
//                         className="tabledata"
//                         onMouseOver={handleMouseOver}
//                         onMouseOut={handleMouseOut}
//                       >
//                         {item.lineUp.feedBack || "-"}
//                         <div className="tooltip">
//                           <span className="tooltiptext">
//                             {item.lineUp.feedBack}
//                           </span>
//                         </div>
//                       </td>

//                       <td
//                         className="tabledata"
//                         onMouseOver={handleMouseOver}
//                         onMouseOut={handleMouseOut}
//                       >
//                         {item.lineUp.holdingAnyOffer || "-"}
//                         <div className="tooltip">
//                           <span className="tooltiptext">
//                             {item.lineUp.holdingAnyOffer}
//                           </span>
//                         </div>
//                       </td>

//                       <td
//                         className="tabledata"
//                         onMouseOver={handleMouseOver}
//                         onMouseOut={handleMouseOut}
//                       >
//                         {item.lineUp.offerLetterMsg || "-"}
//                         <div className="tooltip">
//                           <span className="tooltiptext">
//                             {item.lineUp.offerLetterMsg}
//                           </span>
//                         </div>
//                       </td>

//                       <td
//                         className="tabledata"
//                         onMouseOver={handleMouseOver}
//                         onMouseOut={handleMouseOut}
//                       >
//                         {item.lineUp.resume || "-"}
//                         <div className="tooltip">
//                           <span className="tooltiptext">
//                             {item.lineUp.resume}
//                           </span>
//                         </div>
//                       </td>

//                       <td
//                         className="tabledata"
//                         onMouseOver={handleMouseOver}
//                         onMouseOut={handleMouseOut}
//                       >
//                         {item.lineUp.noticePeriod || "-"}
//                         <div className="tooltip">
//                           <span className="tooltiptext">
//                             {item.lineUp.noticePeriod}
//                           </span>
//                         </div>
//                       </td>

//                       <td
//                         className="tabledata"
//                         onMouseOver={handleMouseOver}
//                         onMouseOut={handleMouseOut}
//                       >
//                         {item.lineUp.msgForTeamLeader || "-"}
//                         <div className="tooltip">
//                           <span className="tooltiptext">
//                             {item.lineUp.msgForTeamLeader}
//                           </span>
//                         </div>
//                       </td>

//                       <td
//                         className="tabledata"
//                         onMouseOver={handleMouseOver}
//                         onMouseOut={handleMouseOut}
//                       >
//                         {item.lineUp.availabilityForInterview || "-"}
//                         <div className="tooltip">
//                           <span className="tooltiptext">
//                             {item.lineUp.availabilityForInterview}
//                           </span>
//                         </div>
//                       </td>

//                       <td
//                         className="tabledata"
//                         onMouseOver={handleMouseOver}
//                         onMouseOut={handleMouseOut}
//                       >
//                         {item.lineUp.interviewTime || "-"}
//                         <div className="tooltip">
//                           <span className="tooltiptext">
//                             {item.lineUp.interviewTime}
//                           </span>
//                         </div>
//                       </td>

//                       <td
//                         className="tabledata"
//                         onMouseOver={handleMouseOver}
//                         onMouseOut={handleMouseOut}
//                       >
//                         {item.lineUp.finalStatus || "-"}
//                         <div className="tooltip">
//                           <span className="tooltiptext">
//                             {item.lineUp.finalStatus}
//                           </span>
//                         </div>
//                       </td>

//                       <td className="tabledata">
//                         <i
//                           onClick={() => handleUpdate(item.candidateId)}
//                           className="fa-regular fa-pen-to-square"
//                         ></i>
//                       </td>
//                     </>
//                   )}
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       ) : (
//         <UpdateCallingTracker
//           candidateId={selectedCandidateId}
//           employeeId={employeeId}
//           onSuccess={handleUpdateSuccess}
//           onCancel={() => setShowUpdateCallingTracker(false)}
//         />
//       )}
//     </div>
//   );
// };

// export default ShortListedCandidates;

import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../CandidateSection/shortlistedcandidate.css";
import UpdateCallingTracker from "../EmployeeSection/UpdateSelfCalling";
import InterviewDates from "../EmployeeSection/interviewDate";
import Modal from "react-bootstrap/Modal";

const ShortListedCandidates = ({ closeComponents, viewUpdatedPage }) => {
  const [shortListedData, setShortListedData] = useState([]);
  const [showUpdateCallingTracker, setShowUpdateCallingTracker] =
    useState(false);
  const [selectedCandidateId, setSelectedCandidateId] = useState(null);
  const [showFilterSection, setShowFilterSection] = useState(false);
  const [showselectedFilters, setShowselectedFilters] = useState(false);
  const [showSearchBar, setShowSearchBar] = useState(false);
  const [fetchEmployeeNameID, setFetchEmployeeNameID] = useState(null);
  const [showShareButton, setShowShareButton] = useState(true);
  const [selectedEmployeeId, setSelectedEmployeeId] = useState(null);
  const [selectedRows, setSelectedRows] = useState([]);
  const [allSelected, setAllSelected] = useState(false); // New state to track if all rows are selected
  const [showForwardPopup, setShowForwardPopup] = useState(false);

  const { employeeId } = useParams();
  const newEmployeeId = parseInt(employeeId, 10);
  const navigator = useNavigate();

  useEffect(() => {
    fetchShortListedData();
    fetchEmployeeNameAndID();
  }, []);

  const fetchEmployeeNameAndID = async () => {
    try {
      const response = await fetch(
        `http://192.168.1.39:8891/api/ats/157industries/names-and-ids`
      );
      const data = await response.json();
      setFetchEmployeeNameID(data);
    } catch (error) {
      console.error("Error fetching shortlisted data:", error);
    }
  };

  const fetchShortListedData = async () => {
    try {
      const response = await fetch(
        `http://192.168.1.39:8891/api/ats/157industries/shortListed-date/${newEmployeeId}`
      );
      const data = await response.json();
      setShortListedData(data);
    } catch (error) {
      console.error("Error fetching shortlisted data:", error);
    }
  };

  const handleUpdateSuccess = () => {
    setShowUpdateCallingTracker(false);
    fetchShortListedData(); // Corrected from fetchRejectedData to fetchShortListedData
  };

  const handleUpdate = (candidateId) => {
    setSelectedCandidateId(candidateId);
    setShowUpdateCallingTracker(true);
  };

  const handleMouseOver = (event) => {
    const tableData = event.currentTarget;
    const tooltip = tableData.querySelector(".tooltip");
    const tooltiptext = tableData.querySelector(".tooltiptext");

    if (tooltip && tooltiptext) {
      const textOverflowing =
        tableData.offsetWidth < tableData.scrollWidth ||
        tableData.offsetHeight < tableData.scrollHeight;
      if (textOverflowing) {
        const rect = tableData.getBoundingClientRect();
        tooltip.style.top = `${rect.top - 10}px`;
        tooltip.style.left = `${rect.left + rect.width / 100}px`;
        tooltip.style.visibility = "visible";
      } else {
        tooltip.style.visibility = "hidden";
      }
    }
  };

  const handleMouseOut = (event) => {
    const tooltip = event.currentTarget.querySelector(".tooltip");
    if (tooltip) {
      tooltip.style.visibility = "hidden";
    }
  };

  const handleSelectAll = () => {
    if (allSelected) {
      setSelectedRows([]);
    } else {
      const allRowIds = shortListedData.map((item) => item.candidateId);
      setSelectedRows(allRowIds);
    }
    setAllSelected(!allSelected);
  };

  const handleSelectRow = (candidateId) => {
    setSelectedRows((prevSelectedRows) => {
      if (prevSelectedRows.includes(candidateId)) {
        return prevSelectedRows.filter((id) => id !== candidateId);
      } else {
        return [...prevSelectedRows, candidateId];
      }
    });
  };

  const forwardSelectedCandidate = (e) => {
    e.preventDefault();
    if (selectedRows.length > 0) {
      setShowForwardPopup(true);
    }
  };

  const handleShare = async () => {
    if (selectedEmployeeId && selectedRows.length > 0) {
      const url = `http://192.168.1.39:8891/api/ats/157industries/updateEmployeeIds`; // Replace with your actual API endpoint

      const requestData = {
        employeeId: selectedEmployeeId,
        candidateIds: selectedRows,
      };

      const requestOptions = {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          // Add any additional headers as needed
        },
        body: JSON.stringify(requestData),
      };

      try {
        const response = await fetch(url, requestOptions);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        // Handle success response
        console.log("Candidates forwarded successfully!");
        setShowForwardPopup(false); // Close the modal or handle any further UI updates

        // Optionally, you can fetch updated data after successful submission
        // fetchShortListedData(); // Uncomment this if you want to refresh the data after forwarding
      } catch (error) {
        console.error("Error while forwarding candidates:", error);
        // Handle error scenarios or show error messages to the user
      }
    }
  };
  const toggleFilterSection = () => {
    setShowFilterSection(!showFilterSection);
  };
  const toggleselectedFilters = () => {
    setShowselectedFilters(!showselectedFilters);
  };


  return (
    <div className="calling-list-container">
      {!showUpdateCallingTracker ? (
        <div className="attendanceTableData">
          <div className="search">
                <i
                  className="fa-solid fa-magnifying-glass"
                  onClick={() => setShowSearchBar(!showSearchBar)}
                  style={{ margin: "10px", width: "auto", fontSize: "15px" }}
                ></i>
                <h5 style={{ color: "gray", paddingTop: "5px" }}>
                  Shortlisted Candidate
                </h5>

                <div
                  style={{
                    display: "flex",
                    gap: "5px",
                    justifyContent: "center",
                    alignItems: "center",
                    padding: "10px",
                  }}
                >
                  {showShareButton ? (
                    <button
                      className="callingList-share-btn"
                      onClick={() => setShowShareButton(false)}
                    >
                      Share
                    </button>
                  ) : (
                    <div style={{ display: "flex", gap: "5px" }}>
                      <button
                        className="callingList-share-close-btn"
                        onClick={() => setShowShareButton(true)}
                      >
                        Close
                      </button>
                      <button
                        className="callingList-share-select-btn"
                        onClick={handleSelectAll}
                      >
                        {allSelected ? "Deselect All" : "Select All"}
                      </button>
                      <button
                        className="callingList-forward-btn"
                        onClick={forwardSelectedCandidate}
                      >
                        Forward
                      </button>
                    </div>
                  )}
                  <button
                    className="callingList-filter-btn"
                    onClick={toggleFilterSection}
                  >
                    Filter <i className="fa-solid fa-filter"></i>
                  </button>
                </div>
              </div>

              {showSearchBar && (
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search here..."
                  value={searchTerm}
                  style={{ marginBottom: "10px" }}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              )}
              {showFilterSection && (
                <div className="filter-section">
                  <h3>Filter Options</h3>
                  <div className="filter-options-container">
                    {filterOptions.map((option) => {
                      const uniqueValues = Array.from(
                        new Set(callingList.map((item) => item[option]))
                      ).slice(0, 5);
                      return (
                        <div key={option} className="selfcalling-filter-option">
                          <button
                            className="callingList-filter-btn"
                            onClick={toggleselectedFilters}
                          >
                            {option}
                          </button>
                          {uniqueValues.map((value) => (
                            <label
                              key={value}
                              className="selfcalling-filter-value"
                            >
                              <input
                                type="checkbox"
                                checked={
                                  selectedFilters[option]?.includes(value) ||
                                  false
                                }
                                onChange={() =>
                                  handleFilterSelect(option, value)
                                }
                              />
                              {value}
                            </label>
                          ))}
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

          <div className="attendanceTableHeader">
         
          </div>
          <table id="shortlisted-table-id" className="attendance-table">
            <thead>
              <tr className="attendancerows-head">
                {!showShareButton ? (
                  <th className="attendanceheading">
                    <input
                      type="checkbox"
                      onChange={handleSelectAll}
                      checked={selectedRows.length === shortListedData.length}
                      name="selectAll"
                    />
                  </th>
                ) : null}
                <th className="attendanceheading"> No.</th>
                <th className="attendanceheading">Date</th>
                <th className="attendanceheading">Time</th>
                <th className="attendanceheading">Candidate's Id</th>
                <th className="attendanceheading">Recruiter's Name</th>
                <th className="attendanceheading">Candidate's Name</th>
                <th className="attendanceheading">Candidate's Email</th>
                <th className="attendanceheading">Contact Number</th>
                <th className="attendanceheading">Whatsapp Number</th>
                <th className="attendanceheading">Source Name</th>
                <th className="attendanceheading">Job Designation</th>
                <th className="attendanceheading">Job Id</th>
                <th className="attendanceheading">Applying Company</th>
                <th className="attendanceheading">Communication Rating</th>
                <th className="attendanceheading">Current Location</th>
                <th className="attendanceheading">Full Address</th>
                <th className="attendanceheading">Calling Remark</th>
                <th className="attendanceheading">Recruiter's Incentive</th>
                <th className="attendanceheading">Interested or Not</th>
                <th className="attendanceheading">Current Company</th>
                <th className="attendanceheading">Total Experience</th>
                <th className="attendanceheading">Relevant Experience</th>
                <th className="attendanceheading">Current CTC</th>
                <th className="attendanceheading">Expected CTC</th>
                <th className="attendanceheading">Date Of Birth</th>
                <th className="attendanceheading">Gender</th>
                <th className="attendanceheading">Education</th>
                <th className="attendanceheading">Year Of Passing</th>
                <th className="attendanceheading">Call Summary</th>{/* call summary */}
                {/* <th className="attendanceheading">Feedback</th> */}
                <th className="attendanceheading">Holding Any Offer</th>
                <th className="attendanceheading">Offer Letter Message</th>
                <th className="attendanceheading">Upload Resume</th>
                <th className="attendanceheading">Notice Period</th>
                <th className="attendanceheading">Message For Team Leader</th>
                <th className="attendanceheading">Interview Slot</th>
                <th className="attendanceheading">Interview Time</th>
                <th className="attendanceheading">Final Status</th>
                <th className="attendanceheading">Action</th>
              </tr>
            </thead>
            <tbody>
              {shortListedData.map((item, index) => (
                <tr key={item.candidateId} className="attendancerows">
                  {!showShareButton ? (
                    <td className="tabledata">
                      <input
                        type="checkbox"
                        checked={selectedRows.includes(item.candidateId)}
                        onChange={() => handleSelectRow(item.candidateId)}
                      />
                    </td>
                  ) : null}
                  <td className="tabledata">{index + 1}</td>
                  <td
                    className="tabledata"
                    onMouseOver={handleMouseOver}
                    onMouseOut={handleMouseOut}
                  >
                    {item.date}
                    <div className="tooltip">
                      <span className="tooltiptext">{item.date}</span>
                    </div>
                  </td>
                  <td
                    className="tabledata"
                    onMouseOver={handleMouseOver}
                    onMouseOut={handleMouseOut}
                  >
                    {item.candidateAddedTime}
                    <div className="tooltip">
                      <span className="tooltiptext">
                        {item.candidateAddedTime}
                      </span>
                    </div>
                  </td>
                  <td
                    className="tabledata"
                    onMouseOver={handleMouseOver}
                    onMouseOut={handleMouseOut}
                  >
                    {item.candidateId}
                    <div className="tooltip">
                      <span className="tooltiptext">{item.candidateId}</span>
                    </div>
                  </td>
                  <td
                    className="tabledata"
                    onMouseOver={handleMouseOver}
                    onMouseOut={handleMouseOut}
                  >
                    {item.recruiterName}
                    <div className="tooltip">
                      <span className="tooltiptext">{item.recruiterName}</span>
                    </div>
                  </td>
                  <td
                    className="tabledata"
                    onMouseOver={handleMouseOver}
                    onMouseOut={handleMouseOut}
                  >
                    {item.candidateName}
                    <div className="tooltip">
                      <span className="tooltiptext">{item.candidateName}</span>
                    </div>
                  </td>
                  <td
                    className="tabledata"
                    onMouseOver={handleMouseOver}
                    onMouseOut={handleMouseOut}
                  >
                    {item.candidateEmail}
                    <div className="tooltip">
                      <span className="tooltiptext">{item.candidateEmail}</span>
                    </div>
                  </td>
                  <td
                    className="tabledata"
                    onMouseOver={handleMouseOver}
                    onMouseOut={handleMouseOut}
                  >
                    {item.contactNumber}
                    <div className="tooltip">
                      <span className="tooltiptext">{item.contactNumber}</span>
                    </div>
                  </td>
                  <td
                    className="tabledata"
                    onMouseOver={handleMouseOver}
                    onMouseOut={handleMouseOut}
                  >
                    {item.alternateNumber}
                    <div className="tooltip">
                      <span className="tooltiptext">
                        {item.alternateNumber}
                      </span>
                    </div>
                  </td>
                  <td
                    className="tabledata"
                    onMouseOver={handleMouseOver}
                    onMouseOut={handleMouseOut}
                  >
                    {item.sourceName}
                    <div className="tooltip">
                      <span className="tooltiptext">{item.sourceName}</span>
                    </div>
                  </td>
                  <td
                    className="tabledata"
                    onMouseOver={handleMouseOver}
                    onMouseOut={handleMouseOut}
                  >
                    {item.jobDesignation}
                    <div className="tooltip">
                      <span className="tooltiptext">{item.jobDesignation}</span>
                    </div>
                  </td>
                  <td
                    className="tabledata"
                    onMouseOver={handleMouseOver}
                    onMouseOut={handleMouseOut}
                  >
                    {item.jobId}
                    <div className="tooltip">
                      <span className="tooltiptext">{item.jobId}</span>
                    </div>
                  </td>
                  <td
                    className="tabledata"
                    onMouseOver={handleMouseOver}
                    onMouseOut={handleMouseOut}
                  >
                    {item.applyingCompany}
                    <div className="tooltip">
                      <span className="tooltiptext">
                        {item.applyingCompany}
                      </span>
                    </div>
                  </td>
                  <td
                    className="tabledata"
                    onMouseOver={handleMouseOver}
                    onMouseOut={handleMouseOut}
                  >
                    {item.communicationRating}
                    <div className="tooltip">
                      <span className="tooltiptext">
                        {item.communicationRating}
                      </span>
                    </div>
                  </td>
                  <td
                    className="tabledata"
                    onMouseOver={handleMouseOver}
                    onMouseOut={handleMouseOut}
                  >
                    {item.currentLocation}
                    <div className="tooltip">
                      <span className="tooltiptext">
                        {item.currentLocation}
                      </span>
                    </div>
                  </td>
                  <td
                    className="tabledata"
                    onMouseOver={handleMouseOver}
                    onMouseOut={handleMouseOut}
                  >
                    {item.fullAddress}
                    <div className="tooltip">
                      <span className="tooltiptext">{item.fullAddress}</span>
                    </div>
                  </td>
                  <td className="tabledata">{item.callingFeedback}</td>
                  <td className="tabledata">{item.incentive}</td>
                  <td className="tabledata">{item.interseedOrNot}</td>
                  <td className="tabledata">{item.currentCompany}</td>
                  <td className="tabledata">{item.totalExperience}</td>
                  <td className="tabledata">{item.relevantExperience}</td>
                  <td className="tabledata">{item.currentCTC}</td>
                  <td className="tabledata">{item.expectedCTC}</td>
                  <td className="tabledata">{item.dateOfBirth}</td>
                  <td className="tabledata">{item.gender}</td>
                  <td className="tabledata">{item.qualification}</td>
                  <td className="tabledata">{item.yearOfPassing}</td>
                  <td className="tabledata">{item.extraCertification}</td>
                  {/* <td className="tabledata">{item.feedback}</td> */}
                  <td className="tabledata">{item.holdingAnyOffer}</td>
                  <td className="tabledata">{item.offerLetterMsg}</td>
                  <td className="tabledata">{item.resume}</td>
                  <td className="tabledata">{item.noticePeriod}</td>
                  <td className="tabledata">{item.msgForTeamLeader}</td>
                  <td className="tabledata">{item.availabilityForInterview}</td>
                  <td className="tabledata">{item.interviewTime}</td>
                  <td className="tabledata">{item.finalStatus}</td>
                  <td className="tabledata">
                    <button
                      
                      onClick={() => handleUpdate(item.candidateId)}
                    >
                      Update
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {showForwardPopup ? (
            <>
              <div
                className="bg-black bg-opacity-50 modal show"
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  position: "fixed",
                  width: "100%",
                  height: "100vh",
                }}
              >
                <Modal.Dialog
                  style={{
                    width: "500px",
                    height: "800px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginTop: "100px",
                  }}
                >
                  <Modal.Header
                    style={{ fontSize: "18px", backgroundColor: "#f2f2f2" }}
                  >
                    Forward To
                  </Modal.Header>
                  <Modal.Body
                    style={{
                      display: "grid",
                      gap: "10px",
                      gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
                      backgroundColor: "#f2f2f2",
                    }}
                  >
                    {fetchEmployeeNameID.map((item) => (
                      <>
                        <div
                          key={`${item[0]}`}
                          className=""
                          style={{
                            display: "flex",
                            gap: "20px",
                            columnSpan: "span 1 / span 1",
                          }}
                        >
                          <input
                            type="radio"
                            id={`${item[0]}`}
                            name="forward"
                            value={`${item[0]}`}
                            onChange={(e) =>
                              setSelectedEmployeeId(e.target.value)
                            }
                          />
                          <label htmlFor={`${item[0]}`}>{item[1]}</label>
                        </div>
                      </>
                    ))}
                  </Modal.Body>
                  <Modal.Footer style={{ backgroundColor: "#f2f2f2" }}>
                    <button
                      onClick={handleShare}
                      className="shortlistedcan-share-forward-popup-btn"
                    >
                      Share
                    </button>
                    <button
                      onClick={() => setShowForwardPopup(false)}
                      className="shortlistedcan-close-forward-popup-btn"
                    >
                      Close
                    </button>
                  </Modal.Footer>
                </Modal.Dialog>
              </div>
            </>
          ) : null}
        </div>
      ) : (
        <UpdateCallingTracker
          candidateId={selectedCandidateId}
          closeComponent={() => setShowUpdateCallingTracker(false)}
          updateSuccess={handleUpdateSuccess}
        />
      )}
    </div>
  );
};

export default ShortListedCandidates;
