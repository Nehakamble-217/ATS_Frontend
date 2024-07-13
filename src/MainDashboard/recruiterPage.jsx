import React from "react";
import { useNavigate } from "react-router-dom";
import "./recruiterPage.css";

const RecruiterPage = () => {
  const navigate = useNavigate();

  const handleLoginClick = (userType) => {
    navigate(`/login/${userType}`);
  };

  return (
    <div className="recpage-mainDashboard-div">
      <div className="recpage-main-clouds"></div>
      <div className="recpage-pricing-plan">
        <div className="recpage-square-box">

          <div className="recpage-content">
            <h1>Recruiter</h1>
            <button className="recpage-login" onClick={() => handleLoginClick("Recruiters")}>Login</button>
          </div>
          
        </div>
        <div className="recpage-square-box">
          <div className="recpage-content">
            <h1>Team Leader</h1>
            <button className="recpage-login" onClick={() => handleLoginClick("TeamLeader")}>Login</button>
          </div>
        </div>
        <div className="recpage-square-box">
          <div className="recpage-content">
            <h1>Manager</h1>
            <button className="recpage-login1" onClick={() => handleLoginClick("Manager")}>Login</button>
          </div>
        </div>
        <div className="recpage-square-box">
          <div className="recpage-content">
            <h1>Super User</h1>
            <button className="recpage-login1" onClick={() => handleLoginClick("SuperUser")}>Login</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecruiterPage;



// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import "./recruiterPage.css";

// const RecruiterPage = () => {
//   const navigate = useNavigate();

//   const handleLoginClick = (userType) => {
//     navigate(`/login/${userType}`);
//   };

//   const cards = [
//     { title: "Recruiter", userType: "Recruiters", className: "recpage-login" },
//     { title: "Team Leader", userType: "TeamLeader", className: "recpage-login" },
//     { title: "Manager", userType: "Manager", className: "recpage-login1" },
//     { title: "Super User", userType: "SuperUser", className: "recpage-login1" },
//   ];

//   const shuffleArray = (array) => {
//     for (let i = array.length - 1; i > 0; i--) {
//       const j = Math.floor(Math.random() * (i + 1));
//       [array[i], array[j]] = [array[j], array[i]];
//     }
//     return array;
//   };

//   const [shuffledCards, setShuffledCards] = useState(shuffleArray(cards));

//   useEffect(() => {
//     setShuffledCards(shuffleArray([...cards]));
//   }, []);

//   return (
//     <div className="recpage-mainDashboard-div">
//       <div className="recpage-main-clouds"></div>
//       <div className="recpage-pricing-plan">
//         {shuffledCards.map((card, index) => (
//           <div key={index} className="recpage-square-box">
//             <div className="recpage-content">
//               <h1>{card.title}</h1>
//               <button
//                 className={card.className}
//                 onClick={() => handleLoginClick(card.userType)}
//               >
//                 Login
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default RecruiterPage;
