import { Card } from 'react-bootstrap'
import GenForm from '../genForm'

const InfoCard = (props) => {

    return(
        <Card className='mb-5' >
            <Card.Header className='bg-primary text-light'>{props.name}</Card.Header>
            <Card.Body>
                <GenForm data = {props.data} handleInputChange = {props.handleInputChange} name = {props.name} />
            </Card.Body>    
        </Card>
    )
}

export default InfoCard