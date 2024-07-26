 {/* Name:-Prachi Parab Component:-Report data page
           End LineNo:-1 to 249 Date:-04/07 */}

           import React, { useState,useMemo,useCallback,useEffect } from 'react';
           import "../Reports/MainReportDatapage.css";
          
          import CreateReportTable from "../Reports/CreateReportTable"; 
          
          import axios from "axios";
          import { json, useParams } from "react-router-dom";
          
          
          const MonthReport = () => {
            const { userType } = useParams();
            const { employeeId } = useParams();
            const [searchTerm, setSearchTerm] = useState("");
              const [dropdownOpen, setDropdownOpen] = useState(false);
              const [selectedMainAdmin, setSelectedMainAdmin] = useState(null);
              const [selectedTeamLeader, setSelectedTeamLeader] = useState({
                teamLeaderId:"",
                teamLeaderJobRole:""
              });
          
              const [selectedRecruiters, setSelectedRecruiters] = useState({
                index:"",
                recruiterId:"",
                recruiterJobRole:""
              });
          
              const [selectedManager, setSelectedManager] = useState({
                managerId:"",
                managerJobRole:""
              });
          
              const [selectedOptions, setSelectedOptions] = useState([]);
              const [assignments, setAssignments] = useState({});
              const [allSelected, setAllSelected] = useState(false);
              const [editRecruiter, setEditRecruiter] = useState(null);
              const [openCategory, setOpenCategory] = useState(null); // New state for open category
              const [showReport, setShowReport] = useState(false); // State to control the visibility of the report
              
            
              const [SelectedManagerName,setSelectedManagerName]=useState({});
          
              const [manager, setManager] = useState([]);  //prachi
            
              //Name:-Akash Pawar Component:-Team_Leadder Subcategory:-Assign Column TeamLeader Names and Recruiter Names(changed) Start LineNo:-17  Date:-03/07
              const [teamLeaderNames, setTeamLeaderNames] = useState([]);
              const [recruiterUnderTeamLeader, setRecruiterUnderTeamLeader] = useState([]); //Prachi
              const [teamLeaderUnderManager, setTeamLeaderUnderManager] = useState([]);  //Prachi
              const [recruiterUnderTeamLeaderData, setRecruiterUnderTeamLeaderData] = useState([]);
              const [selectedOption, setSelectedOption] = useState(null);
          
          
          
            const [startDate,setStartDate]=useState('');
            const [endDate,setEndDate]=useState('');
            const [showCustomDiv, setShowCustomDiv] = useState(false);
            const [showReportData, setshowReportData] = useState(false);
            const [showToggle, setShowToggle] = useState(false);
          
            const [reportSelectedDate,setreportSelectedDate]=useState(false);
            const [selectedDate, setSelectedDate] = useState('');
            const [candidatesDatewiseData,setcandidatesDatewiseData]=useState([]);
              // State to track the currently selected month
              const [selectedMonth, setSelectedMonth] = useState('lastMonth');
              const [reportDataDatewise, setReportDataDatewise] = useState(null);
         
          
            //  console.log(JSON.stringify(selectedManager));
            // console.log(JSON.stringify(selectedTeamLeader));
            // console.log(JSON.stringify(selectedRecruiters))
          
          
          
            useEffect(()=>{
              const fetchManagerNames=async()=>{
                const response=await axios.get(
                  `http://192.168.1.42:9090/api/ats/157industries/get-all-managers`
                  
                );
          
                setManager(response.data);
             
                // console.log(response.data);
          
                // if(userType==="SuperUser"){
                //   setManager(response.data);
                // }else{
                //   setManager(
                //     response.data.filter((manager)=>manager.managerId==employeeId)
                //   );
                // }
                
              };
              fetchManagerNames();
            },[]);
          
            useEffect(()=>{
              const fetchTeamLeaderNames=async()=>{
                const response=await axios.get(
               
                   `http://192.168.1.42:9090/api/ats/157industries/tl-namesIds/${selectedManager.managerId}`
                );
                setTeamLeaderUnderManager(response.data);
         
                
              };
              if(selectedManager.managerId!=""){
                fetchTeamLeaderNames();
              }
              
            },[selectedManager]);
          
            const fetchRecruiterUnderTeamLeaderData=useCallback(async ()=>{
              const response=await axios.get(
                `http://192.168.1.42:9090/api/ats/157industries/employeeId-names/${selectedTeamLeader.teamLeaderId}`
          
              );
              setRecruiterUnderTeamLeaderData(response.data);
            },[selectedTeamLeader]);
          
            useEffect(()=>{
              if(selectedTeamLeader!=null){
                fetchRecruiterUnderTeamLeaderData();
               
               
              }
            },[selectedTeamLeader]);

            // Date Handling Prachi 
            const today=new Date();
        
          const lastMonthDate=new Date(today.getFullYear(),today.getMonth()-1,today.getDate());

            useEffect(()=>{

              const fetchDateData=async ()=>{
               
              }
              fetchDateData();         
      
          },[]);
     
            const handleStartDateChange=(event)=>{
              setStartDate(event.target.value);
            }
          
            const handleEndDateChange=(event)=>{
              setEndDate(event.target.value);
            }
            const showDataReport=()=>{
              setshowReportData(true);
          
             
            }
          
            const handleToggle = () => {
              
              setShowToggle(!showToggle); 
              setShowCustomDiv(false);
              setshowReportData(false)
            };
           
            const fetchLastMonthData=()=>{
            
                const today = new Date();
                const lastMonthStartDate1 = new Date(today.getFullYear(), today.getMonth() - 1, 1);
                const lastMonthEndDate1 = new Date(today.getFullYear(), today.getMonth(), 0);
                const lastMonthStartDate=lastMonthStartDate1.toISOString().slice(0,10);
                const lastMonthEndDate=lastMonthEndDate1.toISOString().slice(0,10);
                console.log(lastMonthStartDate  + " Start date");
                console.log(lastMonthEndDate + " End date");

        
              console.log(selectedTeamLeader.teamLeaderId);
              console.log(selectedTeamLeader.teamLeaderJobRole);
           
                const FetchDataDatewise=async()=>{
                 
                  let baseURL='';
          
                  if(selectedManager.managerId){
                    baseURL=`${selectedManager.managerId}/${selectedManager.managerJobRole}`;
                  }
                   if(selectedManager.managerId && selectedTeamLeader.teamLeaderId){
                    baseURL=`${selectedTeamLeader.teamLeaderId}/${selectedTeamLeader.teamLeaderJobRole}`
                  } if(selectedManager.managerId && selectedTeamLeader.teamLeaderId && selectedRecruiters.recruiterId){
                    baseURL=`${selectedRecruiters.recruiterId} /${selectedRecruiters.recruiterJobRole}`
                  }
                  console.log(baseURL);

                  // const ApiData=`${selectedManager.managerId}/${selectedManager.managerJobRole}/${lastMonthStartDate}/${lastMonthEndDate}`;

                  const response=await axios.get(
                    `http://192.168.1.42:9090/api/ats/157industries/report-count/${baseURL}/${lastMonthStartDate}/${lastMonthEndDate}`
                    // `http://192.168.1.46:9090/api/ats/157industries/report-count/870/Manager/2024-01-01/2024-07-18`
                  )
                  setReportDataDatewise(response.data);
                  console.log(response.data);
                };
                FetchDataDatewise();
   
            }
            const fetchthreeMonthData=()=>{
              const today = new Date();
                const lastThreeMonthStartDate1 = new Date(today.getFullYear(), today.getMonth() - 3, 1);
                const lastThreeMonthEndDate1 = new Date(today.getFullYear(), today.getMonth(), 0);
                const lastThreeMonthStartDate=lastThreeMonthStartDate1.toISOString().slice(0,10);
                const lastThreeMonthEndDate=lastThreeMonthEndDate1.toISOString().slice(0,10);
                console.log(lastThreeMonthStartDate  + " Start date");
                console.log(lastThreeMonthEndDate + " End date");

        
              console.log(selectedTeamLeader.teamLeaderId);
              console.log(selectedTeamLeader.teamLeaderJobRole);
           
                const FetchDataDatewise=async()=>{
                 
                  let baseURL='';
          
                  if(selectedManager.managerId){
                    baseURL=`${selectedManager.managerId}/${selectedManager.managerJobRole}`;
                  }
                   if(selectedManager.managerId && selectedTeamLeader.teamLeaderId){
                    baseURL=`${selectedTeamLeader.teamLeaderId}/${selectedTeamLeader.teamLeaderJobRole}`
                  } if(selectedManager.managerId && selectedTeamLeader.teamLeaderId && selectedRecruiters.recruiterId){
                    baseURL=`${selectedRecruiters.recruiterId} /${selectedRecruiters.recruiterJobRole}`
                  }
                  

                  // const ApiData=`${selectedManager.managerId}/${selectedManager.managerJobRole}/${lastMonthStartDate}/${lastMonthEndDate}`;

                  const response=await axios.get(
                    `http://192.168.1.42:9090/api/ats/157industries/report-count/${baseURL}/${lastThreeMonthStartDate}/${lastThreeMonthEndDate}`
                    // `http://192.168.1.46:9090/api/ats/157industries/report-count/870/Manager/2024-01-01/2024-07-18`
                  )
                  setReportDataDatewise(response.data);
                  console.log(response.data);
                };
                FetchDataDatewise();
   

            }

            const fetchSixMonthData=()=>{

              const today = new Date();

                const lastSixMonthStartDate1 = new Date(today.getFullYear(), today.getMonth() - 6, 1);
                const lastSixMonthEndDate1 = new Date(today.getFullYear(), today.getMonth(), 0);
                const lastSixMonthStartDate=lastSixMonthStartDate1.toISOString().slice(0,10);
                const lastSixMonthEndDate=lastSixMonthEndDate1.toISOString().slice(0,10);
                console.log(lastSixMonthStartDate  + " Start date");
                console.log(lastSixMonthEndDate + " End date");

        
              console.log(selectedTeamLeader.teamLeaderId);
              console.log(selectedTeamLeader.teamLeaderJobRole);
           
                const FetchDataDatewise=async()=>{
                 
                  let baseURL='';
          
                  if(selectedManager.managerId){
                    baseURL=`${selectedManager.managerId}/${selectedManager.managerJobRole}`;
                  }
                   if(selectedManager.managerId && selectedTeamLeader.teamLeaderId){
                    baseURL=`${selectedTeamLeader.teamLeaderId}/${selectedTeamLeader.teamLeaderJobRole}`
                  } if(selectedManager.managerId && selectedTeamLeader.teamLeaderId && selectedRecruiters.recruiterId){
                    baseURL=`${selectedRecruiters.recruiterId} /${selectedRecruiters.recruiterJobRole}`
                  }
                  

                  // const ApiData=`${selectedManager.managerId}/${selectedManager.managerJobRole}/${lastMonthStartDate}/${lastMonthEndDate}`;

                  const response=await axios.get(
                    `http://192.168.1.42:9090/api/ats/157industries/report-count/${baseURL}/${lastSixMonthStartDate}/${lastSixMonthEndDate}`
                    // `http://192.168.1.46:9090/api/ats/157industries/report-count/870/Manager/2024-01-01/2024-07-18`
                  )
                  setReportDataDatewise(response.data);
                  console.log(response.data);
                };
                FetchDataDatewise();
   

            }

            const fetchOneYearData=()=>{
              const today = new Date();
              const lastOneYearStartDate1 = new Date(today.getFullYear(), today.getMonth() - 12, 1);
              const lastOneYearEndDate1 = new Date(today.getFullYear(), today.getMonth(), 0);
              const lastOneYearStartDate=lastOneYearStartDate1.toISOString().slice(0,10);
              const lastOneYearEndDate=lastOneYearEndDate1.toISOString().slice(0,10);
              console.log(lastOneYearStartDate  + " Start date");
              console.log(lastOneYearEndDate + " End date");

      
            console.log(selectedTeamLeader.teamLeaderId);
            console.log(selectedTeamLeader.teamLeaderJobRole);
         
              const FetchDataDatewise=async()=>{
               
                let baseURL='';
        
                if(selectedManager.managerId){
                  baseURL=`${selectedManager.managerId}/${selectedManager.managerJobRole}`;
                }
                 if(selectedManager.managerId && selectedTeamLeader.teamLeaderId){
                  baseURL=`${selectedTeamLeader.teamLeaderId}/${selectedTeamLeader.teamLeaderJobRole}`
                } if(selectedManager.managerId && selectedTeamLeader.teamLeaderId && selectedRecruiters.recruiterId){
                  baseURL=`${selectedRecruiters.recruiterId} /${selectedRecruiters.recruiterJobRole}`
                }
                

                // const ApiData=`${selectedManager.managerId}/${selectedManager.managerJobRole}/${lastMonthStartDate}/${lastMonthEndDate}`;

                const response=await axios.get(
                  `http://192.168.1.42:9090/api/ats/157industries/report-count/${baseURL}/${lastOneYearStartDate}/${lastOneYearEndDate}`
                  // `http://192.168.1.46:9090/api/ats/157industries/report-count/870/Manager/2024-01-01/2024-07-18`
                )
                setReportDataDatewise(response.data);
                console.log(response.data);
              };
              FetchDataDatewise();
 


            }
            const fetchCustomDateData=()=>{
              const today = new Date();
              const lastOneYearStartDate1 = new Date(today.getFullYear(), today.getMonth() - 12, 1);
              const lastOneYearEndDate1 = new Date(today.getFullYear(), today.getMonth(), 0);
              const lastOneYearStartDate=lastOneYearStartDate1.toISOString().slice(0,10);
              const lastOneYearEndDate=lastOneYearEndDate1.toISOString().slice(0,10);
              console.log(lastOneYearStartDate  + " Start date");
              console.log(lastOneYearEndDate + " End date");

      
            console.log(selectedTeamLeader.teamLeaderId);
            console.log(selectedTeamLeader.teamLeaderJobRole);
         
              const FetchDataDatewise=async()=>{
               
                let baseURL='';
        
                if(selectedManager.managerId){
                  baseURL=`${selectedManager.managerId}/${selectedManager.managerJobRole}`;
                }
                 if(selectedManager.managerId && selectedTeamLeader.teamLeaderId){
                  baseURL=`${selectedTeamLeader.teamLeaderId}/${selectedTeamLeader.teamLeaderJobRole}`
                } if(selectedManager.managerId && selectedTeamLeader.teamLeaderId && selectedRecruiters.recruiterId){
                  baseURL=`${selectedRecruiters.recruiterId} /${selectedRecruiters.recruiterJobRole}`
                }
                

                // const ApiData=`${selectedManager.managerId}/${selectedManager.managerJobRole}/${lastMonthStartDate}/${lastMonthEndDate}`;

                const response=await axios.get(
                  `http://192.168.1.42:9090/api/ats/157industries/report-count/${baseURL}/${lastOneYearStartDate}/${lastOneYearEndDate}`
                  // `http://192.168.1.46:9090/api/ats/157industries/report-count/870/Manager/2024-01-01/2024-07-18`
                )
                setReportDataDatewise(response.data);
                console.log(response.data);
              };
              FetchDataDatewise();
 


            }
            const fetchJoiningDateData=()=>{
              const today = new Date();
              const lastOneYearStartDate1 = new Date(today.getFullYear(), today.getMonth() - 12, 1);
              const lastOneYearEndDate1 = new Date(today.getFullYear(), today.getMonth(), 0);
              const lastOneYearStartDate=lastOneYearStartDate1.toISOString().slice(0,10);
              const lastOneYearEndDate=lastOneYearEndDate1.toISOString().slice(0,10);
              console.log(lastOneYearStartDate  + " Start date");
              console.log(lastOneYearEndDate + " End date");

      
            console.log(selectedTeamLeader.teamLeaderId);
            console.log(selectedTeamLeader.teamLeaderJobRole);
         
              const FetchDataDatewise=async()=>{
               
                let baseURL='';
        
                if(selectedManager.managerId){
                  baseURL=`${selectedManager.managerId}/${selectedManager.managerJobRole}`;
                }
                 if(selectedManager.managerId && selectedTeamLeader.teamLeaderId){
                  baseURL=`${selectedTeamLeader.teamLeaderId}/${selectedTeamLeader.teamLeaderJobRole}`
                } if(selectedManager.managerId && selectedTeamLeader.teamLeaderId && selectedRecruiters.recruiterId){
                  baseURL=`${selectedRecruiters.recruiterId} /${selectedRecruiters.recruiterJobRole}`
                }
                

                // const ApiData=`${selectedManager.managerId}/${selectedManager.managerJobRole}/${lastMonthStartDate}/${lastMonthEndDate}`;

                const response=await axios.get(
                  `http://192.168.1.42:9090/api/ats/157industries/report-count/${baseURL}/${lastOneYearStartDate}/${lastOneYearEndDate}`
                 
                )
                setReportDataDatewise(response.data);
                console.log(response.data);
              };
              FetchDataDatewise();
 


            }
            
            const fetchCurrentMonthData=()=>{

              const today = new Date();
              const lastOneYearStartDate1 = new Date(today.getFullYear(), today.getMonth(), 1);
              const lastOneYearEndDate1 = new Date(today.getFullYear(), today.getMonth(), 0);
              const lastOneYearStartDate=lastOneYearStartDate1.toISOString().slice(0,10);
              const lastOneYearEndDate=lastOneYearEndDate1.toISOString().slice(0,10);
              console.log(lastOneYearStartDate  + " Start date");
              console.log(lastOneYearEndDate + " End date");

      
            console.log(selectedTeamLeader.teamLeaderId);
            console.log(selectedTeamLeader.teamLeaderJobRole);
         
              const FetchDataDatewise=async()=>{
               
                let baseURL='';
        
                if(selectedManager.managerId){
                  baseURL=`${selectedManager.managerId}/${selectedManager.managerJobRole}`;
                }
                 if(selectedManager.managerId && selectedTeamLeader.teamLeaderId){
                  baseURL=`${selectedTeamLeader.teamLeaderId}/${selectedTeamLeader.teamLeaderJobRole}`
                } if(selectedManager.managerId && selectedTeamLeader.teamLeaderId && selectedRecruiters.recruiterId){
                  baseURL=`${selectedRecruiters.recruiterId} /${selectedRecruiters.recruiterJobRole}`
                }
                


                const response=await axios.get(
                  `http://192.168.1.42:9090/api/ats/157industries/report-count/${baseURL}/${lastOneYearStartDate}/${lastOneYearEndDate}`
                 
                )
                setReportDataDatewise(response.data);
                console.log(response.data);
              };
              FetchDataDatewise();
 

            }
            
          
            const handleMonthChange = (event) => {
              setSelectedMonth(event.target.value);
              
              if(event.target.value==='LastMonth'){ 
                fetchLastMonthData();
              }else if(event.target.value==='Last3Months'){
                fetchthreeMonthData();
              }else if(event.target.value==='Last6Months'){
                fetchSixMonthData();
              }else if(event.target.value==='Last1Year'){
                fetchOneYearData();
              }else if(event.target.value==='CustomDate'){
                fetchCustomDateData();
              }else if(event.target.value==='JoiningDate'){
                fetchJoiningDateData();
              }else if(event.target.value==='CurrentMonth'){
                fetchCurrentMonthData();
              }
             
            };
          
            const showCustomDateDiv=()=>{
              setShowCustomDiv(true);
            }
            const hideCustomDateDiv=()=>{
              setShowCustomDiv(false);
            }
          
            useEffect(() => {
              const fetchTeamLeaderNames = async () => {
                const response = await axios.get(
                  `http://192.168.1.42:9090/api/ats/157industries/tl-namesIds`
                
                );
                setTeamLeaderNames(response.data);
              };
              fetchTeamLeaderNames();
            }, []);
            const fetchRecruiterUnderTeamLeader = useCallback(async () => {
     
                const response = await axios.get(
                  `http://192.168.1.42:9090/api/ats/157industries/byTeamLeader/${selectedTeamLeader}`
              
                );
                setRecruiterUnderTeamLeader(response.data);
              }, [selectedTeamLeader]);
          
              useEffect(() => {
                if (selectedTeamLeader != null) {
                  fetchRecruiterUnderTeamLeader();
                }
              }, [selectedTeamLeader, fetchRecruiterUnderTeamLeader]);
            
              //Name:-Akash Pawar Component:-Team_Leadder Subcategory:-Assign Column TeamLeader Names and Recruiter Names(changed) End LineNo:-44  Date:-03/07
              const teamLeaders = useMemo(
                () => [
                  {
                    label: "Team Leader 1",
                    recruiters: [
                      "Recruiter 1",
                      "Recruiter 2",
                      "Recruiter 3",
                      "Recruiter 4",
                      "Recruiter 5",
                    ],
                  },
                  {
                    label: "Team Leader 2",
                    recruiters: [
                      "Recruiter 6",
                      "Recruiter 7",
                      "Recruiter 8",
                      "Recruiter 9",
                      "Recruiter 10",
                    ],
                  },
                ],
                []
              );
          
              const options = useMemo(
                () => [
                  { label: "Date", category: "Common Assign" },
                  { label: "Recruiter Name", category: "Common Assign" },
                  { label: "Candidate ID", category: "Common Assign" },
                  { label: "Date Of Birth", category: "Common Assign" },
                  { label: "Candidate Name", category: "Common Assign" },
                  { label: "Candidate Email", category: "Common Assign" },
                  { label: "Contact Number", category: "Common Assign" },
                  { label: "Alternate Number", category: "Common Assign" },
                  { label: "Education", category: "Common Assign" },
                  { label: "Current Location", category: "Common Assign" },
                  { label: "Gender", category: "Common Assign" },
                  { label: "Year of passing", category: "Common Assign" },
                  { label: "Resume uploaded", category: "Common Assign" },
                  { label: "Any Extra Certification", category: "Common Assign" },
                  { label: "Experience", category: "Common Assign" },
                  { label: "Candidate interested /not", category: "Common Assign" },
            
                  { label: "Source Name", category: "Important Assign" },
                  { label: "Applying Company ID", category: "Important Assign" },
                  { label: "Applying For Position", category: "Important Assign" },
                  { label: "Applying Company Name", category: "Important Assign" },
                  { label: "Current company Location", category: "Important Assign" },
                  { label: "Communication Rating", category: "Important Assign" },
                  { label: "Candidate Interested", category: "Important Assign" },
            
                  { label: "Calling Feedback", category: "Most Important Assign" },
                  { label: "Interview Feedback", category: "Most Important Assign" },
                  { label: "Candidate Feedback", category: "Most Important Assign" },
                  { label: "Job ID", category: "Most Important Assign" },
                  { label: "Current Company Location", category: "Most Important Assign" },
                ],
                []
              );
 
              const handleOkClick = () => {
           
               
               if(selectedManager.managerId!=""){
                setDropdownOpen(false);
                setShowReport(true);
               }
              
              //  console.log(selectedManager.managerId);
                
               
          
              };
          
          
            const handleSearchChange = useCallback((event) => {
              // const name=event.target.name;
              // const value=event.target.value;
              // console.log(name);
              // console.log(value);
              // setSearchTerm((prev)=>{
              //   return {...prev, [name]:value};
          
              // })
          
               setSearchTerm(event.target.value);
            }, []);
          
            const toggleDropdown = useCallback(() => {
              setDropdownOpen((prev) => !prev);
            }, []);
          
            const handleOptionChange = useCallback((event) => {
              const { value, checked } = event.target;
              setSelectedOptions((prev) =>
                checked ? [...prev, value] : prev.filter((option) => option !== value)
              );
            }, []);
          
            const handleSelectAll = () => {
              if (allSelected) {
                setSelectedOptions([]);
              } else {
                const allRowIds = columnName
                  .filter((cat) => openCategory === cat.columnCategory)
                  .map((item) => item.columnId);
                setSelectedOptions(allRowIds);
              }
              setAllSelected(!allSelected);
            };
          
            const assignOptionsToRecruiters = useCallback(() => {
              const updatedAssignments = { ...assignments };
          
              const recruitersToUpdate =
                selectedRecruiters.length > 0
                  ? selectedRecruiters
                  : selectedTeamLeader
                  ? [selectedTeamLeader]
                  : selectedMainAdmin
                  ? [selectedMainAdmin]
                  : [];
          
              recruitersToUpdate.forEach((recruiter) => {
                if (!updatedAssignments[recruiter]) {
                  updatedAssignments[recruiter] = {
                    "Common Assign": [],
                    "Important Assign": [],
                    "Most Important Assign": [],
                  };
                }
                selectedOptions.forEach((option) => {
                  const category = options.find((opt) => opt.label === option)?.category;
                  if (
                    category &&
                    !updatedAssignments[recruiter][category].includes(option)
                  ) {
                    updatedAssignments[recruiter][category].push(option);
                  }
                });
              });
              setAssignments(updatedAssignments);
                setSelectedMainAdmin(null);
                setSelectedTeamLeader(null);
                setSelectedRecruiters([]);
                setSelectedOptions([]);
                setEditRecruiter(null);
              }, [
                assignments,
                selectedMainAdmin,
                selectedTeamLeader,
                selectedRecruiters,
                selectedOptions,
                options,
              ]);
            
              const filteredRecruiters = useMemo(() => {
                return teamLeaderNames.reduce((acc, leader) => {
                  const leaderNameMatch = leader.teamLeaderName
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase());
                  const recruiters = leader.recruiters || []; // Ensure recruiters is defined
                  const filteredRecruiters = recruiters.filter((recruiter) =>
                    recruiter[1].toLowerCase().includes(searchTerm.toLowerCase())
                  );
            
                  if (leaderNameMatch || filteredRecruiters.length > 0) {
                    acc.push({
                      ...leader,
                      recruiters: leaderNameMatch ? recruiters : filteredRecruiters,
                    });
                  }
            
                  return acc;
                }, []);
              }, [teamLeaderNames, searchTerm]);
          
              const groupedOptions = useMemo(
                () =>
                  options.reduce((grouped, option) => {
                    const category = option.category;
                    if (!grouped[category]) {
                      grouped[category] = [];
                    }
                    grouped[category].push(option);
                    return grouped;
                  }, {}),
                [options]
              );
            
              const toggleCategoryDropdown = (category) => {
                setOpenCategory((prev) => (prev === category ? null : category));
              };
          
                  // const toggleSelectAll = useCallback(() => {
              //   if (allSelected) {
              //     setSelectedRecruiters([]);
              //   } else {
              //     setSelectedRecruiters(filteredRecruiters);
              //   }
              //   setAllSelected((prev) => !prev);
              // }, [allSelected, filteredRecruiters]);
            
              // const handleUpdateClick = (recruiter) => {
              //   setEditRecruiter(recruiter);
              //   setSelectedRecruiters([recruiter]);
              //   setSelectedOptions(
              //     Object.keys(assignments[recruiter] || {}).reduce(
              //       (options, category) => [
              //         ...options,
              //         ...assignments[recruiter][category],
              //       ],
              //       []
              //     )
              //   );
              //   setDropdownOpen(false);
              // };
            
              // const handleRemoveClick = (recruiter) => {
              //   setSelectedRecruiters((prev) => prev.filter((item) => item !== recruiter));
              //   const updatedAssignments = { ...assignments };
              //   delete updatedAssignments[recruiter];
              //   setAssignments(updatedAssignments);
              // };
            
              // function getClassForCategory(category) {
              //   switch (category) {
              //     case "Common Assign":
              //       return "common-assign";
              //     case "Important Assign":
              //       return "important-assign";
              //     case "Most Important Assign":
              //       return "most-important-assign";
              //     default:
              //       return "";
              //   }
              // }
            
          
            return (
              <>
               <div className="report-AppsTL">
                  <div className="reports-selection-containerTL">
                    
                    <div className="report-hierarchy-sectionTL">
          
                      <div className="report-custom-dropdownTL">
                    
                        <div className="reports-Admin-Dropdown" onClick={toggleDropdown}>
                          {selectedRecruiters.length === 0
                            ? "Manager"
                            :"Manager"
                          }
                            {/* : `${selectedRecruiters.length} Recruiter(s) selected`} */}
                          <span
                            className={`dropdown-icon_open ${dropdownOpen ? "open" : ""}`}
                          >
                            &#9660;
                          </span>
                        </div>
                        
                        {dropdownOpen && (
                          <div className="report-dropdown-bodyTL">
                            <input
                              type="text"
                              placeholder="Search..."
                              value={searchTerm}
                              onChange={handleSearchChange}
                              className="search-inputTL"
                            />
                            <div className='team-leadersTL'>
                              {
                                manager.map((id,index)=>(
                                  <div
                                  key={index}
                                   className="team-leader-itemTL checkbox-teamleader-assign radio-teamleader-assign"
          
                                  >
                                <label>
                                  <input
                                    type='radio'
                                    name='manager'
                                    value={id.managerId}
                                    checked={selectedManager.managerId===id.managerId}
                                    onChange={()=>{
                                      setSelectedManager({
                                        managerId:id.managerId,
                                        managerJobRole:id.jobRole,
          
                                      })
                                                                  
                                    }} 
          
                                  />
                                  
                                  {id.managerName}
                                
                                </label>
          
                                {
                                  selectedManager.managerId===id.managerId &&
                                  teamLeaderUnderManager && (
                                    <div className='recruitersTL'>
                                      {
                                        teamLeaderUnderManager.map(
                                          (teamleader,tIndex)=>(
                                            <div>
                                              <label key={tIndex}>
                                                <input
                                                  type='radio'
                                                  name='teamleader'
                                                  value={teamleader.teamLeaderId}
                                                  checked={
                                                    selectedTeamLeader.teamLeaderId===teamleader.teamLeaderId
                                                  }
                                                  onChange={()=>
                                                    setSelectedTeamLeader({
                                                      teamLeaderId:teamleader.teamLeaderId,
                                                      teamLeaderJobRole:teamleader.jobRole
                                                    })
          
                                                  }
                                             
                                                />
          
                                                {teamleader.teamLeaderName}
          
                                              </label>
          
                                              {
                                                selectedTeamLeader.teamLeaderId===teamleader.teamLeaderId &&
                                                recruiterUnderTeamLeaderData && (
                                                  <div className='recruitersTL'>
                                                    {
                                                      recruiterUnderTeamLeaderData.map((recruiter,rIndex)=>(
                                                        <label key={rIndex}>
                                                          <input
                                                          type='radio'
                                                          name='recruiter'
                                                          value={recruiter.employeeId}
                                                          checked={
                                                            selectedRecruiters.recruiterId===recruiter.employeeId}
                                                          onChange={()=>
                                                            setSelectedRecruiters({
                                                              index:1,
                                                              recruiterId:recruiter.employeeId,
                                                              recruiterJobRole:recruiter.jobRole,
                                                            })
                                                          }
                                                            
                                                          />
                                                          {recruiter.employeeName}
                                                         
          
          
                                                        </label>
                                                      ))
                                                    }
                                                    </div>
                                                )
          
                                              }
                                            </div>
                                          )
                                        )
                                      }
          
                                    </div>
          
                                  )
                                }
          
          
                                  </div>
          
                                ))
                              }
          
          
                            </div>
                            
                            <div className="report-buttons-div">
                            <button
                              className="report-category-share-btn"
                              onClick={handleSelectAll}
                            >
                              {allSelected ? "Deselect All" : "Select All"}
                            </button>
          
                            <button className="report-ok-button" onClick={handleOkClick}     
                            >
                              OK
                            </button>
                            
                            <button
                              className="report-reset-selectTL-button"
                              onClick={() => {
                                setSelectedTeamLeader(null);
                                setSelectedRecruiters([]);
                              }}
                            >
                              Reset
                            </button>
                          </div>
                            <div className="team-leadersTL">
                              {filteredRecruiters.map((leader, index) => (
                                <div
                                  key={index}
                                  className="team-leader-itemTL checkbox-teamleader-assign radio-teamleader-assign"
                                >
                                  <label>
                                    <input
                                      type="checkbox"
                                      name="teamLeader"
                                      value={leader.teamLeaderId}
                                      checked={selectedTeamLeader === leader.teamLeaderId}
                                      onChange={() =>
                                        setSelectedTeamLeader(leader.teamLeaderId)
                                      }
                                    />
                                    {leader.teamLeaderName}
                                  </label>
                                  {selectedTeamLeader === leader.teamLeaderId &&
                                    recruiterUnderTeamLeader && (
                                      <div className="recruitersTL">
                                        {recruiterUnderTeamLeader.map(
                                          (recruiter, rIndex) => (
                                            <label key={rIndex}>
                                              <input
                                                type="checkbox"
                                                name="recruiter"
                                                value={recruiter[0]}
                                                checked={selectedRecruiters.includes(
                                                  recruiter[0]
                                                )}
                                                // onChange={() =>
                                                //   setSelectedRecruiters([recruiter[0]])
                                                // }
                                              />
                                              {recruiter[1]}
                                            </label>
                                          )
                                        )}
                                      </div>
                                    )}
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
            
                    <div className="options-section">
          
          
                     
                      {/* <div className="report-DetailsReport-btn">
                        <button
                          onClick={()=>setShowReport(true)}
                          
                          className="report-assign-optionbtn"
                        >
                          {editRecruiter ? "Update Options" : "Details Report"}
          
                        </button>
                      </div> */}
                    </div>
                  </div>
          
                  {showReport &&  (
              <div>
                  <div className="month-report">
                    
                {/* <h2>Report</h2> */}
                    {/* imp data */}
                {/* <h3>{selectedManager.managerId}</h3>
                <h3>{selectedManager.managerJobRole}</h3>
                <h3>{selectedManager.managerName}</h3>
          
                    <h3>{selectedTeamLeader.teamLeaderId}</h3>
                    <h3>{selectedTeamLeader.teamLeaderJobRole}</h3>
          
                <h3>{selectedRecruiters.index}</h3>
                <h3>{selectedRecruiters.recruiterId}</h3>
                <h3>{selectedRecruiters.recruiterJobRole}</h3>
           */}
          
                
                
                <div className="month-selector">
       
          
                {selectedDate && <PDFGenerator selectedDate={selectedDate} />}

                <label>
                    <input
                      type="radio"
                      value="CurrentMonth"
                      id='CurrentMonth'
                      name="reportOption"

                      checked={selectedMonth === 'CurrentMonth'}
                      onChange={handleMonthChange}
                      onClick={handleToggle} 
                   
                    />
                    Current Month
                  </label>
                
                  <label>
                    <input
                      type="radio"
                      value="LastMonth"
                      id='LastMonth'
                      name="reportOption"

                      checked={selectedMonth === 'LastMonth'}
                      onChange={handleMonthChange}
                      onClick={handleToggle} 
                   
                    />
                    Last Month
                  </label>
                  <label>
                    <input
                      type="radio"
                      value="Last3Months"
                      id='Last3Months'
                      name='reportOption'
                      checked={selectedMonth === 'Last3Months'}
                      onChange={handleMonthChange}
                      onClick={handleToggle} 
                    
                    />
                    Last 3 Months
                  </label>
                  <label>
                    <input
                      type="radio"
                      value="Last6Months"
                      name='reportOption'
                      id='Last6Months'
                      checked={selectedMonth === 'Last6Months'}
                      onChange={handleMonthChange}
                      onClick={handleToggle} 
                      
                    />
                    Last 6 Months
                  </label>
          
                  <label>
                    <input
                      type='radio'
                      value="Last1Year"
                      name='reportOption'
                      id='Last1Year'
                      checked={selectedMonth==="Last1Year"}
                      onChange={handleMonthChange}
                      onClick={handleToggle} 
                     
                      />
                      Last 1 Year
                  </label>
                  
          
                <label>
                  <input 
                    type='radio'
                    value="CustomDate"
                    name='reportOption'
                    id='CustomDate'
                    checked={selectedMonth==="CustomDate"}
                    onChange={handleMonthChange}
                     onClick={showCustomDateDiv}
                    />
                    Custom Date
                </label>
                <label>
                  <input 
                    type='radio'
                    value="JoiningDate"
                    name='reportOption'
                    id='JoiningDate'
                    checked={selectedMonth==="JoiningDate"}
                    onChange={handleMonthChange}
                    onClick={handleToggle} 
                    />
                    Joining Date
                </label>
          
                
                </div>
                {
                showCustomDiv && (
                  <div>
                <div className="date-inputs" >
          
                  <label>
                    Start Date:
                    <input type="date" value={startDate} onChange={handleStartDateChange} />
                  </label>
                  <label>
                    End Date:
                    <input type="date" value={endDate} onChange={handleEndDateChange} />
                  </label>
                
                
                <div className='filterDataButton'>
                  <button onClick={handleFilterData}>Filter Data</button>
                  </div>
                </div>
                </div>
                )}
                
              
                
                { (
                    <div className='filterDataButton'>
                    <button className='filterDataButton1' onClick={showDataReport} >Get Report</button>
          
                    </div>
                )}
                </div>

               
          
                     {showReportData ? (
          
          
                      <div>
                        {/* <TabContentReportData/> */}

                        <div>
                          {/* Display data  imp Prachi
                  {
                    reportDataDatewise ?(<pre>{JSON.stringify(reportDataDatewise, null, 2)}</pre>):(<p>No data to display</p>)
                  } */}
                  </div>
                      
                        <CreateReportTable/>
          
                      </div>
          
                  
                ):(<p></p>)} 
              
              </div>
                  )}
                  </div>
              
              </>
          
            );
          };
          
          export default MonthReport;