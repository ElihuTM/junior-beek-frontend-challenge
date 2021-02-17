import React from 'react'
import Form from 'react-bootstrap/Form'

const GeneralFieldForm = (props) => {

    const firstLetterLower = props.name.charAt(0).toUpperCase() + props.name.slice(1)
    const format1 = firstLetterLower.replace(/\_/g, '')
    const format2 = firstLetterLower.replace(/\_/g, ' ')
    
    let defaultValue
    if(props.type === 'number' )
        defaultValue = props.defaultValue ? props.defaultValue : 0
    else
        defaultValue = props.defaultValue

    return (
        <Form.Group controlId={`form${format1}`}>
            <Form.Label className='h6' hidden={props.hidden || false}> {props.label || format2} </Form.Label>
            <Form.Control 
                type={props.type} placeholder={props.placeholder || `enter ${format2}`} required 
                name={props.name} readOnly={props.reading || false} plaintext={props.reading || false}
                defaultValue={defaultValue} hidden={props.hidden || false}
                onChange={event => props.handleFieldChange(event.target.name, event.target.value, props.type)}
            />
            <Form.Control.Feedback>{props.feedback || 'Looks good!'}</Form.Control.Feedback>
            <Form.Control.Feedback type="invalid">
                {props.feedbackInvalid || `please, enter the ${props.name}`}
            </Form.Control.Feedback>
        </Form.Group>
    )
}

export default GeneralFieldForm