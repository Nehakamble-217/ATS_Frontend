import React, { useEffect, useState } from "react";
import Sidebar from "../EmployeeDashboard/sideBar";
import CallingList from "../EmployeeSection/selfCallingTracker";
import LineUpList from "../EmployeeSection/LineUpList";
import "./empDashboard.css";
import EmpTimeTracker from "./EmpTimeTracker";
import CallingTrackerForm from "../EmployeeSection/CallingTrackerForm";
import { Outlet, useParams } from "react-router-dom";
import DataComponent from "../EmployeeSection/DataComponent";
import Incentive from "../EmployeeSection/Incentive";
import Attendancesheet from "../EmployeeSection/Attendence_sheet";
import InterviewDates from "../EmployeeSection/interviewDate";
import SelectedCandidate from "../CandidateSection/SelectedCandidate";
import RejectedCandidate from "../CandidateSection/rejectedCandidate";
import HoldCandidate from "../CandidateSection/holdCandidate";
import UpdateCallingTracker from "../EmployeeSection/UpdateSelfCalling";
import CallingExcel from "../Excel/callingExcel";
import ResumeList from "../Excel/resumeList";
import Home from "./JobList";
import DailyWork from "./dailyWork";
import { useNavigate } from "react-router-dom";
import Profile from "../LogoImages/ProfilePic.png";
import EmployeeMasterSheet from "../EmployeeSection/employeeMasterSheet";
import ShortListedCandidates from "../CandidateSection/ShortListedCandidate";
import ShortlistedNavbar from "./shortlistedNavbar";
import AddJobDescription from "../JobDiscription/addJobDescription";
import AddEmployee from "../EmployeeSection/addEmployee";
import NotePad from "../notPad/notePad";
import Reports from "../Reports/reports";
import EmployeeProfileData from "../EmployeeSection/employeeProfileData";
import AddResumes from "../ResumeData/addMultipleResumes";
import ChatRoom from "../ChatRoom/chatRoom";
import Team_Leader from "../AdminSection/Team_Leader";
import ShareLink from "../ResumeData/shareLink";
import CandidateResumeLink from "../ResumeData/candidateResumeLink";
import CallingExcelList from "../Excel/callingExcelData";
import LineupExcelData from "../Excel/lineupExcelData";
import UpdateResponse from "../TeamLeader/UpdateResponse";
import PayRollMain from "../PayRoll/payRollMain"; /* ArshadAttar_EmpDashboard_AddedPayrollToggeleFunction_10/07/2024_LineNo_198-202 */
import SendClientEmail from "../AdminSection/SendClientEmail";
import LineGraph from "../SuperUser/profitLoseChart"; /* ArshadAttar_EmpDashboard_Added_LineGraph_11/07/2024_LineNo_43 */
import InvoiceTable from "./invoice";
import InvoiceReport from "./invoiceReport";
import InvoicePdf from "./invoicePdf";
import AddCompanyDetails from "../AdminSection/AddCompanyDetails"; /*Akash_Pawar_EmpDashboard_AddedAddCompanyToggle_11/07_LineNo_43*/
import QuestionPaper from "./questionPaper";
import Capex from "../AdminSection/capex"; /*Ajhar_EmpDashboard_AddedAddCapex_15/07_LineNo_47*/
import EmployeeDetails from "../EmployeeDetails/EmployeeDetails";
import SubscriptionPlans from "../Subscription/subscription";
import PaymentForm from "../Subscription/subscriptionPayment";
import Billing from "../EmployeeSection/billing";
import ScheduleInterview from "../TeamLeader/scheduleInterview"; /* neha_scheduleinterview_18/07_lineno_50*/
import IssueSolving from "../AboutUs/issueSolving";
import WorkplacePolicy from "../AboutUs/companyPolicy";
import PainAreaSolving from "../AboutUs/painAreaSolving";
import RightsAndInstructions from "../AboutUs/rightsAndInstructions";

const EmpDashboard = ({ userGroup }) => {
  const [showInterviewDate, setShowInterviewDate] = useState(false);
  const [addCandidate, setAddCandidate] = useState(false);
  const [candidateIdForUpdate, setCandidateIdForUpdate] = useState(0);
  const [selfCalling, setSelfCalling] = useState(false);
  const [successShare,setSuccessShare] = useState(false); //neha_add_this_state_bcz_came_error_to_console
  const [attendancesheet, setAttendanceSheet] = useState(false);
  const [incentive, setIncentive] = useState(false);
  const [lineUp, setLineUp] = useState(false);
  const [selectCandidate, setSelectedCandidate] = useState(false);
  const [rejectedCandidate, setRejectedCandidate] = useState(false);
  const [holdCandidate, setHoldCandidate] = useState(false);
  const [updateSelfCalling, setUpdateSelfCalling] = useState(false);
  const [showCallingExcel, setShowCallingExcel] = useState(false);
  const [showResumeData, setShowResumeData] = useState(false);
  const [showJobDiscriptions, setShowJobDiscriptions] = useState(false);
  const [showCallingTrackerForm, setShowCallingTrackerForm] = useState(false);
  const [showHome, setShowHome] = useState(false);
  const [openSidebarToggle, setOpenSidebarToggle] = useState(true);
  const [showShortlistedCandidateData, setShortlistedCandidateData] =
    useState(false);
  const [addJobDescription, setAddJobDescription] = useState(false);
  const [showEmployeeMasterSheet, setShowEmployeeMasterSheet] = useState(false);
  const [showShortListedCandidates, setShowShortListedCandidates] =
    useState(false);
  const [showUpdateCallingTracker, setShowUpdateCallingTracker] =
    useState(false);
  const [showShortListedNav, setShowShortListdNav] = useState(false);
  const [showAddEmployee, setShowAddEmployee] = useState(false);
  const [showNotePad, setShowNotePad] = useState(false);
  const [showReports, setShowReports] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [showAddedResumes, setShowAddedResumes] = useState(false);
  const [showChatRoom, setShowChatRoom] = useState(false);
  const [assignColumns, setAssignColumns] = useState(false);
  const [showShareLink, setShowShareLink] = useState(false);
  const [resumeLink, setResumeLink] = useState(false);
  const [showCallingExcelList, setShowCallingExcelList] = useState(false);
  const [showLineupExcelList, setShowLineupExcelList] = useState(false);
  const [showUpdateResponse, setShowUpdateResponse] = useState(false);
  const [showPayRoll, setShowPayRoll] =
    useState(
      false
    ); /* ArshadAttar_EmpDashboard_AddedPayrollToggeleFunction_10/07/2024_LineNo_198-202 */
  const [showSendClientMail, setshowSendClientMail] = useState(false);
  const [showProfitLoss, setShowProfitLoss] =
    useState(
      false
    ); /* ArshadAttar_EmpDashboard_Added_showProfitLoss_11/07/2024_LineNo_89 */
  const [showInvoice, setShowInvoice] = useState(false);
  const [showInvoiceReport, setShowInvoiceReport] = useState(false);
  const [showInvoicePdf, setShowInvoicePdf] =
    useState(
      false
    ); /*ArbazPathan_EmpDashboard_AddedInvoiceToggeleFunction_11/07/2024_LineNo_87-207 */
  const [showAddCompany, setShowAddCompany] =
    useState(
      false
    ); /*Akash_Pawar_EmpDashboard_AddedAddCompanyToggle_11/07_LineNo_91*/
  const [showQuestionpaper, setShowQuestionpaper] = useState(false);
  const [showCapex, setShowCapex] = useState(false);
  const [showEmployeeDetails, setShowEmployeeDetails] = useState(false);
  const { employeeId } = useParams();
  const [successCount, setSuccessCount] = useState(0);
  const [pending, setPending] = useState(0);
  const [archived, setArchived] = useState(0);
  const [showscheduleinterview, setscheduleinterview] =
    useState(false); /*neha_scheduleinterview_18/07/24_line_no_104*/
  const [successAddUpdateResponse, setSuccessUpdateResponse] = useState(false);

  //Name:-Akash Pawar Component:-empDashboard Subcategory:-AddedLogoutTimeStamp and successfulDataAdditions Start LineNo:-80 Date:-01/07
  const [successfulDataAdditions, setSuccessfulDataAdditions] = useState(false);
  const [logoutTimestamp, setLogoutTimestamp] = useState(null);
  const [showSubscription, setShowSubscription] = useState(false);
  const [showBilling, setShowBilling] = useState(false);
  const [showPayment, setShowPayment] = useState(false);

  const handleLogoutTime = (timestamp) => {
    setLogoutTimestamp(timestamp);
  };
  const handleSuccessfulDataAdditions = (check) => {
    setSuccessfulDataAdditions(check);
  };
  useEffect(() => {
    setSuccessfulDataAdditions(false);
  }, [successfulDataAdditions]);

  useEffect(() => {
    setSuccessUpdateResponse(false);
  }, [successAddUpdateResponse]);
  //Name:-Akash Pawar Component:-empDashboard Subcategory:-AddedLogoutTimeStamp and successfulDataAdditions End LineNo:-93 Date:-01/07

  const [jobRoles, setJobRoles] = useState("");
  const handleJobRoles = (role) => {
    setJobRoles(role);
  };

  const handleSuccessAdd = (res) => {
    setSuccessUpdateResponse(res);
  };
  //Akash_Pawar_EmpDashboard_senderinformation_09/07_113

  const [loginEmployeeName, setLoginEmployeeName] = useState("");
  const [clientEmailSender, setClientEmailSender] = useState();
  const handleEmailSenderInformation = (data) => {
    setLoginEmployeeName(data.senderName); //akash_pawar_SelectedCandidate_ShareFunctionality_16/07_151
    setClientEmailSender(data);
  };

  const [showCompanyPolicy, setShowCompanyPolicy] = useState(false);
  const [showIssueSolving, setShowIssueSolving] = useState(false);
  const [showPainArea, setShowPainArea] = useState(false);
  const [showRightsInstruction, setShowRightsInstruction] = useState(false);

  const [id, setId] = useState(0);
  const navigator = useNavigate();

  const gettingCandidateIdForUpdate = (id) => {
    setCandidateIdForUpdate(id);
    setUpdateSelfCalling(true);
    setSelfCalling(false);
    setIncentive(false);
  };

  const togglescheduleinterview = () => {
    resetAllToggles();
    setscheduleinterview(!showscheduleinterview);
  };
  const toggelAddRecruiter = () => {
    resetAllToggles();
    setShowAddEmployee(!showAddEmployee);
    setIncentive(false);
  };

  const toggelDisplayNotPad = () => {
    resetAllToggles();
    setShowNotePad(!showNotePad);
    setIncentive(false);
  };
  const toggleReports = () => {
    resetAllToggles();
    setShowReports(!showReports);
    setIncentive(false);
  };

  const toggleAddJobDescription = () => {
    resetAllToggles();
    setAddJobDescription(!addJobDescription);
    setIncentive(false);
  };

  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle);
    setIncentive(false);
  };

  /*Akash_Pawar_EmpDashboard_toggleShowShortListedCandidateData_23/07_LineNo_213*/
  const toggleShowShortListedCandidateData = () => {
    resetAllToggles();
    setShortlistedCandidateData(true);
    setShowInterviewDate(false);
    setIncentive(false);
  };
  /*Akash_Pawar_EmpDashboard_toggleShowShortListedCandidateData_23/07_LineNo_220*/

  const viewUpdatedPage = () => {
    setShortlistedCandidateData(false);
    setShowUpdateCallingTracker(true);
    setIncentive(false);
  };

  const resetAllToggles = () => {
    setUpdateSelfCalling(false);
    setAddCandidate(false);
    setShowInterviewDate(false);
    setSelectedCandidate(false);
    setHoldCandidate(false);
    setRejectedCandidate(false);
    setShowJobDiscriptions(false);
    setSelfCalling(false);
    setLineUp(false);
    setShowCallingTrackerForm(false);
    setShowHome(false);
    setShowCallingExcel(false);
    setAttendanceSheet(false);
    setShowEmployeeMasterSheet(false);
    setShortlistedCandidateData(false);
    setAddJobDescription(false);
    setShowAddEmployee(false);
    setShowNotePad(false);
    setShowReports(false);
    setShowProfile(false);
    setShowAddedResumes(false);
    setIncentive(false);
    setAssignColumns(false);
    setShowChatRoom(false);
    setShowShareLink(false);
    setShowUpdateResponse(false);
    setResumeLink(false);
    setShowResumeData(false);
    setShowCallingExcelList(false);
    setShowLineupExcelList(false);
    setshowSendClientMail(false);
    setShowInvoice(false);
    setShowInvoicePdf(false);
    setShowInvoiceReport(
      false
    ); /*ArbazPathan_EmpDashboard_AddedInvoiceToggeleFunction_11/07/2024_LineNo_198-208 */
    setShowPayRoll(
      false
    ); /* ArshadAttar_EmpDashboard_AddedPayrollToggeleFunction_10/07/2024_LineNo_198-202 */
    setshowSendClientMail(false);
    setShowPayRoll(
      false
    ); /* ArshadAttar_EmpDashboard_AddedPayrollToggeleFunction_10/07/2024_LineNo_198-202 */
    setShowAddCompany(
      false
    ); /*Akash_Pawar_EmpDashboard_AddedAddCompanyToggle_11/07_LineNo_221*/
    setShowProfitLoss(false);
    setShowQuestionpaper(false);
    setShowCapex(false);
    setShowEmployeeDetails(false); /*Swapnil_AddedEmployeeDetails_16/07*/
    setShowSubscription(false); /*Arbaz_AddSubscriptions_19/07*/
    setShowBilling(false)
    setShowPayment(false)
    setscheduleinterview(false);  /*neha_addScheduleinterview_18/07_lineno_245*/
    setShowRightsInstruction(false);
    setShowCompanyPolicy(false);
    setShowPainArea(false);
    setShowIssueSolving(false);
  };

  /* ArshadAttar_EmpDashboa_Added_showProfitLoss_11/07/2024_LineNo_221-225 */
  const toggeleProfitChart = () => {
    resetAllToggles();
    setShowProfitLoss(!showProfitLoss);
  };

  /* ArshadAttar_EmpDashboard_AddedPayrollToggeleFunction_10/07/2024_LineNo_198-202 */
  const togglePayRoll = () => {
    resetAllToggles();
    setShowPayRoll(!showPayRoll);
  };

  // Swapnil_AddedEmployeeDetails_16/07
  const toggleEmployeeDetails = () => {
    resetAllToggles();
    setShowEmployeeDetails(!showEmployeeDetails);
  };

  /*Akash_Pawar_EmpDashboard_AddedAddCompanyToggle_11/07_LineNo_233-235*/
  const toggleAddCompany = () => {
    resetAllToggles();
    setShowAddCompany(!showPayRoll);
  };

  const funForUpdateSelfCalling = () => {
    resetAllToggles();
    setUpdateSelfCalling(true);
  };

  const funForUpdateLineUp = () => {
    resetAllToggles();
    setUpdateSelfCalling(true);
  };

  const toggleUpdateResponse = () => {
    resetAllToggles();
    setShowUpdateResponse(true);
  };

  // const toggleInterviewDate = () => {
  //   resetAllToggles();
  //   setShowShortListdNav(!showShortListedNav);
  // };

  const toggleEmployeeMasterSheet = () => {
    resetAllToggles();
    setShowEmployeeMasterSheet(!showEmployeeMasterSheet);
  };

  const toggleCallingTrackerForm = () => {
    resetAllToggles();
    setAddCandidate(!addCandidate);
  };

  /*Akash_Pawar_EmpDashboard_toggleShortListed(show interview candidate)_23/07_LineNo_345*/
  const toggleShortListed = () => {
    resetAllToggles();
    setShortlistedCandidateData(false);
    setShowInterviewDate(true);
    setIncentive(false);
  };
  /*Akash_Pawar_EmpDashboard_toggleShortListed(show interview candidate)_23/07_LineNo_352*/

  const toggleSelectCandidate = () => {
    resetAllToggles();
    setSelectedCandidate(!selectCandidate);
  };

  const toggleHoldCandidate = () => {
    resetAllToggles();
    setHoldCandidate(!holdCandidate);
  };

  const toggleRejectedCandidate = () => {
    resetAllToggles();
    setRejectedCandidate(!rejectedCandidate);
  };

  const toggleJobDescription = () => {
    resetAllToggles();
    setShowJobDiscriptions(!showJobDiscriptions);
  };

  const toggleSelfCalling = () => {
    resetAllToggles();
    setSelfCalling(!selfCalling);
    setSuccessShare(true);
  };

  const toggelLineUp = () => {
    resetAllToggles();
    setLineUp(!lineUp);
  };

  const toggleExcelCalling = () => {
    resetAllToggles();
    setShowCallingExcel(!showCallingExcel);
  };

  const toggelResumeData = () => {
    resetAllToggles();
    setShowResumeData(!showResumeData);
  };

  const toggleAttendance = () => {
    resetAllToggles();
    setShowProfile(false);
    setAttendanceSheet(!attendancesheet);
  };

  const toggleIncentive = () => {
    resetAllToggles();
    setShowProfile(false);
    setIncentive(!incentive);
  };

  const toggleAssigncolumns = () => {
    resetAllToggles();
    setAssignColumns(!assignColumns);
  };

  const toggleHome = () => {
    resetAllToggles();
    setShowHome(!showHome);
  };
  const toggleResumeLink = () => {
    resetAllToggles();
    setResumeLink(!resumeLink);
  };

  const toggleShortListedCandidates = () => {
    resetAllToggles();
    setShowShortListedCandidates(!showShortListedCandidates);
  };
  const toggleChatRoom = () => {
    resetAllToggles();
    setShowChatRoom(!showChatRoom);
  };
  const toggleShareLink = () => {
    resetAllToggles();
    setShowShareLink(!showShareLink);
  };
  const toggleUpdateCallingTracker = () => {
    resetAllToggles();
    setShowUpdateCallingTracker(!showUpdateCallingTracker);
  };

  const handleUpdateComplete = () => {
    setShowUpdateCallingTracker(false);
    setSelfCalling(true);
  };

  const profilePageLink = () => {
    resetAllToggles();
    setShowProfile(!showProfile);
  };

  const handleCloseProfile = () => {
    setShowProfile(false);
  };

  const handleUpdate = (id) => {
    setId(id);
    setAddCandidate(!addCandidate);
    setShowResumeData(false);
  };

  const toggelAddResumes = () => {
    resetAllToggles();
    setShowAddedResumes(!showAddedResumes);
  };

  const toggeExcelCallingData = () => {
    resetAllToggles();
    setShowCallingExcelList(!showCallingExcelList);
  };

  const toggelExcelLineup = () => {
    resetAllToggles();
    setShowLineupExcelList(!showLineupExcelList);
  };
  const toggleSendCandidate = () => {
    resetAllToggles();
    setshowSendClientMail(!showSendClientMail);
  };
  const toggleInvoice = () => {
    resetAllToggles();
    setShowInvoice(!showInvoice);
  };
  const toggleInvoiceReport = () => {
    resetAllToggles();
    setShowInvoiceReport(!showInvoiceReport);
  };
  const handleInvoicePdf = () => {
    resetAllToggles();
    setShowInvoicePdf(!showInvoicePdf);
  };
  const toggleQuestionPaper = () => {
    resetAllToggles();
    setShowQuestionpaper(!showQuestionpaper);
  };

  const toggleCapex = () => {
    resetAllToggles();
    setShowCapex(!showCapex);
  };
  const toggeleRightsInstructions = () => {
    resetAllToggles();
    setShowRightsInstruction(!showRightsInstruction);
  };
  const toggeleCompanyPolicy = () => {
    resetAllToggles();
    setShowCompanyPolicy(!showCompanyPolicy);
  };
  const toggeleIssueSolving = () => {
    resetAllToggles();
    setShowIssueSolving(!showIssueSolving);
  };
  const toggelePainArea = () => {
    resetAllToggles();
    setShowPainArea(!showPainArea);
  };
  const toggelSubscriptions = () => {
    resetAllToggles();
    setShowSubscription(!showSubscription);
  };
  const toggleBilling = () => {
    resetAllToggles();
    setShowBilling(!showBilling);
  };
  const togglePayment = () => {
    resetAllToggles();
    setShowPayment(!showPayment);
  };

  return (
    <div
      className={`grid-container ${
        openSidebarToggle ? "sidebar-open" : "sidebar-closed"
      }`}
    >
      <Sidebar
        userGroup={userGroup}
        openSidebarToggle={openSidebarToggle}
        OpenSidebar={() => setOpenSidebarToggle(!openSidebarToggle)}
        toggleSelfCalling={toggleSelfCalling}
        toggelLineUp={toggelLineUp}
        toggleCallingTrackerForm={toggleCallingTrackerForm}
        toggleAttendance={toggleAttendance}
        toggleShortListed={toggleShortListed}
        toggleSelectCandidate={toggleSelectCandidate}
        toggleRejectedCandidate={toggleRejectedCandidate}
        toggleHoldCandidate={toggleHoldCandidate}
        toggleExcelCalling={toggleExcelCalling}
        toggleResumeData={toggelResumeData}
        toggleJobDescription={toggleJobDescription}
        // toggleInterviewDate={toggleInterviewDate}
        toggleEmployeeMasterSheet={toggleEmployeeMasterSheet}
        toggleShortListedCandidates={toggleShortListedCandidates}
        toggleAddJobDescription={toggleAddJobDescription}
        toggelAddRecruiter={toggelAddRecruiter}
        toggelDisplayNotPad={toggelDisplayNotPad}
        toggleReports={toggleReports}
        toggelResumeData={toggelResumeData}
        toggelAddResumes={toggelAddResumes}
        toggleChatRoom={toggleChatRoom}
        toggleIncentive={toggleIncentive}
        toggleAssigncolumns={toggleAssigncolumns}
        toggleShareLink={toggleShareLink}
        onLogout={handleLogoutTime}
        toggeExcelCallingData={toggeExcelCallingData}
        toggelExcelLineup={toggelExcelLineup}
        toggleUpdateResponse={toggleUpdateResponse}
        jobRoles={jobRoles}
        successAddUpdateResponse={successAddUpdateResponse}
        togglePayRoll={
          togglePayRoll
        } /* ArshadAttar_EmpDashboard_AddedPayrollToggele_10/07/2024_LineNo_402 */
        toggleSendCandidate={toggleSendCandidate}
        toggeleProfitChart={
          toggeleProfitChart
        } /* ArshadAttar_EmpDashboard_Added_toggeleProfitChart_11/07/2024_LineNo_428 */
        /* ArbazPathan_EmpDashboard_AddedInvoice_InvoiceRepsortToggele_11/07/2024_LineNo_426-426 */
        toggleInvoice={toggleInvoice}
        toggleInvoiceReport={toggleInvoiceReport}
        toggleAddCompany={
          toggleAddCompany
        } /*Akash_Pawar_EmpDashboard_AddedAddCompanyToggle_11/07_LineNo_444*/
        toggleQuestionPaper={toggleQuestionPaper}
        toggleCapex={toggleCapex}
        toggleEmployeeDetails={toggleEmployeeDetails}
        toggleShowShortListedCandidateData={
          toggleShowShortListedCandidateData
        } /*Akash_Pawar_EmpDashboard_toggleShowShortListedCandidateData_23/07_LineNo_55*/
        /*ArbazPathan_EmpDashboard_AddedSubscription_&_InoviceReportToggeleFunction_19/07/2024_LineNo_525-526*/
        toggelSubscriptions={toggelSubscriptions}
        toggleBilling={toggleBilling}
        togglescheduleinterview={togglescheduleinterview}
        toggeleRightsInstructions={toggeleRightsInstructions}
        toggeleCompanyPolicy={toggeleCompanyPolicy}
        toggeleIssueSolving={toggeleIssueSolving}
        toggelePainArea={toggelePainArea}
      />

      <div className="empDash-main-content">
        <div className="time-and-data">
          <DailyWork
            employeeId={employeeId}
            profilePageLink={profilePageLink}
            successCount={successCount}
            successfulDataAdditions={successfulDataAdditions}
            // handleDataAdditionSuccess={handleDataAdditionSuccess}
            logoutTimestamp={logoutTimestamp}
            onCurrentEmployeeJobRoleSet={handleJobRoles}
            jobRole={jobRoles}
            emailSenderInformation={handleEmailSenderInformation}
          />
        </div>
        <div>
          {showProfile && (
            <EmployeeProfileData
              onClose={handleCloseProfile}
              toggleIncentive={toggleIncentive}
              toggleAttendance={toggleAttendance}
            ></EmployeeProfileData>
          )}
        </div>
        <div style={{ paddingTop: "50px" }}>
          {selfCalling && (
            <CallingList
              updateState={handleUpdateComplete}
              funForGettingCandidateId={gettingCandidateIdForUpdate}
              onSuccessAdd={handleSuccessAdd}
              loginEmployeeName={loginEmployeeName} //akash_pawar_SelectedCandidate_ShareFunctionality_16/07_545
            />
          )}
        </div>
        {/* <div>
          {showShortListedNav && (
            <ShortlistedNavbar loginEmployeeName={loginEmployeeName} />
          )}
        </div> */}
        <div>
          {showShortlistedCandidateData && (
            <ShortListedCandidates
              viewUpdatedPage={viewUpdatedPage}
              loginEmployeeName={loginEmployeeName}
              toggleShortListed={
                toggleShortListed
              } /*Akash_Pawar_EmpDashboard_toggleShortListed(show interview candidate)_23/07_LineNo_636*/
            />
          )}
        </div>
        <div>
          {lineUp && (
            <LineUpList
              updateState={funForUpdateLineUp}
              funForGettingCandidateId={gettingCandidateIdForUpdate}
              loginEmployeeName={loginEmployeeName} //akash_pawar_SelectedCandidate_ShareFunctionality_16/07_560
            />
          )}
        </div>

        {/* ArshadAttar_EmpDashboard_AddedPayroll_10/07/2024_OnlyPayRoll_Div_LineNo_450-453 */}
        <div>{showPayRoll && <PayRollMain></PayRollMain>}</div>

        {/* ArshadAttar_EmpDashboard_Added_LineGraph_11/07/2024_OnlyLineGraph_Div_LineNo_488-489 */}
        <div>{showProfitLoss && <LineGraph></LineGraph>}</div>
        <div>{showQuestionpaper && <QuestionPaper />}</div>

        <div>
          {showEmployeeMasterSheet && (
            <EmployeeMasterSheet loginEmployeeName={loginEmployeeName} /> //akash_pawar_SelectedCandidate_ShareFunctionality_16/07_574
          )}
        </div>
        <div>{incentive && <Incentive />}</div>
        <div>{attendancesheet && <Attendancesheet />}</div>

        <div>
          {showCallingExcelList && <CallingExcelList></CallingExcelList>}
        </div>
        <div>{showInterviewDate && <InterviewDates />}</div>
        <div>{showAddEmployee && <AddEmployee />}</div>
        <div>
          {selectCandidate && (
            <SelectedCandidate loginEmployeeName={loginEmployeeName} />
          )}
        </div>
        <div>
          {rejectedCandidate && (
            <RejectedCandidate loginEmployeeName={loginEmployeeName} />
          )}
        </div>
        <div>
          {holdCandidate && (
            <HoldCandidate loginEmployeeName={loginEmployeeName} />
          )}
        </div>
        <div>{showCallingExcel && <CallingExcel />}</div>
        <div>{showLineupExcelList && <LineupExcelData></LineupExcelData>}</div>
        <div>
          {showResumeData && <ResumeList handleUpdate={handleUpdate} />}
        </div>
        <div>{showNotePad && <NotePad />}</div>
        <div>{showReports && <Reports />}</div>
        <div>{showChatRoom && <ChatRoom />}</div>
        <div>
          {showShareLink && <ShareLink toggleResumeLink={toggleResumeLink} />}
        </div>
        {resumeLink && <CandidateResumeLink />}
        <div>
          {addCandidate && (
            <CallingTrackerForm
              loginEmployeeName={loginEmployeeName}
              onsuccessfulDataAdditions={handleSuccessfulDataAdditions}
            />
          )}
        </div>
        <div>
          {updateSelfCalling && (
            <UpdateCallingTracker candidateId={candidateIdForUpdate} />
          )}
        </div>
        <div>{addJobDescription && <AddJobDescription />}</div>
        <div>{showJobDiscriptions && <Home />}</div>
        <div>{showHome && <Home />}</div>
        <div>{showAddedResumes && <AddResumes></AddResumes>}</div>
        <div>{showInvoice && <InvoiceTable />}</div>
        <div>
          {showInvoiceReport && (
            <InvoiceReport handleInvoicePdf={handleInvoicePdf} />
          )}
        </div>
        <div>{showInvoicePdf && <InvoicePdf />}</div>
        <div>
          {showUpdateCallingTracker && (
            <UpdateCallingTracker candidateId={candidateIdForUpdate} />
          )}
        </div>
        <div>{assignColumns && <Team_Leader />}</div>
        <div>
          {showSubscription && (
            <SubscriptionPlans togglePayment={togglePayment} />
          )}
        </div>
        <div>{showPayment && <PaymentForm />}</div>
        <div>{showBilling && <Billing />}</div>
        <div>
          {showUpdateResponse && (
            <UpdateResponse onSuccessAdd={handleSuccessAdd} />
          )}
        </div>
        <div>
          {showUpdateResponse && (
            <UpdateResponse onSuccessAdd={handleSuccessAdd} />
          )}
        </div>
        <div>{showscheduleinterview && <ScheduleInterview />}</div>
        <div>
          {showSendClientMail && (
            <SendClientEmail clientEmailSender={clientEmailSender} />
          )}
        </div>
        <div>{showAddCompany && <AddCompanyDetails />}</div>
        <div>{showCapex && <Capex />}</div>
        <div>{showEmployeeDetails && <EmployeeDetails />}</div>

        <div>{showCompanyPolicy && <WorkplacePolicy></WorkplacePolicy>}</div>
        <div>{showIssueSolving && <IssueSolving></IssueSolving>}</div>
        <div>{showPainArea && <PainAreaSolving></PainAreaSolving>}</div>
        <div>
          {showRightsInstruction && (
            <RightsAndInstructions></RightsAndInstructions>
          )}
        </div>
      </div>
    </div>
  );
};

export default EmpDashboard;
