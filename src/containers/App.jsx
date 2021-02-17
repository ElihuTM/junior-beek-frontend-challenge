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
            audioContentFiltered: false,
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
            audioContentFiltered: data,
        }))
    }

    addAudioContent(book) {
        this.setState(prevState => ({
            ...prevState,
            audioContent: {
                ...prevState.audioContent,
                total: prevState.audioContent.total + 1,   
                items: [book, ...prevState.audioContent.items]
            },
            audioContentFiltered: {
                ...prevState.audioContentFiltered,
                total: prevState.audioContentFiltered.total + 1,
                items: [book, ...prevState.audioContentFiltered.items]
            },
        }))
    }
    
    deleteAudioContent(id) {
        this.setState(prevState => ({
            ...prevState,
            audioContent: {
                ...prevState.audioContent,
                total: prevState.audioContent.total - 1,
                items: prevState.audioContent.items.filter(
                    book => book.sys.id != id
                )
            },
            audioContentFiltered: {
                ...prevState.audioContentFiltered,
                total: prevState.audioContentFiltered.total - 1,
                items: prevState.audioContentFiltered.items.filter(
                    book => book.sys.id != id
                )
            }
        }))
    }

    filterContent(data) {
        this.setState( prevState => ({
            ...prevState,
            audioContentFiltered: data,
        }))
    }

    resetFilter() {
        this.setState(prevState => ({
            ...prevState,
            audioContentFiltered: prevState.audioContent
        }))
    }

    updateAudioContent(id, data) {
        this.setState(prevState => ({
            ...prevState,
            audioContent: {
                ...prevState.audioContent,
                items: prevState.audioContent.items.map(
                    book => book.sys.id === id ? data : book
                )
            },
            audioContentFiltered: {
                ...prevState.audioContentFiltered,
                items: prevState.audioContentFiltered.items.map(
                    book => book.sys.id === id ? data : book
                )
            }
        }))
    }

    render() {
        return (
            <div className='App'>
                <Header />
                <Bar
                    addAudioContent={this.addAudioContent.bind(this)}
                    filterContent={this.filterContent.bind(this)}
                    resetFilter={this.resetFilter.bind(this)}
                    audioContent={this.state.audioContent}
                    audioContentFiltered={this.state.audioContentFiltered}
                />
                <hr/>
                <AudioContentTable 
                    audioContent={this.state.audioContentFiltered}
                    deleteAudioContent={this.deleteAudioContent.bind(this)}
                    updateAudioContent={this.updateAudioContent.bind(this)}
                />
            </div>
        )
    }
}

export default App