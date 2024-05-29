import React, { useState } from "react";
import "./loginPage.css";
import user_icon from "../LogoImages/user-icon4.png";
import password_icon from "../LogoImages/password-icon2.png";
import logo157 from "../LogoImages/157logo.jpeg";
import { getPasswordFromDB } from "../api/api";
import { useNavigate } from "react-router-dom";

const LoginSignup = ({ onLogin }) => {
  const [action, setAction] = useState("Login");
  const [employeeId, setEmployeeId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate(); // Use navigate instead of navigator

  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === "employeeId") {
      setEmployeeId(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await getPasswordFromDB(employeeId);
      const fetchedPassword = response.data;
      console.log(fetchedPassword + " emp password");

      if (fetchedPassword === password) {
        localStorage.setItem("employeeId", employeeId);
        navigate(`/empDash/${employeeId}`);
        onLogin();
      } else {
        setError("Invalid credentials. Please try again.");
      }
    } catch (error) {
      console.error("Error fetching password:", error);
      setError("Error occurred. Please try again.");
    }
  };

  const dashboardLink = () => {
    navigate('/empDash/6');
  };

  return (
    <div className="loginpage-container">
      <div className="loginpage-img-container">
        <img src={logo157} alt="" height="450px" width="450px" />
      </div>

      <div>
        <form onSubmit={handleSubmit}>
          <div className="loginpage-header">
            <div className="loginpage-text">{action}</div>
            <div className="loginpage-underline"></div>
          </div>
          <div className="loginpage-inputs">
            <div className="loginpage-input">
              <img src={user_icon} alt="" height="40px" />
              <input
                type="text"
                id="loginpage-employeeId"
                name="employeeId"
                value={employeeId}
                onChange={handleChange}
                className="loginpage-form-control"
              />
            </div>
            <div className="loginpage-input">
              <img src={password_icon} alt="" height="40px" />
              <input
                type="password"
                id="loginpage-password"
                name="password"
                value={password}
                onChange={handleChange}
                className="loginpage-form-control"
              />
            </div>
          </div>
          <div className="loginpage-error">{error}</div>
          
          <div>
            <button className="login-page-btn" type="submit">LOGIN</button>
            <button className="login-page-btn" type="button" onClick={dashboardLink}>Dashboard</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginSignup;
