import React from 'react'

import {Form, Col, Row, Button} from 'react-bootstrap'
import GeneralFieldForm from './GeneralFieldForm'
import ArrayFieldForm from './ArrayFieldForm'

const AudioContentForm = (props) => (
    <Form className='p-lg-4'noValidate validated={props.validated} onSubmit={props.submitForm}>
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
        <hr/>
        
        <Form.Group as={Row} controlId='formIsOriginal'>
            <Form.Label as="legend" md={6} column className='h6'>
                Is the Audio Content Original?
            </Form.Label>
            <Col className='mt-2'>
                <Form.Check
                    type="radio"
                    label="yes"
                    name="is_original"
                    id="is-original"
                    value={true}
                    required
                    onChange={() => console.log(true)}
                />
            </Col>
            <Col className='mt-2'>
                <Form.Check
                    type="radio"
                    label="No"
                    name="is_original"
                    id="is-not-original"
                    value={false}
                    onChange={() => console.log(false)}
                />
            </Col>
        </Form.Group>

        <GeneralFieldForm
            name='title'
            type= 'text'
            handleFieldChange={props.handleFieldChange}
        />

        <GeneralFieldForm
            name='cover'
            label='URL Cover'
            type='text'
            placeholder='enter an URL'
            handleFieldChange={props.handleFieldChange}
        />

        <ArrayFieldForm
            name='authors'
            book={props.book}
            handleFieldChange={props.handleFieldChange}
        />

        <ArrayFieldForm
            name='narrators'
            book={props.book}
            handleFieldChange={props.handleFieldChange}
        />

        <GeneralFieldForm
            name='street_date'
            type='date'
            placeholder='mm/dd/yyyy'
            handleFieldChange={props.handleFieldChange}
            feedbackInvalid='please enter a valid date'
        />

        <GeneralFieldForm
            name='cost_per_play'
            type='number'
            handleFieldChange={props.handleFieldChange}
        />

        <GeneralFieldForm
            name='duration'
            type='number'
            handleFieldChange={props.handleFieldChange}
        />

        <Button type='submit' variant="success">
            Create
        </Button>
        <Button variant="secondary" onClick={props.resetForm}>
            Cancel
        </Button>
    </Form>
)

export default AudioContentForm