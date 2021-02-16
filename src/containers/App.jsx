import React from 'react'

import Header from '../components/Header'
import AudioContentTable from '../components/AudioContentTable'
import APIUtils from '../APIUtils'
import Bar from './Bar'

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            audioContent: false,
        }
    }

    componentDidMount() {
        const api = new APIUtils()
        const [API, API_CONFIG] = api.getRetrieveAudioBooksConfig()

        fetch(API, API_CONFIG)
        .then(response => response.json())
        .catch(error => console.error(error))
        .then(data => this.setState({
            audioContent: data,
        }))
    }

    addAudioContent(book) {
        this.setState(prevState => ({
            audioContent: {
                ...prevState.audioContent,
                total: prevState.audioContent.total + 1,   
                items: [book, ...prevState.audioContent.items]
            }
        }))
    }
    
    deleteAudioContent(id) {
        this.setState(prevState => ({
            audioContent: {
                ...prevState.audioContent,
                total: prevState.audioContent.total - 1,
                items: prevState.audioContent.items.filter(
                    book => book.sys.id != id
                )
            }
        }))
    }

    filterContent(data) {
        this.setState({
            audioContent: data
        })
    }

    render() {
        return (
            <div className='App'>
                <Header />
                <Bar
                    addAudioContent={this.addAudioContent.bind(this)}
                    filterContent={this.filterContent.bind(this)}
                />
                <hr/>
                <AudioContentTable 
                    audioContent={this.state.audioContent}
                    deleteAudioContent={this.deleteAudioContent.bind(this)}
                />
            </div>
        )
    }
}

export default App