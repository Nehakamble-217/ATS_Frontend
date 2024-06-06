import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../EmployeeSection/callingList.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare } from '@fortawesome/free-regular-svg-icons';

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
      `http://192.168.1.40:8891/api/ats/157industries/callingData/${employeeId}`

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


   const handleMouseOver = (event) => {
    const tooltip = event.currentTarget.querySelector('.tooltip');
    if (tooltip) {
      const rect = event.currentTarget.getBoundingClientRect();
      const tooltipRect = tooltip.getBoundingClientRect();
      const tooltipWidth = tooltipRect.width;
      const tooltipHeight = tooltipRect.height;
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;

      let top = rect.top - tooltipHeight + 40; // above the cell
      let left = rect.left + (rect.width - tooltipWidth) / 2; // centered horizontally

      // Adjust if the tooltip is out of the viewport
      if (top < 0) top = rect.bottom + 5; // below the cell
      if (left < 0) left = 5; // align to the left edge
      if (left + tooltipWidth > viewportWidth) left = viewportWidth - tooltipWidth - 5; // align to the right edge

      tooltip.style.top = `${top}px`;
      tooltip.style.left = `${left}px`;
      tooltip.classList.add('visible');
    }
  };

  const handleMouseOut = (event) => {
    const tooltip = event.currentTarget.querySelector('.tooltip');
    if (tooltip) {
      tooltip.classList.remove('visible');
    }
  };

   // if (selectedCandidate) {
    //   navigator(`/empDash/${employeeId}/${candidateId}`, {
    //     state: { initialData: selectedCandidate },
    //   });
    // }

  return (
    <div className="calling-list-container ">
      <h5 style={{color:"gray",paddingTop:"5px"}}>Calling List</h5>
      {!showCallingForm && (
        <>
          {/* <input
            type="text"
            className="form-control"
            placeholder="Search here..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          /> */}
         
          <div className="attendanceTableData">
            <table className="selfcalling-table attendance-table">
              <thead>
                <tr className="attendancerows-head">
                  <th className='attendanceheading'>Sr No.</th>
                  <th className='attendanceheading'>Date</th>
                  <th className='attendanceheading'>Recruiter Name</th>
                  <th className='attendanceheading'>Candidate Name</th>
                  <th className='attendanceheading'>Candidate Email</th>
                  <th className='attendanceheading'>Contact Number</th>
                  <th className='attendanceheading'>Alternate Number</th>
                  <th className='attendanceheading'>Source Name</th>
                  <th className='attendanceheading'>Position</th>
                 
                  <th className='attendanceheading'>Job Id</th>
                  <th className='attendanceheading'>Applying Company</th>
                  <th className='attendanceheading'>Communication Rating</th>
                  <th className='attendanceheading'>Current Location</th>
                  <th className='attendanceheading'>PersonalFeedback</th>
                  <th className='attendanceheading'>CallingFeedback</th>
                  <th className='attendanceheading'>Interested / Eligible</th>
                  <th className='attendanceheading'>Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredCallingList.map((item, index) => (
                  <tr key={item.candidateId} className="attendancerows">
                    <td className='tabledata ' onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>{index + 1}</td>
                    <td className='tabledata ' onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>{item.date}
                    <div className="tooltip">
                      
                      <span className="tooltiptext">{item.date}</span>
                    </div>
                    </td>
                    <td className='tabledata ' onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>{item.recruiterName} 
                    <div className="tooltip">
                      
                      <span className="tooltiptext">{item.recruiterName} </span>
                    </div>
                    </td>
                    <td  className='tabledata ' onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>{item.candidateName} <div className="tooltip">
                      
                      <span className="tooltiptext">{item.candidateName}</span>
                    </div></td>
                    <td className='tabledata ' onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>{item.candidateEmail} <div className="tooltip">
                      
                      <span className="tooltiptext">{item.candidateEmail}</span>
                    </div></td>
                    <td className='tabledata ' onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>{item.contactNumber} <div className="tooltip">
                      
                      <span className="tooltiptext">{item.contactNumber}</span>
                    </div></td>
                     <td className='tabledata ' onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>{item.alternateNumber} <div className="tooltip">
                      
                      <span className="tooltiptext">{item.alternateNumber}</span>
                    </div></td>
                     <td className='tabledata ' onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>{item.sourceName} <div className="tooltip">
                      
                      <span className="tooltiptext">{item.sourceName}</span>
                    </div></td>
                    <td className='tabledata ' onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>{item.position} <div className="tooltip">
                      
                      <span className="tooltiptext">{item.position}</span>
                    </div></td>
                    <td className='tabledata ' onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>{item.requirementId} <div className="tooltip">
                      
                      <span className="tooltiptext">{item.requirementId}</span>
                    </div></td>
                     <td className='tabledata ' onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>{item.requirementCompany} <div className="tooltip">
                      
                      <span className="tooltiptext">{item.requirementCompany} </span>
                    </div></td>
                    

                    <td className='tabledata ' onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>{item.communicationRating} <div className="tooltip">
                      
                      <span className="tooltiptext">{item.communicationRating}</span>
                    </div></td>
                    <td className='tabledata ' onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>{item.currentLocation} <div className="tooltip">
                      
                      <span className="tooltiptext">{item.currentLocation} </span>
                    </div></td>
                    <td className='tabledata ' onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>{item.personalFeedback} <div className="tooltip">
                      
                      <span className="tooltiptext">{item.personalFeedback} </span>
                    </div></td>
                    <td className='tabledata ' onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>{item.callingFeedback} <div className="tooltip">
                      
                      <span className="tooltiptext">{item.callingFeedback} </span>
                    </div></td>
                    <td className='tabledata ' onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>{item.selectYesOrNo} <div className="tooltip">
                      
                      <span className="tooltiptext">{item.selectYesOrNo} </span>
                    </div></td>
                    <td className="tabledata">
                    
                      <i onClick={() => handleUpdate(item.candidateId)} className="fa-regular fa-pen-to-square">a</i>
                     
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
