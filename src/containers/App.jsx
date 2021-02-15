import React from 'react'
import Header from '../components/Header'
import AudioContentContainer from '../components/AudioContentContainer'
import AddAudioContent from '../components/add-audio-content-form/AddAudioContent'
import useInitialState from '../hooks/useInitialState'
import APIConfig from '../hooks/APIConfig'

const App = () => {
    const apiConfig = new APIConfig()

    const [audioContents, setAudioContents] = useInitialState(
        apiConfig.RETRIEVE_API_URL, 
        apiConfig.getRetrieveAPIConfig()
    )
    
    return (
        <div className='App'>
            <Header />
            <div>
                <AddAudioContent audioContents={audioContents} setAudioContents={setAudioContents}/>
            </div>
            <hr />
            <AudioContentContainer audioContents={audioContents} />
        </div>
    )
}

export default App