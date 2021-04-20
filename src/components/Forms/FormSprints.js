import React, { useState, useEffect, Component } from "react";
import { Form, Button, Col, Container, h1, InputGroup, Row } from "react-bootstrap";
import axios from "axios";
import Select from "react-select";

const SprintsForms = (props) => {



    // export default class SprintsForms extends Component {

    // this.onChangeTitle = this.onChangeTitle.bind(this);
    // this.onChangeDescription = this.onChangeDescription.bind(this);
    // this.onChangeStartDate = this.onChangeStartDate.bind(this);
    // this.onChangeManager = this.onChangeManager.bind(this);
    // this.onChangeEmployee = this.onChangeEmployee.bind(this);
    // this.onChangeStatus = this.onChangeStatus.bind(this);
    // this.onSubmit = this.onSubmit.bind(this);

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [startDate, setstartDate] = useState(new Date());
    const [manager, setManager] = useState([]);
    const [employee, setEmployee] = useState([]);
    const [status, setStatus] = useState(['open', 'in progress', "in review", "done"]);
    const [employeeData, setEmployeeData] = useState([]);
    // const [selectedEmployee, setSelectedEmployee] = useState("none");

    // const handleTypeSelect = e => {
    //     setSelectedEmployee(e.value);
    // };


    // const status = ['open', 'in progress', "in review", "done"]



    // const employeeList = () => {
    //     axios.get('http://localhost:5000/employee')
    //         .then(response => {
    //             if (response.data.length > 0) {
    //                 this.setState({
    //                     employee: response.data.map(EmployeeSchema => `${EmployeeSchema.first_name} ${EmployeeSchema.last_name}`),


    //                 })
    //             }
    //         })
    //         .catch((error) => {
    //             console.log(error);
    //         })
    // }


    // getEmployees() {

    //     axios.get("http://localhost:5000/employee")
    //         .then(employee => {
    //             console.log(employee)

    //             const results = employee.data.map(employee => {
    //                 return {
    //                     employee: employee.first_name,

    //                 }
    //             })


    //         }).catch(error => {
    //             console.log(error)
    //         })

    // }



    // const managerList = () => {
    //     axios.get('http://localhost:5000/employee')
    //         .then(response => {
    //             let details = [];

    //             for (var i in response.data) {
    //                 details.push({ name: i, value: response.data[i] })
    //             }

    //             this.setState({ employee: details })

    //         })
    // }

    // const optionTest = [
    //     { value: 'chocolate', label: 'Chocolate' },
    //     { value: 'strawberry', label: 'Strawberry' },
    //     { value: 'vanilla', label: 'Vanilla' }
    // ]

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



    // onChangeTitle = (e) => {
    //     this.setState({
    //         title: e.target.value
    //     })
    // }

    // onChangeDescription = (e) => {
    //     this.setState({
    //         description: e.target.value
    //     })
    // }

    // onChangeStartDate = (date) => {
    //     this.setState({
    //         startDate: date
    //     })
    // }

    // onChangeManager = (e) => {
    //     this.setState({
    //         manager: e.target.value
    //     })
    // }

    // onChangeEmployee = (e) => {
    //     this.setState({
    //         employee: e.target.value
    //     })
    // }

    // onChangeStatus = (e) => {
    //     this.setState({
    //         status: e.target.value
    //     })
    // }



    //DO NOT DELETE !!!
    // onSubmit(e) {
    //     e.preventDefault();

    //     const project = {
    //         title: this.state.title,
    //         description: this.state.description,
    //         manager: this.state.manager,
    //         employee: this.state.employeeData,
    //         startDate: this.state.startDate,
    //         status: this.state.status
    //     }
    //     console.log(project);

    //     axios.post('http://localhost:5000/projects', project)
    //         .then(res => this.props.getSprints());

    //     window.location = '/sprints';
    // }



    const onSubmit = (e) => {
        e.preventDefault();

        // let checkArray = [];
        // for (var key in this.state.employeeData) {
        //     if (this.state.employeeData[key] === true) {
        //         checkArray.push(key);
        //     }
        // }

        let project = {
            title: title,
            description: description,
            manager: manager,
            employee: employee,
            startDate: startDate,
            status: status,
            // employeeData: checkArray.toString()
        };

        axios.post('http://localhost:5000/projects', project)
            .then(res => props.getSprints())

    }


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
        <Container>
            <Col md="4" className="mx-auto">
                <h1>Sprint Form</h1>
                <Form onSubmit={onSubmit}  >

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
                                    // key={option}
                                    value={option}>{option}
                                </option>;
                            })}
                        </Form.Control>

                        {/* <Select
                            options={employee}
                            onChange={(e) => {
                                setEmployeeData(e.target.value)
                                console.log(e.target.value)
                            }}
                            value={employee.filter(function (option) {
                                return option.value === selectedEmployee;
                            })}
                            label="Single select"
                        /> */}


                    </Form.Group>



                    {/* //DO NOT DELETE !!! */}
                    {/* <Form.Group controlId="exampleForm.ControlSelect2">
                            <Form.Label>Employee</Form.Label>
                            <Form.Control as="select" multiple className="form-control"
                                value={this.state.employee} onChange={(e) => {
                                    this.setState({ employeeData: e.target.value })
                                    console.log(e.target.value)
                                }}>
                                {this.state.employee.map(function (employee) {
                                    return <option
                                        key={employee}
                                        value={employee}>{employee}
                                    </option>;
                                })}
                            </Form.Control> */}


                    <Form>Employee</Form>
                    {/* <div class="form-check">
                        <input
                            class="form-check-input"
                            type="checkbox"
                            onChange={(e) => {
                                setEmployeeData(e.target.value)
                                console.log(e.target.value)
                            }}
                        />
                        <label class="form-check-label" for="defaultCheck1">
                            {employee.map((employee) => {
                                return <option
                                    key={employee}
                                    value={employee}>{employee}
                                </option>;
                            })}
                        </label>
                    </div> */}
                    <div>
                        <Select options={employeeOption} onChange={handleChange} isMulti />
                    </div>


                    <Form.Group controlId="exampleForm.ControlSelect3">
                        <Form.Label>Status</Form.Label>
                        <Form.Control as="select" custom defaultValue="Open" className="form-control"
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                        >
                            {/* {status.map((options) => {
                                return (
                                    <option>{options}</option>
                                )
                            })} */}

                            <option>Open</option>
                            <option>In Progress</option>
                            <option>In Review</option>
                            <option>Done</option>

                        </Form.Control>
                    </Form.Group>


                    <Button type="submit">Submit form</Button>
                </Form>
            </Col>
        </Container >
    );

}


export default SprintsForms;
