import React, { useState, useEffect, Component } from "react";
import { Form, Button, Col, Container, h1, InputGroup, Row } from "react-bootstrap";
import axios from "axios";
import Select from "react-select";

const initialValues = {
    title: "",
    description: "",
    status: "",
};
export default function SprintsForms(props) {

    const [values, setValues] = useState(initialValues);

    const handle = (e) => {

        const { name, value } = e.target;
        setValues({
            ...values,
            [name]: value,
        });

        console.log(e.target.value)

    }
    const submit = (e) => {
        e.preventDefault();

        axios.post("http://localhost:5000/projects", {
            title: values.title,
            description: values.description,
            status: values.status
        })
            .then(res => {
                console.log(res.data.updatedEmpList)
                props.getSprints()
            })
            .catch(err => console.log(err))
        console.log(values)

    }

    const [employee, setEmployee] = useState([]);


    useEffect(() => {
        axios.get('http://localhost:5000/employee')
            .then(res => {
                setEmployee(res.data.map(EmployeeSchema => `${EmployeeSchema.first_name} ${EmployeeSchema.last_name}`)
                )
            })
            .catch((error) => {
                console.log(error);
            })

    }, [])


    const employeeOption = employee.map((selectedOption) => {

        return {
            value: selectedOption,
            label: selectedOption
        }
    })

    const handleChange = selectedOption => {


        console.log(selectedOption);
    };

    return (
        <Col className="mx-auto addemp-form" md={12}>
            <h1>Sprint Form</h1>
            <Form onSubmit={submit}>
                <Form.Group controlId="exampleForm.ControlInput1">
                    <Form.Label>Sprints Name</Form.Label>
                    <Form.Control type="sprints" placeholder="Sprints Name" className="form-control"
                        value={title}
                        onChange={handle} />
                </Form.Group>

                <Form.Group controlId="exampleForm.ControlInput2">
                    <Form.Label>Sprints Details</Form.Label>
                    <Form.Control type="details" placeholder="Sprints Details"
                        className="form-control"
                        value={description}
                        onChange={handle} />
                </Form.Group>




                <Form.Group controlId="exampleForm.ControlSelect1">
                    <Form.Label>Manager</Form.Label>
                    <Form.Control as="select" custom className="form-control"
                        value={manager}
                        onChange={(e) => setManager(e.target.value)}>
                        {employee.map((option) => {
                            return <option
                                // key={option}
                                value={option}>{option}
                            </option>;
                        })}
                    </Form.Control>
                </Form.Group>

                <Form>Employee</Form>
                <div>
                    <Select options={employeeOption} onChange={handleChange} isMulti />
                </div>


                <Form.Group controlId="exampleForm.ControlSelect3">
                    <Form.Label>Status</Form.Label>
                    <Form.Control as="select" custom defaultValue="Open" className="form-control"
                        value={status}
                        onChange={handle}
                    >
                        {status.map((options) => {
                            return (
                                <option>{options}</option>
                            )
                        })}
                    </Form.Control>
                </Form.Group>


                <Button type="submit">Submit form</Button>
            </Form>
        </Col >

    );
}
