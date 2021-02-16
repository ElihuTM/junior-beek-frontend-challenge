import React, { useEffect, useState } from 'react'
import {Button, Container, Modal, Row, Col, Form} from 'react-bootstrap'
import shortid from 'shortid'
import APIUtils from '../APIUtils'

class AudioContentDescription extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            ...this.props.book.fields,
            show: false,
            delete_result: false,
        }
    }

    getDate(date) {
        const dd = String(date.getDate()).padStart(2, '0');
        const mm = String(date.getMonth() + 1).padStart(2, '0');
        const yyyy = date.getFullYear();

        return mm + '/' + dd + '/' + yyyy;
    }

    getDuration(date) {
        const hours = String(date.getUTCHours()).padStart(2, '0')
        const minutes = String(date.getUTCMinutes()).padStart(2, '0')
        const seconds = String(date.getSeconds()).padStart(2, '0')

        return `${hours}h ${minutes}m ${seconds}s` 
    }

    toggleForm() {
        this.setState(prevState => ({
            ...prevState,
            show: !prevState.show
        }))
    }

    deleteAudioContentClick(id) {
        const api = new APIUtils()
        const [API, API_CONFIG] = api.getDeleteAudioBookConfig(id)

        fetch(API, API_CONFIG)
        .then(response => {
            if(response.ok === true)
                this.props.deleteAudioContent(id)
        }).catch(error => console.error(error))

        this.toggleForm()
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
                            {this.state.title['es-MX']} {this.state.is_original['es-MX'] ? '(Original)' : '(Not Original)'} 
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Row>
                            <Col sm={6}>
                                <img className='img-fluid' 
                                    src={this.state.cover['es-MX']} 
                                    alt={this.state.title['es-MX']}
                                />
                            </Col>
                            <Col sm={6}>
                                <Form>
                                    <Form.Group controlId='formTitle' >
                                        <Form.Label className='h6'> Title </Form.Label>
                                        <Form.Control plaintext readOnly defaultValue={this.state.title['es-MX']} />
                                    </Form.Group>
                                    <Form.Group controlId='formAuthor'>
                                        <Form.Label className='h6'> Authors </Form.Label>
                                        {this.state.authors['es-MX'].map(author =>
                                            <Form.Control key={shortid.generate()} plaintext readOnly defaultValue={author} />
                                        )}
                                    </Form.Group>
                                    <Form.Group controlId='formNarrators'>
                                        <Form.Label className='h6'> Narrators </Form.Label>
                                        {this.state.narrators['es-MX'].map(narrator =>
                                            <Form.Control key={shortid.generate()} plaintext readOnly defaultValue={narrator} />
                                        )}
                                    </Form.Group>
                                    <Form.Group controlId='formStreetDate'>
                                        <Form.Label className='h6'> StreetDate (mm/dd/yyyy)</Form.Label>
                                        <Form.Control plaintext readOnly defaultValue={this.getDate(new Date(this.state.street_date['es-MX']))} />
                                    </Form.Group>
                                    <Form.Group controlId='formCostPerDay'>
                                        <Form.Label className='h6'> Cost per play </Form.Label>
                                        <Form.Control plaintext readOnly defaultValue={'$' + this.state.cost_per_play['es-MX']} />
                                    </Form.Group>
                                    <Form.Group controlId='formDuration'>
                                        <Form.Label className='h6'> Duration </Form.Label>
                                        <Form.Control plaintext readOnly defaultValue={this.getDuration(new Date(this.state.duration['es-MX'] * 1000))} />
                                    </Form.Group>
                                </Form>
                            </Col>
                        </Row>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.toggleForm.bind(this)}>
                            Close
                        </Button>
                        <Button variant="warning" onClick={this.toggleForm.bind(this)}>
                            Update
                        </Button>
                        <Button variant="danger" onClick={() => this.deleteAudioContentClick(this.props.book.sys.id)}>
                            Delete
                        </Button>
                    </Modal.Footer>
                </Modal>
            </Container>
        )
    }
}
export default AudioContentDescription