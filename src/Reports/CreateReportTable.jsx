/* Ajhar-CreateReportTable.jsx-10-07-2024-lineNo-1-to-341 */


import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import "../Reports/CreateReportTable.css";
import ShortListedCandidates from "../Reports/LineUpDataReport";
import ReportsPieChart from "../Reports/reportsPieChart"

import PdfModal from '../Reports/pdfModal';
import {createPdf } from '../Reports/pdfUtils';
import ProgressBar from "./progressBar";


const LineUpDataDummy=[
  {no:1,date:'1/2/2024',status:'selected',Time:'12:00',CandidateId:101,RecruiterName:"Sachin Tendulkar",CandidateName:"Sarika Shetye",CandidateEmail:"abc@gmail.com",ContactNo:"9823456781",WhatsappNo:"9823456781",SourceName:"ABC",JobDesignation:"Python Developer" ,JobId:22,ApplyingCompany:"Infosys",CommunicationRating:5,CurrentLocation:"Pune"},
  {no:2,date:'1/2/2024',status:'rejected',Time:'12:00',CandidateId:102,RecruiterName:"Sachin Tendulkar",CandidateName:"Sarika Shetye",CandidateEmail:"abc@gmail.com",ContactNo:"9823456781",WhatsappNo:"9823456781",SourceName:"ABC",JobDesignation:"Python Developer" ,JobId:22,ApplyingCompany:"Infosys",CommunicationRating:5,CurrentLocation:"Pune" },
  {no:3,date:'1/2/2024',status:'selected',Time:'12:00',CandidateId:103,RecruiterName:"Sachin Tendulkar",CandidateName:"Sarika Shetye",CandidateEmail:"abc@gmail.com",ContactNo:"9823456781",WhatsappNo:"9823456781",SourceName:"ABC",JobDesignation:"React Developer",JobId:22,ApplyingCompany:"Infosys",CommunicationRating:5,CurrentLocation:"Pune" },
  {no:4,date:'1/2/2024',status:'rejected',Time:'12:00',CandidateId:104,RecruiterName:"Sachin Tendulkar",CandidateName:"Sarika Shetye",CandidateEmail:"abc@gmail.com",ContactNo:"9823456781",WhatsappNo:"9823456781",SourceName:"ABC",JobDesignation:".Net Developer" ,JobId:22,ApplyingCompany:"Infosys",CommunicationRating:5,CurrentLocation:"Pune"},
  {no:5,date:'1/2/2024',status:'selected',Time:'12:00',CandidateId:101,RecruiterName:"Sachin Tendulkar",CandidateName:"Sarika Shetye",CandidateEmail:"abc@gmail.com",ContactNo:"9823456781",WhatsappNo:"9823456781",SourceName:"ABC",JobDesignation:"Python Developer" ,JobId:22,ApplyingCompany:"Infosys",CommunicationRating:5,CurrentLocation:"Pune"},
  {no:6,date:'1/2/2024',status:'lineup',Time:'12:00',CandidateId:102,RecruiterName:"Sachin Tendulkar",CandidateName:"Sarika Shetye",CandidateEmail:"abc@gmail.com",ContactNo:"9823456781",WhatsappNo:"9823456781",SourceName:"ABC",JobDesignation:"Python Developer" ,JobId:22,ApplyingCompany:"Infosys",CommunicationRating:5,CurrentLocation:"Pune" },
  {no:7,date:'1/2/2024',status:'hold',Time:'12:00',CandidateId:103,RecruiterName:"Sachin Jawale",CandidateName:"Sarika Shetye",CandidateEmail:"abc@gmail.com",ContactNo:"9823456781",WhatsappNo:"9823456781",SourceName:"ABC",JobDesignation:"React Developer",JobId:22,ApplyingCompany:"Infosys",CommunicationRating:5,CurrentLocation:"Pune" },
  {no:8,date:'1/2/2024',status:'dropout',Time:'12:00',CandidateId:104,RecruiterName:"Amol Tendulkar",CandidateName:"Sarika Shetye",CandidateEmail:"abc@gmail.com",ContactNo:"9823456781",WhatsappNo:"9823456781",SourceName:"ABC",JobDesignation:".Net Developer" ,JobId:22,ApplyingCompany:"Infosys",CommunicationRating:5,CurrentLocation:"Pune"},
  {no:9,date:'1/2/2024',status:'join',Time:'12:00',CandidateId:101,RecruiterName:"Sachin Sakhare",CandidateName:"Sarika Shetye",CandidateEmail:"abc@gmail.com",ContactNo:"9823456781",WhatsappNo:"9823456781",SourceName:"ABC",JobDesignation:"Python Developer" ,JobId:22,ApplyingCompany:"Infosys",CommunicationRating:5,CurrentLocation:"Pune"},
  {no:10,date:'1/2/2024',status:'notjoin',Time:'12:00',CandidateId:102,RecruiterName:"Amit Tendulkar",CandidateName:"Sarika Shetye",CandidateEmail:"abc@gmail.com",ContactNo:"9823456781",WhatsappNo:"9823456781",SourceName:"ABC",JobDesignation:"Python Developer" ,JobId:22,ApplyingCompany:"TCS",CommunicationRating:5,CurrentLocation:"Pune" },
  {no:11,date:'1/2/2024',status:'active',Time:'12:00',CandidateId:103,RecruiterName:"Sachin Tendulkar",CandidateName:"Sarika Shetye",CandidateEmail:"abc@gmail.com",ContactNo:"9823456781",WhatsappNo:"9823456781",SourceName:"ABC",JobDesignation:"React Developer",JobId:22,ApplyingCompany:"Infosys",CommunicationRating:5,CurrentLocation:"Pune" },
  {no:12,date:'1/2/2024',status:'inactive',Time:'12:00',CandidateId:104,RecruiterName:"Sachin Tiwari",CandidateName:"Sarika Shetye",CandidateEmail:"abc@gmail.com",ContactNo:"9823456781",WhatsappNo:"9823456781",SourceName:"ABC",JobDesignation:".Net Developer" ,JobId:22,ApplyingCompany:"Infosys",CommunicationRating:5,CurrentLocation:"Pune"},
  {no:13,date:'1/2/2024',status:'lineup',Time:'12:00',CandidateId:101,RecruiterName:"Amar Tendulkar",CandidateName:"Sarika Shetye",CandidateEmail:"abc@gmail.com",ContactNo:"9823456781",WhatsappNo:"9823456781",SourceName:"ABC",JobDesignation:"Python Developer" ,JobId:22,ApplyingCompany:"TCS",CommunicationRating:5,CurrentLocation:"Pune"},
  {no:14,date:'1/2/2024',status:'hold',Time:'12:00',CandidateId:102,RecruiterName:"Sachin Tendulkar",CandidateName:"Sarika Shetye",CandidateEmail:"abc@gmail.com",ContactNo:"9823456781",WhatsappNo:"9823456781",SourceName:"ABC",JobDesignation:"Java Developer" ,JobId:22,ApplyingCompany:"Infosys",CommunicationRating:5,CurrentLocation:"Pune" },
  {no:15,date:'1/2/2024',status:'join',Time:'12:00',CandidateId:103,RecruiterName:"Sachin Tendulkar",CandidateName:"Sarika Shetye",CandidateEmail:"abc@gmail.com",ContactNo:"9823456781",WhatsappNo:"9823456781",SourceName:"ABC",JobDesignation:"Backend Developer",JobId:22,ApplyingCompany:"Infosys",CommunicationRating:5,CurrentLocation:"Pune" },
  {no:16,date:'1/2/2024',status:'notjoin',Time:'12:00',CandidateId:104,RecruiterName:"Sanika Tendulkar",CandidateName:"Sarika Shetye",CandidateEmail:"abc@gmail.com",ContactNo:"9823456781",WhatsappNo:"9823456781",SourceName:"ABC",JobDesignation:"Asp.Net Developer" ,JobId:22,ApplyingCompany:"Infosys",CommunicationRating:5,CurrentLocation:"Pune"},
  {no:17,date:'1/2/2024',status:'l1',Time:'12:00',CandidateId:104,RecruiterName:"Sachin Tiwari",CandidateName:"Sarika Shetye",CandidateEmail:"abc@gmail.com",ContactNo:"9823456781",WhatsappNo:"9823456781",SourceName:"ABC",JobDesignation:".Net Developer" ,JobId:22,ApplyingCompany:"Infosys",CommunicationRating:5,CurrentLocation:"Pune"},
  {no:18,date:'1/2/2024',status:'l2',Time:'12:00',CandidateId:101,RecruiterName:"Amar Tendulkar",CandidateName:"Sarika Shetye",CandidateEmail:"abc@gmail.com",ContactNo:"9823456781",WhatsappNo:"9823456781",SourceName:"ABC",JobDesignation:"Python Developer" ,JobId:22,ApplyingCompany:"TCS",CommunicationRating:5,CurrentLocation:"Pune"},
  {no:19,date:'1/2/2024',status:'l3',Time:'12:00',CandidateId:102,RecruiterName:"Sachin Tendulkar",CandidateName:"Sarika Shetye",CandidateEmail:"abc@gmail.com",ContactNo:"9823456781",WhatsappNo:"9823456781",SourceName:"ABC",JobDesignation:"Java Developer" ,JobId:22,ApplyingCompany:"Infosys",CommunicationRating:5,CurrentLocation:"Pune" },
  {no:20,date:'1/2/2024',status:'l4',Time:'12:00',CandidateId:103,RecruiterName:"Sachin Tendulkar",CandidateName:"Sarika Shetye",CandidateEmail:"abc@gmail.com",ContactNo:"9823456781",WhatsappNo:"9823456781",SourceName:"ABC",JobDesignation:"Backend Developer",JobId:22,ApplyingCompany:"Infosys",CommunicationRating:5,CurrentLocation:"Pune" },
  {no:21,date:'1/2/2024',status:'l5',Time:'12:00',CandidateId:104,RecruiterName:"Sanika Tendulkar",CandidateName:"Sarika Shetye",CandidateEmail:"abc@gmail.com",ContactNo:"9823456781",WhatsappNo:"9823456781",SourceName:"ABC",JobDesignation:"Asp.Net Developer" ,JobId:22,ApplyingCompany:"Infosys",CommunicationRating:5,CurrentLocation:"Pune"},
  {no:12,date:'1/2/2024',status:'l6',Time:'12:00',CandidateId:104,RecruiterName:"Sachin Tiwari",CandidateName:"Sarika Shetye",CandidateEmail:"abc@gmail.com",ContactNo:"9823456781",WhatsappNo:"9823456781",SourceName:"ABC",JobDesignation:".Net Developer" ,JobId:22,ApplyingCompany:"Infosys",CommunicationRating:5,CurrentLocation:"Pune"},
  {no:13,date:'1/2/2024',status:'active',Time:'12:00',CandidateId:101,RecruiterName:"Amar Tendulkar",CandidateName:"Sarika Shetye",CandidateEmail:"abc@gmail.com",ContactNo:"9823456781",WhatsappNo:"9823456781",SourceName:"ABC",JobDesignation:"Python Developer" ,JobId:22,ApplyingCompany:"TCS",CommunicationRating:5,CurrentLocation:"Pune"},
  {no:14,date:'1/2/2024',status:'inactive',Time:'12:00',CandidateId:102,RecruiterName:"Sachin Tendulkar",CandidateName:"Sarika Shetye",CandidateEmail:"abc@gmail.com",ContactNo:"9823456781",WhatsappNo:"9823456781",SourceName:"ABC",JobDesignation:"Java Developer" ,JobId:22,ApplyingCompany:"Infosys",CommunicationRating:5,CurrentLocation:"Pune" },
  {no:15,date:'1/2/2024',status:'join',Time:'12:00',CandidateId:103,RecruiterName:"Sachin Tendulkar",CandidateName:"Sarika Shetye",CandidateEmail:"abc@gmail.com",ContactNo:"9823456781",WhatsappNo:"9823456781",SourceName:"ABC",JobDesignation:"Backend Developer",JobId:22,ApplyingCompany:"Infosys",CommunicationRating:5,CurrentLocation:"Pune" },
  {no:16,date:'1/2/2024',status:'notjoin',Time:'12:00',CandidateId:104,RecruiterName:"Sanika Tendulkar",CandidateName:"Sarika Shetye",CandidateEmail:"abc@gmail.com",ContactNo:"9823456781",WhatsappNo:"9823456781",SourceName:"ABC",JobDesignation:"Asp.Net Developer" ,JobId:22,ApplyingCompany:"Infosys",CommunicationRating:5,CurrentLocation:"Pune"},
  {no:17,date:'1/2/2024',status:'yettoschedule',Time:'12:00',CandidateId:104,RecruiterName:"Sanika Tendulkar",CandidateName:"Sarika Shetye",CandidateEmail:"abc@gmail.com",ContactNo:"9823456781",WhatsappNo:"9823456781",SourceName:"ABC",JobDesignation:"Asp.Net Developer" ,JobId:22,ApplyingCompany:"Infosys",CommunicationRating:5,CurrentLocation:"Pune"},
  {no:18,date:'1/2/2024',status:'noshow',Time:'12:00',CandidateId:104,RecruiterName:"Sanika Tendulkar",CandidateName:"Sarika Shetye",CandidateEmail:"abc@gmail.com",ContactNo:"9823456781",WhatsappNo:"9823456781",SourceName:"ABC",JobDesignation:"Asp.Net Developer" ,JobId:22,ApplyingCompany:"Infosys",CommunicationRating:5,CurrentLocation:"Pune"}



]

const data = [
  { status: 'Selected Candidate', CandidateCount: 30},
  { status: 'Rejected Candidate', CandidateCount: 25 },
  { status: 'LineUp Candidate', CandidateCount: 40 },
  { status: 'Hold Candidate', CandidateCount: 17 },
  { status: 'Dropout Candidate', CandidateCount: 6 },
  { status: 'Join Candidate', CandidateCount: 40 },
  { status: 'Not Join Candidate', CandidateCount: 20 },
  { status: 'Active Candidate', CandidateCount: 40 },
  { status: 'InActive Candidate', CandidateCount: 40 },
  { status: 'Round 1 Candidate', CandidateCount: 10 },
  { status: 'Round 2 Candidate', CandidateCount: 40 },
  { status: 'Round 3 Candidate', CandidateCount: 12 },
  { status: 'Round 4 Candidate', CandidateCount: 14 },
  { status: 'Round 5 Candidate', CandidateCount: 32 },
  { status: 'Round 6 Candidate', CandidateCount: 33 },

  { status: 'Yet To Schedule Candidate', CandidateCount: 33 },
  { status: 'No Show Candidate', CandidateCount: 33 },
  {status:'Total',CandidateCount:200},

];


const Attendance = () => {
  const [attendanceData, setAttendanceData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [LineUpDataReport,setLineUpDataReport]=useState(false);

  const [LineUpItems, setLineUpItems] = useState(LineUpDataDummy);
  const [FilterLineUpItems,setFilterLineUpItems]=useState('selected');
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [pdfUrl, setPdfUrl] = useState('');

  const { workId } = useParams();
  const navigator = useNavigate();

  const handleFilterLineUpChange=(newFilter)=>{
    setFilterLineUpItems(newFilter);
    
    setLineUpDataReport(true); 

  }

  const handleRadioChange = () => {
    // Calculate the date for last month
    const lastMonth = new Date();
    lastMonth.setMonth(lastMonth.getMonth() - 1);
    setSelectedDate(lastMonth.toISOString().split('T')[0]);
  };

  const filteredLineUpItems=LineUpItems.filter(item=>item.status===FilterLineUpItems);

  const LineUpselectedCount = LineUpItems.filter(item => item.status === 'selected').length;
  const LineUprejectedCount = LineUpItems.filter(item => item.status === 'rejected').length;
  const LineUplineupCount = LineUpItems.filter(item => item.status === 'lineup').length;
  const LineUpholdCount = LineUpItems.filter(item => item.status === 'hold').length;
  const LineUpdropoutCount = LineUpItems.filter(item => item.status === 'dropout').length;
  const LineUpjoinCount = LineUpItems.filter(item => item.status === 'join').length;
  const LineUpnotjoinCount = LineUpItems.filter(item => item.status === 'notjoin').length;
  const LineUpactiveCount = LineUpItems.filter(item => item.status === 'active').length;
  const LineUpinactiveCount = LineUpItems.filter(item => item.status === 'inactive').length;
  const LineUpl1Count = LineUpItems.filter(item => item.status === 'l1').length;
  const LineUpl2Count = LineUpItems.filter(item => item.status === 'l2').length;
  const LineUpl3Count = LineUpItems.filter(item => item.status === 'l3').length;
  const LineUpl4Count = LineUpItems.filter(item => item.status === 'l4').length;
  const LineUpl5Count = LineUpItems.filter(item => item.status === 'l5').length;
  const LineUpl6Count = LineUpItems.filter(item => item.status === 'l6').length;

  const LineUpyettoscheduleCount = LineUpItems.filter(item => item.status === 'yettoschedule').length;
  const LineUpnoshowCount = LineUpItems.filter(item => item.status === 'noshow').length;

  const handleDownloadPdf = async () => {
    try {
      // Replace this with your logic to create or fetch the PDF content
      const pdfContent = await createPdf(data); // Example function to create PDF content
      
      

      window.open(pdfContent, '_blank');
      
      
      // Open the modal
      setModalIsOpen(true);
    } catch (error) {
      console.error('Error creating PDF:', error);
    }
  };
  const closeModal = () => {
    // Clear the PDF URL and close the modal
    setPdfUrl('');
    setModalIsOpen(false);
  };




  const getLineUpData=()=>{
    setLineUpDataReport(!LineUpDataReport);
    
  }
 


  return (
    <>
    <div className="createReport-App-after">

   

          <div>
            <div className='crt-Heading-div'>
                  <div className="createReportTable-heading"> 
                <h3 >Filter Data </h3>
            </div>
            <ProgressBar/>
            <div className="crt-shareDownloadbtn-div">
                    <button
                    className="crt-shareDownloadbtn"
                    onClick={handleRadioChange}
                    >Share</button>
                    <button
                    className="crt-shareDownloadbtn"
                    onClick={handleDownloadPdf}
                     >Download PDF
                    </button>
                    {/* <PdfModal isOpen={modalIsOpen} closeModal={closeModal} pdfContent={pdfUrl} /> */}
                    </div>
                </div>
          <table className="createReportTable-attendance-table">
            <thead>
              <tr className='attendancerows-head'>
                
                <th className='attendanceheading'>Selected</th>
                <th className='attendanceheading'>Rejected</th>
                <th className='attendanceheading'>LineUP</th>
                <th className='attendanceheading'>Hold</th>
                <th className='attendanceheading'>Dropout</th>
                <th className='attendanceheading'>Join</th>
                <th className='attendanceheading'>Not Join</th>
                <th className='attendanceheading'>Active</th>
                <th className='attendanceheading'>InActive</th>
                <th className='attendanceheading'>Round1</th>
                <th className='attendanceheading'>Round2</th>
                <th className='attendanceheading'>Round3</th>
                <th className='attendanceheading'>Round4</th>
                <th className='attendanceheading'>Round5</th>
                <th className='attendanceheading'>Round6</th>
                <th className='attendanceheading'>Yet To Schedule</th>
                <th className='attendanceheading'>No Show</th>
                
                </tr>
            </thead>
            <tbody>
            <tr className='attendancerows'>
            
              
                  <td className='tabledata' onClick={()=>handleFilterLineUpChange('selected')} >
             
                  {LineUpselectedCount}
                  <i class="fa fa-caret-down" aria-hidden="true">

                  </i>

                    <div className="tooltip">
                      <span className="tooltiptext"></span>
                    </div>
                  </td>
                 
                  <td className='tabledata' onClick={()=>handleFilterLineUpChange('rejected')} >{LineUprejectedCount}
                  <i class="fa fa-caret-down" aria-hidden="true"> </i>
                    <div className="tooltip">
                      <span className="tooltiptext"></span>
                    </div>
                  </td>
                  <td className='tabledata'  onClick={()=>handleFilterLineUpChange('lineup')}  >{LineUplineupCount}
                  <i class="fa fa-caret-down" aria-hidden="true"></i>
                    <div className="tooltip">
                      <span className="tooltiptext"></span>
                    </div>
                  </td>
                  <td className='tabledata' onClick={()=>handleFilterLineUpChange('hold')}>{LineUpholdCount}
                  <i class="fa fa-caret-down" aria-hidden="true"></i>
                    <div className="tooltip">
                      <span className="tooltiptext"></span>
                    </div>
                  </td>
                  <td className='tabledata' onClick={(()=>handleFilterLineUpChange('dropout'))} >{LineUpdropoutCount}
                  <i class="fa fa-caret-down" aria-hidden="true"></i>
                    <div className="tooltip">
                      <span className="tooltiptext"></span>
                    </div>
                  </td>
                  <td className='tabledata'  onClick={(()=>handleFilterLineUpChange('join'))} >{LineUpjoinCount}
                  <i class="fa fa-caret-down" aria-hidden="true"></i>
                    <div className="tooltip">
                      <span className="tooltiptext"></span>
                    </div>
                  </td>
                  <td className='tabledata' onClick={(()=>handleFilterLineUpChange('notjoin'))} >{LineUpnotjoinCount}
                  <i class="fa fa-caret-down" aria-hidden="true"></i>
                    <div className="tooltip">
                      <span className="tooltiptext"></span>
                    </div>
                  </td>
                  <td className='tabledata' onClick={(()=>handleFilterLineUpChange('active'))}>{LineUpactiveCount}
                  <i class="fa fa-caret-down" aria-hidden="true"></i>
                    <div className="tooltip">
                      <span className="tooltiptext"></span>
                    </div>
                  </td>
                  <td className='tabledata' onClick={(()=>handleFilterLineUpChange('inactive'))}>{LineUpinactiveCount}
                  <i class="fa fa-caret-down" aria-hidden="true"></i>
                    <div className="tooltip">
                      <span className="tooltiptext"></span>
                    </div>
                  </td>
                  <td className='tabledata' onClick={(()=>handleFilterLineUpChange('l1'))} >{LineUpl1Count}
                  <i class="fa fa-caret-down" aria-hidden="true"></i>
                    <div className="tooltip">
                      <span className="tooltiptext"></span>
                    </div>
                  </td>
                  <td className='tabledata' onClick={(()=>handleFilterLineUpChange('l2'))}  >{LineUpl2Count}
                  <i class="fa fa-caret-down" aria-hidden="true"></i>
                    <div className="tooltip">
                      <span className="tooltiptext"></span>
                    </div>
                  </td>
                  <td className='tabledata' onClick={(()=>handleFilterLineUpChange('l3'))}>{LineUpl3Count}
                  <i class="fa fa-caret-down" aria-hidden="true"></i>
                    <div className="tooltip">
                      <span className="tooltiptext"></span>
                    </div>
                  </td>
                  <td className='tabledata' onClick={(()=>handleFilterLineUpChange('l4'))}>{LineUpl4Count}
                  <i class="fa fa-caret-down" aria-hidden="true"></i>
                    <div className="tooltip">
                      <span className="tooltiptext"></span>
                    </div>
                  </td>
                  <td className='tabledata' onClick={(()=>handleFilterLineUpChange('l5'))} >{LineUpl5Count}
                    
                  <i class="fa fa-caret-down" aria-hidden="true"></i>
                    <div className="tooltip">
                      <span className="tooltiptext"></span>
                    </div>
                  </td>
                  <td className='tabledata' onClick={(()=>handleFilterLineUpChange('l6'))}>{LineUpl6Count}
                  <i class="fa fa-caret-down" aria-hidden="true"></i>
                    <div className="tooltip">
                      <span className="tooltiptext"></span>
                    </div>
                  </td>
                  <td className='tabledata' onClick={(()=>handleFilterLineUpChange('yettoschedule'))}>{LineUpyettoscheduleCount}
                  <i class="fa fa-caret-down" aria-hidden="true"></i>
                    <div className="tooltip">
                      <span className="tooltiptext"></span>
                    </div>
                  </td>
                  <td className='tabledata' onClick={(()=>handleFilterLineUpChange('noshow'))}>{LineUpnoshowCount}
                  <i class="fa fa-caret-down" aria-hidden="true"></i>
                    <div className="tooltip">
                      <span className="tooltiptext"></span>
                    </div>
                  </td>
             </tr>
             
            </tbody>
          </table>

          </div>     
   
       
      </div>

      <div className='crt-shortlisted-candidates-css'>
          {LineUpDataReport &&  <ShortListedCandidates filteredLineUpItems={filteredLineUpItems}/> 
            
           }

          {/* {LineUpDataReport &&<ReportsPieChart/>
          } */}

          </div>

      </>
      
  );
}

export default Attendance;