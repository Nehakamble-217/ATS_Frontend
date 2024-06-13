
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AOS from "aos";

const AdminLogin = ({ onLogin }) => {
    const [employeeId, setEmployeeId] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [jobRole, setJobRole] = useState("Admin");
    const [fetchedPassword, setFetchedPassword] = useState("");
    const [fetchedConfirmPassword, setFetchedConfirmPassword] = useState("");
    const [fetchedJobRole, setFetchedJobRole] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        AOS.init({ duration: 3000 });
    }, []);

    const handleChange = (event) => {
        const { name, value } = event.target;
        if (name === "employeeId") {
            setEmployeeId(value);
        } else if (name === "password") {
            setPassword(value);
        } else if (name === "confirmPassword") {
            setConfirmPassword(value);
        }
    };

    const handleBlur = async () => {
        try {
            const response = await fetch(`http://localhost:8891/api/ats/157industries/fetch-pass-on-role/${employeeId}`);
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            const data = await response.json();
            const { password, confirmPassword, jobRole } = data;

            setFetchedPassword(password);
            setFetchedConfirmPassword(confirmPassword);
            setFetchedJobRole(jobRole);

            console.log("========================");
            console.log("Fetched Data: ");
            console.log("employeeId: ", employeeId);
            console.log("fetchedPassword: ", password);
            console.log("fetchedConfirmPassword: ", confirmPassword);
            console.log("fetchedJobRole: ", jobRole);
        } catch (error) {
            console.error("Error fetching data:", error);
            setError("Error fetching data. Please try again later.");
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log("Entered Data: ");
        console.log("password: ", password);
        console.log("confirmPassword: ", confirmPassword);
        console.log("jobRole: ", jobRole);

        if (jobRole !== fetchedJobRole || password !== fetchedPassword || confirmPassword !== fetchedConfirmPassword) {
            setError("Invalid credential details.");
            return;
        }

        navigate(`/empDash/${employeeId}`);
        onLogin();
    };

    return (
        <div>
            <div>
                <div>
                    <div>
                        <div className="right-panel" data-aos="fade-left">
                            <h2>Admin Login</h2>
                            <form onSubmit={handleSubmit}>
                                <div className="input-groups">
                                    <i className="fas fa-user"></i>
                                    <input
                                        type="text"
                                        id="loginpage-employeeId"
                                        name="employeeId"
                                        value={employeeId}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        className="loginpage-form-control"
                                        placeholder="Enter Employee ID"
                                    />
                                </div>
                                <div className="input-groups">
                                    <i className="fas fa-lock"></i>
                                    <input
                                        type="password"
                                        id="loginpage-password"
                                        name="password"
                                        value={password}
                                        onChange={handleChange}
                                        className="loginpage-form-control"
                                        placeholder="Enter Password"
                                    />
                                </div>
                                <div className="input-groups">
                                    <i className="fas fa-lock"></i>
                                    <input
                                        type="password"
                                        id="loginpage-confirmPassword"
                                        name="confirmPassword"
                                        value={confirmPassword}
                                        onChange={handleChange}
                                        className="loginpage-form-control"
                                        placeholder="Confirm Password"
                                    />
                                </div>
                                <input className="form-control my-2 px-2" type="text" id="jobRole" value="Admin" readOnly />
                                <div className="loginpage-error">{error}</div>
                                <button className="login-button" type="submit" data-aos="fade-top">Login</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminLogin;

