import React from "react";
import { useNavigate } from "react-router-dom";
import "./recruiterPage.css";

const RecruiterPage = () => {
  const navigate = useNavigate();

  const handleLoginClick = (userType) => {
    navigate(`/login/${userType}`);
  };

  return (
    <div className="recpage-mainDashboard-div">
      <div className="recpage-main-clouds"></div>
      <div className="recpage-pricing-plan">
        <div className="recpage-square-box">
          <div className="recpage-content">
            <h1 style={{color:"#c40b0b"}}>Recruiter</h1>
            <button
              className="recpage-login"
              onClick={() => handleLoginClick("Recruiters")}
            >
              Login
            </button>
          </div>
        </div>
        <div className="recpage-square-box">
          <div className="recpage-content">
            <h1 style={{color:"#c40b0b"}}>Team Leader</h1>
            <button
              className="recpage-login"
              onClick={() => handleLoginClick("TeamLeader")}
            >
              Login
            </button>
          </div>
        </div>
        <div className="recpage-square-box">
          <div className="recpage-content">
            <h1 style={{color:"#c40b0b"}}>Manager</h1>
            <button
              className="recpage-login1"
              onClick={() => handleLoginClick("Manager")}
            >
              Login
            </button>
          </div>
        </div>
        <div className="recpage-square-box">
          <div className="recpage-content">
            <h1 style={{color:"#c40b0b"}}>Super User</h1>
            <button
              className="recpage-login1"
              onClick={() => handleLoginClick("SuperUser")}
            >
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecruiterPage;
