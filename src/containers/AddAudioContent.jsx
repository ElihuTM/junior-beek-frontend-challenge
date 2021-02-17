import React from 'react'
import {Button, Container, Modal} from 'react-bootstrap'
import AudioContentForm from '../components/audio-contetn-form/AudioContentForm'
import LoadingAlert from '../components/LoadingAlert'
import APIUtils from '../APIUtils'

class AddAudioContent extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            book: APIUtils.getBookBody(),
            show: false,
            reading: false,
        }
    }

    toogleReading() {
        this.setState(prevState => ({
            ...prevState,
            reading: !prevState.reading
        }))
    }

    toggleForm() {
        this.setState(prevState => ({
            ...prevState,
            show: !prevState.show
        }))
    }

    resetForm() {
        this.setState( prevState => ({
            ...prevState,
            book: APIUtils.getBookBody(),
            show: false,
        }))
    }

    onSubmitForm(data){
        const api = new APIUtils()
        const [API, API_CONFIG] = api.getCreateAudioBookConfig(data)

        this.props.setModalShow(true)
        
        fetch(API, API_CONFIG)
        .then((response) => response.json())
        .catch(error => console.error(error))
        .then((data) => {
            this.props.setModalShow(false)
            this.props.addAudioContent(data)
        })
        
        this.resetForm()
    }
    
    render() {
        return (
            <React.Fragment>
                <Button variant='alert' className='btn-outline-success' onClick={this.toggleForm.bind(this)}
                    disabled={this.props.limit === this.props.total}
                    block
                > 
                    Add Book
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
                            onSubmitForm={this.onSubmitForm.bind(this)}
                            book={this.state.book}
                            reading={this.state.reading}
                        >

                        <Container className='row justify-content-end mt-xs-3'>
                            <Button className='col-3 mr-3' variant="secondary" onClick={this.resetForm.bind(this)}>
                                Cancel
                            </Button>
                            <Button className='col-3' type='submit' variant="primary">
                                Create
                            </Button>
                        </Container>
                        </AudioContentForm>
                    </Modal.Body>
                </Modal>
            </React.Fragment>
        )
    }
}

export default AddAudioContent
