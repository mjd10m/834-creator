import { Row, Col, Form, Container } from 'react-bootstrap'



const GenForm = (props) => {

    return(
    <Container>
        {props.name === 'General Info' && <Form.Check type={'checkbox'} onChange={props.handleCheck} checked={props.checked} id={'savedStateBox'} label={'Use Previous Inputs'}/>}
        
        <Form.Group as={Row} className="mb-3">
        {props.data
            ? props.data.map((data, i) => (
            <Col key={data.id} sm="4" className='mb-3'>
                <Row>
                <Form.Label column sm="12">{data.label}</Form.Label>
                    <Col>
                        {"dropdown" in data 
                        ? <Form.Select value={props.currentState(data.id)} type={data.type}  id = {data.id} onChange={(event) => props.handleInputChange(event, props.name)}>
                            <option value="" key="default" disabled></option>
                            {data.dropdown.map((option, i) => (
                                    <option key={option + data.id}>{option}</option>
                            ))}
                        </Form.Select>
                        :<Form.Control type={data.type}  id = {data.id} onChange={(event) => props.handleInputChange(event, props.name)} value ={props.currentState(data.id)}/>
                        }
                    </Col>
                </Row>
            </Col>
            ))
            : "loading"} 
        </Form.Group>
    </Container>
)
}

export default GenForm