import React, { useState, useEffect } from "react";
import PayrollTable from "./payRollTable";
import PayRollForm from "./payRollForm";
import axios from "axios";

const PayRollMain = () => {
  const [employees, setEmployees] = useState([]);
  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const res = await axios.get(
          "http://93.127.199.85:9090/api/ats/157industries/findAll-all-payrolls"
        );
        setEmployees(res.data);
      } catch (error) {
        console.error("Error fetching employees:", error);
      }
    };
    fetchEmployees();
  }, []);

  const addEmployee = (employee) => {
    setEmployees([...employees, employee]);
  };

  return (
    <div className="app">
      <PayRollForm addEmployee={addEmployee} />
      <PayrollTable employees={employees} />
    </div>
  );
};
export default PayRollMain;
