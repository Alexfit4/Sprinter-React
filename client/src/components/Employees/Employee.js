import React, {useState} from 'react';
import TableComponents from "../Table"
import Forms from '../Forms/Form'
import {Row, Container} from "react-bootstrap";

function Employee() {   
    const [employees, setEmployees] = useState([]);

    return (
        <Container>
        <Row>
        <div className='employee'>
           
                    <Forms 
                    setEmployees={setEmployees}
                        
                    />
                    <TableComponents
                employees={employees}
                setEmployees={setEmployees}
            />
        </div>
        </Row>
        </Container>
    )
}

export default Employee