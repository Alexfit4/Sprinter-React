import React, { useState, useEffect } from "react";
import Form from 'react-bootstrap/Form';
import axios from "axios";

export default function DashForm() {


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
        // axios.get(`http://localhost:5000/projects/${id}`).then(
        //     sprints => {
        //         console.log(sprints);
        //     }
        // ).catch(error => {
        //     console.log(error);
        // })
    }

    const handleClick = (e) => {
        e.preventDefault();
        axios.get(`http://localhost:5000/projects/${id}`).then(
                sprints => {
                    console.log(sprints);
                }
            ).catch(error => {
                console.log(error);
            })
    }

    return (
        <Form>
            <Form.Group>
                <Form.Label>Your Projects</Form.Label>
                <Form.Control size="md" as="select" multiple name="id" onChange={handleChange} onClick={runAxios}>
                   { results.map(sprints => {
                      return <option value={sprints._id} key={sprints._id}>{sprints.title}</option>
                    })}
                </Form.Control> 
            </Form.Group>
        </Form>
    )    
};