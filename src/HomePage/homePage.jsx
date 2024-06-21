import React from "react";
import "../HomePage/homePage.css"
 import clouds from '../LogoImages/clouds.png';
import world from "../LogoImages/world-select-new.svg";
import developerjob from "../LogoImages/developerjob.svg"
import { Link } from "react-router-dom";
const HomePage = () => {
  return (
      <div className="bigb">
      <div className="main-homepage-heading">
     <h1>Sky's The Limit</h1>
      </div>
      <div className="main-homepage-clouds"></div>

    <div className="main-homepage-main-div">

      <div className="main-homepage-Member">
            {/* <img src={world} alt="" /> */}
            <h1>I'm a Member's</h1>
            <Link to="/mainDashboard"><button className="main-homepage-btn">I want Candidate</button></Link>
      </div>

      <div className="main-homepage-candidate">
            {/* <img src={developerjob} alt="" /> */}
            <h1>Find Your Dream Job</h1>
            <Link to="/subPage"><button className="main-homepage-btn">I want Job</button></Link>
      </div>

    </div>
    </div>
  );
};
export default HomePage;

// import React from "react";
// import "../HomePage/homePage.css"
// import clouds from '../LogoImages/clouds.png';
// import { Link } from "react-router-dom";

// const HomePage = () => {
//   return (
// <>       
//       <div className="newdiv">
//         A
//       </div>
//       <div className="newdiv1">
//       Sky's The Limit
//       </div>
//       <div className="main-homepage-main-div">
      
//       <div className="main-homepage-clouds"></div>
     
//       <div className="main-homepage-Member">
//             {/* <img src={world} alt="" /> */}
//             <h1>I'm a Member's</h1>
//             <Link to="/mainDashboard"><button className="main-homepage-btn">I want Candidate</button></Link>
//             {/* <button className="main-homepage-btn">I want Candidate</button> */}
//       </div>

//       <div className="main-homepage-candidate">
//             {/* <img src={developerjob} alt="" /> */}
//             <h1>Find Your Dream Job</h1>
//             <Link to="/subPage"><button className="main-homepage-btn">I want Job</button></Link>
//             {/* <button className="main-homepage-btn">I want Job</button> */}
//       </div>

//     </div>
//     {/* </div> */}
//     </>
//   );
// }

// export default HomePage;
