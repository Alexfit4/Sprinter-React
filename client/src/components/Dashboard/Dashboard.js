import React, { useState, useEffect } from 'react';
// import Card from "../Cards/Cards"
import CustomPieChart from "../Charts/PieChart";
import "./dashboard.css";
import Container from "../Container/Container";
import Row from "../Row/Row";
import Col from "../Col/Col";
import {Form, Button, Card} from 'react-bootstrap/';
import axios from "axios";

function Dashboard() {

// Card data state to have title of project, project description, use data to map over and display on the screen.

    const [cardData, setCardData] = useState([])
       
    const [sprintTitles, setSprintTitles] = useState([]);

    const [results, setResults] = useState([]);

    const [id, setId] = useState();

    const [deadline, setDeadline] = useState();

    const runAxios = () => {
        axios.get(`http://localhost:5000/projects/${id}`).then(
            sprints => {
                console.log(sprints);
                
            }
        ).catch(error => {
            console.log(error);
        })
    }

    const calculateDeadline = () => {
        axios.get(`http://localhost:5000/projects/${id}`).then(
            sprints => {
                console.log(sprints.data.startDate);
                var date1 = new Date(sprints.data.startDate);
                var date2 = new Date(sprints.data.endDate);
                  
                // To calculate the time difference of two dates
                var Difference_In_Time = date2.getTime() - date1.getTime();
                  
                // To calculate the no. of days between two dates
                var Difference_In_Days = Math.round(Difference_In_Time / (1000 * 3600 * 24));
                  
                //To display the final no. of days (result)
                console.log("Total number of days between dates  <br>"
                               + date1 + "<br> and <br>" 
                               + date2 + " is: <br> " 
                               + Difference_In_Days);
                setDeadline(Difference_In_Days);
                console.log(deadline)
            }
        )
    }

    

    useEffect(
        () => {
            axios.get("http://localhost:5000/projects/").then(
                sprints => {
                    console.log(sprints.data[0]._id);
                    setResults(sprints.data);
                }
            ).catch(error => {
                console.log(error);
            })
    }, []);

    const handleChange = (e) => {
        e.preventDefault();
        const {name, value} = e.target;
        console.log(e.target.value);
        setId(e.target.value);
    }



    const handleClick = (e) => {
        e.preventDefault();
        axios.get(`http://localhost:5000/projects/${id}`).then(
                sprints => {
                    console.log(typeof sprints.data, "here");
                    console.log(sprints.data.description);
                    let array = []
                    array.push(sprints.data)
                    setCardData(array)
                    calculateDeadline();
                }
            ).catch(error => {
                console.log(error);
            })
    }

    

    return (
        <div className='dashboard pl-5'>
            <h1>Welcome to Your Dashboard</h1>
            <Row>
                <Col size="2">
                    <Form id={id}> 
                        <Form.Group>
                            <Form.Label>Your Projects</Form.Label>
                            <Form.Control size="md" as="select" multiple name="id" onChange={handleChange} onClick={handleClick}  >
                            { results.map(sprints => {
                                return <option value={sprints._id} key={sprints._id}>{sprints.title} </option>
                                })}
                            </Form.Control> 
                        </Form.Group>
                    </Form>
                </Col>
                <Col size="10">
                {cardData.length > 0 ? cardData.map((data) => {
                    return (
                        <div>
                            <Row>
                            <Col size="2">
                                <Card>
                                    <Card.Body>
                                        <Card.Title>Project: {data.title}</Card.Title>
                                        <Card.Text>
                                        {data.description}
                                        </Card.Text>
                                    </Card.Body>
                                </Card>
                            </Col>
                            <Col size="2">
                                <Card>
                                    <Card.Body>
                                        <Card.Title>Employees</Card.Title>
                                        <Card.Text>
                                        {data.employee}
                                        </Card.Text>
                                    </Card.Body>
                                </Card>
                            </Col>
                            <Col size="2">
                                <Card>
                                    <Card.Body>
                                        <Card.Title>Managers</Card.Title>
                                        <Card.Text>
                                        {data.manager}
                                        </Card.Text>
                                    </Card.Body>
                                </Card>
                            </Col>
                            <Col size="2">
                                <Card>
                                    <Card.Body>
                                        <Card.Title>Deadline / Days Remaining</Card.Title>
                                        <Card.Text>
                                            {data.endDate}
                                            <br />
                                        {deadline}
                                        </Card.Text>
                                    </Card.Body>
                                </Card>
                            </Col>
                            </Row>
                            
                        </div>
                    )
                }) : null}
                </Col>
                
                
                {/* <Col size="2">
                    <div>

                <Card>
                    <Card.Body>
                        <Card.Title>Project: {cardData.title}</Card.Title>
                        <Card.Text>
                        {cardData.description}
                        </Card.Text>
                    </Card.Body>
                </Card>
                <Card>
                    <Card.Body>
                        <Card.Title>Employees</Card.Title>
                        <Card.Text>
                        {cardData.employee}
                        </Card.Text>
                    </Card.Body>
                </Card>
                <Card>
                    <Card.Body>
                        <Card.Title>Managers</Card.Title>
                        <Card.Text>
                        {cardData.manager}
                        </Card.Text>
                    </Card.Body>
                </Card>

                   </div>
                </Col> */}
            </Row>
           
            <br />

            <div className="main__title">

                <div className="main__greeting mx-auto">
                    <br />
                    <h1>Welcome to your admin dashboard</h1>
                </div>
            </div>

            <div className="charts">
                <div className="charts__left">
                    <div className="charts__left__title" />
                    <CustomPieChart />
                </div>

                <div className="charts__right">
                    <div className="charts__right__title">
                        <div>
                            <h1>Status Reports</h1>

                        </div>
                    </div>

                    <div className="charts__right__cards">
                        <div className="card1">
                            <h1>Open</h1>
                            <h3>5</h3>
                        </div>

                        <div className="card2">
                            <h1>In progress</h1>
                            <h3>7</h3>
                        </div>

                        <div className="card3">
                            <h1>In review</h1>
                            <h3>3</h3>
                        </div>

                        <div className="card4">
                            <h1>Done</h1>
                            <h3>5</h3>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Dashboard