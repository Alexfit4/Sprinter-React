import React from 'react'
import { RiDeleteBinLine } from "react-icons/ri"
import "../../App.css"
import axios from "axios";


function TableRow(props) {
  function deleteEmp(empId) {
    return axios.delete(`http://localhost:5000/employee/${empId}`)
  }

  async function handleClick(e) {
    var empId = e.target.getAttribute("value")
    console.log(empId)
    const response = await deleteEmp(empId)
    console.log(response)
    props.setEmployees(response.data.updatedEmpList)
  }

  const styleDeleteButton = {
    position: "relative",
    top: "-20",
    left: "100",
    // display: "inline"
  };
  return (
    <tr>
      <td>{props.FirstName}</td>
      <td>{props.LastName}</td>
      <td>{props.Title}</td>
      <td>{props.Salary}
        <RiDeleteBinLine className="delete-icon" value={props.id} onClick={handleClick} style={styleDeleteButton} /></td>
    </tr>
  )
}

export default TableRow