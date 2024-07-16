
import React, { useEffect, useState } from 'react';
import CallingTrackerForm from '../EmployeeSection/CallingTrackerForm';
import "../Excel/resumeList.css"
import { useParams } from 'react-router-dom';

const ResumeList = ({ handleUpdate }) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const {employeeId}=useParams()
    console.log(employeeId +"empId in resume List");

    const [selectedCandidateId, setSelectedCandidateId] = useState();

    useEffect(() => {
        const fetchData = async () => {
            try {

                const response = await fetch('http://192.168.1.46:9090/api/ats/157industries/all-resumes-data'); // Replace with your API URL

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const result = await response.json();
                setData(result);
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);



    const handleUpdateSuccess = () => {
        // Assuming `employeeId` is a known variable or prop
        fetch(

            `http://192.168.1.46:9090/api/ats/157industries/callingData/${employeeId}`

        )
            .then((response) => response.json())
            .then((data) => {
                setCallingList(data);
                setFilteredCallingList(data);
                setSelectedCandidateId(null); // Hide CallingTrackerForm after success
            })
            .catch((error) => console.error("Error fetching data:", error));
    };

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

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    return (

        <>

            <div className="table-container">
                <h1 className="resume-data-heading">Resume Data</h1>
                <div className="attendanceTableData">
                    <table className="attendance-table">
                        <thead>
                            <tr className='attendancerows-head'>
                                <th className='attendanceheading'>Sr No</th>

                                <th className='attendanceheading'>Candidate Name</th>
                                <th className='attendanceheading'>Contact Number</th>
                                <th className='attendanceheading'>Alternate Number</th>
                                <th className='attendanceheading'>Candidate Email</th>
                                <th className='attendanceheading'>Education</th>
                                <th className='attendanceheading'>Experience</th>
                                <th className='attendanceheading'>Current Location</th>
                                <th className="attendanceheading">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((item, index) => (
                                <tr key={item.id} className='attendancerows'>
                                    <td className='tabledata' onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>{index + 1} <div className="tooltip">
                                        <span className="tooltiptext">{index + 1}</span>
                                    </div></td>
                                    <td hidden className='tabledata' onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>{item.id} <div className="tooltip">
                                        <span className="tooltiptext">{item.id}</span>
                                    </div></td>
                                    <td className='tabledata' onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>{item.name} <div className="tooltip">
                                        <span className="tooltiptext">{item.name}</span>
                                    </div></td>
                                    <td className='tabledata' onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>{item.phone} <div className="tooltip">
                                        <span className="tooltiptext">{item.phone}</span>
                                    </div></td>
                                    <td className='tabledata' onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>{item.phone} <div className="tooltip">
                                        <span className="tooltiptext">{item.phone}</span>
                                    </div></td>
                                    <td className='tabledata' onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>{item.email}<div className="tooltip">
                                        <span className="tooltiptext">{item.email}</span>
                                    </div></td>

                                    <td className='tabledata' onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>{item.education}<div className="tooltip">
                                        <span className="tooltiptext">{item.education}</span>
                                    </div></td>

                                    <td className='tabledata' onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>{item.experience}<div className="tooltip">
                                        <span className="tooltiptext">{item.experience}</span>
                                    </div></td>

                                    <td className='tabledata' onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>{item.location}<div className="tooltip">
                                        <span className="tooltiptext">{item.location}</span>
                                    </div></td>

                                    <td className="tabledata" style={{ textAlign: "center" }}>
                                        <i onClick={() => handleUpdate(item.candidateId)} className="fa-regular fa-pen-to-square"></i>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                {selectedCandidateId && (
                    <CallingTrackerForm
                        candidateData={selectedCandidateId}
                        onClose={() => setSelectedCandidateId(null)}
                        onSuccess={handleUpdateSuccess}
                    />
                )}
            </div>
        </>
    );
};

export default ResumeList;

