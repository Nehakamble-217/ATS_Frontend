

// import React, { useState } from 'react';
// import axios from 'axios';


// const CallingExcel = ({ onClose }) => {
//   const [file, setFile] = useState(null);
//   const [uploadError, setUploadError] = useState(null);
//   const [uploadSuccess, setUploadSuccess] = useState(false);

//   const handleFileChange = (e) => {
//     setFile(e.target.files[0]);
//     setUploadSuccess(false);
//     setUploadError(null);
//   };

//   const handleUpload = async () => {
//     if (!file) {
//       alert('Please select a file to upload.');
//       return;
//     }
//     const formData = new FormData();
//     formData.append('file', file);
//     try {
//       await axios.post('http://localhost:8891/api/ats/157industries/uploadData/3', formData, {
//         headers: {
//           'Content-Type': 'multipart/form-data'
//         }
//       });
//       setUploadSuccess(true);
//     } catch (error) {
//       console.error('Upload error:', error);
//       setUploadError('Error uploading file. Please try again.');
//     }
//   };
//   const handleClose = () => {
//     onClose();
//   };
//   return (
//     <div className="card" style={{ width: "400px", border: "1px solid black" }}>
//       <div className="card-header">
//         <h5 className="card-title mb-0">Upload Excel File</h5>
//       </div>
//       <div className="card-body">
//         <div className="mb-3">
//           <input type="file" className="form-control" accept=".xls,.xlsx" onChange={handleFileChange} />
//         </div>
//         <div className="d-grid gap-2">
//           <button onClick={handleUpload}>Upload</button>
//           {uploadSuccess && (
//             <center><h5 className="text-success mt-3">File Data added successfully!</h5></center>
//           )}
//           {uploadError && (
//             <center><h5 className="text-danger mt-3">{uploadError}</h5></center>
//           )}
//           <button onClick={handleClose}>Close</button>
//         </div>
//       </div>
//     </div>
//   );
// };
// export default CallingExcel;



import React, { useState, useRef } from 'react';
import axios from 'axios';
import { useParams } from "react-router-dom";
import CallingExcelList from './callingExcelData';
import "./callingExcel.css";
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
      await axios.post(`http://192.168.1.38:8891/api/ats/157industries/uploadData/${employeeId}`, formData, {
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
    <div>
      <div className="card" style={{ width: "400px", border: "1px solid gray",marginLeft:"30%" }}>
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
           
            <button onClick={handleUpload}>
              Upload</button>
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
      {showTable && (
        <div style={{ marginTop: "20px" }}>
          <CallingExcelList onCloseTable={() => setShowTable(false)} />
        </div>
      )}
    </div>
  );
};

export default CallingExcel;


















// don't remove this code -Arshad
//this code directly displya all excel sheet columns 

// import React, { useState } from 'react';
// import axios from 'axios';
// import * as XLSX from 'xlsx';
// import '../Excel/callingExcel.css'; // Ensure this file contains the updated CSS

// const CallingExcel = ({ onClose }) => {
//   const [file, setFile] = useState(null);
//   const [uploadError, setUploadError] = useState(null);
//   const [uploadSuccess, setUploadSuccess] = useState(false);
//   const [data, setData] = useState([]);
//   const [showData, setShowData] = useState(false);

//   const handleFileChange = (e) => {
//     const selectedFile = e.target.files[0];
//     setFile(selectedFile);
//     setUploadSuccess(false);
//     setUploadError(null);
//   };

//   const handleUpload = async () => {
//     if (!file) {
//       alert('Please select a file to upload.');
//       return;
//     }

//     const formData = new FormData();
//     formData.append('file', file);

//     try {
//       await axios.post('http://localhost:8891/api/ats/157industries/uploadData/3', formData, {

//         headers: {
//           'Content-Type': 'multipart/form-data'
//         }
//       });

//       const reader = new FileReader();
//       reader.onload = (event) => {
//         const binaryStr = event.target.result;
//         const workbook = XLSX.read(binaryStr, { type: 'binary' });
//         const firstSheetName = workbook.SheetNames[0];
//         const worksheet = workbook.Sheets[firstSheetName];
//         const sheetData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
//         setData(sheetData);
//         setShowData(true);
//       };
//       reader.readAsBinaryString(file);

//       setUploadSuccess(true);
//     } catch (error) {
//       console.error('Upload error:', error);
//       setUploadError('Error uploading file. Please try again.');
//     }
//   };

//   const handleClose = () => {
//     setShowData(false);
//     setUploadSuccess(false);
//     onClose();
//   };

//   return (
//     <div className="page-container">
//       <div className="container">
//         <div className="card" style={{ width: "400px", border: "1px solid black" }}>
//           <div className="card-header">
//             <h5 className="card-title mb-0">Upload Excel File</h5>
//           </div>
//           <div className="card-body">
//             <div className="mb-3">
//               <input type="file" className="form-control" accept=".xls,.xlsx" onChange={handleFileChange} />
//             </div>
//             <div className="button-container">
//               <div className="button-wrapper">
//                 <button onClick={handleUpload}>Upload</button>
//               </div>
//               <div className="button-wrapper">
//                 <button onClick={handleClose}>Close</button>
//               </div>
//             </div>
//             {uploadSuccess && (
//               <center><h5 className="text-success mt-3">File Data added successfully!</h5></center>
//             )}
//             {uploadError && (
//               <center><h5 className="text-danger mt-3">{uploadError}</h5></center>
//             )}
//           </div>
//         </div>
//         {showData && data.length > 0 && (
//           <div className="data-tabled mt-3">
//             <table className="tabled">
//               <thead>
//                 <tr>
//                   {data[0].map((cell, index) => (
//                     <th key={index} className="tabled-header">{cell}</th>
//                   ))}
//                 </tr>
//               </thead>
//               <tbody>
//                 {data.slice(1).map((row, rowIndex) => (
//                   <tr key={rowIndex}>
//                     {row.map((cell, cellIndex) => (
//                       <td key={cellIndex} className="tabled-cell">{cell}</td>
//                     ))}
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default CallingExcel;