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
         <div style={{position:"absolute",backgroundColor:"#ffcb9b",width:"100%",height:"100vh"}}>
     
      <div style={{zIndex:"9999999999999999999"}}>
           <h1 style={{fontFamily:"sans-serif",fontWeight:"700",fontSize:"50px",textAlignLast:"center",marginTop:"150px"}}><span style={{fontFamily:"inherit",fontWeight:"600",fontSize:"25px", color:"#c40b0b"}}>Sky's the limit,</span><span style={{fontFamily:"inherit",fontWeight:"600",fontSize:"25px",lineHeight:"10px", color:"#c40b0b"}}> If you have</span></h1>
     <div style={{width:"50%",margin:auto}}>
       <h1 style={{fontFamily:"inherit",fontWeight:"600",fontSize:"70px",textAlign:"center", color:"#c40b0b",zIndex:"999999"}}> Recruiter's Gear </h1>
              <Link  to="/mainDashboard">
              <button style={{display:"flex",alignItems:"center",
                justifyContent:"center",marginLeft:"300px"}} className="main-homepage-btn">Let's Begin <i style={{paddingLeft:"10px"}} className="fa-solid fa-arrow-right"></i> </button></Link>
    </div>
    </div>
      </div>
    </div>
  );
};
export default HomePage;
