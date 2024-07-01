import React, { useState, useRef } from 'react';
import axios from 'axios';
import { useParams } from "react-router-dom";
import CallingExcelList from './callingExcelData';
import "./callingExcel.css";
import AddResumes from '../ResumeData/addMultipleResumes';

const CallingExcel = ({ onClose }) => {
  const [file, setFile] = useState(null);
  const [uploadError, setUploadError] = useState(null);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [showTable, setShowTable] = useState(false);
  const fileInputRef = useRef(null);
  const { employeeId } = useParams();

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setUploadSuccess(false);
    setUploadError(null);
    setShowTable(false);
  };

  const handleUpload = async () => {
    if (!file) {
      alert('Please select a file to upload.');
      return;
    }
    const formData = new FormData();
    formData.append('file', file);
    try {
      await axios.post(`http://192.168.1.42:8891/api/ats/157industries/uploadData/${employeeId}`, formData, {




        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      setUploadSuccess(true);
      setShowTable(true); // Show the table after successful upload
      setFile(null); // Reset the file state
      if (fileInputRef.current) {
        fileInputRef.current.value = ''; // Clear the file input
      }
    } catch (error) {
      console.error('Upload error:', error);
      setUploadError('Error uploading file. Please try again.');
    }
  };

  const handleClose = () => {
    onClose();
  };

  return (
    <div style={{display:"flex",alignItems:"center",
      justifyContent:"space-around",flexWrap:"wrap"}}>
      {!showTable && ( // Render upload form and card if showTable is false
        <div className="card fixed-card" style={{ 
        width: "400px", border: "1px solid gray"}}>
          <div className="card-header">
            <h5 className="card-title mb-0">Upload Excel File</h5>
          </div>
          <div className="card-body">
            <div className="mb-3">
              <input 
                type="file" 
                className="form-control" 
                accept=".xls,.xlsx" 
                onChange={handleFileChange} 
                ref={fileInputRef} // Attach the ref to the file input
              />
            </div>
            <div className="d-grid gap-2">
              <button onClick={handleUpload}>Upload</button>
              {uploadSuccess && (
                <center><h5 className="text-success mt-3">File data added successfully!</h5></center>
              )}
              {uploadError && (
                <center><h5 className="text-danger mt-3">{uploadError}</h5></center>
              )}
              <button onClick={handleClose}>Close</button>
            </div>
          </div>
        </div>
      )}

      {showTable && ( // Render table only if showTable is true
        <div>
          <CallingExcelList onCloseTable={() => setShowTable(false)} />
        </div>
      )}

      <div>
        <AddResumes show={showTable} /> {/* Pass show prop to AddResumes */}
      </div>
    </div>
  );
};

export default CallingExcel;
