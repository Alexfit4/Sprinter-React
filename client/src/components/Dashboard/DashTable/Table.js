import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import axios from "axios";


export default function DashBoardTable() {
	const [Results, setResults] = useState([]);
	useEffect(() => {
		axios.get("http://localhost:5000/projects").then((data) => {
			
			setResults(data.data);
		});
	}, []);

    const newDate = (date) => {
		let x = new Date(date);

		return x.toLocaleDateString();
	};

    

    var ID = function () {
        // Math.random should be unique because of its seeding algorithm.
        // Convert it to base 36 (numbers + letters), and grab the first 9 characters
        // after the decimal.
        return '_' + Math.random().toString(36).substr(2, 4);
      };
      

	return (
		<div>
			<Table striped bordered hover>
				<thead>
					<tr>
						<th>ID</th>
						<th>Summary</th>
						<th>Employees</th>
						<th>Timeline</th>
					</tr>
				</thead>
				
					<tbody>
                    {Results.map((projects, index) => (
						<tr>
							<td>{ID()}</td>
							<td>{projects.description}</td>
							<td>{projects.employee[0]}</td>
							<td>{newDate(projects.startDate)}</td>							
						</tr>
                    ))}
					</tbody>;
				
			</Table>
		</div>
	);
}
