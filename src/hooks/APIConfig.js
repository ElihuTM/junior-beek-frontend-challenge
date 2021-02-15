class APIConfig {
    constructor() {
        this.BASE_URL = 'https://api.contentful.com/spaces/'
        this.API_TOKEN = 'CFPAT-LBtveUvtDi7YjAhsyNzZURthngcrVnIr53eOZjYnxuc'
        this.SPACE_ID = '1t4hjzo7y0kb'
        this.ENVIRONMENT = 'master'
        this.CONTENT_TYPE_ID = 'audiocontent-v19'

        this.RETRIEVE_API_URL = `${this.BASE_URL}${this.SPACE_ID}/environments/${this.ENVIRONMENT}/entries?select=fields,sys.id,sys.version&locale=es-MX&content_type=${this.CONTENT_TYPE_ID}`
        this.CREATE_API_URL = `${this.BASE_URL}${this.SPACE_ID}/environments/${this.ENVIRONMENT}/entries`

        this.RETRIEVE_API_CONFIG = {
            "method":"GET",
            "headers": {
                "Authorization" : `Bearer ${this.API_TOKEN}`
            }
        }

        this.CREATE_API_CONFIG = {
            "method": "POST",
            "body": {},
            "headers": {
                "Authorization" : `Bearer ${this.API_TOKEN}`,
                "X-Contentful-Content-Type": `${this.CONTENT_TYPE_ID}`
            }
        }
    }

    getRetrieveAPIConfig() {
        return this.RETRIEVE_API_CONFIG
    }

    getCreateAPIConfig(data) {
        this.CREATE_API_CONFIG.body = JSON.stringify(data)
        return this.CREATE_API_CONFIG
    }

    getFieldsFrame() {
        return  this.ESKELETON
    }
}

export default APIConfig