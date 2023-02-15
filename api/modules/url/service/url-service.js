const { BaseService } = require('simple-node-framework').Base;
const { nanoid } = require('nanoid');
const { config } = require('simple-node-framework').Singleton;

const UrlRepository = require('../repository/url-reposittory');


// sample service
class UrlService extends BaseService {
    constructor() {
        super({ module: UrlService.name });
        this.urlRepository = new UrlRepository();
        this.baseUrl = config.app.baseUrl;
    }

    async getUrl(hash) {
        this.log.debug(`[${hash}]`);

        try {
            const url = await this.urlRepository.findHash(hash);
            if(!url) return
            return url.fullUrl

        } catch (error) {
            this.log.error('Unexpected error', error);
            return error;
        }
    }

    async start(fullUrl) {
        this.log.debug(`[${fullUrl}]`);

        return this.processUrl(fullUrl);
    }

    async processUrl(fullUrl) {
        const HASH = nanoid(5);
        const SHORTURL = `${this.baseUrl}/${HASH}`;

        try {            
            const url = await this.urlRepository.findFullUrl(fullUrl)

            if(url) return url.fullUrl

            await this.urlRepository.create(fullUrl,HASH)

            return SHORTURL
        } catch (error) {
            this.log.error('Unexpected error', error);
            return error;
        }
    }
    
}

module.exports = UrlService;
