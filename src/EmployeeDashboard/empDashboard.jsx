import React, { useState } from "react";
import Sidebar from "../EmployeeDashboard/sideBar";
import CallingList from "../EmployeeSection/selfCallingTracker";
import LineUpList from "../EmployeeSection/LineUpList";
import "./empDashboard.css";
import EmpTimeTracker from "./EmpTimeTracker";
import CallingTrackerForm from "../EmployeeSection/CallingTrackerForm";
import { Outlet, useParams } from "react-router-dom";
import DataComponent from "../EmployeeSection/DataComponent";
import Attendancesheet from '../EmployeeSection/Attendence_sheet';
import InterviewDates from "../EmployeeSection/interviewDate";
import SelectedCandidate from "../CandidateSection/SelectedCandidate";
import RejectedCandidate from "../CandidateSection/rejectedCandidate";
import HoldCandidate from "../CandidateSection/holdCandidate";
import UpdateCallingTracker from "../EmployeeSection/UpdateSelfCalling";
import CallingExcel from "../Excel/callingExcel";
import Home from "../EmployeeDashboard/home";
import DailyWork from "./dailyWork";
import { useNavigate } from "react-router-dom";
import Profile from "../LogoImages/ProfilePic.png";
import MasterSheet from "../EmployeeSection/masterSheet";
import EmployeeMasterSheet from "../EmployeeSection/employeeMasterSheet";
import ShortListedCandidates from "../CandidateSection/ShortListedCandidate";
import ShortlistedNavbar from "./shortlistedNavbar";

const EmpDashboard = () => {
  const [showInterviewDate, setShowInterviewDate] = useState(false);
  const [addCandidate, setAddCandidate] = useState(false);
  const [candidateIdForUpdate, setCandidateIdForUpdate] = useState(0);
  const [selfCalling, setSelfCalling] = useState(false);
  const [attendancesheet, setAttendanceSheet] = useState(false);
  const [lineUp, setLineUp] = useState(false);
  const [shortListed, setShortListed] = useState(false);
  const [selectCandidate, setSelectedCandidate] = useState(false);
  const [rejectedCandidate, setRejectedCandidate] = useState(false);
  const [holdCandidate, setHoldCandidate] = useState(false);
  const [updateSelfCalling, setUpdateSelfCalling] = useState(false);
  const [showCallingExcel, setShowCallingExcel] = useState(false);
  const [showJobDiscriptions, setShowJobDiscriptions] = useState(false);
  const [showCallingTrackerForm, setShowCallingTrackerForm] = useState(false);
  const [showHome, setShowHome] = useState(false);
  const [openSidebarToggle, setOpenSidebarToggle] = useState(true);
  const [showShortlistedCandidateData,setShortlistedCandidateData] = useState(false)

  const [showMasterSheet, setShowMasterSheet] = useState(false);
  const [showEmployeeMasterSheet, setShowEmployeeMasterSheet] = useState(false);


  const [showShortListedCandidates, setShowShortListedCandidates] = useState(
    false
  );
  const [showUpdateCallingTracker, setShowUpdateCallingTracker] = useState(
    false
  );

  const [showShortListedNav,setShowShortListdNav]=useState(false)
  


  const { employeeId } = useParams();
  const [successfulDataAdditions, setSuccessfulDataAdditions] = useState(0);
  const navigator = useNavigate();


  const gettingCandidateIdForUpdate = (id) => {
    setCandidateIdForUpdate(id);
    setUpdateSelfCalling(true);
    setSelfCalling(false); // Hide CallingList when showing UpdateCallingTracker
  };

  const handleDataAdditionSuccess = () => {
    setSuccessfulDataAdditions((prevCount) => prevCount + 1);
  };

  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle);
  };

  const toggleShowShortListedCandidateData =() =>{
    setShortlistedCandidateData(true)
    setShowInterviewDate(false)
  }

  const viewUpdatedPage = () => {
    setShortlistedCandidateData(false);
    setShowUpdateCallingTracker(true);
  };

  const funForUpdateSelfCalling = () => {
    setUpdateSelfCalling(true);
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
        setShowMasterSheet(false)
  };

  const funForUpdateLineUp = () => {
    setUpdateSelfCalling(true);
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
        setShowMasterSheet(false)
  };

  const toggleInterviewDate = () => {
    setShowShortListdNav(!showShortListedNav)
    // setShowInterviewDate(!showInterviewDate);
    // setAddCandidate(false);
    // setShortListed(false);
    // setSelectedCandidate(false);
    // setHoldCandidate(false);
    // setRejectedCandidate(false);
    // setShowJobDiscriptions(false);
    // setSelfCalling(false);
    // setLineUp(false);
    // setShowCallingTrackerForm(false);
    // setShowHome(false);
    // setShowCallingExcel(false);
    // setAttendanceSheet(false);
    // setShowShortListedCandidates(false);
    // setShowUpdateCallingTracker(false);

  };

  const toggleAllMasterSheet = () => {
    setShowMasterSheet(!showMasterSheet);
    setShowInterviewDate(false);
    setShortListed(false);
    setSelectedCandidate(false);
    setHoldCandidate(false);
    setRejectedCandidate(false);
    setShowJobDiscriptions(false);
    setSelfCalling(false);
    setLineUp(false);
    setShowCallingExcel(false);
    setAttendanceSheet(false);
    setShowEmployeeMasterSheet(false);
        

  }

  const toggleEmployeeMasterSheet = () => {
    setShowEmployeeMasterSheet(!showEmployeeMasterSheet);
    setShowInterviewDate(false);
    setShortListed(false);
    setSelectedCandidate(false);
    setHoldCandidate(false);
    setRejectedCandidate(false);
    setShowJobDiscriptions(false);
    setSelfCalling(false);
    setLineUp(false);
    setShowCallingExcel(false);
    setAttendanceSheet(false);
    setShowMasterSheet(false)
  }

  const toggleCallingTrackerForm = () => {
    setAddCandidate(!addCandidate);
    setShowInterviewDate(false);
    setShortListed(false);
    setSelectedCandidate(false);
    setHoldCandidate(false);
    setRejectedCandidate(false);
    setShowJobDiscriptions(false);
    setSelfCalling(false);
    setLineUp(false);
    setShowCallingExcel(false);
    setAttendanceSheet(false);
     setShowEmployeeMasterSheet(false);
        setShowMasterSheet(false)
  };

  const toggleShortListed = () => {
    setShortListed(!shortListed);
    setShowInterviewDate(false);
    setAddCandidate(false);
    setSelectedCandidate(false);
    setHoldCandidate(false);
    setRejectedCandidate(false);
    setShowJobDiscriptions(false);
    setSelfCalling(false);
    setLineUp(false);
    setShowCallingExcel(false);
    setAttendanceSheet(false);
    setShowUpdateCallingTracker(false);

  };

  const toggleSelectCandidate = () => {
    setSelectedCandidate(!selectCandidate);
    setShowInterviewDate(false);
    setAddCandidate(false);
    setShortListed(false);
    setHoldCandidate(false);
    setRejectedCandidate(false);
    setShowJobDiscriptions(false);
    setSelfCalling(false);
    setLineUp(false);
    setShowCallingExcel(false);
    setAttendanceSheet(false);
     setShowEmployeeMasterSheet(false);
        setShowMasterSheet(false)
  };

  const toggleHoldCandidate = () => {
    setHoldCandidate(!holdCandidate);
    setShowInterviewDate(false);
    setAddCandidate(false);
    setShortListed(false);
    setSelectedCandidate(false);
    setRejectedCandidate(false);
    setShowJobDiscriptions(false);
    setSelfCalling(false);
    setLineUp(false);
    setShowCallingExcel(false);
    setAttendanceSheet(false);
     setShowEmployeeMasterSheet(false);
        setShowMasterSheet(false)
  };

  const toggleRejectedCandidate = () => {
    setRejectedCandidate(!rejectedCandidate);
    setShowInterviewDate(false);
    setAddCandidate(false);
    setShortListed(false);
    setSelectedCandidate(false);
    setHoldCandidate(false);
    setShowJobDiscriptions(false);
    setSelfCalling(false);
    setShowCallingExcel(false);
    setLineUp(false);
    setShowCallingTrackerForm(false);
    setAttendanceSheet(false);
     setShowEmployeeMasterSheet(false);
        setShowMasterSheet(false)
  };

  const toggleJobDescription = () => {
    setShowJobDiscriptions(!showJobDiscriptions);
    setShowInterviewDate(false);
    setAddCandidate(false);
    setShortListed(false);
    setSelectedCandidate(false);
    setHoldCandidate(false);
    setRejectedCandidate(false);
    setSelfCalling(false);
    setLineUp(false);
    setAttendanceSheet(false);
     setShowEmployeeMasterSheet(false);
        setShowMasterSheet(false)
  };

  const toggleSelfCalling = () => {
    setSelfCalling(!selfCalling);
    setShowInterviewDate(false);
    setAddCandidate(false);
    setShortListed(false);
    setSelectedCandidate(false);
    setHoldCandidate(false);
    setRejectedCandidate(false);
    setShowJobDiscriptions(false);
    setLineUp(false);
    setUpdateSelfCalling(false);
    setShowCallingExcel(false);
    setAttendanceSheet(false);
     setShowEmployeeMasterSheet(false);
        setShowMasterSheet(false)
  };

  const toggelLineUp = () => {
    setLineUp(!lineUp);
    setShowInterviewDate(false);
    setAddCandidate(false);
    setShortListed(false);
    setSelectedCandidate(false);
    setHoldCandidate(false);
    setRejectedCandidate(false);
    setShowJobDiscriptions(false);
    setSelfCalling(false);
    setUpdateSelfCalling(false);
    setShowCallingExcel(false);
    setAttendanceSheet(false);
     setShowEmployeeMasterSheet(false);
        setShowMasterSheet(false)
  };

  const toggleExcelCalling = () => {
    setShowCallingExcel(!showCallingExcel);
    setLineUp(false);
    setShowInterviewDate(false);
    setAddCandidate(false);
    setShortListed(false);
    setSelectedCandidate(false);
    setHoldCandidate(false);
    setRejectedCandidate(false);
    setShowJobDiscriptions(false);
    setSelfCalling(false);
    setUpdateSelfCalling(false);
    setAttendanceSheet(false);
     setShowEmployeeMasterSheet(false);
        setShowMasterSheet(false)
  };

  const toggleAttendance = () => {
    setAttendanceSheet(!attendancesheet);
    setLineUp(false);
    setShowInterviewDate(false);
    setAddCandidate(false);
    setShortListed(false);
    setSelectedCandidate(false);
    setHoldCandidate(false);
    setRejectedCandidate(false);
    setShowJobDiscriptions(false);
    setSelfCalling(false);
    setUpdateSelfCalling(false);
    setShowCallingExcel(false);
     setShowEmployeeMasterSheet(false);
        setShowMasterSheet(false)
  };

  const toggleHome = () => {
    setShowHome(!showHome);
    setAttendanceSheet(false);
    setLineUp(false);
    setShowInterviewDate(false);
    setAddCandidate(false);
    setShortListed(false);
    setSelectedCandidate(false);
    setHoldCandidate(false);
    setRejectedCandidate(false);
    setShowJobDiscriptions(false);
    setSelfCalling(false);
    setUpdateSelfCalling(false);
    setShowCallingExcel(false);
     setShowEmployeeMasterSheet(false);
        setShowMasterSheet(false)
  };

  const toggleShortListedCandidates = () => {
    setShowShortListedCandidates(!showShortListedCandidates);
    setShowInterviewDate(false);
  };

  const toggleUpdateCallingTracker = () => {
    setShowUpdateCallingTracker(!showUpdateCallingTracker);
    setShowInterviewDate(false);
    setShowShortListedCandidates(false);
  };

  const handleUpdateComplete = () => {
    setShowUpdateCallingTracker(false);
    setSelfCalling(true); // Show CallingList again after update is complete
  };


  return (
    <div className={`grid-container ${openSidebarToggle ? 'sidebar-open' : 'sidebar-closed'}`}>
      <Sidebar
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
        toggleJobDescription={toggleJobDescription}
        toggleInterviewDate={toggleInterviewDate}
        toggleAllMasterSheet={toggleAllMasterSheet}
        toggleEmployeeMasterSheet={toggleEmployeeMasterSheet}
        toggleShortListedCandidates={toggleShortListedCandidates}
  
      />

      <div className="empDash-main-content">
        <div className="time-and-data">

          <DailyWork employeeId={employeeId}  successfulDataAdditions={successfulDataAdditions} />
        </div>

        <div style={{ paddingTop: "50px" }}>
          {selfCalling && (
            <CallingList updateState={handleUpdateComplete} funForGettingCandidateId={gettingCandidateIdForUpdate} />
          )}
        </div>

        <div>
          {showShortListedNav &&(
            <ShortlistedNavbar></ShortlistedNavbar>
          )}
        </div>

        <div>
          {showShortlistedCandidateData && (
            <ShortListedCandidates     viewUpdatedPage={viewUpdatedPage}></ShortListedCandidates>
          )}
        </div>
        
        <div>
          {lineUp && <LineUpList updateState={funForUpdateLineUp} funForGettingCandidateId={gettingCandidateIdForUpdate} />}
        </div>

        <div>
          {showEmployeeMasterSheet && <EmployeeMasterSheet></EmployeeMasterSheet>}
        </div>
        <div>
          {showMasterSheet && <MasterSheet></MasterSheet>}
        </div>


        <div>
          {showJobDiscriptions && <Home />}
        </div>

        <div>
          {showUpdateCallingTracker && (
            <UpdateCallingTracker
              onComplete={handleUpdateComplete}
              candidateId={candidateIdForUpdate}
              employeeId={employeeId}
            />
          )}
        </div>

       <div>
          {addCandidate && (
            <CallingTrackerForm
              employeeId={parseInt(employeeId, 10)}
              onDataAdditionSuccess={handleDataAdditionSuccess}
            />
          )}
        </div>

        <div>
          {showCallingExcel && <CallingExcel />}
        </div>

        {selectCandidate && <SelectedCandidate />}
        {rejectedCandidate && <RejectedCandidate />}
        {holdCandidate && <HoldCandidate />}
        <div>
          {attendancesheet && <Attendancesheet />}
        </div>
      </div>
    </div>
  );
};

export default EmpDashboard;
