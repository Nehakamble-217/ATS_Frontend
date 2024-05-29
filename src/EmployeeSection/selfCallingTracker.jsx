import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../EmployeeSection/callingList.css";

const CallingList = ({ updateState, funForGettingCandidateId }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [callingList, setCallingList] = useState([]);
  const [filteredCallingList, setFilteredCallingList] = useState([]);
  const [showCallingForm, setShowCallingForm] = useState(false);
  const [callingToUpdate, setCallingToUpdate] = useState(null);

  const { employeeId } = useParams();
  const employeeIdw = parseInt(employeeId);
  console.log(employeeIdw + "emp @@@@ id");
  console.log(employeeId + "emp 1111 id");

  const navigator = useNavigate();

  useEffect(() => {
    fetch(
      `http://192.168.1.33:8891/api/ats/157industries/callingData/${employeeId}`
    )
      .then((response) => response.json())
      .then((data) => {
        setCallingList(data);
        setFilteredCallingList(data);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, [employeeId]);

  useEffect(() => {
    const filtered = callingList.filter((item) => {
      const numberString = item.contactNumber
        ? item.contactNumber.toString()
        : "";
      return (
        item.recruiterName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.candidateName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.date.toLowerCase().includes(searchTerm.toLowerCase()) ||
        numberString.includes(searchTerm) ||
        item.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.callingFeedback.toLowerCase().includes(searchTerm.toLowerCase())
      );
    });
    setFilteredCallingList(filtered);
  }, [searchTerm, callingList]);

  const handleUpdate = (candidateId) => {
    updateState();
    const selectedCandidate = callingList.find(
      (item) => item.candidateId === candidateId
    );

    funForGettingCandidateId(selectedCandidate.candidateId);
  };

   // if (selectedCandidate) {
    //   navigator(`/empDash/${employeeId}/${candidateId}`, {
    //     state: { initialData: selectedCandidate },
    //   });
    // }

  return (
    <div className="calling-list-container">
      {/* <h2 className="m-4">Calling List</h2> */}
      {!showCallingForm && (
        <>
          <input
            type="text"
            className="form-control"
            placeholder="Search here..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <br />
          <div className="table-container_forselfcalling">
            <table className="selfcalling-table">
              <thead>
                <tr>
                  <th>Sr No.</th>
                  <th>Date</th>
                  <th>Recruiter Name</th>
                  <th>Candidate Name</th>
                  <th>Position</th>
                  <th>Current Company</th>
                  <th>Contact Number</th>
                  <th>Alternate Number</th>
                  <th>Communication Rating</th>
                  <th>PersonalFeedback</th>
                  <th>CallingFeedback</th>
                  <th>Interested / Eligible</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredCallingList.map((item, index) => (
                  <tr key={item.candidateId}>
                    <td>{index + 1}</td>
                    <td>{item.date}</td>
                    <td>{item.recruiterName}</td>
                    <td >{item.candidateName}</td>
                    <td>{item.position}</td>
                    <td>{item.requirementCompany}</td>
                    <td>{item.contactNumber}</td>
                    <td>{item.alternateNumber}</td>
                    <td>{item.communicationRating}</td>
                    <td>{item.personalFeedback}</td>
                    <td>{item.callingFeedback}</td>
                    <td>{item.selectYesOrNo}</td>
                    <td>
                      <button
                       
                        onClick={() => handleUpdate(item.candidateId)}
                      >
                        Update & Follow Up
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
};

export default CallingList;
