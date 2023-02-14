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

    async start(originalUrl) {
        this.log.debug(`[${originalUrl}]`);

        return this.processUrl(originalUrl);
    }

    async processUrl(originalUrl) {
        const urlIdCode = nanoid(5);
        try {
            const shortUrl = `${this.baseUrl}/${urlIdCode}`;   
            const teste = await this.urlRepository.create(originalUrl,urlIdCode)
            return shortUrl
        } catch (error) {
            this.log.error('Unexpected error', error);
            return error;
        }
    }
}

module.exports = UrlService;
