
import React from 'react';
import '../ResumeData/resumedata.css'

const TableComponent = () => {
  const data = [
    { id: 1, name: 'John Doe', contactnumber: 9876543228, alternatenumber: 9123456789, candidateemail: 'john@example.com', dob: '08-10-1999', education: 'MCA', ssc:'60%',hsc:'55%', graduation:'78%' , postgraduation:'79%', certification:'Yes' , currentcompany:'TCS',currentcompanydesignation:'Java Devloper', currentcompanyjobrole:'TL', currentcompanystartdate:'21-02-2023',currentcompanyenddate:'28-02-2024',lastcompany:'wipro',designation:'Senior Java Devloper',jobrole:'TL', startdate:'20-03-2021', enddate:'21-02-2023', currentlocation:'pune', address:'Hadapsar Pune', gender:'Male', industry:'IT' },
    { id: 2, name: 'Jane Smith', contactnumber: 9087654534, alternatenumber: 9123456789, candidateemail: 'jane@example.com', dob: '08-10-1999', education: 'MCA', ssc:'60%',hsc:'55%', graduation:'78%'  , postgraduation:'79%', certification:'Yes', currentcompany:'TCS',currentcompanydesignation:'Java Devloper', currentcompanyjobrole:'TL', currentcompanystartdate:'21-02-2023',currentcompanyenddate:'28-02-2024',lastcompany:'wipro',designation:'Senior Java Devloper', jobrole:'TL', startdate:'20-03-2021', enddate:'21-02-2023', currentlocation:'pune', address:'Hadapsar Pune', gender:'Male', industry:'IT'},
    { id: 3, name: 'Michael Brown', contactnumber: 9878765645,alternatenumber: 9123456789,  candidateemail: 'michael@example.com', dob: '08-10-1999', education: 'MCA', ssc:'60%' ,hsc:'55%', graduation:'78%' , postgraduation:'79%', certification:'Yes', currentcompany:'TCS',currentcompanydesignation:'Java Devloper', currentcompanyjobrole:'TL', currentcompanystartdate:'21-02-2023',currentcompanyenddate:'28-02-2024',lastcompany:'wipro',designation:'Senior Java Devloper',jobrole:'TL', startdate:'20-03-2021', enddate:'21-02-2023', currentlocation:'pune', address:'Hadapsar Pune', gender:'Male', industry:'IT' },
  ];

  return (
    <div className="table-container">
      <table className="custom-table">
        <thead>
          <tr>
            <th>Sr No</th>
            <th>Candidate Name</th>
            <th>Contact Number</th>
            <th>Alternate Number</th>
                   
                   <th >Candidate Email</th>
                   <th >DateOfBirth</th>
                  
                   <th >Education</th>
                   <th >10th</th>
                   <th >12th</th>
                   <th >Graduation</th>
                   <th >Post Graduation</th>
                   <th >Certification</th>
                   <th >Current Company</th>
                   <th >Designation</th>
                   <th >Job Role</th>
                   <th >StartDate </th>
                   <th >EndDate </th>
                   <th >Last Company</th>
                   <th >Designation</th>
                   <th >Job Role</th>
                   <th >StartDate </th>
                   <th >EndDate </th>
                   <th >Current Location</th>
                   <th >Address</th>
                   <th >Gender</th>
                   <th >Industry</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.name}</td>
              <td>{item.contactnumber}</td>
              <td>{item.alternatenumber}</td>
              <td>{item.candidateemail}</td>
              <td>{item.dob}</td>
              <td>{item.education}</td>
              <td>{item.ssc}</td>
              <td>{item.hsc}</td>
              <td>{item.graduation}</td>
              <td>{item.postgraduation}</td>
              <td>{item.certification}</td>
              <td>{item.currentcompany}</td>
              <td>{item.currentcompanydesignation}</td>
              <td>{item.currentcompanyjobrole}</td>
              <td>{item.currentcompanystartdate}</td>
              <td>{item.currentcompanyenddate}</td>
              <td>{item.lastcompany}</td>
              <td>{item.designation}</td>
              <td>{item.jobrole}</td>
              <td>{item.startdate}</td>
              <td>{item.enddate}</td>
              <td>{item.currentlocation}</td>
              <td>{item.address}</td>
              <td>{item.gender}</td>
              <td>{item.industry}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableComponent;
