import React, { useState, useEffect } from "react";
import axios from "axios";

export default function PersonList() {
	const [first_name, setFirst_name] = useState("");
	const [last_name, setLast_name] = useState("");

	useEffect(() => {
		axios.get("http://localhost:5000/employee").then((response) => {
			console.log(response);
		});
	}, []);

	const handleFirstName = (event) => {
		setFirst_name( event.target.value);
	};

	const handleLastName = (event) => {
		setLast_name(event.target.value );
	};

	const handleSubmit = (event) => {
		event.preventDefault();
    console.log(first_name);
		const user = {
			first_name: first_name
		};

		axios.post(
			"http://localhost:5000/employee",
			{
				first_name: first_name,
        last_name: last_name
			},
			{
				headers: {
					"Content-type": "application/json; charset=UTF-8",
				},
			}
		);
	};

	return (
		<div>
			<form onSubmit={handleSubmit}>
				<label>
					Person Name:
					<input type="text" name="name" onChange={handleFirstName} />
				</label>
        <label>
					Person Name:
					<input type="text" name="name" onChange={handleLastName} />
				</label>
				<button type="submit">Add</button>
			</form>
		</div>
	);
}
