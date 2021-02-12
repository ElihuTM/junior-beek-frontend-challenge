import React from 'react'
import Header from '../components/Header'
import BookItem from '../components/BookItem'
import BookContainer from '../components/BookContainer'
import AddBook from '../components/AddBook'
import useInitialState from '../hooks/useInitialState'

const API_TOKEN = 'CFPAT-LBtveUvtDi7YjAhsyNzZURthngcrVnIr53eOZjYnxuc'
const SPACE_ID = '1t4hjzo7y0kb'
const ENVIRONMENT = 'master'
const CONTENT_TYPE_ID = 'audiocontent-v19'

const API_URL = `https://api.contentful.com/spaces/${SPACE_ID}/environments/${ENVIRONMENT}/entries?select=fields,sys.id,sys.version&locale=es-MX&content_type=${CONTENT_TYPE_ID}`
const API_CONFIG = {
    "method":"GET",
    "headers": {
        "Authorization" : `Bearer ${API_TOKEN}`
    }
}

const App = () => {
    const initialState = useInitialState(API_URL, API_CONFIG)

    return (
        <div className='App'>
            <Header />
            
            <div>
                <AddBook />
            </div>
            <hr />
            <main className='container'>
                <BookContainer >
                    {initialState.done
                    ? (
                            initialState.list.items.map((book, id) => <BookItem key={book.sys.id} {...book}/>)
                    ) : (
                        <h1>Cargando resultados...</h1>
                    )}
                </BookContainer>
            </main>
        </div>
    )
}

export default App