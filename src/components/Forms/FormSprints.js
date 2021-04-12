import React, { useState } from "react";
import { Form, Button, Col, Container, h1, InputGroup, Row } from "react-bootstrap";

export default function SprintsForms(props) {
    const [validated, setValidated] = useState(false);

    const handleSubmit = (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }

        setValidated(true);
    };

    const managers = ['Manager 1', "Manager 2", "Manager 3", "Manager 4"]
    const employees = ['Employee 1', 'Employee 2', "Employee 3", "Employee 4"]
    const status = ['open', 'in progress', "in review", "done"]


    return (
        <Container>
            <Col md="4" className="mx-auto">
                <h1>Sprint Form</h1>
                <Form noValidate validated={validated} onSubmit={handleSubmit}  >

                    <Form.Group controlId="exampleForm.ControlInput1">
                        <Form.Label>Sprints Name</Form.Label>
                        <Form.Control type="sprints" placeholder="Sprints Name" />
                    </Form.Group>
                    <Form.Group controlId="exampleForm.ControlInput2">
                        <Form.Label>Sprints Details</Form.Label>
                        <Form.Control type="details" placeholder="Sprints Details" />
                    </Form.Group>


                    <Form.Group controlId="exampleForm.ControlSelect1">
                        <Form.Label>Manager</Form.Label>
                        <Form.Control as="select" custom>
                            {managers.map((options) => {
                                return (
                                    <option>{options}</option>
                                )
                            })}
                        </Form.Control>
                    </Form.Group>
                    <Form.Group controlId="exampleForm.ControlSelect2">
                        <Form.Label>Employee</Form.Label>
                        <Form.Control as="select" multiple>
                            {employees.map((options) => {
                                return (
                                    <option>{options}</option>
                                )
                            })}
                        </Form.Control>
                    </Form.Group>

                    <Form.Group controlId="exampleForm.ControlSelect3">
                        <Form.Label>Status</Form.Label>
                        <Form.Control as="select" custom defaultValue="Backlog">
                            {status.map((options) => {
                                return (
                                    <option>{options}</option>
                                )
                            })}
                        </Form.Control>
                    </Form.Group>


                    <Button type="submit">Submit form</Button>
                </Form>
            </Col>
        </Container>
    );
}
