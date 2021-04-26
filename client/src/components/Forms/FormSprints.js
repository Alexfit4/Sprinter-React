import React, { useState, useEffect, Component } from "react";
import Item from "../Item/Item";
import { Form, Button, Col, Container, h1, InputGroup, Row } from "react-bootstrap";
import axios from "axios";
import Select from "react-select";
import DatePicker from 'react-date-picker';
import Moment from 'moment';
import "../../App.css"
const SprintsForms = (props) => {

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [startDate, setstartDate] = useState(new Date());
    const [manager, setManager] = useState([]);
    const [employee, setEmployee] = useState([]);
    const [endDate, setendDate] = useState(new Date());
    const [multiOption, setMultiOption] = useState([]);
    const [status, setStatus] = useState([]);
    const [newEmployee, setNewEmployee] = useState([])
    const [noemployee, setNoEmployee] = useState([]);
    const [validated, setValidated] = useState(false);

    useEffect(() => {
        axios.get('https://sprinter-v2.herokuapp.com/employee')
            .then(res => {

                setNoEmployee(
                    res.data
                        .filter((i) => !i.role.title.includes(("Lead"))
                        )
                        .map(EmployeeSchema => `${EmployeeSchema.first_name} ${EmployeeSchema.last_name}`)
                )

            })
            .catch((error) => {
                console.log(error);
            })

    }, [])

    useEffect(() => {
        axios.get('https://sprinter-v2.herokuapp.com/employee')
            .then(res => {

                setEmployee(
                    res.data
                        .filter((i) => i.role.title.includes(("Lead"))
                        )
                        .map(EmployeeSchema => `${EmployeeSchema.first_name} ${EmployeeSchema.last_name}`)
                )

            })
            .catch((error) => {
                console.log(error);
            })

    }, [])


    const onSubmit = (e) => {
        e.preventDefault();
        const form = e.currentTarget;
        if (form.checkValidity() === false) {
            e.preventDefault();
            e.stopPropagation();
        }

        setValidated(true);
        let project = {
            title: title,
            description: description,
            manager: manager,
            employee: newEmployee,
            startDate: Moment(startDate).format("L"),
            endDate: Moment(endDate).format("L"),
            status: status,

        };

        axios.post('https://sprinter-v2.herokuapp.com/projects', project)
            .then(res => props.getSprints())
        // window.location.href = "/sprints"
    }


    const employeeOption = noemployee.map((allOptions) => {

        return {
            value: allOptions,
            label: allOptions
        }
    })

    const handleChange = selectedOption => {
        let array = [];
        selectedOption.map((data) => {

            array.push(data.value);
            setNewEmployee(array);
        })


    };

    const formatDate = (date) => {
        const newDate = Moment(date).format("l")
        console.log(newDate)
    }

    return (
        <Container>
            <Col md="4" className="mx-auto">
                <Form noValidate validated={validated} onSubmit={onSubmit} className="sprintForm" >
                    <h4 className="sprintTitle">Sprint Form</h4>
                    <Form.Group controlId="exampleForm.ControlInput1">
                        <Form.Label>Sprints Name</Form.Label>
                        <Form.Control type="sprints" placeholder="Sprints Name" className="form-control"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)} />
                    </Form.Group>
                    <Form.Group controlId="exampleForm.ControlInput2">
                        <Form.Label>Sprints Details</Form.Label>
                        <Form.Control type="details" placeholder="Sprints Details"
                            className="form-control"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)} />
                    </Form.Group>


                    <Form.Group controlId="exampleForm.ControlSelect1">
                        <Form.Label>Manager</Form.Label>
                        <Form.Control as="select" custom className="form-control"
                            value={manager}
                            onChange={(e) => setManager(e.target.value)}>
                            {employee.map((option) => {
                                return <option
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
                        <Form.Control as="select" custom defaultValue="select" className="form-control"
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                        >
                            <option></option>
                            <option>open</option>
                            <option>in progress</option>
                            <option>in review</option>
                            <option>done</option>

                        </Form.Control>
                    </Form.Group>

                    <Form.Group controlId="exampleForm.ControlSelect3">
                        <Form.Label>Start Date</Form.Label>
                        <div>
                            <DatePicker dateFormat="MM-DD-YYYY"
                                onChange={date => setstartDate(date)}
                                value={startDate}
                            />
                        </div>
                    </Form.Group>

                    <Form.Group controlId="exampleForm.ControlSelect3">
                        <Form.Label>End Date</Form.Label>
                        <div>
                            <DatePicker dateFormat="MM-DD-YYYY"
                                onChange={date => setendDate(date)}
                                value={endDate}
                            />
                        </div>
                    </Form.Group>

                    <Button className="sprintBtn" type="submit">Add Sprint</Button>
                </Form>
            </Col>
        </Container >
    );

}


export default SprintsForms;
