import React from 'react';
import { Card } from 'react-bootstrap';


export default (props) => {
    return (

    <Card style={{ width: '18rem', marginLeft: "auto", marginRight: "auto" }}>

  <Card.Body>
    <Card.Title>{props.title}</Card.Title>
    <Card.Text>
        {props.text}
    </Card.Text>
  </Card.Body>
</Card>
    )
}
