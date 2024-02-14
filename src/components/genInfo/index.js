import { Row, Col, Form, Button } from 'react-bootstrap'

const addSubmit = (cardName) => {
    if(cardName === "Subscriber Info") {
        return(
            <Row className='text-center'>
                <Col>
                    <Button variant="primary" className='col-2' type="submit">Submit</Button>
                </Col>      
            </Row>
        )
    }
}


const GenInfo = (props) => {

    return(
    <Form>
        <Form.Group as={Row} className="mb-3">
        {props.data
            ? props.data.map((data, i) => (
            <Col key={data.id} sm="4" className='mb-3'>
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
        {props.name ? addSubmit(props.name): "loading"}
    </Form>
)
}

export default GenInfo