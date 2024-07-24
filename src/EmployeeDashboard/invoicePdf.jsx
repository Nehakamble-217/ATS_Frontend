import React, { useEffect, useState } from 'react';
import './invoicePdf.css';
import logo from '../LogoImages/LoginImge.jpg';
import { format,parseISO } from 'date-fns';
// SwapnilRokade_InvoicePdf_FetchingDataFromBackend_05To188_15/07
const InvoicePdf = ({id, onClose}) => {
    const [invoiceData,setInvoiceData] = useState([]);
    useEffect(()=>{
        fetchInvoice();
    },[id])
    const fetchInvoice = async () => {
        try {
            const res = await fetch(`http://192.168.1.38:8080/api/fetchById/${id}`);
            const data = await res.json();
            setInvoiceData([data]);
            console.log(data);
        } catch (error) {
            console.log("error", error);
        }
    };
    // const invoiceDate = format(parseISO(invoiceData.invoiceDate), 'dd-MMM-yyyy');
    // console.log(invoiceDate);
      console.log(invoiceData);
      const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'short', day: '2-digit' };
        const date = new Date(dateString);
        return date.toLocaleDateString('en-GB', options)
        .replace(/(\d+)-(\w+)-(\d+)/, "$1-$2-$3");
      };

    return (
        <div className="invoice-container">
              <button className="lineUp-share-btn" onClick={onClose}>
        Close
      </button>
            <div className="invoice-header">
                <div className="logo-container">
                    <img src={logo} alt="Logo" className="logo" />
                    <div className="company-name">
                        <b>157 Industries Private Limited</b><br />
                        <b>Recruitments</b><br />
                        <b>157 Careers</b>
                    </div>
                </div>
            </div>
            <div className="invoice-table-container">
                <table className="invoice-table">
                {invoiceData.map((item,index)=>(
                    <tbody key={index}>
                        {/* Row 1: Tax Invoice */}
                        <tr>
                            <td colSpan="7" className="tax-invoice center-text nowrap-text">Tax Invoice</td>
                        </tr>

                        {/* Row 2: Details of Receiver and Supplier */}
                        
                        <tr>
                            <td colSpan="3" className="receiver-details">
                                <strong>Details of Receiver:</strong><br />
                                Billed to<br />
                                {item.companyName}<br />
                                {item.companyAddress}<br />
                                GST Number:{item.companyGstNo}
                            </td>
                            <td colSpan="4" className="supplier-details">
                                <strong>Details of Supplier:</strong><br />
                                {item.supplierDetails.supplierName}<br />
                                {item.supplierDetails.supplierOfficeNo}<br />
                                {item.supplierDetails.supplierNearLoc}, {item.supplierDetails.supplierCity},{item.supplierDetails.supplierPinCode}<br />
                                GST: {item.supplierDetails.supplierGstNo}<br />
                                SAC Code:{item.supplierDetails.supplierSacCode}
                            </td>
                        </tr>

                        {/* Row 3: Original for Recipient */}
                        <tr>
                            <td colSpan="7" className="original-recipient center-text nowrap-text">Original for recipient</td>
                        </tr>

                        {/* Row 4: Invoice Date, Invoice Number, Brief Description */}
                        <tr>
                            <td colSpan="2" className="invoice-date center-text"><strong>Invoice Date:</strong></td>
                            <td colSpan="2" className="invoice-number center-text"><strong>Invoice Number:</strong></td>
                            <td colSpan="3" className="brief-description center-text"><strong>Brief Description:</strong></td>
                        </tr>

                        {/* Row 5: 18th April 2024, EIS7040, Recruitment Service */}
                        <tr className="center-text">
                            <td colSpan="2">{formatDate(item.invoiceDate)}</td>
                            <td colSpan="2">EIS{item.invoiceNo}</td>
                            <td colSpan="3">Recruitment Service</td>
                        </tr>

                        {/* Row 6: Headers for Candidate Details */}
                        <tr className="highlight-row center-text">
                            <td><b>S No</b></td>
                            <td><b>Candidate Name</b></td>
                            <td><b>Designation</b></td>
                            <td><b>Joining Date</b></td>
                            <td><b>CTC</b></td>
                            <td><b>Rate 50%</b></td>
                            <td><b>Amount</b></td>
                        </tr>

                        {/* Row 7: Candidate Details */}
                        <tr className="center-text">
                            <td>1</td>
                            <td>{item.candidateName}</td>
                            <td>{item.designation}</td>
                            <td>{formatDate(item.dateOfJoining)}</td>
                            <td>{item.annualCtc}</td>
                            <td>3.00%</td>
                            <td>{item.grossAmount}</td>
                        </tr>

                        {/* Row 8: Total */}
                        <tr className="center-text">
                            <td colSpan="5"></td>
                            <td className="total-label">Total</td>
                            <td className="total-amount">{item.grossAmount}</td>
                        </tr>

                        {/* Row 9: GST Breakup */}
                        <tr className="center-text">
                            <td colSpan="7" className="gst-breakup">GST Breakup</td>
                        </tr>

                        {/* Row 10: CGST */}
                        <tr className="center-text">
                            <td colSpan="4"></td>
                            <td>CGST</td>
                            <td>{item.cgst}%</td>
                            <td>3,915.00</td>
                        </tr>

                        {/* Row 11: SGST */}
                        <tr className="center-text">
                            <td colSpan="4"></td>
                            <td>SGST</td>
                            <td>{item.cgst}%</td>
                            <td>3,915.00</td>
                        </tr>

                        {/* Row 12: IGST */}
                        <tr className="center-text">
                            <td colSpan="4"></td>
                            <td>IGST</td>
                            <td>{item.cgst}%</td>
                            <td>3,915.00</td>
                        </tr>

                        {/* Row 13: Total GST */}
                        <tr className="center-text">
                            <td colSpan="4"></td>
                            <td>Total GST</td>
                            <td>{item.totalGst}%</td>
                            <td>11,745.00</td>
                        </tr>

                        {/* Row 14: Grand Total */}
                        <tr className="center-text">
                            <td colSpan="4"></td>
                            <td><b>Grand Total (in numbers)</b></td>
                            <td></td>
                            <td>{item.grandTotal}</td>
                        </tr>

                        {/* Row 15: Amount in Words */}
                        <tr className="amount-in-words left-text">
                            <td colSpan="7">
                                Amount in words:{item.grandTotalInWords}.
                            </td>
                        </tr>

                        {/* Row 16: Bank Details */}
                        <tr className="bank-details">
                            <td colSpan="7">
                                <strong>Bank Details :</strong><br />
                                Bank Name: {item.bankName}
                                <br />
                                Bank A/c Holder: 157 INDUSTRIES PRIVATE LIMITED
                                <br />
                                Bank A/c Number: {item.acNo}
                                <br />
                                IFSC Code: {item.ifscCode}<br />
                                Bank Address:{item.branch}
                                {/* Row 16: Authorised Signature */}


                                <tr className="center-text">
                                    <td colSpan="7"><b>Authorised Signature And Stamp</b></td>
                                </tr>
                                

                            </td>
                        </tr>
                    </tbody> )
                        )}
                </table>
            </div>
        </div>
    );
}

export default InvoicePdf;