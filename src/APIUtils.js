class APIUtils {
    constructor() {
        this.API_TOKEN = 'CFPAT-LBtveUvtDi7YjAhsyNzZURthngcrVnIr53eOZjYnxuc'
        this.SPACE_ID = '1t4hjzo7y0kb'
        this.ENVIRONMENT = 'master'
        this.CONTENT_TYPE_ID = 'audiocontent-v19'

        this.BASE_URL = 'https://api.contentful.com'
        this.URL = `${this.BASE_URL}/spaces/${this.SPACE_ID}/environments/${this.ENVIRONMENT}/entries`
    }

    getSearchAudioBooksConfig(searchString) {
        const API = `${this.URL}?query=${searchString}&select=fields,sys.id&locale=es-MX&content_type=${this.CONTENT_TYPE_ID}`
        const API_CONFIG = {
            "method": "GET",
            "headers": {
                "Authorization" : `Bearer ${this.API_TOKEN}`
            }
        }

        return [API, API_CONFIG]
    }

    getSingleAudioBookConfig(objectId) {
        const API = `${this.URL}?sys.id=${objectId}&select=fields,sys.id,sys.version&locale=es-MX`
        const API_CONFIG = {
            "method": "GET",
            "headers": {
                "Authorization" : `Bearer ${this.API_TOKEN}`
            }
        }

        return [API, API_CONFIG]
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

    getUpdateAudioBookConfig(data, objectId, version) {
        const book = JSON.stringify(data)
        const API = `${this.URL}/${objectId}`
        const API_CONFIG = {
            "method": "PUT",
            "body": book,
            "headers": {
                "Authorization" : `Bearer ${this.API_TOKEN}`,
                "X-Contentful-Content-Type": `${this.CONTENT_TYPE_ID}`,
                "X-Contentful-Version":  version
            }
        }

        return [API, API_CONFIG]
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

    static getDate(string) {
        const date = new Date(string)
        const dd = String(date.getDate()).padStart(2, '0');
        const mm = String(date.getMonth() + 1).padStart(2, '0');
        const yyyy = date.getFullYear();

        return yyyy + '-' + mm + '-' + dd;
    }

    static getDuration(number) {
        const date = new Date(number*1000)
        const hours = String(date.getUTCHours()).padStart(2, '0')
        const minutes = String(date.getUTCMinutes()).padStart(2, '0')
        const seconds = String(date.getSeconds()).padStart(2, '0')

        return `${hours}h ${minutes}m ${seconds}s` 
    }
}

export default APIUtils