import React, { useState } from "react";
import "./AddCompany.css";
import jsPDF from "jspdf";
import Modal from "react-bootstrap/Modal";
import ClipLoader from "react-spinners/ClipLoader";
import { Form } from "react-bootstrap";
import axios from "axios";
import { PDFDocument } from "pdf-lib";

const AddCompanyDetails = () => {
  /*Akash_Pawar_EmpDashboard_AddedAddCompanyFunction_11/07_LineNo_11*/
  const [showEmailButton, setShowEmailButton] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    companyName: "",
    companyLogoImg: null,
    companyAddress: "",
    companyDisplayName: "",
    companyWebsite: "",
    companyServices: "",
    tlInformation: "",
    sop: "",
    charges: "",
    contactNumber: "",
    aboutUs: "",
    companyPanCardImg: null,
    companyPanCardNumber: "",
    companyTanNumberImg: null,
    tanNumber: "",
    incorporationCertificateImg: null,
    incorporationCertificateNumber: "",
    cinImg: null,
    cinNumber: "",
    dinImg: null,
    dinNumber: "",
    udyamCertificateNumberImg: null,
    udyamCertificateNumber: "",
    shopActCertificateImg: null,
    shopActCertificateNumber: "",
    cgst: "",
    sgst: "",
    igst: "",
    totalGst: "",
    grandTotal: "",
    pfCertificateImg: null,
    pfCertificateNumber: "",
    professionalTaxCertificateImg: null,
    professionalTaxCertificateNumber: "",
    moaCertificateImg: null,
    moaCertificateNumber: "",
    aoaCertificateImg: null,
    aoaCertificateNumber: "",
    rocCertificateImg: null,
    rocCertificateNumber: "",
    bankHolderName: "",
    branchName: "",
    accountNumber: "",
    ifscCode: "",
    micrNumber: "",
    companyEmail: "",
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: files ? files[0] : value,
    }));
  };

  const generatePdf = (formdata) => {
    const doc = new jsPDF();
    doc.text(`Company Name: ${formdata.companyName || ""}`, 10, 10);
    doc.text(`Company Address: ${formdata.companyAddress || ""}`, 10, 20);
    doc.text(
      `Company Display Name: ${formdata.companyDisplayName || ""}`,
      10,
      30
    );
    doc.text(`Company Website: ${formdata.companyWebsite || ""}`, 10, 40);
    doc.text(`Company Services: ${formdata.companyServices || ""}`, 10, 50);
    doc.text(`TL Information: ${formdata.tlInformation || ""}`, 10, 60);
    doc.text(`SOP: ${formdata.sop || ""}`, 10, 70);
    doc.text(`Charges: ${formdata.charges || ""}`, 10, 80);
    doc.text(`Contact Number: ${formdata.contactNumber || ""}`, 10, 90);
    doc.text(`About Us: ${formdata.aboutUs || ""}`, 10, 100);
    doc.text(`Company PAN: ${formdata.companyPanCardNumber || ""}`, 10, 110);
    doc.text(`Company TAN: ${formdata.tanNumber || ""}`, 10, 120);
    doc.text(`CIN: ${formdata.cinNumber || ""}`, 10, 130);
    doc.text(`DIN: ${formdata.dinNumber || ""}`, 10, 140);
    doc.text(
      `Udyam Certificate: ${formdata.udyamCertificateNumber || ""}`,
      10,
      150
    );
    doc.text(
      `Shopact Certificate: ${formdata.shopActCertificateNumber || ""}`,
      10,
      160
    );
    doc.text(`CGST: ${formdata.cgst || ""}`, 10, 170);
    doc.text(`SGST: ${formdata.sgst || ""}`, 10, 180);
    doc.text(`IGST: ${formdata.igst || ""}`, 10, 190);
    doc.text(`Total GST: ${formdata.totalGst || ""}`, 10, 200);
    doc.text(`Grand Total: ${formdata.grandTotal || ""}`, 10, 210);
    doc.text(`PF Certificate: ${formdata.pfCertificateNumber || ""}`, 10, 220);
    doc.text(
      `Professional Tax Certificate: ${
        formdata.professionalTaxCertificateNumber || ""
      }`,
      10,
      230
    );
    doc.text(
      `MOA Certificate: ${formdata.moaCertificateNumber || ""}`,
      10,
      240
    );
    doc.text(
      `AOA Certificate: ${formdata.aoaCertificateNumber || ""}`,
      10,
      250
    );
    doc.text(
      `ROC Certificate: ${formdata.rocCertificateNumber || ""}`,
      10,
      260
    );
    doc.text(`Bank Name: ${formdata.bankHolderName || ""}`, 10, 270);
    doc.text(`Branch Name: ${formdata.branchName || ""}`, 10, 280);
    doc.text(`Account Number: ${formdata.accountNumber || ""}`, 10, 290);
    doc.text(`IFSC Code: ${formdata.ifscCode || ""}`, 10, 300);
    doc.text(`MICR Number: ${formdata.micrNumber || ""}`, 10, 310);
    doc.text(`Email: ${formdata.companyEmail || ""}`, 10, 320);
    doc.save("company-details.pdf");

    return doc;
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Create a FormData object to handle the file uploads
    const formPayload = new FormData();
    Object.keys(formData).forEach((key) => {
      formPayload.append(key, formData[key]);
    });

    try {
      // Send the form data to the backend
      const response = await axios.post(
        "http://192.168.1.48:8891/api/ats/157industries/save-our-company",
        formPayload,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 200) {
        setShowEmailButton(true);
        const pdfDoc = generatePdf(formData);
        // Create the PDF if the submission is successful
      }
    } catch (error) {
      console.error("Error submitting form data", error);
    }
  };
  const handleClose = () => setShowModal(false);
  /*Akash_Pawar_EmpDashboard_AddedAddCompanyFunction_11/07_LineNo_170*/
  return (
    <>
      <main className="job-desc">
        <section className="job-performance">
          <form onSubmit={handleSubmit}>
            {/* <center>
              <h1>Add Our Company Information</h1>
            </center> */}
            <div className="job-desc-form">
              <div className="field-column">
                <div className="field-Row-Gray">
                  <div className="field">
                    <label>Company Name</label>
                    <input
                      type="text"
                      name="companyName"
                      onChange={handleChange}
                      placeholder="Enter Company Name"
                      value={formData.companyName}
                      style={{ marginLeft: "45px" }}
                    />
                  </div>
                  <div className="field">
                    <label>Company Logo</label>
                    <input
                      type="file"
                      name="companyLogoImg"
                      onChange={handleChange}
                      style={{ marginLeft: "50px" }}
                    />
                  </div>
                </div>
                <div className="field-Row-white">
                  <div className="field">
                    <label>Company Address</label>
                    <input
                      type="text"
                      name="companyAddress"
                      placeholder="Company Address"
                      value={formData.companyAddress}
                      onChange={handleChange}
                      style={{ marginLeft: "45px" }}
                    />
                  </div>
                  <div className="field">
                    <label>Company Display Name</label>
                    <input
                      type="text"
                      name="companyDisplayName"
                      placeholder="Company Display Name"
                      value={formData.companyDisplayName}
                      onChange={handleChange}
                      style={{ marginLeft: "45px" }}
                    />
                  </div>
                </div>
                <div className="field-Row-Gray">
                  <div className="field">
                    <label>Company Website</label>
                    <input
                      type="text"
                      name="companyWebsite"
                      placeholder="Company Website"
                      value={formData.companyWebsite}
                      onChange={handleChange}
                      style={{ marginLeft: "45px" }}
                    />
                  </div>
                  <div className="field">
                    <label>Company Services</label>
                    <input
                      type="text"
                      name="companyServices"
                      placeholder="Enter Company Services"
                      value={formData.companyServices}
                      onChange={handleChange}
                      style={{ marginLeft: "45px" }}
                    />
                  </div>
                </div>
                <div className="field-Row-white">
                  <div className="field">
                    <label>TL Information</label>
                    <input
                      type="text"
                      name="tlInformation"
                      placeholder="Enter TL Information"
                      value={formData.tlInformation}
                      onChange={handleChange}
                      style={{ marginLeft: "45px" }}
                    />
                  </div>
                  <div className="field">
                    <label>Company SOP</label>
                    <input
                      type="text"
                      name="sop"
                      placeholder="Enter SOP"
                      value={formData.sop}
                      onChange={handleChange}
                      style={{ marginLeft: "45px" }}
                    />
                  </div>
                </div>
                <div className="field-Row-Gray">
                  <div className="field">
                    <label>Company Charges</label>
                    <input
                      type="text"
                      name="charges"
                      placeholder="Charges"
                      value={formData.charges}
                      onChange={handleChange}
                      style={{ marginLeft: "45px" }}
                    />
                  </div>
                  <div className="field">
                    <label>Contact Number</label>
                    <input
                      type="text"
                      name="contactNumber"
                      placeholder="Enter Contact Number"
                      value={formData.contactNumber}
                      onChange={handleChange}
                      style={{ marginLeft: "45px" }}
                    />
                  </div>
                </div>
                <div className="field-Row-white">
                  <div className="field">
                    <label>About us</label>
                    <input
                      type="text"
                      name="aboutUs"
                      placeholder="About Us"
                      value={formData.aboutUs}
                      onChange={handleChange}
                      style={{ marginLeft: "45px" }}
                    />
                  </div>
                  <div className="field">
                    <label htmlFor="companyemail">Company Email</label>
                    <input
                      type="email"
                      name="companyEmail"
                      id=""
                      value={formData.companyEmail}
                      onChange={handleChange}
                      placeholder="Enter Company Email Id"
                      style={{ marginLeft: "45px" }}
                    />
                  </div>
                </div>
                <div className="field-Row-Gray">
                  <div className="field">
                    <label>Upload Pancard</label>
                    <input
                      type="file"
                      name="companyPanCardImg"
                      onChange={handleChange}
                      style={{ marginLeft: "45px" }}
                    />
                  </div>
                  <div className="field">
                    <label> Enter Pancard No</label>
                    <input
                      type="text"
                      placeholder="Enter Pan No."
                      name="companyPanCardNumber"
                      value={formData.companyPanCardNumber}
                      onChange={handleChange}
                      style={{ height: "30px", marginLeft: "50px" }}
                    />
                  </div>
                </div>

                <div className="field-Row-white">
                  <div className="field">
                    <label style={{ paddingRight: "5px", height: "30px" }}>
                      Upload TAN{" "}
                    </label>
                    <input
                      type="file"
                      name="companyTanNumberImg"
                      onChange={handleChange}
                    />
                  </div>
                  <div className="field">
                    <label>Enter TAN Number</label>
                    <input
                      type="text"
                      placeholder="Enter TAN No."
                      name="tanNumber"
                      value={formData.tanNumber}
                      onChange={handleChange}
                      style={{ height: "30px", marginLeft: "45px" }}
                    />
                  </div>
                </div>

                <div className="field-Row-Gray">
                  <div className="field">
                    <label> Upload CIN</label>
                    <input type="file" name="cinImg" onChange={handleChange} />
                  </div>
                  <div className="field">
                    <label>Enter CIN No</label>
                    <input
                      type="text"
                      placeholder="Enter CIN No."
                      name="cinNumber"
                      value={formData.cinNumber}
                      onChange={handleChange}
                      style={{ marginLeft: "45px" }}
                    />
                  </div>
                </div>

                <div className="field-Row-white">
                  <div className="field">
                    <label> Upload DIN</label>
                    <input
                      type="file"
                      name="dinImg"
                      onChange={handleChange}
                      style={{ marginLeft: "45px" }}
                    />
                  </div>
                  <div className="field">
                    <label>Enter DIN NO</label>
                    <input
                      type="text"
                      placeholder="Enter DIN No."
                      name="dinNumber"
                      value={formData.dinNumber}
                      onChange={handleChange}
                      style={{ marginLeft: "45px" }}
                    />
                  </div>
                </div>

                <div className="field-Row-Gray">
                  <div className="field">
                    <label> Upload Udyam Certificate</label>
                    <input
                      type="file"
                      name="udyamCertificateNumberImg"
                      onChange={handleChange}
                      style={{ width: "70%", marginLeft: "45px" }}
                    />
                  </div>
                  <div className="field">
                    <label>Enter Udyam No</label>
                    <input
                      type="text"
                      placeholder="Enter Udyam Certificate No."
                      name="udyamCertificateNumber"
                      value={formData.udyamCertificateNumber}
                      onChange={handleChange}
                      style={{ marginLeft: "45px" }}
                    />
                  </div>
                </div>

                <div className="field-Row-white">
                  <div className="field">
                    <label> Upload Professional tax Certificate</label>

                    <input
                      type="file"
                      name="professionalTaxCertificateImg"
                      placeholder=""
                      style={{ width: "70%", marginLeft: "105px" }}
                    />
                  </div>
                  <div className="field">
                    <label> Enter PTC No</label>
                    <input
                      type="text"
                      name="professionalTaxCertificateNumber"
                      placeholder="Enter PTC Certificate No."
                      value={formData.professionalTaxCertificateNumber}
                      onChange={handleChange}
                      style={{ marginLeft: "45px" }}
                    />
                  </div>
                </div>

                <div className="field-Row-Gray">
                  <div className="field">
                    <label> Upload Shopact Certificate</label>
                    <input
                      type="file"
                      name="shopActCertificateImg"
                      onChange={handleChange}
                      style={{ marginLeft: "45px" }}
                    />
                  </div>
                  <div className="field">
                    <label> Enter Shopact Certificate</label>
                    <input
                      type="text"
                      placeholder="Enter Shopact Certificate No."
                      name="shopActCertificateNumber"
                      value={formData.shopActCertificateNumber}
                      onChange={handleChange}
                      style={{ marginLeft: "45px" }}
                    />
                  </div>
                </div>

                <div className="field-Row-white">
                  <div className="field">
                    <label> Upload PF Certificate</label>
                    <input
                      type="file"
                      name="pfCertificateImg"
                      onChange={handleChange}
                      style={{ marginLeft: "45px" }}
                    />
                  </div>
                  <div className="field">
                    <label>Enter PF Certificate No</label>
                    <input
                      type="text"
                      placeholder="Enter PF Certificate No."
                      name="pfCertificateNumber"
                      value={formData.pfCertificateNumber}
                      onChange={handleChange}
                      style={{ marginLeft: "45px" }}
                    />
                  </div>
                </div>
                <div className="field-Row-Gray">
                  <div className="field">
                    <label>Upload MOA Certificate</label>
                    {/* Memorandum of Association Certification */}
                    <input
                      type="file"
                      name="moaCertificateImg"
                      placeholder=""
                      onChange={handleChange}
                      style={{ marginLeft: "45px" }}
                    />
                  </div>
                  <div className="field">
                    <label>Enter MOA Certificate No</label>
                    <input
                      type="text"
                      name="moaCertificateNumber"
                      placeholder="Enter MOA No."
                      value={formData.moaCertificateNumber}
                      onChange={handleChange}
                      style={{ marginLeft: "45px" }}
                    />
                  </div>
                </div>

                <div className="field-Row-white">
                  <div className="field">
                    <label> Upload AOA Certificate</label>
                    <input
                      type="file"
                      name="aoaCertificateImg"
                      onChange={handleChange}
                      style={{ marginLeft: "45px" }}
                    />
                  </div>
                  <div className="field">
                    <label> Enter AOA Certificate No</label>
                    <input
                      type="text"
                      name="aoaCertificateNumber"
                      placeholder="Enter AOA Certificate No."
                      value={formData.aoaCertificateNumber}
                      onChange={handleChange}
                      style={{ marginLeft: "45px" }}
                    />
                  </div>
                </div>

                <div className="field-Row-Gray">
                  <div className="field">
                    <label>Upload ROC Certificate</label>
                    <input
                      type="file"
                      name="ROC"
                      placeholder=" "
                      value={formData.rocCertificateImg}
                      style={{ marginLeft: "45px" }}
                    />
                  </div>
                  <div className="field">
                    <label>Enter ROC Certificate</label>
                    <input
                      type="text"
                      name="rocCertificateNumber"
                      placeholder="Enter ROC Certificate No."
                      value={formData.rocCertificateNumber}
                      onChange={handleChange}
                      style={{ marginLeft: "45px" }}
                    />
                  </div>
                </div>

                <div className="field-Row-white">
                  <div className="field">
                    <label>Upload Incorporation Certificate</label>
                    <input
                      type="file"
                      name="incorporationCertificateImg"
                      placeholder=" "
                      onChange={handleChange}
                      style={{ marginLeft: "45px" }}
                    />
                  </div>
                  <div className="field">
                    <label>Enter Incorporation Certificate</label>
                    <input
                      type="text"
                      name="incorporationCertificateNumber"
                      placeholder="Enter Incorporation Certificate No."
                      value={formData.incorporationCertificateNumber}
                      onChange={handleChange}
                      style={{ marginLeft: "45px" }}
                    />
                  </div>
                </div>
                <div className="field-Row-Gray">
                  <div className="field">
                    <label>CGST</label>
                    <input
                      type="text"
                      name="cgst"
                      value={formData.cgst}
                      onChange={handleChange}
                      style={{ height: "30px" }}
                    />
                    <label>SGST</label>
                    <input
                      type="text"
                      name="sgst"
                      value={formData.sgst}
                      onChange={handleChange}
                      style={{ height: "30px" }}
                    />
                  </div>
                  <div className="field">
                    <label>IGST NO</label>
                    <input
                      type="text"
                      name="igst"
                      value={formData.igst}
                      onChange={handleChange}
                      style={{ height: "30px" }}
                    />
                    <label> GST No</label>
                    <input
                      type="text"
                      name="totalGst"
                      value={formData.totalGst}
                      onChange={handleChange}
                      style={{ height: "30px" }}
                    />
                  </div>
                </div>
                <div className="field-Row-white">
                  <div className="field">
                    <label>Grand Total</label>
                    <input
                      type="text"
                      name="grandTotal"
                      placeholder="Enter GrandTotal"
                      value={formData.grandTotal}
                      onChange={handleChange}
                      style={{ marginLeft: "45px" }}
                    />
                  </div>
                  <div className="field">
                    <label>Account Number </label>
                    <input
                      type="text"
                      name="accountNumber"
                      placeholder="Enter Account No."
                      value={formData.accountNumber}
                      onChange={handleChange}
                      style={{ marginLeft: "60px" }}
                    />
                  </div>
                </div>
                <div className="field-Row-Gray">
                  <div className="field">
                    <label>Bank Holder Name</label>
                    <input
                      type="text"
                      name="bankHolderName"
                      placeholder="Holder"
                      value={formData.bankHolderName}
                      onChange={handleChange}
                      style={{ marginLeft: "50px" }}
                    />
                  </div>
                  <div className="field">
                    <label htmlFor="">Enter Branch name</label>
                    <input
                      type="text"
                      name="branchName"
                      placeholder="Enter bank branch name."
                      value={formData.branchName}
                      onChange={handleChange}
                      style={{ marginLeft: "50px" }}
                    />
                  </div>
                </div>
                <div className="field-Row-white">
                  <div className="field">
                    <label>IFSC</label>
                    <input
                      type="text"
                      name="ifscCode"
                      placeholder=" Enter IFSC Code"
                      value={formData.ifscCode}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="field">
                    <label>MICR No</label>
                    <input
                      type="text"
                      name="micrNumber"
                      placeholder="Enter MICR No."
                      value={formData.micrNumber}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>
            </div>
            <center>
              <button className="addcompanybutton" type="submit">
                Create PDF OR Vedio
              </button>
              {showEmailButton && (
                <button
                  className="addcompanybutton"
                  type="button"
                  onClick={() => setShowModal(true)}
                >
                  Send Email
                </button>
              )}
            </center>
          </form>
        </section>
      </main>
      {/*Akash_Pawar_EmpDashboard_AddedAddCompanyFunction_11/07_LineNo_737-740*/}
      {showModal && (
        <SendEmailPopup show={showModal} handleClose={handleClose} />
      )}
    </>
  );
};

/*Akash_Pawar_EmpDashboard_AddedAddCompanyFunction_11/07_LineNo_744*/
const SendEmailPopup = ({ show, handleClose }) => {
  const [to, setTo] = useState("");
  const [cc, setCc] = useState("");
  const [subject, setSubject] = useState("");
  //   const [signatureImage, setSignatureImage] = useState(
  //     "https://lh3.googleusercontent.com/fife/ALs6j_HDFuzYstiAW8Rt_7NmtAoegg6nGerpkvbiAITq-mNL70gNXONQuJwnZdbiAbsKMNAYMt9iBnvsFWx8EaOOWV43cjOjDvFOAiw1XacANQb0MDBtFO1ag1TuVwCbwbzrLDnOiniRQ5hD7kGCCVjTNGsNdx6RQLsrKyZlpJ6meA1NIT1vXloRcFwlfbTjDBG14YC809U_0FGn9pOII8lbH-I_ZZLBI6kfh0Q43j4evix8AbIxnvw0Soesevgycz4jRqrAA4Fjjd67Pb0vIVBkeEgSp_Sfz_v9joDcBiMe2sLP6_iEvB7N4il1qgBgTHBRM6qp6IuNFov7hMdcyx8Jp1oCfQX7753pO2x3FGg3tyW5RI0l-1h01JWKdybFECo19c7o3Z_01lJ-dF1TABxyPTdT9eztvkSfDXOvfoQIP_oEny3ORR-8wfjijnlUFylwT7MhsCwTcaeQR6tWaPYJ9rX7AQVGOmMyJbLS_0tFLn0_UzX7NuQx6-W2TeC9aXM0ajJYJ5cLPusvMlAhgFBB0WdZfbtuOat0-rd2qP_L0MqJPfTYBdTgYyO4LoTD0dV6QRo5UJhvyDW5Ru8IBz-bB4QWhPMjs2_PFnQ9K-GLvAPCOYIk4TQPhkCK4UgOyGL8bRE4bPBIYMddVxfWdePCOb6V5JhGmYfvsYzEhAwquNmsZkMv9lEJfQV-Frs0DrF63XWlD5ieprbz4CLMs3WHh42I06Kpw2aCXfQchCDoJawTYljfozJ_QHq58UIAdMniaLvrKKYRyYfZohAFVdekMzArxrobd4e3Pac9cHm1Orz2_lAob5diRJCZxapdTOPfiT_ro-1qhbtmKua4kXr5Z_TWgBV9CwaactlqLFMnnbN3TtDOqKNDEFBGhg1pKC2NUu2Jw6IyawDyCU6VCdrnhizrHhvhPY8u0uXOxspsqfvQaU_PT0e0v-f2RPDESxSwIz3H6DEzmk5hOrbOmXFCPG8Q9bUu_5I3kL11z_loIveKwfWD3YGIkOjOvXAUomdEqw7DIXIbjcfDQflq7L45gJ3-BWuTkRmicaQL3GAtwVpYbmNUi649NpUC5JvKN_iqIxeNzhKdn1jBXEGl2-rbmzYXbPolNUmrQWwaFYKBzVzgWIcCjaaKpgSR444mFTx3mFEuSJxfjMTJtumbYGZkGrFkEE1rNaXMvF6XFT6JO63BtAfQzd5nFl31OctaJ6nf7_UbshOlPFeUNoRFpc-gB9LWyZck_V9jIToDHY8mij11-IK-9DFLdZZfNxeOhbha8DYljvTj9R6spXM006lRZmBsP6WugvIvvG5Pv_kiXoORCBbrCFAIk3vpZIEx3zDoayqgUNwctyrf7cJvfSiyWokjM0NNHRTCy0eldMfb0LLX5X6BftzMt128n5f6-Q60zmQ_kyuHSnyLGJawrCATfhHu-_ABtuuTWopOBib9gG__Vsa06z5SKZs5LM8eD8TwgUMeIRfWGfZBAy2qobuMt9ZVDrQDlPejp1tBg3Dm8Ke85TK7HFFfDqA-dJ2jCwzOq2ipybePn2kxLg911_lfaHPIXpF0LJdNwNyzfH_6IuB3IGI0nelUgtPnQbxXFMYd8xLaiVhfx9f0GLlDLkalvTQ8UPk92nprBDiYn8GdmV3zoVuWZbXwqQ4nmLaB9LIxDieP2kLO7V2igrEsBxXZHT309KauEgReDc1p7ahNkSiDjAOt3cDoEnlXhXjLXiBy"
  //   );
  const [isMailSending, setIsMailSending] = useState(false);
  const [getResponse, setResponse] = useState("");
  const [emailBody, setEmailBody] = useState(
    "Dear [Recipient's Name],\n\nI hope this message finds you well. Please find attached the necessary company documents and certificates for your review."
  );

  // const handleSignatureImageChange = (event) => {
  //   const file = event.target.files[0];
  //   if (file) {
  //     const reader = new FileReader();
  //     reader.onloadend = () => {
  //       console.log(reader);
  //       setSignatureImage(reader.result);
  //     };
  //     reader.readAsDataURL(file);
  //   }
  // };

  //   const handleStoreClientInformation = async () => {
  //     try {
  //       const date = new Date();

  //       let day = date.getDate();
  //       let month = date.getMonth() + 1;
  //       let year = date.getFullYear();

  //       // This arrangement can be altered based on how we want the date's format to appear.
  //       let currentDate = `${day}-${month}-${year}`;
  //       const clientData = {
  //         mailReceiverName: emailBody.replace(/Hi\s*,?\s*/i, "").split(",")[0],
  //         receiverCompanyMail: to,
  //         mailSendDate: currentDate,
  //         mailSendTime: new Date().toLocaleTimeString(),
  //         noOfCandidates: selectedCandidate.length,
  //         mailSenderName: clientEmailSender.senderName,
  //         senderEmailId: clientEmailSender.senderMail,
  //         requirementIds: selectedCandidate.map((item) => item.requirementId),
  //         toCCNames: cc.split(","),
  //         toBCCNames: [],
  //       };

  //       const response = await axios.post(
  //         "http://192.168.1.48:8891/api/ats/157industries/add-client-details",
  //         clientData
  //       );
  //       if (response) {
  //         setIsMailSending(false);
  //         setResponse(response.data);
  //         handleClose();
  //       }
  //     } catch (error) {
  //       setIsMailSending(false);
  //       setResponse(error.message);
  //     }
  //   };

  const handleSendEmail = () => {
    const emailData = {
      to,
      cc,
      subject,
      body: emailBody.replace(/\n/g, "<br>"),
    };
    console.log(emailData);
    setIsMailSending(true);

    axios
      .post(
        "http://localhost:8082/api/ats/157industries/company-detail-email",
        emailData
      )
      .then((response) => {
        setIsMailSending(false);
        handleClose();
        console.log("Email sent successfully:", response.data);
      })
      .catch((error) => {
        setIsMailSending(false);
        setResponse("Error Sending Email");
        console.error("Error sending email:", error);
      });
  };

  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        size="xl"
        className="text-secondary"
      >
        <Modal.Header closeButton>
          <Modal.Title>Send Email</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group controlId="to">
            <Form.Label>To:</Form.Label>
            <Form.Control
              type="email"
              className="text-secondary"
              value={to}
              onChange={(e) => setTo(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="cc">
            <Form.Label>CC:</Form.Label>
            <Form.Control
              type="email"
              className="text-secondary"
              value={cc}
              onChange={(e) => setCc(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="subject">
            <Form.Label>Subject:</Form.Label>
            <Form.Control
              type="text"
              className="text-secondary"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="emailBody">
            <Form.Label>Email Body:</Form.Label>
            <Form.Control
              as="textarea"
              className="text-secondary"
              rows={5}
              value={emailBody}
              onChange={(e) => setEmailBody(e.target.value)}
            />
          </Form.Group>
          {/* <div>
            <strong>Attachments:</strong>
            <ul>{renderAttachmentNames()}</ul>
          </div> */}
        </Modal.Body>
        <Modal.Footer style={{ justifyContent: "space-between" }}>
          {getResponse && (
            <p style={{ color: "red" }}>
              <i>{getResponse}</i>
            </p>
          )}
          <div className="d-flex gap-2 align-items-center">
            <button className="ACD-share-send-popup-btn" onClick={handleClose}>
              Close
            </button>
            <button
              className="ACD-close-send-popup-btn"
              onClick={handleSendEmail}
            >
              Send Email
            </button>
          </div>
        </Modal.Footer>
      </Modal>
      {isMailSending && (
        <div className="ACD_Loading_Animation">
          <ClipLoader size={50} color="#ffb281" />
        </div>
      )}
    </>
  );
};
/*Akash_Pawar_EmpDashboard_AddedAddCompanyFunction_11/07_LineNo_917*/

export default AddCompanyDetails;
