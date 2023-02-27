const { BaseRepository } = require('simple-node-framework').Base;
const { UrlModel } = require('../model/url');


class UrlRepository extends BaseRepository {
    constructor() {
        super({ module: UrlRepository.name });
        this.UrlModel = new UrlModel().db
    }

    async getHash(hash) {
        this.log.debug(`Iniciando a busca da hash [${hash}]`);
        return this.UrlModel.findOne({hash });
    }  
    
    async getUrl(fullURL) {
        this.log.debug(`Iniciando a busca da url [${fullURL}]`);
        return this.UrlModel.findOne({fullURL });
    }

    async create(fullURL,hash,shortURL) {
        this.log.debug(`Iniciando a criação da URL [${fullURL}]`);
        return this.UrlModel.create({ fullURL ,hash,shortURL});
    }

    async delete(hash) {
        this.log.debug(`Iniciando a remoção da URL [${fullURL}]`);
        await this.UrlModel.findOneAndRemove({hash})
      }

    async set(fullURL,hash) {
        this.log.debug(`Iniciando a atualização da URL [${fullURL}]`);
        await this.UrlModel.updateOne({ fullURL ,hash})
      }
}

module.exports = UrlRepository;
