import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import LineupExcelData from "./lineupExcelData";
import "./callingExcel.css";
import CallingExcelList from "../Excel/callingExcelData";
import ResumeList from "./resumeList";
import { toast } from "react-toastify";

const CallingExcel = ({ onClose }) => {
  const [file, setFile] = useState(null);
  const [uploadError, setUploadError] = useState(null);
  const [uploadErrorLineUp, setUploadErrorLineUp] = useState(null);
  const [uploadErrorResume, setUploadErrorResume] = useState(null);
  const [activeTable, setActiveTable] = useState("");
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [uploadSuccessLineUp, setUploadSuccessLineUp] = useState(false);
  const [uploadSuccessResume, setUploadSuccessResume] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const fileInputRef = useRef(null);
  const { employeeId } = useParams();

  const handleTableChange = (tableName) => {
    setActiveTable(tableName);
  };

  useEffect(() => {}, [file]);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setUploadSuccess(false);
    setUploadSuccessLineUp(false);
    setUploadSuccessResume(false);
    setUploadError(null);
    setUploadErrorLineUp(null);
    setUploadErrorResume(null);
  };

  const handleResumeFileChange = (event) => {
    setSelectedFiles(event.target.files);
  };

  const hideSuccessMessage = () => {
    setTimeout(() => {
      setUploadSuccess(false);
      setUploadSuccessLineUp(false);
      setUploadSuccessResume(false);
    }, 2000);
  };

  const handleUpload = async () => {
    if (!file) {
      toast.error("Please select a file to upload.");
      return;
    }
    const formData = new FormData();
    formData.append("file", file);
    try {
      await axios.post(

        `http://192.168.1.42:9090/api/ats/157industries/uploadData/${employeeId}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setUploadSuccess(true);
      toast.success("File Uploaded Successfully");
      setActiveTable("CallingExcelList");
      hideSuccessMessage();
      setFile(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    } catch (error) {
      toast.error("Upload error:", error);
      // setUploadError("Error uploading file. Please try again.");
    }
  };

  const handleUploadLineupFile = async () => {
    if (!file) {
      toast.error("Please select a file to upload."); //Swapnil Error&success message
      return;
    }
    const formData = new FormData();
    formData.append("file", file);
    console.log(employeeId + " - line Page 01");
    try {
      await axios.post(

        `http://192.168.1.42:9090/api/ats/157industries/upload-calling-lineup-data/${employeeId}`,

        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setUploadSuccessLineUp(true);
      toast.success("File Uploaded Successfully");
      setActiveTable("LineupExcelData");
      hideSuccessMessage();
      setFile(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    } catch (error) {
      toast.error("Upload error:", error);
      // setUploadErrorLineUp("Error uploading file. Please try again.");
    }
  };

  const handleUploadResume = async () => {
    const formData = new FormData();
    for (let i = 0; i < selectedFiles.length; i++) {
      formData.append("files", selectedFiles[i]);
    }
    try {
      await axios.post(
        "http://192.168.1.42:9090/api/ats/157industries/add-multiple-resume",
        formData
      );
      setUploadSuccessResume(true);
      toast.success("File Uploaded Successfully");
      setActiveTable("ResumeList");
      hideSuccessMessage();
      setSelectedFiles([]);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    } catch (error) {
      toast.error("Error uploading files:", error);
      // setUploadErrorResume("Error uploading file. Please try again.");
    }

    axios
      .post(
        "http://192.168.1.42:9090/api/ats/157industries/add-multiple-resume",
        formData
      )

      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error uploading files: ", error);
      });
  };

  const handleView = () => {
    setShowTable(true);
  };

  const handleClose = () => {
    onClose();
  };

  return (
    <div
      className="callingfiel"
      style={{
        display: "flex",

        justifyContent: "center",
        flexWrap: "wrap",
        paddingTop: "15px",
        gap: "12px",
      }}
    >
      <div className="fileupload">
        <div>
          <div
            className="card fixed-card"
            style={{ width: "90%", border: "1px solid gray" }}
          >
            <div className="card-header">
              <h5 className="mb-0 card-title">Upload Calling Excel </h5>
            </div>
            <div className="card-body">
              <div className="mb-3">
                <input
                  type="file"
                  className="form-control"
                  accept=".xls,.xlsx"
                  onChange={handleFileChange}
                  ref={fileInputRef}
                />
              </div>
              <div className="gap-2 d-grid">
                <button onClick={handleUpload}>Upload</button>

                
                <button onClick={() => handleTableChange("CallingExcelList")}>
                  View
                </button>
              </div>
            </div>
          </div>
        </div>

        <div>
          <div
            className="card fixed-card"
            style={{ width: "90%", border: "1px solid gray" }}
          >
            <div className="card-header">
              <h5 className="mb-0 card-title">Upload LineUp Excel </h5>
            </div>
            <div className="card-body">
              <div className="mb-3">
                <input
                  type="file"
                  className="form-control"
                  accept=".xls,.xlsx"
                  onChange={handleFileChange}
                  ref={fileInputRef}
                />
              </div>
              <div className="gap-2 d-grid">
                <button onClick={handleUploadLineupFile}>Upload</button>
                
                <button onClick={() => handleTableChange("LineupExcelData")}>
                  View
                </button>
              </div>
            </div>
          </div>
        </div>
        
        <div>
          <div
            className="card fixed-card"
            style={{ width: "90%", border: "1px solid gray" }}
          >
            <div className="card-header">
              <h5 className="mb-0 card-title">Upload Resume </h5>
            </div>
            <div className="card-body">
              <div className="mb-3">
                <input
                  type="file"
                  multiple
                  onChange={handleResumeFileChange}
                  className="form-control"
                  ref={fileInputRef}
                />
              </div>
              <div className="gap-2 d-grid">
                <button onClick={handleUploadResume}>Upload</button>
                {/* {uploadSuccessResume && (
               
              )} */}
                <button onClick={() => handleTableChange("ResumeList")}>
                  View
                </button>
              </div>
            </div>
          </div>
        </div>

      </div>

      {activeTable === "CallingExcelList" && (
        <CallingExcelList onCloseTable={() => setActiveTable("")} />
      )}
      {activeTable === "LineupExcelData" && (
        <LineupExcelData onCloseTable={() => setActiveTable("")} />
      )}
      {activeTable === "ResumeList" && (
        <ResumeList onCloseTable={() => setActiveTable("")} />
      )}
    </div>
  );
};

export default CallingExcel;
