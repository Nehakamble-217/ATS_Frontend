import React from "react";
import "./mainDashboard.css";
import ClientImg from "../LogoImages/client.png"
import { useNavigate } from "react-router-dom";
import {
  BsCart3,
  BsGrid1X2Fill,
  BsFillArchiveFill,
  BsFillGrid3X3GapFill,
  BsPeopleFill,
  BsListCheck,
  BsMenuButtonWideFill,
  BsFillGearFill,
} from "react-icons/bs";
import { Link } from "react-router-dom";



const Home = () => {
  const navigator = useNavigate();

  const loginLink = () =>{
    navigator('/employee-login')
  }

 
  return (
    <main className="mainDadhboard-container">
      <div className="mainDashboard-title">
        <h1>Application Tracking System</h1>
      </div>

      <div className="mainDashboard-cards">
        
        <div className="mainDashboard-subcard">
          <div className="mainDashboard-first-card">
            <div className="mainDashboard-card-inner">
              <h2>I'm A Client :</h2>
              {/* <img src={ClientImg} alt="" /> */}
              <BsListCheck className="mainDashboard-card_icon" />
              <Link to="/">
                <button className="mainDashboard-card-btn">LogIn</button>
              </Link>
              
            </div>
            
          </div>
          
        </div>

        <div className="mainDashboard-subcard">
          <div className="mainDashboard-second-card">
            <div className="mainDashboard-card-inner">
              <h2>I'm A Admin :</h2>

              <BsListCheck className="mainDashboard-card_icon" />
              <Link to="/">
                <button className="mainDashboard-card-btn">LogIn</button>
              </Link>
            </div>
          </div>
        </div>

        <div className="mainDashboard-subcard">
          <div className="mainDashboard-third-card">
            <div className="mainDashboard-card-inner">
              <h2>I'm A Team Leader :</h2>

              <BsListCheck className="mainDashboard-card_icon" />
              <Link to="/">
                <button className="mainDashboard-card-btn">LogIn</button>
              </Link>
            </div>
          </div>
        </div>

        <div className="mainDashboard-subcard">
          <div className="mainDashboard-fourth-card">
            <div className="mainDashboard-card-inner">
              <h2>I'm A Employee :</h2>

              <BsListCheck className="mainDashboard-card_icon" />
              {/* <Link to="/mainDashboard/login"> */}
                <button className="mainDashboard-card-btn" onClick={loginLink}>LogIn</button>
              {/* </Link> */}
              
            
            </div>
          </div>
        </div>

        {/* <div className="mainDashboard-subcard">
          <div className="mainDashboard-fifth-card">
            <div className="mainDashboard-card-inner">
              <h2>Job :</h2>

              <BsListCheck className="mainDashboard-card_icon" />
              <Link to="/">
                <button className="mainDashboard-card-btn">LogIn</button>
              </Link>
            </div>
          </div>
        </div> */}
      </div>
    </main>
  );
}

export default Home;
