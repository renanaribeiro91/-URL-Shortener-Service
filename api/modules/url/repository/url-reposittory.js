const { BaseRepository } = require('simple-node-framework').Base;
const { UrlModel } = require('../model/url');


class UrlRepository extends BaseRepository {
    constructor() {
        super({ module: UrlRepository.name });
        this.UrlModel = new UrlModel().db
    }

    async findFullUrl(fullUrl) {
        this.log.debug(`Iniciando a busca da url [${fullUrl}]`);
        return this.UrlModel.findOne({fullUrl });
    }

    async findHash(hash) {
        this.log.debug(`Iniciando a busca da url [${hash}]`);
        return this.UrlModel.findOne({hash });
    }

    async create(fullUrl,shortUrl) {
        this.log.debug(`Iniciando a criação da URL [${fullUrl}]`);
        return this.UrlModel.create({ fullUrl ,shortUrl});
    }
}

module.exports = UrlRepository;
