import React from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import shortid from 'shortid'
import {useState} from 'react'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'

const FieldFormAuthors = ({
    handleFieldChange,
    label,
    placeholder,
    targetField,
    label_button,
    controlId,
    audioContent,
    feedbackInvalid,
}) => {
    const [newAuthor, setNewAuthor] = useState('')

    const handleAuthorChange = () => {
        if(newAuthor !== ''){
            const authors = [...audioContent.fields[targetField]['es-MX'], newAuthor]
            handleFieldChange(targetField, authors)
            setNewAuthor('')
        }
    }

    const handleDeleteAuthor = idx => {
        const authorsFiltered = audioContent.fields[targetField]['es-MX'].filter(
            (_,current_idx) => current_idx !== idx
        )
        handleFieldChange(targetField, authorsFiltered)
    }

    return (
        <Col className='p-0 mb-3'>
            <Form.Group controlId={controlId}>
                <Form.Label className='h6'> {label} </Form.Label>
                    
                {audioContent.fields[targetField]['es-MX'].map((author, idx) => (
                    <Row key={shortid.generate()}>
                        <Col xs={10} className='pr-0'>
                            <Form.Control
                                className='mb-2' type='text' defaultValue={author}
                                required name={author} plaintext readOnly
                            />
                        </Col>
                        <Col className='pl-0'>
                            <Button variant='outline-danger' 
                                onClick={() => handleDeleteAuthor(idx)}>
                                X
                            </Button>
                        </Col>
                    </Row>
                ))}
                <Form.Control.Feedback type='invalid'>
                    {feedbackInvalid}
                </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId={`Add${controlId}`}>
                <Row>
                    <Col xs={8} className='pr-0'>
                        <Form.Control
                            className='mb-2' type='text' placeholder={placeholder}
                            name={`changes-${targetField}`} 
                            onChange={event => setNewAuthor(event.target.value)}
                            value={newAuthor}
                        />
                    </Col>
                    <Col className='pl-0'>
                        <Button variant='outline-success' onClick={handleAuthorChange}> 
                            {label_button}
                        </Button>
                    </Col>
                </Row>
            </Form.Group>
        </Col>
    )
}

export default FieldFormAuthors