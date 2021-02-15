import {useState, useEffect} from 'react'

const useInitialState = (API_URL, CONFIG) => {
    const [audioContent, setAudioContent] = useState(false)
  
    useEffect(() => {
      fetch(API_URL, CONFIG)
        .then((response) => response.json())
        .catch(error => console.error(error))
        .then((data) => setAudioContent(data))
    }, [])
  
    return [audioContent, setAudioContent]
  }
  
  export default useInitialState