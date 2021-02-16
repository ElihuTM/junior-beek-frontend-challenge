import React from 'react'
import { Row, Form, Button, FormControl, Col, Container } from 'react-bootstrap'
import APIUtils from '../APIUtils'
import AddAudioContent from './AddAudioContent'

class Bar extends React.Component{
    constructor(props) {
        super(props)
        this.state = {
            searchString: '',
        }
    }

    handleSearchfield(text) {
        this.setState({ searchString: text })
    }

    filterContent() {
        const api = new APIUtils()
        const [API, API_CONFIG] = api.getSearchAudioBooksConfig(this.state.searchString)
        
        fetch(API, API_CONFIG)
        .then(response => response.json())
        .catch(error => console.error(error))
        .then(data => console.log(data))

        this.setState({ searchString: '' })
    }

    render() {
        return (
            <Container>
                <Row className="justify-content-md-around">
                    <Col md={8} className='text-left ml-xs-0'>
                        <Form inline>
                            <FormControl type="text" placeholder="Search" className="col-8 mr-sm-0" 
                                onChange={this.handleSearchfield.bind(this)}
                            />
                            <Button variant="outline-success" onClick={this.filterContent.bind(this)}> Search </Button>
                        </Form>
                    </Col>
                    <Col md={3} className='text-right mr-xs-0'>
                        <AddAudioContent addAudioContent={this.props.addAudioContent}/>
                    </Col>
                </Row>
            </Container>
        )
    }
}

export default Bar