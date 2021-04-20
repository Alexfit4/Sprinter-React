import React from 'react'
import {  Row, Col, Card, Image, Container } from "react-bootstrap";
import DevInfo from '../DevInfo/DevInfo'


function Devs() {
    return (
<Container>
        <div className='devs'>
           <Card className="my-5 px-5 pb-1 text-center">
      <Card.Body>
        <h2 className="h1-responsive font-weight-bold my-5">
          Our amazing team
        </h2>
        <p className="grey-text w-responsive mx-auto mb-5 text-center">
         Meet the Devs
        </p>
        <Row className="text-md-left">
          <DevInfo 
              name="Johnnie Simpson"
              techs="MongoDB,HTML,Javscipt"
          />
          <DevInfo 
              name="Amir Ashtiany"
              techs="MongoDB,HTML,Javscipt"
          />
          <DevInfo 
              name="Lu Hao"
              techs="MongoDB,HTML,Javscipt"
          />
          <DevInfo 
              name="Mengyue Zhang"
              techs="MongoDB,HTML,Javscipt"
          />
        </Row>
      </Card.Body>
    </Card>
        </div>
        </Container>
    )
}

export default Devs