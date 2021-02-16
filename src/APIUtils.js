import React from 'react'
import {useEffect, useState} from 'react'

class APIUtils {
    constructor() {
        this.API_TOKEN = 'CFPAT-LBtveUvtDi7YjAhsyNzZURthngcrVnIr53eOZjYnxuc'
        this.SPACE_ID = '1t4hjzo7y0kb'
        this.ENVIRONMENT = 'master'
        this.CONTENT_TYPE_ID = 'audiocontent-v19'

        this.BASE_URL = 'https://api.contentful.com'
        this.URL = `${this.BASE_URL}/spaces/${this.SPACE_ID}/environments/${this.ENVIRONMENT}/entries`
    }

    callAPI(API, API_CONFIG, observerState) {
        useEffect(() => {
          fetch(API, API_CONFIG)
            .then((response) => response.json())
            .catch(error => console.error(error))
            .then((data) => observerState(data))
        }, [])
    }

    getSearchAudioBooksConfig(searchString) {
        const API = `${this.URL}?query=${searchString}&select=fields,sys.id&locale=es-MX`
        const API_CONFIG = {
            "method": "GET",
            "headers": {
                "Authorization" : `Bearer ${this.API_TOKEN}`
            }
        }

        return [API, API_CONFIG]
    }

    searchAudioBooks(searchString, observerState) {
        const [API, API_CONFIG] = this.getSearchAudioBooksConfig(searchString)
        this.callAPI(API, API_CONFIG, observerState)
    }

    getSingleAudioBook(objectId, observerState) {
        const API = `${this.URL}?sys.id=${objectId}&select=fields,sys.id,sys.version&locale=es-MX`
        const API_CONFIG = {
            "method": "GET",
            "headers": {
                "Authorization" : `Bearer ${this.API_TOKEN}`
            }
        }

        this.callAPI(API, API_CONFIG, observerState)
    }

    getRetrieveAudioBooksConfig() {
        const API = `${this.URL}?select=fields,sys.id,sys.version&locale=es-MX&content_type=${this.CONTENT_TYPE_ID}`
        const API_CONFIG = {
            "method": "GET",
            "headers": {
                "Authorization" : `Bearer ${this.API_TOKEN}`
            }
        }
        return [API, API_CONFIG]
    }

    retrieveAudioBooks (observerState) {
        const [API, API_CONFIG] = this.getRetrieveAudioBooksConfig()
        this.callAPI(API, API_CONFIG, observerState)
    }

    getDeleteAudioBookConfig(objectId) {
        const API = `${this.URL}/${objectId}`
        const API_CONFIG = {
            "method": "DELETE",
            "body": "",
            "headers": {
                "Authorization" : `Bearer ${this.API_TOKEN}`
            }
        }
        return [API, API_CONFIG]
    }
    
    deleteAnAudioBook(objectId, observerState) {
        const [API, API_CONFIG] = this.getDeleteAudioBookConfig(objectId)
        this.callAPI(API, API_CONFIG, observerState)
        
    }
    
    updateAudioBook(data, objectId, version, observerState) {
        const book = JSON.stringify(data)
        const API = `${this.URL}/${objectId}`
        const API_CONFIG = {
            "method": "POST",
            "body": book,
            "headers": {
                "Authorization" : `Bearer ${this.API_TOKEN}`,
                "X-Contentful-Content-Type": `${this.CONTENT_TYPE_ID}`,
                "X-Contentful-Version":  version
            }
        }

        this.callAPI(API, API_CONFIG, observerState)
    }

    getCreateAudioBookConfig(data) {
        const book = JSON.stringify(data)
        const API = this.URL
        const API_CONFIG = {
            "method": "POST",
            "body": book,
            "headers": {
                "Authorization" : `Bearer ${this.API_TOKEN}`,
                "X-Contentful-Content-Type": `${this.CONTENT_TYPE_ID}`
            }
        }

        return [API, API_CONFIG]
    }

    createAudioBook(data, observerState) {
        const [API, API_CONFIG] = this.getCreateAudioBookConfig(data)
        this.callAPI(API, API_CONFIG, observerState)
    }

    static getBookBody() {
        return { 
            fields: {
                "title": {
                    "es-MX": ''
                },
                "is_original": {
                    "es-MX": false
                },
                "street_date": {
                    "es-MX": ''
                },
                "cost_per_play": {
                    "es-MX": 0
                },
                "authors": {
                    "es-MX": []
                },
                "narrators": {
                    "es-MX": []
                },
                "duration": {
                    "es-MX": 0
                },
                "cover": {
                    "es-MX": ''
                }
            }
        }
    }
}

export default APIUtils