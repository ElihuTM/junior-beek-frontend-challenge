import { useState, useEffect } from 'react'

const useInitialState = (API_URL, CONFIG) => {
    const [audioBooks, setAudioBooks] = useState({done: false, list: {}})
  
    useEffect(() => {
      fetch(API_URL, CONFIG)
        .then((response) => response.json())
        .then((data) => setAudioBooks({done: true, list: data}));
    }, [])
  
    return audioBooks
  }
  
  export default useInitialState