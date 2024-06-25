import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import { useParams } from "react-router-dom";
import Modal from "react-bootstrap/Modal";
import "../EmployeeSection/employeeProfile.css";

const EmployeeProfileData =() => {
  const [viewMoreProfileShow, setViewMoreProfileShow] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [profileImage, setProfileImage] = useState(null);
  const [pdfSrc, setPdfSrc] = useState(null);
  const [employeeData, setEmployeeData] = useState(null);
const {employeeId} = useParams();

  const viewMoreProfile = (e) => {
    e.preventDefault();
    setViewMoreProfileShow(true);
  };

  useEffect(() => {
    fetch("http://192.168.1.38:8891/api/ats/157industries/employee-details/34")

      .then((response) => response.json())
      .then((data) => {
        console.log(data); // Log the fetched data to inspect its structure
        setEmployeeData(data);
        if (data.profileImage) {
          // Convert byte code to Uint8Array
          const byteCharacters = atob(data.profileImage);
          const byteNumbers = new Array(byteCharacters.length);
          for (let i = 0; i < byteCharacters.length; i++) {
            byteNumbers[i] = byteCharacters.charCodeAt(i);
          }
          const byteArray = new Uint8Array(byteNumbers);

          // Create a Blob from the byte array
          const blob = new Blob([byteArray], { type: "image/jpeg" });

          // Create a URL for the Blob and set it as the image source
          const url = URL.createObjectURL(blob);
          setProfileImage(url);

          // Clean up the URL object when the component unmounts
          // return () => URL.revokeObjectURL(url);
        }
        if (data.resumeFile) {
          const byteCharacters = atob(data.resumeFile);
          const byteNumbers = new Array(byteCharacters.length);
          for (let i = 0; i < byteCharacters.length; i++) {
            byteNumbers[i] = byteCharacters.charCodeAt(i);
          }
          const byteArray = new Uint8Array(byteNumbers);

          // Create a Blob from the byte array
          const blob = new Blob([byteArray], { type: "application/pdf" });

          // Create a URL for the Blob and set it as the file source
          const url = URL.createObjectURL(blob);
          setPdfSrc(url);
          console.log(url);

          // Clean up the URL object when the component unmounts
          return () => URL.revokeObjectURL(url);
        }
        return () => URL.revokeObjectURL(url);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const goBackToDashBoard = (e) => {
    e.preventDefault();
    setViewMoreProfileShow(false);
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  if (viewMoreProfileShow)
    return (
      <div className="employee-profile-main-div"> 
        <main className="employee-profile-main">
          <section className="employee-profile-section">
            <div className="profile-back-button">
              <button onClick={goBackToDashBoard}>
                Back To Dashboard
                <i className="fas fa-times"></i>
              </button>
            </div>
            {/* Employee personal Information and current company information */}
            <div className="employee-profile-staticsection">
              <div className="employee-profile-static">
                <div className="employee-profile-details">
                  <img src={profileImage} />
                  <p className="m-0">
                    <b>Name: {employeeData.employeeName}</b>
                  </p>
                  <p className="m-0">
                    <b>Designation: {employeeData.designation}</b>
                  </p>
                </div>
                <div className="employee-profile-basic-details">
                  <p className="m-1">
                    <b>Resume : </b>Resume.pdf{" "}
                    <i onClick={openModal} className="fas fa-eye"></i>
                  </p>
                  <p className="m-1">
                    <b>Job Role : </b>
                    {employeeData.jobRole}
                  </p>
                  <p className="m-1">
                    <b>Gender : </b>
                    {employeeData.gender}
                  </p>
                  <p className="m-1">
                    <b>Blood Group : </b>
                    {employeeData.bloodGroup}
                  </p>
                  <p className="m-1">
                    <b>T-Shirt Size : </b>
                    {employeeData.tshirtSize}
                  </p>
                  <p className="m-1">
                    <b>Date of Birth : </b>
                    {employeeData.dateOfBirth}
                  </p>
                  <p className="m-1">
                    <b>Date of Joining : </b>
                    {employeeData.dateOfJoining}
                  </p>
                  <p className="m-1">
                    <b>Work Location : </b>
                    {employeeData.workLocation}
                  </p>
                  <p className="m-1">
                    <b>Entry Source : </b>
                    {employeeData.entrySource}
                  </p>
                  <p className="m-1">
                    <b>Employee Status : </b>
                    {employeeData.employeeStatus}
                  </p>
                  <p className="m-1">
                    <b>Offered Salary : </b>
                    {employeeData.offeredSalary}
                  </p>
                  <p className="m-1">
                    <b>Official Email : </b>
                    {employeeData.officialMail}
                  </p>
                  <p className="m-1">
                    <b>Personal Email : </b>
                    {employeeData.employeeEmail}
                  </p>
                  <p className="m-1">
                    <b>Official Contact : </b>
                    {employeeData.officialContactNumber}
                  </p>
                  <p className="m-1">
                    <b>Company Contact : </b>
                    {employeeData.companyMobileNumber}
                  </p>
                  <p className="m-1">
                    <b>Perosnal Contact : </b>
                    {employeeData.employeeNumber}
                  </p>
                  <p className="m-1">
                    <b>Whatsapp Number : </b>
                    {employeeData.whatsAppnumber}
                  </p>

                  <p className="m-1">
                    <b>Marital Status : </b>
                    {employeeData.maritalStatus}
                  </p>
                  <p className="m-1">
                    <b>Anniversary Date : </b>
                    {employeeData.anniversaryDate}
                  </p>
                  <p className="m-1">
                    <b>Permanent Address : </b>
                    {employeeData.employeeAddress}
                  </p>
                  <p className="m-1">
                    <b>Present Address : </b>
                    {employeeData.employeePresentAddress}
                  </p>
                  <p className="m-1">
                    <b>Preks : </b>
                    {employeeData.perks}
                  </p>
                </div>
              </div>
            </div>

            <div className="employee-profile-scrollsection">
            
              <div className="employee-profile-emergency-education-details">
                <div className="employee-profile-emergency-details">
                  <h1>
                    <b>Emergency Details</b>
                  </h1>
                  <ul>
                    <li>
                      Emergency Contact Person :{" "}
                      {employeeData.emergencyContactPerson}
                    </li>
                    <li>
                      Emergency Contact Number :{" "}
                      {employeeData.emergencyContactNumber}
                    </li>
                    <li>
                      Emergency Contact Relation :{" "}
                      {employeeData.emergencyPersonRelation}
                    </li>
                  </ul>
                </div>
                <div className="employee-profile-education-details">
                  <h1>
                    <b>Education Qualification</b>
                  </h1>
                  <ul>
                    <li>
                      Qualifications : {employeeData.educationalQualification}
                    </li>
                  </ul>
                </div>
              </div>
              <div className="employee-profile-previouscompany-reportingmanager-details">
                <div className="employee-profile-previouscompany-details">
                  <h1>
                    <b>Previous Company</b>
                  </h1>
                  <ul>
                    <li>Previous Company Name : {employeeData.lastCompany}</li>
                    <li>Last Working Date : {employeeData.lastWorkingDate}</li>
                    <li>
                      Reason For Leaving : {employeeData.reasonForLeaving}
                    </li>
                    <li>
                      Employee Experience : {employeeData.employeeExperience}
                    </li>
                  </ul>
                </div>
                <div className="employee-profile-reportingmanager-details">
                  <h1>
                    <b>Reporting Manager</b>
                  </h1>
                  <ul>
                    <li>
                      Reporting Manager Name :{" "}
                      {employeeData.reportingMangerName}
                    </li>
                    <li>
                      Reporting Manager Designation :{" "}
                      {employeeData.reportingMangerDesignation}
                    </li>
                  </ul>
                </div>
              </div>
              {/* Employee Induction and warning/comments details */}
              <div className="employee-profile-induction-message-details">
                <div className="employee-profile-induction-details">
                  <h1>
                    <b>Induction Details</b>
                  </h1>
                  <ul>
                    <li>Induction : {employeeData.inductionYesOrNo}</li>
                    <li>Induction Comment : {employeeData.inductionComment}</li>
                  </ul>
                </div>
                <div className="employee-profile-message-details">
                  <h1>
                    <b>Message</b>
                  </h1>
                  <ul>
                    <li>warning Comments : {employeeData.warningComments}</li>
                    <li>Team Leader Message : {employeeData.teamLeaderMsg}</li>
                    <li>
                      Edit And Delete Authority :{" "}
                      {employeeData.editDeleteAuthority}
                    </li>
                  </ul>
                </div>
              </div>
              {/* Employee Interview and Training Details */}
              <div className="employee-profile-interview-traning-details">
                <div className="employee-profile-traning-details">
                  <h1>
                    <b>Training Details</b>
                  </h1>
                  <ul>
                    <li>Training Source : {employeeData.trainingSource}</li>
                    <li>
                      Training Completed :{" "}
                      {employeeData.trainingCompletedYesOrNo}
                    </li>
                    <li>
                      Training Taken Count : {employeeData.trainingTakenCount}
                    </li>
                    <li>
                      Performance Indicator :{" "}
                      {employeeData.performanceIndicator}
                    </li>
                  </ul>
                </div>
                <div className="employee-profile-interview-details">
                  <h1>
                    <b>Interview</b>
                  </h1>
                  <ul>
                    <li>
                      Interview Taken By : {employeeData.interviewTakenPerson}
                    </li>
                    <li>
                      Rounds of Interview : {employeeData.roundsOfInterview}
                    </li>
                  </ul>
                </div>
              </div>

              {/* Employee Document and Social Link Details */}
              <div className="employee-profile-document-social-details">
                <div className="employee-profile-document-details">
                  <h1>
                    <b>Documents</b>
                  </h1>
                  <ul>
                    <li>Adhaar Card : {employeeData.aadhaarNo}</li>
                    <li>Pan Card : {employeeData.panNo}</li>
                    <li>PF Number : {employeeData.pfNo}</li>
                    <li>PT Number : {employeeData.professionalPtNo}</li>
                    <li>ESIC Number : {employeeData.esIcNo}</li>
                    <li>Insurance Number : {employeeData.insuranceNumber}</li>
                  </ul>
                </div>
                <div className="employee-profile-social-details">
                  <h1>
                    <b>Social Links</b>
                  </h1>
                  <ul>
                    <li>
                      LinkedIn :{" "}
                      <a href={`${employeeData.linkedInURl}`}>
                        {employeeData.linkedInURl}
                      </a>
                    </li>
                    <li>
                      Facebook :{" "}
                      <a href={`${employeeData.faceBookURL}`}>
                        {employeeData.faceBookURL}
                      </a>
                    </li>
                    <li>
                      Twitter :{" "}
                      <a href={`${employeeData.twitterURl}`}>
                        {employeeData.twitterURl}
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </section>
        </main>
        {isModalOpen && (
          <>
            <div
              className="modal show bg-black bg-opacity-50"
              style={{
                display: "flex",
                position: "fixed",
                top: "0px",
                justifyContent: "center",
                alignItems: "center",
                width: "100%",
                height: "100vh",
                overflow: "auto",
              }}
            >
              <Modal.Dialog style={{ width: "800px", padding: "10px" }}>
                <Modal.Body
                  style={{
                    display: "flex",
                    gap: "10px",
                    alignItems: "center",
                  }}
                >
                  <iframe
                    src={pdfSrc}
                    width="100%"
                    height="600px"
                    title="PDF Viewer"
                  ></iframe>
                </Modal.Body>
                <Modal.Footer>
                  <Button onClick={closeModal} variant="secondary">
                    Close
                  </Button>
                </Modal.Footer>
              </Modal.Dialog>
            </div>
          </>
        )}
      </div>
    );

  return (
    <div
      className="modal show bg-black bg-opacity-50"
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        position: "initial",
        width: "100%",
        height: "100vh",
      }}
    >
      {employeeData != null ? (
        <Modal.Dialog
          style={{
            width: "500px",
            padding: "10px",
          }}
        >
          <Modal.Header
            style={{ fontSize: "18px", backgroundColor: "#f2f2f2" }}
          >
            Profile
          </Modal.Header>
          <Modal.Body
            style={{
              display: "flex",
              gap: "10px",
              alignItems: "center",
              backgroundColor: "#f2f2f2",
            }}
          >
            <div>
              <img src={profileImage} width={"150px"} />
            </div>
            <div>
              <p className="m-1" style={{ color: "gray" }}>
                Name : {employeeData.employeeName}
              </p>
              <p className="m-1">Job Role: {employeeData.jobRole}</p>
              <p className="m-1">Email: {employeeData.employeeEmail}</p>
              <p className="m-1">
                Mobile no: {employeeData.emergencyContactNumber}
              </p>
              <p className="m-1">Gender: {employeeData.gender}</p>
              <p className="m-1">Blood Group: {employeeData.bloodGroup}</p>
            </div>
          </Modal.Body>
          <Modal.Footer style={{ backgroundColor: "#f2f2f2" }}>
            <button className="close-profile-popup-btn">Close</button>
            <button
              onClick={viewMoreProfile}
              className="display-more-profile-btn"
            >
              More
            </button>
          </Modal.Footer>
        </Modal.Dialog>
      ) : (
        <Modal.Dialog style={{ width: "500px", padding: "10px" }}>
          <Modal.Header style={{ fontSize: "18px" }}>Profile</Modal.Header>
          <Modal.Body
            style={{ display: "flex", gap: "10px", alignItems: "center" }}
          >
            <div>Loading...</div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary">Close</Button>
            <Button onClick={viewMoreProfile} variant="primary">
              More
            </Button>
          </Modal.Footer>
        </Modal.Dialog>
      )}
    </div>
  );
}
export default EmployeeProfileData;
