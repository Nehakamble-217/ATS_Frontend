import { useState } from "react";
import HomePage from "./HomePage/homePage";
import MainDashboard from "../src/MainDashboard/mainDashboard";
import Login from "./LoginPage/loginPage";
import EmpDashboard from "./EmployeeDashboard/empDashboard";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AfterSelection from "./CandidateSection/afterSelection";
import AdminLogin from "./LoginPage/adminLogin";
import CandidateVerification from "./CandidateSection/candidateVerification";  
import Home from "../src/MainDashboard/mainDashboard";
import ForgotPasswordForm from "./LoginPage/ForgotPasswordForm";

import CandidateResumeLink from "./ResumeData/candidateResumeLink";
import CallingTrackerForm from "./EmployeeSection/CallingTrackerForm";



const App = () => {

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/mainDashboard" element={<MainDashboard />} />
          <Route path="/employee-login/:userType" element={<Login />} />
          <Route path="/forgotPassword" element={<ForgotPasswordForm/>}/>
          <Route path="/empDash/:employeeId" element={<EmpDashboard />} />
          <Route path="/follow-up/:candidateId" element={<AfterSelection />} />
          <Route path="/admin-login" element={<AdminLogin></AdminLogin>}></Route>
          <Route path="api/ats/157industries/verify" element={<CandidateVerification></CandidateVerification>}></Route>
          <Route path="/shareResumeLink" element={<CandidateResumeLink/>}></Route>
          <Route path="/callingtracker" element={<CallingTrackerForm/>}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
