/* Mohini_InvoiceTable_WholePage_09/07/2024*/

import React from 'react';
import './invoice.css'; 

const InvoiceTable = () => {
  return (
    <main className="job-desc">
    <section className="job-performance">
      
      <form >
        <div className="job-desc-form">
        <div className="field-column">
          <div className="field-Row-Gray">
            <div className="field">
              <label>Invoice Date</label>
              <input
                type="date"
              />
            </div>
            <div className="field">
              <label>Client Name</label>
              <input
                type="text"
                name="clientName"
               
              
                placeholder="Enter Client Name"
              />
            </div>
          </div>
          <div className="field-Row-white">
            <div className="field">
              <label>Client Address</label>
              <input
                type="text"
                name="client address"
              
               
                placeholder="Client Address"
              />
            </div>
            <div className="field">
              <label>Client GST Number</label>
              <input
                type="text"
                name="client gst number"
               
                placeholder="Client GST Number"
              />
            </div>
          </div>
          <div className="field-Row-Gray">
            <div className="field">
            <label>Company Detail </label>
              <input
                type="text"
                name="company name"
               
                placeholder="Company Name"
              />
              <input
                type="text"
                name="company address"
               
                placeholder="Company Address"
              />
                
             
            </div>
            <div className="field">
            <label>Company  GST NO</label>
            <input
                type="text"
                name="field"
               
                placeholder="Enter  Company GST NO"
              />
               
            </div>
           
          </div>
          <div className="field-Row-white">
            <div className="field">
              <label>HSN Code</label>
              <input
                type="text"
                name="hsn code"
               
                placeholder="Enter HSN Code"
              />
            </div>
            <div className="field">
              <label>SAC Code</label>
              <input
                type="text"
                name="sac"
               
                placeholder="Enter SAC Code"
              />
            </div>
          </div>
          <div className="field-Row-Gray">
            <div className="field">
              <label>Invoice No</label>
              <input
                type="text"
                name="service"
              
                placeholder="Service Type"
              />
               <input
                type="text"
                name="productType"
              
                placeholder="Product Type"
              />
            </div>
            
            <div className="field">
              <label>Candidate Name</label>
              <input
                type="text"
                name="name"
              
                placeholder="Enter Name"
              />
            </div>
          </div>
          <div className="field-Row-white">
            <div className="field">
              <label>Candidate Location</label>
              <input
                type="text"
                name="location"
               
                placeholder="Enter Location"
              />
            </div>
            <div className="field">
              <label>Date of Joining</label>
              <input
                type="date"
                name="date of joining"
               
                // placeholder="Ex. 2 Years or 3 Year"
              />
            </div>
          </div>
          <div className="field-Row-Gray">
            <div className="field">
              <label>Department</label>
              <input
                type="text"
                name="department"
              
                placeholder="Enter Department"
              /><label>Designation</label>
              <input
                type="text"
                name="designation"
              
                placeholder="Enter designation"
              />
            </div>
            <div className="field">
              <label>Salary</label>
              <input
                type="text"
                name="salary"
               
                placeholder="Enter Salary"
              />
            </div>
          </div>
          <div className="field-Row-white">
            <div className="field">
              <label>Annual CTC</label>
              <input
                type="text"
                name="annual ctc"
               
                placeholder="Enter Annual CTC"
              />
            </div>
            <div className="field">
              <label>Billing Rate</label>
              <input
                type="text"
                name="billingRate"
               
                placeholder="Enter Billing Rate"
              />
            </div>
          </div>
          <div className="field-Row-Gray">
            <div className="field">
              <label>Gross Bill Amount</label>
              <input
                type="text"
                name="grossBillAmount"
               
                placeholder="Enter Gross Bill Amount"
              />
            </div>
            <div className="field">
              <label>Total Bill Amount</label>
              <input
                type="text"
                name="totalBillAmount"
               
                placeholder="Enter Total Bill amount"
              />
            </div>
          </div>
          <div className="field-Row-white">
            <div className="field">
              <label>Gross Amount</label>
              <input
                type="text"
                name="noticePeriod"
                
                placeholder="Enter Notice Period"
              />
            </div>
            <div className="field">
          
              <label>CGST</label>
              <input
                type="text"
                name="cgst"
                
              /><label>SGST</label>
              <input
                type="text"
                name=""sgst
                
              /><label>IGST</label>
              <input
                type="text"
                name="igst"
                
              /><label>Total GST </label>
              <input
                type="text"
                name="grandTotal"
                
              /><label>Grand Total</label>
              <input
                type="text"
                name="amountInWord"
                
              />
            </div>
          </div>
          <div className="field-Row-Gray">
            <div className="field">
              <label>Consultant Id</label>
              <input
                type="text"
                name="consultantId"
                
                placeholder="Enter Consultant Id "
              />
            </div>
            <div className="field">
              <label>Grand Total in Words</label>
              <input
                type="text"
                name="grantTotalInWord"
                
                placeholder="Enter Grand total in word"
              />
            </div>
          </div>
          <div className="field-Row-white">
            <div className="field">
              <label>Po No</label>
              <input
                type="text"
                name="poNo"
                
                placeholder="Enter Po No"
                
              />
              <label>GRE No</label>
              <input
                type="text"
                name="greNo"
                
                placeholder="Enter GRE No "
              />
            </div>
            <div className="field">
              <label>Bank Details</label>
              <input
                type="text"
                name="bankName"
                
                placeholder="Bank Name "
              /> <label>AC </label>
              <input
                type="text"
                name="acNo"
                
                placeholder="AC No "
              />
               <label>IFSC</label>
              <input
                type="text"
                name="ifscCode"
                
                placeholder="IFSC Code"
              />
               <label>Branch</label>
              <input
                type="text"
                name="branch"
                
                placeholder="Enter branch"
              />
            </div>
          </div>
          <div className="field-Row-Gray">
            <div className="field">
              <label>Invoice Sent From</label>
              <input
                type="date"
                name="invoiceSentFrom"
                
                placeholder="Enter Invoice Sent From "
              />
               <label>Invoice Sent To</label>
              <input
                type="date"
                name="invoiceSentTo"
                
                placeholder="Enter Invoice Sent To"
              />
            </div>
            <div className="field">
              <label>Attendence duration</label>
              <input
                type="date"
                name="attendenceDuration"
                
                placeholder="Enter Attendence Duration "
              />
              <input
                type="date"
                name="attendenceDuration"
                
                placeholder="Enter Attendence Duration "
              />
            </div>
          </div>
          <div className="field-Row-white">
          <div className="field">
            <label>
             Hard Copy Sent
            </label>
            <label><input type="checkbox" /> Yes</label>
            <label><input type="checkbox" /> No</label>
            
         </div>

            <div className="field">
            <label>Payment Received</label>
              <label><input type="checkbox" /> Yes</label>
            <label><input type="checkbox" /> No</label>
            </div>
            
        </div>
        <div className="field-Row-Gray">
          <div className="field">
            <label>
             TDS
            </label><input
                type="text"
                name="tds"
                
                placeholder="Enter TDS"
              />
            
            
         </div>

            <div className="field">
              <label>Payment Expected</label>
              <input
                type="date"
                name="paymentExpected"
                
                placeholder="Enter Payment Expected "
              />
            
              
            </div>
            
        </div>
        <div className="field-Row-white">
          <div className="field">
            <label>
             Payment Received Amount 
            </label>
            <label><input type="checkbox" /> Yes</label>
            <label><input type="checkbox" /> No</label>
            
         </div>

            <div className="field">
              <label>GST Amount  Received</label>
              <label><input type="checkbox" /> Yes</label>
            <label><input type="checkbox" /> No</label>
            </div>
            
        </div>
        
        <div className="field-Row-Gray">
            <div className="field">
              <label>Discrepancy Amount</label>
              <input
                type="text"
                name="discripancyAmount"
              
               
                placeholder="Discrepancy Amount"
              />
            </div>
            <div className="field">
              <label>Discrepancy Remark</label>
              <input
                type="text"
                name="discrepancyAmount"
               
                placeholder="Discrepancy Remark"
              />
            </div>
          </div>
          <div className="field-Row-white">
          <div className="field">
            <label>
            GST File
            </label>
            <label><input type="checkbox" /> Yes</label>
            <label><input type="checkbox" /> No</label>
            
         </div>

            <div className="field">
              <label>GST Amt Payment</label>
              <label><input type="checkbox" /> Yes</label>
            <label><input type="checkbox" /> No</label>
            </div>
            
        </div>
        <div className="field-Row-Gray">
          <div className="field">
            <label>
           Send to details
            </label>
              <label>Name<input type="text" /></label>
              <label>Designation<input type="text" /></label>
              
         </div>
         <div className="field">
           
         <label>Email<input type="text" /></label>
         <label>Mobile  <input type="text" /></label>
              
         </div>
            
            
        </div>
        <div className="field-Row-white">
          <div className="field">
            <label>
            Client details
            </label>
              <label>Name<input type="text" /></label>
              <label>Designation<input type="text" /></label>
              
         </div>
         <div className="field">
           
         <label>Email<input type="text" /></label>
         <label>Mobile  <input type="text" /></label>
              
         </div>
            
            
        </div>

        

        
       

        
          
     
        </div>
        </div>
        
       
      </form>
    </section>
  </main>
  );
};

export default InvoiceTable;


/* Mohini_InvoiceTable_WholePage_09/07/2024*/