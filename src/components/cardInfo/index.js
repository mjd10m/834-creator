import { Card } from 'react-bootstrap'
import GenInfo from '../genInfo'

const CardInfo = (props) => {

    return(
        <Card className='mb-5' >
            <Card.Header className='bg-primary text-light'>{props.name}</Card.Header>
            <Card.Body>
                <GenInfo data = {props.data} handleInputChange = {props.handleInputChange} name = {props.name} />
            </Card.Body>    
        </Card>
    )
}

export default CardInfo