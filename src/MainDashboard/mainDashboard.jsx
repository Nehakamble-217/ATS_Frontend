
import React, { useEffect } from "react";
import "./mainDashboard.css";
import clouds from '../LogoImages/clouds.png';
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  const handleLogin = (userType) => {
    if (userType === "employee") {
      navigate("/employee-login");
    } else {
      navigate(`/employee-login/${userType}`);
    }
  };
  return (
    <div className="mainDashboard-div">
      <div className="main-clouds"></div>
      <div className="pricing-plan">
        {[
          { title: "Client", userType: "client", buttonClass: "login" },
          { title: "Applicant", userType: "applicant", buttonClass: "login" },
          { title: "Employee", userType: "employee", buttonClass: "login1" },
          { title: "Vendor", userType: "vendor", buttonClass: "login1" },
        ].map((section) => (
          <div key={section.title} className="square-box">
            <div className="content">
              <h1>{section.title}</h1>
              <button
                className={section.buttonClass}
                onClick={() => handleLogin(section.userType)}
              >
                Login
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
