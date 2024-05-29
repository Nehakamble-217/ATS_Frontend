import React from "react";
import "../HomePage/homePage.css"
import world from "../LogoImages/world-select-new.svg";
import developerjob from "../LogoImages/developerjob.svg"
import { Link } from "react-router-dom";


const HomePage = () => {
  return (
      <>
      <div className="main-homepage-heading">
     <h1>Pick a Side</h1>
      </div>
    <div className="main-homepage-main-div">
     
      <div className="main-homepage-Member">
            <img src={world} alt="" />
            <h1>I'm a Member's</h1>
            <Link to="/mainDashboard"><button className="main-homepage-btn">I want Candidate</button></Link>
      </div>
      <div className="main-homepage-candidate">
            <img src={developerjob} alt="" />
            <h1>Find Your Dream Job</h1>
            <Link to="/subPage"><button className="main-homepage-btn">I want Job</button></Link>
      </div>
    </div>
    </>
  );
};
export default HomePage;