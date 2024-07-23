import React, { useState, useEffect } from "react";
import "../EmployeeDashboard/sideBar.css";
import { useNavigate, useParams } from "react-router-dom";
import Circle from "../LogoImages/circle.png";
import logoutImg from "../photos/download.jpeg";
import { RiTeamFill } from "react-icons/ri";
import axios from "axios";
import { Modal, NavItem } from "react-bootstrap";

// Swapnil_Sidebar_AddingEmployeeDetailsinto_ManagerSection_17/07

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
  toggleResumeData,
  toggleJobDescription,
  toggleInterviewDate,
  toggleIncentive,
  toggleAttendance,
  toggleAddJobDescription,
  toggleEmployeeMasterSheet,
  toggleReports,
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
  togglescheduleinterview,
  // userType,
  successAddUpdateResponse,
  togglePayRoll /* ArshadAttar_EmpDashboard_AddedPayrollToggeleFunction_10/07/2024_LineNo_42 */,
  toggleSendCandidate,
  toggeleProfitChart /* ArshadAttar_EmpDashboard_Added_toggeleProfitChart_11/07/2024_LineNo_46 */,
  toggleInvoice,
  toggleInvoiceReport,
  /*ArbazPathan_EmpDashboard_AddedInvoice_&_InoviceReportToggeleFunction_11/07/2024_LineNo_45-46 */
  toggleAddCompany /*Akash_Pawar_EmpDashboard_AddedAddCompanyToggle_11/07_LineNo_46*/,

  toggleCapex,
  toggleEmployeeDetails,
  toggelResumeData,
  toggleQuestionPaper,
}) {
  const [error, setError] = useState("");
  const [isActive, setIsActive] = useState(false);
  
  const [activeSubMenu, setActiveSubMenu] = useState(null); // Track the active submenu
  const [activeButton, setActiveButton] = useState(null); // Track the active button
  const [showConfirmation, setShowConfirmation] = useState(false);
  const navigator = useNavigate();
  const { employeeId } = useParams();
  const empid = parseInt(employeeId);
  // const { userGroup } = useParams();
  // console.log(userGroup);
  const { userType } = useParams();

  console.log(userType + "userType");

  const toggleSubMenu = (subMenuKey) => (e) => {
    e.preventDefault();
    setActiveSubMenu(activeSubMenu === subMenuKey ? null : subMenuKey);
    
  
  };

  console.log(successAddUpdateResponse);

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

  const handleButtonClick = (button, toggleFunction) => () => {
    setActiveButton(button);
    toggleFunction();
  };

  // console.log(userGroup);
  const isCandidateSectionActive = [
    "selfCalling",
    "lineUp",
    "shortListed",
    "selectCandidate",
    "holdCandidate",
    "rejectedCandidate",
    "EmployeeMasterSheet",
  ].includes(activeButton);
  const isJobDescriptionActive = [
    "Jobdiscription",
    "addJobDescription",
  ].includes(activeButton);
  const isadminactive = ["teamleader", "addJobDescription"].includes(
    activeButton
  );
  // const isEmployeeSectionActive = [
  //   "incentive",
  //   "attendance",
  // ].includes(activeButton);

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
        {/* <div className="sidebar-clouds1"></div> */}
        {/* Swapnil_SideBar_responsiveAccordingToScreen_161to162_02/07 */}
        <div className="head-sidebar">
          <div className="sidebar-menu-btn" onClick={toggleSidebar}>
            <i className="fa-solid fa-chevron-left"></i>
          </div>
          <div className="nav">
            <div className="sidebar-menu">
              <ul>
                <>
                  {userType != "SuperUser" ? (
                    <>
                      <li
                        onClick={handleButtonClick(
                          "interviewDate",
                          toggleInterviewDate
                        )}
                        className={
                          activeButton === "interviewDate" ? "active" : ""
                        }
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
                    </>

                  ) : null}

                  <li
                    className={`${
                      activeSubMenu === "candidate" || isCandidateSectionActive
                        ? "active"
                        : ""
                    }`}
                    onClick={toggleSubMenu("candidate")}
                    
                  >
                    <a href="#">
                      <i
                        class="fa-solid fa-users"
                        style={{ color: "gray" }}
                      ></i>

                      <span className="sidebar-text" style={{ color: "gray" }}>
                        Find Candidate
                      </span>
                      
                      {successAddUpdateResponse ? (
                        <span className="text-xl font-bold text-red-600">
                          *
                        </span>
                      ) : null}
                      <i className="arrow ph-bold ph-caret-down"></i>
                    </a>
                    <ul
                      className={`sub-menu ${
                        activeSubMenu === "candidate" ? "active" : ""
                      }`}
                    >
                      <li
                        style={{ marginLeft: "10px" }}
                        onClick={handleButtonClick(
                          "selfCalling",
                          toggleSelfCalling
                        )}
                        className={
                          activeButton === "selfCalling" ? "active" : ""
                        }
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
                        <a href="#"
                          className="flex items-center justify-center w-full"
                        >
                         
                            {/* <img src={Circle} style={{ width: "10px" }} alt="" /> */}
                            <span className="sidebar-text">Lineup Tracker</span>
                            {successAddUpdateResponse ? (
                              <span className="text-xl font-bold text-red-600">
                                *
                              </span>
                            ) : null}
                          </a>
                        </li>
                        <li
                          style={{ marginLeft: "10px" }}
                          hidden
                          onClick={handleButtonClick(
                            "shortListed",
                            toggleShortListed
                          )}
                          className={
                            activeButton === "shortListed" ? "active" : ""
                          }
                        >
                          <a href="#">
                            {/* <img src={Circle} style={{ width: "10px" }} alt="" /> */}
                            <span className="sidebar-text">
                              Shortlisted Candidate

                            </span>
                          {/* ) : null} */}
                        </a>
                      </li>
                      <li
                        style={{ marginLeft: "10px" }}
                        hidden
                        onClick={handleButtonClick(
                          "shortListed",
                          toggleShortListed
                        )}
                        className={
                          activeButton === "shortListed" ? "active" : ""
                        }
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
                          <span className="sidebar-text">
                            Selected Candidate
                          </span>
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
                          <span className="sidebar-text">
                            Rejected Candidate
                          </span>
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

                        {userType === "Manager" &&
                          "SuperUser" &&
                          userType != "TeamLeader" &&
                          userType != "Recruiter" ? (
                          <li
                            onClick={toggleEmployeeMasterSheet}
                            style={{ marginLeft: "10px" }} >
                            <a href="#">
                              {/* <img src={Circle} style={{ width: "10px" }} alt="" /> */}
                              <span className="sidebar-text">
                                Master Tracker
                              </span>
                            </a>
                          </li>
                        ) : null}
                      </ul>
                    </li>
                  </>
               


                <li
                  className={`${
                    activeSubMenu === "Jobdiscription" || isJobDescriptionActive
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
                    className={`sub-menu ${
                      activeSubMenu === "Jobdiscription" ? "active" : ""
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
                    {(userType != "Recruiters" && userType != "SuperUser") ||
                    (userType === "TeamLeader" && userType === "Manager") ? (
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
                    ) : null}
                  </ul>
                </li>
                {userType != "SuperUser" ? (
                  <>
                    <li
                       className={activeButton === "incentive"||"attendance" ? "active" : ""}
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
                        className={`sub-menu sub-menu1 ${activeSubMenu === "employee" ? "active" : ""}`}

                      >
                        <li
                          style={{ marginLeft: "10px" }}
                          onClick={handleButtonClick(
                            "incentive",
                            toggleIncentive
                          )}
                          
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
                  </>
                ) : null}

                {/*SwapnilRokade_ Add TeamLeader section Added_05/07 */}
                {userType === "Manager" || "TeamLeader" ? (
                  <>
                    {userType != "Recruiters" ? (
                      <li
                      className={activeButton === "TeamLeader-section" ? "active" : ""}
                      onClick={toggleSubMenu("TeamLeader-section")}
                      >
                        <a href="#">

                          <RiTeamFill className="text-lg text-gray-500" />
                          <span className="sidebar-text">
                            Team Leader Section
                          </span>
                          <i className="arrow ph-bold ph-caret-down"></i>
                        </a>
                        <ul
                          className={`sub-menu sub-menu1 ${
                            activeSubMenu === "TeamLeader-section"
                              ? "active"
                              : ""
                          }`}>

                          <li
                          onClick={handleButtonClick("updateResponse", toggleUpdateResponse)}
                          className={activeButton === "updateResponse" ? "active" : ""}
                          style={{ marginLeft: "10px" }}
                          >
                            <a href="#">
                              {/* <img src={Circle} style={{ width: "10px" }} alt="" /> */}
                              <span className="sidebar-text">
                                Update Response
                              </span>
                            </a>
                          </li>
                          
                          <li
                            onClick={handleButtonClick("questionPaper", toggleQuestionPaper)}
                            style={{ marginLeft: "10px" }}
                            className={activeButton === "questionPaper" ? "active" : ""}
                          >
                            <a href="#">
                              {/* <img src={Circle} style={{ width: "10px" }} alt="" /> */}
                              <span className="sidebar-text">
                                Create Question paper's
                              </span>
                            </a>
                          </li>
                                {/* neha_add_scheduleinterview_page_line_no511_523 */}
                          <li
                          onClick={handleButtonClick("scheduleinterview", togglescheduleinterview )}
                          className={activeButton === "scheduleinterview" ? "active" : ""}
                          style={{ marginLeft: "10px" }}
                          >
                            <a href="#">
                              {/* <img src={Circle} style={{ width: "10px" }} alt="" /> */}
                              <span className="sidebar-text">Schedule Interview</span>
                            </a>
                          </li>
                        </ul>
                      </li>
                    ) : null}
                  </>
                ) : null}

                {userType != "Recruiters" ? (
                  <li
                  className={activeButton === "admin-section" ? "active" : ""}
                  onClick={toggleSubMenu("admin-section")}
                  >
                    <a href="#">
                      <i
                        className="fa-solid fa-computer"
                        style={{ color: "gray" }}
                      ></i>
                      <span className="sidebar-text">Manager Section</span>{" "}
                      {/* ArshadAttar_EmpDashboard_AddedPayrollToggeleFunction_10/07/2024_LineNo_428 */}
                      <i className="arrow ph-bold ph-caret-down"></i>
                    </a>
                    <ul className={`sub-menu sub-menu1 ${activeSubMenu === "admin-section" ? "active" : ""}`}>

                      {userType != "TeamLeader" ? (
                        <>
                          {/* ArshadAttar_EmpDashboard_AddedPayrollToggeleFunction_10/07/2024_LineNo_438-445 */}
                          <li
                            onClick={handleButtonClick("payRoll", togglePayRoll)}
                            style={{ marginLeft: "10px" }}
                            className={activeButton === "payRoll" ? "active" : ""}
                          >
                            <a href="#">
                              <span className="sidebar-text">Pay Roll</span>
                            </a>
                          </li>
                          <li
                            onClick={handleButtonClick("invoice", toggleInvoice)}
                            style={{ marginLeft: "10px" }}
                            className={activeButton === "invoice" ? "active" : ""}
                          >
                            <a href="#">
                              <span className="sidebar-text">
                                {" "}
                                Make Invoice
                              </span>
                            </a>
                          </li>
                          <li
                            onClick={handleButtonClick("invoiceReport", toggleInvoiceReport)}
                            style={{ marginLeft: "10px" }}
                            className={activeButton === "invoiceReport" ? "active" : ""}
                          >
                            <a href="#">
                              <span className="sidebar-text">
                                {" "}
                                Invoice Report
                              </span>
                            </a>
                          </li>
                          {/* ArshadAttar_EmpDashboard_AddedPayrollToggeleFunction_10/07/2024_LineNo_438-445 */}
                         <li
                            onClick={handleButtonClick("invoiceReport", toggleInvoiceReport)}

                            style={{ marginLeft: "10px" }}
                            className={activeButton === "invoiceReport" ? "active" : ""}
                          >
                            <a href="#">
                              {/* <img src={Circle} style={{ width: "10px" }} alt="" /> */}
                              <span className="sidebar-text">
                                Create Question paper's
                              </span>
                            </a>
                          </li>

                          <li
                            onClick={handleButtonClick("assignColumns", toggleAssigncolumns)}
                            style={{ marginLeft: "10px" }}
                            className={activeButton === "assignColumns" ? "active" : ""}
                          >
                            <a href="#">
                              {/* <img src={Circle} style={{ width: "10px" }} alt="" /> */}
                              <span className="sidebar-text">
                                Assign Columns
                              </span>
                            </a>
                          </li>
                        </>
                      ) : null}

                 
                      <li

                        onClick={toggleEmployeeDetails}
                        style={{ marginLeft: "10px" }}
                      >
                        <a href="#">
                          {/* <img src={Circle} style={{ width: "10px" }} alt="" /> */}
                          <span className="sidebar-text">Employee Details</span>
                        </a>
                      </li>
                      {userType === "Manager" || "TeamLeader" ? (
                        <>
                          <li
                            onClick={handleButtonClick("addRecruiter", toggelAddRecruiter)}
                            style={{ marginLeft: "10px" }}
                            className={activeButton === "addRecruiter" ? "active" : ""}
                          >
                            <a href="#">
                              {/* <img src={Circle} style={{ width: "10px" }} alt="" /> */}
                              <span className="sidebar-text">
                                Add Recruiters
                              </span>
                            </a>
                          </li>
                        </>
                      ) : null}
                      <li
                        onClick={handleButtonClick("sendCandidate", toggleSendCandidate)}
                        style={{ marginLeft: "10px" }}
                        className={activeButton === "sendCandidate" ? "active" : ""}
                      >
                        <a href="#">
                          <span className="sidebar-text">
                            Send Client Email
                          </span>
                        </a>
                      </li>

                      <li
                        onClick={handleButtonClick("addCompany", toggleAddCompany)}
                        style={{ marginLeft: "10px" }}
                        className={activeButton === "addCompany" ? "active" : ""}
                      >
                        <a href="#">
                          <span className="sidebar-text">
                            Add Company Details
                          </span>
                        </a>
                      </li>
                      <li
                        onClick={handleButtonClick("capex", toggleCapex)}
                        style={{ marginLeft: "10px" }}
                        className={activeButton === "capex" ? "active" : ""}
                      >

                        <a href="#">
                          <span className="sidebar-text">Capex</span>
                        </a>
                      </li>
                    </ul>
                  </li>
                ) : null}
                {/* </>
): null} */}

                {/* ArshadAttar_EmpDashboard_Added_SuperUser_11/07/2024_LineNo_633 */}
                <li onClick={handleButtonClick("SuperUser", toggleSubMenu("SuperUser"))}>
                  <a href="#">
                    <i className="fa-solid fa-database" style={{ color: "gray" }}></i>
                    <span className="sidebar-text">Super User</span>
                    <i className="arrow ph-bold ph-caret-down"></i>
                  </a>
                  <ul
                    className={`sub-menu sub-menu1 sub-menu2 ${
                      activeSubMenu === "SuperUser" ? "active" : ""
                    }`}
                  >
                    <li
                      style={{ marginLeft: "10px" }}
                      className={activeButton === "SuperUser" ? "active" : ""}
                      onClick={toggeleProfitChart}
                    >
                      <a href="#">
                        <span className="sidebar-text">P & L Chart</span>
                      </a>
                    </li>
                  </ul>
                </li>
                {/* toggeleProfitChart */}
                {/* ArshadAttar_EmpDashboard_Added_SuperUser_11/07/2024_LineNo_660 */}

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

                  <ul className={`sub-menu sub-menu1 sub-menu2 ${activeSubMenu === "database" ? "active" : ""}`}>

                    <li
                      onClick={handleButtonClick("excelCalling", toggleExcelCalling)}
                      className={activeButton === "excelCalling" ? "active" : ""}
                      style={{ marginLeft: "10px" }}
                    >
                      <a href="#">
                        {/* <img src={Circle} style={{ width: "10px" }} alt="" /> */}
                        <span className="sidebar-text">Upload Files</span>
                      </a>
                    </li>

                    <li
                      onClick= {handleButtonClick("excelcallingdata",toggeExcelCallingData)}
                      style={{ marginLeft: "10px" }}
                      className={activeButton === "excelcallingdata" ? "active" : ""}
                    >
                      <a href="#">
                        {/* <img src={Circle} style={{ width: "10px" }} alt="" /> */}
                        <span className="sidebar-text">Excel Calling Data</span>
                      </a>
                    </li>

                    <li
                      onClick= {handleButtonClick("excelLineup",toggelExcelLineup)}
                      style={{ marginLeft: "10px" }}
                      className={activeButton === "excelLineup" ? "active" : ""}
                    >
                      <a href="#">
                        {/* <img src={Circle} style={{ width: "10px" }} alt="" /> */}
                        <span className="sidebar-text">Excel Lineup Data</span>
                      </a>
                    </li>

                    <li

                      style={{ marginLeft: "10px" }}
                      onClick={handleButtonClick(
                        "resumeData",
                        toggelResumeData
                       
                      )}
                      className={activeButton === "resumeData" ? "active" : ""}
                    >
                      <a href="#">
                        {/* <img src={Circle} style={{ width: "10px" }} alt="" /> */}
                        <span className="sidebar-text">Resume Data</span>
                      </a>
                    </li>

                    <li
                      style={{ marginLeft: "10px" }}
                      onClick={handleButtonClick("sendlink",toggleShareLink)}
                      className={
                        activeButton === "sendlink" ? "active" : ""
                      }
                    >
                      <a href="#">
                        <span className="sidebar-text">Send Link</span>
                      </a>
                    </li>
                  </ul>
                </li>
                <li onClick={handleButtonClick(
                        "chatroom",
                        toggleChatRoom
                      )}
                      className={
                        activeButton === "chatroom" ? "active" : ""
                      }>

                  <a href="#">
                    {/* <i className="icon ph-bold ph-gear"></i> */}
                    <i
                      class="fa-brands fa-rocketchat"
                      style={{ color: "gray" }}
                    ></i>

                    <span className="sidebar-text">Chat Section</span>
                  </a>
                </li>
                {userType != "SuperUser" ? (
                  <>
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

                      <ul className={`sub-menu sub-menu1 sub-menu2 ${activeSubMenu === "portal" ? "active" : ""}`}
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

                    <li onClick={handleButtonClick(
                        "notepad",
                        toggelDisplayNotPad
                      )}
                      className={
                        activeButton === "notepad" ? "active" : ""
                      }>
                      <a href="#">
                        <i
                          className="fa-regular fa-clipboard"
                          style={{ color: "gray" }}
                        ></i>
                        <span className="sidebar-text">Note Pad</span>
                      </a>
                    </li>
                    <li className={
                        activeButton === "report" ? "active" : ""
                      }
                      onClick={handleButtonClick(
                        "report",
                        toggleReports
                      )}>
                      <a href="#">
                        <i
                          className="fa-regular fa-address-book"
                          style={{ color: "gray" }}
                        ></i>
                        <span className="sidebar-text">Reports</span>
                      </a>
                    </li>
                  </>
                ) : null}
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
