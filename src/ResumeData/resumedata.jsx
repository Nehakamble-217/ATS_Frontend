
import React from 'react';
import '../ResumeData/resumedata.css'

const TableComponent = () => {
  const data = [
    { id: 1, name: 'John Doejhgfds', contactnumber: 9876543228, alternatenumber: 9123456789, candidateemail: 'john@example.com', dob: '08-10-1999', education: 'MCA', ssc: '60%', hsc: '55%', graduation: '78%', postgraduation: '79%', certification: 'Yes', currentcompany: 'TCS', currentcompanydesignation: 'Java Devloper', currentcompanyjobrole: 'TL', currentcompanystartdate: '21-02-2023', currentcompanyenddate: '28-02-2024', lastcompany: 'wipro', designation: 'Senior Java Devloper', jobrole: 'TL', startdate: '20-03-2021', enddate: '21-02-2023', currentlocation: 'pune', address: 'Hadapsar Pune', gender: 'Male', industry: 'IT' },
    { id: 2, name: 'Jane Smith', contactnumber: 9087654534, alternatenumber: 9123456789, candidateemail: 'jane@example.com', dob: '08-10-1999', education: 'MCA', ssc: '60%', hsc: '55%', graduation: '78%', postgraduation: '79%', certification: 'Yes', currentcompany: 'TCS', currentcompanydesignation: 'Java Devloper', currentcompanyjobrole: 'TL', currentcompanystartdate: '21-02-2023', currentcompanyenddate: '28-02-2024', lastcompany: 'wipro', designation: 'Senior Java Devloper', jobrole: 'TL', startdate: '20-03-2021', enddate: '21-02-2023', currentlocation: 'pune', address: 'Hadapsar Pune', gender: 'Male', industry: 'IT' },
    { id: 3, name: 'Michael Brown', contactnumber: 9878765645, alternatenumber: 9123456789, candidateemail: 'michael@example.com', dob: '08-10-1999', education: 'MCA', ssc: '60%', hsc: '55%', graduation: '78%', postgraduation: '79%', certification: 'Yes', currentcompany: 'TCS', currentcompanydesignation: 'Java Devloper', currentcompanyjobrole: 'TL', currentcompanystartdate: '21-02-2023', currentcompanyenddate: '28-02-2024', lastcompany: 'wipro', designation: 'Senior Java Devloper', jobrole: 'TL', startdate: '20-03-2021', enddate: '21-02-2023', currentlocation: 'pune', address: 'Hadapsar Pune', gender: 'Male', industry: 'IT' },
  ];

  const handleMouseOver = (event) => {
    const tableData = event.currentTarget;
    const tooltip = tableData.querySelector('.tooltip');
    const tooltiptext = tableData.querySelector('.tooltiptext');

    if (tooltip && tooltiptext) {
      const textOverflowing = tableData.offsetWidth < tableData.scrollWidth || tableData.offsetHeight < tableData.scrollHeight;
      if (textOverflowing) {
        const rect = tableData.getBoundingClientRect();
        tooltip.style.top = `${rect.top - 10}px`;
        tooltip.style.left = `${rect.left + rect.width / 100}px`;
        tooltip.style.visibility = 'visible';
      } else {
        tooltip.style.visibility = 'hidden';
      }
    }
  };

  const handleMouseOut = (event) => {
    const tooltip = event.currentTarget.querySelector('.tooltip');
    if (tooltip) {
      tooltip.style.visibility = 'hidden';
    }
  };

  // if (loading) {
  //   return <div>Loading...</div>;
  // }

  // if (error) {
  //   return <div>Error: {error.message}</div>;
  // }

  return (
    <div className="table-container">
      <div className="attendanceTableData">
        <table className="attendance-table">
          <thead>
            <tr className='attendancerows-head'>
              <th className='attendanceheading'>Sr No</th>
              < th className='attendanceheading'>Candidate Name</th>
              <th className='attendanceheading'>Contact Number</th>
              <th className='attendanceheading'>Alternate Number</th>
              <th className='attendanceheading'>Candidate Email</th>
              <th className='attendanceheading'>Date Of Birth</th>
              <th className='attendanceheading'>Education</th>
              <th className='attendanceheading'>10th</th>
              <th className='attendanceheading'>12th</th>
              <th className='attendanceheading'>Graduation</th>
              <th className='attendanceheading'>Post Graduation</th>
              <th className='attendanceheading'>Certification</th>
              <th className='attendanceheading'>Current Company</th>
              <th className='attendanceheading'>Designation</th>
              <th className='attendanceheading'>Job Role</th>
              <th className='attendanceheading'>Start Date </th>
              <th className='attendanceheading'>End Date </th>
              <th className='attendanceheading'>Last Company</th>
              <th className='attendanceheading'>Designation</th>
              <th className='attendanceheading'>Job Role</th>
              <th className='attendanceheading'>Start Date </th>
              <th className='attendanceheading'>End Date </th>
              <th className='attendanceheading'>Current Location</th>
              <th className='attendanceheading'>Address</th>
              <th className='attendanceheading'>Gender</th>
              <th className='attendanceheading'>Industry</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr key={item.id} className='attendancerows'>
                <td className='tabledata' onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>{item.id} <div className="tooltip">
                  <span className="tooltiptext">{item.id}</span>
                </div></td>
                <td className='tabledata' onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>{item.name} <div className="tooltip">
                  <span className="tooltiptext">{item.name}</span>
                </div></td>
                <td className='tabledata' onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>{item.contactnumber} <div className="tooltip">
                  <span className="tooltiptext">{item.contactnumber}</span>
                </div></td>
                <td className='tabledata' onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>{item.alternatenumber} <div className="tooltip">
                  <span className="tooltiptext">{item.alternatenumber}</span>
                </div></td>
                <td className='tabledata' onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>{item.candidateemail}<div className="tooltip">
                  <span className="tooltiptext">{item.candidateemail}</span>
                </div></td>
                <td className='tabledata' onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>{item.dob}<div className="tooltip">
                  <span className="tooltiptext">{item.dob}</span>
                </div></td>
                <td className='tabledata' onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>{item.education}<div className="tooltip">
                  <span className="tooltiptext">{item.education}</span>
                </div></td>
                <td className='tabledata' onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>{item.ssc}<div className="tooltip">
                  <span className="tooltiptext">{item.ssc}</span>
                </div></td>
                <td className='tabledata' onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>{item.hsc}<div className="tooltip">
                  <span className="tooltiptext">{item.hsc}</span>
                </div></td>
                <td className='tabledata' onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>{item.graduation}<div className="tooltip">
                  <span className="tooltiptext">{item.graduation}</span>
                </div></td>
                <td className='tabledata' onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>{item.postgraduation}<div className="tooltip">
                  <span className="tooltiptext">{item.postgraduation}</span>
                </div></td>
                <td className='tabledata' onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>{item.certification}<div className="tooltip">
                  <span className="tooltiptext">{item.certification}</span>
                </div></td>
                <td className='tabledata' onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>{item.currentcompany}<div className="tooltip">
                  <span className="tooltiptext">{item.currentcompany}</span>
                </div></td>
                <td className='tabledata' onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>{item.currentcompanydesignation}<div className="tooltip">
                  <span className="tooltiptext">{item.currentcompanydesignation}</span>
                </div></td>
                <td className='tabledata' onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>{item.currentcompanyjobrole}<div className="tooltip">
                  <span className="tooltiptext">{item.currentcompanyjobrole}</span>
                </div></td>
                <td className='tabledata' onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>{item.currentcompanystartdate}<div className="tooltip">
                  <span className="tooltiptext">{item.currentcompanystartdate}</span>
                </div></td>
                <td className='tabledata' onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>{item.currentcompanyenddate}<div className="tooltip">
                  <span className="tooltiptext">{item.currentcompanyenddate}</span>
                </div></td>
                <td className='tabledata' onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>{item.lastcompany}<div className="tooltip">
                  <span className="tooltiptext">{item.lastcompany}</span>
                </div></td>
                <td className='tabledata' onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>{item.designation}<div className="tooltip">
                  <span className="tooltiptext">{item.designation}</span>
                </div></td>
                <td className='tabledata' onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>{item.jobrole}<div className="tooltip">
                  <span className="tooltiptext">{item.jobrole}</span>
                </div></td>
                <td className='tabledata' onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>{item.startdate}<div className="tooltip">
                  <span className="tooltiptext">{item.startdate}</span>
                </div></td>
                <td className='tabledata' onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>{item.enddate}<div className="tooltip">
                  <span className="tooltiptext">{item.enddate}</span>
                </div></td>
                <td className='tabledata' onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>{item.currentlocation}<div className="tooltip">
                  <span className="tooltiptext">{item.currentlocation}</span>
                </div></td>
                <td className='tabledata' onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>{item.address}<div className="tooltip">
                  <span className="tooltiptext">{item.address}</span>
                </div></td>
                <td className='tabledata' onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>{item.gender}<div className="tooltip">
                  <span className="tooltiptext">{item.gender}</span>
                </div></td>
                <td className='tabledata' onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>{item.industry}<div className="tooltip">
                  <span className="tooltiptext">{item.industry}</span>
                </div></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TableComponent;
