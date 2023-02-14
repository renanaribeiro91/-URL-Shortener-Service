const { BaseRepository } = require('simple-node-framework').Base;
const { UrlModel } = require('../model/url');


class UrlRepository extends BaseRepository {
    constructor() {
        super({ module: UrlRepository.name });
        this.UrlModel = new UrlModel().db
    }

    async findFullUrl(url) {
        this.log.debug(`Iniciando a busca da url [${url}]`);
        return this.model.findOneAndUpdate({fullUrl: url });
    }

    async create(fullUrl,shortUrl) {
        this.log.debug(`Iniciando a criação da URL [${fullUrl}]`);
        return this.UrlModel.create({ fullUrl: fullUrl , shortUrl:shortUrl});
    }
}

module.exports = UrlRepository;
