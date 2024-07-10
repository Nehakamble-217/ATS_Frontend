import React, { useState, useEffect } from "react";
import "../EmployeeDashboard/sideBar.css";
import { useNavigate, useParams } from "react-router-dom";
import Circle from "../LogoImages/circle.png";
import logoutImg from "../photos/download.jpeg";
import { RiTeamFill } from "react-icons/ri"
import axios from "axios";
import { Modal } from "react-bootstrap";

function Sidebar({
  onLogout,
  openSidebarToggle,
  OpenSidebar,
  toggleSelfCalling,
  toggelLineUp,
  toggleCallingTrackerForm,
  toggeladminsection,
  toggleShortListed,
  toggleSelectCandidate,
  toggleRejectedCandidate,
  toggleHoldCandidate,
  toggleExcelCalling,
  toggelResumeData,
  toggleJobDescription,
  toggleInterviewDate,
  toggleIncentive,
  toggleAttendance,
  toggleAllMasterSheet,
  toggleAddJobDescription,
  toggleEmployeeMasterSheet,
  handleLogout,
  toggelAddRecruiter,
  toggelDisplayNotPad,
  toggelAddResumes,
  toggleChatRoom,
  toggleAssigncolumns,
  toggeExcelCallingData,
  toggelExcelLineup,
  toggleShareLink,
  toggleUpdateResponse,
  jobRoles,
  togglePayRoll,
}) {

  const [error, setError] = useState("");
  const [isActive, setIsActive] = useState(false);
  const [activeSubMenu, setActiveSubMenu] = useState(null); // Track the active submenu
  const [activeButton, setActiveButton] = useState(null); // Track the active button
  const [showConfirmation, setShowConfirmation] = useState(false);
  const navigator = useNavigate();
  const { employeeId } = useParams();
  const empid = parseInt(employeeId);
  const { userGroup } = useParams();
  console.log(userGroup);

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

  console.log(userGroup);
  const isCandidateSectionActive = [
    "selfCalling",
    "lineUp",
    "shortListed",
    "selectCandidate",
    "holdCandidate",
    "rejectedCandidate",
  ].includes(activeButton);
  const isJobDescriptionActive = [
    "Jobdiscription",
    "addJobDescription",
  ].includes(activeButton);
  const isadminactive = ["teamleader", "addJobDescription"].includes(
    activeButton
  );

  const handleLogoutLocal = () => {
    const logoutTime = new Date().toLocaleTimeString("en-IN");
    onLogout(logoutTime);
  };

  const tempLogout = () => {
    navigator("/employee-login/recruiter");
  };

  return (
    <>

      <div className={`sidebar ${isActive ? "active" : ""}`}>
        <div className="sidebar-clouds1"></div>
        {/* Swapnil_SideBar_responsiveAccordingToScreen_161to162_02/07 */}
        <div className="head-sidebar">
          <div className="sidebar-menu-btn" onClick={toggleSidebar}>
            <i className="fa-solid fa-chevron-left"></i>
          </div>

          <div className="nav">
            <div className="sidebar-menu">
              <ul>
                <li
                  onClick={handleButtonClick(
                    "interviewDate",
                    toggleInterviewDate
                  )}
                  className={activeButton === "interviewDate" ? "active" : ""}
                >
                  <a href="#">
                    {/* <i className="icon ph-bold ph-house-simple"></i> */}

                    <i
                      className="xyz-icon"
                      class="fa-solid fa-user-check"
                      style={{ color: "gray" }}
                    ></i>
                    <span className="sidebar-text">Shortlisted </span>
                  </a>
                </li>
                <li
                  onClick={handleButtonClick(
                    "callingTrackerForm",
                    toggleCallingTrackerForm
                  )}
                  className={
                    activeButton === "callingTrackerForm" ? "active" : ""
                  }
                >
                  <a href="#">
                    <i
                      class="fa-solid fa-user-plus"
                      style={{ color: "gray" }}
                    ></i>
                    <span className="sidebar-text">Add Candidate</span>
                  </a>
                </li>
                <li
                  className={`${activeSubMenu === "candidate" || isCandidateSectionActive
                    ? "active"
                    : ""
                    }`}
                  onClick={toggleSubMenu("candidate")}
                >
                  <a href="#">
                    <i class="fa-solid fa-users" style={{ color: "gray" }}></i>

                    <span className="sidebar-text" style={{ color: "gray" }}>
                      Find Candidate
                    </span>
                    <i className="arrow ph-bold ph-caret-down"></i>
                  </a>
                  <ul
                    className={`sub-menu ${activeSubMenu === "candidate" ? "active" : ""
                      }`}
                  >
                    <li
                      style={{ marginLeft: "10px" }}
                      onClick={handleButtonClick(
                        "selfCalling",
                        toggleSelfCalling
                      )}
                      className={activeButton === "selfCalling" ? "active" : ""}
                    >
                      <a href="#">
                        {/* <img src={Circle} style={{ width: "10px" }} alt="" /> */}
                        <span className="sidebar-text">Calling Tracker</span>
                      </a>
                    </li>

                    <li
                      style={{ marginLeft: "10px" }}
                      onClick={handleButtonClick("lineUp", toggelLineUp)}
                      className={activeButton === "lineUp" ? "active" : ""}
                    >
                      <a href="#">
                        {/* <img src={Circle} style={{ width: "10px" }} alt="" /> */}
                        <span className="sidebar-text">Lineup Tracker</span>
                      </a>
                    </li>

                    <li
                      style={{ marginLeft: "10px" }}
                      hidden
                      onClick={handleButtonClick(
                        "shortListed",
                        toggleShortListed
                      )}
                      className={activeButton === "shortListed" ? "active" : ""}
                    >
                      <a href="#">
                        {/* <img src={Circle} style={{ width: "10px" }} alt="" /> */}
                        <span className="sidebar-text">
                          Shortlisted Candidate
                        </span>
                      </a>
                    </li>
                    <li
                      style={{ marginLeft: "10px" }}
                      onClick={handleButtonClick(
                        "selectCandidate",
                        toggleSelectCandidate
                      )}
                      className={
                        activeButton === "selectCandidate" ? "active" : ""
                      }
                    >
                      <a href="#">
                        {/* <img src={Circle} style={{ width: "10px" }} alt="" /> */}
                        <span className="sidebar-text">Selected Candidate</span>
                      </a>
                    </li>

                    <li
                      style={{ marginLeft: "10px" }}
                      onClick={handleButtonClick(
                        "holdCandidate",
                        toggleHoldCandidate
                      )}
                      className={
                        activeButton === "holdCandidate" ? "active" : ""
                      }
                    >
                      <a href="#">
                        {/* <img src={Circle} style={{ width: "10px" }} alt="" /> */}
                        <span className="sidebar-text">Hold Candidate</span>
                      </a>
                    </li>

                    <li
                      style={{ marginLeft: "10px" }}
                      onClick={handleButtonClick(
                        "rejectedCandidate",
                        toggleRejectedCandidate
                      )}
                      className={
                        activeButton === "rejectedCandidate" ? "active" : ""
                      }
                    >
                      <a href="#">
                        {/* <img src={Circle} style={{ width: "10px" }} alt="" /> */}
                        <span className="sidebar-text">Rejected Candidate</span>
                      </a>
                    </li>

                    {/* ---------Arshad Comment this changes dont uncomment-------------- */}
                    {/* <li>
                  <a href="#">
                    <img src={Circle} style={{ width: "10px" }} alt="" />
                    <span className="sidebar-text">Self Offer Work</span>
                  </a>
                </li> */}
                    {/* ---------Arshad Comment this changes dont uncomment-------------- */}
                    {jobRoles === "Admin" ? (
                      <li
                        onClick={toggleEmployeeMasterSheet}
                        style={{ marginLeft: "10px" }}
                      >
                        <a href="#">
                          {/* <img src={Circle} style={{ width: "10px" }} alt="" /> */}
                          <span className="sidebar-text">Master Tracker</span>
                        </a>
                      </li>
                    ) : null}
                  </ul>
                </li>


                <li
                  className={`${activeSubMenu === "Jobdiscription" || isJobDescriptionActive
                    ? "active"
                    : ""
                    }`}
                  onClick={toggleSubMenu("Jobdiscription")}
                >
                  <a href="#">
                    <i
                      class="fa-solid fa-pen-to-square"
                      style={{ color: "gray" }}
                    ></i>
                    <span className="sidebar-text">Job Description</span>
                    <i className="arrow ph-bold ph-caret-down"></i>
                  </a>


                  <ul
                    className={`sub-menu ${activeSubMenu === "Jobdiscription" ? "active" : ""
                      }`}
                  >
                    <li
                      style={{ marginLeft: "10px" }}
                      onClick={handleButtonClick(
                        "jobDescription",
                        toggleJobDescription
                      )}
                      className={
                        activeButton === "jobDescription" ? "active" : ""
                      }
                    >
                      <a href="#">
                        {/* <img src={Circle} style={{ width: "10px" }} alt="" /> */}
                        <span className="sidebar-text">
                          {" "}
                          View Job Descriptions
                        </span>
                      </a>
                    </li>
                    <li
                      style={{ marginLeft: "10px" }}
                      onClick={handleButtonClick(
                        "addJobDescription",
                        toggleAddJobDescription
                      )}
                      className={
                        activeButton === "addJobDescription" ? "active" : ""
                      }
                    >
                      <a href="#">
                        {/* <img src={Circle} style={{ width: "10px" }} alt="" /> */}
                        <span className="sidebar-text">
                          Add Job Description
                        </span>
                      </a>
                    </li>
                  </ul>
                </li>

                <li
                  className={
                    activeSubMenu === "addJobDescription" ? "active" : ""
                  }
                  onClick={toggleSubMenu("employee")}
                >
                  <a href="#">
                    <i
                      className="fa-solid fa-user-gear"
                      style={{ color: "gray" }}
                    ></i>
                    <span className="sidebar-text">Employee Section</span>
                    <i className="arrow ph-bold ph-caret-down"></i>
                  </a>

                  <ul
                    className={`sub-menu sub-menu1 ${activeSubMenu === "employee" ? "active" : ""
                      }`}
                  >
                    <li
                      style={{ marginLeft: "10px" }}
                      onClick={handleButtonClick("incentive", toggleIncentive)}
                      className={activeButton === "incentive" ? "active" : ""}
                    >
                      <a href="#">
                        {/* <img src={Circle} style={{ width: "10px" }} alt="" /> */}
                        <span className="sidebar-text">My Incentive </span>
                      </a>
                    </li>

                    <li
                      style={{ marginLeft: "10px" }}
                      onClick={handleButtonClick(
                        "attendance",
                        toggleAttendance
                      )}
                      className={activeButton === "attendance" ? "active" : ""}
                    >
                      <a href="#">
                        {/* <img src={Circle} style={{ width: "10px" }} alt="" /> */}
                        <span className="sidebar-text">My Attendance </span>
                      </a>
                    </li>
                  </ul>
                </li>
                {/*SwapnilRokade_ Add TeamLeader section Added_05/07 */}
                {jobRoles === "Admin" ? (
                  <li
                    className={activeButton === "TeamLeader-section" ? "active" : ""}
                    onClick={toggleSubMenu("TeamLeader-section")}
                  >
                    <a href="#">
                      <RiTeamFill className="text-gray-500 text-lg" />
                      <span className="sidebar-text">Team Leader Section</span>
                      <i className="arrow ph-bold ph-caret-down"></i>
                    </a>
                    <ul
                      className={`sub-menu sub-menu1 ${activeSubMenu === "TeamLeader-section" ? "active" : ""
                        }`}
                    >
                      <li
                        onClick={toggleUpdateResponse}
                        style={{ marginLeft: "10px" }}
                      >
                        <a href="#">
                          {/* <img src={Circle} style={{ width: "10px" }} alt="" /> */}
                          <span className="sidebar-text">Update Response</span>
                        </a>
                      </li>

                    </ul>
                  </li>
                ) : null}

                {jobRoles === "Admin" ? (
                  <li
                    className={activeButton === "admin-section" ? "active" : ""}
                    onClick={toggleSubMenu("admin-section")}
                  >
                    <a href="#">
                      <i
                        className="fa-solid fa-computer"
                        style={{ color: "gray" }}
                      ></i>
                      <span className="sidebar-text">Manager Section</span>
                      <i className="arrow ph-bold ph-caret-down"></i>
                    </a>

                    <ul
                      className={`sub-menu sub-menu1 ${activeSubMenu === "admin-section" ? "active" : ""
                        }`}
                    >

                      <li
                        onClick={togglePayRoll}
                        style={{ marginLeft: "10px" }}
                      >
                        <a href="#">
                          <span className="sidebar-text">Pay Roll</span>
                        </a>
                      </li>

                      <li
                        onClick={toggleAssigncolumns}
                        style={{ marginLeft: "10px" }}
                      >
                        <a href="#">
                          {/* <img src={Circle} style={{ width: "10px" }} alt="" /> */}
                          <span className="sidebar-text">Assign Columns</span>
                        </a>
                      </li>

                      <li
                        onClick={toggleAllMasterSheet}
                        style={{ marginLeft: "10px" }}
                      >
                        <a href="#">
                          {/* <img src={Circle} style={{ width: "10px" }} alt="" /> */}
                          <span className="sidebar-text">All Master Sheet</span>
                        </a>
                      </li>

                      <li
                        onClick={toggelAddRecruiter}
                        style={{ marginLeft: "10px" }}
                      >
                        <a href="#">
                          {/* <img src={Circle} style={{ width: "10px" }} alt="" /> */}
                          <span className="sidebar-text">Add Recruiters</span>
                        </a>
                      </li>

                      <li
                        onClick={toggelAddRecruiter}
                        style={{ marginLeft: "10px" }}
                      >
                        <a href="#">
                          {/* <img src={Circle} style={{ width: "10px" }} alt="" /> */}
                          <span className="sidebar-text">Add Team Leadrs</span>
                        </a>
                      </li>
                    </ul>
                  </li>
                ) : null}

                {jobRoles === "Admin" ? (
                  <li
                    className={activeSubMenu === "database" ? "active" : ""}
                    onClick={toggleSubMenu("database")}
                  >
                    <a href="#">
                      <i
                        className="fa-solid fa-database"
                        style={{ color: "gray" }}
                      ></i>
                      <span className="sidebar-text">Database</span>
                      <i className="arrow ph-bold ph-caret-down"></i>
                    </a>

                    <ul
                      className={`sub-menu sub-menu1 sub-menu2 ${activeSubMenu === "database" ? "active" : ""
                        }`}
                    >
                      <li
                        onClick={handleButtonClick(
                          "excelCalling",
                          toggleExcelCalling
                        )}
                        className={
                          activeButton === "excelCalling" ? "active" : ""
                        }
                        style={{ marginLeft: "10px" }}
                      >
                        <a href="#">
                          {/* <img src={Circle} style={{ width: "10px" }} alt="" /> */}
                          <span className="sidebar-text">Upload Files</span>
                        </a>
                      </li>

                      <li
                        onClick={toggeExcelCallingData}
                        style={{ marginLeft: "10px" }}
                      >
                        <a href="#">
                          {/* <img src={Circle} style={{ width: "10px" }} alt="" /> */}
                          <span className="sidebar-text">
                            Excel Calling Data
                          </span>
                        </a>
                      </li>

                      <li
                        onClick={toggelExcelLineup}
                        style={{ marginLeft: "10px" }}
                      >
                        <a href="#">
                          {/* <img src={Circle} style={{ width: "10px" }} alt="" /> */}
                          <span className="sidebar-text">
                            Excel Lineup Data
                          </span>
                        </a>
                      </li>

                      <li
                        style={{ marginLeft: "10px" }}
                        onClick={handleButtonClick(
                          "resumeData",
                          toggelResumeData
                        )}
                        className={
                          activeButton === "resumeData" ? "active" : ""
                        }
                      >
                        <a href="#">
                          {/* <img src={Circle} style={{ width: "10px" }} alt="" /> */}
                          <span className="sidebar-text">Resume Data</span>
                        </a>
                      </li>

                      <li
                        style={{ marginLeft: "10px" }}
                        onClick={toggleShareLink}
                      >
                        <a href="#">
                          <span className="sidebar-text">Send Link</span>
                        </a>
                      </li>
                    </ul>
                  </li>
                ) : null}

                <li onClick={toggleChatRoom}>
                  <a href="#">
                    {/* <i className="icon ph-bold ph-gear"></i> */}
                    <i
                      class="fa-brands fa-rocketchat"
                      style={{ color: "gray" }}
                    ></i>

                    <span className="sidebar-text">Chat Section</span>
                  </a>
                </li>
                <li
                  className={activeSubMenu === "portal" ? "active" : ""}
                  onClick={toggleSubMenu("portal")}
                >
                  <a href="#">
                    {/* <i className="icon ph-bold ph-chart-bar"></i> */}
                    <i
                      class="fa-brands fa-linkedin"
                      style={{ color: "gray" }}
                    ></i>
                    <span className="sidebar-text">Portal</span>
                    <i className="arrow ph-bold ph-caret-down"></i>
                  </a>

                  <ul
                    className={`sub-menu sub-menu1 sub-menu2 ${activeSubMenu === "portal" ? "active" : ""
                      }`}
                  >
                    <li style={{ marginLeft: "10px" }}>
                      <a href="#">
                        {/* <img src={Circle} style={{ width: "10px" }} alt="" /> */}
                        <span
                          className="sidebar-text"
                          onClick={openNaukriPlatform}
                        >
                          Naukri
                        </span>
                      </a>
                    </li>
                    <li style={{ marginLeft: "10px" }}>
                      <a href="#">
                        {/* <img src={Circle} style={{ width: "10px" }} alt="" /> */}
                        <span
                          className="sidebar-text"
                          onClick={openLinkedinPlatform}
                        >
                          LinkedIn
                        </span>
                      </a>
                    </li>
                    <li style={{ marginLeft: "10px" }}>
                      <a href="#">
                        {/* <img src={Circle} style={{ width: "10px" }} alt="" /> */}
                        <span
                          className="sidebar-text"
                          onClick={openTimesPlatform}
                        >
                          Times Jobs
                        </span>
                      </a>
                    </li>
                    <li style={{ marginLeft: "10px" }}>
                      <a href="#">
                        {/* <img src={Circle} style={{ width: "10px" }} alt="" /> */}
                        <span
                          className="sidebar-text"
                          onClick={openIndeedPlatform}
                        >
                          Indeed
                        </span>
                      </a>
                    </li>
                  </ul>
                </li>

                <li onClick={toggelDisplayNotPad}>
                  <a href="#">
                    <i
                      className="fa-regular fa-clipboard"
                      style={{ color: "gray" }}
                    ></i>
                    <span className="sidebar-text">Note Pad</span>
                  </a>
                </li>

                <li onClick={() => setShowConfirmation(true)}>
                  <a href="#">
                    {/* <i className="icon ph-bold ph-sign-out"></i> */}
                    <i
                      className="fa-solid fa-power-off"
                      style={{ color: "gray" }}
                    ></i>
                    <span className="sidebar-text">Logout</span>
                  </a>
                </li>
              </ul>
            </div>

            {/* <div className="sidebar-menu">
          <ul>
            
          </ul>
        </div> */}

            <div className="sidebar-menu" style={{ paddingLeft: "20px" }}>
              <ul></ul>
            </div>
          </div>
        </div>
      </div>
      {showConfirmation && (
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
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Modal.Body>
              <p className="confirmation-text">
                Are you sure you want to logout?
              </p>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <button onClick={handleLogoutLocal} className="buttoncss">
                  Yes
                </button>
                <button
                  onClick={() => setShowConfirmation(false)}
                  className="buttoncss"
                >
                  No
                </button>
              </div>
            </Modal.Body>
          </Modal.Dialog>
        </div>
      )}
    </>
  );
}

export default Sidebar;
