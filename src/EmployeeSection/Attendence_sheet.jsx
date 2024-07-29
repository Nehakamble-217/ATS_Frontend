import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./Attendence_sheet.css";

const Attendance = () => {
  const [attendanceData, setAttendanceData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { employeeId,userType } = useParams();
  const navigator = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://localhost:9090/api/ats/157industries/attendance-data/${employeeId}/${userType}`
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setAttendanceData(data);
        console.log(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data 😒:", error);
        setError(error);
        setLoading(false);
      }
    };

    fetchData();
  }, [employeeId,userType]);

  const handleMouseOver = (event) => {
    const tableData = event.currentTarget;
    const tooltip = tableData.querySelector(".tooltip");
    const tooltiptext = tableData.querySelector(".tooltiptext");

    if (tooltip && tooltiptext) {
      const textOverflowing =
        tableData.offsetWidth < tableData.scrollWidth ||
        tableData.offsetHeight < tableData.scrollHeight;
      if (textOverflowing) {
        const rect = tableData.getBoundingClientRect();
        tooltip.style.top = `${rect.top - 10}px`;
        tooltip.style.left = `${rect.left + rect.width / 100}px`;
        tooltip.style.visibility = "visible";
      } else {
        tooltip.style.visibility = "hidden";
      }
    }
  };

  const handleMouseOut = (event) => {
    const tooltip = event.currentTarget.querySelector(".tooltip");
    if (tooltip) {
      tooltip.style.visibility = "hidden";
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="App-after">
      <div className="container-after1">
        <div className="attendanceTableData">
          <table className="attendance-table">
            <thead>
              <tr className="attendancerows-head">
                <th className="attendanceheading">Sr No</th>
                <th className="attendanceheading">Working Date</th>
                <th className="attendanceheading">Employe Name</th>
                <th className="attendanceheading">Job Role</th>
                <th className="attendanceheading">Login Time</th>
                <th className="attendanceheading">Late Mark</th>
                <th className="attendanceheading">Calling Count</th>
                <th className="attendanceheading">Target</th>
                <th className="attendanceheading">Archived</th>
                <th className="attendanceheading">Pending</th>
                <th className="attendanceheading">Leave Type</th>
                <th className="attendanceheading">Half Days</th>
                <th className="attendanceheading">Holiday Leave</th>
                <th className="attendanceheading">Work Type</th>
                <th className="attendanceheading">Day Status</th>
                <th className="attendanceheading">Breaks</th>
                <th className="attendanceheading">Working Hours </th>
                <th className="attendanceheading">Logout Time</th>
                <th className="attendanceheading">Employee Id</th>
                <th className="attendanceheading">Team Leader Id</th>
              </tr>
            </thead>
            <tbody>
              {attendanceData.map((data,index) => (
                <tr key={data.workId} className="attendancerows">
                  <td  className="tabledata"
                    onMouseOver={handleMouseOver}
                    onMouseOut={handleMouseOut}>
                   {index + 1}
                   <div className="tooltip">
                      <span className="tooltiptext">  {index + 1}</span>
                    </div>
                  </td>

                  <td
                    className="tabledata"
                    onMouseOver={handleMouseOver}
                    onMouseOut={handleMouseOut}
                  >
                    {data.date}
                    <div className="tooltip">
                      <span className="tooltiptext">{data.date}</span>
                    </div>
                  </td>

                  <td
                    className="tabledata"
                    onMouseOver={handleMouseOver}
                    onMouseOut={handleMouseOut}
                  >
                    {data.employeeName}
                    <div className="tooltip">
                      <span className="tooltiptext">{data.employeeName}</span>
                    </div>
                  </td>

                  <td
                    className="tabledata"
                    onMouseOver={handleMouseOver}
                    onMouseOut={handleMouseOut}
                  >
                    {data.jobRole}
                    <div className="tooltip">
                      <span className="tooltiptext">{data.jobRole}</span>
                    </div>
                  </td>

                  <td
                    className="tabledata"
                    onMouseOver={handleMouseOver}
                    onMouseOut={handleMouseOut}
                  >
                    {data.loginTime}
                    <div className="tooltip">
                      <span className="tooltiptext">{data.loginTime}</span>
                    </div>
                  </td>
                  <td
                    className="tabledata"
                    onMouseOver={handleMouseOver}
                    onMouseOut={handleMouseOut}
                  >
                    {data.lateMark}
                    <div className="tooltip">
                      <span className="tooltiptext">{data.lateMark}</span>
                    </div>
                  </td>

                  <td
                    className="tabledata"
                    onMouseOver={handleMouseOver}
                    onMouseOut={handleMouseOut}
                  >
                    {data.callingCount}
                    <div className="tooltip">
                      <span className="tooltiptext">{data.callingCount}</span>
                    </div>
                  </td>

                  <td
                    className="tabledata"
                    onMouseOver={handleMouseOver}
                    onMouseOut={handleMouseOut}
                  >
                    {data.dailyTarget}
                    <div className="tooltip">
                      <span className="tooltiptext">{data.dailyTarget}</span>
                    </div>
                  </td>

                  <td
                    className="tabledata"
                    onMouseOver={handleMouseOver}
                    onMouseOut={handleMouseOut}
                  >
                    {data.dailyArchived}
                    <div className="tooltip">
                      <span className="tooltiptext">{data.dailyArchived}</span>
                    </div>
                  </td>

                  <td
                    className="tabledata"
                    onMouseOver={handleMouseOver}
                    onMouseOut={handleMouseOut}
                  >
                    {data.dailyPending}
                    <div className="tooltip">
                      <span className="tooltiptext">{data.dailyPending}</span>
                    </div>
                  </td>

                  <td
                    className="tabledata"
                    onMouseOver={handleMouseOver}
                    onMouseOut={handleMouseOut}
                  >
                    {data.leaveType}
                    <div className="tooltip">
                      <span className="tooltiptext">{data.leaveType}</span>
                    </div>
                  </td>
                  <td
                    className="tabledata"
                    onMouseOver={handleMouseOver}
                    onMouseOut={handleMouseOut}
                  >
                    {data.halfDay}
                    <div className="tooltip">
                      <span className="tooltiptext">{data.halfDay}</span>
                    </div>
                  </td>

                  <td
                    className="tabledata"
                    onMouseOver={handleMouseOver}
                    onMouseOut={handleMouseOut}
                  >
                    {data.holidayLeave}
                    <div className="tooltip">
                      <span className="tooltiptext">
                        {data.holidayLeave}
                      </span>
                    </div>
                  </td>
                  <td
                    className="tabledata"
                    onMouseOver={handleMouseOver}
                    onMouseOut={handleMouseOut}
                  >
                    {data.remoteWork}
                    <div className="tooltip">
                      <span className="tooltiptext">
                        {data.remoteWork}
                      </span>
                    </div>
                  </td>
                  <td
                    className="tabledata"
                    onMouseOver={handleMouseOver}
                    onMouseOut={handleMouseOut}
                  >
                    {data.dayPresentStatus}
                    <div className="tooltip">
                      <span className="tooltiptext">{data.dayPresentStatus}</span>
                    </div>
                  </td>
                  <td
                    className="tabledata"
                    onMouseOver={handleMouseOver}
                    onMouseOut={handleMouseOut}
                  >
                    <button>Breaks</button>
                  </td>

                  <td
                    className="tabledata"
                    onMouseOver={handleMouseOver}
                    onMouseOut={handleMouseOut}
                  >
                    {data.totalHoursWork}
                    <div className="tooltip">
                      <span className="tooltiptext">
                        {data.totalHoursWork}
                      </span>
                    </div>
                  </td>

                  <td
                    className="tabledata"
                    onMouseOver={handleMouseOver}
                    onMouseOut={handleMouseOut}
                  >
                    {data.logoutTime}
                    <div className="tooltip">
                      <span className="tooltiptext">
                        {data.logoutTime}
                      </span>
                    </div>
                  </td>

                  <td
                    className="tabledata"
                    onMouseOver={handleMouseOver}
                    onMouseOut={handleMouseOut}
                  >
                    {data.employeeId}
                    <div className="tooltip">
                      <span className="tooltiptext">
                        {data.employeeId}
                      </span>
                    </div>
                  </td>

                  <td
                    className="tabledata"
                    onMouseOver={handleMouseOver}
                    onMouseOut={handleMouseOut}
                  >
                    {data.teamLeader}
                    <div className="tooltip">
                      <span className="tooltiptext">
                        {data.teamLeader}
                      </span>
                    </div>
                  </td>
                
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Attendance;

