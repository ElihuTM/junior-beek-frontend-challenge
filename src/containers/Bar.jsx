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
                <Row>
                    <Col xs={12} md={8} className='mb-2'>
                        <Form inline>
                            <FormControl className='col-10' type="text" placeholder="Search" 
                                onChange={this.handleSearchfield.bind(this)} value={this.state.searchString}
                            />
                            <Button className='col-2' variant="warning" onClick={this.filterContent.bind(this)}> 
                                <i className="fas fa-search"></i>
                            </Button>
                        </Form>
                    </Col>
                    <Col xs={12} md={2} className='mb-2'>
                        <Button variant='warning' onClick={this.props.resetFilter} disabled={
                            this.props.audioContent.total === this.props.audioContentFiltered.total
                        } block> 
                            Reset Filter
                        </Button>
                    </Col>
                    <Col xs={12} md={2} className='mb-2'>
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