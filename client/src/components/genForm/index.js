import { Row, Col, Form } from 'react-bootstrap'



const GenForm = (props) => {

    return(
    <Form>
        <Form.Group as={Row} className="mb-3">
        {props.data
            ? props.data.map((data, i) => (
            <Col key={data.id} sm="4" className='mb-3'>
                <Row>
                <Form.Label column sm="12">{data.label}</Form.Label>
                    <Col>
                        {"dropdown" in data 
                        ? <Form.Select defaultValue="default" type={data.type}  id = {data.id} onChange={props.handleInputChange}>
                            <option value="default" key="default" disabled></option>
                            {data.dropdown.map((option, i) => (
                                    <option key={option + data.id}>{option}</option>
                            ))}
                        </Form.Select>
                        :<Form.Control type={data.type}  id = {data.id} onChange={props.handleInputChange} value ={props.currentState(data.id)}/>
                        }
                    </Col>
                </Row>
            </Col>
            ))
            : "loading"} 
        </Form.Group>
    </Form>
)
}

export default GenForm