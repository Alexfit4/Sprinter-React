import React, { useState, useEffect, Component } from "react";
import { Form, Button, Col, Container, h1, InputGroup, Row } from "react-bootstrap";
import axios from "axios";

export default class SprintsForms extends Component {

    constructor(props) {
        super(props);

        this.onChangeTitle = this.onChangeTitle.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onChangeStartDate = this.onChangeStartDate.bind(this);
        this.onChangeManager = this.onChangeManager.bind(this);
        this.onChangeEmployee = this.onChangeEmployee.bind(this);
        this.onChangeStatus = this.onChangeStatus.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            title: '',
            description: '',
            startDate: new Date(),
            manager: [],
            employee: [],
            status: '',
        }
    }

    // const[validated, setValidated] = useState(false);

    // const handleSubmit = (event) => {
    //     const form = event.currentTarget;
    //     if (form.checkValidity() === false) {
    //         event.preventDefault();
    //         event.stopPropagation();
    //     }

    //     setValidated(true);
    // };


    employees = ['Employee 1', 'Employee 2', "Employee 3", "Employee 4"]
    managers = ['manager 1', 'manager 2', "manager 3", "manager 4"]

    componentDidMount() {
        axios.get('http://localhost:5000/projects')
            .then(response => {
                if (response.data.length > 0) {
                    this.setState({
                        users: response.data.map(user => user.username),
                        username: response.data[0].username
                    })
                }
            })
            .catch((error) => {
                console.log(error);
            })

    }


    status = ['open', 'in progress', "in review", "done"]

    onChangeTitle(e) {
        this.setState({
            title: e.target.value
        })
    }

    onChangeDescription(e) {
        this.setState({
            description: e.target.value
        })
    }

    onChangeStartDate(date) {
        this.setState({
            startDate: date
        })
    }

    onChangeManager(e) {
        this.setState({
            manager: e.target.value
        })
    }

    onChangeEmployee(e) {
        this.setState({
            employee: e.target.value
        })
    }

    onChangeStatus(e) {
        this.setState({
            status: e.target.value
        })
    }

    onSubmit(e) {
        e.preventDefault();

        const project = {
            title: this.state.title,
            description: this.state.description,
            manager: this.state.manager,
            employee: this.state.employee,
            startDate: this.state.startDate,
            status: this.state.status
        }

        console.log(project);

        axios.post('http://localhost:5000/projects', project)
            .then(res => this.props.getSprints());

        window.location = '/sprints';
    }




    render() {
        return (
            <Container>
                <Col md="4" className="mx-auto">
                    <h1>Sprint Form</h1>
                    <Form onSubmit={this.onSubmit}  >

                        <Form.Group controlId="exampleForm.ControlInput1">
                            <Form.Label>Sprints Name</Form.Label>
                            <Form.Control type="sprints" placeholder="Sprints Name" className="form-control"
                                value={this.state.title}
                                onChange={this.onChangeTitle} />
                        </Form.Group>
                        <Form.Group controlId="exampleForm.ControlInput2">
                            <Form.Label>Sprints Details</Form.Label>
                            <Form.Control type="details" placeholder="Sprints Details"
                                className="form-control"
                                value={this.state.description}
                                onChange={this.onChangeDescription} />
                        </Form.Group>


                        <Form.Group controlId="exampleForm.ControlSelect1">
                            <Form.Label>Manager</Form.Label>
                            <Form.Control as="select" custom className="form-control"
                                value={this.state.manager}
                                onChange={this.onChangeManager}>
                                {this.managers.map((options) => {
                                    return (
                                        <option>{options}</option>
                                    )
                                })}
                            </Form.Control>




                        </Form.Group>
                        <Form.Group controlId="exampleForm.ControlSelect2">
                            <Form.Label>Employee</Form.Label>
                            <Form.Control as="select" multiple className="form-control"
                                value={this.state.employee}
                                onChange={this.onChangeEmployee}>
                                {this.employees.map((options) => {
                                    return (
                                        <option>{options}</option>
                                    )
                                })}
                            </Form.Control>
                        </Form.Group>

                        <Form.Group controlId="exampleForm.ControlSelect3">
                            <Form.Label>Status</Form.Label>
                            <Form.Control as="select" custom defaultValue="Open" className="form-control"
                                value={this.state.status}
                                onChange={this.onChangeStatus}>
                                {this.status.map((options) => {
                                    return (
                                        <option>{options}</option>
                                    )
                                })}
                            </Form.Control>
                        </Form.Group>


                        <Button type="submit">Submit form</Button>
                    </Form>
                </Col>
            </Container >
        );
    }
}
