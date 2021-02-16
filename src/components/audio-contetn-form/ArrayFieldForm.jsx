import React, {useState} from 'react'
import {Form, Button, Col, Row} from 'react-bootstrap'
import shortid from 'shortid'

const ArrayFieldForm = (props) => {
    const singular = props.name.slice(0,-1)
    const upperCase = props.name.charAt(0).toUpperCase() + props.name.slice(1)
    const [newPerson, setNewPerson] = useState('')

    const handlePersonChange = () => {
        if(newPerson !== ''){
            const people = [...props.book.fields[props.name]['es-MX'], newPerson]
            props.handleFieldChange(props.name, people, 'array')
            setNewPerson('')
        }
    }

    const handleDeletePerson = idx => {
        const peopleFiltered = props.book.fields[props.name]['es-MX'].filter(
            (_,current_idx) => current_idx !== idx
        )
        props.handleFieldChange(props.name, peopleFiltered, 'array')
    }

    return (
        <Col className='p-0 mb-3'>
            <Form.Group controlId={`form${upperCase}`}>
                <Form.Label className='h6'> {upperCase} </Form.Label>
                    
                {props.book.fields[props.name]['es-MX'].map((person, idx) => (
                    <Row key={shortid.generate()}>
                        <Col xs={10} className='pr-0'>
                            <Form.Control
                                className='mb-2' type='text' defaultValue={person}
                                required name={person} plaintext readOnly
                            />
                        </Col>
                        <Col className='pl-0'>
                            <Button variant='danger' 
                                onClick={() => handleDeletePerson(idx)}>
                                X
                            </Button>
                        </Col>
                    </Row>
                ))}
                <Form.Control.Feedback type='invalid'>
                    {`require at least one ${singular}`}
                </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId={`AddForm${upperCase}`}>
                <Row>
                    <Col xs={8} className='pr-0'>
                        <Form.Control
                            className='mb-2' type='text' placeholder={`Enter ${singular} name`}
                            name={`add-${singular}-format`} 
                            onChange={event => setNewPerson(event.target.value)}
                            value={newPerson}
                        />
                    </Col>
                    <Col className='pl-0'>
                        <Button variant='primary' onClick={handlePersonChange}> 
                            {`Add ${singular}`}
                        </Button>
                    </Col>
                </Row>
            </Form.Group>
        </Col>
    )
}

export default ArrayFieldForm