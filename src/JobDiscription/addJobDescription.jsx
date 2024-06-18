import React, { useState } from 'react';
import "./addJobDescription.css"

const AddJobDescription = () => {
  const [formData, setFormData] = useState({
    companyName: "",
    designation: "",
    position: "",
    qualification: "",
    year_of_passing: "",
    field: "",
    stream: "",
    location: "",
    salary: "",
    job_type: "",
    experience: "",
    bond: "",
    percentage: "",
    skills: "",
    companyLink: "",
    detailAddress: "",
    shift: "",
    weekOff: "",
    noticePeriod: "",
    jobRole: "",
    perks: "",
    incentive: "",
    reportingHierarchy: "",
    gender: "",
    documentation: "",
    ageCriteria: "",
    note: "",
    positionOverview: { overview: "", employeeId: "" },
    responsibilities: [{ employeeId: "", responsibilitiesMsg: "" }],
    jobRequirements: [{ employeeId: "", jobRequirementMsg: "" }],
    preferredQualifications: [{ employeeId: "", preferredQualificationMsg: "" }]
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleInputChange = (e, field, index) => {
    const { name, value } = e.target;
    const newFormData = { ...formData };
    newFormData[field][index][name] = value;
    setFormData(newFormData);
  };

  const handlePositionOverviewChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      positionOverview: {
        ...prevData.positionOverview,
        [name]: value
      }
    }));
  };

  const handleAddMore = (field) => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: [...prevData[field], { employeeId: "", [`${field.slice(0, -1)}Msg`]: "" }]
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://192.168.1.33:8891/api/ats/157industries/add-requirement', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      if (response.ok) {
        const result = await response.json();
        console.log('Success:', result);
        setFormData({
          companyName: "",
          designation: "",
          position: "",
          qualification: "",
          year_of_passing: "",
          field: "",
          stream: "",
          location: "",
          salary: "",
          job_type: "",
          experience: "",
          bond: "",
          percentage: "",
          skills: "",
          companyLink: "",
          detailAddress: "",
          shift: "",
          weekOff: "",
          noticePeriod: "",
          jobRole: "",
          perks: "",
          incentive: "",
          reportingHierarchy: "",
          gender: "",
          documentation: "",
          ageCriteria: "",
          note: "",
          positionOverview: { overview: "", employeeId: "" },
          responsibilities: [{ employeeId: "", responsibilitiesMsg: "" }],
          jobRequirements: [{ employeeId: "", jobRequirementMsg: "" }],
          preferredQualifications: [{ employeeId: "", preferredQualificationMsg: "" }]
        });
      } else {
        console.error('Error:', response.statusText);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <main className="job-desc">
      <section className="job-performance">
        <article><b>ADD JOB DESCRIPTION</b></article>
        <form onSubmit={handleSubmit} className="form-container">
          <div className="field-column">
            <div className="field">
              <label><b>Company Name: </b></label>
              <input type="text" name="companyName" value={formData.companyName} onChange={handleChange} />
            </div>
            <div className="field">
              <label><b>Designation: </b></label>
              <input type="text" name="designation" value={formData.designation} onChange={handleChange} />
            </div>
            <div className="field">
              <label><b>Position: </b></label>
              <input type="text" name="position" value={formData.position} onChange={handleChange} />
            </div>
            <div className="field">
              <label><b>Qualification: </b></label>
              <input type="text" name="qualification" value={formData.qualification} onChange={handleChange} />
            </div>
            <div className="field">
              <label><b>Year of Passing: </b></label>
              <input type="text" name="year_of_passing" value={formData.year_of_passing} onChange={handleChange} />
            </div>
            <div className="field">
              <label><b>Field: </b></label>
              <input type="text" name="field" value={formData.field} onChange={handleChange} />
            </div>
            <div className="field">
              <label><b>Stream: </b></label>
              <input type="text" name="stream" value={formData.stream} onChange={handleChange} />
            </div>
            <div className="field">
              <label><b>Location: </b></label>
              <input type="text" name="location" value={formData.location} onChange={handleChange} />
            </div>
            <div className="field">
              <label><b>Salary: </b></label>
              <input type="text" name="salary" value={formData.salary} onChange={handleChange} />
            </div>
            <div className="field">
              <label><b>Job Type: </b></label>
              <select name="job_type" value={formData.job_type} onChange={handleChange}>
                <option value="">Select Job Type</option>
                <option value="Full-Time">Full-Time</option>
                <option value="Part-Time">Part-Time</option>
                <option value="Contract">Contract</option>
                <option value="Internship">Internship</option>
              </select>
            </div>
            <div className="field">
              <label><b>Experience: </b></label>
              <input type="text" name="experience" value={formData.experience} onChange={handleChange} />
            </div>
            <div className="field">
              <label><b>Bond: </b></label>
              <input type="text" name="bond" value={formData.bond} onChange={handleChange} />
            </div>
            <div className="field">
              <label><b>Percentage: </b></label>
              <input type="text" name="percentage" value={formData.percentage} onChange={handleChange} />
            </div>
            <div className="field">
              <label><b>Skills: </b></label>
              <input type="text" name="skills" value={formData.skills} onChange={handleChange} />
            </div>
            <div className="field">
              <label><b>Company Link: </b></label>
              <input type="text" name="companyLink" value={formData.companyLink} onChange={handleChange} />
            </div>
            <div className="field">
              <label><b>Detailed Address: </b></label>
              <input type="text" name="detailAddress" value={formData.detailAddress} onChange={handleChange} />
            </div>
            <div className="field">
              <label><b>Shift: </b></label>
              <input type="text" name="shift" value={formData.shift} onChange={handleChange} />
            </div>
            <div className="field">
              <label><b>Week Off: </b></label>
              <input type="text" name="weekOff" value={formData.weekOff} onChange={handleChange} />
            </div>
            <div className="field">
              <label><b>Notice Period: </b></label>
              <input type="text" name="noticePeriod" value={formData.noticePeriod} onChange={handleChange} />
            </div>
            <div className="field">
              <label><b>Job Role: </b></label>
              <input type="text" name="jobRole" value={formData.jobRole} onChange={handleChange} />
            </div>
            <div className="field">
              <label><b>Perks: </b></label>
              <input type="text" name="perks" value={formData.perks} onChange={handleChange} />
            </div>
            <div className="field">
              <label><b>Incentive: </b></label>
              <input type="text" name="incentive" value={formData.incentive} onChange={handleChange} />
            </div>
            <div className="field">
              <label><b>Reporting Hierarchy: </b></label>
              <input type="text" name="reportingHierarchy" value={formData.reportingHierarchy} onChange={handleChange} />
            </div>
            <div className="field">
              <label><b>Gender: </b></label>
              <select name="gender" value={formData.gender} onChange={handleChange}>
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
                <option value="Any">Any</option>
              </select>
            </div>
            <div className="field">
              <label><b>Documentation: </b></label>
              <input type="text" name="documentation" value={formData.documentation} onChange={handleChange} />
            </div>
            <div className="field">
              <label><b>Age Criteria: </b></label>
              <input type="text" name="ageCriteria" value={formData.ageCriteria} onChange={handleChange} />
            </div>
            <div className="field">
              <label><b>Note: </b></label>
              <input type="text" name="ageCriteria" value={formData.note} onChange={handleChange} />
            </div>
          </div>


          <div className="position-overview">
            {/* <h3>Position Overview</h3> */}
            <div className="field">
              <label><b>Position Overview: </b></label>
              <textarea name="overview" 
              className='textarea'value={formData.positionOverview.overview} onChange={handlePositionOverviewChange} />
            </div>
          </div>


          <div className="responsibilities">
            {/* <h3>Responsibilities</h3> */}
            {formData.responsibilities.map((item, index) => (
              <div key={index} >
                <div className="field" hidden>
                  <label><b>Employee ID: </b></label>
                  <input
                    type="text"
                    name="employeeId"
                    className=''
                    value={item.employeeId}
                    onChange={(e) => handleInputChange(e, 'responsibilities', index)}
                  />
                </div>
                <div className="field">
                  <label><b>Responsibility Message: </b></label>
                  <textarea
                  className='textarea'
                    name="responsibilitiesMsg"
                    value={item.responsibilitiesMsg}
                    onChange={(e) => handleInputChange(e, 'responsibilities', index)}
                  />
                </div>
              </div>
            ))}
            <button type="button" className='loging-hr mt-3 mb-3' onClick={() => handleAddMore('responsibilities')}>Add More Responsibilities</button>
          </div>


          <div className="job-requirements">
            {/* <h3>Job Requirements</h3> */}
            {formData.jobRequirements.map((item, index) => (
              <div key={index} >
                <div className="field" hidden>
                  <label><b>Employee ID: </b></label>
                  <input
                    type="text"
                    name="employeeId"
                    value={item.employeeId}
                    onChange={(e) => handleInputChange(e, 'jobRequirements', index)}
                  />
                </div>
                <div className="field">
                  <label><b>Job Requirement Message: </b></label>
                  <textarea
                  className='textarea'
                    name="jobRequirementMsg"
                    value={item.jobRequirementMsg}
                    onChange={(e) => handleInputChange(e, 'jobRequirements', index)}
                  />
                </div>
              </div>
            ))}
            <button type="button"className='loging-hr mt-3 mb-3' onClick={() => handleAddMore('jobRequirements')}>Add More Job Requirements</button>
          </div>

          <div className="preferred-qualifications">
            {/* <h3>Preferred Qualifications</h3> */}
            {formData.preferredQualifications.map((item, index) => (
              <div key={index} >
                <div className="field" hidden>
                  <label><b>Employee ID: </b></label>
                  <input
                    type="text"
                    name="employeeId"
                    value={item.employeeId}
                    onChange={(e) => handleInputChange(e, 'preferredQualifications', index)}
                  />
                </div>
                <div className="field">
                  <label><b>Preferred Qualification Message: </b></label>
                  <textarea
                  className='textarea'
                    name="preferredQualificationMsg"
                    value={item.preferredQualificationMsg}
                    onChange={(e) => handleInputChange(e, 'preferredQualifications', index)}
                  />
                </div>
              </div>
            ))}
            <button type="button" className='loging-hr mt-3 mb-3' onClick={() => handleAddMore('preferredQualifications')}>Add More Preferred Qualifications</button>
          </div>

          <div className="submit-button">
            <button className='daily-tr-btn' type="submit">Submit</button>
          </div>
        </form>
      </section>
    </main>
  );
};

export default AddJobDescription;