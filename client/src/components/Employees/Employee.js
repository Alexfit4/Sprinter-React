import React, {useState} from 'react';
import TableComponents from "../Table"
import {FormEmployeeData} from '../Forms/FormEmployeeData.js'
import Forms from '../Forms/Form'
import {Col, Row, Container} from "react-bootstrap";

function Employee() {   
    const [employees, setEmployees] = useState([]);

    return (
        <Container>
        <Row>
        <div className='employee'>
            <h1>Employee Page</h1>
            <TableComponents
                employees={employees}
                setEmployees={setEmployees}
            />
                    <Forms 
                    setEmployees={setEmployees}
                        
                    />
        </div>
        </Row>
        </Container>
    )
}

export default Employee