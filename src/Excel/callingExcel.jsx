

import React, { useState } from 'react';
import axios from 'axios';


const CallingExcel = ({ onClose }) => {
  const [file, setFile] = useState(null);
  const [uploadError, setUploadError] = useState(null);
  const [uploadSuccess, setUploadSuccess] = useState(false);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setUploadSuccess(false);
    setUploadError(null); 
  };

  const handleUpload = async () => {
    if (!file) {
      alert('Please select a file to upload.');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
      await axios.post('http://192.168.1.38:8891/api/ats/157industries/uploadData', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      setUploadSuccess(true);
    } catch (error) {
      console.error('Upload error:', error);
      setUploadError('Error uploading file. Please try again.');
    }
  };

  const handleClose = () => {
    onClose();
  };

  return (
    <div className="card" style={{width:"400px"}}>
      <div className="card-header">
        <h5 className="card-title mb-0">Upload Excel File</h5>
      </div>
      <div className="card-body">
        <div className="mb-3">
          <input type="file" className="form-control" accept=".xls,.xlsx" onChange={handleFileChange} />
        </div>
        <div className="d-grid gap-2">
          <button  onClick={handleUpload}>Upload</button>
          {uploadSuccess && (
            <center><h5 className="text-success mt-3">File Data added successfully!</h5></center>
          )}
          {uploadError && (
            <center><h5 className="text-danger mt-3">{uploadError}</h5></center>
          )}
          <button  onClick={handleClose}>Close</button>
        </div>
      </div>
    </div>
  );
};

export default CallingExcel;