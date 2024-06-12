import React, { useState, useEffect } from "react";
import "./loginPage.css";
import user_icon from "../LogoImages/user-icon4.png";
import password_icon from "../LogoImages/password-icon2.png";
import logo157 from "../LogoImages/157logo.jpeg";
import { getPasswordFromDB } from "../api/api";
import { useNavigate } from "react-router-dom";
import AOS from "aos";
import EmpDashboard from "../EmployeeDashboard/empDashboard";
import "aos/dist/aos.css"
import LoginImage from "../LogoImages/LoginImge.jpg";

const LoginSignup = ({ onLogin }) => {

    const [action, setAction] = useState("Login");
    const [employeeId, setEmployeeId] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();
    useEffect(() => {
        AOS.init({ duration: 3000 })
    }, [])


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
        <div className="main-body" >
            <div className="hexagon-container ">
                <div className="main-login-container">
                    <div className="container22">
                        <div className="left-panel" data-aos="fade-right">
                            <img src={LoginImage} alt="Logo" className="logo" />
                        </div>
                        <div className="right-panel" data-aos="fade-left">
                            <h2 >Login</h2>
                            <form onSubmit={handleSubmit}>
                                <div className="input-groups" >
                                    <i className="fas fa-user"></i>
                                    <input
                                        type="text"
                                        id="loginpage-employeeId"
                                        name="employeeId"
                                        value={employeeId}
                                        onChange={handleChange}
                                        className="loginpage-form-control"
                                    />
                                </div>
                                <div className="input-groups"  >
                                    <i className="fas fa-lock"></i>
                                    <input
                                        type="password"
                                        id="loginpage-password"
                                        name="password"
                                        value={password}
                                        onChange={handleChange}
                                        className="loginpage-form-control"
                                    />
                                </div>
                                <div className="loginpage-error">{error}</div>
                                <button className="login-button" type="submit" data-aos="fade-top">Login</button>
                                <button type="button" className="dashboard-button" onClick={dashboardLink} data-aos="fade-top">Dashboard</button>
                            </form>
                        </div>
                    </div>
                </div>

                <div class="rows">
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>


                </div>
                <div class="rows">
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                </div>
                <div class="rows">

                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                </div>
                <div class="rows">

                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                </div>
                <div class="rows">

                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                </div>
                <div class="rows">

                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                </div>
                <div class="rows">

                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                </div>

                <div class="rows">

                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                </div>
                <div class="rows">

                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                </div>

                <div class="rows">

                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                </div>

                <div class="rows">

                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                </div>

                <div class="rows">
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>

                </div>
                <div class="rows">
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                </div>
                <div class="rows">

                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                </div>
                <div class="rows">

                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                </div>
                <div class="rows">

                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                </div>
                <div class="rows">

                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                </div>
                <div class="rows">

                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                </div>

                <div class="rows">

                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                    <div class="hexagon"></div>
                </div>
            </div> 
    </div>

  );

};

export default LoginSignup;
