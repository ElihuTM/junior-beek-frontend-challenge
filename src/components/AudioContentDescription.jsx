import 'reactjs-popup/dist/index.css'

import React from 'react'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import Modal from 'react-bootstrap/Modal'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'

import {useState} from 'react'

const AudioContentDescription = (audioContent) => {
    const {title, cover, authors, is_original, street_date, 
        cost_per_play, duration, narrators} = audioContent.fields

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const getDate = date => {
        const dd = String(date.getDate()).padStart(2, '0');
        const mm = String(date.getMonth() + 1).padStart(2, '0');
        const yyyy = date.getFullYear();

        return mm + '/' + dd + '/' + yyyy;
    }
    const getDuration = date => {
        const hours = String(date.getUTCHours()).padStart(2, '0')
        const minutes = String(date.getUTCMinutes()).padStart(2, '0')
        const seconds = String(date.getSeconds()).padStart(2, '0')

        return `${hours}h ${minutes}m ${seconds}s` 
    }
    
    return(
        <Container>
            <Button variant="info" onClick={handleShow}>
                Description
            </Button>

            <Modal show={show}
                size='lg'
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title className='text-center'> 
                        {title['es-MX']} {is_original['es-MX'] ? '(Original)' : '(Not Original)'} 
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Row>
                        <Col sm={6}>
                            <img className='img-fluid' 
                                src={cover['es-MX']} 
                                alt={title['es-MX']}
                            />
                        </Col>
                        <Col sm={6}>
                            <Form>
                                <Form.Group controlId='formTitle'>
                                    <Form.Label className='h6'> Title </Form.Label>
                                    <Form.Control plaintext readOnly defaultValue={title['es-MX']} />
                                </Form.Group>
                                <Form.Group controlId='formAuthor'>
                                    <Form.Label className='h6'> Authors </Form.Label>
                                    {authors['es-MX'].map(author =>
                                        <Form.Control key={`description-${author}`} plaintext readOnly defaultValue={author} />
                                    )}
                                </Form.Group>
                                <Form.Group controlId='formNarrators'>
                                    <Form.Label className='h6'> Narrators </Form.Label>
                                    {narrators['es-MX'].map(narrator =>
                                        <Form.Control key={`description-${narrator}`} plaintext readOnly defaultValue={narrator} />
                                    )}
                                </Form.Group>
                                <Form.Group controlId='formStreetDate'>
                                    <Form.Label className='h6'> StreetDate (mm/dd/yyyy)</Form.Label>
                                    <Form.Control plaintext readOnly defaultValue={getDate(new Date(street_date['es-MX']))} />
                                </Form.Group>
                                <Form.Group controlId='formCostPerDay'>
                                    <Form.Label className='h6'> Cost per play </Form.Label>
                                    <Form.Control plaintext readOnly defaultValue={'$' + cost_per_play['es-MX']} />
                                </Form.Group>
                                <Form.Group controlId='formDuration'>
                                    <Form.Label className='h6'> Duration </Form.Label>
                                    <Form.Control plaintext readOnly defaultValue={getDuration(new Date(duration['es-MX'] * 1000))} />
                                </Form.Group>
                            </Form>
                        </Col>
                    </Row>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="warning" onClick={handleClose}>
                        Update
                    </Button>
                    <Button variant="danger" onClick={handleClose}>
                        Delete
                    </Button>
                </Modal.Footer>
            </Modal>
        </Container>
    )
}

export default AudioContentDescription