/* Mohini_InvoiceTable_WholePage_09/07/2024 */

import React, { useState } from 'react';
import './invoiceReport.css';
import InvoicePdf from './invoicePdf';

const InvoiceReport = ({handleInvoicePdf}) => {
      // const [showInvoicePdf,setShowInvoicePdf]=useState(false)

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
            <td className='tabledata'>1</td>
            <td
                    className="tabledata"
                    onMouseOver={handleMouseOver}
                    onMouseOut={handleMouseOut}
                  >
                        12/12/2024
                    <div className="tooltip">
                      <span className="tooltiptext">12/12/2024</span>
                    </div>
            </td>
             <td
                    className="tabledata"
                    onMouseOver={handleMouseOver}
                    onMouseOut={handleMouseOut}
                  >
                        Arshad Attar
                    <div className="tooltip">
                      <span className="tooltiptext">Arshad Attar</span>
                    </div>
            </td>
             <td
                    className="tabledata"
                    onMouseOver={handleMouseOver}
                    onMouseOut={handleMouseOut}
                  >
                        Pune
                    <div className="tooltip">
                      <span className="tooltiptext">Pune</span>
                    </div>
            </td>
             <td
                    className="tabledata"
                    onMouseOver={handleMouseOver}
                    onMouseOut={handleMouseOut}
                  >
                        TCS
                    <div className="tooltip">
                      <span className="tooltiptext">TCS</span>
                    </div>
            </td>
             <td
                    className="tabledata"
                    onMouseOver={handleMouseOver}
                    onMouseOut={handleMouseOut}
                  >
                        Pune
                    <div className="tooltip">
                      <span className="tooltiptext">Pune</span>
                    </div>
            </td>
             <td
                    className="tabledata"
                    onMouseOver={handleMouseOver}
                    onMouseOut={handleMouseOut}
                  >
                        GTS4162576198
                    <div className="tooltip">
                      <span className="tooltiptext">GTS4162576198</span>
                    </div>
            </td>
              <td
                    className="tabledata"
                    onMouseOver={handleMouseOver}
                    onMouseOut={handleMouseOut}
                  >
                        GTS4162576198
                    <div className="tooltip">
                      <span className="tooltiptext">GTS4162576198</span>
                    </div>
            </td>
              <td
                    className="tabledata"
                    onMouseOver={handleMouseOver}
                    onMouseOut={handleMouseOut}
                  >
                        GTS4162576198
                    <div className="tooltip">
                      <span className="tooltiptext">GTS4162576198</span>
                    </div>
            </td>
              <td
                    className="tabledata"
                    onMouseOver={handleMouseOver}
                    onMouseOut={handleMouseOut}
                  >
                        4162576198
                    <div className="tooltip">
                      <span className="tooltiptext">4162576198</span>
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
                        Candidate
                    <div className="tooltip">
                      <span className="tooltiptext">Candidate</span>
                    </div>
            </td>
              <td
                    className="tabledata"
                    onMouseOver={handleMouseOver}
                    onMouseOut={handleMouseOut}

                  >
                        Arbaz Pathan
                    <div className="tooltip">
                      <span className="tooltiptext">Arbaz Pathan</span>
                    </div>
            </td>
             <td
                    className="tabledata"
                    onMouseOver={handleMouseOver}
                    onMouseOut={handleMouseOut}

                  >
                        Pune
                    <div className="tooltip">
                      <span className="tooltiptext">Pune</span>
                    </div>
            </td>
             <td
                    className="tabledata"
                    onMouseOver={handleMouseOver}
                    onMouseOut={handleMouseOut}

                  >
                        11/07/2024
                    <div className="tooltip">
                      <span className="tooltiptext">11/07/2024</span>
                    </div>
            </td>
             <td
                    className="tabledata"
                    onMouseOver={handleMouseOver}
                    onMouseOut={handleMouseOut}

                  >
                        IT
                    <div className="tooltip">
                      <span className="tooltiptext">IT</span>
                    </div>
            </td>
             <td
                    className="tabledata"
                    onMouseOver={handleMouseOver}
                    onMouseOut={handleMouseOut}

                  >
                        54,000
                    <div className="tooltip">
                      <span className="tooltiptext">54,000</span>
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
                        6,40,000
                    <div className="tooltip">
                      <span className="tooltiptext">6,40,000</span>
                    </div>
            </td>
            <td
                    className="tabledata"
                    onMouseOver={handleMouseOver}
                    onMouseOut={handleMouseOut}

                  >
                        6,40,000
                    <div className="tooltip">
                      <span className="tooltiptext">6,40,000</span>
                    </div>
            </td>
            <td
                    className="tabledata"
                    onMouseOver={handleMouseOver}
                    onMouseOut={handleMouseOut}

                  >
                        63,40,000
                    <div className="tooltip">
                      <span className="tooltiptext">6,40,000</span>
                    </div>
            </td>
            <td
                    className="tabledata"
                    onMouseOver={handleMouseOver}
                    onMouseOut={handleMouseOut}

                  >
                        69,40,000
                    <div className="tooltip">
                      <span className="tooltiptext">6,40,000</span>
                    </div>
            </td>
            <td
                    className="tabledata"
                    onMouseOver={handleMouseOver}
                    onMouseOut={handleMouseOut}

                  >
                        40,000
                    <div className="tooltip">
                      <span className="tooltiptext">6,40,000</span>
                    </div>
            </td>
            <td
                    className="tabledata"
                    onMouseOver={handleMouseOver}
                    onMouseOut={handleMouseOut}

                  >
                        40,000
                    <div className="tooltip">
                      <span className="tooltiptext">6,40,000</span>
                    </div>
            </td>
            <td
                    className="tabledata"
                    onMouseOver={handleMouseOver}
                    onMouseOut={handleMouseOut}

                  >
                        40,000
                    <div className="tooltip">
                      <span className="tooltiptext">6,40,000</span>
                    </div>
            </td>
            <td
                    className="tabledata"
                    onMouseOver={handleMouseOver}
                    onMouseOut={handleMouseOut}

                  >
                        40,000
                    <div className="tooltip">
                      <span className="tooltiptext">6,40,000</span>
                    </div>
            </td>
            <td
                    className="tabledata"
                    onMouseOver={handleMouseOver}
                    onMouseOut={handleMouseOut}

                  >
                        Seventy Lakh fourty Thousand
                    <div className="tooltip">
                      <span className="tooltiptext">6,40,000</span>
                    </div>
            </td>
            <td
                    className="tabledata"
                    onMouseOver={handleMouseOver}
                    onMouseOut={handleMouseOut}

                  >
                       222
                    <div className="tooltip">
                      <span className="tooltiptext">222</span>
                    </div>
            </td>
            <td
                    className="tabledata"
                    onMouseOver={handleMouseOver}
                    onMouseOut={handleMouseOut}

                  >
                        GYR65771387
                    <div className="tooltip">
                      <span className="tooltiptext">GYR65771387</span>
                    </div>
            </td>
            <td
                    className="tabledata"
                    onMouseOver={handleMouseOver}
                    onMouseOut={handleMouseOut}

                  >
                        GYR65771387
                    <div className="tooltip">
                      <span className="tooltiptext">GYR65771387</span>
                    </div>
            </td>
            <td
                    className="tabledata"
                    onMouseOver={handleMouseOver}
                    onMouseOut={handleMouseOut}

                  >
                        SBI
                    <div className="tooltip">
                      <span className="tooltiptext">SBI</span>
                    </div>
            </td>
            <td
                    className="tabledata"
                    onMouseOver={handleMouseOver}
                    onMouseOut={handleMouseOut}

                  >
                        62789172788
                    <div className="tooltip">
                      <span className="tooltiptext">62789172788</span>
                    </div>
            </td>
             <td
                    className="tabledata"
                    onMouseOver={handleMouseOver}
                    onMouseOut={handleMouseOut}

                  >
                        SBIN00078272
                    <div className="tooltip">
                      <span className="tooltiptext">SBIN00078272</span>
                    </div>
            </td>
            <td
                    className="tabledata"
                    onMouseOver={handleMouseOver}
                    onMouseOut={handleMouseOut}

                  >
                        Kondhawa
                    <div className="tooltip">
                      <span className="tooltiptext">Kondhawa</span>
                    </div>
            </td>
             <td
                    className="tabledata"
                    onMouseOver={handleMouseOver}
                    onMouseOut={handleMouseOut}

                  >
                        Manager
                    <div className="tooltip">
                      <span className="tooltiptext">Manager</span>
                    </div>
            </td>
             <td
                    className="tabledata"
                    onMouseOver={handleMouseOver}
                    onMouseOut={handleMouseOut}

                  >
                        Manager
                    <div className="tooltip">
                      <span className="tooltiptext">Manager</span>
                    </div>
            </td>
             <td
                    className="tabledata"
                    onMouseOver={handleMouseOver}
                    onMouseOut={handleMouseOut}

                  >
                        Yes
                    <div className="tooltip">
                      <span className="tooltiptext">Yes</span>
                    </div>
            </td>
             <td
                    className="tabledata"
                    onMouseOver={handleMouseOver}
                    onMouseOut={handleMouseOut}

                  >
                        80,39,999
                    <div className="tooltip">
                      <span className="tooltiptext">80,39,999</span>
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
                        30,000
                    <div className="tooltip">
                      <span className="tooltiptext">30,000</span>
                    </div>
            </td>
             <td
                    className="tabledata"
                    onMouseOver={handleMouseOver}
                    onMouseOut={handleMouseOut}

                  >
                        Yes
                    <div className="tooltip">
                      <span className="tooltiptext">Yes</span>
                    </div>
            </td>
             <td
                    className="tabledata"
                    onMouseOver={handleMouseOver}
                    onMouseOut={handleMouseOut}

                  >
                        70,00,000
                    <div className="tooltip">
                      <span className="tooltiptext">70,00,000</span>
                    </div>
            </td>
             <td
                    className="tabledata"
                    onMouseOver={handleMouseOver}
                    onMouseOut={handleMouseOut}

                  >
                        88,000
                    <div className="tooltip">
                      <span className="tooltiptext">88,000</span>
                    </div>
            </td>
             <td
                    className="tabledata"
                    onMouseOver={handleMouseOver}
                    onMouseOut={handleMouseOut}

                  >
                        90,000
                    <div className="tooltip">
                      <span className="tooltiptext">90,000</span>
                    </div>
            </td>
             <td
                    className="tabledata"
                    onMouseOver={handleMouseOver}
                    onMouseOut={handleMouseOut}

                  >
                        Good to go
                    <div className="tooltip">
                      <span className="tooltiptext">Good to go</span>
                    </div>
            </td>
             <td
                    className="tabledata"
                    onMouseOver={handleMouseOver}
                    onMouseOut={handleMouseOut}

                  >
                        Done
                    <div className="tooltip">
                      <span className="tooltiptext">Done</span>
                    </div>
            </td>
            <td
                    className="tabledata"
                    onMouseOver={handleMouseOver}
                    onMouseOut={handleMouseOut}

                  >
                        Done
                    <div className="tooltip">
                      <span className="tooltiptext">Done</span>
                    </div>
            </td>
            <td
                    className="tabledata"
                    onMouseOver={handleMouseOver}
                    onMouseOut={handleMouseOut}

                  >
                        Arshad Attar
                    <div className="tooltip">
                      <span className="tooltiptext">Arshad Attar</span>
                    </div>
            </td>
            <td
                    className="tabledata"
                    onMouseOver={handleMouseOver}
                    onMouseOut={handleMouseOut}

                  >
                        Manager
                    <div className="tooltip">
                      <span className="tooltiptext">Manager</span>
                    </div>
            </td>
            <td
                    className="tabledata"
                    onMouseOver={handleMouseOver}
                    onMouseOut={handleMouseOut}

                  >
                        connecttoaspathan@gmail.com
                    <div className="tooltip">
                      <span className="tooltiptext">connecttoaspathan@gmail.com</span>
                    </div>
            </td>
             <td
                    className="tabledata"
                    onMouseOver={handleMouseOver}
                    onMouseOut={handleMouseOut}

                  >
                        9284097026
                    <div className="tooltip">
                      <span className="tooltiptext">9284097026</span>
                    </div>
            </td>
             <td
                    className="tabledata"
                    onMouseOver={handleMouseOver}
                    onMouseOut={handleMouseOut}

                  >
                        TCS
                    <div className="tooltip">
                      <span className="tooltiptext">TCS</span>
                    </div>
            </td>
             <td
                    className="tabledata"
                    onMouseOver={handleMouseOver}
                    onMouseOut={handleMouseOut}

                  >
                       Founder
                    <div className="tooltip">
                      <span className="tooltiptext">Founter</span>
                    </div>
            </td>
             <td
                    className="tabledata"
                    onMouseOver={handleMouseOver}
                    onMouseOut={handleMouseOut}

                  >
                        connecttoaspathan@gmail.com
                    <div className="tooltip">
                      <span className="tooltiptext">connecttoaspathan@gmail.com</span>
                    </div>
            </td>
             <td
                    className="tabledata"
                    onMouseOver={handleMouseOver}
                    onMouseOut={handleMouseOut}

                  >
                        9673898626
                    <div className="tooltip">
                      <span className="tooltiptext">9673898626</span>
                    </div>
            </td>
            <td className="tabledata"><button onClick={handleInvoicePdf}  className='daily-tr-btn'>Print</button></td>
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