// import React, { useState, useEffect } from 'react'
// import { useParams, useNavigate } from 'react-router-dom'
// import './Attendence_sheet.css'


// const Attendance = () => {
//   const [attendanceData, setAttendanceData] = useState([])
//   //onst [showattendencetable,setattendencetable]=useState([]);
//   const [loading, setLoading] = useState(true)
//   const [error, setError] = useState(null)
//   const { workId } = useParams(6)
//   const navigator = useNavigate()
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await fetch(
//           `http://192.168.1.41:8891/api/ats/157industries/employee-attendance/6`,
//         )
//         if (!response.ok) {
//           throw new Error(`HTTP error! status: ${response.status}`)
//         }
//         const data = await response.json()
//         setAttendanceData(data)
//         setLoading(false)
//       } catch (error) {
//         console.error('Error fetching data 😒:', error)
//         setError(error)
//         setLoading(false)
//       }
//       ;[workId]
//     }

//     fetchData()
//   }, [])

//   const calculateSummary = () => {
//     let summaryData = {}

//     attendanceData.forEach((record) => {
//       const {
//         date,
//         loginTime,
//         lateMark,
//         logoutTime,
//         leaveType,
//         totalHoursWork,
//         halfDay,
//         paidLeaves,
//         unPaidLeaves,
//         holidayPaidLeave,
//         holidayUnPaidLeave,
//         remoteWork,
//         dayPresentPaid,
//         dayPresentUnpaid,
//       } =record

//       summaryData[date] = {
//         date,
//         loginTime,
//         lateMark,
//         logoutTime,
//         leaveType,
//         totalHoursWork,
//         halfDay,
//         paidLeaves,
//         unPaidLeaves,
//         holidayPaidLeave,
//         holidayUnPaidLeave,
//         remoteWork,
//         dayPresentPaid,
//         dayPresentUnpaid,
//       }
//     })

//     return summaryData
//   }

//   const summaryData = calculateSummary()

//   if (loading) {
//     return <div>Loading...</div>
//   }

//   if (error) {
//     return <div>Error: {error.message}</div>
//   }

//   return (
//     <div className="App-after">
//       {/* <div className="header-after">
//         <h1>Attendance Sheet</h1>
//       </div> */}

//       <div className="container-after">
//       <h6 style={{  fontSize:"18px" , marginTop:"0%", textIndent:"500px",color:"gray",fontWeight:"bold"}}>Attendance Sheet</h6>
//         <table className="attendance-table">
          
//           <thead>
//             <tr className='attendancerows'>
//               <th className='attendanceheading'>Date</th>
//               <th className='attendanceheading'>Login Time</th>
//               <th className='attendanceheading'>Late Mark</th>
//               <th className='attendanceheading'>Logout Time</th>
//               <th className='attendanceheading'>Leave Type</th>
//               <th className='attendanceheading'>Total Hours Worked</th>
//               <th className='attendanceheading'>Breaks</th>
//               <th className='attendanceheading'>Half Days</th>
//               <th className='attendanceheading'>Paid Leaves</th>
//               <th className='attendanceheading'>Unpaid Leaves</th>
//               <th className='attendanceheading'>Holiday Paid Leave</th>
//               <th className='attendanceheading'>Holiday Unpaid Leave</th>
//               <th className='attendanceheading'>Remote Work</th>
//               <th className='attendanceheading'>Day Present Paid</th>
//               <th className='attendanceheading'>Day Present Unpaid</th>
//             </tr>
//           </thead>
//           <tbody>
//             {attendanceData.map((data) => (
//               <tr key={data.workId} className='attendancerows'>
//                 <td className='tabledata'>{data.date}</td>
//                 <td className='tabledata'>{data.loginTime}</td>
//                 <td className='tabledata'>{data.lateMark}</td>
//                 <td className='tabledata'>{data.logoutTime}</td>
//                 <td className='tabledata'>{data.leaveType}</td>
//                 <td className='tabledata'>{data.totalHoursWork}</td>
//                 <td className='tabledata'>{data.halfDay}</td>
//                 <td className='tabledata'>{data.paidLeaves}</td>
//                 <td className='tabledata'>{data.unPaidLeaves}</td>
//                 <td className='tabledata'>{data.holidayPaidLeave}</td>
//                 <td className='tabledata'>{data.holidayUnPaidLeave}</td>
//                 <td className='tabledata'>{data.remoteWork}</td>
//                 <td className='tabledata'>{data.dayPresentPaid}</td>
//                 <td className='tabledata'>{data.dayPresentUnpaid}</td>
//                 <td className='tabledata'></td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   )
// }

// export default Attendance



import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './Attendence_sheet.css';

const Attendance = () => {
  const [attendanceData, setAttendanceData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  // const { workId } = useParams();
  // const navigator = useNavigate();

  useEffect(() => {
    // Hardcoded data instead of fetching from an API
    const hardcodedData = [
      {
        workId: 1,
        date: '2023-05-01',
        loginTime: '09:00',
        lateMark: 'No',
        logoutTime: '17:00',
        leaveType: 'None joogtfdebvbhdnnbbhbggg',
        totalHoursWork: '8',
        halfDay: 'No',
        paidLeaves: 0,
        unPaidLeaves: 0,
        holidayPaidLeave: 0,
        holidayUnPaidLeave: 0,
        remoteWork: 'Yes',
        dayPresentPaid: 'Yes',
        dayPresentUnpaid: 'No',
      },
      {
        workId: 2,
        date: '2023-05-02',
        loginTime: '09:15',
        lateMark: 'Yes',
        logoutTime: '17:00',
        leaveType: 'None',
        totalHoursWork: '7.75',
        halfDay: 'No',
        paidLeaves: 0,
        unPaidLeaves: 0,
        holidayPaidLeave: 0,
        holidayUnPaidLeave: 0,
        remoteWork: 'No',
        dayPresentPaid: 'Yes',
        dayPresentUnpaid: 'No',
      },
      {
        workId: 3,
        date: '2023-06-02',
        loginTime: '09:15',
        lateMark: 'Yes',
        logoutTime: '17:00',
        leaveType: 'None',
        totalHoursWork: '7.75',
        halfDay: 'No',
        paidLeaves: 0,
        unPaidLeaves: 0,
        holidayPaidLeave: 0,
        holidayUnPaidLeave: 0,
        remoteWork: 'No',
        dayPresentPaid: 'Yes',
        dayPresentUnpaid: 'No',
      },
      {
        workId: 4,
        date: '2023-07-02',
        loginTime: '10:15',
        lateMark: 'Yes',
        logoutTime: '17:00',
        leaveType: 'None',
        totalHoursWork: '7.75',
        halfDay: 'No',
        paidLeaves: 0,
        unPaidLeaves: 0,
        holidayPaidLeave: 0,
        holidayUnPaidLeave: 0,
        remoteWork: 'No',
        dayPresentPaid: 'Yes',
        dayPresentUnpaid: 'No',
      },
      {
        workId: 5,
        date: '2023-08-02',
        loginTime: '09:30',
        lateMark: 'Yes',
        logoutTime: '17:00',
        leaveType: 'None',
        totalHoursWork: '7.75',
        halfDay: 'No',
        paidLeaves: 0,
        unPaidLeaves: 0,
        holidayPaidLeave: 0,
        holidayUnPaidLeave: 0,
        remoteWork: 'No',
        dayPresentPaid: 'Yes',
        dayPresentUnpaid: 'No',
      },
      {
        workId:6,
        date: '2023-0-902',
        loginTime: '10:15',
        lateMark: 'Yes',
        logoutTime: '17:00',
        leaveType: 'None',
        totalHoursWork: '7.75',
        halfDay: 'No',
        paidLeaves: 0,
        unPaidLeaves: 0,
        holidayPaidLeave: 0,
        holidayUnPaidLeave: 0,
        remoteWork: 'No',
        dayPresentPaid: 'Yes',
        dayPresentUnpaid: 'No',
      },
      {
        workId: 7,
        date: '2023-05-02',
        loginTime: '09:15',
        lateMark: 'Yes',
        logoutTime: '17:00',
        leaveType: 'None',
        totalHoursWork: '7.75',
        halfDay: 'No',
        paidLeaves: 0,
        unPaidLeaves: 0,
        holidayPaidLeave: 0,
        holidayUnPaidLeave: 0,
        remoteWork: 'No',
        dayPresentPaid: 'Yes',
        dayPresentUnpaid: 'No',
      },
      {
        workId: 8,
        date: '2023-05-02',
        loginTime: '09:15',
        lateMark: 'Yes',
        logoutTime: '17:00',
        leaveType: 'None',
        totalHoursWork: '7.75',
        halfDay: 'No',
        paidLeaves: 0,
        unPaidLeaves: 0,
        holidayPaidLeave: 0,
        holidayUnPaidLeave: 0,
        remoteWork: 'No',
        dayPresentPaid: 'Yes',
        dayPresentUnpaid: 'No',
      },
      {
        workId: 9,
        date: '2023-05-02',
        loginTime: '09:15',
        lateMark: 'Yes',
        logoutTime: '17:00',
        leaveType: 'None',
        totalHoursWork: '7.75',
        halfDay: 'No',
        paidLeaves: 0,
        unPaidLeaves: 0,
        holidayPaidLeave: 0,
        holidayUnPaidLeave: 0,
        remoteWork: 'No',
        dayPresentPaid: 'Yes',
        dayPresentUnpaid: 'No',
      },
      {
        workId: 10,
        date: '2023-05-02',
        loginTime: '09:15',
        lateMark: 'Yes',
        logoutTime: '17:00',
        leaveType: 'None',
        totalHoursWork: '7.75',
        halfDay: 'No',
        paidLeaves: 0,
        unPaidLeaves: 0,
        holidayPaidLeave: 0,
        holidayUnPaidLeave: 0,
        remoteWork: 'No',
        dayPresentPaid: 'Yes',
        dayPresentUnpaid: 'No',
      },
      {
        workId: 11,
        date: '2023-05-02',
        loginTime: '09:15',
        lateMark: 'Yes',
        logoutTime: '17:00',
        leaveType: 'None',
        totalHoursWork: '7.75',
        halfDay: 'No',
        paidLeaves: 0,
        unPaidLeaves: 0,
        holidayPaidLeave: 0,
        holidayUnPaidLeave: 0,
        remoteWork: 'No',
        dayPresentPaid: 'Yes',
        dayPresentUnpaid: 'No',
      },
      {
        workId: 12,
        date: '2023-05-02',
        loginTime: '09:15',
        lateMark: 'Yes',
        logoutTime: '17:00',
        leaveType: 'None',
        totalHoursWork: '7.75',
        halfDay: 'No',
        paidLeaves: 0,
        unPaidLeaves: 0,
        holidayPaidLeave: 0,
        holidayUnPaidLeave: 0,
        remoteWork: 'No',
        dayPresentPaid: 'Yes',
        dayPresentUnpaid: 'No',
      },
      {
        workId: 13,
        date: '2023-05-02',
        loginTime: '09:15',
        lateMark: 'Yes',
        logoutTime: '17:00',
        leaveType: 'None',
        totalHoursWork: '7.75',
        halfDay: 'No',
        paidLeaves: 0,
        unPaidLeaves: 0,
        holidayPaidLeave: 0,
        holidayUnPaidLeave: 0,
        remoteWork: 'No',
        dayPresentPaid: 'Yes',
        dayPresentUnpaid: 'No',
      },
      {
        workId: 14,
        date: '2023-05-02',
        loginTime: '09:15',
        lateMark: 'Yes',
        logoutTime: '17:00',
        leaveType: 'None',
        totalHoursWork: '7.75',
        halfDay: 'No',
        paidLeaves: 0,
        unPaidLeaves: 0,
        holidayPaidLeave: 0,
        holidayUnPaidLeave: 0,
        remoteWork: 'No',
        dayPresentPaid: 'Yes',
        dayPresentUnpaid: 'No',
      },
      {
        workId: 15,
        date: '2023-05-02',
        loginTime: '09:15',
        lateMark: 'Yes',
        logoutTime: '17:00',
        leaveType: 'None',
        totalHoursWork: '7.75',
        halfDay: 'No',
        paidLeaves: 0,
        unPaidLeaves: 0,
        holidayPaidLeave: 0,
        holidayUnPaidLeave: 0,
        remoteWork: 'No',
        dayPresentPaid: 'Yes',
        dayPresentUnpaid: 'No',
      },
      // Add more hardcoded data as needed
    ];

    setAttendanceData(hardcodedData);
    setLoading(false);
  }, []);

  const calculateSummary = () => {
    let summaryData = {};

    attendanceData.forEach((record) => {
      const {
        date,
        loginTime,
        lateMark,
        logoutTime,
        leaveType,
        totalHoursWork,
        halfDay,
        paidLeaves,
        unPaidLeaves,
        holidayPaidLeave,
        holidayUnPaidLeave,
        remoteWork,
        dayPresentPaid,
        dayPresentUnpaid,
      } = record;

      summaryData[date] = {
        date,
        loginTime,
        lateMark,
        logoutTime,
        leaveType,
        totalHoursWork,
        halfDay,
        paidLeaves,
        unPaidLeaves,
        holidayPaidLeave,
        holidayUnPaidLeave,
        remoteWork,
        dayPresentPaid,
        dayPresentUnpaid,
      };
    });

    return summaryData;
  };

  const summaryData = calculateSummary();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    
      <div className="App-after">
      <table className="attendance-table">
        <thead>
          <tr className="attendancerows" style={{ width: '100px', overflowX: 'scroll', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>
            <th className="attendanceheading">Date</th>
            <th className="attendanceheading">Login Time</th>
            <th className="attendanceheading">Late Mark</th>
            <th className="attendanceheading">Logout Time</th>
            <th className="attendanceheading">Leave Type</th>
            <th className="attendanceheading">Total Hours Worked</th>
            <th className="attendanceheading">Breaks</th>
            <th className="attendanceheading">Half Days</th>
            <th className="attendanceheading">Paid Leaves</th>
            <th className="attendanceheading">Unpaid Leaves</th>
            <th className="attendanceheading">Holiday Paid Leave</th>
            <th className="attendanceheading">Holiday Unpaid Leave</th>
            <th className="attendanceheading">Remote Work</th>
            <th className="attendanceheading">Day Present Paid</th>
            <th className="attendanceheading">Day Present Unpaid</th>
          </tr>
        </thead>
        <tbody className='attendanceTableData'>
          {attendanceData.map((data) => (
            <tr key={data.workId} className="attendancerowsdata">
              <td className="tabledata">
                {data.date}
                <div className="tooltip">
                  <span className="tooltiptext">{data.date}</span>
                </div>
              </td>
              <td className="tabledata">
                {data.loginTime}
                <div className="tooltip">
                  <span className="tooltiptext">{data.loginTime}</span>
                </div>
              </td>
              <td className="tabledata">
                {data.lateMark}
                <div className="tooltip">
                  <span className="tooltiptext">{data.lateMark}</span>
                </div>
              </td>
              <td className="tabledata">
                {data.logoutTime}
                <div className="tooltip">
                  <span className="tooltiptext">{data.logoutTime}</span>
                </div>
              </td>
              <td className="tabledata">
                {data.leaveType}
                <div className="tooltip">
                  <span className="tooltiptext">{data.leaveType}</span>
                </div>
              </td>
              <td className="tabledata">
                {data.totalHoursWork}
                <div className="tooltip">
                  <span className="tooltiptext">{data.totalHoursWork}</span>
                </div>
              </td>
              <td className="tabledata">
                {data.halfDay}
                <div className="tooltip">
                  <span className="tooltiptext">{data.halfDay}</span>
                </div>
              </td>
              <td className="tabledata">
                {data.paidLeaves}
                <div className="tooltip">
                  <span className="tooltiptext">{data.paidLeaves}</span>
                </div>
              </td>
              <td className="tabledata">
                {data.unPaidLeaves}
                <div className="tooltip">
                  <span className="tooltiptext">{data.unPaidLeaves}</span>
                </div>
              </td>
              <td className="tabledata">
                {data.holidayPaidLeave}
                <div className="tooltip">
                  <span className="tooltiptext">{data.holidayPaidLeave}</span>
                </div>
              </td>
              <td className="tabledata">
                {data.holidayUnPaidLeave}
                <div className="tooltip">
                  <span className="tooltiptext">{data.holidayUnPaidLeave}</span>
                </div>
              </td>
              <td className="tabledata">
                {data.remoteWork}
                <div className="tooltip">
                  <span className="tooltiptext">{data.remoteWork}</span>
                </div>
              </td>
              <td className="tabledata">
                {data.dayPresentPaid}
                <div className="tooltip">
                  <span className="tooltiptext">{data.dayPresentPaid}</span>
                </div>
              </td>
              <td className="tabledata">
                {data.dayPresentUnpaid}
                <div className="tooltip">
                  <span className="tooltiptext">{data.dayPresentUnpaid}</span>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    
  );
};

export default Attendance;
