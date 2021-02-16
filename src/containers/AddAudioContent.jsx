import React from 'react'

import {Button, Container, Modal, Form, Col, Row } from 'react-bootstrap'
import GeneralFieldForm from '../components/audio-contetn-form/GeneralFieldForm'
import ArrayFieldForm from '../components/audio-contetn-form/ArrayFieldForm'
import AudioContentForm from '../components/audio-contetn-form/AudioContentForm'
import APIUtils from '../APIUtils'

class AddAudioContent extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            book: APIUtils.getBookBody(),
            show: false,
            validated: false,
        }
    }

    toggleForm() {
        this.setState(prevState => ({
            ...prevState,
            show: !prevState.show
        }))
    }

    resetForm() {
        this.setState({
            book: APIUtils.getBookBody(),
            show: false,
            validated: false,
        })
    }

    setValidated(value){
        this.setState(prevState => ({
            ...prevState,
            validated: value,
        }))
    }

    handleFieldChange(field, data, type) {
        if(type === 'number' )
        data = parseInt(data)

        this.setState(prevState => ({
            ...prevState,
            book:{
                fields: {
                    ...prevState.book.fields,
                    [field]: {
                        "es-MX": data
                    }
                }
            }
        }))
    }
    
    submitForm(event){
        const form = event.currentTarget;
        event.preventDefault();
        event.stopPropagation();

        if (form.checkValidity() === true) {
            const api = new APIUtils()
            const [API, API_CONFIG] = api.getCreateAudioBookConfig(this.state.book)
            
            fetch(API, API_CONFIG)
            .then((response) => response.json())
            .catch(error => console.error(error))
            .then((data) => this.props.addAudioContent(data))
            
            this.resetForm()
        } else {
            this.setValidated(true);
        }
    }
    
    render() {
        return (
            <Container>
                <Button variant='alert' className='btn-outline-success' onClick={this.toggleForm.bind(this)}> 
                    Add Audiocontent
                </Button>
                
                <Modal show={this.state.show} 
                    size='lg'
                    onHide={this.toggleForm.bind(this)}
                    backdrop="static"
                    keyboard={false} >

                    <Modal.Header closeButton>
                        <Modal.Title className='text-center'> 
                            Add new audio content 
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <AudioContentForm
                            submitForm={this.submitForm.bind(this)}
                            handleFieldChange={this.handleFieldChange.bind(this)}
                            resetForm={this.resetForm.bind(this)}
                            validated={this.state.validated}
                            book={this.state.book}
                        />
                    </Modal.Body>
                </Modal>
            </Container>
        )
    }
}

export default AddAudioContent
