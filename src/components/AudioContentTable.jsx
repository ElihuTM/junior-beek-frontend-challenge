import React from 'react'
import Table from 'react-bootstrap/Table'
import AudioContentItem from './AudioContentItem'
import loading from '../assets/statics/loading.gif'
import '../assets/styles/components/AudioContentTable.scss'

const AudioContentTable = ({audioContent, deleteAudioContent, updateAudioContent, setModalShow}) => {
    let table
    if(audioContent)
        table = (
            <Table striped bordered hover>
                <thead className='text-center'>
                    <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Authors</th>
                        <th>Narrators</th>
                        <th>Full Description</th>
                    </tr>
                </thead>
                <tbody>
                    {audioContent.items.map((book,idx) =>
                        <AudioContentItem
                            key={book.sys.id}
                            idx={idx+1} 
                            deleteAudioContent={deleteAudioContent}
                            updateAudioContent={updateAudioContent}
                            setModalShow={setModalShow}
                            book={book}
                        />
                    )}
                </tbody>
            </Table>
        )
    else
        table = <img 
            src={loading}
            className='loading__img'
            alt="Loading..."
        />

    return (
        <main className='container'>
            <p className='grey-color mb-1'> {audioContent.total ? audioContent.total : 0} entries found </p>
            {table}
        </main>
    )
}
export default AudioContentTable