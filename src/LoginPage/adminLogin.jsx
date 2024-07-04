import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css"; // Add this line to include AOS styles

const AdminLogin = ({ onLogin }) => {
  const [employeeId, setEmployeeId] = useState("");
  const [password, setPassword] = useState("");
  const [fetchedPassword, setFetchedPassword] = useState("");
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
      if (value) {
        handleBlur(value);
      }
    } else if (name === "password") {
      setPassword(value);
    }
  };

  const handleBlur = async (empId) => {
    try {
      const response = await fetch(
        `http://192.168.1.39:8891/api/ats/157industries/fetch-pass-on-role/${empId}`
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();

      const [employeePassword, jobRole] = data.split(",");

      setFetchedPassword(employeePassword);
      setFetchedJobRole(jobRole);

      console.log("========================");
      console.log("Fetched Data: ");
      console.log("employeeId: ", empId);
      console.log("fetchedJobRole: ", jobRole);
      console.log("fetchedPassword: ", employeePassword);
    } catch (error) {
      console.error("Error fetching data:", error);
      setError("Error fetching data. Please try again later.");
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Entered Data: ");
    console.log("password: ", password);
    console.log("jobRole: ", fetchedJobRole);

    if (fetchedJobRole !== "Admin" || password !== fetchedPassword) {
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
                <input
                  className="px-2 my-2 form-control"
                  type="text"
                  id="jobRole"
                  value="Admin"
                  readOnly
                />
                <div className="loginpage-error">{error}</div>
                <button
                  className="login-button"
                  type="submit"
                  data-aos="fade-top"
                >
                  Login
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default AdminLogin;

// import React, { useState } from 'react';

// const EmployeeDetails = () => {
//     const [empId, setEmpId] = useState('');
//     const [jobRole, setJobRole] = useState('');
//     const [employeePassword, setEmployeePassword] = useState('');
//     const [enteredJobRole, setEnteredJobRole] = useState('');
//     const [enteredPassword, setEnteredPassword] = useState('');
//     const [validationMessage, setValidationMessage] = useState('');

//     const fetchDetails = () => {
//         const apiUrl = `http://192.168.1.43:8891/api/ats/157industries/fetch-pass-on-role/12`;

//         fetch(apiUrl)
//             .then(response => response.json())
//             .then(data => {
//                 console.log(data);
//                 setJobRole(data.jobRole);
//                 setEmployeePassword(data.employeePassword);
//             })
//             .catch(error => console.error('Error fetching data:', error));
//     };

//     const validateCredentials = () => {
//         const validateUrl = `http://localhost:8891/api/ats/157industries/validate-credentials`;

//         const enteredDetails = {
//             id: empId,
//             jobRole: enteredJobRole,
//             employeePassword: enteredPassword
//         };

//         fetch(validateUrl, {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json'
//             },
//             body: JSON.stringify(enteredDetails)
//         })
//             .then(response => response.text())
//             .then(message => {
//                 console.log(message);
//                 setValidationMessage(message);
//             })
//             .catch(error => console.error('Error validating credentials:', error));
//     };

//     return (
//         <div>
//             <input
//                 type="text"
//                 placeholder="Enter Employee ID"
//                 value={empId}
//                 onChange={(e) => setEmpId(e.target.value)}
//             />
//             <button onClick={fetchDetails}>Fetch Details</button>

//             {jobRole && employeePassword && (
//                 <div>
//                     <h3>Job Role: {jobRole}</h3>
//                     <h3>Employee Password: {employeePassword}</h3>

//                     <input
//                         type="text"
//                         placeholder="Enter Job Role"
//                         value={enteredJobRole}
//                         onChange={(e) => setEnteredJobRole(e.target.value)}
//                     />
//                     <input
//                         type="password"
//                         placeholder="Enter Password"
//                         value={enteredPassword}
//                         onChange={(e) => setEnteredPassword(e.target.value)}
//                     />
//                     <button onClick={validateCredentials}>Validate Credentials</button>
//                 </div>
//             )}

//             {validationMessage && <h3>{validationMessage}</h3>}
//         </div>
//     );
// };

// export default EmployeeDetails;
