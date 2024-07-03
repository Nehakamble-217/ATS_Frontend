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
import ResumeData from "../ResumeData/resumedata";
import Home from "./JobList";
import DailyWork from "./dailyWork";
import { useNavigate } from "react-router-dom";
import Profile from "../LogoImages/ProfilePic.png";
import MasterSheet from "../EmployeeSection/masterSheet";
import EmployeeMasterSheet from "../EmployeeSection/employeeMasterSheet";
import ShortListedCandidates from "../CandidateSection/ShortListedCandidate";
import ShortlistedNavbar from "./shortlistedNavbar";
import AddJobDescription from "../JobDiscription/addJobDescription";
import AddEmployee from "../EmployeeSection/addEmployee";
import NotePad from "../notPad/notePad";
import EmployeeProfileData from "../EmployeeSection/employeeProfileData";
import AddResumes from "../ResumeData/addMultipleResumes";
import ChatRoom from "../ChatRoom/chatRoom";
import Team_Leader from "../AdminSection/Team_Leader";
import ShareLink from "../ResumeData/shareLink";
import CandidateResumeLink from "../ResumeData/candidateResumeLink";
import CallingExcelList from "../Excel/callingExcelData";
import LineupExcelData from "../Excel/lineupExcelData";

const EmpDashboard = ({ userGroup }) => {
  const [showInterviewDate, setShowInterviewDate] = useState(false);
  const [addCandidate, setAddCandidate] = useState(false);
  const [candidateIdForUpdate, setCandidateIdForUpdate] = useState(0);
  const [selfCalling, setSelfCalling] = useState(false);
  const [attendancesheet, setAttendanceSheet] = useState(false);
  const [incentive, setIncentive] = useState(false);
  const [lineUp, setLineUp] = useState(false);
  const [shortListed, setShortListed] = useState(false);
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
  const [showMasterSheet, setShowMasterSheet] = useState(false);
  const [showEmployeeMasterSheet, setShowEmployeeMasterSheet] = useState(false);
  const [showShortListedCandidates, setShowShortListedCandidates] =
    useState(false);
  const [showUpdateCallingTracker, setShowUpdateCallingTracker] =
    useState(false);
  const [showShortListedNav, setShowShortListdNav] = useState(false);
  const [showAddEmployee, setShowAddEmployee] = useState(false);
  const [showNotePad, setShowNotePad] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [showAddedResumes, setShowAddedResumes] = useState(false);
  const [showChatRoom, setShowChatRoom] = useState(false);
  const [assignColumns, setAssignColumns] = useState(false);
  const [showShareLink, setShowShareLink] = useState(false);
  const [resumeLink, setResumeLink] = useState(false);
  const [showCallingExcelList, setShowCallingExcelList] = useState(false);
  const [showLineupExcelList, setShowLineupExcelList] = useState(false);

  const { employeeId } = useParams();
  const [successCount, setSuccessCount] = useState(0);
  const [pending, setPending] = useState(0);
  const [archived, setArchived] = useState(0);

  //Name:-Akash Pawar Component:-empDashboard Subcategory:-AddedLogoutTimeStamp and successfulDataAdditions Start LineNo:-80 Date:-01/07
  const [successfulDataAdditions, setSuccessfulDataAdditions] = useState(false);
  const [logoutTimestamp, setLogoutTimestamp] = useState(null);

  const handleLogoutTime = (timestamp) => {
    setLogoutTimestamp(timestamp);
  };
  const handleSuccessfulDataAdditions = (check) => {
    setSuccessfulDataAdditions(check);
  };
  useEffect(() => {
    setSuccessfulDataAdditions(false);
  }, [successfulDataAdditions]);
  //Name:-Akash Pawar Component:-empDashboard Subcategory:-AddedLogoutTimeStamp and successfulDataAdditions End LineNo:-93 Date:-01/07

  const [jobRoles, setJobRoles] = useState("");
  const handleJobRoles = (role) => {
    setJobRoles(role);
  };

  const [id, setId] = useState(0);

  const navigator = useNavigate();

  const gettingCandidateIdForUpdate = (id) => {
    setCandidateIdForUpdate(id);
    setUpdateSelfCalling(true);
    setSelfCalling(false);
    setIncentive(false);
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

  const toggleAddJobDescription = () => {
    resetAllToggles();
    setAddJobDescription(!addJobDescription);
    setIncentive(false);
  };

  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle);
    setIncentive(false);
  };

  const toggleShowShortListedCandidateData = () => {
    setShortlistedCandidateData(true);
    setShowInterviewDate(false);
    resetAllToggles();
    setIncentive(false);
  };

  const viewUpdatedPage = () => {
    setShortlistedCandidateData(false);
    setShowUpdateCallingTracker(true);
    setIncentive(false);
  };

  const resetAllToggles = () => {
    setUpdateSelfCalling(false);
    setAddCandidate(false);
    setShortListed(false);
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
    setShowMasterSheet(false);
    setAddJobDescription(false);
    setShowShortListdNav(false);
    setShowAddEmployee(false);
    setShowNotePad(false);
    setShowProfile(false);
    setShowAddedResumes(false);
    setIncentive(false);
    setAssignColumns(false);
    setShowChatRoom(false);
    setShowShareLink(false);

    setResumeLink(false);
    setShowResumeData(false);
    setShowCallingExcelList(false);
    setShowLineupExcelList(false);
  };

  const funForUpdateSelfCalling = () => {
    resetAllToggles();
    setUpdateSelfCalling(true);
  };

  const funForUpdateLineUp = () => {
    resetAllToggles();
    setUpdateSelfCalling(true);
  };

  const toggleInterviewDate = () => {
    resetAllToggles();
    setShowShortListdNav(!showShortListedNav);
  };

  const toggleAllMasterSheet = () => {
    resetAllToggles();
    setShowMasterSheet(!showMasterSheet);
  };

  const toggleEmployeeMasterSheet = () => {
    resetAllToggles();
    setShowEmployeeMasterSheet(!showEmployeeMasterSheet);
  };

  const toggleCallingTrackerForm = () => {
    resetAllToggles();
    setAddCandidate(!addCandidate);
  };

  const toggleShortListed = () => {
    resetAllToggles();
    setShortListed(!shortListed);
  };

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
    setAttendanceSheet(!attendancesheet);
  };

  const toggleIncentive = () => {
    resetAllToggles();
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
        toggleInterviewDate={toggleInterviewDate}
        toggleAllMasterSheet={toggleAllMasterSheet}
        toggleEmployeeMasterSheet={toggleEmployeeMasterSheet}
        toggleShortListedCandidates={toggleShortListedCandidates}
        toggleAddJobDescription={toggleAddJobDescription}
        toggelAddRecruiter={toggelAddRecruiter}
        toggelDisplayNotPad={toggelDisplayNotPad}
        toggelResumeData={toggelResumeData}
        toggelAddResumes={toggelAddResumes}
        toggleChatRoom={toggleChatRoom}
        toggleIncentive={toggleIncentive}
        toggleAssigncolumns={toggleAssigncolumns}
        toggleShareLink={toggleShareLink}
        onLogout={handleLogoutTime}
        toggeExcelCallingData={toggeExcelCallingData}
        toggelExcelLineup={toggelExcelLineup}
        jobRoles={jobRoles}
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
          />
        </div>
        <div>
          {showProfile && (
            <EmployeeProfileData
              onClose={handleCloseProfile}
            ></EmployeeProfileData>
          )}
        </div>
        <div style={{ paddingTop: "50px" }}>
          {selfCalling && (
            <CallingList
              updateState={handleUpdateComplete}
              funForGettingCandidateId={gettingCandidateIdForUpdate}
            />
          )}
        </div>
        <div >{showShortListedNav && <ShortlistedNavbar />}</div>
        <div >
          {showShortlistedCandidateData && (
            <ShortListedCandidates viewUpdatedPage={viewUpdatedPage} />
          )}
        </div>
        <div>
          {lineUp && (
            <LineUpList
              updateState={funForUpdateLineUp}
              funForGettingCandidateId={gettingCandidateIdForUpdate}
            />
          )}
        </div>

        <div>{showEmployeeMasterSheet && <EmployeeMasterSheet />}</div>

        <div>{showMasterSheet && <MasterSheet />}</div>

        <div>{incentive && <Incentive />}</div>
        <div>{attendancesheet && <Attendancesheet />}</div>

        <div>
          {showCallingExcelList && <CallingExcelList></CallingExcelList>}
        </div>
        <div>{shortListed && <InterviewDates />}</div>
        <div>{showAddEmployee && <AddEmployee />}</div>
        <div>{selectCandidate && <SelectedCandidate />}</div>
        <div>{rejectedCandidate && <RejectedCandidate />}</div>
        <div>{holdCandidate && <HoldCandidate />}</div>
        <div>{showCallingExcel && <CallingExcel />}</div>
        <div>{showLineupExcelList && <LineupExcelData></LineupExcelData>}</div>
        <div>
          {showResumeData && <ResumeData handleUpdate={handleUpdate} />}
        </div>
        <div>{showNotePad && <NotePad />}</div>
        <div>{showChatRoom && <ChatRoom />}</div>
        <div>
          {showShareLink && <ShareLink toggleResumeLink={toggleResumeLink} />}
        </div>
        {resumeLink && <CandidateResumeLink />}
        <div>
          {addCandidate && (
            <CallingTrackerForm
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
        <div>{showShortListedCandidates && <ShortListedCandidates />}</div>
        <div>
          {showUpdateCallingTracker && (
            <UpdateCallingTracker candidateId={candidateIdForUpdate} />
          )}
        </div>
        <div>{assignColumns && <Team_Leader />}</div>
      </div>
    </div>
  );
};

export default EmpDashboard;
