import React from 'react';
import { Table} from 'react-bootstrap';
import TableRow from '../TableRow';

function TableComponents() {
    return (

        <Table striped bordered hover size="sm">
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Title</th>
            <th>Salary</th>
            <th>Email</th>
            <th>Project</th>
          </tr>
        </thead>
        <tbody>
   <TableRow 
     FirstName = "Mengyue"
     LastName = "Zhang"
     Title = "Assistant"
     Salary ="500000"
     Email = "mengyue@gmail.com"
     Project = "Tincat"
   />
  </tbody>
      </Table>
    
    )
}

export default TableComponents