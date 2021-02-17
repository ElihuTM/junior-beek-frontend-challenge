import React, {useState} from 'react'
import {Modal, Button} from 'react-bootstrap'
import loading from '../assets/statics/loading.gif'

const LoadingAlert = (props) => {
    return (
        <React.Fragment>
            <Modal
                show={props.modalShow}
                aria-labelledby="contained-modal-title-vcenter"
                centered
                backdrop="static"
            >
                <Modal.Body className='text-center'>
                    <img 
                        src={loading}
                        className='loading__img'
                        alt="Loading..."
                    />
                    <h4>Updating Changes...</h4>
                </Modal.Body>
            </Modal>
        </React.Fragment>
    )
}

export default LoadingAlert