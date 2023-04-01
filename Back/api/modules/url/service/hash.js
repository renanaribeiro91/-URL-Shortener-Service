const { BaseService } = require('simple-node-framework').Base;
const { nanoid } = require('nanoid');
const UrlRepository = require('../repository/url-reposittory.js');


class HashService extends BaseService {
    constructor() {
        super({ module: HashService.name });
        this.urlRepository = new UrlRepository()
    }

    async generateHash() {
        return nanoid(5);       
    }

    async getUrlByHash(hash) {
        return this.urlRepository.getByHash(hash)
    }    
}

module.exports = HashService;
