/* SwapnilRokade_UpdateResponsePage_05/07 */
// SwapnilRokade_UpdateResponsePage_UsingLineupListcomponantcss_&_updateResponseFormAdded_With_Functionality_08/07 
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
        `http://192.168.1.48:8891/api/ats/157industries/fetch-all-shortlisted-data`
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
  const handleMouseOver = (event) => {
    const tableData = event.currentTarget;
    const tooltip = tableData.querySelector(".tooltip");
    const tooltiptext = tableData.querySelector(".tooltiptext");

    if (tooltip && tooltiptext) {
      const textOverflowing =
        tableData.offsetWidth < tableData.scrollWidth ||
        tableData.offsetHeight < tableData.scrollHeight;
      if (textOverflowing) {
        const rect = tableData.getBoundingClientRect();
        tooltip.style.top = `${rect.top - 10}px`;
        tooltip.style.left = `${rect.left + rect.width / 100}px`;
        tooltip.style.visibility = "visible";
      } else {
        tooltip.style.visibility = "hidden";
      }
    }
  };

  const handleMouseOut = (event) => {
    const tooltip = event.currentTarget.querySelector(".tooltip");
    if (tooltip) {
      tooltip.style.visibility = "hidden";
    }
  };

  return (
    <div className="TeamLead-main">
      {!showUpdateResponseFrom ? (
        <>
          <div className="TeamLead-main-filter-section">
            {/* Add Filter Here */}
            <h1>Add Filter Here....</h1>
          </div>
          <div className="attendanceTableData">
            <table className="attendance-table">
              <thead>
                <tr className="attendancerows-head">
                  <th className="attendanceheading">Candidate ID</th>
                  <th className="attendanceheading">Candidate Name</th>
                  <th className="attendanceheading">Candidate Email</th>
                  <th className="attendanceheading">Contact Number</th>
                  <th className="attendanceheading">Requirement ID</th>
                  <th className="attendanceheading">Requirement Company</th>
                  <th className="attendanceheading">Job Designation</th>
                  <th className="attendanceheading">Comment for TL</th>
                  <th className="attendanceheading">Final Status</th>
                  <th className="attendanceheading">Interview Round</th>
                  <th className="attendanceheading">Interview Response</th>
                  <th className="attendanceheading">Response Updated Date</th>
                  <th className="attendanceheading">Next Interview Date</th>
                  <th className="attendanceheading">Next Interview Timing</th>
                  <th className="attendanceheading">Employee ID</th>
                  <th className="attendanceheading">Employee Name</th>
                  <th className="attendanceheading">Official Mail</th>
                  <th className="attendanceheading">Job Role</th>
                  <th className="attendanceheading">View Resume</th>
                  <th className="attendanceheading">Reporting Manager Name</th>
                  <th className="attendanceheading">Action</th>
                </tr>
              </thead>
              <tbody>
                {updateResponseList.map((data, index) => (
                  <tr key={index} className="attendancerows">
                    <td className="tabledata">{data.candidateId}</td>
                    <td
                      className="tabledata"
                      onMouseOver={handleMouseOver}
                      onMouseOut={handleMouseOut}
                    >
                      {data.candidateName || "-"}
                      <div className="tooltip">
                        <span className="tooltiptext">
                          {data.candidateName}
                        </span>
                      </div>
                    </td>
                    <td
                      className="tabledata"
                      onMouseOver={handleMouseOver}
                      onMouseOut={handleMouseOut}
                    >
                      {data.candidateEmail || "-"}
                      <div className="tooltip">
                        <span className="tooltiptext">
                          {data.candidateEmail}
                        </span>
                      </div>
                    </td>
                    <td className="tabledata">{data.contactNumber}</td>
                    <td className="tabledata">{data.requirementId}</td>
                    <td
                      className="tabledata"
                      onMouseOver={handleMouseOver}
                      onMouseOut={handleMouseOut}
                    >
                      {data.requirementCompany || "-"}
                      <div className="tooltip">
                        <span className="tooltiptext">
                          {data.requirementCompany }
                        </span>
                      </div>
                    </td>
                    <td className="tabledata"  onMouseOver={handleMouseOver}
                      onMouseOut={handleMouseOut}
                    >
                      {data.jobDesignation || "-"}
                      <div className="tooltip">
                        <span className="tooltiptext">
                          {data.jobDesignation}
                        </span>
                      </div>
                      </td>
                    <td className="tabledata">{data.commentForTL || "-"}
                    <div className="tooltip"  onMouseOver={handleMouseOver}
                      onMouseOut={handleMouseOut}
                     >
                        <span className="tooltiptext">
                          {data.commentForTL}
                        </span>
                      </div>
                    </td>
                    <td className="tabledata"  onMouseOver={handleMouseOver}
                      onMouseOut={handleMouseOut}
                    >{data.finalStatus || "-"}
                    <div className="tooltip">
                        <span className="tooltiptext">
                          {data.finalStatus}
                        </span>
                      </div>

                    </td>
                    <td className="tabledata"  onMouseOver={handleMouseOver}
                      onMouseOut={handleMouseOut}
                    >{data.interviewRound || "-"}
                    <div className="tooltip">
                        <span className="tooltiptext">
                          {data.interviewRound}
                        </span>
                      </div>

                    </td>
                    <td className="tabledata"  onMouseOver={handleMouseOver}
                      onMouseOut={handleMouseOut}
                    >{data.interviewResponse || "-"}
                    <div className="tooltip">
                        <span className="tooltiptext">
                          {data.interviewResponse}
                        </span>
                      </div>
                    </td>
                    <td className="tabledata"  onMouseOver={handleMouseOver}
                      onMouseOut={handleMouseOut}
                    >{data.responseUpdatedDate || "-"}
                    <div className="tooltip">
                        <span className="tooltiptext">
                          {data.responseUpdatedDate}
                        </span>
                      </div>
                    </td>
                    <td className="tabledata">{data.nextInterviewDate}</td>
                    <td className="tabledata">{data.nextInterviewTiming}</td>
                    <td className="tabledata">{data.employeeId}</td>
                    <td className="tabledata">{data.employeeName}</td>
                    <td className="tabledata"  onMouseOver={handleMouseOver}
                      onMouseOut={handleMouseOut}
                    >{data.officialMail || "-"}
                    <div className="tooltip">
                        <span className="tooltiptext">
                          {data.officialMail}
                        </span>
                      </div>
                    </td>
                    <td className="tabledata">{data.jobRole}</td>
                    <td className="tabledata">
                      <button
                        className="text-secondary"
                        onClick={() => openResumeModal(data.resume)}
                      >
                        <i className="fas fa-eye"></i>
                      </button>
                    </td>
                    <td className="tabledata">{data.reportingManagerName}</td>
                    <td className=" TeamLead-main-table-td">
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
                  src={convertToDocumentLink(
                    selectedCandidateResume,
                    "Resume.pdf"
                  )}
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
          <Modal
            show={showUpdateResponseFrom}
            onHide={closeUpdateForm}
            size="xl"
            centered
          >
            <Modal.Body>
              <div className="TeamLead-main-table-container">
                <UpdateResponseFrom
                  candidateId={showUpdateResponseID}
                  onClose={closeUpdateForm}
                />
              </div>
            </Modal.Body>
          </Modal>
        </>
      )}
    </div>
  );
};

export default UpdateResponse;
