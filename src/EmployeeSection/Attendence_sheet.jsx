import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './Attendence_sheet.css';

const Attendance = () => {
  const [attendanceData, setAttendanceData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { workId } = useParams();
  const navigator = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {


        const response = await fetch(`http://192.168.1.38:8891/api/ats/157industries/employee-attendance/6`);

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setAttendanceData(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data 😒:', error);
        setError(error);
        setLoading(false);
      }
    };

    fetchData();
  }, [workId]);

  const handleMouseOver = (event) => {
    const tableData = event.currentTarget;
    const tooltip = tableData.querySelector('.tooltip');

    if (tooltip) {
      const isOverflowing = tableData.scrollWidth > tableData.clientWidth;
      if (isOverflowing) {
        tooltip.style.visibility = 'visible';
        tooltip.style.opacity = '1';

        const tableDataRect = tableData.getBoundingClientRect();
        const tooltipRect = tooltip.getBoundingClientRect();

        tooltip.style.top = `${tableDataRect.top - tooltipRect.height - 5}px`;
        tooltip.style.left = `${tableDataRect.left}px`;
      } else {
        tooltip.style.visibility = 'hidden';
        tooltip.style.opacity = '0';
      }
    }
  };

  const handleMouseOut = (event) => {
    const tooltip = event.currentTarget.querySelector('.tooltip');
    if (tooltip) {
      tooltip.style.visibility = 'hidden';
      tooltip.style.opacity = '0';
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
              <tr className='attendancerows-head'>
                <th className='attendanceheading'>Date</th>
                <th className='attendanceheading'>Login Time</th>
                <th className='attendanceheading'>Late Mark</th>
                <th className='attendanceheading'>Logout Time</th>
                <th className='attendanceheading'>Leave Type</th>
                <th className='attendanceheading'>Total Hours Worked</th>
                <th className='attendanceheading'>Breaks</th>
                <th className='attendanceheading'>Half Days</th>
                <th className='attendanceheading'>Paid Leaves</th>
                <th className='attendanceheading'>Unpaid Leaves</th>
                <th className='attendanceheading'>Holiday Paid Leave</th>
                <th className='attendanceheading'>Holiday Unpaid Leave</th>
                <th className='attendanceheading'>Remote Work</th>
                <th className='attendanceheading'>Day Present Paid</th>
                <th className='attendanceheading'>Day Present Unpaid</th>
              </tr>
            </thead>
            <tbody>
              {attendanceData.map((data) => (
                <tr key={data.workId} className='attendancerows'>
                  <td className='tabledata' onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>{data.date}
                    <div className="tooltip">
                      <span className="tooltiptext">{data.date}</span>
                    </div>
                  </td>
                  <td className='tabledata' onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>{data.loginTime}
                    <div className="tooltip">
                      <span className="tooltiptext">{data.loginTime}</span>
                    </div>
                  </td>
                  <td className='tabledata' onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>{data.lateMark}
                    <div className="tooltip">
                      <span className="tooltiptext">{data.lateMark}</span>
                    </div>
                  </td>
                  <td className='tabledata' onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>{data.logoutTime}
                    <div className="tooltip">
                      <span className="tooltiptext">{data.logoutTime}</span>
                    </div>
                  </td>
                  <td className='tabledata' onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>{data.leaveType}
                    <div className="tooltip">
                      <span className="tooltiptext">{data.leaveType}</span>
                    </div>
                  </td>
                  <td className='tabledata' onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>{data.totalHoursWork}
                    <div className="tooltip">
                      <span className="tooltiptext">{data.totalHoursWork}</span>
                    </div>
                  </td>
                  <td className='tabledata' onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>{data.halfDay}
                    <div className="tooltip">
                      <span className="tooltiptext">{data.halfDay}</span>
                    </div>
                  </td>
                  <td className='tabledata' onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>{data.paidLeaves}
                    <div className="tooltip">
                      <span className="tooltiptext">{data.paidLeaves}</span>
                    </div>
                  </td>
                  <td className='tabledata' onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>{data.unPaidLeaves}
                    <div className="tooltip">
                      <span className="tooltiptext">{data.unPaidLeaves}</span>
                    </div>
                  </td>
                  <td className='tabledata' onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>{data.holidayPaidLeave}
                    <div className="tooltip">
                      <span className="tooltiptext">{data.holidayPaidLeave}</span>
                    </div>
                  </td>
                  <td className='tabledata' onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>{data.holidayUnPaidLeave}
                    <div className="tooltip">
                      <span className="tooltiptext">{data.holidayUnPaidLeave}</span>
                    </div>
                  </td>
                  <td className='tabledata' onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>{data.remoteWork}
                    <div className="tooltip">
                      <span className="tooltiptext">{data.remoteWork}</span>
                    </div>
                  </td>
                  <td className='tabledata' onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>{data.dayPresentPaid}
                    <div className="tooltip">
                      <span className="tooltiptext">{data.dayPresentPaid}</span>
                    </div>
                  </td>
                  <td className='tabledata' onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>{data.dayPresentUnpaid}
                    <div className="tooltip">
                      <span className="tooltiptext">{data.dayPresentUnpaid}</span>
                    </div>
                  </td>
                  <td className='tabledata'></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Attendance;
