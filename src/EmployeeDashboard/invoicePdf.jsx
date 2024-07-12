import React from 'react';
import './invoicePdf.css';
import logo from '../LogoImages/LoginImge.jpg';

const InvoicePdf = () => {
    return (
        <div className="invoice-container">
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
                    <tbody>
                        {/* Row 1: Tax Invoice */}
                        <tr>
                            <td colSpan="7" className="tax-invoice center-text nowrap-text">Tax Invoice</td>
                        </tr>

                        {/* Row 2: Details of Receiver and Supplier */}
                        <tr>
                            <td colSpan="3" className="receiver-details">
                                <strong>Details of Receiver:</strong><br />
                                Billed to<br />
                                Predikly Technologies Private Limited.<br />
                                401 Pride House, Ganeshkhind Road,<br />
                                Near Pune University,<br />
                                Pune 411016, INDIA.<br />
                                GST Number: 27AAJCP8956AIZ5
                            </td>
                            <td colSpan="4" className="supplier-details">
                                <strong>Details of Supplier:</strong><br />
                                157 Industries Private Limited<br />
                                308, Powerone<br />
                                Koregaon Park Annex,<br />
                                Near passport office Mundhawa, Pune<br />
                                GST: 27AABCZ5272FIZ6<br />
                                SAC Code: 998512
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
                            <td colSpan="2">18th April 2024</td>
                            <td colSpan="2">EIS7040</td>
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
                            <td>Shubham Jambutkar</td>
                            <td>Proposal Writer</td>
                            <td>18-01-2024</td>
                            <td>14,00,000</td>
                            <td>3.00%</td>
                            <td>43,500.00</td>
                        </tr>

                        {/* Row 8: Total */}
                        <tr className="center-text">
                            <td colSpan="5"></td>
                            <td className="total-label">Total</td>
                            <td className="total-amount">43,500.00</td>
                        </tr>

                        {/* Row 9: GST Breakup */}
                        <tr className="center-text">
                            <td colSpan="7" className="gst-breakup">GST Breakup</td>
                        </tr>

                        {/* Row 10: CGST */}
                        <tr className="center-text">
                            <td colSpan="4"></td>
                            <td>CGST</td>
                            <td>9%</td>
                            <td>3,915.00</td>
                        </tr>

                        {/* Row 11: SGST */}
                        <tr className="center-text">
                            <td colSpan="4"></td>
                            <td>SGST</td>
                            <td>9%</td>
                            <td>3,915.00</td>
                        </tr>

                        {/* Row 12: IGST */}
                        <tr className="center-text">
                            <td colSpan="4"></td>
                            <td>IGST</td>
                            <td>9%</td>
                            <td>3,915.00</td>
                        </tr>

                        {/* Row 13: Total GST */}
                        <tr className="center-text">
                            <td colSpan="4"></td>
                            <td>Total GST</td>
                            <td>27%</td>
                            <td>11,745.00</td>
                        </tr>

                        {/* Row 14: Grand Total */}
                        <tr className="center-text">
                            <td colSpan="4"></td>
                            <td><b>Grand Total (in numbers)</b></td>
                            <td></td>
                            <td>55,245.00</td>
                        </tr>

                        {/* Row 15: Amount in Words */}
                        <tr className="amount-in-words left-text">
                            <td colSpan="7">
                                Amount in words: Fifty one thousand three hundred and thirty rupees only.
                            </td>
                        </tr>

                        {/* Row 16: Bank Details */}
                        <tr className="bank-details">
                            <td colSpan="7">
                                <strong>Bank Details :</strong><br />
                                Bank Name: Kotak Mahindra Bank
                                <br />
                                Bank A/c Holder: 157 INDUSTRIES PRIVATE LIMITED
                                <br />
                                Bank A/c Number: 114138782
                                <br />
                                IFSC Code:<br />
                                Bank Address:
                                {/* Row 16: Authorised Signature */}


                                <tr className="center-text">
                                    <td colSpan="7"><b>Authorised Signature And Stamp</b></td>
                                </tr>
                                

                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default InvoicePdf;