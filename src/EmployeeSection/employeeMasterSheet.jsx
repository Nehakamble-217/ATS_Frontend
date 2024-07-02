import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Modal, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { fetchEmployeeMasterSheet, fetchFile } from "../api/api";

const EmployeeMasterSheet = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [fileUrl, setFileUrl] = useState("");

  const { employeeId } = useParams();

  const [fetchEmployeeNameID, setFetchEmployeeNameID] = useState(null);
  const [showShareButton, setShowShareButton] = useState(true);
  const [selectedEmployeeId, setSelectedEmployeeId] = useState(null);
  const [selectedRows, setSelectedRows] = useState([]);
  const [allSelected, setAllSelected] = useState(false); // New state to track if all rows are selected
  const [showForwardPopup, setShowForwardPopup] = useState(false);

  useEffect(() => {
    fetchData();
    fetchEmployeeNameAndID();
  }, []);

  const fetchEmployeeNameAndID = async () => {
    try {
      const response = await fetch(
        `http://192.168.1.42:8891/api/ats/157industries/names-and-ids`
      );
      const data = await response.json();
      setFetchEmployeeNameID(data);
    } catch (error) {
      console.error("Error fetching shortlisted data:", error);
    }
  };

  const fetchData = async () => {
    try {
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

  const handleSelectAll = () => {
    if (allSelected) {
      setSelectedRows([]);
    } else {
      const allRowIds = data.map((item) => item.candidateId);
      setSelectedRows(allRowIds);
    }
    setAllSelected(!allSelected);
  };

  const handleSelectRow = (candidateId) => {
    setSelectedRows((prevSelectedRows) => {
      if (prevSelectedRows.includes(candidateId)) {
        return prevSelectedRows.filter((id) => id !== candidateId);
      } else {
        return [...prevSelectedRows, candidateId];
      }
    });
  };

  const forwardSelectedCandidate = (e) => {
    e.preventDefault();
    if (selectedRows.length > 0) {
      setShowForwardPopup(true);
    }
  };

  const handleShare = async () => {
    if (selectedEmployeeId && selectedRows.length > 0) {
      const url = `http://192.168.1.42:8891/api/ats/157industries/updateEmployeeIds`; // Replace with your actual API endpoint

      const requestData = {
        employeeId: selectedEmployeeId,
        candidateIds: selectedRows,
      };

      const requestOptions = {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          // Add any additional headers as needed
        },
        body: JSON.stringify(requestData),
      };

      try {
        const response = await fetch(url, requestOptions);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        // Handle success response
        console.log("Candidates forwarded successfully!");
        setShowForwardPopup(false); // Close the modal or handle any further UI updates

        // Optionally, you can fetch updated data after successful submission
        // fetchShortListedData(); // Uncomment this if you want to refresh the data after forwarding
      } catch (error) {
        console.error("Error while forwarding candidates:", error);
        // Handle error scenarios or show error messages to the user
      }
    }
  };

  return (
    <div className="App-after">
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems:"center",
          padding: "10px",
        }}
      >
        <div></div>
        {showShareButton ? (
          <button className="lineUp-share-btn" onClick={() => setShowShareButton(false)}>Share</button>
        ) : (
          <div style={{ display: "flex", gap: "5px" }}>
            <button className="lineUp-share-btn" onClick={() => setShowShareButton(true)}>Close</button>
            <button className="lineUp-share-btn" onClick={handleSelectAll}>
              {allSelected ? "Deselect All" : "Select All"}
            </button>
            <button className="lineUp-share-btn" onClick={forwardSelectedCandidate}>Forward</button>
          </div>
        )}
      </div>
      {error && <div className="alert alert-danger">{error}</div>}
      <div className="attendanceTableData">
        <table className="attendance-table">
          <thead>
            <tr className="attendancerows-head">
              {!showShareButton ? (
                <th className="attendanceheading">
                  <input
                    type="checkbox"
                    onChange={handleSelectAll}
                    checked={selectedRows.length === data.length}
                    name="selectAll"
                  />
                </th>
              ) : null}
              <th className="attendanceheading">Candidate ID</th>
              <th className="attendanceheading">Alternate Number</th>
              <th className="attendanceheading">Calling Feedback</th>
              <th className="attendanceheading">Candidate Email</th>
              <th className="attendanceheading">Candidate Name</th>
              <th className="attendanceheading">Communication Rating</th>
              <th className="attendanceheading">Contact Number</th>
              <th className="attendanceheading">Current Location</th>
              <th className="attendanceheading">Date</th>
              <th className="attendanceheading">Position</th>
              <th className="attendanceheading">Recruiter Name</th>
              <th className="attendanceheading">Requirement Company</th>
              <th className="attendanceheading">Requirement ID</th>
              <th className="attendanceheading">Select Yes or No</th>
              <th className="attendanceheading">Source Name</th>
              <th className="attendanceheading">Emp ID</th>
              <th className="attendanceheading">Line Up ID</th>
              <th className="attendanceheading">Added Time</th>
              <th className="attendanceheading">Full Address</th>
              <th className="attendanceheading">Incentive</th>
              <th className="attendanceheading">Availability for Interview</th>
              <th className="attendanceheading">Company Name</th>
              <th className="attendanceheading">Date of Birth</th>
              <th className="attendanceheading">Extra Certification</th>
              <th className="attendanceheading">Feedback</th>
              <th className="attendanceheading">Final Status</th>
              <th className="attendanceheading">Gender</th>
              <th className="attendanceheading">Holding Any Offer</th>
              <th className="attendanceheading">Message for Team Leader</th>
              <th className="attendanceheading">Notice Period</th>
            
              <th className="attendanceheading">Qualification</th>
              <th className="attendanceheading">Resume</th>
              <th className="attendanceheading">Year of Passing</th>
              <th className="attendanceheading">Interview Time</th>
              <th className="attendanceheading">Experince In Year</th>
              <th className="attendanceheading">Experince In Month</th>

              <th className="attendanceheading">Current CTC Lakh</th>
              <th className="attendanceheading">Current CTC Thousand</th>
              <th className="attendanceheading">Expected CTC Lakh</th>
              <th className="attendanceheading">Expected CTC Thousand</th>
              <th className="attendanceheading">Offer Letter Msg</th>
              <th className="attendanceheading">Relevant Experince</th>
         
              <th className="attendanceheading">Response Update ID</th>
              <th className="attendanceheading">Interview Response</th>
              <th className="attendanceheading">Interview Round</th>
              <th className="attendanceheading">Next Interview Date</th>
              <th className="attendanceheading">Response Updated Date</th>
              <th className="attendanceheading">Next Interview Timing</th>

              <th className="attendanceheading">Details ID</th>
              <th className="attendanceheading">Mail Received</th>

              <th className="attendanceheading">Aadhaar Card</th>
              <th className="attendanceheading">PAN Card</th>
              <th className="attendanceheading">Driving License</th>
              <th className="attendanceheading">Degree Mark Sheet</th>
              <th className="attendanceheading">HSC Mark Sheet</th>
              <th className="attendanceheading">SSC Mark Sheet</th>

              <th className="attendanceheading">Offer Letter Received</th>
              <th className="attendanceheading">Offer Letter Accepted</th>
              <th className="attendanceheading">
                Reason for Rejection Offer Letter
              </th>
              <th className="attendanceheading">Join Status</th>
              <th className="attendanceheading">Reason for Not Join</th>
              <th className="attendanceheading">Join Date</th>
              
              <th className="attendanceheading">Inquiry ID</th>
              <th className="attendanceheading">Active Status</th>
              <th className="attendanceheading">Any Problem</th>
              <th className="attendanceheading">Call Date</th>
              <th className="attendanceheading">Daily Impact</th>
              <th className="attendanceheading">Inactive Reason</th>
              <th className="attendanceheading">Office Environment</th>
              <th className="attendanceheading">Staff Behavior</th>
            </tr>
          </thead>
          <tbody>
            {data.map((entry, index) => (
              <tr key={index} className="attendancerows">
                {!showShareButton ? (
                  <td className="tabledata">
                    <input
                      type="checkbox"
                      checked={selectedRows.includes(entry.candidateId)}
                      onChange={() => handleSelectRow(entry.candidateId)}
                    />
                  </td>
                ) : null}

                {entry.slice(0, 42).map((cell, cellIndex) => (
                  <td className="tabledata" key={cellIndex}>
                    {cell}
                  </td>
                ))}
                {[42, 43, 44, 45, 46, 47].map((fileIndex) => (
                  <td className="tabledata" key={fileIndex}>
      
                  </td>
                ))}
                {entry.slice(48).map((cell, cellIndex) => (
                  <td className="tabledata" key={42 + cellIndex}>
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
        {showForwardPopup ? (
          <>
            <div
              className="bg-black bg-opacity-50 modal show"
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                position: "fixed",
                width: "100%",
                height: "100vh",
              }}
            >
              <Modal.Dialog
                style={{
                  width: "500px",
                  height: "800px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginTop: "100px",
                }}
              >
                <Modal.Header
                  style={{ fontSize: "18px", backgroundColor: "#f2f2f2" }}
                >
                  Forward To
                </Modal.Header>
                <Modal.Body
                  style={{
                    display: "grid",
                    gap: "10px",
                    gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
                    backgroundColor: "#f2f2f2",
                  }}
                >
                  {fetchEmployeeNameID.map((item) => (
                    <>
                      <div
                        key={`${item[0]}`}
                        className=""
                        style={{
                          display: "flex",
                          gap: "20px",
                          columnSpan: "span 1 / span 1",
                        }}
                      >
                        <input
                          type="radio"
                          id={`${item[0]}`}
                          name="forward"
                          value={`${item[0]}`}
                          onChange={(e) =>
                            setSelectedEmployeeId(e.target.value)
                          }
                        />
                        <label htmlFor={`${item[0]}`}>{item[1]}</label>
                      </div>
                    </>
                  ))}
                </Modal.Body>
                <Modal.Footer style={{ backgroundColor: "#f2f2f2" }}>
                  <button
                    onClick={handleShare}
                    className="close-profile-popup-btn"
                  >
                    Share
                  </button>
                  <button
                    onClick={() => setShowForwardPopup(false)}
                    className="close-profile-popup-btn"
                  >
                    Close
                  </button>
                </Modal.Footer>
              </Modal.Dialog>
            </div>
          </>
        ) : null}
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
              style={{ width: "100%", height: "500px" }}
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
