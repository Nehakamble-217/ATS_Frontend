import React from "react";
import "../HomePage/homePage.css"
import clouds from '../LogoImages/clouds.png';
import world from "../LogoImages/world-select-new.svg";
import developerjob from "../LogoImages/developerjob.svg"
import { Link } from "react-router-dom";
import { auto } from "@popperjs/core";
const HomePage = () => {
  return (
    <div className="bigb">
      <div className="main-homepage-clouds"><video src="../"></video></div>
      <div style={{ position: "absolute", backgroundColor: "#ffcb9b", width: "100%", height: "100vh" }}>
        <div className="landing-content" >
          <h1 style={{ fontFamily: "sans-serif", fontWeight: "700", fontSize: "50px", marginTop: "140px", marginRight: "20px" }}>
            <span style={{ fontFamily: "inherit", fontWeight: "600", fontSize: "25px", color: "#c40b0b" }}>Sky's the limit, If you have</span>
          </h1>
          <div style={{ width: "50%", margin: "auto" }}>
            <h1 style={{ fontFamily: "inherit", fontWeight: "600", fontSize: "70px", textAlign: "center", color: "#c40b0b", zIndex: "1" }}> Recruiter's Gear </h1>
            <Link to="/mainDashboard">
              <div className="landingbtn" style={{ display: "flex", width: "100%", justifyContent: "center", paddingLeft: "5px", paddingRight: "80px", paddingTop: "20px" }}>
                <button className="main-homepage-btn">Let's begin</button>
              </div></Link>
          </div>
        </div>
      </div>
    </div>
  );
};
export default HomePage;


//neha_homepage_content_23/07_line_no_1_to_29
