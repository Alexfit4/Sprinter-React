import React, { useState, useEffect} from "react";
import { Form, Button, Col, InputGroup, Row } from "react-bootstrap";
import "../../App.css";
import axios from "axios";
import Employee from "../Employees/Employee";
import { RiContactsBookUploadLine } from "react-icons/ri";

const initialValues = {
	first: "",
	last: "",
	id: "",
  };
export default function Forms(props) {

	const [values, setValues] = useState(initialValues);

	const [validated, setValidated] = useState(false);

	const handle=(e) => {
		
		const { name, value } = e.target;
		setValues({
		  ...values,
		  [name]: value,
		});

		console.log(e.target.value)
	
	}
	const submit=(e) => {
		e.preventDefault();

		axios.post("http://localhost:5000/employee",{
			first_name:values.first,
			last_name:values.last,
			roleId:values.id
		})
		.then(res=>{
			console.log(res.data.updatedEmpList)
			props.setEmployees(res.data.updatedEmpList)
		})
		.catch(err=>console.log(err))
		console.log(values)

	}
	
	const [roles, setRoles] = useState([]);
	
	  useEffect(() => {
		axios.get("http://localhost:5000/roles")
		.then((res => {
			console.log(res.data)
			setRoles(res.data)
		})) 
	  }, [])

	return (
		<Col className="mx-auto addemp-form" md={12}>
		<h3>Add Employees</h3>
		<Form noValidate validated={validated} onSubmit={submit}>
			<Form.Group>
				<Form.Label>First Name</Form.Label>
				<Form.Control required type="text" id = "first" name="first" placeholder="First Name"  onChange={handle}/>
				<Form.Text className="text-muted">
				</Form.Text>
			</Form.Group>

			<Form.Group >
				<Form.Label>Last Name</Form.Label>
				<Form.Control required type="text" id = "last" name="last" placeholder="Last Name" onChange={handle}  />
				<Form.Text className="text-muted">
				</Form.Text>
			</Form.Group>
			<Form.Group>
				<Form.Label>Select Title</Form.Label>
				<Form.Control required as="select" id = "title" onChange={handle} name="id">
					{roles.map((role) => {
						
						return (
							<option value={role.id}  key={role.id}>{role.title}</option>
						)
					})}
				</Form.Control>
			</Form.Group>
			<Button variant="primary" type="submit">
				Submit</Button>
		</Form>
		</Col>

	);
}
