// import React, { useState, useEffect } from "react";
// import {
//   BsPeopleFill,
//   BsGrid1X2Fill,
//   BsFillGrid3X3GapFill,
//   BsFillArchiveFill,
//   BsListCheck,
//   BsMenuButtonWideFill,
//   BsFillGearFill,
//   BsX,
//   BsXSquareFill
// } from "react-icons/bs";
// import "./sideBar.css";
// import Header from "./header";
// import { useNavigate, useParams } from "react-router-dom";
// import { getEmployeeWorkData } from "../api/api";
// import SelfCalling from "../EmployeeSection/selfCallingTracker";

// function Sidebar({
//   openSidebarToggle,
//   OpenSidebar,
//   toggleSelfCalling,
//   toggelLineUp,
//   toggleCallingTrackerForm,
//   toggleShortListed,
//   toggleSelectCandidate,
//   toggleRejectedCandidate,
//   toggleHoldCandidate,
//   toggleExcelCalling,
//   toggleJobDescription,
//   toggleInterviewDate,
// }) {
//   const [candidateDropdown, setCandidateDropdown] = useState(false);
//   const [mainLineDropdown, setMainLineDropdown] = useState(false);
//   const [employeeDropdown, setEmployeeDropdown] = useState(false);
//   const [portalDropdown, setPortalDropdown] = useState(false);

//   const [showSidebar, setShowSidebar] = useState(true); 
//   const [isSidebarMinimized, setIsSidebarMinimized] = useState(false);
  
//   const [isCardOpen, setIsCardOpen] = useState(true);

//   // const { employeeId } = useParams();
//   const [workData, setWorkData] = useState([]);
//   const [error, setError] = useState("");
//   const [showCallingTrackerForm, setShowCallingTrackerForm] = useState(false);
//   const [showLineupForm, setShowLineupForm] = useState(false);
//   const [showWorkData, setShowWorkData] = useState(true);
//   const [showCandidateMenu, setShowCandidateMenu] = useState(false);
//   const [showLists, setShowLists] = useState(false);
//   const [showportal, setShowPortal] = useState(false);

//   const [showUploadExcel, setShowUploadExcel] = useState(false);
//   const [showExcelLists, setShowExcelLists] = useState(false);
//   const [showDailyTarget, setShowDailyTarget] = useState(false);
//   const [showDataComponent, setShowDataComponent] = useState(false);
//   const [showselfCallingTracker, setShowSelfCallingTracker] = useState(false);
//   const [showInterviewDate, setshowInterviewDate] = useState(false);

//   const navigator = useNavigate();

//   const navigater = useNavigate();
//   const { employeeId } = useParams();
//   const empid = parseInt(employeeId);

//   useEffect(() => {
//     if (!employeeId) {
//       navigator("/employee-login");
//     } else {
//       getEmployeeWorkData(employeeId)
//         .then((response) => {
//           setWorkData(response.data);
//           setError("");
//           console.log(employeeId + " Employee ID in employee");
//         })
//         .catch((error) => {
//           console.error("Error fetching work data:", error);
//           setError("Error fetching work data.");
//         });
//     }
//   }, [employeeId]);

//   const handleClose = () => {
//     setIsCardOpen(false);
//   };

//   console.log(empid + "side id");

//   const toggleCandidateDropdown = (e) => {
//     e.preventDefault();
//     setCandidateDropdown(!candidateDropdown);
//   };

//   const toggleEmployeeDropdown = (e) => {
//     e.preventDefault();
//     setEmployeeDropdown(!employeeDropdown);
//   };

//   const toggleMainLineDropdown = (e) => {
//     e.preventDefault();
//     setMainLineDropdown(!mainLineDropdown);
//   };
//   const togglePortalDropdown = (e) => {
//     e.preventDefault();
//     setPortalDropdown(!portalDropdown);
//   };

//   const handleLogout = async () => {
//     try {
//       await axios.post(
//         "http://192.168.1.38:8891/api/ats/157industries/add-data",
//         {
//           targetValue: 10,
//           archived: 0,
//           date: formatDate(new Date()),
//         }
//       );
//       console.log("WorkData loaded ");
//       navigator("/employee-login");
//     } catch (error) {
//       console.error("Error adding data to the database:", error);
//     }
    
//   };
//   // const toggleSidebar = (toggleMinimizedSidebar) => {
//   //   setShowSidebar(!showSidebar);
//   // };
//   const toggleSidebar = () => {
//     setIsSidebarMinimized(!isSidebarMinimized);
//   };
  
//     // Function to toggle minimized sidebar state
//     const toggleMinimizedSidebar = () => {
//       setIsSidebarMinimized(!isSidebarMinimized);
//     };

//   const openNaukriPlatform = () => {
//     window.open("https://www.naukri.com/mnjuser/homepage", "_blank");
//   };
  
//   const openLinkedinPlatform = () => {
//     window.open("https://www.linkedin.com/feed/", "_blank");
//   };

//   const openTimesPlatform = () => {
//     window.open("", "_blank");
//   };

//   const openIndeedPlatform = () => {
//     window.open("https://in.indeed.com/?from=gnav-homepage", "_blank");
//   };
//   return (
//     <>
//       <aside
//         id="sidebar"
//         // className={`${openSidebarToggle ? "sidebar-responsive" : ""}${isSidebarMinimized ? "sidebar-minimized" : ""}`}
//         // onClick={OpenSidebar}
//         // className={`${isSidebarMinimized ? "mini-sidebar" : ""}`}
//         className={`${showSidebar ? "" : "sidebar-hidden"} ${isSidebarMinimized ? "sidebar-minimized" : ""}`}

//       >
//         <div className="sidebar-title">
//           <div className="sidebar-brand">
//             <BsMenuButtonWideFill className="icon_header" /> &nbsp; &nbsp; &nbsp; ATS
//           </div>
//           <span className="icon-close-icon" onClick={toggleSidebar}>
//           <button className="icon-close-icon"><BsXSquareFill />
//             </button>
// </span>

//         </div>
//         <ul className="sidebar-list">
//           {/* <li className="sidebar-list-item">
//             <a href="">
//               <BsListCheck className="icon" />
//               Daily Target
//             </a>
//           </li> */}
//           <li className="sidebar-list-item">
//             <button className="todays-Interview-btn" onClick={() => toggleInterviewDate()}>
//               <BsGrid1X2Fill className="icon" /> &nbsp; 

//               Today's Interview
//               </button>
//           </li>
//           <li className="sidebar-list-item">
//             <button className="add-Candidate-btn" onClick={() => toggleCallingTrackerForm()}>
//               <BsPeopleFill className="icon" /> &nbsp;
//               Add Candidate
//             </button>
//           </li>
//           <li className="sidebar-list-item">
//             <button className="candidate-Section-btn" onClick={toggleCandidateDropdown}>
//               <BsPeopleFill className="icon" />&nbsp; 
//               Candidate Section
//             </button>
//             {candidateDropdown && (
//               <ul className="sub-menu">
//                 <li className="sidebar-list-item">
//                   <button className="shortlisted-Candidate-btn" onClick={() => toggleShortListed()}>
//                     <BsGrid1X2Fill className="icon" />&nbsp;
//                     Shortlisted Candidate
//                   </button>
//                 </li>
//                 <li className="sidebar-list-item">
//                   <button className="selected-Candidate-btn" onClick={() => toggleSelectCandidate()}>
//                     <BsGrid1X2Fill className="icon" />&nbsp;
//                     Selected Candidate
//                   </button>
//                 </li>
//                 <li className="sidebar-list-item">
//                   <button className="hold-Candidate-btn" onClick={() => toggleHoldCandidate()}>
//                     <BsFillGrid3X3GapFill className="icon" />&nbsp;
//                     Hold Candidate
//                   </button>
//                 </li>
//                 <li className="sidebar-list-item">
//                   <button className="rejected-Candidate-btn" onClick={() => toggleRejectedCandidate()}>
//                     <BsFillArchiveFill className="icon" />&nbsp;
//                     Rejected Candidate
//                   </button>
//                 </li>
//               </ul>
//             )}
//           </li>
//           <li className="sidebar-list-item">
//             <div>
//               <button className="job-Descriptione-btn" onClick={toggleJobDescription}>
//                 <BsGrid1X2Fill className="icon" />&nbsp;
//                  Job Description
//               </button>
//             </div>
//           </li>
//           <li className="sidebar-list-item">
//             <button className="employee-Section-btn" onClick={toggleEmployeeDropdown}>
//               <BsPeopleFill className="icon" />&nbsp;
//               Employee Section
//             </button>
//             {employeeDropdown && (
//               <ul className="sub-menu">
//                 <li className="sidebar-list-item">
//                   <button className="self-Calling-btn" onClick={() => toggleSelfCalling()}>
//                     <BsPeopleFill className="icon" />&nbsp;
//                     Self Calling
//                   </button>
//                 </li>
//                 <li className="sidebar-list-item">
//                   <button className="self-LineUp-btn" onClick={() => toggelLineUp()}>
//                     <BsGrid1X2Fill className="icon" />&nbsp;
//                     Self LineUp
//                   </button>
//                 </li>
//                 <li className="sidebar-list-item">
//                   <button className="self-Offer-Work-btn">
//                     <BsGrid1X2Fill className="icon" />&nbsp;
//                     Self Offer Work
//                   </button>
//                 </li>
//               </ul>
//             )}
//           </li>

//           <li className="sidebar-list-item">
//             <button className="exel-Work-btn" onClick={toggleMainLineDropdown}>
//               <BsPeopleFill className="icon" />&nbsp;
//               Exel Work
//             </button>
//             {mainLineDropdown && (
//               <ul className="sub-menu">
//                 <li className="sidebar-list-item">
//                   <button className="exel-Calling-btn" onClick={() => toggleExcelCalling()}>
//                   <BsPeopleFill className="icon" />&nbsp;
//                     Excel Calling
//                   </button>
//                 </li>
//                 <li className="sidebar-list-item">
//                   <button className="exel-Line-Up-btn">
//                     <BsPeopleFill className="icon" />&nbsp;
//                     Excel Line Up
//                   </button>
//                 </li>
//                 <li className="sidebar-list-item">
//                   <button className="exel-Offers-btn">
//                     <BsPeopleFill className="icon" />&nbsp;
//                     Excel Offers
//                   </button>
//                 </li>
//               </ul>
//             )}
//           </li>

//           {/* Other sidebar list items */}

//           <li className="sidebar-list-item">
//           <button className="chat-Section-btn">
//               <BsMenuButtonWideFill className="icon" />&nbsp;
//               Chat Section
//             </button>
//           </li>
//           <li className="sidebar-list-item">
//             <button className="portal-btn" onClick={togglePortalDropdown}>
//               <BsPeopleFill className="icon" />&nbsp;
//                Portal
//             </button>
//             {portalDropdown && (
//               <ul className="sub-menu">
//                 <li className="sidebar-list-item">
//                   <button className="naukri-btn" onClick={openNaukriPlatform}>
//                     <BsGrid1X2Fill className="icon" />&nbsp;
//                     Naukri
//                   </button>
//                 </li>
//                 <li className="sidebar-list-item">
//                 <button className="linkedin-btn" onClick={openLinkedinPlatform}>
//                     <BsGrid1X2Fill className="icon" />&nbsp;
//                     Linkedin 
//                   </button>
//                 </li>
//                 <li className="sidebar-list-item">
//                   <button className="times-btn" onClick={openTimesPlatform}>
//                     <BsFillGrid3X3GapFill className="icon" />&nbsp;
//                   Times
//                   </button>
//                 </li>
//                 <li className="sidebar-list-item">
//                   <button className="indeed-btn" onClick={openIndeedPlatform}>
//                     <BsFillArchiveFill className="icon" />&nbsp;
//                   Indeed 
//                   </button>
//                 </li>
//               </ul>
//             )}
//           </li>
//           {/* <li className="sidebar-list-item">
//             <button className="sidebar-logout-btn" onClick={handleLogout}>
//               <BsListCheck className="icon" />
//               Logout
//             </button>
//           </li> */}
//         </ul>
//       </aside>


//        {/* Mini sidebar with only icon */}
//        {/* <div className={`mini-sidebar ${isSidebarMinimized ? "mini-sidebar-visible" : ""}`}> */}
      
      
//        <aside id="mini-side"
//         className={`mini-sidebar ${isSidebarMinimized ? "mini-sidebar-visible" : "mini-sidebar-hidden"}`}
//         >
       
//        <div className="mini-sidebar-title">
//        <div className="mini-sidebar-brand">
//             <BsMenuButtonWideFill className="icon_header" /> 
//           </div>
//           <span className="icon-open-icon" onClick={toggleSidebar}>
//           {'>'}
//         </span>
//         </div>
//         <ul className="sidebar-list">
//         <li className="sidebar-list-item">
//             <button className="todays-Interview-btn" onClick={() => toggleInterviewDate()}>
//               <BsGrid1X2Fill className="icon" />
//               </button>
//           </li>
//           <li className="sidebar-list-item">
//             <button className="add-Candidate-btn" onClick={() => toggleCallingTrackerForm()}>
//               <BsPeopleFill className="icon" /> 
//             </button>
//           </li>
//           <li className="sidebar-list-item">
//             <button className="candidate-Section-btn" onClick={toggleCandidateDropdown}>
//               <BsPeopleFill className="icon" />
//             </button>
//             {candidateDropdown && (
//               <ul className="sub-menu">
//                 <li className="sidebar-list-item">
//                   <button className="shortlisted-Candidate-btn" onClick={() => toggleShortListed()}>
//                     <BsGrid1X2Fill className="icon" />
//                   </button>
//                 </li>
//                 <li className="sidebar-list-item">
//                   <button className="selected-Candidate-btn" onClick={() => toggleSelectCandidate()}>
//                     <BsGrid1X2Fill className="icon" />
//                   </button>
//                 </li>
//                 <li className="sidebar-list-item">
//                   <button className="hold-Candidate-btn" onClick={() => toggleHoldCandidate()}>
//                     <BsFillGrid3X3GapFill className="icon" />
//                   </button>
//                 </li>
//                 <li className="sidebar-list-item">
//                   <button className="rejected-Candidate-btn" onClick={() => toggleRejectedCandidate()}>
//                     <BsFillArchiveFill className="icon" />
//                   </button>
//                 </li>
//               </ul>
//                )}
//                </li>

//                <li className="sidebar-list-item">
//             <div>
//               <button className="job-Descriptione-btn" onClick={toggleJobDescription}>
//                 <BsGrid1X2Fill className="icon" />
//               </button>
//             </div>
//           </li>

//           <li className="sidebar-list-item">
//             <button className="employee-Section-btn" onClick={toggleEmployeeDropdown}>
//               <BsPeopleFill className="icon" />
//             </button>
//             {employeeDropdown && (
//               <ul className="sub-menu">
//                 <li className="sidebar-list-item">
//                   <button className="self-Calling-btn" onClick={() => toggleSelfCalling()}>
//                     <BsPeopleFill className="icon" />
//                   </button>
//                 </li>
//                 <li className="sidebar-list-item">
//                   <button className="self-LineUp-btn" onClick={() => toggelLineUp()}>
//                     <BsGrid1X2Fill className="icon" />
//                   </button>
//                 </li>
//                 <li className="sidebar-list-item">
//                   <button className="self-Offer-Work-btn">
//                     <BsGrid1X2Fill className="icon" />
//                   </button>
//                 </li>
//               </ul>
//             )}
//           </li>

//           <li className="sidebar-list-item">
//             <button className="exel-Work-btn" onClick={toggleMainLineDropdown}>
//               <BsPeopleFill className="icon" />
              
//             </button>
//             {mainLineDropdown && (
//               <ul className="sub-menu">
//                 <li className="sidebar-list-item">
//                   <button className="exel-Calling-btn" onClick={() => toggleExcelCalling()}>
//                   <BsPeopleFill className="icon" />
//                   </button>
//                 </li>
//                 <li className="sidebar-list-item">
//                   <button className="exel-Line-Up-btn">
//                     <BsPeopleFill className="icon" />
//                   </button>
//                 </li>
//                 <li className="sidebar-list-item">
//                   <button className="exel-Offers-btn">
//                     <BsPeopleFill className="icon" />
//                   </button>
//                 </li>
//               </ul>
//             )}
//           </li>
//           <li className="sidebar-list-item">
//           <button className="chat-Section-btn">
//               <BsMenuButtonWideFill className="icon" />
//             </button>
//           </li>
//           <li className="sidebar-list-item">
//             <button className="portal-btn" onClick={togglePortalDropdown}>
//               <BsPeopleFill className="icon" />
               
//             </button>
//             {portalDropdown && (
//               <ul className="sub-menu">
//                 <li className="sidebar-list-item">
//                   <button className="naukri-btn" onClick={openNaukriPlatform}>
//                     <BsGrid1X2Fill className="icon" />
                    
//                   </button>
//                 </li>
//                 <li className="sidebar-list-item">
//                 <button className="linkedin-btn" onClick={openLinkedinPlatform}>
//                     <BsGrid1X2Fill className="icon" />
                     
//                   </button>
//                 </li>
//                 <li className="sidebar-list-item">
//                   <button className="times-btn" onClick={openTimesPlatform}>
//                     <BsFillGrid3X3GapFill className="icon" />
                  
//                   </button>
//                 </li>
//                 <li className="sidebar-list-item">
//                   <button className="indeed-btn" onClick={openIndeedPlatform}>
//                     <BsFillArchiveFill className="icon" />
//                     </button>
//                 </li>
//               </ul>
//             )}
//           </li>

//           </ul>
          

//           </aside>
//           <span className={`icon-${showSidebar ? "close" : "open"}-icon`} onClick={toggleSidebar}>
//         {showSidebar ? <BsX /> : <BsMenuButtonWideFill />}
//       </span> 
//     </>
//   );
// }

// export default Sidebar;


// #################     #######################           #####################      ######################################

import React, { useState, useEffect } from 'react';
import '../EmployeeDashboard/sideBar.css';
import { useNavigate, useParams } from "react-router-dom";
import { getEmployeeWorkData } from "../api/api";
import axios from 'axios';

function Sidebar({
  openSidebarToggle,
  OpenSidebar,
  toggleSelfCalling,
  toggelLineUp,
  toggleCallingTrackerForm,
  toggleShortListed,
  toggleSelectCandidate,
  toggleRejectedCandidate,
  toggleHoldCandidate,
  toggleExcelCalling,
  toggleJobDescription,
  toggleInterviewDate,
  toggleAttendance,
}) {
  const [workData, setWorkData] = useState([]);
  const [error, setError] = useState("");
  const [isActive, setIsActive] = useState(false);
  const navigator = useNavigate();
  const { employeeId } = useParams();
  const empid = parseInt(employeeId);

  useEffect(() => {
    if (!employeeId) {
      navigator("/employee-login");
    } else {
      getEmployeeWorkData(employeeId)
        .then((response) => {
          setWorkData(response.data);
          setError("");
          console.log(employeeId + " Employee ID in employee");
        })
        .catch((error) => {
          console.error("Error fetching work data:", error);
          setError("Error fetching work data.");
        });
    }
  }, [employeeId]);

  const toggleSidebar = () => {
    setIsActive(!isActive);
  };

  const toggleSubMenu = (e) => {
    e.preventDefault();
    const parentLi = e.currentTarget.parentElement;
    const subMenu = parentLi.querySelector('.sub-menu');

    document.querySelectorAll('.sub-menu').forEach((menu) => {
      if (menu !== subMenu) {
        menu.classList.remove('active');
      }
    });

    if (subMenu) {
      subMenu.classList.toggle('active');
    }
  };

  const toggleSubMenu1 = (e) => {
    e.preventDefault();
    const parentLi = e.currentTarget.parentElement;
    const subMenu1 = parentLi.querySelector('.sub-menu1');

    document.querySelectorAll('.sub-menu1').forEach((menu) => {
      if (menu !== subMenu1) {
        menu.classList.remove('active');
      }
    });

    if (subMenu1) {
      subMenu1.classList.toggle('active');
    }
  };

  const toggleSubMenu2 = (e) => {
    e.preventDefault();
    const parentLi = e.currentTarget.parentElement;
    const subMenu2 = parentLi.querySelector('.sub-menu2');

    document.querySelectorAll('.sub-menu2').forEach((menu) => {
      if (menu !== subMenu2) {
        menu.classList.remove('active');
      }
    });

    if (subMenu2) {
      subMenu2.classList.toggle('active');
    }
  };

  const handleLogout = async () => {
    try {
      await axios.post(
        "http://192.168.1.33:8891/api/ats/157industries/add-data",
        {
          targetValue: 10,
          archived: 0,
          date: formatDate(new Date()),
        }
      );
      console.log("WorkData loaded ");
      navigator("/employee-login");
    } catch (error) {
      console.error("Error adding data to the database:", error);
    }
  };

  const openNaukriPlatform = () => {
    window.open("https://www.naukri.com/mnjuser/homepage", "_blank");
  };

  const openLinkedinPlatform = () => {
    window.open("https://www.linkedin.com/feed/", "_blank");
  };

  const openTimesPlatform = () => {
    window.open("", "_blank");
  };

  const openIndeedPlatform = () => {
    window.open("https://in.indeed.com/?from=gnav-homepage", "_blank");
  };

  return (
    <div className={`sidebar ${isActive ? 'active' : ''}`}>
      <div className='head'></div>
      <div className="sidebar-menu-btn" onClick={toggleSidebar}>
        <i className={`ph-bold ph-caret-${isActive ? 'right' : 'left'}`}></i>
      </div>
      
      <div className="nav">
        <div className="sidebar-menu">
          {/* <p className="sidebar-title-main">Main</p> */}
          <ul>
            <li onClick={toggleInterviewDate}>
              <a href="#">
                <i className="icon ph-bold ph-house-simple"></i>
                <span className="sidebar-text">Today's Interview</span>
              </a>
            </li>
            <li onClick={toggleCallingTrackerForm}>
              <a href="#">
                <i className="icon ph-bold ph-house-simple"></i>
                <span className="sidebar-text">Add Candidate</span>
              </a>
            </li>
            <li className={isActive ? "active" : ""} onClick={toggleSubMenu}>
              <a href="">
                <i className="icon ph-bold ph-user"></i>
                <span className="sidebar-text">Candidate Section</span>
                <i className="arrow ph-bold ph-caret-down"></i>
              </a>
              <ul className="sub-menu">
                <li onClick={toggleShortListed}>
                  <a href="#">
                    <span className="sidebar-text">Shortlisted Candidate</span>
                  </a>
                </li>
                <li onClick={toggleSelectCandidate}>
                  <a href="#">
                    <span className="sidebar-text">Selected Candidate</span>
                  </a>
                </li>
                <li onClick={toggleHoldCandidate}>
                  <a href="#">
                    <span className="sidebar-text">Hold Candidate</span>
                  </a>
                </li>
                <li onClick={toggleRejectedCandidate}>
                  <a href="#">
                    <span className="sidebar-text">Rejected Candidate</span>
                  </a>
                </li>
              </ul>
            </li>
            <li onClick={toggleJobDescription}>
              <a href="#">
                <i className="icon ph-bold ph-file-text"></i>
                <span className="sidebar-text">Job Description</span>
              </a>
            </li>
            <li className={isActive ? "active" : ""} onClick={toggleSubMenu1}>
              <a href="">
                <i className="icon ph-bold ph-chart-bar"></i>
                <span className="sidebar-text">Employee Section</span>
                <i className="arrow ph-bold ph-caret-down"></i>
              </a>
              <ul className="sub-menu sub-menu1">
                <li onClick={toggleSelfCalling}>
                  <a href=" ">
                    <span className="sidebar-text">Self Calling</span>
                  </a>
                </li>
                <li onClick={toggelLineUp}>
                  <a href="#">
                    <span className="sidebar-text">Self LineUp</span>
                  </a>
                </li>
                <li>
                  <a href="#">
                    <span className="sidebar-text">Self Offer Work</span>
                  </a>
                </li>
                <li onClick={toggleAttendance}>
                  <a href="#">
                    <span className="sidebar-text">My Attendance </span>
                  </a>
                </li>
              </ul>
            </li>
            <li className={isActive ? "active" : ""} onClick={toggleSubMenu2}>
              <a href="">
                <i className="icon ph-bold ph-chart-bar"></i>
                <span className="sidebar-text">Excel Work</span>
                <i className="arrow ph-bold ph-caret-down"></i>
              </a>
              <ul className="sub-menu sub-menu1 sub-menu2">
                <li onClick={toggleExcelCalling}>
                  <a href="#">
                    <span className="sidebar-text">Excel Calling</span>
                  </a>
                </li>
                <li>
                  <a href="#">
                    <span className="sidebar-text">Excel Line Up</span>
                  </a>
                </li>
                <li>
                  <a href="#">
                    <span className="sidebar-text">Excel Offers</span>
                  </a>
                </li>
              </ul>
            </li>
          </ul>
        </div>

        <div className="sidebar-menu">
          {/* <p className="title">Chat Section</p> */}
          <ul>
            <li>
              <a href="#">
                <i className="icon ph-bold ph-gear"></i>
                <span className="sidebar-text">Chat Section</span>
              </a>
            </li>
          </ul>
        </div>

        <div className="sidebar-menu">
          {/* <p className="title">Account</p> */}
          <ul>
            <li className={isActive ? "active" : ""} onClick={toggleSubMenu2}>
              <a href="">
                <i className="icon ph-bold ph-chart-bar"></i>
                <span className="sidebar-text">Portal</span>
                <i className="arrow ph-bold ph-caret-down"></i>
              </a>
              <ul className="sub-menu sub-menu1 sub-menu2">
                <li>
                  <a href="#">
                    <span className="sidebar-text" onClick={openNaukriPlatform}>
                      Naukri
                    </span>
                  </a>
                </li>
                <li>
                  <a href="#">
                    <span className="sidebar-text" onClick={openLinkedinPlatform}>
                      LinkedIn
                    </span>
                  </a>
                </li>
                <li>
                  <a href="#">
                    <span className="sidebar-text" onClick={openTimesPlatform}>
                      Times Jobs
                    </span>
                  </a>
                </li>
                <li>
                  <a href="#">
                    <span className="sidebar-text" onClick={openIndeedPlatform}>
                      Indeed
                    </span>
                  </a>
                </li>
              </ul>
            </li>
            <li>
              <a href="#" onClick={handleLogout}>
                <i className="icon ph-bold ph-sign-out"></i>
                <span className="sidebar-text">Logout</span>
              </a>
            </li>
          </ul>
        </div>
        
      </div>
    </div>
  );
}

export default Sidebar;
