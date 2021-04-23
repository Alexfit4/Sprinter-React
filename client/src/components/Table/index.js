import React, { useState, useEffect } from 'react';
import { Table } from 'react-bootstrap';
import TableRow from '../TableRow';
import axios from "axios";
import "../../App.css"


function TableComponents(props) {

  function getEmployees() {
    return axios.get("http://localhost:5000/employee")
  }

  useEffect(() => {
    getAllEmployees();
  }, [])
  const getAllEmployees = () => {
    getEmployees()
      .then(res => {
        props.setEmployees(res.data)
        console.log(res.data)
      })
      .catch(err => console.log(err));
  };
  return (

    <Table striped bordered hover size="sm" className="EmpTable">
      <thead>
        <tr>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Title</th>
          <th>Salary</th>
        </tr>
      </thead>
      <tbody>
        {props.employees.map(emp => {
          return (
            <TableRow
              key={emp._id}
              FirstName={emp.first_name}
              LastName={emp.last_name}
              Title={emp.role.title}
              Salary={emp.role.salary}
              id={emp._id}
              setEmployees={props.setEmployees}
            />
          );
        })}

      </tbody>
    </Table>

  )
}

export default TableComponents