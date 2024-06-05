import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { fetchMasterSheetData, fetchResumeFile } from "../api/api";

const MasterSheet = () => {
    const [data, setData] = useState([]);
    const [error, setError] = useState("");

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const data = await fetchMasterSheetData();
            setData(data);
            setError("");
        } catch (error) {
            setError("Error fetching data.");
        }
    };

    const handleViewFile = async (fileUrl) => {
        try {
            const fileURL = await fetchResumeFile(fileUrl);
            window.open(fileURL);
        } catch (error) {
            console.error("Error fetching file:", error);
        }
    };

    return (
        <div className="container mt-5">
            <h2> Master Sheet</h2>
            {error && <div className="alert alert-danger">{error}</div>}
            <div className="table-responsive">
                <table className="table table-bordered">
                    <thead>
                        <tr>
                            <th>Candidate ID</th>
                            <th>Alternate Number</th>
                            <th>Calling Feedback</th>
                            <th>Candidate Email</th>
                            <th>Candidate Name</th>
                            <th>Communication Rating</th>
                            <th>Contact Number</th>
                            <th>Current Location</th>
                            <th>Date</th>
                            <th>Position</th>
                            <th>Recruiter Name</th>
                            <th>Requirement Company</th>
                            <th>Requirement ID</th>
                            <th>Select Yes or No</th>
                            <th>Source Name</th>
                            <th>Emp ID</th>
                            <th>Line Up ID</th>
                            <th>Availability for Interview</th>
                            <th>Company Name</th>
                            <th>Current CTC</th>
                            <th>Date of Birth</th>
                            <th>Expected CTC</th>
                            <th>Extra Certification</th>
                            <th>Feedback</th>
                            <th>Final Status</th>
                            <th>Gender</th>
                            <th>Holding Any Offer</th>
                            <th>Message for Team Leader</th>
                            <th>Notice Period</th>
                            <th>Qualification</th>
                            <th>Resume</th>
                            <th>Total Experience</th>
                            <th>Year of Passing</th>
                            <th>Interview Time</th>
                            <th>Response Update ID</th>
                            <th>Interview Response</th>
                            <th>Interview Round</th>
                            <th>Next Interview Date</th>
                            <th>Response Updated Date</th>
                            <th>Next Interview Timing</th>
                            <th>Details ID</th>
                            <th>Mail Received</th>
                            <th>Aadhaar Card</th>
                            <th>PAN Card</th>
                            <th>Driving License</th>
                            <th>Degree Mark Sheet</th>
                            <th>HSC Mark Sheet</th>
                            <th>SSC Mark Sheet</th>
                            <th>Offer Letter Received</th>
                            <th>Offer Letter Accepted</th>
                            <th>Reason for Rejection Offer Letter</th>
                            <th>Join Status</th>
                            <th>Reason for Not Join</th>
                            <th>Join Date</th>
                            <th>Inquiry ID</th>
                            <th>Active Status</th>
                            <th>Any Problem</th>
                            <th>Call Date</th>
                            <th>Daily Impact</th>
                            <th>Inactive Reason</th>
                            <th>Office Environment</th>
                            <th>Staff Behavior</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((entry, index) => (

                            <tr key={index}>
                                {entry.slice(0, 42).map((cell, cellIndex) => (
                                    <td key={cellIndex}>{cell}</td>
                                ))}

                                {[42, 43, 44, 45, 46, 47].map((fileIndex) => (
                                    <td key={fileIndex}>
                                        <button
                                            className="btn btn-primary"
                                            onClick={() => handleViewFile(entry[fileIndex])}
                                        >
                                            View
                                        </button>
                                    </td>
                                ))}

                                {entry.slice(48).map((cell, cellIndex) => (
                                    <td key={42 + cellIndex}>{cell}</td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MasterSheet;
