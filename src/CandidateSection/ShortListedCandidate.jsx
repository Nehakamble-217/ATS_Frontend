import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
// import './holdCandidate.css'
//import './shortlistedcandidate.css'
import './sorted.css'



const ShortListedCandidates = () => {
    const [shortListedData, setShortListedData] = useState([]);
    const [selectedCandidate, setSelectedCandidate] = useState(null);
    const { employeeId } = useParams();
    const newEmployeeId = parseInt(employeeId, 10);

    const navigator = useNavigate();

    useEffect(() => {
        fetchShortListedData();
    }, []);

    const fetchShortListedData = async () => {
        try {
            const response = await fetch(
                `http://192.168.1.40:8891/api/ats/157industries/shortListed-date/${newEmployeeId}`
            );
            const data = await response.json();
            setShortListedData(data);
        } catch (error) {
            console.error("Error fetching shortlisted data:", error);
        }
    };


    const viewPage = () => {
        navigator("/view-dates")
    }

    
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

    return (
        <div className="App-after">
   <div className="container-after1">
       <h5 style={{color:"gray",paddingTop:"5px"}}>Shortlisted List</h5>
                    <div className="attendanceTableData">
                        <table className=" attendance-table">
                            <thead >
                                <tr className=" attendancerows-head">
                                    <th className="attendanceheading" >Candidate ID</th>
                                    <th  className="attendanceheading">Date</th>
                                    <th className="attendanceheading" >Recruiter Name</th>
                                    <th className="attendanceheading" >Candidate Name</th>
                                    <th className="attendanceheading" >Position</th>
                                    <th className="attendanceheading" >Requirement Company</th>
                                    <th className="attendanceheading" >Contact Number</th>
                                    <th className="attendanceheading" >Alternate Number</th>
                                    <th className="attendanceheading" >Candidate Email</th>
                                    <th className="attendanceheading" >Current Company</th>
                                    <th className="attendanceheading" >Current CTC</th>
                                    <th className="attendanceheading" >Expected CTC</th>
                                    <th className="attendanceheading" >Current Location</th>
                                    <th className="attendanceheading" >Total Experience</th>
                                    <th className="attendanceheading" >Notice Period</th>
                                    <th className="attendanceheading" >Holding Any Offer</th>
                                    <th className="attendanceheading" >Feedback</th>
                                    <th className="attendanceheading" >Final Status</th>
                                    <th className="attendanceheading" >Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {shortListedData.map((item) => (
                                    <tr key={item.candidateId} className="attendancerows">
                                        <td className=" tabledata" onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}  style={{whiteSpace:"nowrap"}}>{item.candidateId} 
                                         <div className="tooltip">
                      
                      <span className="tooltiptext">{item.candidateId}</span>
                    </div>
                                        </td>
                                        <td className=" tabledata" onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}  style={{whiteSpace:"nowrap"}}>{item.date} 
                                         <div className="tooltip">
                      
                      <span className="tooltiptext">{item.date}</span>
                    </div>
                                        </td>
                                        <td className="tabledata" onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}  style={{whiteSpace:"nowrap"}}>{item.recruiterName} 
                                         <div className="tooltip">
                      
                      <span className="tooltiptext">{item.recruiterName}</span>
                    </div>
                                        </td>
                                        <td className="tabledata" onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}  style={{whiteSpace:"nowrap"}}>{item.candidateName} 
                                         <div className="tooltip">
                      
                      <span className="tooltiptext">{item.candidateName} </span>
                    </div>
                                        </td>
                                        <td className="tabledata" onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}  style={{whiteSpace:"nowrap"}}>{item.position} 
                                         <div className="tooltip">
                      
                      <span className="tooltiptext">{item.position}</span>
                    </div>
                                        </td>
                                        <td className="tabledata" onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}  style={{whiteSpace:"nowrap"}}>{item.requirementCompany} 
                                         <div className="tooltip">
                      
                      <span className="tooltiptext">{item.requirementCompany} </span>
                    </div>
                                        </td>
                                        <td className="tabledata" onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}  style={{whiteSpace:"nowrap"}}>{item.contactNumber} 
                                         <div className="tooltip">
                      
                      <span className="tooltiptext">{item.contactNumber}</span>
                    </div>
                                        </td>
                                        <td className="tabledata" onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}  style={{whiteSpace:"nowrap"}}>{item.alternateNumber} 
                                         <div className="tooltip">
                      
                      <span className="tooltiptext">{item.alternateNumber} </span>
                    </div>
                                        </td>
                                        <td className="tabledata" onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}  style={{whiteSpace:"nowrap"}}>{item.lineUp.candidateEmail} 
                                         <div className="tooltip">
                      
                      <span className="tooltiptext">{item.lineUp.candidateEmail}</span>
                    </div>
                                        </td>
                                        <td className="tabledata" onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}  style={{whiteSpace:"nowrap"}}>{item.lineUp.companyName} 
                                         <div className="tooltip">
                      
                      <span className="tooltiptext">{item.lineUp.companyName}</span>
                    </div>
                                        </td>
                                        <td className="tabledata" onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}  style={{whiteSpace:"nowrap"}}>{item.lineUp.currentCTC} 
                                         <div className="tooltip">
                      
                      <span className="tooltiptext">{item.lineUp.currentCTC} </span>
                    </div>
                                        </td>
                                        <td className="tabledata" onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}  style={{whiteSpace:"nowrap"}}>{item.lineUp.expectedCTC} 
                                         <div className="tooltip">
                      
                      <span className="tooltiptext">{item.lineUp.expectedCTC} </span>
                    </div>
                                        </td>
                                        <td className="tabledata" onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}  style={{whiteSpace:"nowrap"}}>{item.lineUp.currentLocation} 
                                         <div className="tooltip">
                      
                      <span className="tooltiptext">{item.lineUp.currentLocation} </span>
                    </div>
                                        </td>
                                        <td className="tabledata" onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}  style={{whiteSpace:"nowrap"}}>{item.lineUp.totalExperience} 
                                         <div className="tooltip">
                      
                      <span className="tooltiptext">{item.lineUp.totalExperience} </span>
                    </div>
                                        </td>
                                        <td className="tabledata" onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}  style={{whiteSpace:"nowrap"}}>{item.lineUp.noticePeriod} 
                                         <div className="tooltip">
                      
                      <span className="tooltiptext">{item.lineUp.noticePeriod}</span>
                    </div>
                                        </td>
                                        <td className="tabledata" onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}  style={{whiteSpace:"nowrap"}}>{item.lineUp.holdingAnyOffer} 
                                         <div className="tooltip">
                      
                      <span className="tooltiptext">{item.lineUp.holdingAnyOffer}</span>
                    </div>
                                        </td>
                                        <td className="tabledata" onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}  style={{whiteSpace:"nowrap"}}>{item.lineUp.feedBack} 
                                         <div className="tooltip">
                      
                      <span className="tooltiptext">{item.lineUp.feedBack}</span>
                    </div>
                                        </td>
                                        <td className="tabledata" onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}  style={{whiteSpace:"nowrap"}}>{item.lineUp.finalStatus} 
                                         <div className="tooltip">
                      
                      <span className="tooltiptext">{item.lineUp.finalStatus} </span>
                    </div>
                                        </td>
                                        <td className="tabledata" style={{whiteSpace:"nowrap"}} >
                                            <i  onClick={() => viewPage(item.candidateId)} class="fa-sharp fa-solid fa-eye"></i>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
                </div>
          
        
)};

export default ShortListedCandidates;
