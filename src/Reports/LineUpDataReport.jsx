/* Ajhar-LineUpDateReport.jsx-10-07-2024-lineNo-1-to-124 */


import React, { useState, useEffect } from 'react';
import "../Reports/LineUpDataReport.css";

const ShortListedCandidates=({filteredLineUpItems})=>{

    
    return(
        <div className="Ludr-main-div">
            <div className="ludr-search">
            <i
              className="fa-solid fa-magnifying-glass"
              onClick={() => setShowSearchBar(!showSearchBar)}
              style={{ margin: "10px", width: "auto", fontSize: "15px"  }}
            ></i>
            </div>

                <div className='lineUpData-shortlisted-Candidate'>
                <h5 >
                    Shortlisted Candidate
                </h5>
                </div>
                {/* <div
                style={{
                    display:"flex",
                    gap:"5px",
                    justifyContent:"center",
                    alignItems:"center",
                    paddingTop:"3px",
                }}
                >
                    <button
                    className="lineUpDataReport-Share-btn"
                    // onClick={}
                    >Share</button>
                    <button
                    className="lineUpDataReport-Download-btn"
                  
                     >Download
                    </button>

                </div> */}

            <table id='shortlisted-table-id' className='Ludr-attendance-table'>
                <thead>
                    <tr className='attencerows-head'>
                    {/* <th className="attendanceheading"> <input type="checkbox" name="selectAll" id="" /></th> */}
                <th className="attendanceheading"> No.</th>
                <th className="attendanceheading">Date</th>
                <th className="attendanceheading">Time</th>
                <th className="attendanceheading">Candidate's Id</th>
                <th className="attendanceheading">Recruiter's Name</th>
                <th className="attendanceheading">Candidate's Name</th>
                <th className="attendanceheading">Candidate's Email</th>
                <th className="attendanceheading">Contact Number</th>
                <th className="attendanceheading">Whatsapp Number</th>
                <th className="attendanceheading">Source Name</th>
                <th className="attendanceheading">Job Designation</th>
                <th className="attendanceheading">Job Id</th>
                <th className="attendanceheading">Applying Company</th>
                <th className="attendanceheading">Communication Rating</th>
                <th className="attendanceheading">Current Location</th>
                <th className="attendanceheading">Full Address</th>
                <th className="attendanceheading">Calling Remark</th>
                <th className="attendanceheading">Recruiter's Incentive</th>
                <th className="attendanceheading">Interested or Not</th>
                <th className="attendanceheading">Current Company</th>
                <th className="attendanceheading">Total Experience</th>
                <th className="attendanceheading">Relevant Experience</th>
                <th className="attendanceheading">Current CTC</th>
                <th className="attendanceheading">Expected CTC</th>
                <th className="attendanceheading">Date Of Birth</th>
                <th className="attendanceheading">Gender</th>
                <th className="attendanceheading">Education</th>
                <th className="attendanceheading">Year Of Passing</th>
                <th className="attendanceheading">Call Summary</th>
               
                <th className="attendanceheading">Holding Any Offer</th>
                <th className="attendanceheading">Offer Letter Message</th>
                <th className="attendanceheading">Resume</th>
                <th className="attendanceheading">Notice Period</th>
                <th className="attendanceheading">Message For Team Leader</th>
                <th className="attendanceheading">Interview Slot</th>
                <th className="attendanceheading">Interview Time</th>
                <th className="attendanceheading">Final Status</th>
                <th className="attendanceheading">Action</th>


                    </tr>
                </thead>
                <tbody>
                           
                           {filteredLineUpItems.map((item=>(
                               <tr key={item.id} className='attendancerows'>
                                   <td>{item.id}</td>
                                   <td>{item.no}</td>
                                   <td>{item.date}</td>
                                   <td></td>
                                   <td>{item.CandidateId}</td>
                                   <td>{item.RecruiterName}</td>
                                   <td>{item.CandidateName}</td>
                                   <td>{item.CandidateEmail}</td>
                                   <td>{item.ContactNo}</td>
                                   <td>{item.WhatsappNo}</td>
                                   <td>{item.SourceName}</td>
                                   <td>{item.JobDesignation}</td>
                                   <td>{item.JobId}</td> 
                                   <td>{item.ApplyingCompany}</td>
                                   <td>{item.CommunicationRating}</td>  
                                   <td>{item.CurrentLocation}</td>
       
                                   
                               </tr>
                           )))}
       
                       </tbody>
            </table>

        </div>
    )
};

export default ShortListedCandidates;