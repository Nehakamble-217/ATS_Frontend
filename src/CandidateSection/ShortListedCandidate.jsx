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
                `http://192.168.1.41:8891/api/ats/157industries/shortListed-date/${newEmployeeId}`
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

    return (
        <div>

                    <div>
                        <table className="shortlistedcandidate">
                            <thead className="shortlisted-tablehead">
                                <tr className="shortlistedheading">
                                    <th >Candidate ID</th>
                                    <th >Date</th>
                                    <th >Recruiter Name</th>
                                    <th >Candidate Name</th>
                                    <th >Position</th>
                                    <th >Requirement Company</th>
                                    <th >Contact Number</th>
                                    <th >Alternate Number</th>
                                    <th >Candidate Email</th>
                                    <th >Current Company</th>
                                    <th >Current CTC</th>
                                    <th >Expected CTC</th>
                                    <th >Current Location</th>
                                    <th >Total Experience</th>
                                    <th >Notice Period</th>
                                    <th >Holding Any Offer</th>
                                    <th >Feedback</th>
                                    <th >Final Status</th>
                                    <th >Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {shortListedData.map((item) => (
                                    <tr key={item.candidateId} className="tabledaterow">
                                        <td className="c1-tabledate"  style={{whiteSpace:"nowrap"}}>{item.candidateId}</td>
                                        <td className="c1-tabledate"  style={{whiteSpace:"nowrap"}}>{item.date}</td>
                                        <td className="c1-tabledate"  style={{whiteSpace:"nowrap"}}>{item.recruiterName}</td>
                                        <td className="c1-tabledate"  style={{whiteSpace:"nowrap"}}>{item.candidateName}</td>
                                        <td className="c1-tabledate"  style={{whiteSpace:"nowrap"}}>{item.position}</td>
                                        <td className="c1-tabledate"  style={{whiteSpace:"nowrap"}}>{item.requirementCompany}</td>
                                        <td className="c1-tabledate"  style={{whiteSpace:"nowrap"}}>{item.contactNumber}</td>
                                        <td className="c1-tabledate"  style={{whiteSpace:"nowrap"}}>{item.alternateNumber}</td>
                                        <td className="c1-tabledate"  style={{whiteSpace:"nowrap"}}>{item.lineUp.candidateEmail}</td>
                                        <td className="c1-tabledate"  style={{whiteSpace:"nowrap"}}>{item.lineUp.companyName}</td>
                                        <td className="c1-tabledate"  style={{whiteSpace:"nowrap"}}>{item.lineUp.currentCTC}</td>
                                        <td className="c1-tabledate"  style={{whiteSpace:"nowrap"}}>{item.lineUp.expectedCTC}</td>
                                        <td className="c1-tabledate"  style={{whiteSpace:"nowrap"}}>{item.lineUp.currentLocation}</td>
                                        <td className="c1-tabledate"  style={{whiteSpace:"nowrap"}}>{item.lineUp.totalExperience}</td>
                                        <td className="c1-tabledate"  style={{whiteSpace:"nowrap"}}>{item.lineUp.noticePeriod}</td>
                                        <td className="c1-tabledate"  style={{whiteSpace:"nowrap"}}>{item.lineUp.holdingAnyOffer}</td>
                                        <td className="c1-tabledate"  style={{whiteSpace:"nowrap"}}>{item.lineUp.feedBack}</td>
                                        <td className="c1-tabledate"  style={{whiteSpace:"nowrap"}}>{item.lineUp.finalStatus}</td>
                                        <td className="c1-tabledate" style={{whiteSpace:"nowrap"}} >
                                            <button onClick={() => viewPage(item.candidateId)}>View</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
          
        
)};

export default ShortListedCandidates;
