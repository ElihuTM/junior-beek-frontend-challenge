import React from 'react'
import { Row, Form, Button, FormControl, Col, Container } from 'react-bootstrap'
import APIUtils from '../APIUtils'
import AddAudioContent from './AddAudioContent'
import LimitWarnig from '../components/LimitWarning'

class Bar extends React.Component{
    constructor(props) {
        super(props)
        this.state = {
            searchString: '',
        }
    }

    handleSearchfield(event) {
        this.setState({ searchString: event.target.value })
    }

    filterContent() {
        const api = new APIUtils()
        const [API, API_CONFIG] = api.getSearchAudioBooksConfig(this.state.searchString)
        
        this.props.filterContent(false)
        
        fetch(API, API_CONFIG)
        .then(response => response.json())
        .catch(error => console.error(error))
        .then(data => this.props.filterContent(data))

        this.setState({searchString: ''})

    }

    render() {
        return (
            <Container>
                <LimitWarnig
                    limit={this.props.audioContent.limit ? this.props.audioContent.limit : 100}
                    total={this.props.audioContent.total}
                />
                <Row className="justify-content-md-around">
                    <Col md={7} className='text-left ml-xs-0'>
                        <Form inline>
                            <FormControl type="text" placeholder="Search" className="col-10 mr-sm-0" 
                                onChange={this.handleSearchfield.bind(this)} value={this.state.searchString}
                            />
                            <Button variant="warning" onClick={this.filterContent.bind(this)}> Search </Button>
                        </Form>
                    </Col>
                    <Col className='ml-xs-0'>
                        <Button variant='warning' onClick={this.props.resetFilter} disabled={
                            this.props.audioContent.total === this.props.audioContentFiltered.total
                        }> 
                            Reset Filter
                        </Button>
                    </Col>
                    <Col className='text-right mr-xs-0'>
                        <AddAudioContent 
                            addAudioContent={this.props.addAudioContent}
                            setModalShow={this.props.setModalShow}
                            limit={this.props.audioContent.limit}
                            total={this.props.audioContent.total}
                        />
                    </Col>
                </Row>
            </Container>
        )
    }
}

export default Bar