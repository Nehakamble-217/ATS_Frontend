import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './incentive.css';

const Incentive = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { workId } = useParams(); // Assuming you might use workId, adjust according to your API
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://192.168.1.34:8891/api/ats/157industries/incentives/${workId}`); // Adjust the URL as needed

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setData(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
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

  const grantTotalIncentives = data.reduce((total, row) => total + row.candidateIncentive, 0);
  const grantTotalYourIncentives = data
    .filter(row => row.candidateStatus === 'Active')
    .reduce((total, row) => total + row.yourIncentives, 0); // Changed from candidateIncentive to yourIncentives
  const grantTotalLossIncentives = data
    .filter(row => row.candidateStatus === 'Inactive')
    .reduce((total, row) => total + row.candidateIncentive, 0);

  return (
    <table className="custom-table">
      <thead>
        <tr>
          <th>Candidate ID</th>
          <th>Candidate Name</th>
          <th>Company Name</th>
          <th>Job ID</th>
          <th>Position</th>
          <th>Join Date</th>
          <th>Last Call Date</th>
          <th>After 90 Days Date</th>
          <th>Candidate Incentive</th>
          <th>Candidate Status</th>
        </tr>
      </thead>
      <tbody>
        {data.map((row, index) => (
          <tr key={row.id} className={index % 2 === 0 ? 'even-row' : 'odd-row'}>
            <td>{row.id}</td>
            <td>{row.name}</td>
            <td>{row.companyName}</td>
            <td>{row.jobId}</td>
            <td>{row.position}</td>
            <td>{row.joinDate}</td>
            <td>{row.lastCallDate}</td>
            <td>{row.after90DaysDate}</td>
            <td>{row.candidateIncentive}</td>
            <td>{row.candidateStatus}</td>
          </tr>
        ))}
        <tr className="total-row">
          <td colSpan="8">Grant Total Incentives</td>
          <td colSpan="2">{grantTotalIncentives}</td>
        </tr>
        <tr className="total-row">
          <td colSpan="8">Grant Total Loss Incentives</td>
          <td colSpan="2">{grantTotalLossIncentives}</td>
        </tr>
        <tr className="total-row">
          <td colSpan="8">Grant Total Your Incentives</td>
          <td colSpan="2">{grantTotalYourIncentives}</td>
        </tr>
      </tbody>
    </table>
  );
};

export default Incentive;
