// import React from "react";
// import "./mainDashboard.css";
// import clouds from '../LogoImages/clouds.png';
// import { useNavigate } from "react-router-dom";

// const Home = () => {
//   const navigator = useNavigate();

//   const loginLink = () => {
//     navigator('/employee-login');
//   }

//   const adminLoginLink = () =>{
//     navigator('/admin-login')
//   }

//   return (
//     <div className="mainDashboard-div">
//       <div className="main-clouds"></div>
//       {/* <div className="small-container"></div> */}
//       {/* <div className="small-container"></div> */}
//       <div className="pricing-plan">

//         <div className="square-box">
//           <div className="content">
//             <h1>Client</h1>
//             <button className="login">Login</button>
//           </div>
//         </div>

//         <div className="square-box">
//           <div className="content">
//             <h1>Applicant</h1>
//             <button className="login">Login</button>
//           </div>
//         </div>

//         <div className="square-box" >
//           <div className="content">
//             <h1>Recruiters</h1>
//             <button className="login1" onClick={loginLink}>Login</button>
//           </div>
//         </div>

//         <div className="square-box" >
//           <div className="content">
//             <h1>Admin</h1>
//             <button className="login1" onClick={adminLoginLink}>Login</button>
//           </div>
//         </div>

//       </div>
//     </div>
//   );
// }

// export default Home;


import React from "react";
import "./mainDashboard.css";
import clouds from '../LogoImages/clouds.png';
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  const handleLogin = (userType) => {
    navigate(`/employee-login/${userType}`);
  };

  return (
    <div className="mainDashboard-div">
      <div className="main-clouds"></div>
      <div className="pricing-plan">
        {[
          { title: "Client", userType: "client", buttonClass: "login" },
          { title: "Applicant", userType: "applicant", buttonClass: "login" },
          { title: "Recruiter", userType: "recruiter", buttonClass: "login1" },
          { title: "Admin", userType: "admin", buttonClass: "login1" },
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

