import { Container, Row, Col, Button } from 'react-bootstrap'
import { useState, useEffect } from 'react';
import JsonData from '../../data/data.json' 
import InfoCard from '../infoCard'
import { saveAs } from 'file-saver';


const SingleTrans = () => {
    const [options, setOptions] = useState({})
    const [pageData, setPageData] = useState({});

    const handleInputChange = (event) => {
        const { id, value } = event.target;
        setPageData({ ...pageData, [id]: value });
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
    const createFile = (text) => {
        console.log(text)
        const file = new Blob([text], { type: 'text/plain;charset=utf-8' });
        saveAs(file, 'hello_world.txt');
    }

    const handleSubmit = async () => {
       fetch('/api/create-file')
       .then(res => res.json())
       .then(text => (createFile(text)))
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