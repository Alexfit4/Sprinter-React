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
export default function Forms() {

	// const [EmployeeData, setEmpData] = useState({
	// 	first: "",
	// 	last: "",
	// 	title:""
	// })

	const [values, setValues] = useState(initialValues);

	// const[first, setFirst] = useState("")
	// const[last, setLast] = useState()
	// const[title, setTitle] = useState()
	
	const [validated, setValidated] = useState(false);

	// const handleSubmit = (e) => {
	// 	const form = e.currentTarget;
	// 	if (form.checkValidity() === false) {
	// 		e.preventDefault();
	// 		e.stopPropagation();
	// 	}

	// 	setValidated(true);
	// 	axios.post("http://localhost:5000/employee",{
	// 		first:EmployeeData.first,
	// 		last:EmployeeData.last,
	// 		title:EmployeeData.title
	// 	})
	// 	.then(res=>{
	// 		console.log(res.EmployeeData)
	// 	})

	// };

	const handle=(e) => {
		
		
		// const first = e.target.value
		// const last = e.target.value
		// const title = e.target.value
		// console.log(e.target.value)
		// setEmpData({
		// 	first: e.target.first,
		// 	last: e.target.last,
		// 	title: e.target.title
		// })

		// console.log(EmployeeData)
		const { name, value } = e.target;
		setValues({
		  ...values,
		  [name]: value,
		});

		console.log(e.target.value)


		

		// setFirst(first)
		// setLast(last)
		// setTitle(title)
		// var newEmpData = {...EmployeeData};
		// EmployeeData[title] = e.target.value;
		// setEmpData(newEmpData);
		// console.log(EmploreeData)
	
	}
	const submit=(e) => {
		e.preventDefault();
	
		// console.log(e.target.value)
		// console.log(EmployeeData)
		axios.post("http://localhost:5000/employee",{
			first_name:values.first,
			last_name:values.last,
			roleId:values.id
		})
		.then(res=>{
			console.log(res)
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
	// const getRoleList = () => {
	// 	getRoles()
	// 	  .then(res => {
	// 		setRoles(res.data)
	// 		console.log(res.data)
	// 	  })
	// 	  .catch(err => console.log(err));
	//   };

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
