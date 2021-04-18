import React, { useState, useEffect } from 'react';
import Card from "../Cards/Cards"
import CustomPieChart from "../Charts/PieChart";
import "./dashboard.css";
import Container from "../Container/Container";
import Row from "../Row/Row";
import Col from "../Col/Col";
import Form from 'react-bootstrap/Form';
import axios from "axios";

// const cardData = [
//     {
//         title: "Project Title",
//         text: "Description of project"
//     },
//     {
//         title: "Employees",
//         text: "Employee 1"
//     },
//     {
//         title: "Managers",
//         text: "Manager 1"
//     },
//     {
//         title: "Timeline",
//         text: "This is our Timeline"
//     }

// ]

function Dashboard() {

    const [cardData, setCardData] = useState([
         {
            title: "Project Title",
            text: "Project Description"
        },
        // {
        //     title: "Employees",
        //     text: "Employee 1"
        // },
        // {
        //     title: "Managers",
        //     text: "Manager 1"
        // },
        // {
        //     title: "Timeline",
        //     text: "This is our Timeline"
        // }
    ]
    )
       

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
                    console.log(sprints.data.description)                    
                }
            ).catch(error => {
                console.log(error);
            })
    }

    return (
        <div className='dashboard'>
            <h1>Dashboard Page</h1>
            <Row>
                <Col size="3">
                <Form id={id}> 
            <Form.Group>
                <Form.Label>Your Projects</Form.Label>
                <Form.Control size="md" as="select" multiple name="id" onChange={handleChange} onClick={runAxios}>
                   { results.map(sprints => {
                      return <option value={sprints._id} key={sprints._id}>{sprints.title} </option>
                    })}
                </Form.Control> 
            </Form.Group>
        </Form>
                </Col>
                <Col size="4">
                    <div>{cardData.map((data) => {
                        return (
                            <Card title={data.title} text={data.text} />
                        )
                    })}</div>
                </Col>
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