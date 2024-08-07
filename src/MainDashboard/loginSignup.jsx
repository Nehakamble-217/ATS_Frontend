//login Page ise used to user  wise
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import "./LoginPage.css";
import LoginImage from "../LogoImages/LoginImge.jpg";
import ForgotPasswordForms from "./empForgotPasswords";

const LoginSignup = ({ onLogin }) => {
  const { userType } = useParams();
  const [employeeId, setEmployeeId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [login, setLogin] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    AOS.init({ duration: 3000 });
  }, []);

  useEffect(() => {
    if (employeeId && userType) {
      fetch(
        `http://192.168.1.50:9090/api/ats/157industries/fetch-pass-on-role/${employeeId}/${userType}`
      )
        .then((response) => response.text())
        .then((data) => {
          setLogin(data);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    }
  }, [employeeId, userType]);

  
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
      if (login === password) {
        localStorage.setItem("employeeId", employeeId);
        navigate(`/empDash/${employeeId}/${userType}`);
        onLogin();
      } else {
        setError("Invalid login for this user. Please try again.");
      }
    } catch (error) {
      console.error("Error fetching password:", error);
      setError("Error occurred. Please try again.");
    }
  };

  const dashboardLink = () => {
    navigate("/empDash/870/Manager");
  };

  return (
    <div className="main-body">
      <div className="main-login-container">
        <div className="main-loginpage-clouds"></div>
        <div
          className={`container22 ${showForgotPassword ? "full-width" : ""}`}
        >
          {!showForgotPassword && (
            <div className="left-panel" data-aos="fade-right">
              <img src={LoginImage} alt="Logo" className="logo" />
            </div>
          )}
          <div
            className={`${
              showForgotPassword ? "full-width-panel" : "right-panel"
            }`}
            data-aos="fade-left"
          >
            {showForgotPassword ? (
              <ForgotPasswordForms userType={userType} />
            ) : (
              <form onSubmit={handleSubmit}>
                <h2>{userType.charAt(0).toUpperCase() + userType.slice(1)}</h2>
                <div className="input-groups">
                  <i className="fas fa-user"></i>
                  <input
                    type="text"
                    id="loginpage-employeeId"
                    name="employeeId"
                    placeholder="Username"
                    value={employeeId}
                    onChange={handleChange}
                    className="loginpage-form-control"
                  />
                </div>
                <div className="input-groups" hidden>
                  <i className="fas fa-briefcase"></i>
                  <input
                    type="text"
                    id="loginpage-userType"
                    name="userType"
                    placeholder="User Type"
                    value={userType}
                    onChange={handleChange}
                    className="loginpage-form-control"
                  />
                </div>
                <div className="input-groups">
                  <i className="fas fa-lock"></i>
                  <input
                    type="password"
                    id="loginpage-password"
                    name="password"
                    placeholder="Password"
                    value={password}
                    onChange={handleChange}
                    className="loginpage-form-control"
                  />
                </div>
                <div className="loginpage-error">{error}</div>
                <button
                  className="login-button"
                  type="submit"
                  data-aos="fade-top"
                >
                  Login 
                </button>
                <button
                  type="button"
                  className="dashboard-button"
                  onClick={dashboardLink}
                  data-aos="fade-top"
                >
                  Dashboard 
                </button>
                <center>
                  <span
                    className="psw"
                    onClick={() => setShowForgotPassword(true)}
                  >
                    Forgot password?
                  </span>
                </center>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginSignup;
