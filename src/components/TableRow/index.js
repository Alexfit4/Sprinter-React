import React from 'react'
import {RiDeleteBinLine} from "react-icons/ri"
import "../../App.css"

function TableRow(props) {
    return (
    <tr>
      <td>{props.FirstName}</td>
      <td>{props.LastName}</td>
      <td>{props.Title}</td>
      <td>{props.Salary}
      <RiDeleteBinLine className="delete-icon"/></td>
    </tr>
    )
}

export default TableRow