import React from 'react'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'

import {useState} from 'react'
import getBookBody from '../Book'
import GeneralFieldForm from './GeneralFieldForm'
import FieldFormAuthors from './FieldFormAuthors'
import APIConfig from '../../hooks/APIConfig'
import useInitialState from '../../hooks/useInitialState'

const AddAudioContent = ({audioContents, setAudioContents}) => {

    const [audioContent,setAudioContent] = useState(getBookBody())
    const [show, setShow] = useState(false)
    const [validated, setValidated] = useState(false)

    const handleClose = () => setShow(false)
    const handleShow = () => setShow(true)

    const handleFieldChange = (field, data) => setAudioContent({ 
        fields: {
            ...audioContent.fields,
            [field]: {
                "es-MX":data
            }
        }   
    })

    const handleInputChange = event => setAudioContent({
        fields: {
            ...audioContent.fields,
            [event.target.name]: {
                "es-MX": event.target.value
            }
        }
    })

    const mySubmit = () => {
        
        console.log(audioContent)

        const apiConfig = new APIConfig()
        fetch(apiConfig.CREATE_API_URL, apiConfig.getCreateAPIConfig(audioContent))
        .then((response) => response.json())
        .catch(error => console.error(error))
        .then((data) => setAudioContent(data))
        
    }

    const handleSubmit = (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
          event.preventDefault()
          event.stopPropagation()
        }

        setValidated(true)
    }

    return(
        <Container>
            <Button variant='alert' className='btn-outline-success' onClick={handleShow}> 
                Add Audiocontent
            </Button>
        
            <Modal show={show} 
                size='lg'
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title className='text-center'> 
                        Add a new audio content 
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form noValidate validated={validated} onSubmit={handleSubmit}>
                        <Form.Group as={Row} controlId='formContentType'>
                            <Form.Label column sm='4' className='h6'> Type of content: </Form.Label>
                            <Col>
                                <Form.Control plaintext readOnly defaultValue='audio content'/>
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} controlId='formLanguage'>
                            <Form.Label column sm='4' className='h6'> Language: </Form.Label>
                            <Col>
                                <Form.Control plaintext readOnly defaultValue='es-MX'/>
                            </Col>
                        </Form.Group>

                        <GeneralFieldForm
                            controlId='formTitle'
                            label='Title'
                            type='text'
                            placeholder='Enter title'
                            name='title'
                            feedback='Looks good!'
                            feedbackInvalid='please enter a title'
                            handleInputChange={handleInputChange}
                        />

                        <GeneralFieldForm
                            controlId='formCover'
                            label= 'URL cover'
                            type='text'
                            placeholder= 'Enter an URL'
                            name= 'cover'
                            feedback='Looks good!'
                            feedbackInvalid= 'please enter a URL'
                            handleInputChange={handleInputChange}
                        />

                        <FieldFormAuthors
                            label='Authors'
                            placeholder='Enter author name'
                            targetField='authors'
                            label_button='Add author'
                            controlId='formAuthors'
                            feedbackInvalid='require at least one author'
                            audioContent={audioContent}
                            handleFieldChange={handleFieldChange}
                        />

                        <FieldFormAuthors
                            label='Narattors'
                            placeholder='Enter narrator name'
                            targetField='narrators'
                            label_button='Add narrator'
                            controlId='formNarrators'
                            feedbackInvalid='require at least one narrator'
                            audioContent={audioContent}
                            handleFieldChange={handleFieldChange}
                        />

                        <GeneralFieldForm
                            controlId='formStreetDate'
                            label='Street date'
                            type='date'
                            placeholder='mm/dd/yyyy'
                            name='street_date'
                            feedback='Looks good!'                        
                            feedbackInvalid='please enter a valid street date'
                            handleInputChange={handleInputChange}
                        />

                        <GeneralFieldForm
                            controlId='formCostPerPlay'
                            label='Cost per play'
                            type='number'
                            name='cost_per_play'
                            feedback='Looks good!'
                            feedbackInvalid='please enter the cost per play'
                            handleInputChange={handleInputChange}
                        />

                        <GeneralFieldForm
                            controlId='formDuration'
                            label='Duration'
                            type='number'
                            name='duration'
                            feedback='Looks good!'
                            feedbackInvalid='please enter the duration'
                            handleInputChange={handleInputChange}
                        />

                        <Button variant="secondary" onClick={handleClose}>
                            Cancel
                        </Button>
                        <Button type='submit' variant="success">
                            Create
                        </Button>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button type='submit' variant="success" onClick={mySubmit}>
                        Create
                    </Button>
                </Modal.Footer>
            </Modal>
        </Container>
    )
}

export default AddAudioContent
