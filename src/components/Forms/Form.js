import React, { useState } from "react";
import { Form, Button, Col, InputGroup, Row } from "react-bootstrap";

export default function Forms(props) {
	const [validated, setValidated] = useState(false);

	const handleSubmit = (event) => {
		const form = event.currentTarget;
		if (form.checkValidity() === false) {
			event.preventDefault();
			event.stopPropagation();
		}

		setValidated(true);
	};

	const roles = ['Software Engineer', "Sales Person"]
	const projects = ['Tincat', 'Facebook']

	return (
		<Form noValidate validated={validated} onSubmit={handleSubmit}>
			<Form.Row>
				<Form.Group as={Col} md="4" controlId="validationCustom01">
					<Form.Label>{props.first}</Form.Label>
					<Form.Control
						required
						type="text"
						placeholder="First name"
						defaultValue="Mark"
					/>
					<Form.Control.Feedback>Looks good!</Form.Control.Feedback>
				</Form.Group>
				<Form.Group as={Col} md="4" controlId="validationCustom02">
					<Form.Label>{props.last}</Form.Label>
					<Form.Control
						required
						type="text"
						placeholder="Last name"
						defaultValue="Otto"
					/>
					<Form.Control.Feedback>Looks good!</Form.Control.Feedback>
				</Form.Group>
				<Form.Group as={Row} controlId="formHorizontalEmail">
					<Form.Label column md={4}>
						{props.role}
					</Form.Label>
					<Col md={10}>
						<Form.Control as="select" custom>
							{roles.map((options) => {
								return (
									<option>{options}</option>
								)
							})}
						</Form.Control>
					</Col>
				</Form.Group>
				<Form.Group as={Row} controlId="formHorizontalEmail">
					<Form.Label column md={4}>
						{props.project}
					</Form.Label>
					<Col sm={10}>
						<Form.Control as="select" custom>
							{projects.map((options) => {
								return (
									<option>{options}</option>
								)
							})}
						</Form.Control>
					</Col>
				</Form.Group>
			</Form.Row>
			<Form.Group as={Row} controlId="formHorizontalEmail">
				<Form.Label column md={4}>
					{props.email}
				</Form.Label>
				<Col sm={10}>
					<Form.Control type="email" placeholder="Email" />
				</Col>
			</Form.Group>

			<Form.Group as={Row} controlId="formHorizontalPassword">
				<Form.Label column md={4}>
					{props.password}
				</Form.Label>
				<Col sm={10}>
					<Form.Control type="password" placeholder="Password" />
				</Col>
			</Form.Group>
			<Button type="submit">Submit form</Button>
		</Form>
	);
}
