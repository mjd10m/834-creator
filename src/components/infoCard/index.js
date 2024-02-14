import { Card } from 'react-bootstrap'
import GenForm from '../genForm'
import DepForm from '../depForm'

const InfoCard = (props) => {

    return(
        <Card className='mb-5' >
            <Card.Header as="h4" className='bg-primary text-light'>{props.name}</Card.Header>
            <Card.Body>
                {props.name === "Dependent Info"
                ?<DepForm data = {props.data} handleInputChange = {props.handleInputChange} name = {props.name} number = {props.number} />
                :<GenForm data = {props.data} handleInputChange = {props.handleInputChange} name = {props.name} />
                }
            </Card.Body>    
        </Card>
    )
}

export default InfoCard