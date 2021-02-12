import 'reactjs-popup/dist/index.css'

import React from 'react'
import Popup from 'reactjs-popup'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'

const AddBook = () => (
    <Container>
        <Popup trigger={<Button variant='alert' className='btn-outline-success'> Add Audiocontent </Button>} modal>
            <input type="text" name="input" id="input"/>
        </Popup>
    </Container>
)

export default AddBook
