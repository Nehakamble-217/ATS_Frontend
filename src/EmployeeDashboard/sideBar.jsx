import React, { useState, useEffect } from 'react';
import '../EmployeeDashboard/sideBar.css';
import { useNavigate, useParams } from "react-router-dom";
import { getEmployeeWorkData } from "../api/api";
import Circle from "../LogoImages/circle.png";
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
  toggleAllMasterSheet,
  toggleEmployeeMasterSheet,
  handleLogout,

}) {
  const [workData, setWorkData] = useState([]);
  const [error, setError] = useState("");
  const [isActive, setIsActive] = useState(false);
  const [activeSubMenu, setActiveSubMenu] = useState(null); // Track the active submenu
  const [activeButton, setActiveButton] = useState(null); // Track the active button
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

  const toggleSubMenu = (subMenuKey) => (e) => {
    e.preventDefault();
    setActiveSubMenu(activeSubMenu === subMenuKey ? null : subMenuKey);
  };

  const toggleSidebar = () => {
    setIsActive(!isActive);
    OpenSidebar(); 
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

  const handleButtonClick = (buttonKey, callback) => (e) => {
    setActiveButton(buttonKey);
    callback(e);
  };

  const isCandidateSectionActive = ['selfCalling', 'lineUp', 'shortListed', 'selectCandidate', 'holdCandidate', 'rejectedCandidate'].includes(activeButton);

  return (
    <div className={`sidebar ${isActive ? 'active' : ''}`}>
      <div className="clouds"></div>
      <div className='head'></div>
      <div className="sidebar-menu-btn" onClick={toggleSidebar}>
        <i className={`ph-bold ph-caret-${isActive ? 'right' : 'left'}`}></i>
      </div>

      <div className="nav">
        <div className="sidebar-menu">
          <ul>
            <li onClick={handleButtonClick('interviewDate', toggleInterviewDate)} className={activeButton === 'interviewDate' ? 'active' : ''}>
              <a href="#">
                <i className="icon ph-bold ph-house-simple"></i>
                <span className="sidebar-text">Shortlisted Candidate</span>
              </a>
            </li>
            <li onClick={handleButtonClick('callingTrackerForm', toggleCallingTrackerForm)} className={activeButton === 'callingTrackerForm' ? 'active' : ''}>
              <a href="#">
                <i className="icon ph-bold ph-house-simple"></i>
                <span className="sidebar-text">Add Candidate</span>
              </a>
            </li>
            <li className={`${activeSubMenu === 'candidate' || isCandidateSectionActive ? 'active' : ''}`} onClick={toggleSubMenu('candidate')}>
              <a href="#">
                <i className="icon ph-bold ph-user"></i>
                <span className="sidebar-text">Candidate Section</span>
                <i className="arrow ph-bold ph-caret-down"></i>
              </a>
              <ul className={`sub-menu ${activeSubMenu === 'candidate' ? 'active' : ''}`}>
                <li onClick={handleButtonClick('selfCalling', toggleSelfCalling)} className={activeButton === 'selfCalling' ? 'active' : ''}>
                  <a href="#">
                    <img src={Circle} style={{ width: "10px" }} alt="" />
                    <span className="sidebar-text">Calling Tracker</span>
                  </a>
                </li>
                <li onClick={handleButtonClick('lineUp', toggelLineUp)} className={activeButton === 'lineUp' ? 'active' : ''}>
                  <a href="#">
                    <img src={Circle} style={{ width: "10px" }} alt="" />
                    <span className="sidebar-text">LineUp Tracker</span>
                  </a>
                </li>

                <li  hidden onClick={handleButtonClick('shortListed', toggleShortListed)} className={activeButton === 'shortListed' ? 'active' : ''}>
                  <a href="#">
                    <img src={Circle} style={{ width: "10px" }} alt="" />
                    <span className="sidebar-text">Shortlisted Candidate</span>
                  </a>
                </li>
                <li onClick={handleButtonClick('selectCandidate', toggleSelectCandidate)} className={activeButton === 'selectCandidate' ? 'active' : ''}>
                  <a href="#">
                    <img src={Circle} style={{ width: "10px" }} alt="" />
                    <span className="sidebar-text">Selected Candidate</span>
                  </a>
                </li>
                <li onClick={handleButtonClick('holdCandidate', toggleHoldCandidate)} className={activeButton === 'holdCandidate' ? 'active' : ''}>
                  <a href="#">
                    <img src={Circle} style={{ width: "10px" }} alt="" />
                    <span className="sidebar-text">Hold Candidate</span>
                  </a>
                </li>

                <li>
                  <a href="#">
                    <img src={Circle} style={{ width: "10px" }} alt="" />
                    <span className="sidebar-text">Self Offer Work</span>
                  </a>
                </li>
                <li onClick={handleButtonClick('rejectedCandidate', toggleRejectedCandidate)} className={activeButton === 'rejectedCandidate' ? 'active' : ''}>

                  <a href="#">
                    <img src={Circle} style={{ width: "10px" }} alt="" />
                    <span className="sidebar-text">Rejected Candidate</span>
                  </a>
                </li>

                <li onClick={toggleEmployeeMasterSheet}>
                  <a href="#">
                    <img src={Circle} style={{ width: "10px" }} alt="" />
                    <span className="sidebar-text">Employee Sheet</span>
                  </a>
                </li>

                <li onClick={toggleAllMasterSheet}>
                  <a href="#">
                    <img src={Circle} style={{ width: "10px" }} alt="" />
                    <span className="sidebar-text">All Master Sheet</span>
                  </a>
                </li>

              </ul>
            </li>
            <li onClick={handleButtonClick('jobDescription', toggleJobDescription)} className={activeButton === 'jobDescription' ? 'active' : ''}>
              <a href="#">
                <i className="icon ph-bold ph-file-text"></i>
                <span className="sidebar-text">Job Description</span>
              </a>
            </li>
            <li className={activeSubMenu === 'employee' ? "active" : ""} onClick={toggleSubMenu('employee')}>
              <a href="#">
                <i className="icon ph-bold ph-chart-bar"></i>
                <span className="sidebar-text">Employee Section</span>
                <i className="arrow ph-bold ph-caret-down"></i>
              </a>
              <ul className={`sub-menu sub-menu1 ${activeSubMenu === 'employee' ? 'active' : ''}`}>
                <li>
                  <a href="#">
                    <img src={Circle} style={{ width: "10px" }} alt="" />
                    <span className="sidebar-text">Intensive</span>
                  </a>
                </li>
                
                <li onClick={handleButtonClick('attendance', toggleAttendance)} className={activeButton === 'attendance' ? 'active' : ''}>
                  <a href="#">
                    <img src={Circle} style={{ width: "10px" }} alt="" />
                    <span className="sidebar-text">My Attendance </span>
                  </a>
                </li>
              </ul>
            </li>
            <li className={activeSubMenu === 'database' ? "active" : ""} onClick={toggleSubMenu('database')}>
              <a href="#">
                <i className="icon ph-bold ph-chart-bar"></i>
                <span className="sidebar-text">Database</span>
                <i className="arrow ph-bold ph-caret-down"></i>
              </a>
              <ul className={`sub-menu sub-menu1 sub-menu2 ${activeSubMenu === 'database' ? 'active' : ''}`}>
                <li onClick={handleButtonClick('excelCalling', toggleExcelCalling)} className={activeButton === 'excelCalling' ? 'active' : ''}>
                  <a href="#">
                    <img src={Circle} style={{ width: "10px" }} alt="" />
                    <span className="sidebar-text">Calling Data</span>
                  </a>
                </li>
                <li>
                  <a href="#">
                    <img src={Circle} style={{ width: "10px" }} alt="" />
                    <span className="sidebar-text">Line Up Data</span>
                  </a>
                </li>
                <li>
                  <a href="#">
                    <img src={Circle} style={{ width: "10px" }} alt="" />
                    <span className="sidebar-text">Offers Data</span>
                  </a>
                </li>
              </ul>
            </li>
          </ul>
        </div>

        <div className="sidebar-menu">
          <ul>
            <li>
              <a href="#">
                <i className="icon ph-bold ph-gear"></i>
                <span className="sidebar-text">Chat Section</span>
              </a>
            </li>
          </ul>
        </div>

        <div className="sidebar-menu" style={{ paddingLeft: "20px" }}>
          <ul>
            <li className={activeSubMenu === 'portal' ? "active" : ""} onClick={toggleSubMenu('portal')}>
              <a href="#">
                <i className="icon ph-bold ph-chart-bar"></i>
                <span className="sidebar-text">Portal</span>
                <i className="arrow ph-bold ph-caret-down"></i>
              </a>
              <ul className={`sub-menu sub-menu1 sub-menu2 ${activeSubMenu === 'portal' ? 'active' : ''}`}>
                <li>
                  <a href="#">
                    <img src={Circle} style={{ width: "10px" }} alt="" />
                    <span className="sidebar-text" onClick={openNaukriPlatform}>
                      Naukri
                    </span>
                  </a>
                </li>
                <li>
                  <a href="#">
                    <img src={Circle} style={{ width: "10px" }} alt="" />
                    <span className="sidebar-text" onClick={openLinkedinPlatform}>
                      LinkedIn
                    </span>
                  </a>
                </li>
                <li>
                  <a href="#">
                    <img src={Circle} style={{ width: "10px" }} alt="" />
                    <span className="sidebar-text" onClick={openTimesPlatform}>
                      Times Jobs
                    </span>
                  </a>
                </li>
                <li>
                  <a href="#">
                    <img src={Circle} style={{ width: "10px" }} alt="" />
                    <span className="sidebar-text" onClick={openIndeedPlatform}>
                      Indeed
                    </span>
                  </a>
                </li>
              </ul>
            </li>

            <li >
              <a href="#" >
                <i className="icon ph-bold ph-sign-out"></i>
                <span className="sidebar-text">Note Pad</span>
              </a>
            </li>

          </ul>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
