/* Mohini_InvoiceTable_WholePage_09/07/2024 */

import React, { useEffect, useState } from 'react';
import './invoiceReport.css';
import InvoicePdf from './invoicePdf';

const InvoiceReport = ({handleInvoicePdf}) => {
      // const [showInvoicePdf,setShowInvoicePdf]=useState(false)
      const [invoiceReport,setInvoiceReport] = useState([]);

      useEffect(()=>{
        fetchInvoice();
      },[])

      const fetchInvoice = async()=>{
        const response = await fetch('http://localhost:8080/api/fetchInvoice')
        const data = await response.json();
        setInvoiceReport(data);
        console.log(data);
      }

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
//   const handleInvoicePdf =()=>{
//       setShowInvoicePdf(!showInvoicePdf)
//   }

  return (
    <div className="attendanceTableData">
      <table className="selfcalling-table attendance-table">
        <thead>
          <tr className="attendancerows-head">
            <th className="attendanceheading">Sr No.</th>
            <th className="attendanceheading">Invoice Date</th>
            <th className="attendanceheading">Client Name</th>
            <th className="attendanceheading">Client Address</th>
            {/* Company Details */}
            <th className="attendanceheading" colSpan="5">Company Details</th>
           
            <th className="attendanceheading">Invoice Number</th>
            <th className="attendanceheading">Service Type</th>
            <th className="attendanceheading">Product Type</th>
            {/* Candidate Details
             
            
            */}
            <th className="attendanceheading" colSpan="4">Candidate Details</th>

            <th className="attendanceheading">Salary</th>
            <th className="attendanceheading">Percentage</th>
            <th className="attendanceheading">Annual CTC</th>
            <th className="attendanceheading">Billing Rate</th>
            <th className="attendanceheading">Gross Bill Amount</th>
            <th className="attendanceheading">Total Bill Amount</th>
            {/* GST */}
            <th className="attendanceheading" colSpan="5">GST</th>
           
            {/* Miscellaneous */}
            <th className="attendanceheading">Consultant Id</th>
            <th className="attendanceheading">GRE No</th>
            <th className="attendanceheading">Po No</th>
            {/* Bank Details */}
            <th className="attendanceheading" colSpan="4">Bank details</th>

            
            {/* Invoice Tracking */}
            <th className="attendanceheading">Invoice Sent From</th>
            <th className="attendanceheading">Invoice Sent To</th>
            <th className="attendanceheading">Hard Copy Sent</th>
            <th className="attendanceheading">Payment Expected</th>
            <th className="attendanceheading">GST</th>
            <th className="attendanceheading">TDS</th>
            <th className="attendanceheading">Payment Received</th>
            <th className="attendanceheading">Payment Received Amount</th>
            <th className="attendanceheading">GST Amount</th>
            <th className="attendanceheading">Discrepancy Amount</th>
            <th className="attendanceheading">Discrepancy Remark</th>
            <th className="attendanceheading">GST File</th>
            <th className="attendanceheading">GST Amount Payment</th>

            {/* send to details */}
            <th className="attendanceheading" colSpan="4">Send To Details</th>
            
            {/* Client Details */}
            <th className="attendanceheading" colSpan="4">Client Details</th>
             <th className="attendanceheading" >Print</th>
           



          </tr>
          <tr className="attendancerows-head">
            <th className="attendanceheading" colSpan="4"></th>
            {/* Sub-headings for Company Details */}
            <th className="attendanceheading">Name</th>
            <th className="attendanceheading">Address</th>
            <th className="attendanceheading">GST No</th>
            <th className="attendanceheading">HSC Code</th>
            <th className="attendanceheading">SAC Code</th>
            {/* <th className="attendanceheading" colSpan="1"></th> */}

            <th className="attendanceheading" colSpan="3"></th>
            {/* Sub-headings for Company Details */}
            <th className="attendanceheading">Candidate Name</th>
            <th className="attendanceheading">Candidate Location</th>
            <th className="attendanceheading">Date Of Joining</th>
            <th className="attendanceheading">Department</th> 
            {/* <th className="attendanceheading" colSpan=""></th> */}

            <th className="attendanceheading" colSpan="6"></th>
            {/* Sub-headings for Company Details */}
            <th className="attendanceheading">CGST</th>
            <th className="attendanceheading">SGST</th>
            <th className="attendanceheading">IGST</th>
           <th className="attendanceheading">Grand Total</th>
           <th className="attendanceheading">Grand Total In Word</th>
            {/* <th className="attendanceheading" colSpan=""></th> */}

            <th className="attendanceheading" colSpan="3"></th>
            {/* Sub-headings for Company Details */}
            <th className="attendanceheading">Bank Name</th>
            <th className="attendanceheading">Ac No</th>
            <th className="attendanceheading">IFSC Code</th>
            <th className="attendanceheading">Branch</th>
            {/* <th className="attendanceheading" colSpan=""></th> */}

            <th className="attendanceheading" colSpan="13"></th>
            {/* Sub-headings for Company Details */}
            <th className="attendanceheading">Name</th>
            <th className="attendanceheading">Designation</th>
            <th className="attendanceheading">Email</th>
            <th className="attendanceheading">Mobile No</th>
            

           
            {/* Sub-headings for Company Details */}
            <th className="attendanceheading">Name</th>
            <th className="attendanceheading">Designation</th>
            <th className="attendanceheading">Email</th>
            <th className="attendanceheading">Mobile No</th>
            <th className="attendanceheading" colSpan="2"></th>
          </tr>
           


        </thead>
        <tbody>
          {invoiceReport.map((item,index)=>(
          <tr key={item.id}>
            <td className='tabledata'>{item.id}</td>
            <td
                    className="tabledata"
                    onMouseOver={handleMouseOver}
                    onMouseOut={handleMouseOut}
                  >
                    {item.invoiceDate}
                    <div className="tooltip">
                      <span className="tooltiptext"> {item.invoiceDate}</span>
                    </div>
            </td>
             <td
                    className="tabledata"
                    onMouseOver={handleMouseOver}
                    onMouseOut={handleMouseOut}
                  >
                        {item.clientName}
                    <div className="tooltip">
                      <span className="tooltiptext">{item.clientName}</span>
                    </div>
            </td>
             <td
                    className="tabledata"
                    onMouseOver={handleMouseOver}
                    onMouseOut={handleMouseOut}
                  >
                       {item.clientAddress}
                    <div className="tooltip">
                      <span className="tooltiptext"> {item.clientAddress}</span>
                    </div>
            </td>
             <td
                    className="tabledata"
                    onMouseOver={handleMouseOver}
                    onMouseOut={handleMouseOut}
                  >
                        {item.companyName}
                    <div className="tooltip">
                      <span className="tooltiptext">{item.companyName}</span>
                    </div>
            </td>
             <td
                    className="tabledata"
                    onMouseOver={handleMouseOver}
                    onMouseOut={handleMouseOut}
                  >
                        {item.companyAddress}
                    <div className="tooltip">
                      <span className="tooltiptext"> {item.companyAddress}</span>
                    </div>
            </td>
             <td
                    className="tabledata"
                    onMouseOver={handleMouseOver}
                    onMouseOut={handleMouseOut}
                  >
                      {item.clientGstNumber}
                    <div className="tooltip">
                      <span className="tooltiptext">{item.clientGstNumber}</span>
                    </div>
            </td>
              <td
                    className="tabledata"
                    onMouseOver={handleMouseOver}
                    onMouseOut={handleMouseOut}
                  >
                        {item.hsnCode  }
                    <div className="tooltip">
                      <span className="tooltiptext">{item.hsnCode}</span>
                    </div>
            </td>
              <td
                    className="tabledata"
                    onMouseOver={handleMouseOver}
                    onMouseOut={handleMouseOut}
                  >
                        {item.sacCode}
                    <div className="tooltip">
                      <span className="tooltiptext">{item.sacCode}</span>
                    </div>
            </td>
              <td
                    className="tabledata"
                    onMouseOver={handleMouseOver}
                    onMouseOut={handleMouseOut}
                  >
                       {item.invoiceNo}
                    <div className="tooltip">
                      <span className="tooltiptext">{item.invoiceNo}</span>
                    </div>
            </td>
              <td
                    className="tabledata"
                    onMouseOver={handleMouseOver}
                    onMouseOut={handleMouseOut}
                  >
                        React Developer
                    <div className="tooltip">
                      <span className="tooltiptext">React Developer</span>
                    </div>
            </td>
              <td
                    className="tabledata"
                    onMouseOver={handleMouseOver}
                    onMouseOut={handleMouseOut}

                  >
                        {item.productType}
                    <div className="tooltip">
                      <span className="tooltiptext">{item.productType}</span>
                    </div>
            </td>
              <td
                    className="tabledata"
                    onMouseOver={handleMouseOver}
                    onMouseOut={handleMouseOut}

                  >
                       {item.candidateName}
                    <div className="tooltip">
                      <span className="tooltiptext"> {item.candidateName}</span>
                    </div>
            </td>
             <td
                    className="tabledata"
                    onMouseOver={handleMouseOver}
                    onMouseOut={handleMouseOut}

                  >
                        {item.candidateLocation}
                    <div className="tooltip">
                      <span className="tooltiptext">{item.candidateLocation}</span>
                    </div>
            </td>
             <td
                    className="tabledata"
                    onMouseOver={handleMouseOver}
                    onMouseOut={handleMouseOut}

                  >
                        {item.dateOfJoining}
                    <div className="tooltip">
                      <span className="tooltiptext">{item.dateOfJoining}</span>
                    </div>
            </td>
             <td
                    className="tabledata"
                    onMouseOver={handleMouseOver}
                    onMouseOut={handleMouseOut}

                  >
                        {item.department}
                    <div className="tooltip">
                      <span className="tooltiptext">{item.department}</span>
                    </div>
            </td>
             <td
                    className="tabledata"
                    onMouseOver={handleMouseOver}
                    onMouseOut={handleMouseOut}

                  >
                        {item.salary}
                    <div className="tooltip">
                      <span className="tooltiptext">{item.salary}</span>
                    </div>
            </td>
             <td
                    className="tabledata"
                    onMouseOver={handleMouseOver}
                    onMouseOut={handleMouseOut}

                  >
                        88%
                    <div className="tooltip">
                      <span className="tooltiptext">88%</span>
                    </div>
            </td>
             <td
                    className="tabledata"
                    onMouseOver={handleMouseOver}
                    onMouseOut={handleMouseOut}

                  >
                       {item.annualCtc }
                    <div className="tooltip">
                      <span className="tooltiptext"> {item.annualCtc }</span>
                    </div>
            </td>
            <td
                    className="tabledata"
                    onMouseOver={handleMouseOver}
                    onMouseOut={handleMouseOut}

                  >
                       {item.billingRate}
                    <div className="tooltip">
                      <span className="tooltiptext">{item.billingRate}</span>
                    </div>
            </td>
            <td
                    className="tabledata"
                    onMouseOver={handleMouseOver}
                    onMouseOut={handleMouseOut}

                  >
                        {item.grossBillAmount}
                    <div className="tooltip">
                      <span className="tooltiptext"> {item.grossBillAmount}</span>
                    </div>
            </td>
            <td
                    className="tabledata"
                    onMouseOver={handleMouseOver}
                    onMouseOut={handleMouseOut}

                  >
                       {item.totalBillAmount}
                    <div className="tooltip">
                      <span className="tooltiptext">{item.totalBillAmount}</span>
                    </div>
            </td>
            <td
                    className="tabledata"
                    onMouseOver={handleMouseOver}
                    onMouseOut={handleMouseOut}

                  >
                        {item.cgst}
                    <div className="tooltip">
                      <span className="tooltiptext"> {item.cgst}</span>
                    </div>
            </td>
            <td
                    className="tabledata"
                    onMouseOver={handleMouseOver}
                    onMouseOut={handleMouseOut}

                  >
                        {item.sgst}
                    <div className="tooltip">
                      <span className="tooltiptext">{item.sgst}</span>
                    </div>
            </td>
            <td
                    className="tabledata"
                    onMouseOver={handleMouseOver}
                    onMouseOut={handleMouseOut}

                  >
                       {item.igst}
                    <div className="tooltip">
                      <span className="tooltiptext">{item.igst}</span>
                    </div>
            </td>
            <td
                    className="tabledata"
                    onMouseOver={handleMouseOver}
                    onMouseOut={handleMouseOut}

                  >
                        {item.grandTotal}
                    <div className="tooltip">
                      <span className="tooltiptext">{item.grandTotal}</span>
                    </div>
            </td>
            <td
                    className="tabledata"
                    onMouseOver={handleMouseOver}
                    onMouseOut={handleMouseOut}

                  >
                       {item.grandTotalInWords}
                    <div className="tooltip">
                      <span className="tooltiptext"> {item.grandTotalInWords}</span>
                    </div>
            </td>
            <td
                    className="tabledata"
                    onMouseOver={handleMouseOver}
                    onMouseOut={handleMouseOut}

                  >
                       {item.consultantId}
                    <div className="tooltip">
                      <span className="tooltiptext"> {item.consultantId}</span>
                    </div>
            </td>
            <td
                    className="tabledata"
                    onMouseOver={handleMouseOver}
                    onMouseOut={handleMouseOut}

                  >
                        {item.greNo}
                    <div className="tooltip">
                      <span className="tooltiptext"> {item.greNo}</span>
                    </div>
            </td>
            <td
                    className="tabledata"
                    onMouseOver={handleMouseOver}
                    onMouseOut={handleMouseOut}

                  >
                        {item.poNo}
                    <div className="tooltip">
                      <span className="tooltiptext">{item.poNo}</span>
                    </div>
            </td>
            <td
                    className="tabledata"
                    onMouseOver={handleMouseOver}
                    onMouseOut={handleMouseOut}

                  >
                        {item.bankName}
                    <div className="tooltip">
                      <span className="tooltiptext"> {item.bankName}</span>
                    </div>
            </td>
            <td
                    className="tabledata"
                    onMouseOver={handleMouseOver}
                    onMouseOut={handleMouseOut}

                  >
                       {item.acNo}
                    <div className="tooltip">
                      <span className="tooltiptext">{item.acNo}</span>
                    </div>
            </td>
             <td
                    className="tabledata"
                    onMouseOver={handleMouseOver}
                    onMouseOut={handleMouseOut}

                  >
                        {item.ifscCode}
                    <div className="tooltip">
                      <span className="tooltiptext"> {item.ifscCode}</span>
                    </div>
            </td>
            <td
                    className="tabledata"
                    onMouseOver={handleMouseOver}
                    onMouseOut={handleMouseOut}

                  >
                        {item.branch}
                    <div className="tooltip">
                      <span className="tooltiptext">{item.branch}</span>
                    </div>
            </td>
             <td
                    className="tabledata"
                    onMouseOver={handleMouseOver}
                    onMouseOut={handleMouseOut}

                  >
                       {item.invoiceSentFrom}
                    <div className="tooltip">
                      <span className="tooltiptext">{item.invoiceSentFrom}</span>
                    </div>
            </td>
             <td
                    className="tabledata"
                    onMouseOver={handleMouseOver}
                    onMouseOut={handleMouseOut}

                  >
                        {item.invoiceSentTo}
                    <div className="tooltip">
                      <span className="tooltiptext">{item.invoiceSentTo}</span>
                    </div>
            </td>
             <td
                    className="tabledata"
                    onMouseOver={handleMouseOver}
                    onMouseOut={handleMouseOut}

                  >
                        {item.hardCopySent}
                    <div className="tooltip">
                      <span className="tooltiptext">{item.hardCopySent}</span>
                    </div>
            </td>
             <td
                    className="tabledata"
                    onMouseOver={handleMouseOver}
                    onMouseOut={handleMouseOut}

                  >
                       {item.paymentExpected}
                    <div className="tooltip">
                      <span className="tooltiptext">{item.paymentExpected}</span>
                    </div>
            </td>
             <td
                    className="tabledata"
                    onMouseOver={handleMouseOver}
                    onMouseOut={handleMouseOut}

                  >
                        50,000
                    <div className="tooltip">
                      <span className="tooltiptext">50,000</span>
                    </div>
            </td>
             <td
                    className="tabledata"
                    onMouseOver={handleMouseOver}
                    onMouseOut={handleMouseOut}

                  >
                        {item.tds}
                    <div className="tooltip">
                      <span className="tooltiptext"> {item.tds}</span>
                    </div>
            </td>
             <td
                    className="tabledata"
                    onMouseOver={handleMouseOver}
                    onMouseOut={handleMouseOut}

                  >
                        {item.paymentReceived}
                    <div className="tooltip">
                      <span className="tooltiptext">{item.paymentReceived}</span>
                    </div>
            </td>
             <td
                    className="tabledata"
                    onMouseOver={handleMouseOver}
                    onMouseOut={handleMouseOut}

                  >
                    {item.paymentReceivedAmount}
                        
                    <div className="tooltip">
                      <span className="tooltiptext"> {item.paymentReceivedAmount}</span>
                    </div>
            </td>
             <td
                    className="tabledata"
                    onMouseOver={handleMouseOver}
                    onMouseOut={handleMouseOut}

                  >
                        {item.grossAmount}
                    <div className="tooltip">
                      <span className="tooltiptext"> {item.grossAmount}</span>
                    </div>
            </td>
             <td
                    className="tabledata"
                    onMouseOver={handleMouseOver}
                    onMouseOut={handleMouseOut}

                  >
                        {item.discrepancyAmount}
                    <div className="tooltip">
                      <span className="tooltiptext">{item.discrepancyAmount}</span>
                    </div>
            </td>
             <td
                    className="tabledata"
                    onMouseOver={handleMouseOver}
                    onMouseOut={handleMouseOut}

                  >
                        {item.discrepancyRemark}
                    <div className="tooltip">
                      <span className="tooltiptext">{item.discrepancyRemark}</span>
                    </div>
            </td>
             <td
                    className="tabledata"
                    onMouseOver={handleMouseOver}
                    onMouseOut={handleMouseOut}

                  >
                        {item.gstFile}
                    <div className="tooltip">
                      <span className="tooltiptext"> {item.gstFile}</span>
                    </div>
            </td>
            <td
                    className="tabledata"
                    onMouseOver={handleMouseOver}
                    onMouseOut={handleMouseOut}

                  >
                     {item.gstAmtPayment}
                    <div className="tooltip">
                      <span className="tooltiptext"> {item.gstAmtPayment}</span>
                    </div>
            </td>
            <td
                    className="tabledata"
                    onMouseOver={handleMouseOver}
                    onMouseOut={handleMouseOut}

                  >
                        {item.sendDetails.name}
                    <div className="tooltip">
                      <span className="tooltiptext"> {item.sendDetails.name}</span>
                    </div>
            </td>
            <td
                    className="tabledata"
                    onMouseOver={handleMouseOver}
                    onMouseOut={handleMouseOut}

                  >
                        {item.sendDetails.designation}
                    <div className="tooltip">
                      <span className="tooltiptext">{item.sendDetails.designation}</span>
                    </div>
            </td>
            <td
                    className="tabledata"
                    onMouseOver={handleMouseOver}
                    onMouseOut={handleMouseOut}

                  >
                        {item.sendDetails.email}
                    <div className="tooltip">
                      <span className="tooltiptext">{item.sendDetails.email}</span>
                    </div>
            </td>
             <td
                    className="tabledata"
                    onMouseOver={handleMouseOver}
                    onMouseOut={handleMouseOut}

                  >
                       {item.sendDetails.mobile}
                    <div className="tooltip">
                      <span className="tooltiptext">{item.sendDetails.mobile}</span>
                    </div>
            </td>
             <td
                    className="tabledata"
                    onMouseOver={handleMouseOver}
                    onMouseOut={handleMouseOut}

                  >
                        {item.companyDetails.name}
                    <div className="tooltip">
                      <span className="tooltiptext"> {item.companyDetails.name}</span>
                    </div>
            </td>
             <td
                    className="tabledata"
                    onMouseOver={handleMouseOver}
                    onMouseOut={handleMouseOut}

                  >
                       {item.companyDetails.designation}
                    <div className="tooltip">
                      <span className="tooltiptext">{item.companyDetails.designation}</span>
                    </div>
            </td>
             <td
                    className="tabledata"
                    onMouseOver={handleMouseOver}
                    onMouseOut={handleMouseOut}

                  >
                        {item.companyDetails.email}
                    <div className="tooltip">
                      <span className="tooltiptext">{item.companyDetails.email}</span>
                    </div>
            </td>
             <td
                    className="tabledata"
                    onMouseOver={handleMouseOver}
                    onMouseOut={handleMouseOut}

                  >
                        {item.companyDetails.mobile}
                    <div className="tooltip">
                      <span className="tooltiptext">{item.companyDetails.mobile}</span>
                    </div>
            </td>
            <td className="tabledata"><button onClick={handleInvoicePdf}  className='daily-tr-btn'>Print</button></td>
            </tr>
))}
        </tbody>
      </table>

      {/* {showInvoicePdf && (
            <InvoicePdf/>
            
          )} */}
    </div>
  );
};

export default InvoiceReport;

/* Mohini_InvoiceTable_WholePage_09/07/2024 */