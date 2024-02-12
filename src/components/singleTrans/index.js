import { Container, Row, Col, Form, Card } from 'react-bootstrap'
import { useState, useEffect } from 'react';
import JsonData from '../../data/data.json' 
import GenInfo from '../genInfo'

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
            <GenInfo data = {options.GeneralInfo} handleInputChange = {handleInputChange} />
        </Container>
    )
}

export default SingleTrans