import React, { useState, useEffect } from 'react';
import { Table } from 'react-bootstrap';
import TableRow from '../TableRow';
import axios from "axios";


function TableComponents() {

  function getEmployees() {
    return axios.get("http://localhost:5000/employee")
  }

  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    getAllEmployees();
  }, [])
  const getAllEmployees = () => {
    getEmployees()
      .then(res => {
        setEmployees(res.data)
        console.log(res.data)
      })
      .catch(err => console.log(err));
  };
  return (

    <Table striped bordered hover size="sm">
      <thead>
        <tr>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Title</th>
          <th>Salary</th>
        </tr>
      </thead>
      <tbody>
        {employees.map(emp => {
          return (
            <TableRow
              key={emp._id}
              FirstName={emp.first_name}
              LastName={emp.last_name}
              Title={emp.role.title}
              Salary={emp.role.salary}
              id={emp._id}
              setEmployees={setEmployees}
            />
          );
        })}

      </tbody>
    </Table>

  )
}

export default TableComponents