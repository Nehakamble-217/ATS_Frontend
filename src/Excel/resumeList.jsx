import React, { useEffect, useState } from "react";
import CallingTrackerForm from "../EmployeeSection/CallingTrackerForm";
import "../Excel/resumeList.css";
import { useParams } from "react-router-dom";
import * as XLSX from "xlsx";

const ResumeList = ({ handleUpdate }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { employeeId,userType } = useParams();
  console.log(employeeId + "empId in resume List");

  const [selectedCandidateId, setSelectedCandidateId] = useState();
  const [showExportConfirmation, setShowExportConfirmation] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://localhost:9090/api/ats/157industries/fetch-resumes-data/${employeeId}/${userType}`
        ); 

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const result = await response.json();
        setData(result);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleUpdateSuccess = () => {
    // Assuming `employeeId` is a known variable or prop
    fetch(
      `http://localhost:9090/api/ats/157industries/callingData/${employeeId}/${userType}`
    )
      .then((response) => response.json())
      .then((data) => {
        setCallingList(data);
        setFilteredCallingList(data);
        setSelectedCandidateId(null); // Hide CallingTrackerForm after success
      })
      .catch((error) => console.error("Error fetching data:", error));
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
  //Swapnil_Rokade_ResumeList_columnsToInclude_columnsToExclude_18/07/2024//
  const handleExportToExcel = () => {
    // Define columns to include in export
    const columnsToInclude = [
      "No.",
      "Candidate's Name",
      "Contact Number",
      "Alternate Number",
      "Candidate Email",
      "Education",
      "Experience",
      "Current Location",
    ];

    // Clone the data and map to match columnsToInclude order
    const dataToExport = data.map((item, index) => {
      // Create a filtered item without the 'Resume' field
      const filteredItem = {
        "No.": index + 1,
        "Candidate's Name": item.name || "-",
        "Contact Number": item.phone || "-",
        "Alternate Number": item.phone || "-",
        "Candidate Email": item.email || "-",
        Education: item.education || "-",
        Experience: item.experience || "-",
        "Current Location": item.location || "-",
      };

      return filteredItem;
    });

    // Define sheet name and create worksheet
    const ws = XLSX.utils.json_to_sheet(dataToExport, {
      header: columnsToInclude,
    });

    // Add conditional formatting for header row
    const headerRange = XLSX.utils.decode_range(ws["!ref"]);
    for (let C = headerRange.s.c; C <= headerRange.e.c; ++C) {
      const cell = ws[XLSX.utils.encode_cell({ r: headerRange.s.r, c: C })];
      if (cell) {
        cell.s = {
          font: {
            bold: true,
            color: { rgb: "000000" },
            sz: 20,
          },
          fill: {
            patternType: "solid",
            fgColor: { rgb: "FF0000" }, // Red background
          },
        };
      }
    }

    // Save the Excel file
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Resume List");
    XLSX.writeFile(wb, "ResumeList.xlsx");
  };

  const showPopup = () => {
    setShowExportConfirmation(true);
    document.querySelector(".table-container").classList.add("blurred");
  };

  const hidePopup = () => {
    setShowExportConfirmation(false);
    document.querySelector(".table-container").classList.remove("blurred");
  };

  const confirmExport = () => {
    setShowExportConfirmation(false);
    handleExportToExcel();
    hidePopup();
  };

  const cancelExport = () => {
    hidePopup();
  };
  //Swapnil_Rokade_ResumeList_columnsToInclude_columnsToExclude_18/07/2024//

  return (
    <>
      <div className="table-container">
        <div className="rl-filterSection">
          <div className="filterSection">
            <h1 className="resume-data-heading">Resume Data</h1>
          </div>
          {/* Swapnil_Rokade_ResumeList_CreateExcel_18/07/2024 */}
          <div>
            <div className="rl-btn-div">
              <button className="rl-create-Excel-btn" onClick={showPopup}>
                Create Excel
              </button>
            </div>
            {showExportConfirmation && (
              <div className="popup-containers">
                <p className="confirmation-texts">
                  Are you sure you want to generate the Excel file?
                </p>
                <button onClick={confirmExport} className="buttoncss-ctn">
                  Yes
                </button>
                <button onClick={cancelExport} className="buttoncss-ctn">
                  No
                </button>
              </div>
            )}
          </div>
        </div>
        <div className="attendanceTableData">
          <table className="attendance-table">
            <thead>
              <tr className="attendancerows-head">
                <th className="attendanceheading">Sr No</th>

                <th className="attendanceheading">Candidate  Name</th>
                <th className="attendanceheading">Contact Number</th>
                <th className="attendanceheading">Alternate Number</th>
                <th className="attendanceheading">Candidate Email</th>
                <th className="attendanceheading">Education</th>
                <th className="attendanceheading">Experience</th>
                <th className="attendanceheading">Current Location</th>
                <th className="attendanceheading">Action</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item, index) => (
                <tr key={item.id} className="attendancerows">
                  <td
                    className="tabledata"
                    onMouseOver={handleMouseOver}
                    onMouseOut={handleMouseOut}
                  >
                    {index + 1}{" "}
                    <div className="tooltip">
                      <span className="tooltiptext">{index + 1}</span>
                    </div>
                  </td>
                  <td
                    hidden
                    className="tabledata"
                    onMouseOver={handleMouseOver}
                    onMouseOut={handleMouseOut}
                  >
                    {item.id}{" "}
                    <div className="tooltip">
                      <span className="tooltiptext">{item.id}</span>
                    </div>
                  </td>
                  <td
                    className="tabledata"
                    onMouseOver={handleMouseOver}
                    onMouseOut={handleMouseOut}
                  >
                    {item.name}{" "}
                    <div className="tooltip">
                      <span className="tooltiptext">{item.name}</span>
                    </div>
                  </td>
                  <td
                    className="tabledata"
                    onMouseOver={handleMouseOver}
                    onMouseOut={handleMouseOut}
                  >
                    {item.phone}{" "}
                    <div className="tooltip">
                      <span className="tooltiptext">{item.phone}</span>
                    </div>
                  </td>
                  <td
                    className="tabledata"
                    onMouseOver={handleMouseOver}
                    onMouseOut={handleMouseOut}
                  >
                    {item.phone}{" "}
                    <div className="tooltip">
                      <span className="tooltiptext">{item.phone}</span>
                    </div>
                  </td>
                  <td
                    className="tabledata"
                    onMouseOver={handleMouseOver}
                    onMouseOut={handleMouseOut}
                  >
                    {item.email}
                    <div className="tooltip">
                      <span className="tooltiptext">{item.email}</span>
                    </div>
                  </td>

                  <td
                    className="tabledata"
                    onMouseOver={handleMouseOver}
                    onMouseOut={handleMouseOut}
                  >
                    {item.education}
                    <div className="tooltip">
                      <span className="tooltiptext">{item.education}</span>
                    </div>
                  </td>

                  <td
                    className="tabledata"
                    onMouseOver={handleMouseOver}
                    onMouseOut={handleMouseOut}
                  >
                    {item.experience}
                    <div className="tooltip">
                      <span className="tooltiptext">{item.experience}</span>
                    </div>
                  </td>

                  <td
                    className="tabledata"
                    onMouseOver={handleMouseOver}
                    onMouseOut={handleMouseOut}
                  >
                    {item.location}
                    <div className="tooltip">
                      <span className="tooltiptext">{item.location}</span>
                    </div>
                  </td>

                  <td className="tabledata" style={{ textAlign: "center" }}>
                    <i
                      onClick={() => handleUpdate(item.candidateId)}
                      className="fa-regular fa-pen-to-square"
                    ></i>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {selectedCandidateId && (
          <CallingTrackerForm
            candidateData={selectedCandidateId}
            onClose={() => setSelectedCandidateId(null)}
            onSuccess={handleUpdateSuccess}
          />
        )}
      </div>
    </>
  );
};

export default ResumeList;
