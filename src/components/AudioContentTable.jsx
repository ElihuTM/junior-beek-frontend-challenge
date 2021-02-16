import React from 'react'
import Table from 'react-bootstrap/Table'
import AudioContentItem from './AudioContentItem'

const AudioContentTable = ({audioContent, deleteAudioContent}) => (
    <main className='container'>
        <p className='grey-color mb-1'> {audioContent.total} entries found </p>
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
                {audioContent ? (
                    audioContent.items.map((book,idx) => 
                        <AudioContentItem
                            key={book.sys.id}
                            idx={idx+1} 
                            deleteAudioContent={deleteAudioContent}
                            book={book}
                        />
                    )
                ) : (
                    <tr><td className='h1'>Cargando resultados...</td></tr>
                )}
            </tbody>
        </Table>
    </main>
)

export default AudioContentTable