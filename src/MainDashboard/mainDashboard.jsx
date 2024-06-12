import React from "react";
import "./mainDashboard.css";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigator = useNavigate();

  const loginLink = () => {
    navigator('/employee-login');
  }

  const adminLoginLink = () =>{
    navigator('/admin-login')
  }

  return (
    <div className="tejal">
      <div className="clouds"></div>
      <div className="small-container"></div>
      <div className="small-container"></div>
      <div className="pricing-plan">

        <div className="square-box">
          <div className="content">
            <h1>Client</h1>
            <button className="login">Login</button>
          </div>
        </div>

        <div className="square-box">
          <div className="content">
            <h1>Applicant</h1>
            <button className="login">Login</button>
          </div>
        </div>

        <div className="square-box" onClick={loginLink}>
          <div className="content">
            <h1>Recruiters</h1>
            <button className="login1" >Login</button>
          </div>
        </div>

        <div className="square-box" onClick={adminLoginLink}>
          <div className="content">
            <h1>Admin</h1>
            <button className="login1" onClick={adminLoginLink}>Login</button>
          </div>
        </div>

      </div>
    </div>
  );
}

export default Home;
