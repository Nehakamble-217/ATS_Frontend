import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Modal, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import './EmployeeDetails.css';
import UpdateEmployee from './UpdateEmployee';
import HashLoader from 'react-spinners/HashLoader';
// SwapnilRokade_UpdateEmployee_fetchingData From DataBase_16/07
const EmployeeDetails = () => {
  const [employeeData, setEmployeeData] = useState([]);
  let [color, setColor] = useState("#ffcb9b");
  const [showResumeModal, setShowResumeModal] = useState(false);
  const [selectedCandidateResume, setSelectedCandidateResume] = useState("");
  const [deletedEmployees, setDeletedEmployees] = useState([]);
  const [blockedEmployees, setBlockedEmployees] = useState([]);
  const [Loading,setLoading] = useState(true)
  const [employeeId,setEmployeeId] = useState(null);
  const [employeeRole,setEmployeeRole] = useState("");
  const [showEmployee,setShowEmployee] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://192.168.1.46:9090/api/ats/157industries/detail-for-update/870');
        setEmployeeData(response.data);
        setLoading(false);
    
      } catch (error) {
        console.error('Error fetching data:', error);
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
      setBlockedEmployees(blockedEmployees.filter(id => id !== employeeId));
    } else {
      setBlockedEmployees([...blockedEmployees, employeeId]);
    }
  };

  const handleUpdate = (employeeId,employeerole) => {
    setEmployeeId(employeeId);
    setEmployeeRole(employeerole)
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
  // const fetchEmployeeDetailsForUpdate = async (employeeId) => {
  //   try {
  //     const response = await axios.get(`http://192.168.1.48:8891/api/ats/157industries/employee-details/6`);
  //     // Process the response data as needed
  //     console.log('Employee details fetched for update:', response.data);
  //     // Example of how to handle the fetched data:
  //     // navigate to update page or set state for form fields
  //   } catch (error) {
  //     console.error(Error `fetching employee details for ID ${employeeId}:`, error);
  //   }
  // };

  return (
    <div className="table-container">
   {!Loading?(<>
      {!showEmployee?(
      <table className='attendance-table'>
        <thead>
          <tr className='attendancerows-head'>
            <th className='attendanceheading'>Employee Id</th>
            <th className='attendanceheading'>Employee Name</th>
            <th className='attendanceheading'>Employee Number</th>
            <th className='attendanceheading'>Date of Joining</th>
            <th className='attendanceheading'>Designation</th>
            <th className='attendanceheading'>Job Role</th>
            <th className='attendanceheading'>Department</th>
            <th className='attendanceheading'>Reporting Manager Name</th>
            <th className='attendanceheading'>Resume File</th>
            <th className='attendanceheading'>Employee Status</th>
            <th className='ActionCol'>Action</th>
          </tr>
        </thead>
        <tbody>
          {employeeData.map((employee, index) => (
            <tr key={index} className='attendancerows'>
              <td className='tabledata'>{employee.id}</td>
              <td className='tabledata'>{employee.name}</td>
              <td className='tabledata'>{employee.contact}</td>
              <td className='tabledata'>{employee.joinDate}</td>
              <td className='tabledata'>{employee.designation}</td>
              <td className='tabledata'>{employee.jobRole}</td>
              <td className='tabledata'>{employee.department}</td>
              <td className='tabledata'>{employee.reportingManger}</td>
              <td className='tabledata'>
                <button onClick={() => openResumeModal(employee.resume)}><i className="fas fa-eye"></i></button>
              </td>
              <td className='tabledata'>{employee.status}</td>
              <td className='tabledata'>
                <button className="action-button" onClick={() => handleDelete(employee.id)}>
                  {isDeleted(employee.employeeId) ? 'Deleted' : 'Delete'}
                </button>
                <button className="action-button" onClick={() => handleBlock(employee.id)}>
                  {isBlocked(employee.employeeId) ? 'Unblock' : 'Block'}
                </button>
                <button className="action-button" onClick={() => {handleUpdate(employee.id,employee.jobRole);}}>
                  Update
                </button>
              </td>
            </tr>
          ))}
        </tbody>
  </table>
    
      ):(
        <>
        <div>
            <UpdateEmployee id={employeeId} userType={employeeRole}/>
        </div>
        </>
      )}  </>):(<div className="register">
        <HashLoader
          color={color}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      </div>)}

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