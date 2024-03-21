import { Row, Col, Form, Container, } from 'react-bootstrap'

const DepForm = (props) => {

    return(
    <Container>
        {Array.from({length: props.number}).map((_, k) => 
        <Col key={`dep` + (k)}>
            <Row>
                <Col>
                <h5 className='border-bottom pb-1'>Dependent {k+1}</h5>
                </Col>
            </Row>
            <Form.Group as={Row} className="mb-3">
            {props.data
            ? props.data.map((data, i) => (
            <Col key={data.id + k} sm="4" className='mb-3'>
                <Row>
                <Form.Label column sm="12">{data.label}</Form.Label>
                    <Col>
                        {"dropdown" in data 
                        ? <Form.Select value={props.currentState(data.id, k)} type={data.type}  id = {data.id + k} data-input-name = {data.id} onChange={(event) => props.handleInputChange(event, k)}>
                            <option value="" key="default" disabled></option>
                            {data.dropdown.map((option, j) => (
                                    <option key={option + data.id + k}>{option}</option>
                            ))}
                        </Form.Select>
                        :<Form.Control type={data.type}  id = {data.id + k} data-input-name = {data.id} onChange={(event) => props.handleInputChange(event, k)} value ={props.currentState(data.id, k)}/>
                        }
                    </Col>
                </Row>
            </Col>
            ))
            : "loading"} 
            </Form.Group>
        </Col>
        )}
        
    </Container>   
    
)
}

export default DepForm