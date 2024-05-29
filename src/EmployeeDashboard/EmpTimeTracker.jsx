// import React, { useState, useEffect, useRef } from 'react';
// import './EmpTimeTracker.css'; // CSS file for styling
// import LoginPage from '../LoginPage/loginPage';

// const EmpTimeTracker = () => {
//   const [loggedIn, setLoggedIn] = useState(false);
//   const [onBreak, setOnBreak] = useState(false);
//   const [time, setTime] = useState(0);

//   const intervalRef = useRef();

//   useEffect(() => {
//     if (loggedIn && !onBreak) {
//       startTimer();
//     } else {
//       clearInterval(intervalRef.current);
//     }
//     return () => clearInterval(intervalRef.current);
//   }, [loggedIn, onBreak]);

//   const handleLogin = () => {
//     setLoggedIn(true);
//     setTime(0);
//   };

//   const handleLogout = () => {
//     setLoggedIn(false);
//     setOnBreak(false);
//     setTime(0);
//   };

//   const handleBreak = () => {
//     setOnBreak(!onBreak);
//     if (onBreak) {
//       startTimer(); // Resume timer if ending break
//     } else {
//       clearInterval(intervalRef.current); // Pause timer if starting break
//     }
//   };

//   const startTimer = () => {
//     clearInterval(intervalRef.current);
//     const intervalId = setInterval(() => {
//       setTime(prevTime => prevTime + 1);
//     }, 1000);
//     intervalRef.current = intervalId;
//   };

//   const formatTime = (seconds) => {
//     const hours = Math.floor(seconds / 3600);
//     const minutes = Math.floor((seconds % 3600) / 60);
//     const remainingSeconds = seconds % 60;

//     return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
//   };

//   return (
//     <div className="employee-card">
//       <div className="card-content">
  
//           <>
//             <span className="timer">{formatTime(time)}</span>
//             <span className="status-btns">
//               <button className={`break-btn ${onBreak ? 'on-break' : ''}`} onClick={handleBreak}>
//                 {onBreak ? 'End Break' : 'Take Break'}
//               </button>
//               <button className="logout-btn" onClick={handleLogout}>Logout</button>
//             </span>
//           </>
 
//       </div>
//     </div>
//   );
// };

// export default EmpTimeTracker;

// import React, { useState, useEffect, useRef } from 'react';
// import './EmpTimeTracker.css'; // CSS file for styling
// import LoginPage from '../LoginPage/loginPage';

// const EmpTimeTracker = () => {
//   const [loggedIn, setLoggedIn] = useState(true); // Initially set to true to start the timer directly
//   const [onBreak, setOnBreak] = useState(false);
//   const [time, setTime] = useState(0);

//   const intervalRef = useRef();

//   useEffect(() => {
//     startTimer(); // Start timer directly when the component mounts
//     return () => clearInterval(intervalRef.current);
//   }, []);

//   const handleLogin = () => {
//     setLoggedIn(true);
//     setTime(0);
//   };

//   const handleLogout = () => {
//     setLoggedIn(false);
//     setOnBreak(false);
//     setTime(0);
//   };

//   const handleBreak = () => {
//     setOnBreak(!onBreak);
//     if (onBreak) {
//       startTimer(); // Resume timer if ending break
//     } else {
//       clearInterval(intervalRef.current); // Pause timer if starting break
//     }
//   };

//   const startTimer = () => {
//     clearInterval(intervalRef.current);
//     const intervalId = setInterval(() => {
//       setTime(prevTime => prevTime + 1);
//     }, 1000);
//     intervalRef.current = intervalId;
//   };

//   const formatTime = (seconds) => {
//     const hours = Math.floor(seconds / 3600);
//     const minutes = Math.floor((seconds % 3600) / 60);
//     const remainingSeconds = seconds % 60;

//     return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
//   };

//   return (
//     <div className="employee-card">
//       <div className="card-content">
//           <span className="timer">{formatTime(time)}</span>
//           <span className="status-btns">
//             <button className={`break-btn ${onBreak ? 'on-break' : ''}`} onClick={handleBreak}>
//               {onBreak ? 'End Break' : 'Take Break'}
//             </button>
//             {/* <button className="logout-btn" onClick={handleLogout}>Logout</button> */}
//           </span>
//       </div>
//     </div>
//   );
// };

// export default EmpTimeTracker;



// ##################################                             ######################################

// import React, { useState, useEffect, useRef } from 'react';
// import './EmpTimeTracker.css'; // CSS file for styling
// import LoginPage from '../LoginPage/loginPage';

// const EmpTimeTracker = () => {
//   const [loggedIn, setLoggedIn] = useState(true); // Initially set to true to start the timer directly
//   const [onBreak, setOnBreak] = useState(false);
//   const [time, setTime] = useState(() => {
//     const storedTime = localStorage.getItem('time');
//     return storedTime ? parseInt(storedTime, 10) : 0;
//   });

//   const intervalRef = useRef();

//   useEffect(() => {
//     startTimer(); // Start timer directly when the component mounts

//     // Save time to localStorage when component unmounts
//     return () => {
//       clearInterval(intervalRef.current);
//       localStorage.setItem('time', time.toString());
//     };
//   }, []);

//   const handleLogin = () => {
//     setLoggedIn(true);
//     setTime(0);
//   };

//   const handleLogout = () => {
//     setLoggedIn(false);
//     setOnBreak(false);
//     setTime(0);
//   };

//   const handleBreak = () => {
//     setOnBreak(!onBreak);
//     if (onBreak) {
//       startTimer(); // Resume timer if ending break
//     } else {
//       clearInterval(intervalRef.current); // Pause timer if starting break
//     }
//   };

//   const startTimer = () => {
//     clearInterval(intervalRef.current);
//     const intervalId = setInterval(() => {
//       setTime(prevTime => prevTime + 1);
//     }, 1000);
//     intervalRef.current = intervalId;
//   };

//   const formatTime = (seconds) => {
//     const hours = Math.floor(seconds / 3600);
//     const minutes = Math.floor((seconds % 3600) / 60);
//     const remainingSeconds = seconds % 60;

//     return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
//   };

//   return (
//     <div className="employee-card">
//       <div className="card-content d-flex">
//           <span className="timer">{formatTime(time)}</span>
//           <span className="status-btns">
//             <button className={`timer-break-btn ${onBreak ? 'on-break' : ''}`} onClick={handleBreak}>
//               {onBreak ? 'End Break' : 'Start Break'}
//             </button>
//             {/* <button className="logout-btn" onClick={handleLogout}>Logout</button> */}
//           </span>
//       </div>
//     </div>
//   );
// };

// export default EmpTimeTracker;


// #################################                                      ############################################





// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// const Stopwatch = () => {
//   const getStoredTime = () => {
//     const storedTime = localStorage.getItem("stopwatchTime");
//     return storedTime
//       ? JSON.parse(storedTime)
//       : { hours: 0, minutes: 0, seconds: 0 };
//   };

//   const [time, setTime] = useState(getStoredTime());
//   const [running, setRunning] = useState(true);

//   const navigator = useNavigate();

//   useEffect(() => {
//     let interval;

//     if (running) {
//       interval = setInterval(() => {
//         setTime((prevTime) => {
//           const newSeconds = prevTime.seconds + 1;
//           const newMinutes = prevTime.minutes + Math.floor(newSeconds / 60);
//           const newHours = prevTime.hours + Math.floor(newMinutes / 60);

//           localStorage.setItem(
//             "stopwatchTime",
//             JSON.stringify({
//               hours: newHours % 24,
//               minutes: newMinutes % 60,
//               seconds: newSeconds % 60,
//             })
//           );

//           return {
//             hours: newHours % 24,
//             minutes: newMinutes % 60,
//             seconds: newSeconds % 60,
//           };
//         });
//       }, 1000);
//     } else {
//       clearInterval(interval);
//     }

//     return () => clearInterval(interval);
//   }, [running]);

//   const handleBreak = () => {
//     setRunning(false);
//   };

//   const handleLogout = async () => {
//     try {
//       localStorage.removeItem("stopwatchTime");

//       setTime({ hours: 0, minutes: 0, seconds: 0 });

//       console.log("Logged out successfully.");
//       navigator("/employee-login");
//     } catch (error) {
//       console.error("Error logging out:", error);
//     }
//   };

//   return (
//     <div>
//       <h3 style={{ color: "red" }}>
//         Time: {time.hours.toString().padStart(2, "0")}:
//         {time.minutes.toString().padStart(2, "0")}:
//         {time.seconds.toString().padStart(2, "0")}
//       </h3>
//       <div>
//         <button className="btn btn-success m-1" onClick={handleBreak}>
//           Break
//         </button>
//         <button className="btn btn-dark my-1" onClick={handleLogout}>
//           Logout
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Stopwatch;

import React, { useState, useEffect } from "react";
import './EmpTimeTracker.css';
import { useNavigate } from "react-router-dom";


const Stopwatch = () => {
  const getStoredTime = () => {
    const storedTime = localStorage.getItem("stopwatchTime");
    return storedTime
      ? JSON.parse(storedTime)
      : { hours: 0, minutes: 0, seconds: 0 };
  };

  const [time, setTime] = useState(getStoredTime());
  const [running, setRunning] = useState(true);

  const navigator = useNavigate();

  useEffect(() => {
    let interval;

    if (running) {
      interval = setInterval(() => {
        setTime((prevTime) => {
          const newSeconds = prevTime.seconds + 1;
          const newMinutes = prevTime.minutes + Math.floor(newSeconds / 60);
          const newHours = prevTime.hours + Math.floor(newMinutes / 60);

          localStorage.setItem(
            "stopwatchTime",
            JSON.stringify({
              hours: newHours % 24,
              minutes: newMinutes % 60,
              seconds: newSeconds % 60,
            })
          );

          return {
            hours: newHours % 24,
            minutes: newMinutes % 60,
            seconds: newSeconds % 60,
          };
        });
      }, 1000);
    } else {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [running]);

  const handleBreak = () => {
    setRunning(false); // Pause the stopwatch
  };

  const handleResume = () => {
    setRunning(true); // Resume the stopwatch
  };

  const handleLogout = async () => {
    try {
      localStorage.removeItem("stopwatchTime");

      setTime({ hours: 0, minutes: 0, seconds: 0 });

      console.log("Logged out successfully.");
      navigator("/employee-login");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <div style={{ display: "flex" }}>
      <div style={{ marginRight:"20px" , marginTop:"5px"}}>
        <h3 style={{ color: "black" }}>
          Time: {time.hours.toString().padStart(2, "0")}:
          {time.minutes.toString().padStart(2, "0")}:
          {time.seconds.toString().padStart(2, "0")}
        </h3>
      </div>
      <div style={{ marginLeft: "20px", position: "fixed", top: "5px", right: "1px" }}>
        {running ? (
          <button className="timer-break-btn" onClick={handleBreak}>
            Take Break
          </button>
        ) : (
          <button className="timer-break-btn" onClick={handleResume} >
            End Breake
          </button>

         /* <button className={`timer-break-btn ${onBreak ? 'on-break' : ''}`} onClick={handleBreak}>
               {onBreak ? 'End Break' : 'Start Break'}
           </button> */


        )}
      </div>
    </div>
  );
};

export default Stopwatch;