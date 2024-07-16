import React, { useRef, useState } from 'react';
import { useReactToPrint } from 'react-to-print';
import SalarySlip from './salarySlip.jsx';
import '../PayRoll/payRollTable.css';
import RecruiterBillingForm from './recruiterBillingForm.jsx';
// import { content } from 'html2canvas/dist/types/css/property-descriptors/content.js';

const PayrollTable = ({ employees }) => {
    const slipRefs = useRef({});
    const [showPaySlip, setShowPaySlip]=useState(false)
    const [employeeId,setEmployeId]=useState(null)

    const handlePrint = useReactToPrint({
        content: () => slipRefs.current.currentEmployee,
       
    });
     console.log(handlePrint());
    const handlePaySlip=()=>{
        setShowPaySlip(true)
    }
    const cancel =()=>{
        setShowPaySlip(false)
    }
  
    return (
        <>
        <div className="payroll-table">
            <table className='payroll-table-layout'>
                <thead>
                    <tr className='payroll-table-heading'>
                        <th>Emp ID</th>
                        <th>Name</th>
                        <th>Department</th>
                        <th>Job Role</th>
                        <th>Basic Salary</th>
                        <th>Per Day Salary</th>
                        <th>Days Present</th>
                        <th>Bonuses</th>
                        <th>Deductions</th>
                        <th>Total Salary</th>
                        <th>Action</th>
                        <th>Pay</th>
                    </tr>
                </thead>
                <tbody>
                    {employees.map((employee) => (
                        <React.Fragment key={employee.id}>
                            <tr className='payroll-table-data'>
                                <td>{employee.empId}</td>
                                <td>{employee.empName}</td>
                                <td>{employee.empDept}</td>
                                <td>{employee.jobRole}</td>
                                <td>{employee.basicSalary}</td>
                                <td>{employee.perDaySalary}</td>
                                <td>{employee.daysPresent}</td>
                                <td>{employee.bonuses}</td>
                                <td>{employee.deductions}</td>
                                <td>{employee.totalSalary}</td>
                                <td>
                                    <button
                                        onClick={() => {
                                            slipRefs.current.currentEmployee = slipRefs.current[employee.id];
                                            handlePrint();
                                            // setEmployeId(employee.id)
                                        }}
                                    >
                                        Pay & Print
                                    </button>
                                    <div style={{ display: 'none' }}>
                                        <div ref={(el) => (slipRefs.current[employee.id] = el)}>
                                            <SalarySlip employee={employee} />
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    <button onClick={handlePaySlip}>
                                        Pay
                                    </button>
                                </td>
                            </tr>
                        </React.Fragment>
                    ))}
                </tbody>
            </table>
        </div>
        {showPaySlip && (
        <div className='recruiterBillingForm'>
            <RecruiterBillingForm employees={employees}/>
             <button style={{margin:"auto"}} className='daily-tr-btn' onClick={cancel}>Cancel</button>
        </div>
        )}
       </>
    );
};

export default PayrollTable;
