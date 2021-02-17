import React from 'react'
import {Alert} from 'react-bootstrap'

const LimitWarnig = (props) => (
    <Alert show={props.limit === props.total} variant="danger"  dismissible>
        <Alert.Heading>Upss! You have many books :c</Alert.Heading>
        <p>
            You won't be able to add more books unless you delete someone of your list
        </p>
    </Alert>
)


export default LimitWarnig