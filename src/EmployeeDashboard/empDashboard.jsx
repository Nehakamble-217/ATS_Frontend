import { useState } from "react";
import Header from "./header";
import Sidebar from "../EmployeeDashboard/sideBar";
import CallingList from "../EmployeeSection/selfCallingTracker";
import LineUpList from "../EmployeeSection/LineUpList";
import "./empDashboard.css";
import EmpTimeTracker from "./EmpTimeTracker";
import CallingTrackerForm from "../EmployeeSection/CallingTrackerForm";
import { Outlet, useParams } from "react-router-dom";
import DataComponent from "../EmployeeSection/DataComponent";
import Attendancesheet from '../EmployeeSection/Attendence_sheet'
import InterviewDates from "../EmployeeSection/interviewDate";
import ShortListedCandidates from "../CandidateSection/ShortListedCandidate";
import SelectedCandidate from "../CandidateSection/SelectedCandidate";
import RejectedCandidate from "../CandidateSection/rejectedCandidate";
import HoldCandidate from "../CandidateSection/holdCandidate";
import UpdateCallingTracker from "../EmployeeSection/UpdateSelfCalling";
import CallingExcel from "../Excel/callingExcel";
import Home from "../EmployeeDashboard/home";
import DailyWork from "./dailyWork";
import { useNavigate } from "react-router-dom";

import { faL } from "@fortawesome/free-solid-svg-icons";
    

const empDashboard = () => {
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false);
  const [showInterviewDate, setShowInterviewDate]= useState(false)
  const [addCandidate, setAddCandidate] = useState(false);
  const [candidateIdForUpdate, setCandidateIdForUpdate] = useState(0);
  const [selfCalling, setSelfCalling] = useState(false);
  const [attendancesheet,setAttendanceSheet] = useState(false);
  const [lineUp, setLineUp] = useState(false);
  const [shortListed, setShortListed] = useState(false);
  const [selectCandidate, setSelectedCandidate] = useState(false);
  const [rejectedCandidate, setRejectedCandidate] = useState(false);
  const [holdCandidate, setHoldCandidate] = useState(false);
  const [updateSelfCalling, setUpdateSelfCalling] = useState(false);
  const [showCallingExcel,setShowCallingExcel] = useState(false)
  const [showJobDiscriptions,setShowJobDiscriptions] = useState(false)
  const [showCallingTrackerForm, setShowCallingTrackerForm]= useState(false)
  
  const [showHome , setShowHome]= useState(false)
  const { employeeId } = useParams();
  const [successfulDataAdditions, setSuccessfulDataAdditions] = useState(0);
  const navigator = useNavigate();


  const gettingCandidateIdForUpdate = (id) => {
    console.log("Id for update : ", id);
    setCandidateIdForUpdate(id);
  };
  const handleDataAdditionSuccess = () => {
    setSuccessfulDataAdditions((prevCount) => prevCount + 1);
  };
  
  const funForUpdateSelfCalling = () => {
    setUpdateSelfCalling(true);
    setAddCandidate(false);
    setShortListed(false);
    setSelectedCandidate(false);
    setHoldCandidate(false);
    setRejectedCandidate(false);
    setShowJobDiscriptions(false)
    setSelfCalling(false);
    setLineUp(false);
    setShowCallingTrackerForm(false);
    setShowHome(false)
    setShowCallingExcel(false)
    setAttendanceSheet(false)
    
  };
  const funForUpdateLineUp = () => {
    setUpdateSelfCalling(true);
    setAddCandidate(false);
    setShortListed(false);
    setSelectedCandidate(false);
    setHoldCandidate(false);
    setRejectedCandidate(false);
    setShowJobDiscriptions(false)
    setSelfCalling(false);
    setLineUp(false);
    setShowCallingTrackerForm(false);
    setShowHome(false)
    setShowCallingExcel(false)
    setAttendanceSheet(false)
    
  };
  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle);

  };

  const toggleInterviewDate = () => {
    setShowInterviewDate(!showInterviewDate)
    // setShowInterviewDate(true)
    setAddCandidate(false);
    setShortListed(false);
    setSelectedCandidate(false);
    setHoldCandidate(false);
    setRejectedCandidate(false);
    setShowJobDiscriptions(false)
    setSelfCalling(false);
    setLineUp(false);
    setShowCallingTrackerForm(false);
    setShowHome(false)
    setShowCallingExcel(false)
    setAttendanceSheet(false)
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
    setShowCallingExcel(false)
    setAttendanceSheet(false)

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
    setShowCallingExcel(false)
    setAttendanceSheet(false)

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
    setShowCallingExcel(false)
    setAttendanceSheet(false)

  };
  const toggleHoldCandidate = () => {
    setHoldCandidate(!holdCandidate);
    setShowInterviewDate(false);
    setAddCandidate(false);
    setShortListed(false);
    setSelectedCandidate(false);
    setRejectedCandidate(false);
    setShowJobDiscriptions(false)
    setSelfCalling(false);
    setLineUp(false);
    setShowCallingExcel(false)
    setAttendanceSheet(false)

  };
  const toggleRejectedCandidate = () => {
    setRejectedCandidate(!rejectedCandidate);
    setShowInterviewDate(false);
    setAddCandidate(false);
    setShortListed(false);
    setSelectedCandidate(false);
    setHoldCandidate(false)
    setShowJobDiscriptions(false)
    setSelfCalling(false);
    setShowCallingExcel(false)
    setLineUp(false);
    setShowCallingTrackerForm(false);
    setAttendanceSheet(false)

  };

  const toggleJobDescription = () =>{
    setShowJobDiscriptions(!showJobDiscriptions)
    setShowInterviewDate(false);
    setAddCandidate(false);
    setShortListed(false);
    setSelectedCandidate(false);
    setHoldCandidate(false)
    setRejectedCandidate(false);
    setSelfCalling(false);
    setShowCallingExcel(false);
    setLineUp(false);
    setAttendanceSheet(false)
  }


  const toggleSelfCalling = () => {
    setSelfCalling(!selfCalling);
    setShowInterviewDate(false);
    setAddCandidate(false);
    setShortListed(false);
    setSelectedCandidate(false);
    setHoldCandidate(false)
    setRejectedCandidate(false);
    setShowJobDiscriptions(false)
    setLineUp(false);
    setUpdateSelfCalling(false)
    setShowCallingExcel(false);
    setAttendanceSheet(false)
  };
  
  const toggelLineUp = () => {
    setLineUp(!lineUp);
    setShowInterviewDate(false);
    setAddCandidate(false)
    setShortListed(false);
    setSelectedCandidate(false);
    setHoldCandidate(false)
    setRejectedCandidate(false);
    setShowJobDiscriptions(false)
    setSelfCalling(false);
    setShowCallingExcel(false)
    setUpdateSelfCalling(false);
    setAttendanceSheet(false)
    setShowCallingTrackerForm(false);
  };

  
  
   const toggleExcelCalling = () => {
    setShowCallingExcel(!showCallingExcel)
    setShowInterviewDate(false);
    setAddCandidate(false)
    setShortListed(false);
    setSelectedCandidate(false);
    setHoldCandidate(false)
    setRejectedCandidate(false);
    setShowJobDiscriptions(false)
    setSelfCalling(false);
    setLineUp(false);
    setShowCallingTrackerForm(false);
    setAttendanceSheet(false);
  }

 const toggleAttendance = () => {
  setAttendanceSheet(!attendancesheet);
  setShowInterviewDate(false);
    setShortListed(false);
    setSelectedCandidate(false);
    setHoldCandidate(false);
    setRejectedCandidate(false);
    setShowJobDiscriptions(false);
    setSelfCalling(false);
    setLineUp(false);
    setShowCallingExcel(false)

 }

  




  return (
    <div className="grid-container">
    
      <Sidebar
        openSidebarToggle={openSidebarToggle}
        OpenSidebar={OpenSidebar}
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
      />

      
      <div className="empDash-main-content">

        <div className="time-and-data">
        <DailyWork employeeId={employeeId}
            successfulDataAdditions={successfulDataAdditions}
            />
          {/* <DataComponent />
          <EmpTimeTracker /> */}
        </div>
       <div>
        <div style={{ paddingTop: "100px" }}>
          {selfCalling && (
            <CallingList
              updateState={funForUpdateSelfCalling}
              funForGettingCandidateId={gettingCandidateIdForUpdate}
            />
          )}
        </div>
        
        <div>
          {
            showInterviewDate && (<InterviewDates/>)
          }
        </div>

        <div>
          {lineUp && (
            <LineUpList
            updateState={funForUpdateLineUp}
            funForGettingCandidateId={gettingCandidateIdForUpdate} />
          )}
        </div>

        <div>
          {showJobDiscriptions && (
            <Home></Home>
          )}
        </div>

        <div>
        {updateSelfCalling && (
          <UpdateCallingTracker candidateId={candidateIdForUpdate} />
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
        {showCallingExcel && <CallingExcel/>}
       </div>
       
        {shortListed && <ShortListedCandidates />}
        {selectCandidate && <SelectedCandidate />}
        {rejectedCandidate && <RejectedCandidate />}
        {holdCandidate && <HoldCandidate />}

        <div>
          {attendancesheet && <Attendancesheet />}
        </div>

        {/* {!selfCalling &&
          !updateSelfCalling &&
          !lineUp &&
          !addCandidate &&
          !shortListed &&
          !selectCandidate &&
          !rejectedCandidate &&
          !holdCandidate} */}

        {/* <Outlet /> */}
        <div className="grid-container">
        {/* <Header OpenSidebar={OpenSidebar} /> */}

        </div>
      </div>
      </div>
    </div>
  );
};

export default empDashboard;
