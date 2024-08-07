import React, { useState, useEffect, useRef } from "react";
import "../CandidateSection/candidateHistoryTracker.css";
import { useReactToPrint } from 'react-to-print';

const dummyData = {
  "Holding Offer Letters": [
    { companyName: "Company A", count: 5 },
    { companyName: "Company B", count: 3 },
    { companyName: "Company Z", count: 8 },
    // Add more dummy data as needed
  ],
  "Source Name": [
    { sourceName: "Referral", count: 10 },
    { sourceName: "Online", count: 8 },
    // Add more dummy data as needed
  ],
  Certification: [
    { certification: "Certification A", count: 6 },
    { certification: "Certification B", count: 4 },
    // Add more dummy data as needed
  ],
  "TAT Reports": [
    { reportName: "Report A", count: 7 },
    { reportName: "Report B", count: 5 },
    // Add more dummy data as needed
  ],
  "Pickup and drop": [
    { option: "Yes", count: 12 },
    { option: "No", count: 5 },
    // Add more dummy data as needed
  ],
  "Communication Rating": [
    { rating: "Excellent", count: 9 },
    { rating: "Good", count: 7 },
    // Add more dummy data as needed
  ],
  Age: [
    { ageRange: "18-21", count: 15 },
    { ageRange: "22-25", count: 20 },
    { ageRange: "26-29", count: 10 },
    { ageRange: "30-33", count: 5 },
    { ageRange: "34-37", count: 2 },
    { ageRange: "38-41", count: 1 },
    { ageRange: "38-41", count: 1 },
    // Add more age ranges as needed
  ],
  "Marrital Status": [
    { status: "Single", count: 10 },
    { status: "Married", count: 8 },
    // Add more dummy data as needed
  ],
  Gender: [
    { gender: "Male", count: 12 },
    { gender: "Female", count: 8 },
    // Add more dummy data as needed
  ],
  "Last Company": [
    { companyName: "Wipro", count: 9 },
    { companyName: "TCS", count: 7 },
    // Add more dummy data as needed
  ],
  Education: [
    { degree: "Bachelor", count: 12 },
    { degree: "Master", count: 8 },
    // Add more dummy data as needed
  ],
  Requirements: [
    { requirement: "Requirement A", count: 5 },
    { requirement: "Requirement B", count: 10 },
    // Add more dummy data as needed
  ],
  "Incentive Recruiters": [
    { recruiter: "Recruiter A", count: 6 },
    { recruiter: "Recruiter B", count: 4 },
    // Add more dummy data as needed
  ],
  "Notice Period": [
    { period: "30 days", count: 8 },
    { period: "60 days", count: 6 },
    // Add more dummy data as needed
  ],
  "Company Type": [
    { type: "IT", count: 10 },
    { type: "Non-IT", count: 5 },
    // Add more dummy data as needed
  ],
  "OnRole Third Party": [
    { role: "Yes", count: 7 },
    { role: "No", count: 6 },
    // Add more dummy data as needed
  ],
  Experience: [
    { experience: "0-1 years", count: 5 },
    { experience: "2-5 years", count: 12 },
    // Add more dummy data as needed
  ],
  "Skills Set": [
    { skill: "Java", count: 8 },
    { skill: "React", count: 7 },
    // Add more dummy data as needed
  ],
  Designations: [
    { designation: "Developer", count: 10 },
    { designation: "Tester", count: 5 },
    // Add more dummy data as needed
  ],
  Salary: [
    { salaryRange: "20k-30k", count: 12 },
    { salaryRange: "30k-40k", count: 8 },
    // Add more dummy data as needed
  ],
  Distance: [
    { distance: "0-5 km", count: 10 },
    { distance: "5-10 km", count: 8 },
    // Add more dummy data as needed
  ],
  Department: [
    { department: "HR", count: 6 },
    { department: "Engineering", count: 10 },
    // Add more dummy data as needed
  ],
  CompanyName:[
    {companyname:"TCS"},
    {companyname:"Infosys"}
  ],
  Position:[
    {position:"ReactJS Developer",count:5},
    {position:".Net Developer",count:6}
  ]
};



const CandidateHistoryTracker = () => {
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [popupData, setPopupData] = useState(null);
  const [OpenCompanyPosition, setOpenCompanyPosition] = useState(null);
  const [companyName, setCompanyName] = useState("");
  const [position, setPosition] = useState("");
  const [monthSelector,setmonthSelector]=useState("");
  const [showCustomDiv,setshowCustomDiv]=useState(false);
  const [selectAll,setSelectAll]=useState(true);

  const popupRef = useRef();

  const policyRef=useRef();   //Prachi Parab Filter Data pdf 156 to 207

  const handleGeneratePDF = async () => {
      
      const issueContainer = document.getElementById('issue-containers');
      const canvas = await html2canvas(issueContainer, { scale: 2 });
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'pt', 'a4');
      
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const margin = 30;  // Set margin size (in points)
      const borderWidth = 1;  // Set border width (in points)
      
      const contentWidth = pdfWidth - 2 * margin;
      const imgProps = pdf.getImageProperties(imgData);
      const imgHeight = (imgProps.height * contentWidth) / imgProps.width;
      
      let heightLeft = imgHeight;
      let position = margin;
      
      pdf.setLineWidth(borderWidth);
      
      let page = 1;
      while (heightLeft > 0) {
          if (page > 1) {
              pdf.addPage();
          }
          if(position!==margin){
            pdf.addPage();
            position=margin;
          }
          pdf.addImage(imgData, 'PNG', margin, position, contentWidth, imgHeight);
          pdf.rect(margin, margin, contentWidth, pdfHeight - 2 * margin);  // Add border
          
          heightLeft -= (pdfHeight - 2 * margin);
          position -= (pdfHeight - 2 * margin);  // Adjust position for next page
          
          page++;
      }
      
      // Saving the PDF
      pdf.save('Report.pdf');
  };

  
  const handlePrint = useReactToPrint({
      content: () => policyRef.current,
      documentTitle: 'Report',
  });

  const handleFilterChange = (e) => {
    let value = e.target.value;
    setSelectedFilters((prev) =>
      prev.includes(value) ? prev.filter((f) => f !== value) : [...prev, value]
    );
  };

  const calculatePercentages = (data) => {
    const total = data.reduce((sum, item) => sum + item.count, 0);
    return data.map((item) => ({
      ...item,
      percentage: total > 0 ? ((item.count / total) * 100).toFixed(2) : 0,
    }));
  };

  const showPopup = (filter) => {
    const data = dummyData[filter] || [];
    setPopupData({
      filter,
      data: calculatePercentages(data).sort((a, b) => b.count - a.count),
    });
  };

  const handleClickOutside = (e) => {
    if (popupRef.current && !popupRef.current.contains(e.target)) {
      setPopupData(null);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const [isVisible, setIsVisible] = useState(false);

  const handleButtonClick = () => {
    setIsVisible(!isVisible);
  };

  const [openDropdown, setOpenDropdown] = useState(null);

  const handleDropdownToggle = (label) => {
    console.log(label);
    setOpenDropdown(label);
  };


  const handleDropDownCompany=(label)=>{
    setOpenCompanyPosition(OpenCompanyPosition===label ?null:label);
  }

  const handleCompanyChange=(event)=>{
    setCompanyName(event.target.value);
  }
  const handlePositionChange=(event)=>{
    setPosition(event.target.value);
  }
  const handleMonthChange=(event)=>{
    setmonthSelector(event.target.value);

  }
  const handleCustomChange=(event)=>{
    setmonthSelector(event.target.value);
    setshowCustomDiv(true);

  }
  const selectAllFilters=(event)=>{
    if(selectAll){
      const allFilters = [
        "Holding Offer Letters",
        "Source Name",
        "Certification",
        "TAT Reports",
        "Pickup and Drop",
        "Communication Rating",
        "Age",
        "Marital Status",
        "Gender",
        "Last Company",
        "Education",
        "Requirements",
        "Incentive Recruiters",
        "Notice Period",
        "Company Type",
        "On Role Third Party",
        "Experience",
        "Skills Set",
        "Designations",
        "Salary",
        "Distance",
        "Department",];
      setSelectedFilters(allFilters);

    }else{
      setSelectedFilters([]);
    }
    setSelectAll(!selectAll);

  }

  return (
    <div>
    <div className="HeadingHistory">Candidate History</div>      
     {/* Date */}
    <div className="tracker-date-report-option">
          <label>
              <input
                type="radio"
                value="Current Month"
                id='CurrentMonth'
                name="reportOption"
                onClick={handleMonthChange}
               
              />
              Current Month
           </label>
           <label>
              <input
                type="radio"
                value="Last Month"
                id='LastMonth'
                name="reportOption"
                onClick={handleMonthChange}
              />
              Last Month
          </label>
          <label>
              <input
                type="radio"
                value="Last 3 Months"
                id='Last3Months'
                name='reportOption'
                onClick={handleMonthChange}
              
              />
              Last 3 Months
            </label>
            <label>
              <input
                type="radio"
                value="Last 6 Months"
                name='reportOption'
                id='Last6Months'
                onClick={handleMonthChange}                
              />
              Last 6 Months
            </label>
            <label>
              <input
                type='radio'
                value="Last 1 Year"
                name='reportOption'
                id='Last1Year'
                onClick={handleMonthChange}
                />
                Last 1 Year
            </label>
            <label>
              <input 
                type='radio'
                value="Custom Date"
                name='reportOption'
                id='CustomDate'
                onClick={handleCustomChange}
                />
                Custom Date
            </label>
            <div>
            {
                showCustomDiv && (
                <div>
                <div className="date-inputs" >
          
                  <label>
                    Start Date:
                    <input type="date" />
                  </label>
                  <label>
                    End Date:
                    <input type="date"  />
                  </label>
                
                
                <div className='filterDataButton'>
                  <button className="Candi-History-tracker-button">Filter Data</button>
                  
                  </div>
                </div>
                </div>
              )}
            </div>


        </div>

        {/* Categories */}
      <div className="bhabutton-container">
        {[
          "Selected",
          "Rejected",
          "Hold",
          "Joined",
          "Not joined",
          "Active",
          "Inactive",
          "Dropout",
          "Noshow",
          "Yet to schedule",
        ].map((label) => (
          <div key={label} className="bha-dropdown">
            <button
              className={`bhafilter-button ${
                openDropdown === label ? "active" : ""
              }`}
              onClick={() => handleDropdownToggle(label)}
            >
              {label}
            </button>
          </div>
        ))}
      </div>

      {/* DropDown */}

      <div className="company-position-container">
      <div className="combobox-container">
        <select value={companyName} onChange={handleCompanyChange}>
          <option value="">Select Company</option>
          <option value="CompanyX">CompanyX</option>
          <option value="CompanyY">CompanyY</option>
          {/* Add more companies as needed */}
        </select>
        </div>
        <div className="combobox-container">
        <select value={position} onChange={handlePositionChange}>
          <option value="">Select Position</option>
          <option value="Developer">Developer</option>
          <option value="Designer">Designer</option>
          {/* Add more positions as needed */}
        </select>
      </div>

      
    </div>

      {openDropdown && (
        <div className="Candi-History-tracker-div">
       
          <button
            onClick={handleButtonClick}
            className="Candi-History-tracker-button"
          >
            {isVisible ? "Hide Filters" : "Show Filters"}
          </button> &nbsp; &nbsp;
          {
            isVisible &&
            <button
            onClick={selectAllFilters}
            className="Candi-History-tracker-button"
          >
             {selectAll ? "Select All" : "Deselect All"}
          </button>
          }
        

          
          {selectedFilters.length>0 &&(

            <span className='handlePrintDiv'>
            <button className='Candi-History-tracker-button' onClick={handlePrint}>Export PDF</button>
          </span>
          )
          }
          {isVisible && (
            <div className="outer-Candi-History-tracker-div">

              <div className="inner-Candi-History-tracker-div">
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    value="Age"
                    checked={selectedFilters.includes("Age")}
                    onChange={handleFilterChange}
                  />{" "}
                  Age
                </label>
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    value="Certification"
                    checked={selectedFilters.includes("Certification")}
                    onChange={handleFilterChange}
                  />{" "}
                  Certification
                </label>
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    value="Communication Rating"
                    checked={selectedFilters.includes("Communication Rating")}
                    onChange={handleFilterChange}
                  />{" "}
                  Communication Rating
                </label>
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    value="Company Type"
                    checked={selectedFilters.includes("Company Type")}
                    onChange={handleFilterChange}
                  />{" "}
                  Company Type
                </label>
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    value="Department"
                    checked={selectedFilters.includes("Department")}
                    onChange={handleFilterChange}
                  />{" "}
                  Department
                </label>
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    value="Designations"
                    checked={selectedFilters.includes("Designations")}
                    onChange={handleFilterChange}
                  />{" "}
                  Designations
                </label>
              </div>
              <div className="inner-Candi-History-tracker-div">
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    value="Distance"
                    checked={selectedFilters.includes("Distance")}
                    onChange={handleFilterChange}
                  />{" "}
                  Distance ( Company Near Location)
                </label>
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    value="Education"
                    checked={selectedFilters.includes("Education")}
                    onChange={handleFilterChange}
                  />{" "}
                  Education
                </label>
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    value="Experience"
                    checked={selectedFilters.includes("Experience")}
                    onChange={handleFilterChange}
                  />{" "}
                  Experience
                </label>
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    value="Gender"
                    checked={selectedFilters.includes("Gender")}
                    onChange={handleFilterChange}
                  />{" "}
                  Gender
                </label>
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    value="Holding Offer Letters"
                    checked={selectedFilters.includes("Holding Offer Letters")}
                    onChange={handleFilterChange}
                  />{" "}
                  Holding Offer Letters
                </label>
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    value="Incentive Recruiters"
                    checked={selectedFilters.includes("Incentive Recruiters")}
                    onChange={handleFilterChange}
                  />{" "}
                  Incentive Recruiters
                </label>
              </div>
              <div className="inner-Candi-History-tracker-div">
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    value="Last Company"
                    checked={selectedFilters.includes("Last Company")}
                    onChange={handleFilterChange}
                  />{" "}
                  Last Company
                </label>
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    value="Marital Status"
                    checked={selectedFilters.includes("Marital Status")}
                    onChange={handleFilterChange}
                  />{" "}
                  Marital Status
                </label>
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    value="Notice Period"
                    checked={selectedFilters.includes("Notice Period")}
                    onChange={handleFilterChange}
                  />{" "}
                  Notice Period
                </label>
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    value="On Role Third Party"
                    checked={selectedFilters.includes("On Role Third Party")}
                    onChange={handleFilterChange}
                  />{" "}
                  On Role(Third Party)
                </label>
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    value="Pickup and Drop"
                    checked={selectedFilters.includes("Pickup and Drop")}
                    onChange={handleFilterChange}
                  />{" "}
                  Pick Up and Drop
                </label>
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    value="Requirements"
                    checked={selectedFilters.includes("Requirements")}
                    onChange={handleFilterChange}
                  />{" "}
                  Requirements
                </label>
              </div>

              <div className="inner-Candi-History-tracker-div">
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    value="Salary"
                    checked={selectedFilters.includes("Salary")}
                    onChange={handleFilterChange}
                  />{" "}
                  Salary
                </label>
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    value="Skills Set"
                    checked={selectedFilters.includes("Skills Set")}
                    onChange={handleFilterChange}
                  />{" "}
                  Skills Set
                </label>
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    value="Source Name"
                    checked={selectedFilters.includes("Source Name")}
                    onChange={handleFilterChange}
                  />{" "}
                  Source Name
                </label>
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    value="TAT Reports"
                    checked={selectedFilters.includes("TAT Reports")}
                    onChange={handleFilterChange}
                  />{" "}
                  TAT Reports
                </label>
                <br></br>
              </div>
            </div>
          )}
        </div>
      )}
      

      {/* <h5>{openDropdown}</h5> */}
      <div className="can-history-filter-data-section" ref={policyRef} id="issue-containers">
        {selectedFilters.map((filter) => {
          const data = dummyData[filter] || [];
          const sortedData = data.sort((a, b) => b.count - a.count).slice(0, 6);
          const hasMoreItems = data.length > 6;

          return (
            <div className="can-history-filter-data" key={filter}  >
             
              <h3>
              <strong>Company Name : {companyName}</strong><br></br>
              <strong>Position : {position}</strong><br></br>
              <strong>Category : {openDropdown}</strong><br></br>
              <strong>Filtered Data by : {filter}</strong><br></br>
              <strong>Data for {monthSelector}</strong>


              </h3>
              <div className="can-history-filter-data-content">
                <div className="can-history-data-table-container">
                  <table className="can-history-data-table">
                    <thead>
                      <tr>
                        <th>{filter}</th>
                        <th>Count</th>
                        <th>Percentage</th>
                      </tr>
                    </thead>
                    <tbody>
                      {calculatePercentages(sortedData).map((item) => (
                        <tr
                          key={
                            item.companyName ||
                            item.ageRange ||
                            item.sourceName ||
                            item.certification ||
                            item.reportName ||
                            item.option ||
                            item.rating ||
                            item.status ||
                            item.gender ||
                            item.degree ||
                            item.requirement ||
                            item.recruiter ||
                            item.period ||
                            item.type ||
                            item.role ||
                            item.experience ||
                            item.skill ||
                            item.designation ||
                            item.salaryRange ||
                            item.distance ||
                            item.department
                          }
                        >
                          <td>
                            {item.companyName ||
                              item.ageRange ||
                              item.sourceName ||
                              item.certification ||
                              item.reportName ||
                              item.option ||
                              item.rating ||
                              item.status ||
                              item.gender ||
                              item.degree ||
                              item.requirement ||
                              item.recruiter ||
                              item.period ||
                              item.type ||
                              item.role ||
                              item.experience ||
                              item.skill ||
                              item.designation ||
                              item.salaryRange ||
                              item.distance ||
                              item.department}
                          </td>
                          <td>{item.count}</td>
                          <td>{item.percentage}%</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                {hasMoreItems && (
                  <button
                    className="can-history-more-items"
                    onClick={() => showPopup(filter)}
                  >
                    More Items
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
      {popupData && (
        <div className="can-history-popup">
          <div className="can-history-popup-content" ref={popupRef}>
            <button
              className="can-history-close-button"
              onClick={() => setPopupData(null)}
            >
              ×
            </button>
            <h3>
              <strong>{popupData.filter}</strong>
            </h3>
            <table className="can-history-data-table">
              <thead>
                <tr>
                  <th>{popupData.filter}</th>
                  <th>Count</th>
                  <th>Percentage</th>
                </tr>
              </thead>
              <tbody>
                {popupData.data.map((item) => (
                  <tr
                    key={
                      item.companyName ||
                      item.ageRange ||
                      item.sourceName ||
                      item.certification ||
                      item.reportName ||
                      item.option ||
                      item.rating ||
                      item.status ||
                      item.gender ||
                      item.degree ||
                      item.requirement ||
                      item.recruiter ||
                      item.period ||
                      item.type ||
                      item.role ||
                      item.experience ||
                      item.skill ||
                      item.designation ||
                      item.salaryRange ||
                      item.distance ||
                      item.department
                    }
                  >
                    <td>
                      {item.companyName ||
                        item.ageRange ||
                        item.sourceName ||
                        item.certification ||
                        item.reportName ||
                        item.option ||
                        item.rating ||
                        item.status ||
                        item.gender ||
                        item.degree ||
                        item.requirement ||
                        item.recruiter ||
                        item.period ||
                        item.type ||
                        item.role ||
                        item.experience ||
                        item.skill ||
                        item.designation ||
                        item.salaryRange ||
                        item.distance ||
                        item.department}
                    </td>
                    <td>{item.count}</td>
                    <td>{item.percentage}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default CandidateHistoryTracker;
