import React,{useState,useEffect} from 'react';
import "../EmployeeDashboard/JobList.css"
import { bottom } from '@popperjs/core';
import ShareDescription from './shareDescription';

const cities = [
  { name: "Bengaluru / Bangalore", count: 9495 },
  { name: "Hyderabad / Secunderabad, Telangana", count: 5478 },
  { name: "Chennai", count: 4959 },
  { name: "Mumbai", count: 3825 },
  { name: "Pune", count: 2905 },
  { name: "Delhi", count: 2203 },
  { name: "Mumbai City", count: 2055 },
  { name: "Gurgaon / Gurugram", count: 1904 },
  { name: "Navi Mumbai", count: 1574 },
  { name: "Ahmedabad", count: 1407 },
  { name: "Noida", count: 1309 },
  { name: "Thane", count: 1233 },
];

const industry=[
  
{ name : "IT/Computers - Software",count:10822},

{ name:"ITES/BPO/Call Center",count:5734},
{ name:"Banking/Accounting/Financial Services",count:3973},

{name:"Other",count:2531},

{name:"IT/Computers - Hardware & Networking",count:2523},

{name:"Hospitals/Healthcare/Diagnostics",count:2025},
{name:"Insurance", count:1950},
{name:"Education/Training",count:1316},

{name:"Construction & Engineering",count:1151},
{name:"Recruitment/Staffing/RPO", count:1056},

{name:"Automotive/Automobile/Ancillaries",count:919},
{name:"Engineering & Design",count:874},
{name:"FMCG",count:856},
{name:"Real Estate",count:799},
// Bio Technology & Life Sciences
// (791)

// Pharmaceutical
// (729)

// Telecom/ISP
// (703)

// Electronics Manufacturing
// (693)

// Hotels/Hospitality/Restaurant
// (652)

// Retailing
// (621)

// Industrial Automation/Industrial Equipment Mfg/Machinery
// (557)

// Airlines/Aviation/Aerospace
// (542)

// Oil/Gas/Petroleum
// (529)

// Travel/Tourism
// (486)

// KPO/Research/Analytics
// (483)

// Engineering/Procurement/Construction
// (482)

// Entertainment/Media/Publishing
// (479)

// Consulting/Advisory Services
// (477)

// Internet/E-commerce
// (432)

// Chemicals/Petrochemicals
// (415)

// E-Learning/EdTech
// (410)

// Architecture/Interior Design
// (367)

// Advertising/PR/Events
// (352)

// Paints
// (287)

// Power/Energy
// (285)

// Food Processing & Packaged Food
// (269)

// Consumer Electronics/Durables/Appliances
// (254)

// Market Research
// (250)

// Electrical Equipment
// (247)

// Fashion/Apparels
// (242)

// Textiles/Yarn/Fabrics/Garments
// (241)

// Shipping/Ports/Marine Services
// (224)

// Facility management
// (223)

// Iron/Steel
// (209)

// Overseas Education/Immigration
// (204)

// Logistics/Courier/Freight/Transportation
// (202)

// Social Media
// (199)

// Plastic/Rubber
// (196)

// Wellness/Fitness/Sports/Leisure & Recreation
// (188)

// Electronic Components/Semiconductors
// (180)

// Cement/Concrete/Readymix
// (175)

// Office Equipment/Automation
// (175)

// Medical Transcription
// (173)

// Gems & Jewellery
// (169)

// Printing/Packaging/Containers
// (162)

// Ceramics & Sanitary Ware
// (158)

// Escalators/Elevators
// (158)

// Heat Ventilation Air Conditioning (HVAC)
// (153)

// Glass
// (152)

// Sugar
// (145)

// General Trading/Import/Export
// (144)

// Legal/Law Firm
// (140)

// Paper
// (130)

// Public Relations (PR)
// (130)

// Agriculture/Dairy/Forestry/Fishing
// (129)

// Animation & VFX
// (129)

// NGO/Social Services
// (124)

// Beverages/Liquor
// (123)

// Railways Speciality/Infrastructure
// (120)

// Tyres
// (117)

// Water Treatment/Waste Management
// (108)

// Fertilizers/Pesticides/Agro chemicals
// (105)

// Wood
// (99)

// ISP
// (95)

// Non-Ferrous Metals (Aluminium/Zinc etc.)
// (88)

// Environmental Service
// (85)

// Government/PSU/Defence/Public Administration
// (85)

// Metals & Mining
// (84)

// Law Enforcement/Security Services
// (83)

// Leather
// (59)

// TV/Radio
// (8)

// Beauty & Personal Care
// (1)

// Comodities Trading
// (1)

// FinTech/Payments
// (1)

// Maritime Transportation
// (1)
]
const role=[
{name:"Software Engineer/Programmer",count:5180},

{name:"Fresher", count:4780},

{name:"Customer Service Executive (Voice)",count :4603},

{name:"Customer Service Executive (Non-voice)",count:1668},

{name:"Sales Exec/Sales Representative",count:1608},

{name:"Business Development Manager",count:1513},

{name:"Other Roles",count:1490},

{name:"Team Leader/Technical Leader",count:1350},

{name:"Software Developer", count:1285},

{name:"Technical Support Executive ( voice)",count:1102},

{name:"HR Executive/Recruiter",count:1009},

{name:"Business Development Executive",count:786},

{name:"Medical Coder",count:720},

{name:"Accountant",count:578},

{name:"Other Software/Hardware/EDP",count:539},

{name:"Telesales Executive",count:536},

{name:"Field Sales Executive",count:526},

{name:"Graduate Trainee/Management Trainee",count:480},


{name:"Technical Support Representative (Non- voice)",count:465},


{name:"Relationship Manager",count:441},


// Software Test Engineer
// (439)

// Other Customer Service/Call Center
// (398)

// Others
// (395)

// Area/Territory Sales Manager
// (392)

// Nurse
// (382)

// Project Leader/Project Manager
// (343)

// Technical Consultant
// (339)

// Mechanical Engineer
// (336)

// HR Manager
// (334)

// System Administrator
// (324)

// Marketing Executive
// (321)

// Trainee
// (320)

// Relationship Mgr/Account Servicing
// (312)

// Business Analyst
// (308)

// Technical Support Engineer
// (290)

// Network Administrator
// (288)

// Telemarketing Executive
// (287)

// Systems Engineer
// (280)

// ERP/CRM - Functional Consultant
// (252)

// Electrical Engineer
// (250)

// Pharmacist
// (249)

// ERP/CRM - Technical Consultant
// (224)

// Doctor
// (216)

// Graphic/Web Designer
// (215)

// Physiotherapist
// (213)

// Team Leader
// (210)

// Telesales Executive/Account Manager
// (209)

// System Analyst/Tech Architect
// (207)

// Finance Assistant
// (203)

// Telesales/Telemarketing Executive
// (199)

// Lab Technician
// (197)

// Recruitment - Head/Mgr
// (193)

// Other Finance & Accounts
// (192)

// Company Secretary
// (191)

// Ground Staff
// (190)

// Other Sales
// (190)

// Marketing Manager
// (188)

// AR Caller/AR Analyst
// (187)

// Social Media Marketing
// (178)

// Other Health Care/Hospitals
// (177)

// Sales Engineer
// (177)

// Channel Sales Manager
// (176)

// Quality Assurance/Control (QA/QC)
// (174)

// Sales Executive
// (174)

// Book Keeper/Accounts Assistant
// (172)

// Microbiologist
// (168)

// Telesales Consultant
// (163)

// Functional Consultant
// (162)

// Finance Manager
// (159)

// Chartered Accountant (CA)
// (146)

// Corporate Sales
// (145)

// Regional Sales Manager
// (145)

// Operations Manager
// (141)

// Sales Coordinator
// (141)

// Product Management
// (138)

// IT/Networking (EDP) - Manager
// (132)

// Other Human Resource
// (131)

// Other Banking
// (130)

// Security Analyst
// (129)

// Search Engine Optimisation (SEO)
// (128)

// Civil Engineer
// (127)

// Insurance Agent
// (126)

// Technical Architect
// (124)

// Purchase Officer/Co-ordinator/Executive
// (122)

// Marketing
// (120)

// Direct Marketing - Executive
// (119)

// Automotive Engineer
// (115)

// Trainee/Management Trainee
// (113)

// Architect
// (111)

// Payroll/Compensation Executive
// (111)

// Financial Services Consultant
// (110)

// Presales Consultant
// (109)

// Financial/Business Analyst
// (108)

// Key Accounts Manager
// (106)

// Project Management
// (106)

// Accounts Manager
// (105)

// Branch Manager
// (105)

// Private Practitioner/Lawyer
// (105)

// Other Hotels/Restaurants
// (104)

// Sales Agent
// (104)
]


const JobListing = () => {
 const [jobDescriptions, setJobDescriptions] = useState([]);
  const [selectedJobIndex, setSelectedJobIndex] = useState(-1); // Track which job description is selected
const [searchTerm, setSearchTerm] = useState('');
  const [selectedCities, setSelectedCities] = useState(new Set());
  const [selectedIndustry,setSelectedIndustry]=useState(new Set());
  const [selectedRole,setSleectedRole]=useState(new Set());
  const [showViewMore,setShowViewMore]=useState(false);
  const [showCityFilter,setShowCityFilter]=useState(false)
  const [showExperience,setShowExperience]=useState(false)
  const [showSalary,setShowSalary]=useState(false)
  const [showIncentive,setShowIncentive]=useState(false)
  const [showJobDescriptionShare, setShowJobDescriptionShare] = useState(false);
  const [showIndustry,setShowIndustry]=useState(false);
  const [showRoles,setShowRoles]=useState(false);
  const [showJobRole,setShowJobRole]=useState(false);

useEffect(() => {
    fetch("http://192.168.1.34:8891/api/ats/157industries/all-job-descriptions")
      .then((response) => response.json())
      .then((data) => {
        console.log(data); // Log the fetched data to inspect its structure
        setJobDescriptions(data);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleCheckboxChange2=(roles)=>{
 const newSelectedRoles=new Set(selectedRole);
    if(newSelectedRoles.has(roles)){
      newSelectedRoles.delete(roles);
    }else{
      newSelectedRoles.add(roles);
    }
    setSleectedRole(newSelectedRoles)
  }




  const handleCheckboxChange1=(industrys)=>{
 const newSelectedIndustry=new Set(selectedIndustry);
    if(newSelectedIndustry.has(industrys)){
      newSelectedIndustry.delete(industrys);
    }else{
      newSelectedIndustry.add(industrys);
    }
    setSelectedIndustry(newSelectedIndustry)
  }


  const handleCheckboxChange = (city) => {
    const newSelectedCities = new Set(selectedCities);
    
    if (newSelectedCities.has(city)) {
      newSelectedCities.delete(city);
    } else {
      newSelectedCities.add(city);
    }
    setSelectedCities(newSelectedCities);
  };

  const handleApply = () => {
    // Logic for applying the selected cities
    console.log(Array.from(selectedCities));
    console.log(Array.from(selectedIndustry));
    console.log(Array.from(selectedRole));
  };

  const handleReset = () => {
    setSelectedCities(new Set());
    setSelectedIndustry(new Set());
    setSleectedRole(new Set());
    setSearchTerm('');
  };

  const filteredCities = cities.filter(city =>
    city.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const filteredIndustry= industry.filter(industrys=>
    industrys.name.toLowerCase().includes(searchTerm.toLowerCase())
  )
  const filteredRoles=role.filter(roles=>
    roles.name.toLowerCase().includes(searchTerm.toLowerCase())
  )
  
  const toggleJobDescription = (index) => {
    setShowViewMore(true);
    if (selectedJobIndex === index) {
      setSelectedJobIndex(-1); // Toggle off if already selected
    } else {
      setSelectedJobIndex(index); // Toggle on for the selected index
    }
  };


  const handleclose =()=>{
    setShowViewMore(false);
  }
  const toggleCityFilter = () => {
    setShowCityFilter(!showCityFilter); // Toggle city filter visibility
    setShowExperience(false)
    setShowSalary(false)
    setShowIncentive(false);
    setShowIndustry(false)
    setShowRoles(false)
    setShowJobRole(false)
  };
  const toggleExperience=()=>{
    setShowExperience(!showExperience);
    setShowCityFilter(false) // Toggle experience filter visibility
    setShowSalary(false)
    setShowIncentive(false);
    setShowIndustry(false)
    setShowRoles(false)
    setShowJobRole(false)
  }
  const toggleSalary=()=>{
    setShowSalary(!showSalary);
     setShowCityFilter(false)
     setShowExperience(false)
     setShowIncentive(false);
     setShowIndustry(false)
     setShowRoles(false)
     setShowJobRole(false)
  }
  const toggleIncentive=()=>{
    setShowIncentive(!showIncentive);
     setShowCityFilter(false)
     setShowExperience(false)
     setShowSalary(false)
     setShowIndustry(false)
     setShowRoles(false)
     setShowJobRole(false)
  }
  const toggleIndustry =()=>{
    setShowIndustry(!showIndustry);
    setShowCityFilter(false)
    setShowExperience(false)
    setShowSalary(false)
    setShowIncentive(false);
    setShowRoles(false)
    setShowJobRole(false)
  }
  const toggleRoles=()=>{
    setShowRoles(!showRoles);
    setShowCityFilter(false)
    setShowExperience(false)
    setShowSalary(false)
    setShowIncentive(false);
    setShowIndustry(false)
    setShowJobRole(false)
  }
  const toggleJobRole=()=>{
    setShowJobRole(!showJobRole);
     setShowCityFilter(false)
    setShowExperience(false)
    setShowSalary(false)
    setShowIncentive(false);
    setShowIndustry(false);
    setShowRoles(false)
  }

   const sharejobdescription = (e) => {
    e.preventDefault();
    setShowJobDescriptionShare(true);
    document.querySelector(".main-description-share").style.display = "block";
  };


  return (
    <>
    <div className="search-container">

        <div className="search-bar">

          <input
            className="search-input"
            placeholder="Enter keyword / designation / companies"
            type="text"
          />
          <input
            className="search-input"
            list="experienceOptions"
            placeholder="Select experience"
            type="text"
          />
          <datalist id="experienceOptions">
            <option value="0-1 years" />
            <option value="1-3 years" />
            <option value="3-5 years" />
            <option value="5+ years" />
          </datalist>

          <input
            className="search-input"
            placeholder="Enter location"
            type="text"
          />
          <button className="search-button">
            <span className="search-icon">
              {/* Font Awesome icon for search */}
              <i className="fas fa-search"></i>
            </span>
            <span>Search</span>
          </button>
        </div>
      </div>
    <div className="filter-buttons">
      
      <ul>
        <li>
      <button className=" white-Btn" onClick={toggleCityFilter}>
        Location <span className="filter-icon">&#x25bc;</span>
      </button>
      {showCityFilter && (
       <div className='city-filter' >
      <input
        type="text"
        placeholder="Search"
        value={searchTerm}
        onChange={handleSearch}
        style={{ width: '100%', padding: '5px' }}
      />
      <div className='optionDiv' >
        {filteredCities.map(city => (
          <div key={city.name}>
            <label>
              <input
                type="checkbox"
                checked={selectedCities.has(city.name)}
                onChange={() => handleCheckboxChange(city.name)}
              />
              {city.name} ({city.count})
            </label>
          </div>
        ))}
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px',boxShadow:' 0 -4px 5px rgba(0, 0, 0, .05)',
    padding: '10px 24px'}}>
        <button onClick={handleReset} style={{ backgroundColor: 'white',color:"#ffcb9b", padding: '5px 10px',border:'none' }}>Reset</button>
        <button onClick={handleApply} style={{ backgroundColor: '#ffcb9b', color: 'white', padding: '5px 10px',border:'none',width:"50%" }}>Apply</button>
      </div>
    </div>
      )}
      </li>
      
     <li>
      <button className=" white-Btn" onClick={toggleExperience}>
        Experience <span className="filter-icon">&#x25bc;</span>
      </button>
      {showExperience && (
      <div className='city-filter' >
      
      <div className='optionDiv'>
          <div >
            <label>
              <input
                type="checkbox"
                
              />
              0 - 1 Years
            </label>
          </div>
          <div >
            <label>
              <input
                type="checkbox"
                
              />
              1 - 2 Years
            </label>
          </div>
          <div >
            <label>
              <input
                type="checkbox"
                
              />
              2 - 5 Years
            </label>
          </div>
          <div >
            <label>
              <input
                type="checkbox"
                
              />
              5 - 7 Years
            </label>
          </div>
          <div >
            <label>
              <input
                type="checkbox"
                
              />
              7 - 10 Years
            </label>
          </div>
          <div >
            <label>
              <input
                type="checkbox"
                
              />
              10 - 15 Years
            </label>
          </div>
          <div >
            <label>
              <input
                type="checkbox"
                
              />
              15 - * Years
            </label>
          </div>
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px',boxShadow:' 0 -4px 5px rgba(0, 0, 0, .05)',
    padding: '10px 24px'}}>
        <button onClick={handleReset} style={{ backgroundColor: 'white',color:"#ffcb9b", padding: '5px 10px',border:'none' }}>Reset</button>
        <button onClick={handleApply} style={{ backgroundColor: '#ffcb9b', color: 'white', padding: '5px 10px',border:'none',width:"50%" }}>Apply</button>
      </div>
    </div>
      )}
    </li>
     
     <li>
      <button className=" white-Btn" onClick={toggleSalary} >
        Salary <span className="filter-icon">&#x25bc;</span>
      </button>
      {showSalary && (
       <div className='city-filter' >
      
      <div className='optionDiv'>
          <div >
            <label>
              <input
                type="checkbox"
                
              />
             <i class="fa-solid fa-indian-rupee-sign"></i>
             <span> 0 - 1 Lakhs</span>
            </label>
          </div>
          <div >
            <label>
              <input
                type="checkbox"
                
              />
             <i class="fa-solid fa-indian-rupee-sign"></i>
             <span>  1 Lakhs - 2 Lakhs</span>
            </label>
          </div>
          <div >
            <label>
              <input
                type="checkbox"
                
              />
             <i class="fa-solid fa-indian-rupee-sign"></i>
             <span>  2 Lakhs - 5 Lakhs</span>
            </label>
          </div>
          <div >
            <label>
              <input
                type="checkbox"
                
              />
             <i class="fa-solid fa-indian-rupee-sign"></i>
             <span>  5 Lakhs - 10 Lakhs</span>
            </label>
          </div>
          <div >
            <label>
              <input
                type="checkbox"
                
              />
             <i class="fa-solid fa-indian-rupee-sign"></i>
             <span>  10 Lakhs - 20 Lakhs</span>
            </label>
          </div>
          <div >
            <label>
              <input
                type="checkbox"
                
              />
              <i class="fa-solid fa-indian-rupee-sign"></i>
             <span>  20 Lakhs - 30 Lakhs</span>
            </label>
          </div>
          <div >
            <label>
              <input
                type="checkbox"
                
              />
             <i class="fa-solid fa-indian-rupee-sign"></i>
             <span>  30 Lakhs - 50 Lakhs</span>
            </label>
          </div>
          <div >
            <label>
              <input
                type="checkbox"
                
              />
             <i class="fa-solid fa-indian-rupee-sign"></i>
             <span>  50 Lakhs -*</span>
            </label>
          </div>
          <div >
            <label>
              <input
                type="checkbox"
                
              />
             <span>  Not Specified</span>
            </label>
          </div>
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px',boxShadow:' 0 -4px 5px rgba(0, 0, 0, .05)',
    padding: '10px 24px'}}>
        <button onClick={handleReset} style={{ backgroundColor: 'white',color:"#ffcb9b", padding: '5px 10px',border:'none' }}>Reset</button>
        <button onClick={handleApply} style={{ backgroundColor: '#ffcb9b', color: 'white', padding: '5px 10px',border:'none',width:"50%" }}>Apply</button>
      </div>
    </div>
      )}
      </li>
      <li>
      <button className=" white-Btn" onClick={toggleIncentive}>
        Incentive <span className="filter-icon">&#x25bc;</span>
      </button>
        {showIncentive && (
       <div className='city-filter' >
      
      <div className='optionDiv'>
          <div >
            <label>
              <input
                type="checkbox"
                
              />
             <i class="fa-solid fa-indian-rupee-sign"></i>
             <span> 0 - 10 Thousand</span>
            </label>
          </div>
          <div >
            <label>
              <input
                type="checkbox"
                
              />
             <i class="fa-solid fa-indian-rupee-sign"></i>
             <span>  10 Thousand - 20 Thousand</span>
            </label>
          </div>
          <div >
            <label>
              <input
                type="checkbox"
                
              />
             <i class="fa-solid fa-indian-rupee-sign"></i>
             <span>  20 Thousand - 30 Thousand</span>
            </label>
          </div>
          <div >
            <label>
              <input
                type="checkbox"
                
              />
             <i class="fa-solid fa-indian-rupee-sign"></i>
             <span>  40 Thousand - 50 Thousand</span>
            </label>
          </div>
          
          
          
          <div >
            <label>
              <input
                type="checkbox"
                
              />
             <i class="fa-solid fa-indian-rupee-sign"></i>
             <span>  50 Thousand -*</span>
            </label>
          </div>
          <div >
            <label>
              <input
                type="checkbox"
                
              />
             <span>  Not Specified</span>
            </label>
          </div>
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px',boxShadow:' 0 -4px 5px rgba(0, 0, 0, .05)',
    padding: '10px 24px'}}>
        <button onClick={handleReset} style={{ backgroundColor: 'white',color:"#ffcb9b", padding: '5px 10px',border:'none' }}>Reset</button>
        <button onClick={handleApply} style={{ backgroundColor: '#ffcb9b', color: 'white', padding: '5px 10px',border:'none',width:"50%" }}>Apply</button>
      </div>
    </div>
      )}
      </li>
      <li>
      <button className=" white-Btn" onClick={toggleIndustry}>
        Industry <span className="filter-icon">&#x25bc;</span>
      </button>
      {showIndustry && (
       <div className='city-filter' >
      <input
        type="text"
        placeholder="Search"
        value={searchTerm}
        onChange={handleSearch}
        style={{ width: '100%', padding: '5px' }}
      />
      <div className='optionDiv' >
        {filteredIndustry.map(industrys => (
          <div key={industrys.name}>
            <label>
              <input
                type="checkbox"
                checked={selectedIndustry.has(industrys.name)}
                onChange={() => handleCheckboxChange1(industrys.name)}
              />
              {industrys.name} ({industrys.count})
            </label>
          </div>
        ))}
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px',boxShadow:' 0 -4px 5px rgba(0, 0, 0, .05)',
    padding: '10px 24px'}}>
        <button onClick={handleReset} style={{ backgroundColor: 'white',color:"#ffcb9b", padding: '5px 10px',border:'none' }}>Reset</button>
        <button onClick={handleApply} style={{ backgroundColor: '#ffcb9b', color: 'white', padding: '5px 10px',border:'none',width:"50%" }}>Apply</button>
      </div>
    </div>
      )}
      </li>
      <li>
      <button className=" white-Btn" onClick={toggleRoles}>
        Role <span className="filter-icon">&#x25bc;</span>
      </button>
        {showRoles && (
       <div className='city-filter' >
      <input
        type="text"
        placeholder="Search"
        value={searchTerm}
        onChange={handleSearch}
        style={{ width: '100%', padding: '5px' }}
      />
      <div className='optionDiv' >
        {filteredRoles.map(roles => (
          <div key={roles.name}>
            <label>
              <input
                type="checkbox"
                checked={selectedRole.has(roles.name)}
                onChange={() => handleCheckboxChange2(roles.name)}
              />
              {roles.name} ({roles.count})
            </label>
          </div>
        ))}
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px',boxShadow:' 0 -4px 5px rgba(0, 0, 0, .05)',
    padding: '10px 24px'}}>
        <button onClick={handleReset} style={{ backgroundColor: 'white',color:"#ffcb9b", padding: '5px 10px',border:'none' }}>Reset</button>
        <button onClick={handleApply} style={{ backgroundColor: '#ffcb9b', color: 'white', padding: '5px 10px',border:'none',width:"50%" }}>Apply</button>
      </div>
    </div>
      )}
      </li>
      <li>
      <button className=" white-Btn" onClick={toggleJobRole}>
        Job Type <span className="filter-icon">&#x25bc;</span>
      </button>
       {showJobRole && (
      <div className='city-filter' >
      
      <div className='optionDiv'>
          <div >
            <label>
              <input
                type="checkbox"
                
              />
             Permanent Job
            </label>
          </div>
          <div >
            <label>
              <input
                type="checkbox"
                
              />
              International
            </label>
          </div>
          <div >
            <label>
              <input
                type="checkbox"
                
              />
              Jobs for Women
            </label>
          </div>
          <div >
            <label>
              <input
                type="checkbox"
                
              />
              Work From Home
            </label>
          </div>
          <div >
            <label>
              <input
                type="checkbox"
                
              />
              Contract Job
            </label>
          </div>
          <div >
            <label>
              <input
                type="checkbox"
                
              />
              Jobs for COVID-19 Layoffs
            </label>
          </div>
          <div >
            <label>
              <input
                type="checkbox"
                
              />
              Walkin Job
            </label>
          </div>
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px',boxShadow:' 0 -4px 5px rgba(0, 0, 0, .05)',
    padding: '10px 24px'}}>
        <button onClick={handleReset} style={{ backgroundColor: 'white',color:"#ffcb9b", padding: '5px 10px',border:'none' }}>Reset</button>
        <button onClick={handleApply} style={{ backgroundColor: '#ffcb9b', color: 'white', padding: '5px 10px',border:'none',width:"50%" }}>Apply</button>
      </div>
    </div>
      )}
      </li>
      <li>
      <button className=" white-Btn">
        Job Freshness <span className="filter-icon">&#x25bc;</span>
      </button>
      </li>
      <li>
      <button className=" white-Btn">
        <span className="filter-icon">&#x2600;</span>
        All Filters
      </button>
      </li>
      </ul>
    </div>

    {!showViewMore && (
      
    <div className='jdCards'>
      {jobDescriptions.map((item, index) => (
      <div className="job-listing"  key={index}>
      <div className="job-header">
        <h2 className="job-title">{item.designation} </h2>
        <div className="job-company">{item.companyName}</div>
      </div>
      <div className="job-details">
        <div className="job-location">
          <i className="fas fa-map-marker-alt"></i>
          {item.location}
        </div>
        <div className="job-experience">
          <i className="fas fa-calendar-alt"></i>
          {item.experience}
        </div>
        <div className="job-skills">
          <i className="fas fa-tags"></i>
         {item.skills}
        </div>
        {/* <div className="job-posted">
          <i className="fas fa-clock"></i>
          a day ago
        </div> */}
      </div>

      
      {/* Arshad Added this button to share edm  */} 
      <div className="job-actions">
        <button className='daily-tr-btn' onClick={()=>toggleJobDescription(index)}>View More</button>
        <button className='daily-tr-btn' > EDM  <i id='edm-share-icon'  className="fa-solid fa-eye"></i></button>
      </div>



    </div>
    
        ))}
        
    </div>
  
  )}


  {showViewMore && (
        <main className="name">
          {selectedJobIndex !== -1 && (
            <section className="overview">
              <div className="scroll-container">
                <div className="info">
                  <div className="info-title">Position Overview</div>
                  <div className="info-value">
                    {jobDescriptions[selectedJobIndex]?.positionOverview?.overview || "N/A"}
                  </div>
                </div>
                <div className="info">
                  <div className="info-title">Responsibilities</div>
                  <div className="info-value">
                    <ul>
                      {jobDescriptions[selectedJobIndex]?.responsibilities?.map((responsibility, idx) => (
                        <li key={idx}>{responsibility.responsibilitiesMsg}</li>
                      )) || "N/A"}
                    </ul>
                  </div>
                </div>
                <div className="info">
                  <div className="info-title">Requirements</div>
                  <div className="info-value">
                    <ul>
                      {jobDescriptions[selectedJobIndex]?.jobRequirements?.map((jobRequirement, idx) => (
                        <li key={idx}>{jobRequirement.jobRequirementMsg}</li>
                      )) || "N/A"}
                    </ul>
                  </div>
                </div>
                <div className="info">
                  <div className="info-title">Preferred Qualifications</div>
                  <div className="info-value">
                    <ul>
                      {jobDescriptions[selectedJobIndex]?.preferredQualifications?.map((qualification, idx) => (
                        <li key={idx}>{qualification.preferredQualificationMsg}</li>
                      )) || "N/A"}
                    </ul>
                  </div>
                </div>
              </div>
            </section>
          )}
          <section className="job-performance1">
            <span>
              <article>
                <b>SOFTWARE DEVELOPER</b>
              </article>
              <div className="save">
                <button className="saved daily-tr-btn">Save</button>
                <button className="apply daily-tr-btn">Apply</button>
                <button className="share daily-tr-btn" onClick={sharejobdescription}>Share</button>
                <button onClick={handleclose} className='daily-tr-btn'>Close</button>
              </div>
            </span>
            {selectedJobIndex !== -1 && (
              <div className="names">
                <p><b>Field : </b>{jobDescriptions[selectedJobIndex]?.field || "N/A"}</p>
                <p><b>Location :</b>{jobDescriptions[selectedJobIndex]?.location || "N/A"}</p>
                <p><b>Salary :</b> {jobDescriptions[selectedJobIndex]?.salary || "N/A"}</p>
                <p><b>Designation :</b>{jobDescriptions[selectedJobIndex]?.designation || "N/A"}</p>
                <p><b>Educational Qualifications :</b>{jobDescriptions[selectedJobIndex]?.qualification || "N/A"}</p>
                <p><b>Experience :</b>{jobDescriptions[selectedJobIndex]?.experience || "N/A"}</p>
                <p><b>Key Skills :</b>{jobDescriptions[selectedJobIndex]?.skills || "N/A"}</p>
                <p><b>Company Link :</b><a href={jobDescriptions[selectedJobIndex]?.companyLink || "#"}>Website</a></p>
                <p><b>Shifts : </b>{jobDescriptions[selectedJobIndex]?.shift || "N/A"}</p>
                <p><b>Week Off's : </b>{jobDescriptions[selectedJobIndex]?.weekOff || "N/A"}</p>
                <p><b>Notice Period :</b> {jobDescriptions[selectedJobIndex]?.noticePeriod || "N/A"}</p>
                <p><b>Job Role : </b>{jobDescriptions[selectedJobIndex]?.jobRole || "N/A"}</p>
                <p><b>Job Type : </b>{jobDescriptions[selectedJobIndex]?.job_type || "N/A"}</p>
                <p><b>Perks:</b>
                  {jobDescriptions[selectedJobIndex]?.perks || "N/A"}
                </p>
                <p><b>Incentives For Recruiters : </b>{jobDescriptions[selectedJobIndex]?.incentive || "N/A"}</p>
                <p><b>Reporting Hierarchy : </b>{jobDescriptions[selectedJobIndex]?.reportingHierarchy || "N/A"}</p>
                <p><b>Number of Positions : </b>{jobDescriptions[selectedJobIndex]?.position || "N/A"}</p>
                <p><b>Documentation : </b>{jobDescriptions[selectedJobIndex]?.documentation || "N/A"}</p>
                <p><b>Gender : </b>{jobDescriptions[selectedJobIndex]?.gender || "N/A"}</p>
              </div>
            )}
          </section>
        </main>
 )}
 {showJobDescriptionShare && (
        <>
          <ShareDescription Descriptions={jobDescriptions[selectedJobIndex]} />
        </>
      )}

    </>
  );
};

const JobList = () => {
  return (
    <div className="job-list">
      <JobListing />
      {/* Add more job listings as needed */}
    </div>
  );
};

export default JobList;