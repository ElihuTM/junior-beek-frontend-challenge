import React from 'react'
import AudioContentDescription from './AudioContentDescription'

const AudioContentItem = (audioContent) => (
    <tr>
        <td > {audioContent.idx} </td>
        <td > {audioContent.fields.title['es-MX']} </td>
        <td >
            <ul >
                {audioContent.fields.authors['es-MX'].map(
                    author => <li key={author}> {author} </li>
                )}
            </ul>
        </td>
        <td >
            <ul>
                {audioContent.fields.narrators['es-MX'].map(
                    narrator => <li key={narrator}> {narrator} </li>
                )}
            </ul>
        </td>
        <td>
            <AudioContentDescription {...audioContent}/>
        </td>
    </tr>
)

export default AudioContentItem