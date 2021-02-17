import React from 'react'
import {Button, Container, Modal, Row, Col} from 'react-bootstrap'
import AudioContentForm from '../components/audio-contetn-form/AudioContentForm'
import LoadingAlert from '../components/LoadingAlert'
import APIUtils from '../APIUtils'

class AudioContentDescription extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            book: this.props.book,
            show: false,
            reading: true,
            modalShow: false,
        }
    }

    toggleForm() {
        this.setState(prevState => ({
            ...prevState,
            show: !prevState.show
        }))
    }

    toggleReading() {
        this.setState(prevState => ({
            ...prevState,
            reading: !prevState.reading
        }))
    }

    handleBook(book) {
        this.setState(prevState => ({
            ...prevState,
            book: {
                ...book,
                sys: {
                    ...prevState.book.sys,
                    version: prevState.book.sys.version + 1
                }
            }
        }))
    }

    deleteAudioContentClick(id) {
        const api = new APIUtils()
        const [API, API_CONFIG] = api.getDeleteAudioBookConfig(id)
        this.toggleForm()
        
        this.props.setModalShow(true)

        fetch(API, API_CONFIG)
        .then(response => {
            if(response.ok === true)
                this.props.deleteAudioContent(id)
            this.props.setModalShow(false)
        }).catch(error => console.error(error))
    }

    onSubmitForm(book) {
        const api = new APIUtils()
        const [API, API_CONFIG] = api.getUpdateAudioBookConfig(
            {...book}, book.sys.id, this.state.book.sys.version
        )

        this.handleBook(book)
        this.toggleReading()
        
        fetch(API, API_CONFIG)
        .then(response => response.json())
        .catch(error => console.error(error))
        .then(data => this.props.updateAudioContent(data.sys.id, data))
    }

    render() {
        return(
            <Container>
                <Button variant="info" onClick={this.toggleForm.bind(this)}>
                    Description
                </Button>

                <Modal show={this.state.show}
                    size='lg'
                    onHide={this.toggleForm.bind(this)}
                    backdrop="static"
                    keyboard={false}
                >
                    <Modal.Header closeButton>
                        <Modal.Title className='text-center'> 
                            {this.state.book.fields.title['es-MX']} {this.state.book.fields.is_original['es-MX'] ? '(Original)' : '(Not Original)'} 
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Row>
                            <Col lg={4}>
                                <img className='img-fluid' 
                                    src={this.state.book.fields.cover['es-MX']} 
                                    alt={this.state.book.fields.title['es-MX']}
                                />
                            </Col>
                            <Col lg={8}>
                                <AudioContentForm
                                    onSubmitForm={this.onSubmitForm.bind(this)}
                                    book={this.state.book}
                                    reading={this.state.reading}
                                >
                                
                                    <Container className='row justify-content-begin mt-xs-3'>
                                        <Button className='mr-md-3' variant="secondary" 
                                            onClick={this.toggleReading.bind(this)} hidden={this.state.reading} >
                                            Cancel
                                        </Button>
                                        <Button variant="primary" type='submit' hidden={this.state.reading}>
                                            Update
                                        </Button>
                                    </Container>
                                    <Container className='row justify-content-end mt-xs-3'>
                                        <Button className='mr-md-3' variant="secondary" 
                                            onClick={this.toggleForm.bind(this)} hidden={!this.state.reading}>
                                            Close
                                        </Button>
                                        <Button variant="warning" 
                                            onClick={this.toggleReading.bind(this)} hidden={!this.state.reading}>
                                            Update
                                        </Button>
                                        <Button className='ml-md-3' variant="danger" 
                                            onClick={() => this.deleteAudioContentClick(this.props.book.sys.id)} hidden={!this.state.reading}>
                                            Delete
                                        </Button>
                                    </Container>
                                </AudioContentForm>
                            </Col>
                        </Row>
                    </Modal.Body>
                </Modal>
            </Container>
        )
    }
}

export default AudioContentDescription