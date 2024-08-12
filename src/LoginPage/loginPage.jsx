//This is Vendor , Clinet And Applicaint loging page 
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import "./loginPage.css";
import LoginImage from "../LogoImages/LoginImge.jpg";
import { getPasswordFromDB } from "../api/api";
import ForgotPasswordForm from "./ForgotPasswordForm"; // Import the ForgotPasswordForm component
import JobList from "../EmployeeDashboard/JobList";

const LoginSignup = ({ onLogin }) => {
  const { userType } = useParams(); // Get the userType from the URL
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
    // Retrieve the saved color from local storage and apply it
    const savedColor = localStorage.getItem("selectedColor");
    if (savedColor) {
      applyColor(savedColor);
    }
  }, []);
  const applyColor = (color) => {
    const darkenColor = (color, amount) => {
      let colorInt = parseInt(color.slice(1), 16);
      let r = (colorInt >> 16) + amount;
      let g = ((colorInt >> 8) & 0x00ff) + amount;
      let b = (colorInt & 0x0000ff) + amount;

      r = Math.max(Math.min(255, r), 0);
      g = Math.max(Math.min(255, g), 0);
      b = Math.max(Math.min(255, b), 0);

      return `#${((r << 16) | (g << 8) | b).toString(16).padStart(6, "0")}`;
    };

    const hoverColor = darkenColor(color, -30);

    document.documentElement.style.setProperty("--Bg-color", color);
    document.documentElement.style.setProperty("--button-color", color);
    document.documentElement.style.setProperty("--button-hover-color", hoverColor);
    document.documentElement.style.setProperty("--hover-effect", hoverColor);
    document.documentElement.style.setProperty("--filter-color", color);
  };

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
    navigate("/empDash/1/Vendor");
  };

  console.log(userType);
  const createAccount = () => {
    navigate("/createAccount/Vendor");
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
            className={` ${
              showForgotPassword ? "full-width-panel" : "right-panel"
            }`}
            data-aos="fade-left"
          >
            {showForgotPassword ? (
              <ForgotPasswordForm userType={userType} />
            ) : (
              <form onSubmit={handleSubmit}>
                <h2>{userType.charAt(0).toUpperCase() + userType.slice(1)}</h2>{" "}
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
                  className="login-button"
                  onClick={createAccount}
                  data-aos="fade-top"
                >
                  Create account
                </button>
                {userType === "vendor" && (
                  <button
                    type="button"
                    className="dashboard-button"
                    onClick={dashboardLink}
                    data-aos="fade-top"
                  >
                    Vendor
                  </button>
                )}
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
