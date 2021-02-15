import React from 'react'
import Form from 'react-bootstrap/Form'

const GeneralFieldForm = ({
    controlId,
    label,
    type,
    placeholder,
    name,
    feedback,
    feedbackInvalid,
    readOnly = false,
    plaintext = false,
    defaultValue = '',
    handleInputChange,
}) => (
    <Form.Group controlId={controlId}>
        <Form.Label className='h6'> {label} </Form.Label>
        <Form.Control 
            type={type} placeholder={placeholder} required 
            name={name} readOnly={readOnly} plaintext={plaintext}
            defaultValue={defaultValue} onChange={handleInputChange}
        />
        <Form.Control.Feedback>{feedback}</Form.Control.Feedback>
        <Form.Control.Feedback type="invalid">
            {feedbackInvalid}
        </Form.Control.Feedback>
    </Form.Group>
)

export default GeneralFieldForm