import React from 'react'
import AudioContentDescription from '../containers/AudioContentDescription'
import shortid from 'shortid'

const AudioContentItem = ({idx, deleteAudioContent, book}) => (
    <tr>
        <td > {idx} </td>
        <td > {book.fields.title['es-MX']} </td>
        <td >
            <ul >
                {book.fields.authors['es-MX'].map(
                    author => <li key={shortid.generate()}> {author} </li>
                )}
            </ul>
        </td>
        <td >
            <ul>
                {book.fields.narrators['es-MX'].map(
                    narrator => <li key={shortid.generate()}> {narrator} </li>
                )}
            </ul>
        </td>
        <td>
            <AudioContentDescription 
                book={book}
                deleteAudioContent={deleteAudioContent}
            />
        </td>
    </tr>
)

export default AudioContentItem