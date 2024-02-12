import { Container, Row, Col, Form, Card } from 'react-bootstrap'
import { useState } from 'react';

const GenInfo = (props) => {

    return(
        <Card>
            <Card.Header>General Info</Card.Header>
            <Card.Body>
                <Form>
                    <Form.Group as={Row} className="mb-3">
                    {props.data
                      ? props.data.map((data, i) => (
                        <Col key={i} sm="4" className='mb-3'>
                            <Row>
                            <Form.Label column sm="12">{data.label}</Form.Label>
                                <Col>
                                    <Form.Control type={data.type}  id = {data.id} onChange={props.handleInputChange}/>
                                </Col>
                            </Row>
                        </Col>
                        ))
                      : "loading"} 
                    </Form.Group>
                </Form>
            </Card.Body>    
        </Card>
    )
}

export default GenInfo