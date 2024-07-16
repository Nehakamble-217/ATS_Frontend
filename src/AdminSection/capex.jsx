
import React, { useState } from 'react';
import '../AdminSection/capex.css';

function App() {
  const [showForm, setShowForm] = useState('');
  const [formData, setFormData] = useState({
    opratingUnit: '',
    equipment: '',
    wifi: '',
    lightbill: '',
    salesTax: '',
    officerent: '',
    maintenance: '',
    select: '',
    salary:'',
    startDate: '',
    endDate: ''
  });
  const [reportData, setReportData] = useState(null);

  const handleButtonClick = (formType) => {
    setShowForm(formType);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleReportClick = (e) => {
    e.preventDefault();
    const total = Object.values(formData).reduce((acc, val) => {
      const number = parseFloat(val) || 0;
      return acc + number;
    }, 0);
    setReportData({
      ...formData,
      total
    });
  };

  return (
    <div className="App">
      <div className='capex-main-heading'>
        <h1>Capex</h1>
      </div>
      
      <div className="capex-button-container">
        <button className="capex-my-button" onClick={() => handleButtonClick('capex')}>Capex</button>
        <button className="capex-my-button" onClick={() => handleButtonClick('opex')}>Opex</button>
        <button className="capex-my-button">Billing</button>
      </div>
      {showForm === 'capex' && (
        <div className="capex-form-container">
          <div className="capex-form">
            <div className='capexForm-heading'>
              <h2>Capex Form</h2>
            </div>
            <div className='capex-from-div'>
              <form>
                <div className="form-group">
                  <label htmlFor="opratingUnit">Operating Unit:</label>
                  <input type="text" id="opratingUnit" name="opratingUnit" value={formData.opratingUnit} onChange={handleInputChange} />
                </div>
                <div className="form-group">
                  <label htmlFor="equipment">Equipment:</label>
                  <input type="text" id="equipment" name="equipment" value={formData.equipment} onChange={handleInputChange} />
                </div>
                <div className="form-group">
                  <label htmlFor="wifi">WiFi Recharge:</label>
                  <input type="text" id="wifi" name="wifi" value={formData.wifi} onChange={handleInputChange} />
                </div>
                <div className="form-group">
                  <label htmlFor="lightbill">Light Bill:</label>
                  <input type="text" id="lightbill" name="lightbill" value={formData.lightbill} onChange={handleInputChange} />
                </div>
                <div className="form-group">
                  <label htmlFor="salesTax">Sales Tax:</label>
                  <input type="text" id="salesTax" name="salesTax" value={formData.salesTax} onChange={handleInputChange} />
                </div>
                <div className="form-group">
                  <label htmlFor="officerent">Office Rent:</label>
                  <input type="text" id="officerent" name="officerent" value={formData.officerent} onChange={handleInputChange} />
                </div>
                <div className="form-group">
                  <label htmlFor="maintenance">Maintenance:</label>
                  <input type="text" id="maintenance" name="maintenance" value={formData.maintenance} onChange={handleInputChange} />
                </div>
                <div className="form-group">
                  <label htmlFor="select">Select:</label>
                  <select id="select" name="select" value={formData.select} onChange={handleInputChange}>
                    <option value="Admin">Admin</option>
                    <option value="Manager">Manager</option>
                    <option value="TL">TL</option>
                    <option value="Recruiters">Recruiters</option>
                  </select>
                </div>
                <div className='form-group'>
                  <label htmlFor="salary">Salary:</label>
                  <input type="text" id='salary' name='salary'  value={formData.salary} onChange={handleInputChange} />

                </div>
                <div className="form-group">
                  <label htmlFor="startDate">Start Date:</label>
                  <input type="date" id="startDate" name="startDate" value={formData.startDate} onChange={handleInputChange} />
                </div>
                <div className="form-group">
                  <label htmlFor="endDate">End Date:</label>
                  <input type="date" id="endDate" name="endDate" value={formData.endDate} onChange={handleInputChange} />
                </div>
                <div className='copex-sub-btn'>
                  <button type="submit">Save</button>
                  <button type="button" onClick={handleReportClick}>Report</button>
                </div>
              </form>
            </div>
          </div>
          {reportData && (
            <div >
              <div>
              <h2>Report</h2>
              </div>
              <div className="capex-report">
              <p><strong>Operating Unit:</strong> {reportData.opratingUnit}</p>
              <p><strong>Equipment:</strong> {reportData.equipment}</p>
              <p><strong>WiFi Recharge:</strong> {reportData.wifi}</p>
              <p><strong>Light Bill:</strong> {reportData.lightbill}</p>
              <p><strong>Sales Tax:</strong> {reportData.salesTax}</p>
              <p><strong>Office Rent:</strong> {reportData.officerent}</p>
              <p><strong>Maintenance:</strong> {reportData.maintenance}</p>
              <p><strong>Select:</strong> {reportData.select}</p>
              <p><strong>Salary:</strong>{reportData.salary}</p>
              <p><strong>Start Date:</strong> {reportData.startDate}</p>
              <p><strong>End Date:</strong> {reportData.endDate}</p>
              <p><strong>Total:</strong> {reportData.total}</p>
            </div>
            </div>
          )}
        </div>
      )}
      {showForm === 'opex' && (
        <div className="opex-form">
          <div className='opexForm-heading'>
            <h2>Opex Form</h2>
          </div>
          <div className='opex-form-div'>
          <form>
            <div className="form-group">
              <label htmlFor="opex-cost1">Opex Cost 1:</label>
              <input type="text" id="opex-cost1" name="opex-cost1" />
            </div>
            <div className="form-group">
              <label htmlFor="opex-cost2">Opex Cost 2:</label>
              <input type="text" id="opex-cost2" name="opex-cost2" />
            </div>
            <div className="form-group">
              <label htmlFor="opex-cost3">Opex Cost 3:</label>
              <input type="text" id="opex-cost3" name="opex-cost3" />
            </div>
            <div className='opex-sub-btn'>
              <button type="submit">Save</button>
              <button type="submit">Report</button>
            </div>
          </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
