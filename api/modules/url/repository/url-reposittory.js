const { BaseRepository } = require('simple-node-framework').Base
const { UrlModel } = require('../model/url')

class UrlRepository extends BaseRepository {
  constructor() {
    super({ module: UrlRepository.name })
    this.UrlModel = new UrlModel().db
  }

  async getHash(hash) {
    this.log.debug(`Buscando a hash: [${hash}]`)
    return this.UrlModel.findOne({ hash })
  }

  async getUrl(fullURL) {
    this.log.debug(`Buscando a url: [${fullURL}]`)
    return this.UrlModel.findOne({ fullURL })
  }

  async create(fullURL, hash, shortURL) {
    this.log.debug(`Criando a URL: [${fullURL}]`)
    return this.UrlModel.create({ fullURL, hash, shortURL })
  }

  async update(hash, fullURL) {
    this.log.debug(`Atualizando a URL: [${fullURL}]`)
    return this.UrlModel.findOneAndUpdate({ hash, fullURL })
  }

  async delete(hash, fullURL) {
    this.log.debug(`Removendo a URL: [${fullURL}]`)
    return this.UrlModel.findOneAndRemove({ hash, fullURL })
  }
}

module.exports = UrlRepository
