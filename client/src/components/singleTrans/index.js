import { Container, Row, Col, Button } from 'react-bootstrap'
import { useState, useEffect } from 'react';
import JsonData from '../../data/data.json' 
import InfoCard from '../infoCard'
import { saveAs } from 'file-saver';
import axios from 'axios'
import getLocalStorageState from '../../utils/localstorage'


const SingleTrans = () => {
    const [options, setOptions] = useState({})
    const [pageData, setPageData] = useState(getLocalStorageState());

    const handleInputChange = (event) => {
        const { id, value } = event.target;
        setPageData({ ...pageData, [id]: value });
        console.log(pageData)
      };
    
    const getCurrentState = (inputId) => {
        let inputValue = pageData[inputId]
        if(inputValue === undefined) {
            return ''
        }
        else {
            return inputValue
        }

    }
    const createFile = (data) => {
        console.log(text)
        const file = new Blob([data[0]], { type: 'text/plain;charset=utf-8' });
        saveAs(file, data[1]);
    }

    const handleSubmit = () => {
       axios.post('/api/create-file', pageData)
       .then(res => createFile(res.data))
       .catch(error => {
            console.error('Error:', error);
        })
    };

    useEffect(() => {
        setOptions(JsonData);
      }, []);
    return(
        <Container>
            <InfoCard data = {options.GeneralInfo} name ={"General Info"} handleInputChange = {handleInputChange} currentState ={getCurrentState} />
            <InfoCard data = {options.SubscriberInfo} name ={"Subscriber Info"} handleInputChange = {handleInputChange} currentState ={getCurrentState} />
            { pageData.depNum > '0' 
            ? <InfoCard data = {options.DependentInfo} name ={"Dependent Info"} handleInputChange = {handleInputChange} number = {pageData.depNum} currentState ={getCurrentState} />
            : <div></div>
            }
            <Row className='text-center'>
                <Col>
                    <Button onClick={handleSubmit} variant="primary" className='col-2 mb-3' type="button">Submit</Button>
                </Col>      
            </Row>
        </Container>
    )
}

export default SingleTrans