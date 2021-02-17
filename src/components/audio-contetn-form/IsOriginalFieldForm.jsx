import React from 'react'
import {Form, Row, Col} from 'react-bootstrap'

const IsOriginalFieldForm = (props) => (
    <Form.Group as={Row} controlId='formIsOriginal' hidden={props.reading}>
        <Form.Label as="legend" md={6} column className='h6'>
            Is the Audio Content Original?
        </Form.Label>
        <Col className='mt-2'>
            <Form.Check
                type="radio"
                label="yes"
                name={props.name}
                id="is-original"
                value={true}
                required
                onChange={() => props.handleFieldChange(props.name, true, 'radio')}
                checked={props.defaultValue}
            />
        </Col>
        <Col className='mt-2'>
            <Form.Check
                type="radio"
                label="No"
                name={props.name}
                id="is-not-original"
                value={false}
                onChange={() => props.handleFieldChange(props.name, false, 'radio')}
                checked={!props.defaultValue}
            />
        </Col>
    </Form.Group>
)

export default IsOriginalFieldForm