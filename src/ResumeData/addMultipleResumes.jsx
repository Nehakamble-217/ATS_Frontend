import React, { useState } from "react";
import axios from "axios";
import "./AddResumes.css"; // Import the CSS file

const AddResumes = ({ show }) => {
  const [selectedFiles, setSelectedFiles] = useState([]);

  const handleFileChange = (event) => {
    setSelectedFiles(event.target.files);
  };

  const handleUpload = () => {
    const formData = new FormData();
    for (let i = 0; i < selectedFiles.length; i++) {
      formData.append("files", selectedFiles[i]);
    }
    axios
      .post(
        "http://192.168.1.40:9090/api/ats/157industries/add-resume-data",
        formData
      )

      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error uploading files: ", error);
      });
  };

  if (show) {
    // Conditionally render based on the show prop
    return null; // Return null if show is true (to hide component)
  }

  return (
    <div className="main-container" style={{ width: "400px" }}>
      <div className="upload-container">
        <h2 className="upload-title">Upload Resume</h2>
        <input
          type="file"
          multiple
          onChange={handleFileChange}
          className="file-input"
        />
        <button onClick={handleUpload} className="upload-button">
          Upload
        </button>
      </div>
    </div>
  );
};

export default AddResumes;
