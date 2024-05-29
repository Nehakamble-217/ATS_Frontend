import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../EmployeeDashboard/dailyWork.css";

const DailyWork = ({ successfulDataAdditions }) => {
  const employeeId = localStorage.getItem("employeeId") || 1234;

  const getStoredTime = () => {
    const storedTime = localStorage.getItem(`stopwatchTime_${employeeId}`);
    return storedTime
      ? JSON.parse(storedTime)
      : { hours: 0, minutes: 0, seconds: 0 };
  };

  const getStoredData = () => {
    const storedData = localStorage.getItem(`dailyWorkData_${employeeId}`);
    return storedData ? JSON.parse(storedData) : { archived: 0, pending: 10 };
  };

  const [time, setTime] = useState(getStoredTime());
  const [running, setRunning] = useState(true);
  const [data, setData] = useState(getStoredData());
  const [breaks, setBreaks] = useState([]);
  const [loginTime, setLoginTime] = useState(null);
  const [logoutTime, setLogoutTime] = useState(null);
  const [currentTime, setCurrentTime] = useState("");
  const [currentDate, setCurrentDate] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const now = new Date();
    const timeString = now.toLocaleTimeString("en-IN");
    const dateString = `${now.getDate().toString().padStart(2, "0")}/${(
      now.getMonth() + 1
    )
      .toString()
      .padStart(2, "0")}/${now.getFullYear()}`;

    setCurrentTime(timeString);
    setCurrentDate(dateString);
    setLoginTime(timeString);

    const timer = setInterval(() => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString("en-IN"));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    let interval;
    if (running) {
      interval = setInterval(() => {
        setTime((prevTime) => {
          const newSeconds = prevTime.seconds + 1;
          const newMinutes = prevTime.minutes + Math.floor(newSeconds / 60);
          const newHours = prevTime.hours + Math.floor(newMinutes / 60);

          const updatedTime = {
            hours: newHours % 24,
            minutes: newMinutes % 60,
            seconds: newSeconds % 60,
          };

          localStorage.setItem(
            `stopwatchTime_${employeeId}`,
            JSON.stringify(updatedTime)
          );
          return updatedTime;
        });
      }, 1000);
    } else {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [running, employeeId]);

  useEffect(() => {
    if (successfulDataAdditions > 0) {
      updateCount(successfulDataAdditions);
    }
  }, [successfulDataAdditions]);

  const updateCount = () => {
    setData((prevData) => {
      const updatedData = {
        archived: prevData.archived + 1,
        pending: prevData.pending - 1,
      };

      localStorage.setItem(
        `dailyWorkData_${employeeId}`,
        JSON.stringify(updatedData)
      );

      return updatedData;
    });
  };

  const handlePause = () => {
    setRunning(false);
    const breakStartTime = new Date().toLocaleTimeString("en-IN");
    setBreaks((prevBreaks) => [
      ...prevBreaks,
      { breakStartTime, breakEndTime: null },
    ]);
  };

  const handleResume = () => {
    setRunning(true);
    const breakEndTime = new Date().toLocaleTimeString("en-IN");
    setBreaks((prevBreaks) => {
      const lastBreak = prevBreaks[prevBreaks.length - 1];
      if (lastBreak && !lastBreak.breakEndTime) {
        lastBreak.breakEndTime = breakEndTime;
      }
      return [...prevBreaks];
    });
  };

  const handleLogout = async () => {
    try {
      const logoutTime = new Date().toLocaleTimeString("en-IN");
      setLogoutTime(logoutTime);

      const totalHoursWork = calculateTotalHoursWork(loginTime, logoutTime);

      const now = new Date();
      const day = now.getDate().toString().padStart(2, "0");
      const month = (now.getMonth() + 1).toString().padStart(2, "0");
      const year = now.getFullYear();

      const formData = {
        employeeId,
        date: `${day}/${month}/${year}`,
        dailyTarget: data.pending + data.archived,
        dailyArchived: data.archived,
        dailyPending: data.pending,
        loginTime,
        logoutTime,
        totalHoursWork,
        dailyHours: breaks,
      };

      await axios.post(
        `"http://198.168.1.33:8891/api/ats/157industries/save-daily-work"`,
        formData
      );

      localStorage.removeItem(`stopwatchTime_${employeeId}`);
      localStorage.removeItem(`dailyWorkData_${employeeId}`);
      localStorage.removeItem("employeeId");

      setTime({ hours: 0, minutes: 0, seconds: 0 });
      setData({ archived: 0, pending: 10 });

      console.log("Logged out successfully.");
      navigate("/employee-login");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  const calculateTotalHoursWork = (loginTime, logoutTime) => {
    const login = new Date(`01/01/2022 ${loginTime}`);
    const logout = new Date(`01/01/2022 ${logoutTime}`);

    let totalWorkTime = (logout - login) / 1000;

    breaks.forEach((b) => {
      if (b.breakEndTime) {
        const breakStart = new Date(`01/01/2022 ${b.breakStartTime}`);
        const breakEnd = new Date(`01/01/2022 ${b.breakEndTime}`);
        const breakDuration = (breakEnd - breakStart) / 1000;
        totalWorkTime -= breakDuration;
      }
    });

    const hours = Math.floor(totalWorkTime / 3600);
    const minutes = Math.floor((totalWorkTime % 3600) / 60);
    const seconds = Math.floor(totalWorkTime % 60);

    `const formattedTime = ${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;

    return formattedTime;
  };

  return (
    <div
      className="daily-work-div d-flex"
      style={{
        alignItems: "center",
        justifyContent: "space-between",
        width: "80%",
      }}
    >
      <div className="daily-work-tabel">

        <table >
          <thead>
            
            <tr className="targetvalues" >
            <button className="daily-tr-btn">
              <th
                scope="col"
                style={{
                  whiteSpace: "nowrap",
                //   fontSize: "16px",
                //   color: "gray",
                
                }}
              >
                Target  :-
                
              </th>
              <td
                scope="row"
                
              >
              10
                
              </td>
              </button>

              <button className="daily-tr-btn">

              <th scope="col" >
               Archived :-
               
              </th>
              <td
                scope="row"
                style={{
                  color: data.archived <= 3 ? "red" : "green",
                  
                }}
              >
                {data.archived}
                
              </td>

              </button>
              <button className="daily-tr-btn"> 
              <th scope="col" >
              Pending :-

                
              </th>
              <td
                scope="row"
                style={{
                  color: data.pending < 7 ? "green" : "red",
                  
                }}
              >
                {data.pending}
                
              </td>
              </button>
            </tr>
          </thead>
        </table>
      </div>
      <div className="daily-work-time">
        <div style={{ paddingLeft: "20px" }}>
          <h6 hidden>Time: {currentTime}</h6>
          <h6 hidden>Date: {currentDate}</h6>
          <h6 className="loging-hr">
            Loging hr: {time.hours.toString().padStart(2, "0")}:
            {time.minutes.toString().padStart(2, "0")}:
            {time.seconds.toString().padStart(2, "0")}
          </h6>
        </div>
        <div>
          <button
            className={running ? "timer-break-btn" : "timer-break-btn"}
            style={{ position: "fixed", top: "20px", right: "95px" }}
            onClick={running ? handlePause : handleResume}
          >
            {running ? "Pause" : "Resume"}
          </button>
          <br />

          <button
            className="logout-btn"
            style={{ position: "fixed", top: "20px", right: "10px" }}
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default DailyWork;
