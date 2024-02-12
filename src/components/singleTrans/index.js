import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form'
import { useState } from 'react';

const SingleTrans = () => {
    const [data, setData] = useState({});
    
    const handleInputChange = (event) => {
        const { id, value } = event.target;
        setData({ ...data, [id]: value });
      };

    return(
        <Container>
            <Row>
                <Col>
                    <Form>
                        <Form.Group as={Row} className="mb-3">
                            <Form.Label column sm= "auto">Subscriber Name</Form.Label>
                            <Col sm="auto">
                                <Form.Control type="text" placeholder="First Name" id = "first" onChange={handleInputChange} value={data.first || ""} />
                            </Col>
                            <Col sm="auto">
                                <Form.Control type="text" placeholder="Middle Name" id="middle" onChange={handleInputChange} value={data.middle || ""} />
                            </Col>
                            <Col sm="auto">
                                <Form.Control type="text" placeholder="Last Name" id="last" onChange={handleInputChange} value={data.last || ""} />
                            </Col>
                        </Form.Group>
                    </Form>
                </Col>
            </Row>
        </Container>
    )
}

export default SingleTrans