// import React from "react";
// import "./mainDashboard.css";
// import ClientImg from "../LogoImages/client.png"
// import { useNavigate } from "react-router-dom";
// import {
//   BsCart3,
//   BsGrid1X2Fill,
//   BsFillArchiveFill,
//   BsFillGrid3X3GapFill,
//   BsPeopleFill,
//   BsListCheck,
//   BsMenuButtonWideFill,
//   BsFillGearFill,
// } from "react-icons/bs";
// import { Link } from "react-router-dom";



// const Home = () => {
//   const navigator = useNavigate();

//   const loginLink = () =>{
//     navigator('/employee-login')
//   }

 
//   return (
//     <main className="mainDadhboard-container">
//       <div className="mainDashboard-title">
//         <h1>Application Tracking System</h1>
//       </div>

//       <div className="mainDashboard-cards">
        
//         <div className="mainDashboard-subcard">
//           <div className="mainDashboard-first-card">
//             <div className="mainDashboard-card-inner">
//               <h2>I'm A Client :</h2>
//               {/* <img src={ClientImg} alt="" /> */}
//               <BsListCheck className="mainDashboard-card_icon" />
//               <Link to="/">
//                 <button className="mainDashboard-card-btn">LogIn</button>
//               </Link>
              
//             </div>
            
//           </div>
          
//         </div>

//         <div className="mainDashboard-subcard">
//           <div className="mainDashboard-second-card">
//             <div className="mainDashboard-card-inner">
//               <h2>I'm A Admin :</h2>

//               <BsListCheck className="mainDashboard-card_icon" />
//               <Link to="/">
//                 <button className="mainDashboard-card-btn">LogIn</button>
//               </Link>
//             </div>
//           </div>
//         </div>

//         <div className="mainDashboard-subcard">
//           <div className="mainDashboard-third-card">
//             <div className="mainDashboard-card-inner">
//               <h2>I'm A Team Leader :</h2>

//               <BsListCheck className="mainDashboard-card_icon" />
//               <Link to="/">
//                 <button className="mainDashboard-card-btn">LogIn</button>
//               </Link>
//             </div>
//           </div>
//         </div>

//         <div className="mainDashboard-subcard">
//           <div className="mainDashboard-fourth-card">
//             <div className="mainDashboard-card-inner">
//               <h2>I'm A Employee :</h2>

//               <BsListCheck className="mainDashboard-card_icon" />
//               {/* <Link to="/mainDashboard/login"> */}
//                 <button className="mainDashboard-card-btn" onClick={loginLink}>LogIn</button>
//               {/* </Link> */}
              
            
//             </div>
//           </div>
//         </div>

//         {/* <div className="mainDashboard-subcard">
//           <div className="mainDashboard-fifth-card">
//             <div className="mainDashboard-card-inner">
//               <h2>Job :</h2>

//               <BsListCheck className="mainDashboard-card_icon" />
//               <Link to="/">
//                 <button className="mainDashboard-card-btn">LogIn</button>
//               </Link>
//             </div>
//           </div>
//         </div> */}
//       </div>
//     </main>
//   );
// }

// export default Home;

import React from 'react';
import "./mainDashboard.css";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const Home = () => {
    const navigator = useNavigate();

    const loginLink = () => {
        navigator('/employee-login')
    }

    return (
        <>
            <div className="bg-container">
                {/* Rows of hexagons for the background effect */}
                <div className="row">
                    <div className="hexagon"></div>
                    <div className="hexagon"></div>
                    <div className="hexagon"></div>
                    <div className="hexagon"></div>
                    <div className="hexagon"></div>
                    <div className="hexagon"></div>
                    <div className="hexagon"></div>
                    <div className="hexagon"></div>
                    <div className="hexagon"></div>
                    <div className="hexagon"></div>
                    <div className="hexagon"></div>
                    <div className="hexagon"></div>
                    <div className="hexagon"></div>
                    <div className="hexagon"></div>
                    <div className="hexagon"></div>
                    <div className="hexagon"></div>
                </div>
                {/* More rows as needed */}
                {/* Repeat the above div.row for more rows */}
            </div>

            <button className="app-tracking-btn"><b>Application Tracking System</b></button>
            <h4 style={{ marginLeft: "26%", color: "grey" }}>Unlock your career journey by logging in to our innovative Application Tracking System!</h4>
            <div className="pricing-plan-container">
                <div className="role-card admin">
                    <div className="role-card-inner">
                        <div className="role-card-front">
                            <img src="client (1).png" alt="Icon Description" height="80px" width="80px" style={{ position: "relative", top: "5px" }} />
                            <h1 style={{ color: "grey", fontSize: "18pt", marginTop: "10%" }}>Client</h1>
                        </div>
                        <div className="role-card-back">
                            <h1>Client</h1>
                            <p>Looking For Job opportunities Find here..</p>
                            <a href="#admin-login-message" className="login-btn">Login Here</a>
                        </div>
                    </div>
                </div>
                <div className="role-card candidate">
                    <div className="role-card-inner">
                        <div className="role-card-front">
                            <img src="candidate.png" alt="Icon Description" height="80px" width="80px" style={{ position: "relative", top: "5px" }} />
                            <h1 style={{ fontSize: "18pt", marginTop: "10%" }}>Applicant</h1>
                        </div>
                        <div className="role-card-back">
                            <h1>Applicant</h1>
                            <p>Looking For Job opportunities Find here..</p>
                            <a href="#candidate-login-message" className="login-btn">Login Here</a>
                        </div>
                    </div>
                </div>
                <div className="role-card employee">
                    <div className="role-card-inner">
                        <div className="role-card-front">
                            <img src="employee.png" alt="Icon Description" height="80px" width="80px" style={{ position: "relative", top: "5px" }} />
                            <h1 style={{ fontSize: "18pt", marginTop: "10%" }}>Employee</h1>
                        </div>
                        <div className="role-card-back">
                            <h1>Employee</h1>
                            <p>Looking For Job opportunities Find here..</p>
                            <a href="#employee-login-message" className="login-btn" onClick={loginLink}>Login Here</a>
                        </div>
                    </div>
                </div>
                <div className="role-card manager">
                    <div className="role-card-inner">
                        <div className="role-card-front">
                            <img src="manager.png" alt="Icon Description" height="80px" width="80px" style={{ position: "relative", top: "5px" }} />
                            <h1 style={{ fontSize: "18pt", marginTop: "10%" }}>Manager</h1>
                        </div>
                        <div className="role-card-back">
                            <h1>Manager</h1>
                            <p>Looking For Job opportunities Find here..</p>
                            <a href="#manager-login-message" className="login-btn">Login Here</a>
                        </div>
                    </div>
                </div>
            </div>

            {/* Login Messages */}
            <div id="admin-login-message" className="login-message">Admin login successful!</div>
            <div id="candidate-login-message" className="login-message">Candidate login successful!</div>
            <div id="employee-login-message" className="login-message">Employee login successful!</div>
            <div id="manager-login-message" className="login-message">Manager login successful!</div>
        </>
    )
}

export default Home
