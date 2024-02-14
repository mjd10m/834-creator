import { Container } from 'react-bootstrap'
import { useState, useEffect } from 'react';
import JsonData from '../../data/data.json' 
import CardInfo from '../cardInfo'

const SingleTrans = () => {
    const [options, setOptions] = useState({})
    const [pageData, setPageData] = useState({});

    const handleInputChange = (event) => {
        const { id, value } = event.target;
        setPageData({ ...pageData, [id]: value });
      };
    
    useEffect(() => {
        setOptions(JsonData);
      }, []);
    return(
        <Container>
            <CardInfo data = {options.GeneralInfo} name ={"General Info"} handleInputChange = {handleInputChange} />
            <CardInfo data = {options.SubscriberInfo} name ={"Subscriber Info"} handleInputChange = {handleInputChange} />
        </Container>
    )
}

export default SingleTrans