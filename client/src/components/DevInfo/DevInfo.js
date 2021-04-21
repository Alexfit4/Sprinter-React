import React from 'react'
import { Col, Card, Image } from "react-bootstrap";

function DevInfo(props) {
    return(
<Col lg={6} md={12} className="mb-5">
<Col md={4} lg={6} className="float-left">
  <Image
    src = {props.img}
    className="mx-auto mb-md-0 mb-4 rounded z-depth-1 img-fluid"
    tag="img"
    alt="Sample avatar"
  />
</Col>
<Col md={8} lg={6} className="float-right">
  <h4 className="font-weight-bold mb-3">{props.name}</h4>
  <h6 className="font-weight-bold grey-text mb-3">
  Technologies:
  </h6>
  <p className="grey-text">
    {props.techs}
  </p>
</Col>
</Col>
    )
} 

export default DevInfo