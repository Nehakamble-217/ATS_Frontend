import React, { useState, useEffect } from "react";
import axios from "axios";
import { Modal, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { fetchEmployeeMasterSheet, fetchFile } from "../api/api"; // Adjust the path if needed

const EmployeeMasterSheet = () => {
    const [data, setData] = useState([]);
    const [error, setError] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [fileUrl, setFileUrl] = useState("");

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const employeeId = 6; // Set your employeeId here
            const responseData = await fetchEmployeeMasterSheet(employeeId);
            setData(responseData);
            setError("");
        } catch (error) {
            console.error("Error fetching data:", error);
            setError("Error fetching data.");
        }
    };

    const handleViewFile = async (url) => {
        if (!url) {
            setError("Invalid file URL");
            return;
        }

        try {
            const fileData = await fetchFile(url);
            const file = new Blob([fileData], { type: "application/pdf" });
            const fileURL = URL.createObjectURL(file);
            setFileUrl(fileURL);
            setShowModal(true);
        } catch (error) {
            console.error("Error fetching file:", error);
            setError("Error fetching file.");
        }
    };

    const handleCloseModal = () => {
        setShowModal(false);
        if (fileUrl) {
            URL.revokeObjectURL(fileUrl);
            setFileUrl("");
        }
    };


    return (
        <div className="App-after">
             <h5 style={{color:"gray",paddingTop:"5px"}}>Employee Master Sheet</h5>
            {error && <div className="alert alert-danger">{error}</div>}
            <div className="attendanceTableData">
                <table className="attendance-table">
                    <thead>
                        <tr  className="attendancerows-head">
                           <th className='attendanceheading'>Candidate ID</th>
                            <th className='attendanceheading'>Alternate Number</th>
                            <th className='attendanceheading'>Calling Feedback</th>
                            
                            <th className='attendanceheading'>Candidate Email</th>
                            <th className='attendanceheading'>Candidate Name</th>
                            <th className='attendanceheading'>Communication Rating</th>
                            <th className='attendanceheading'>Contact Number</th>
                            <th className='attendanceheading'>Current Location</th>
                            <th className='attendanceheading'>Date</th>
                            <th className='attendanceheading'>Position</th>
                            <th className='attendanceheading'>Recruiter Name</th>
                            <th className='attendanceheading'>Requirement Company</th>
                            <th className='attendanceheading'>Requirement ID</th>
                            <th className='attendanceheading'>Select Yes or No</th>
                            <th className='attendanceheading'>Source Name</th>
                            <th className='attendanceheading'>Emp ID</th>
                            <th className='attendanceheading'>Line Up ID</th>
                            <th className='attendanceheading'>Availability for Interview</th>
                            <th className='attendanceheading'>Company Name</th>
                            <th className='attendanceheading'>Current CTC</th>
                            <th className='attendanceheading'>Date of Birth</th>
                            <th className='attendanceheading'>Expected CTC</th>
                            <th className='attendanceheading'>Extra Certification</th>
                            <th className='attendanceheading'>Feedback</th>
                            <th className='attendanceheading'>Final Status</th>
                            <th className='attendanceheading'>Gender</th>
                            <th className='attendanceheading'>Holding Any Offer</th>
                            <th className='attendanceheading'>Message for Team Leader</th>
                            <th className='attendanceheading'>Notice Period</th>
                            <th className='attendanceheading'>Qualification</th>
                            <th className='attendanceheading'>Resume</th>
                            <th className='attendanceheading'>Total Experience</th>
                            <th className='attendanceheading'>Year of Passing</th>
                            <th className='attendanceheading'>Interview Time</th>
                            <th className='attendanceheading'>Response Update ID</th>
                            <th className='attendanceheading'>Interview Response</th>
                            <th className='attendanceheading'>Interview Round</th>
                            <th className='attendanceheading'>Next Interview Date</th>
                            <th className='attendanceheading'>Response Updated Date</th>
                            <th className='attendanceheading'>Next Interview Timing</th>
                            <th className='attendanceheading'>Details ID</th>
                            <th className='attendanceheading'>Mail Received</th>
                            <th className='attendanceheading'>Aadhaar Card</th>
                            <th className='attendanceheading'>PAN Card</th>
                            <th className='attendanceheading'>Driving License</th>
                            <th className='attendanceheading'>Degree Mark Sheet</th>
                            <th className='attendanceheading'>HSC Mark Sheet</th>
                            <th className='attendanceheading'>SSC Mark Sheet</th>
                            <th className='attendanceheading'>Offer Letter Received</th>
                            <th className='attendanceheading'>Offer Letter Accepted</th>
                            <th className='attendanceheading'>Reason for Rejection Offer Letter</th>
                            <th className='attendanceheading'>Join Status</th>
                            <th className='attendanceheading'>Reason for Not Join</th>
                            <th className='attendanceheading'>Join Date</th>
                            <th className='attendanceheading'>Inquiry ID</th>
                            <th className='attendanceheading'>Active Status</th>
                            <th className='attendanceheading'>Any Problem</th>
                            <th className='attendanceheading'>Call Date</th>
                            <th className='attendanceheading'>Daily Impact</th>
                            <th className='attendanceheading'>Inactive Reason</th>
                            <th className='attendanceheading'>Office Environment</th>
                            <th className='attendanceheading'>Staff Behavior</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((entry, index) => (
                            <tr key={index} className='attendancerows'>
                                {entry.slice(0, 42).map((cell, cellIndex) => (
                                    <td className="tabledata" key={cellIndex}>{cell}</td>
                                ))}
                                {[42, 43, 44, 45, 46, 47].map((fileIndex) => (
                                    <td className="tabledata" key={fileIndex}>
                                        <button
                                            className="btn btn-primary"
                                            onClick={() => handleViewFile(entry[fileIndex])}
                                        >
                                            View
                                        </button>
                                    </td>
                                ))}
                                {entry.slice(48).map((cell, cellIndex) => (
                                    <td className="tabledata" key={42 + cellIndex}>{cell}</td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <Modal show={showModal} onHide={handleCloseModal} centered size="lg">
                <Modal.Header closeButton>
                    <Modal.Title>View File</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {fileUrl ? (
                        <iframe
                            src={fileUrl}
                            title="PDF File"
                            style={{ width: '100%', height: '500px' }}
                        />
                    ) : (
                        <p>No file to display</p>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModal}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default EmployeeMasterSheet;
