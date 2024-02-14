import { Row, Col, Form, Container, } from 'react-bootstrap'

/* const indvDepForm = (propDepNum, propData) => {
    
    for(let i = 1; i <= propDepNum; i++ ) {
        <Form>
            <Row>
                <Col>
                <h5 className='border-bottom pb-1'>Dependent 1</h5>
                </Col>
            </Row>
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
        </Form>        
    }
} */

const DepForm = (props) => {

    return(
    <Container>
        {Array.from({length: props.number}).map((_, k) => 
        <Form>
            <Row>
                <Col>
                <h5 className='border-bottom pb-1'>Dependent {k+1}</h5>
                </Col>
            </Row>
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
        </Form>
        )}
        
    </Container>   
    
)
}

export default DepForm