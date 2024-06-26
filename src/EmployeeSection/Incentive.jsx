import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
const Incentive = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const {employeeId} =useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
<<<<<<< HEAD
        const response = await fetch(`http://192.168.1.39:8891/api/ats/157industries/fetch-incentive/${employeeId}`);
=======
        const response = await fetch('http://192.168.1.39:8891/api/ats/157industries/fetch-incentive/6');


>>>>>>> 2209b7e44898777add755ed2ffb6d019040307a8
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const fetchedData = await response.json();
        const adjustedData = fetchedData.map(row => {
          if (row.activeStatus === 'Active') {
            return { ...row, yourIncentives: row.incentive };
          }
          return row;
        });

        setData(adjustedData);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const grantTotalIncentives = data.reduce((total, row) => total + row.incentive, 0);

  const grantTotalYourIncentives = data
    .filter(row => row.activeStatus === 'Active')
    .reduce((total, row) => total + row.yourIncentives, 0);

  const grantTotalLossIncentives = grantTotalIncentives - grantTotalYourIncentives;

  const handleMouseOver = (event) => {
    const tableData = event.currentTarget;
    const tooltip = tableData.querySelector('.tooltip');
    const tooltiptext = tableData.querySelector('.tooltiptext');

    if (tooltip && tooltiptext) {
      const textOverflowing = tableData.offsetWidth < tableData.scrollWidth || tableData.offsetHeight < tableData.scrollHeight;
      if (textOverflowing) {
        const rect = tableData.getBoundingClientRect();
        tooltip.style.top = `${rect.top - 10}px`;
        tooltip.style.left = `${rect.left + rect.width / 100}px`;
        tooltip.style.visibility = 'visible';
      } else {
        tooltip.style.visibility = 'hidden';
      }
    }
  };

  const handleMouseOut = (event) => {
    const tooltip = event.currentTarget.querySelector('.tooltip');
    if (tooltip) {
      tooltip.style.visibility = 'hidden';
    }
  };

  return (
    <div className="container-after1">
      <div className="attendanceTableData">
      <table className="attendance-table">
      <thead>
        <tr className='attendancerows-head'>
          <th className='attendanceheading'>Candidate ID</th>
          <th className='attendanceheading'> Candidate Name</th>
          <th className='attendanceheading'>Company Name</th>
          <th className='attendanceheading'>Job ID</th>
          <th className='attendanceheading'>Position</th>
          <th className='attendanceheading'>Join Date</th>
          <th className='attendanceheading'>Last Call Date</th>
          <th className='attendanceheading'>After 90 Days Date</th>
          <th className='attendanceheading'>Candidate Incentive</th>
          <th className='attendanceheading'>Candidate Status</th>
          <th className='attendanceheading'>Your Incentive</th>
          <th className='attendanceheading'>Incentive Received/Not</th>
        </tr>
      </thead>
      <tbody>
        {data.map((row, index) => (
          <tr key={row.id} className='attendancerows' >
            <td className='tabledata'>{row.candidateId}</td>
            <td className='tabledata'>{row.candidateName}</td>
            <td className='tabledata'>{row.requirementCompany}</td>
            <td className='tabledata'>{row.requirementId}</td>
            <td className='tabledata'>{row.jobDesignation}</td>
            <td className='tabledata'>{row.joinDate}</td>
            <td className='tabledata'>{row.callDate}</td>
            <td className='tabledata'>{row.after90DaysDate}</td>
            <td className='tabledata'>{row.incentive}</td>
            <td className='tabledata'>{row.activeStatus}</td>
            <td className='tabledata'>{row.yourIncentives}</td>
            <td className='tabledata'>{row.Incentive_Received_Not}</td>
          </tr>
        ))}
        <tr className='attendancerows'>
          <td colSpan="9" style={{ textAlign: "left" }} className='tabledata'>Grant Total Incentives</td>
          <td colSpan="3" style={{ textAlign: "left" }} className='tabledata'>{grantTotalIncentives}</td>
        </tr>
        <tr className="total-row">
          <td colSpan="9" style={{ textAlign: "left" }} className='tabledata'>Grant Total Loss Incentives</td>
          <td colSpan="3" style={{ textAlign: "left" }} className='tabledata'>{grantTotalLossIncentives}</td>
        </tr>
        <tr className="total-row">
          <td colSpan="9" style={{ textAlign: "left" }} className='tabledata'>Grant Total Your Incentives</td>
          <td colSpan="3" style={{ textAlign: "left" }} className='tabledata'>{grantTotalYourIncentives}</td>
        </tr>
      </tbody>
    </table>
      </div>
    </div>
  );
};

export default Incentive;
