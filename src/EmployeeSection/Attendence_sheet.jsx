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
        const response = await fetch(`http://192.168.1.40:8891/api/ats/157industries/employee-attendance/6`);
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
                <tr key={data.workId} className='attendancerows '>
                  <td className='tabledata '>{data.date}
                    <div className="tooltip">
                      
                      <span className="tooltiptext">{data.date}</span>
                    </div>
                  </td>
                  <td className='tabledata'>{data.loginTime}
                    <div className="tooltip">
                      
                      <span className="tooltiptext">{data.loginTime}</span>
                    </div>
                  </td>
                  <td className='tabledata'> {data.lateMark}
                    <div className="tooltip">
                     
                      <span className="tooltiptext">{data.lateMark}</span>
                    </div>
                  </td>
                  <td className='tabledata'> {data.logoutTime}
                    <div className="tooltip">
                     
                      <span className="tooltiptext">{data.logoutTime}</span>
                    </div>
                  </td>
                  <td className='tabledata'> {data.leaveType}
                    <div className="tooltip">
                     
                      <span className="tooltiptext">{data.leaveType}</span>
                    </div>
                  </td>
                  <td className='tabledata'> {data.totalHoursWork}
                    <div className="tooltip">
                     
                      <span className="tooltiptext">{data.totalHoursWork}</span>
                    </div>
                  </td>
                  <td className='tabledata'> {data.halfDay}
                    <div className="tooltip">
                     
                      <span className="tooltiptext">{data.halfDay}</span>
                    </div>
                  </td>
                  <td className='tabledata'>{data.paidLeaves}
                    <div className="tooltip">
                      
                      <span className="tooltiptext">{data.paidLeaves}</span>
                    </div>
                  </td>
                  <td className='tabledata'>{data.unPaidLeaves}
                    <div className="tooltip">
                      
                      <span className="tooltiptext">{data.unPaidLeaves}</span>
                    </div>
                  </td>
                  <td className='tabledata'>{data.holidayPaidLeave}
                    <div className="tooltip">
                      
                      <span className="tooltiptext">{data.holidayPaidLeave}</span>
                    </div>
                  </td>
                  <td className='tabledata'> {data.holidayUnPaidLeave}
                    <div className="tooltip">
                     
                      <span className="tooltiptext">{data.holidayUnPaidLeave}</span>
                    </div>
                  </td>
                  <td className='tabledata'> {data.remoteWork}
                    <div className="tooltip">
                     
                      <span className="tooltiptext">{data.remoteWork}</span>
                    </div>
                  </td>
                  <td className='tabledata'>{data.dayPresentPaid}
                    <div className="tooltip">
                      
                      <span className="tooltiptext">{data.dayPresentPaid}</span>
                    </div>
                  </td>
                  <td className='tabledata'>{data.dayPresentUnpaid}
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
