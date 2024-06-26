import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import "../EmployeeDashboard/dailyWork.css";
import Profile from "../photos/profileImg.webp";
import logoutImg from "../photos/download.jpeg";
import { Modal, Button } from "react-bootstrap";

function DailyWork  ({ successfulDataAdditions, handleLogout, profilePageLink }) {
  const { employeeId } = useParams();
  const [showDetails, setShowDetails] = useState(false);
  const [employeeData, setEmployeeData] = useState({});
  const [popupVisible, setPopupVisible] = useState(false);
  const [modalEmployeeData, setModalEmployeeData] = useState(null);
  const [profileImageBase64, setProfileImageBase64] = useState(null);
  const [modalShow, setModalShow] = useState(false);
  const [showAllDailyBtns, setShowAllDailyBtns] = useState(true);
  
  const toggleDailyTBtn = () => {
    setShowDetails(!showDetails);
  };

  const getStoredTime = () => {
    const storedTime = localStorage.getItem(`stopwatchTime_${employeeId}`);
    return storedTime
      ? JSON.parse(storedTime)
      : { hours: 0, minutes: 0, seconds: 0 };
  };

  const getStoredData = () => {
    const storedData = localStorage.getItem(`dailyWorkData_${employeeId}`);
    return storedData
      ? JSON.parse(storedData)
      : { archived: 0, pending: 10 };
  };

  const [time, setTime] = useState(getStoredTime());
  const [running, setRunning] = useState(true);
  const [data, setData] = useState(getStoredData());
  const [breaks, setBreaks] = useState([]);
  const [loginTime, setLoginTime] = useState(null);
  const [logoutTime, setLogoutTime] = useState(null);
  const [currentTime, setCurrentTime] = useState("");
  const [currentDate, setCurrentDate] = useState("");
  const [lateMark, setLateMark] = useState("No");
  const [leaveType, setLeaveType] = useState("");
  const [paidLeave, setPaidLeave] = useState(0);
  const [unpaidLeave, setUnpaidLeave] = useState(0);
  const [dayPresentPaid, setDayPresentPaid] = useState("No");
  const [dayPresentUnpaid, setDayPresentUnpaid] = useState("Yes");
  const [remoteWork, setRemoteWork] = useState("Select");
  

  const navigate = useNavigate();

  useEffect(() => {
    const fetchEmployeeData = async () => {
      try {
        const response = await axios.get(
          `http://192.168.1.39:8891/api/ats/157industries/employee-details/${employeeId}`
        );
        setEmployeeData(response.data);

        const byteData = response.data.profileImage;
        if (byteData) {
          const blob = new Blob([byteData]);
          const fileReader = new FileReader();
          fileReader.onload = function (event) {
            const base64Image = event.target.result;
            setProfileImageBase64(base64Image);
          };
          fileReader.readAsDataURL(blob);
        }
      } catch (error) {
        console.error("Error fetching employee details:", error);
      }
    };

    fetchEmployeeData();
  }, [employeeId]);

  useEffect(() => {
    const now = new Date();
    const timeString = now.toLocaleTimeString("en-IN");
    const dateString = `${now.getDate().toString().padStart(2, "0")}/${(
      now.getMonth() + 1
    )
      .toString()
      .padStart(2, "0")}/${now.getFullYear()}`;
    const dayOfWeek = now.getDay();
    setCurrentTime(timeString);
    setCurrentDate(dateString);
    setLoginTime(timeString);

    const loginHour = now.getHours();
    if (loginHour >= 10) {
      setLateMark("Yes");
    }

    if (dayOfWeek === 0) {
      setLeaveType("Unpaid Leave");
      setPaidLeave(0);
      setUnpaidLeave(1);
    } else {
      setLeaveType("");
      setPaidLeave(1);
      setUnpaidLeave(0);
    }

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

      if (updatedData.archived >= 3) {
        setDayPresentPaid("Yes");
        setDayPresentUnpaid("No");
      } else {
        setDayPresentPaid("No");
        setDayPresentUnpaid("Yes");
      }

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

  const handleLogoutLocal = async () => {
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
        lateMark,
        leaveType,
        paidLeave,
        unpaidLeave,
        dayPresentPaid,
        dayPresentUnpaid,
        remoteWork,
      };

      await axios.post(
        "http://192.168.1.39:8891/api/ats/157industries/save-daily-work",
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

    const formattedTime = `${hours
      .toString()
      .padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;

    return formattedTime;
  };

  const handleImageClick = () => {
    setPopupVisible(true);
    setModalEmployeeData(employeeData); 
  };

  const handleClosePopup = () => {
    setPopupVisible(false);
    setModalEmployeeData(null);
  };
  const toggleAllDailyBtns = () => {
    setShowAllDailyBtns(!showAllDailyBtns);
  };

  return (


     <div className="daily-timeanddate">
            <div className="header-clouds"></div>

      <div className="head">

        <div className="user-img" >
          <img 
            src={Profile}
            alt="Profile"
            onClick={profilePageLink}
          />
        </div>

        <div className="user-details">
          <p>
            {employeeData.employeeName} <br />
            157{employeeId}
          </p>
        </div>
      </div>
  {showAllDailyBtns && ( 
      <div className="all-daily-btns">
        <div className="daily-t-btn">
          <button className="daily-tr-btn" style={{ whiteSpace: "nowrap" }}>
            Target : 10
          </button>
          <button
            className="daily-tr-btn"
            style={{
              color: data.archived <= 3 ? "red" : "green",background:"#ffcb9b"
            }}
          >
            Archived : {data.archived}
          </button>
          <button
            className="daily-tr-btn"
            style={{ color: data.pending < 7 ? "green" : "red" ,background:"#ffcb9b"}}
          >
            Pending : {data.pending}
          </button>
        </div>
        <button className="loging-hr">
          <h6 hidden>Time: {currentTime}</h6>
          <h6 hidden>Date: {currentDate}</h6>
          Login Hours : {time.hours.toString().padStart(2, "0")}:
          {time.minutes.toString().padStart(2, "0")}:
          {time.seconds.toString().padStart(2, "0")}
        </button>
        <div hidden>
          <h6>Late Mark         : {lateMark}</h6>
          <h6>Leave Type        : {leaveType}</h6>
          <h6>Paid Leave        : {paidLeave}</h6>
          <h6>Unpaid Leave      : {unpaidLeave}</h6>
          <h6>Day Present Paid  : {dayPresentPaid}</h6>
          <h6>Day Present Unpaid: {dayPresentUnpaid}</h6>
        </div>

        <div hidden style={{ display: "flex", flexDirection: "column" }}>
          <label htmlFor="remoteWork">Remote Work:</label>
          <select
            className="select"
            id="remoteWork"
            value={remoteWork}
            onChange={(e) => setRemoteWork(e.target.value)}
          >
            <option>Select</option>
            <option value="work from Office">WFO</option>
            <option value="Work from Home">WFH</option>
            <option value="hybrid">Hybrid</option>
          </select>
        </div>

        <button
          className={running ? "timer-break-btn" : "timer-break-btn"}
          onClick={running ? handlePause : handleResume}
          style={{height:"30px"}}
        >
          {running ? "Pause" : "Resume"}
        </button>

        {/* Dont Remove this 2 comment ...Arshad */}
        {/* <button className="show-daily-t-btn" onClick={toggleDailyTBtn}>
          {showDetails ? "Hide" : "Show"}
        </button> */}
        {/* <img className="logout-btn"
          onClick={handleLogoutLocal}
          // style={{ width: "30px", borderRadius: "60%" }}
          src={logoutImg}
          alt="Logout"
        /> */}

      </div>
  )}

   <button
        className="toggle-all-daily-btns"
        onClick={toggleAllDailyBtns}
        // style={{ display: showAllDailyBtns ? "none" : "block" }}
      >
        {!showAllDailyBtns ? "show" : "hidden"} All Buttons
      </button>

    </div>
  );
};

export default DailyWork;




