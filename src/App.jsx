import { useState } from "react";

import HomePage from "./HomePage/homePage";
import MainDashboard from "../src/MainDashboard/mainDashboard";
import Login from "./LoginPage/loginPage";
import EmpDashboard from "./EmployeeDashboard/empDashboard";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AfterSelection from "./CandidateSection/afterSelection";
import AdminLogin from "./LoginPage/adminLogin";

const App = () => {
  
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/mainDashboard" element={<MainDashboard />} />
          <Route path="/employee-login" element={<Login  />} />
          <Route path="/empDash/:employeeId" element={<EmpDashboard   />} />
          <Route path="/follow-up/:candidateId" element={<AfterSelection/>}/>
          <Route path="/admin-login" element={<AdminLogin></AdminLogin>}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
