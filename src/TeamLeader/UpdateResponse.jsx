/* SwapnilRokade_UpdateResponsePage_05/07 */

import React, { useEffect, useState } from "react";
import "./UpdateResponse.css";
import { Button, Modal } from "react-bootstrap";
import UpdateResponseFrom from "./UpdateResponseFrom";

const UpdateResponse = () => {
  const [updateResponseList, setUpdateResponseList] = useState([]);
  const [showUpdateResponseFrom, setShowUpdateResponseFrom] = useState(false);
  const [showUpdateResponseID, setShowUpdateResponseID] = useState();

  useEffect(() => {
    fetchUpdateResponseList();
  }, []);

  const fetchUpdateResponseList = async () => {
    try {
      const res = await fetch(
        `http://192.168.1.46:8891/api/ats/157industries/fetch-all-shortlisted-data`
      );
      const data = await res.json();
      setUpdateResponseList(data);
    } catch (err) {
      console.log("Error fetching shortlisted data:", err);
    }
  };

  const convertToDocumentLink = (byteCode, fileName) => {
    if (byteCode) {
      try {
        // Detect file type based on file name extension or content
        const fileType = fileName.split(".").pop().toLowerCase();

        // Convert PDF
        if (fileType === "pdf") {
          const binary = atob(byteCode);
          const array = new Uint8Array(binary.length);
          for (let i = 0; i < binary.length; i++) {
            array[i] = binary.charCodeAt(i);
          }
          const blob = new Blob([array], { type: "application/pdf" });
          return URL.createObjectURL(blob);
        }

        // Convert Word document (assuming docx format)
        if (fileType === "docx") {
          const binary = atob(byteCode);
          const array = new Uint8Array(binary.length);
          for (let i = 0; i < binary.length; i++) {
            array[i] = binary.charCodeAt(i);
          }
          const blob = new Blob([array], {
            type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
          });
          return URL.createObjectURL(blob);
        }

        // Handle other document types here if needed

        // If file type is not supported
        console.error(`Unsupported document type: ${fileType}`);
        return "Unsupported Document";
      } catch (error) {
        console.error("Error converting byte code to document:", error);
        return "Invalid Document";
      }
    }
    return "Document Not Found";
  };

  const [showResumeModal, setShowResumeModal] = useState(false);
  const [selectedCandidateResume, setSelectedCandidateResume] = useState("");

  const openResumeModal = (byteCode) => {
    setSelectedCandidateResume(byteCode);
    setShowResumeModal(true);
  };

  const closeResumeModal = () => {
    setSelectedCandidateResume("");
    setShowResumeModal(false);
  };

  const handleUpdateClick = (responseUpdateId) => {
    setShowUpdateResponseID(responseUpdateId);
    setShowUpdateResponseFrom(true);
  };

  const closeUpdateForm = () => {
    setShowUpdateResponseID(null);
    setShowUpdateResponseFrom(false);
  };

  return (
    <div className="TeamLead-main">
      {!showUpdateResponseFrom ? (
        <>
          <div className="TeamLead-main-filter-section">
            {/* Add Filter Here */}
            <h1>Add Filter Here....</h1>
          </div>
          <div className="TeamLead-main-table-section">
            <table className="TeamLead-main-table">
              <thead>
                <tr className="TeamLead-main-table-tr">
                  <th className="TeamLead-main-table-th">Candidate ID</th>
                  <th className="TeamLead-main-table-th">Candidate Name</th>
                  <th className="TeamLead-main-table-th">Candidate Email</th>
                  <th className="TeamLead-main-table-th">Contact Number</th>
                  <th className="TeamLead-main-table-th">Requirement ID</th>
                  <th className="TeamLead-main-table-th">
                    Requirement Company
                  </th>
                  <th className="TeamLead-main-table-th">Job Designation</th>
                  <th className="TeamLead-main-table-th">Comment for TL</th>
                  <th className="TeamLead-main-table-th">Final Status</th>
                  <th className="TeamLead-main-table-th">Interview Round</th>
                  <th className="TeamLead-main-table-th">Interview Response</th>
                  <th className="TeamLead-main-table-th">
                    Response Updated Date
                  </th>
                  <th className="TeamLead-main-table-th">Next Interview Date</th>
                  <th className="TeamLead-main-table-th">
                    Next Interview Timing
                  </th>
                  <th className="TeamLead-main-table-th">Employee ID</th>
                  <th className="TeamLead-main-table-th">Employee Name</th>
                  <th className="TeamLead-main-table-th">Official Mail</th>
                  <th className="TeamLead-main-table-th">Job Role</th>
                  <th className="TeamLead-main-table-th">View Resume</th>
                  <th className="TeamLead-main-table-th">
                    Reporting Manager Name
                  </th>
                  <th className="TeamLead-main-table-th">Action</th>
                </tr>
              </thead>
              <tbody>
                {updateResponseList.map((data) => (
                  <tr
                    key={data.responseUpdateId}
                    className="TeamLead-main-table-tr"
                  >
                    <td className="TeamLead-main-table-td">
                      {data.candidateId}
                    </td>
                    <td className="TeamLead-main-table-td">
                      {data.candidateName}
                    </td>
                    <td className="TeamLead-main-table-td">
                      {data.candidateEmail}
                    </td>
                    <td className="TeamLead-main-table-td">
                      {data.contactNumber}
                    </td>
                    <td className="TeamLead-main-table-td">
                      {data.requirementId}
                    </td>
                    <td className="TeamLead-main-table-td">
                      {data.requirementCompany}
                    </td>
                    <td className="TeamLead-main-table-td">
                      {data.jobDesignation}
                    </td>
                    <td className="TeamLead-main-table-td">
                      {data.commentForTL}
                    </td>
                    <td className="TeamLead-main-table-td">{data.finalStatus}</td>
                    <td className="TeamLead-main-table-td">
                      {data.interviewRound}
                    </td>
                    <td className="TeamLead-main-table-td">
                      {data.interviewResponse}
                    </td>
                    <td className="TeamLead-main-table-td">
                      {data.responseUpdatedDate}
                    </td>
                    <td className="TeamLead-main-table-td">
                      {data.nextInterviewDate}
                    </td>
                    <td className="TeamLead-main-table-td">
                      {data.nextInterviewTiming}
                    </td>
                    <td className="TeamLead-main-table-td">{data.employeeId}</td>
                    <td className="TeamLead-main-table-td">{data.employeeName}</td>
                    <td className="TeamLead-main-table-td">{data.officialMail}</td>
                    <td className="TeamLead-main-table-td">{data.jobRole}</td>
                    <td className="TeamLead-main-table-td">
                      <button
                        className="text-secondary"
                        onClick={() => openResumeModal(data.resume)}
                      >
                        <i className="fas fa-eye"></i>
                      </button>
                    </td>
                    <td className="TeamLead-main-table-td">
                      {data.reportingManagerName}
                    </td>
                    <td className="TeamLead-main-table-td">
                      <button
                        className="TeamLead-main-table-button"
                        onClick={() => handleUpdateClick(data.candidateId)}
                      >
                        Update
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <Modal show={showResumeModal} onHide={closeResumeModal} size="md">
            <Modal.Header closeButton>
              <Modal.Title>Resume</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              {selectedCandidateResume ? (
                <iframe
                  src={convertToDocumentLink(selectedCandidateResume, "Resume.pdf")}
                  width="100%"
                  height="550px"
                  title="PDF Viewer"
                ></iframe>
              ) : (
                <p>No resume available</p>
              )}
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={closeResumeModal}>
                Close
              </Button>
            </Modal.Footer>
          </Modal>
        </>
      ) : (
        <>
          <div className="TeamLead-main-table-container">
            <UpdateResponseFrom
              candidateId={showUpdateResponseID}
              onClose={closeUpdateForm}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default UpdateResponse;
