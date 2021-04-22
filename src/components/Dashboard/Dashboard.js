import React, { useState, useEffect } from 'react';
// import Card from "../Cards/Cards"
import CustomPieChart from "../Charts/PieChart";
import "./dashboard.css";
import {Row, Col,Form, Button, Card, Container} from 'react-bootstrap/';
import axios from "axios";

function Dashboard() {

// Card data state to have title of project, project description, use data to map over and display on the screen.

    const [cardData, setCardData] = useState([])
       
    const [sprintTitles, setSprintTitles] = useState([]);

    const [results, setResults] = useState([]);

    const [id, setId] = useState();

    const runAxios = () => {
        axios.get(`http://localhost:5000/projects/${id}`).then(
            sprints => {
                console.log(sprints);
                
            }
        ).catch(error => {
            console.log(error);
        })
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
                    console.log(sprints.data);
                    console.log(sprints.data.description);
                    setCardData(sprints.data)
                }
            ).catch(error => {
                console.log(error);
            })
    }

    

    return (
        <Container className='dashboard'>
            <Row>
                <Col lg={2} sm={12}>
                    <Form id={id}> 
                        <Form.Group>
                            <Form.Label>Your Projects</Form.Label>
                            <Form.Control size="md" as="select" multiple name="id" onChange={handleChange} onClick={handleClick}  >
                            { results.map(sprints => {
                                return <option value={sprints._id} key={sprints._id}>{sprints.title} </option>
                                })}
                            </Form.Control> 
                            {/* <button class="btn-primary" onClick={()=>  console.log(cardData)}>Display {cardData.title}</button> */}
                        </Form.Group>
                    </Form>
                </Col>
                <Col lg={2} sm={12}>
                <Card>
                    <Card.Body>
                        <Card.Title>Project: {cardData.title}</Card.Title>
                        <Card.Text>
                        {cardData.description}
                        </Card.Text>
                    </Card.Body>
                </Card>
                </Col>
                <Col lg={2} sm={12}>
                    <Card>
                        <Card.Body>
                            <Card.Title>Employees</Card.Title>
                            <Card.Text>
                            {cardData.employee}
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                <Col lg={2} sm={12}>
                <Card>
                    <Card.Body>
                        <Card.Title>Managers</Card.Title>
                        <Card.Text>
                        {cardData.manager}
                        </Card.Text>
                    </Card.Body>
                </Card>
                </Col>
                <Col lg={2} sm={12}>
                <Card>
                    <Card.Body>
                        <Card.Title>Deadline</Card.Title>
                        <Card.Text>
                        {cardData.endDate}
                        </Card.Text>
                    </Card.Body>
                </Card>
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
           
            <Row>
            <div className="charts">
                <div className="charts__left">
                    <div className="charts__left__title" />
                    <CustomPieChart />
                </div>

                <Col className="charts__right">
                    <div className="charts__right__title">
                        <div>
                            <h1>Status Reports</h1>

                        </div>
                    </div>

                    <Col className="charts__right__cards">
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
                    </Col>
                </Col>
            </div>
        </Row>
        </Container>
    )
}

export default Dashboard