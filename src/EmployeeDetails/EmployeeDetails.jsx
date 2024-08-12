import React, { useEffect, useState } from "react";
import axios from "axios";
import { Modal, Button, OverlayTrigger, Tooltip } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "./EmployeeDetails.css";
import UpdateEmployee from "./UpdateEmployee";
import HashLoader from "react-spinners/HashLoader";
// SwapnilRokade_UpdateEmployee_fetchingData From DataBase_16/07
const EmployeeDetails = () => {
  const [employeeData, setEmployeeData] = useState([]);
  let [color, setColor] = useState("#ffcb9b");
  const [showResumeModal, setShowResumeModal] = useState(false);
  const [selectedCandidateResume, setSelectedCandidateResume] = useState("");
  const [deletedEmployees, setDeletedEmployees] = useState([]);
  const [blockedEmployees, setBlockedEmployees] = useState([]);
  const [Loading, setLoading] = useState(true);
  const [employeeId, setEmployeeId] = useState(null);
  const [employeeRole, setEmployeeRole] = useState("");
  const [showEmployee, setShowEmployee] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://93.127.199.85:9090/api/ats/157industries/detail-for-update/870"
        );
        setEmployeeData(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleDelete = (employeeId) => {
    console.log(`Deleting employee with ID: ${employeeId}`);
    setDeletedEmployees([...deletedEmployees, employeeId]);
  };

  const handleBlock = (employeeId) => {
    console.log(`Blocking employee with ID: ${employeeId}`);
    if (blockedEmployees.includes(employeeId)) {
      setBlockedEmployees(blockedEmployees.filter((id) => id !== employeeId));
    } else {
      setBlockedEmployees([...blockedEmployees, employeeId]);
    }
  };

  const handleUpdate = (employeeId, employeerole) => {
    setEmployeeId(employeeId);
    setEmployeeRole(employeerole);
    setShowEmployee(true);
  };

  const isDeleted = (employeeId) => deletedEmployees.includes(employeeId);
  const isBlocked = (employeeId) => blockedEmployees.includes(employeeId);

  const openResumeModal = (byteCode) => {
    setSelectedCandidateResume(byteCode);
    setShowResumeModal(true);
  };

  const closeResumeModal = () => {
    setSelectedCandidateResume("");
    setShowResumeModal(false);
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

  const convertToDocumentLink = (byteCode, fileName) => {
    if (byteCode) {
      try {
        const fileType = fileName.split(".").pop().toLowerCase();

        if (fileType === "pdf") {
          const binary = atob(byteCode);
          const array = new Uint8Array(binary.length);
          for (let i = 0; i < binary.length; i++) {
            array[i] = binary.charCodeAt(i);
          }
          const blob = new Blob([array], { type: "application/pdf" });
          return URL.createObjectURL(blob);
        }

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

        console.error(`Unsupported document type: ${fileType}`);
        return "Unsupported Document";
      } catch (error) {
        console.error("Error converting byte code to document:", error);
        return "Invalid Document";
      }
    }
    return "Document Not Found";
  };

  return (
    <div className="table-container">
      {!Loading ? (
        <>
          {!showEmployee ? (
            <table className="attendance-table">
              <thead>
                <tr className="attendancerows-head">
                  <th className="attendanceheading">Employee Id</th>
                  <th className="attendanceheading">Employee Name</th>
                  <th className="attendanceheading">Employee Number</th>
                  <th className="attendanceheading">Date of Joining</th>
                  <th className="attendanceheading">Designation</th>

                  <th className="attendanceheading">Job Role</th>
                  <th className="attendanceheading">Department  </th>
                  <th className="attendanceheading">Reporting Manager Name</th>
                  <th className="attendanceheading">Resume File</th>
                  <th className="attendanceheading">Employee Status</th>
                  <th className="ActionCol">Action</th>
                </tr>
              </thead>
              <tbody>
                {employeeData.map((employee, index) => (
                  <tr key={index} className="attendancerows">

                    <td className="tabledata"
                      onMouseOver={handleMouseOver}
                      onMouseOut={handleMouseOut}>

                      {employee.id}
                      <div className="tooltip">
                        <span className="tooltiptext">{employee.id}</span>
                      </div>

                    </td>

                    <td className="tabledata"
                      onMouseOver={handleMouseOver}
                      onMouseOut={handleMouseOut}>

                      {employee.name}
                      <div className="tooltip">
                        <span className="tooltiptext">{employee.name}</span>
                      </div>

                    </td>

                    <td className="tabledata"
                      onMouseOver={handleMouseOver}
                      onMouseOut={handleMouseOut}>

                      {employee.contact}
                      <div className="tooltip">
                        <span className="tooltiptext">{employee.contact}</span>
                      </div>

                    </td>
                    <td className="tabledata"
                      onMouseOver={handleMouseOver}
                      onMouseOut={handleMouseOut}>

                      {employee.joinDate}
                      <div className="tooltip">
                        <span className="tooltiptext">{employee.joinDate}</span>
                      </div>

                    </td>

                    <td className="tabledata"
                      onMouseOver={handleMouseOver}
                      onMouseOut={handleMouseOut}>

                      {employee.designation}
                      <div className="tooltip">
                        <span className="tooltiptext">{employee.designation}</span>
                      </div>

                    </td>

                    <td className="tabledata"
                      onMouseOver={handleMouseOver}
                      onMouseOut={handleMouseOut}>

                      {employee.jobRole}
                      <div className="tooltip">
                        <span className="tooltiptext">{employee.jobRole}</span>
                      </div>

                    </td>

                    <td className="tabledata"
                      onMouseOver={handleMouseOver}
                      onMouseOut={handleMouseOut}>

                      {employee.department}
                      <div className="tooltip">
                        <span className="tooltiptext">{employee.department}</span>
                      </div>

                    </td>

                    <td className="tabledata"
                      onMouseOver={handleMouseOver}
                      onMouseOut={handleMouseOut}>

                      {employee.reportingManger}
                      <div className="tooltip">
                        <span className="tooltiptext">{employee.reportingManger}</span>
                      </div>

                    </td>

                    <td className="tabledata">
                      <button onClick={() => openResumeModal(employee.resume)}>
                        <i className="fas fa-eye"></i>
                      </button>
                    </td>
                    <td className="tabledata"
                      onMouseOver={handleMouseOver}
                      onMouseOut={handleMouseOut}>

                      {employee.status}
                      <div className="tooltip">
                        <span className="tooltiptext">{employee.status}</span>
                      </div>

                    </td>
                    <td className="tabledata">
                      <div className="emp-details-act-btn">
                        <button
                          className="action-button"
                          onClick={() => handleDelete(employee.id)}
                        >
                          {isDeleted(employee.employeeId)
                            ? "Deleted"
                            : "Delete"}
                        </button>
                        <button
                          className="action-button"
                          onClick={() => handleBlock(employee.id)}
                        >
                          {isBlocked(employee.employeeId) ? "Unblock" : "Block"}
                        </button>
                        <button
                          className="action-button"
                          onClick={() => {
                            handleUpdate(employee.id, employee.jobRole);
                          }}
                        >
                          Update
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <>
              <div>
                <UpdateEmployee id={employeeId} userType={employeeRole} />
              </div>
            </>
          )}{" "}
        </>
      ) : (
        <div className="register">
          <HashLoader
             color={`${localStorage.getItem("selectedColor")}`}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        </div>
      )}

      {/* Resume Modal */}
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
    </div>
  );
};

export default EmployeeDetails;
