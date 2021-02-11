import React from 'react'
import '../assets/styles/App.scss'

class App extends React.Component {
    constructor() {
        super();
        this.state = { 
            done: false,
            data: {}
        };
        this.credentials = {
            API_TOKEN: 'CFPAT-LBtveUvtDi7YjAhsyNzZURthngcrVnIr53eOZjYnxuc',
            SPACE_ID: '1t4hjzo7y0kb',
            ENVIRONMENT: 'master',
            CONTENT_TYPE_ID: 'audiocontent-v19'
        }
    }


    componentDidMount() {
        const { API_TOKEN, SPACE_ID, ENVIRONMENT, CONTENT_TYPE_ID } = this.credentials
        fetch(
            `https://api.contentful.com/spaces/${SPACE_ID}/environments/${ENVIRONMENT}/entries?select=fields,sys.id,sys.version&locale=es-MX&content_type=${CONTENT_TYPE_ID}`, {
                "method":"GET",
                "headers": {
                    "Authorization" : `Bearer ${API_TOKEN}`
                }
            }
        )
        .then(result=>result.json())
        .then(data=>this.setState({
            done: true,
            data
        }))
    }

    render() {
        return (
            <div>
                {this.state.done ? (
                    <h1> {this.state.data.total} </h1>
                ) : (
                    <p>Cargando resultados...</p>
                )}
            </div>
        )
    }
}

export default App