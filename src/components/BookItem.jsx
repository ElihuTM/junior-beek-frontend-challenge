import React from 'react'
import Button from 'react-bootstrap/Button'

const BookItem = (properties) => (
    <div className='list-group-item BookItem'>
        <div className='row'>
            <p className='col'> name: {properties.fields.title['es-MX']}</p>
            <div className='col'>
                <p> authors:</p>
                <ul >
                    {properties.fields.authors['es-MX'].map(author => <li key={author}> {author} </li>)}
                </ul>
            </div>
            <div className='col'>
                <p> narrators: </p>
                <ul>
                    {properties.fields.narrators['es-MX'].map(narrator => <li key={narrator}> {narrator} </li>)}
                </ul>
            </div>
            <Button className='col m-5'> Description </Button>
            <Button className='col m-5'> Update </Button>
        </div>
    </div>
)

export default BookItem