import React from "react";
import { useNavigate } from "react-router-dom";
import "./recruiterPage.css";

const RecruiterPage = () => {
  const navigate = useNavigate();

  const handleLoginClick = (userType) => {
    navigate(`/login/${userType}`);
  };

  return (
    <div className="mainDashboard-div">
      <div className="main-clouds"></div>
      <div className="pricing-plan">
        <div className="square-box">
          <div className="content">
            <h1>Recruiter</h1>
            <button className="login" onClick={() => handleLoginClick("Recruiters")}>Login</button>
          </div>
        </div>
        <div className="square-box">
          <div className="content">
            <h1>Team Leader</h1>
            <button className="login" onClick={() => handleLoginClick("TeamLeader")}>Login</button>
          </div>
        </div>
        <div className="square-box">
          <div className="content">
            <h1>Manager</h1>
            <button className="login1" onClick={() => handleLoginClick("Manager")}>Login</button>
          </div>
        </div>
        <div className="square-box">
          <div className="content">
            <h1>Super User</h1>
            <button className="login1" onClick={() => handleLoginClick("SuperUser")}>Login</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecruiterPage;