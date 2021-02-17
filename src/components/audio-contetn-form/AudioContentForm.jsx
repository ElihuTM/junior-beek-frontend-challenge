import React from 'react'

import {Form, Col, Row} from 'react-bootstrap'
import GeneralFieldForm from './GeneralFieldForm'
import ArrayFieldForm from './ArrayFieldForm'
import IsOriginalFieldForm from './IsOriginalFieldForm'

class AudioContentForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            book: this.props.book,
            validated: false,
        }
    }

    handleFieldChange(field, data, type) {
        if(type === 'number' )
        data = parseInt(data)

        this.setState(prevState => ({
            ...prevState,
            book:{
                ...prevState.book,
                fields: {
                    ...prevState.book.fields,
                    [field]: {
                        "es-MX": data
                    }
                }
            }
        }))
    }

    setValidated(value){
        this.setState(prevState => ({
            ...prevState,
            validated: value,
        }))
    }

    submitForm(event) {
        const form = event.currentTarget
        event.preventDefault()
        event.stopPropagation()

        if (form.checkValidity() === true)
            this.props.onSubmitForm(this.state.book)
        else
            this.setValidated(true);
    }

    render() {
        return(
            <Form className='p-lg-4' noValidate validated={this.state.validated} onSubmit={this.submitForm.bind(this)}>
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
                
                <IsOriginalFieldForm
                    reading={this.props.reading}
                    name='is_original'
                    handleFieldChange={this.handleFieldChange.bind(this)}
                    defaultValue={this.state.book.fields.is_original['es-MX']}
                />

                <GeneralFieldForm
                    reading={this.props.reading}
                    name='title'
                    type= 'text'
                    handleFieldChange={this.handleFieldChange.bind(this)}
                    defaultValue={this.state.book.fields.title['es-MX']}
                />

                <GeneralFieldForm
                    hidden={this.props.reading}
                    reading={this.props.reading}
                    name='cover'
                    label='URL Cover'
                    type='text'
                    placeholder='enter an URL'
                    handleFieldChange={this.handleFieldChange.bind(this)}
                    defaultValue={this.state.book.fields.cover['es-MX']}

                />

                <ArrayFieldForm
                    name='authors'
                    book={this.state.book}
                    handleFieldChange={this.handleFieldChange.bind(this)}
                    reading={this.props.reading}
                />

                <ArrayFieldForm
                    name='narrators'
                    book={this.state.book}
                    handleFieldChange={this.handleFieldChange.bind(this)}
                    reading={this.props.reading}
                />

                <GeneralFieldForm
                    reading={this.props.reading}
                    name='street_date'
                    type='date'
                    placeholder='mm/dd/yyyy'
                    handleFieldChange={this.handleFieldChange.bind(this)}
                    feedbackInvalid='please enter a valid date'
                    defaultValue={this.state.book.fields.street_date['es-MX']}
                />

                <GeneralFieldForm
                    reading={this.props.reading}
                    name='cost_per_play'
                    type='number'
                    handleFieldChange={this.handleFieldChange.bind(this)}
                    defaultValue={this.state.book.fields.cost_per_play['es-MX']}
                />

                <GeneralFieldForm
                    reading={this.props.reading}
                    name='duration'
                    type='number'
                    handleFieldChange={this.handleFieldChange.bind(this)}
                    defaultValue={this.state.book.fields.duration['es-MX']}
                />

                {this.props.children}
            </Form>
        )
    }
}

export default AudioContentForm