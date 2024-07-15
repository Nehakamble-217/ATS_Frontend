/* Ajhar-CreateReportTable.jsx-10-07-2024-lineNo-1-to-341 */
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../Reports/CreateReportTable.css";
import ShortListedCandidates from "../Reports/LineUpDataReport";
import ReportsPieChart from "../Reports/reportsPieChart";

import PdfModal from "../Reports/pdfModal";
import { createPdf } from "../Reports/pdfUtils";
import ProgressBar from "./progressBar";

const LineUpDataDummy = [
  {
    no: 1,
    date: "1/2/2024",
    status: "selected",
    Time: "12:00",
    CandidateId: 101,
    RecruiterName: "Sachin Tendulkar",
    CandidateName: "Sarika Shetye",
    CandidateEmail: "abc@gmail.com",
    ContactNo: "9823456781",
    WhatsappNo: "9823456781",
    SourceName: "ABC",
    JobDesignation: "Python Developer",
    JobId: 22,
    ApplyingCompany: "Infosys",
    CommunicationRating: 5,
    CurrentLocation: "Pune",
  },
  {
    no: 2,
    date: "1/2/2024",
    status: "rejected",
    Time: "12:00",
    CandidateId: 102,
    RecruiterName: "Sachin Tendulkar",
    CandidateName: "Sarika Shetye",
    CandidateEmail: "abc@gmail.com",
    ContactNo: "9823456781",
    WhatsappNo: "9823456781",
    SourceName: "ABC",
    JobDesignation: "Python Developer",
    JobId: 22,
    ApplyingCompany: "Infosys",
    CommunicationRating: 5,
    CurrentLocation: "Pune",
  },
  {
    no: 3,
    date: "1/2/2024",
    status: "selected",
    Time: "12:00",
    CandidateId: 103,
    RecruiterName: "Sachin Tendulkar",
    CandidateName: "Sarika Shetye",
    CandidateEmail: "abc@gmail.com",
    ContactNo: "9823456781",
    WhatsappNo: "9823456781",
    SourceName: "ABC",
    JobDesignation: "React Developer",
    JobId: 22,
    ApplyingCompany: "Infosys",
    CommunicationRating: 5,
    CurrentLocation: "Pune",
  },
  {
    no: 4,
    date: "1/2/2024",
    status: "rejected",
    Time: "12:00",
    CandidateId: 104,
    RecruiterName: "Sachin Tendulkar",
    CandidateName: "Sarika Shetye",
    CandidateEmail: "abc@gmail.com",
    ContactNo: "9823456781",
    WhatsappNo: "9823456781",
    SourceName: "ABC",
    JobDesignation: ".Net Developer",
    JobId: 22,
    ApplyingCompany: "Infosys",
    CommunicationRating: 5,
    CurrentLocation: "Pune",
  },
  {
    no: 5,
    date: "1/2/2024",
    status: "selected",
    Time: "12:00",
    CandidateId: 101,
    RecruiterName: "Sachin Tendulkar",
    CandidateName: "Sarika Shetye",
    CandidateEmail: "abc@gmail.com",
    ContactNo: "9823456781",
    WhatsappNo: "9823456781",
    SourceName: "ABC",
    JobDesignation: "Python Developer",
    JobId: 22,
    ApplyingCompany: "Infosys",
    CommunicationRating: 5,
    CurrentLocation: "Pune",
  },
  {
    no: 6,
    date: "1/2/2024",
    status: "lineup",
    Time: "12:00",
    CandidateId: 102,
    RecruiterName: "Sachin Tendulkar",
    CandidateName: "Sarika Shetye",
    CandidateEmail: "abc@gmail.com",
    ContactNo: "9823456781",
    WhatsappNo: "9823456781",
    SourceName: "ABC",
    JobDesignation: "Python Developer",
    JobId: 22,
    ApplyingCompany: "Infosys",
    CommunicationRating: 5,
    CurrentLocation: "Pune",
  },
  {
    no: 7,
    date: "1/2/2024",
    status: "hold",
    Time: "12:00",
    CandidateId: 103,
    RecruiterName: "Sachin Jawale",
    CandidateName: "Sarika Shetye",
    CandidateEmail: "abc@gmail.com",
    ContactNo: "9823456781",
    WhatsappNo: "9823456781",
    SourceName: "ABC",
    JobDesignation: "React Developer",
    JobId: 22,
    ApplyingCompany: "Infosys",
    CommunicationRating: 5,
    CurrentLocation: "Pune",
  },
  {
    no: 8,
    date: "1/2/2024",
    status: "dropout",
    Time: "12:00",
    CandidateId: 104,
    RecruiterName: "Amol Tendulkar",
    CandidateName: "Sarika Shetye",
    CandidateEmail: "abc@gmail.com",
    ContactNo: "9823456781",
    WhatsappNo: "9823456781",
    SourceName: "ABC",
    JobDesignation: ".Net Developer",
    JobId: 22,
    ApplyingCompany: "Infosys",
    CommunicationRating: 5,
    CurrentLocation: "Pune",
  },
  {
    no: 9,
    date: "1/2/2024",
    status: "join",
    Time: "12:00",
    CandidateId: 101,
    RecruiterName: "Sachin Sakhare",
    CandidateName: "Sarika Shetye",
    CandidateEmail: "abc@gmail.com",
    ContactNo: "9823456781",
    WhatsappNo: "9823456781",
    SourceName: "ABC",
    JobDesignation: "Python Developer",
    JobId: 22,
    ApplyingCompany: "Infosys",
    CommunicationRating: 5,
    CurrentLocation: "Pune",
  },
  {
    no: 10,
    date: "1/2/2024",
    status: "notjoin",
    Time: "12:00",
    CandidateId: 102,
    RecruiterName: "Amit Tendulkar",
    CandidateName: "Sarika Shetye",
    CandidateEmail: "abc@gmail.com",
    ContactNo: "9823456781",
    WhatsappNo: "9823456781",
    SourceName: "ABC",
    JobDesignation: "Python Developer",
    JobId: 22,
    ApplyingCompany: "TCS",
    CommunicationRating: 5,
    CurrentLocation: "Pune",
  },
  {
    no: 11,
    date: "1/2/2024",
    status: "active",
    Time: "12:00",
    CandidateId: 103,
    RecruiterName: "Sachin Tendulkar",
    CandidateName: "Sarika Shetye",
    CandidateEmail: "abc@gmail.com",
    ContactNo: "9823456781",
    WhatsappNo: "9823456781",
    SourceName: "ABC",
    JobDesignation: "React Developer",
    JobId: 22,
    ApplyingCompany: "Infosys",
    CommunicationRating: 5,
    CurrentLocation: "Pune",
  },
  {
    no: 12,
    date: "1/2/2024",
    status: "inactive",
    Time: "12:00",
    CandidateId: 104,
    RecruiterName: "Sachin Tiwari",
    CandidateName: "Sarika Shetye",
    CandidateEmail: "abc@gmail.com",
    ContactNo: "9823456781",
    WhatsappNo: "9823456781",
    SourceName: "ABC",
    JobDesignation: ".Net Developer",
    JobId: 22,
    ApplyingCompany: "Infosys",
    CommunicationRating: 5,
    CurrentLocation: "Pune",
  },
  {
    no: 13,
    date: "1/2/2024",
    status: "lineup",
    Time: "12:00",
    CandidateId: 101,
    RecruiterName: "Amar Tendulkar",
    CandidateName: "Sarika Shetye",
    CandidateEmail: "abc@gmail.com",
    ContactNo: "9823456781",
    WhatsappNo: "9823456781",
    SourceName: "ABC",
    JobDesignation: "Python Developer",
    JobId: 22,
    ApplyingCompany: "TCS",
    CommunicationRating: 5,
    CurrentLocation: "Pune",
  },
  {
    no: 14,
    date: "1/2/2024",
    status: "hold",
    Time: "12:00",
    CandidateId: 102,
    RecruiterName: "Sachin Tendulkar",
    CandidateName: "Sarika Shetye",
    CandidateEmail: "abc@gmail.com",
    ContactNo: "9823456781",
    WhatsappNo: "9823456781",
    SourceName: "ABC",
    JobDesignation: "Java Developer",
    JobId: 22,
    ApplyingCompany: "Infosys",
    CommunicationRating: 5,
    CurrentLocation: "Pune",
  },
  {
    no: 15,
    date: "1/2/2024",
    status: "join",
    Time: "12:00",
    CandidateId: 103,
    RecruiterName: "Sachin Tendulkar",
    CandidateName: "Sarika Shetye",
    CandidateEmail: "abc@gmail.com",
    ContactNo: "9823456781",
    WhatsappNo: "9823456781",
    SourceName: "ABC",
    JobDesignation: "Backend Developer",
    JobId: 22,
    ApplyingCompany: "Infosys",
    CommunicationRating: 5,
    CurrentLocation: "Pune",
  },
  {
    no: 16,
    date: "1/2/2024",
    status: "notjoin",
    Time: "12:00",
    CandidateId: 104,
    RecruiterName: "Sanika Tendulkar",
    CandidateName: "Sarika Shetye",
    CandidateEmail: "abc@gmail.com",
    ContactNo: "9823456781",
    WhatsappNo: "9823456781",
    SourceName: "ABC",
    JobDesignation: "Asp.Net Developer",
    JobId: 22,
    ApplyingCompany: "Infosys",
    CommunicationRating: 5,
    CurrentLocation: "Pune",
  },
  {
    no: 17,
    date: "1/2/2024",
    status: "l1",
    Time: "12:00",
    CandidateId: 104,
    RecruiterName: "Sachin Tiwari",
    CandidateName: "Sarika Shetye",
    CandidateEmail: "abc@gmail.com",
    ContactNo: "9823456781",
    WhatsappNo: "9823456781",
    SourceName: "ABC",
    JobDesignation: ".Net Developer",
    JobId: 22,
    ApplyingCompany: "Infosys",
    CommunicationRating: 5,
    CurrentLocation: "Pune",
  },
  {
    no: 18,
    date: "1/2/2024",
    status: "l2",
    Time: "12:00",
    CandidateId: 101,
    RecruiterName: "Amar Tendulkar",
    CandidateName: "Sarika Shetye",
    CandidateEmail: "abc@gmail.com",
    ContactNo: "9823456781",
    WhatsappNo: "9823456781",
    SourceName: "ABC",
    JobDesignation: "Python Developer",
    JobId: 22,
    ApplyingCompany: "TCS",
    CommunicationRating: 5,
    CurrentLocation: "Pune",
  },
  {
    no: 19,
    date: "1/2/2024",
    status: "l3",
    Time: "12:00",
    CandidateId: 102,
    RecruiterName: "Sachin Tendulkar",
    CandidateName: "Sarika Shetye",
    CandidateEmail: "abc@gmail.com",
    ContactNo: "9823456781",
    WhatsappNo: "9823456781",
    SourceName: "ABC",
    JobDesignation: "Java Developer",
    JobId: 22,
    ApplyingCompany: "Infosys",
    CommunicationRating: 5,
    CurrentLocation: "Pune",
  },
  {
    no: 20,
    date: "1/2/2024",
    status: "l4",
    Time: "12:00",
    CandidateId: 103,
    RecruiterName: "Sachin Tendulkar",
    CandidateName: "Sarika Shetye",
    CandidateEmail: "abc@gmail.com",
    ContactNo: "9823456781",
    WhatsappNo: "9823456781",
    SourceName: "ABC",
    JobDesignation: "Backend Developer",
    JobId: 22,
    ApplyingCompany: "Infosys",
    CommunicationRating: 5,
    CurrentLocation: "Pune",
  },
  {
    no: 21,
    date: "1/2/2024",
    status: "l5",
    Time: "12:00",
    CandidateId: 104,
    RecruiterName: "Sanika Tendulkar",
    CandidateName: "Sarika Shetye",
    CandidateEmail: "abc@gmail.com",
    ContactNo: "9823456781",
    WhatsappNo: "9823456781",
    SourceName: "ABC",
    JobDesignation: "Asp.Net Developer",
    JobId: 22,
    ApplyingCompany: "Infosys",
    CommunicationRating: 5,
    CurrentLocation: "Pune",
  },
  {
    no: 12,
    date: "1/2/2024",
    status: "l6",
    Time: "12:00",
    CandidateId: 104,
    RecruiterName: "Sachin Tiwari",
    CandidateName: "Sarika Shetye",
    CandidateEmail: "abc@gmail.com",
    ContactNo: "9823456781",
    WhatsappNo: "9823456781",
    SourceName: "ABC",
    JobDesignation: ".Net Developer",
    JobId: 22,
    ApplyingCompany: "Infosys",
    CommunicationRating: 5,
    CurrentLocation: "Pune",
  },
  {
    no: 13,
    date: "1/2/2024",
    status: "active",
    Time: "12:00",
    CandidateId: 101,
    RecruiterName: "Amar Tendulkar",
    CandidateName: "Sarika Shetye",
    CandidateEmail: "abc@gmail.com",
    ContactNo: "9823456781",
    WhatsappNo: "9823456781",
    SourceName: "ABC",
    JobDesignation: "Python Developer",
    JobId: 22,
    ApplyingCompany: "TCS",
    CommunicationRating: 5,
    CurrentLocation: "Pune",
  },
  {
    no: 14,
    date: "1/2/2024",
    status: "inactive",
    Time: "12:00",
    CandidateId: 102,
    RecruiterName: "Sachin Tendulkar",
    CandidateName: "Sarika Shetye",
    CandidateEmail: "abc@gmail.com",
    ContactNo: "9823456781",
    WhatsappNo: "9823456781",
    SourceName: "ABC",
    JobDesignation: "Java Developer",
    JobId: 22,
    ApplyingCompany: "Infosys",
    CommunicationRating: 5,
    CurrentLocation: "Pune",
  },
  {
    no: 15,
    date: "1/2/2024",
    status: "join",
    Time: "12:00",
    CandidateId: 103,
    RecruiterName: "Sachin Tendulkar",
    CandidateName: "Sarika Shetye",
    CandidateEmail: "abc@gmail.com",
    ContactNo: "9823456781",
    WhatsappNo: "9823456781",
    SourceName: "ABC",
    JobDesignation: "Backend Developer",
    JobId: 22,
    ApplyingCompany: "Infosys",
    CommunicationRating: 5,
    CurrentLocation: "Pune",
  },
  {
    no: 16,
    date: "1/2/2024",
    status: "notjoin",
    Time: "12:00",
    CandidateId: 104,
    RecruiterName: "Sanika Tendulkar",
    CandidateName: "Sarika Shetye",
    CandidateEmail: "abc@gmail.com",
    ContactNo: "9823456781",
    WhatsappNo: "9823456781",
    SourceName: "ABC",
    JobDesignation: "Asp.Net Developer",
    JobId: 22,
    ApplyingCompany: "Infosys",
    CommunicationRating: 5,
    CurrentLocation: "Pune",
  },
  {
    no: 17,
    date: "1/2/2024",
    status: "yettoschedule",
    Time: "12:00",
    CandidateId: 104,
    RecruiterName: "Sanika Tendulkar",
    CandidateName: "Sarika Shetye",
    CandidateEmail: "abc@gmail.com",
    ContactNo: "9823456781",
    WhatsappNo: "9823456781",
    SourceName: "ABC",
    JobDesignation: "Asp.Net Developer",
    JobId: 22,
    ApplyingCompany: "Infosys",
    CommunicationRating: 5,
    CurrentLocation: "Pune",
  },
  {
    no: 18,
    date: "1/2/2024",
    status: "noshow",
    Time: "12:00",
    CandidateId: 104,
    RecruiterName: "Sanika Tendulkar",
    CandidateName: "Sarika Shetye",
    CandidateEmail: "abc@gmail.com",
    ContactNo: "9823456781",
    WhatsappNo: "9823456781",
    SourceName: "ABC",
    JobDesignation: "Asp.Net Developer",
    JobId: 22,
    ApplyingCompany: "Infosys",
    CommunicationRating: 5,
    CurrentLocation: "Pune",
  },
];
// Data for pdf

// const DateReportData=Last 6 months report from 1/2/2004 to 1/7/2004;
const SuperUserName = "SuperUser Name : Avni Deshpande";
const ManagerName = "Manager Name : Amit Deshpande";
const TeamLeaderName = "TeamLeader Name : Shreya Sawant";
const RecruiterName = "Recruiter Name :Saniya Mirza";

const LineUpselectedCount = LineUpDataDummy.filter(
  (item) => item.status === "selected"
).length;
const LineUprejectedCount = LineUpDataDummy.filter(
  (item) => item.status === "rejected"
).length;
const LineUplineupCount = LineUpDataDummy.filter(
  (item) => item.status === "lineup"
).length;
const LineUpholdCount = LineUpDataDummy.filter(
  (item) => item.status === "hold"
).length;
const LineUpdropoutCount = LineUpDataDummy.filter(
  (item) => item.status === "dropout"
).length;
const LineUpjoinCount = LineUpDataDummy.filter(
  (item) => item.status === "join"
).length;
const LineUpnotjoinCount = LineUpDataDummy.filter(
  (item) => item.status === "notjoin"
).length;
const LineUpactiveCount = LineUpDataDummy.filter(
  (item) => item.status === "active"
).length;
const LineUpinactiveCount = LineUpDataDummy.filter(
  (item) => item.status === "inactive"
).length;
const LineUpl1Count = LineUpDataDummy.filter(
  (item) => item.status === "l1"
).length;
const LineUpl2Count = LineUpDataDummy.filter(
  (item) => item.status === "l2"
).length;
const LineUpl3Count = LineUpDataDummy.filter(
  (item) => item.status === "l3"
).length;
const LineUpl4Count = LineUpDataDummy.filter(
  (item) => item.status === "l4"
).length;
const LineUpl5Count = LineUpDataDummy.filter(
  (item) => item.status === "l5"
).length;
const LineUpl6Count = LineUpDataDummy.filter(
  (item) => item.status === "l6"
).length;
const LineUpyettoScheduleCount = LineUpDataDummy.filter(
  (item) => item.status === "yettoschedule"
).length;
const LineUpnoshowCount = LineUpDataDummy.filter(
  (item) => item.status === "noshow"
).length;

const totalCandidateCount =
  LineUpselectedCount +
  LineUprejectedCount +
  LineUplineupCount +
  LineUpholdCount +
  LineUpdropoutCount +
  LineUpjoinCount +
  LineUpnotjoinCount +
  LineUpactiveCount +
  LineUpinactiveCount +
  LineUpl1Count +
  LineUpl2Count +
  LineUpl3Count +
  LineUpl4Count +
  LineUpl5Count +
  LineUpl6Count +
  LineUpyettoScheduleCount +
  LineUpnoshowCount;
const totalCandidatepdf = "Total Candidate :" + totalCandidateCount;

const datadistributed = [
  { status: "Selected Candidate", CandidateCount: LineUpselectedCount },
  { status: "Rejected Candidate", CandidateCount: LineUprejectedCount },
  { status: "LineUp Candidate", CandidateCount: LineUplineupCount },
  { status: "Hold Candidate", CandidateCount: LineUpholdCount },
  { status: "Dropout Candidate", CandidateCount: LineUpdropoutCount },
  { status: "Join Candidate", CandidateCount: LineUpjoinCount },
  { status: "Not Join Candidate", CandidateCount: LineUpnotjoinCount },
  { status: "Active Candidate", CandidateCount: LineUpactiveCount },
  { status: "InActive Candidate", CandidateCount: LineUpinactiveCount },
  { status: "Round 1 Candidate", CandidateCount: LineUpl1Count },
  { status: "Round 2 Candidate", CandidateCount: LineUpl2Count },
  { status: "Round 3 Candidate", CandidateCount: LineUpl3Count },
  { status: "Round 4 Candidate", CandidateCount: LineUpl4Count },
  { status: "Round 5 Candidate", CandidateCount: LineUpl5Count },
  { status: "Round 6 Candidate", CandidateCount: LineUpl6Count },
  {
    status: "Yet to Schedule Candidate",
    CandidateCount: LineUpyettoScheduleCount,
  },
  { status: "No show Candidate", CandidateCount: LineUpnoshowCount },
];

const Attendance = () => {
  const [attendanceData, setAttendanceData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [LineUpDataReport, setLineUpDataReport] = useState(false);

  const [LineUpItems, setLineUpItems] = useState(LineUpDataDummy);
  const [FilterLineUpItems, setFilterLineUpItems] = useState("selected");
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [pdfUrl, setPdfUrl] = useState("");
  const [imageURL, setImageURL] = useState("");

  const { workId } = useParams();
  const navigator = useNavigate();

  const handleFilterLineUpChange = (newFilter) => {
    setFilterLineUpItems(newFilter);

    setLineUpDataReport(true);
  };

  const handleRadioChange = () => {
    // Calculate the date for last month
    const lastMonth = new Date();
    lastMonth.setMonth(lastMonth.getMonth() - 1);
    setSelectedDate(lastMonth.toISOString().split("T")[0]);
  };

  const filteredLineUpItems = LineUpItems.filter(
    (item) => item.status === FilterLineUpItems
  );

  const LineUpselectedCount = LineUpItems.filter(
    (item) => item.status === "selected"
  ).length;
  const LineUprejectedCount = LineUpItems.filter(
    (item) => item.status === "rejected"
  ).length;
  const LineUplineupCount = LineUpItems.filter(
    (item) => item.status === "lineup"
  ).length;
  const LineUpholdCount = LineUpItems.filter(
    (item) => item.status === "hold"
  ).length;
  const LineUpdropoutCount = LineUpItems.filter(
    (item) => item.status === "dropout"
  ).length;
  const LineUpjoinCount = LineUpItems.filter(
    (item) => item.status === "join"
  ).length;
  const LineUpnotjoinCount = LineUpItems.filter(
    (item) => item.status === "notjoin"
  ).length;
  const LineUpactiveCount = LineUpItems.filter(
    (item) => item.status === "active"
  ).length;
  const LineUpinactiveCount = LineUpItems.filter(
    (item) => item.status === "inactive"
  ).length;
  const LineUpl1Count = LineUpItems.filter(
    (item) => item.status === "l1"
  ).length;
  const LineUpl2Count = LineUpItems.filter(
    (item) => item.status === "l2"
  ).length;
  const LineUpl3Count = LineUpItems.filter(
    (item) => item.status === "l3"
  ).length;
  const LineUpl4Count = LineUpItems.filter(
    (item) => item.status === "l4"
  ).length;
  const LineUpl5Count = LineUpItems.filter(
    (item) => item.status === "l5"
  ).length;
  const LineUpl6Count = LineUpItems.filter(
    (item) => item.status === "l6"
  ).length;
  const LineUpyettoscheduleCount = LineUpItems.filter(
    (item) => item.status === "yettoschedule"
  ).length;
  const LineUpnoshowCount = LineUpItems.filter(
    (item) => item.status === "noshow"
  ).length;

  const handleUrl = (url) => {
    setImageURL(url);
    console.log("Image URL:", url);
    // You can now use the imageURL as needed
  };

  const handleDownloadPdf = async () => {
    try {
      // Replace this with your logic to create or fetch the PDF content

      const pieChartData = {
        labels: [
          "Red",
          "Blue",
          "Yellow",
          "Green",
          "Purple",
          "Orange",
          "Cyan",
          "Magenta",
          "Lime",
          "Pink",
          "Teal",
          "Lavender",
        ],
        datasets: [
          {
            label: "My First Dataset",
            data: [12, 19, 10, 20, 10, 15, 9, 6, 4, 7, 11, 14],
            backgroundColor: [
              "rgba(255, 99, 132, 0.6)",
              "rgba(54, 162, 235, 0.6)",
              "rgba(255, 206, 86, 0.6)",
              "rgba(75, 192, 192, 0.6)",
              "rgba(153, 102, 255, 0.6)",
              "rgba(255, 159, 64, 0.6)",
              "rgba(0, 255, 255, 0.6)",
              "rgba(255, 0, 255, 0.6)",
              "rgba(0, 255, 0, 0.6)",
              "rgba(255, 192, 203, 0.6)",
              "rgba(0, 128, 128, 0.6)",
              "rgba(230, 230, 250, 0.6)",
            ],
            borderWidth: 1,
          },
        ],
      };

      const options = {
        responsive: true,
        maintainAspectRatio: false,
      };

      const pdfContent = await createPdf(
        datadistributed,
        SuperUserName,
        ManagerName,
        TeamLeaderName,
        RecruiterName,
        DateReportData,
        totalCandidatepdf
      ); // Example function to create PDF content

      window.open(pdfContent, "_blank");

      // Open the modal
      setModalIsOpen(true);
    } catch (error) {
      console.error("Error creating PDF:", error);
    }
  };
  const closeModal = () => {
    // Clear the PDF URL and close the modal
    setPdfUrl("");
    setModalIsOpen(false);
  };

  const getLineUpData = () => {
    setLineUpDataReport(!LineUpDataReport);
  };

  return (
    <>
      <div className="createReport-App-after">
        <div>
          <div className="crt-Heading-div">
            <div className="createReportTable-heading">
              <h3>Filter Data </h3>
            </div>
            <ProgressBar />
            <div className="crt-shareDownloadbtn-div">
              <button
                className="crt-shareDownloadbtn"
                onClick={handleRadioChange}
              >
                Share
              </button>
              <button
                className="crt-shareDownloadbtn"
                onClick={handleDownloadPdf}
              >
                Download PDF
              </button>
              {/* <PdfModal isOpen={modalIsOpen} closeModal={closeModal} pdfContent={pdfUrl} /> */}
            </div>
          </div>
          <table className="createReportTable-attendance-table">
            <thead>
              <tr className="attendancerows-head">
                <th className="attendanceheading">Selected</th>
                <th className="attendanceheading">Rejected</th>
                <th className="attendanceheading">LineUP</th>
                <th className="attendanceheading">Hold</th>
                <th className="attendanceheading">Dropout</th>
                <th className="attendanceheading">Join</th>
                <th className="attendanceheading">Not Join</th>
                <th className="attendanceheading">Active</th>
                <th className="attendanceheading">InActive</th>
                <th className="attendanceheading">Round1</th>
                <th className="attendanceheading">Round2</th>
                <th className="attendanceheading">Round3</th>
                <th className="attendanceheading">Round4</th>
                <th className="attendanceheading">Round5</th>
                <th className="attendanceheading">Round6</th>
                <th className="attendanceheading">Yet To Schedule</th>
                <th className="attendanceheading">No Show</th>
              </tr>
            </thead>
            <tbody>
              <tr className="attendancerows">
                <td
                  className="tabledata"
                  onClick={() => handleFilterLineUpChange("selected")}
                >
                  {LineUpselectedCount}
                  <i class="fa fa-caret-down" aria-hidden="true"></i>

                  <div className="tooltip">
                    <span className="tooltiptext"></span>
                  </div>
                </td>

                <td
                  className="tabledata"
                  onClick={() => handleFilterLineUpChange("rejected")}
                >
                  {LineUprejectedCount}
                  <i class="fa fa-caret-down" aria-hidden="true">
                    {" "}
                  </i>
                  <div className="tooltip">
                    <span className="tooltiptext"></span>
                  </div>
                </td>
                <td
                  className="tabledata"
                  onClick={() => handleFilterLineUpChange("lineup")}
                >
                  {LineUplineupCount}
                  <i class="fa fa-caret-down" aria-hidden="true"></i>
                  <div className="tooltip">
                    <span className="tooltiptext"></span>
                  </div>
                </td>
                <td
                  className="tabledata"
                  onClick={() => handleFilterLineUpChange("hold")}
                >
                  {LineUpholdCount}
                  <i class="fa fa-caret-down" aria-hidden="true"></i>
                  <div className="tooltip">
                    <span className="tooltiptext"></span>
                  </div>
                </td>
                <td
                  className="tabledata"
                  onClick={() => handleFilterLineUpChange("dropout")}
                >
                  {LineUpdropoutCount}
                  <i class="fa fa-caret-down" aria-hidden="true"></i>
                  <div className="tooltip">
                    <span className="tooltiptext"></span>
                  </div>
                </td>
                <td
                  className="tabledata"
                  onClick={() => handleFilterLineUpChange("join")}
                >
                  {LineUpjoinCount}
                  <i class="fa fa-caret-down" aria-hidden="true"></i>
                  <div className="tooltip">
                    <span className="tooltiptext"></span>
                  </div>
                </td>
                <td
                  className="tabledata"
                  onClick={() => handleFilterLineUpChange("notjoin")}
                >
                  {LineUpnotjoinCount}
                  <i class="fa fa-caret-down" aria-hidden="true"></i>
                  <div className="tooltip">
                    <span className="tooltiptext"></span>
                  </div>
                </td>
                <td
                  className="tabledata"
                  onClick={() => handleFilterLineUpChange("active")}
                >
                  {LineUpactiveCount}
                  <i class="fa fa-caret-down" aria-hidden="true"></i>
                  <div className="tooltip">
                    <span className="tooltiptext"></span>
                  </div>
                </td>
                <td
                  className="tabledata"
                  onClick={() => handleFilterLineUpChange("inactive")}
                >
                  {LineUpinactiveCount}
                  <i class="fa fa-caret-down" aria-hidden="true"></i>
                  <div className="tooltip">
                    <span className="tooltiptext"></span>
                  </div>
                </td>
                <td
                  className="tabledata"
                  onClick={() => handleFilterLineUpChange("l1")}
                >
                  {LineUpl1Count}
                  <i class="fa fa-caret-down" aria-hidden="true"></i>
                  <div className="tooltip">
                    <span className="tooltiptext"></span>
                  </div>
                </td>
                <td
                  className="tabledata"
                  onClick={() => handleFilterLineUpChange("l2")}
                >
                  {LineUpl2Count}
                  <i class="fa fa-caret-down" aria-hidden="true"></i>
                  <div className="tooltip">
                    <span className="tooltiptext"></span>
                  </div>
                </td>
                <td
                  className="tabledata"
                  onClick={() => handleFilterLineUpChange("l3")}
                >
                  {LineUpl3Count}
                  <i class="fa fa-caret-down" aria-hidden="true"></i>
                  <div className="tooltip">
                    <span className="tooltiptext"></span>
                  </div>
                </td>
                <td
                  className="tabledata"
                  onClick={() => handleFilterLineUpChange("l4")}
                >
                  {LineUpl4Count}
                  <i class="fa fa-caret-down" aria-hidden="true"></i>
                  <div className="tooltip">
                    <span className="tooltiptext"></span>
                  </div>
                </td>
                <td
                  className="tabledata"
                  onClick={() => handleFilterLineUpChange("l5")}
                >
                  {LineUpl5Count}

                  <i class="fa fa-caret-down" aria-hidden="true"></i>
                  <div className="tooltip">
                    <span className="tooltiptext"></span>
                  </div>
                </td>
                <td
                  className="tabledata"
                  onClick={() => handleFilterLineUpChange("l6")}
                >
                  {LineUpl6Count}
                  <i class="fa fa-caret-down" aria-hidden="true"></i>
                  <div className="tooltip">
                    <span className="tooltiptext"></span>
                  </div>
                </td>
                <td
                  className="tabledata"
                  onClick={() => handleFilterLineUpChange("yettoschedule")}
                >
                  {LineUpyettoscheduleCount}
                  <i class="fa fa-caret-down" aria-hidden="true"></i>
                  <div className="tooltip">
                    <span className="tooltiptext"></span>
                  </div>
                </td>
                <td
                  className="tabledata"
                  onClick={() => handleFilterLineUpChange("noshow")}
                >
                  {LineUpnoshowCount}
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

      <div>
        <ReportsPieChart data={datadistributed} onSaveImage={handleUrl} />
      </div>
      {/* <PieChart /> */}

      <div className="crt-shortlisted-candidates-css">
        {LineUpDataReport && (
          <ShortListedCandidates filteredLineUpItems={filteredLineUpItems} />
        )}

        {/* {LineUpDataReport &&<ReportsPieChart/>
          } */}
      </div>
    </>
  );
};

export default Attendance;
