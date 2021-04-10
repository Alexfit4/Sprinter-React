import React from 'react'

function TableRow(props) {
    return (
    <tr>
      <td>{props.FirstName}</td>
      <td>{props.LastName}</td>
      <td>{props.Title}</td>
      <td>{props.Salary}</td>
      <td>{props.Email}</td>
      <td>{props.Project}</td>
    </tr>
    )
}

export default TableRow