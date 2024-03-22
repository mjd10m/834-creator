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
    const [depData, setDepData] = useState([
        {
            "relationCode": "01 Spouse",
            "exchId": "9574839208",
            "carrId": "1234785943",
            "memName": "Fill Jill",
            "ssn": "097483927",
            "dob": "1992-05-11",
            "gen": "F - Female",
            "smoke": "T - Tobacco Use",
            "covType": "HLT - Health",
            "premAmt": "100"
        }
    ]);
    const [genData, setGenData] = useState({
        "senderId": "CHR",
        "state": "TX",
        "souExchId": "SX0",
        "payerName": "CHRISTUS",
        "payerId": "12345843",
        "convCarr": "CHRISTUS HEALTH",
        "brokerName": "Jill Fill ",
        "brokerId": "09748392",
        "enrollStatus": "CAE",
        "eligbDate": "2024-01-01",
        "covStatus": "Active",
        "transDate": "2024-01-01",
        "depNum": "1",
        "policyNum": "09748392",
        "hiosId": "10934TX009238401",
        "rateArea": "R-TX004"
    })
    const [subData, setSubData] = useState({
        "subType": "Subscriber",
        "exchId": "0947382943",
        "carrId": "3892057483",
        "memName": "Mill Bill",
        "ssn": "758493202",
        "strAddr": "12345 Road St",
        "city": "Town",
        "zCode": "33497",
        "cCode": "48001",
        "dob": "2001-05-05",
        "gen": "M - Male",
        "smoke": "N - None",
        "covType": "HLT - Health",
        "premAmt": "100",
        "aptcAmt": "50",
        "premAmtTot": "100",
        "totResAmt": "50",
        "csrAmt": "0"
    })

    const handleInputChange = (event, index) => {
        const { id, value, dataset } = event.target;
        console.log(value)
        if (index === 'General Info') {
            setGenData({...genData, [id]: value}) 
        } else if (index === 'Subscriber Info') {
            setSubData({...subData, [id]: value}) 
        } else if (index <= depData.length) {
            console.log('Here')
            setDepData(prevDepData => {
                const updatedDepForm = [...prevDepData]
                updatedDepForm[index][dataset.inputName] = value
                return updatedDepForm
            })
        };
        console.log(pageData)
        console.log(depData)
        console.log(genData)
        console.log(subData)
    }
    
    const getCurrentState = (inputId, index) => {
        let inputValue
        if(typeof index  === 'number') {
            if(depData[index] && depData[index].hasOwnProperty(inputId)) {
                inputValue = depData[index][inputId]
            } 
        } else if (index === 'General Info') {
            if(genData.hasOwnProperty(inputId)) {
                inputValue = genData[inputId]
            }
        } else if (index === 'Subscriber Info') {
            if(subData.hasOwnProperty(inputId)) {
                inputValue = subData[inputId]
            }
        }
        return inputValue !== undefined ? inputValue : ''
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
        let combinedState = [genData, subData, depData]
        console.log(combinedState)
        removeLocalStorageState('state')
        saveLocalStorageState('lastState',pageData)
        axios.post(process.env.REACT_APP_SERVER, combinedState)
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
        if (genData.depNum) {
            setDepData(prevDepData => {
                const newLength = genData.depNum;
                if (newLength < prevDepData.length) {
                    return prevDepData.slice(0, newLength);
                } else {
                    const newData = Array.from({ length: newLength - prevDepData.length }, () => ({}));
                    return [...prevDepData, ...newData];
                }
            });
        } else {
            setDepData([]);
        }
    }, [genData.depNum]);
    return(
        <Container>
            <Form onSubmit={handleSubmit}>
            <InfoCard data = {options.GeneralInfo} name ={"General Info"} handleInputChange = {handleInputChange} currentState ={getCurrentState} handleCheck={handleCheck} checked ={checked} />
            <InfoCard data = {options.SubscriberInfo} name ={"Subscriber Info"} handleInputChange = {handleInputChange} currentState ={getCurrentState} />
            { genData.depNum > '0' && (
            <InfoCard data = {options.DependentInfo} name ={"Dependent Info"} handleInputChange = {handleInputChange} number = {genData.depNum} currentState ={getCurrentState} />)
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