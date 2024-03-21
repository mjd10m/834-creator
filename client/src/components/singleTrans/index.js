import { Container, Row, Col, Button, Form } from 'react-bootstrap'
import { useState, useEffect } from 'react';
import JsonData from '../../data/data.json' 
import InfoCard from '../infoCard'
import { saveAs } from 'file-saver';
import axios from 'axios'
import {getLocalStorageState, saveLocalStorageState, removeLocalStorageState} from '../../utils/localstorage'


const SingleTrans = () => {
    const [options, setOptions] = useState({})
    const [pageData, setPageData] = useState(getLocalStorageState('state'))
    const [checked, setChecked] = useState(false)
    const [error, setError] = useState(null)
    const [depData, setDepData] = useState([]);

    const handleInputChange = (event, index) => {
        const { id, value } = event.target;
        setPageData({ ...pageData, [id]: value });
        if (parseInt(index, 10) < 99) {
            setDepData(prevDepData => {
                const updatedDepForm = [...prevDepData]
                updatedDepForm[index][id] = value
                return updatedDepForm
            })
        } 
        console.log(pageData)
        console.log(depData)

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
        console.log(data)
        const file = new Blob([data[0]], { type: 'text/plain;charset=utf-8' });
        saveAs(file, data[1]);
    }
    
    const handleCheck = () => {
        setChecked(!checked)
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        removeLocalStorageState('state')
        saveLocalStorageState('lastState',pageData)
        axios.post(process.env.REACT_APP_SERVER, pageData)
        .then(res => createFile(res.data))
        .catch(error => {
            console.error('Error:', error)
            setError('Failed to submit the form. Please fill out completely.');;
            setTimeout(() => {
                window.scrollTo({
                    top: document.body.scrollHeight,
                    behavior: 'smooth'
                });
            }, 100);
        });
    };

    useEffect(() => {
        setOptions(JsonData);
      }, []);
    
    useEffect(() => {
        saveLocalStorageState('state',pageData)
    },[pageData])

    useEffect(() => {
        if(checked) {
            setPageData(getLocalStorageState('lastState'))
        } else {
            setPageData({})
        }
    },[checked])
    useEffect(() => {
        if (pageData.depNum) {
            setDepData(prevDepData => {
                const newLength = pageData.depNum;
                if (newLength < prevDepData.length) {
                    return prevDepData.slice(0, newLength);
                } else {
                    const newData = Array.from({ length: newLength - prevDepData.length }, () => ({}));
                    return [...prevDepData, ...newData];
                }
            });
        } else {
            // Handle the case when pageData.depNum is undefined or 0
            setDepData([]);
        }
        console.log(depData)
    }, [pageData.depNum]);
    return(
        <Container>
            <Form onSubmit={handleSubmit}>
            <InfoCard data = {options.GeneralInfo} name ={"General Info"} handleInputChange = {handleInputChange} currentState ={getCurrentState} handleCheck={handleCheck} checked ={checked} />
            <InfoCard data = {options.SubscriberInfo} name ={"Subscriber Info"} handleInputChange = {handleInputChange} currentState ={getCurrentState} />
            { pageData.depNum > '0' && (
            <InfoCard data = {options.DependentInfo} name ={"Dependent Info"} handleInputChange = {handleInputChange} number = {pageData.depNum} currentState ={getCurrentState} />)
            }
            <Row className='text-center'>
                <Col>
                    <Button variant="primary" className='col-2 mb-3' type="submit">Submit</Button>
                </Col>      
            </Row>
            {error && (
                <Row className='text-center'>
                    <Col>
                        <p className=' mb-3 error'>{error}</p>
                    </Col>      
                </Row>
            )}
            </Form>
        </Container>
    )
}

export default SingleTrans