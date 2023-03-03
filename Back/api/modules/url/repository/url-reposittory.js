const { BaseRepository } = require('simple-node-framework').Base
const UrlModel = require('../model/url')

class UrlRepository extends BaseRepository {
  constructor() {
    super({ module: UrlRepository.name })
    this.urlModel = UrlModel
  }

  async getHash(hash) {
    // this.log.debug(`Buscando a hash: [${hash}]`)
    return this.urlModel.findOne({ hash })
  }

  async getUrl(fullURL) {
    // this.log.debug(`Buscando a url: [${fullURL}]`)
    return this.urlModel.findOne({ fullURL })
  }

  async create(fullURL, hash, shortURL) {
    // this.log.debug(`Criando a URL: [${fullURL}]`)
    return this.urlModel.create({ fullURL, hash, shortURL })
  }

  async update(hash, fullURL) {
    // this.log.debug(`Atualizando a URL: [${fullURL}]`)

    return this.urlModel.findOneAndUpdate(
      { hash },
      { fullURL },
      { returnOriginal: false }
    )
  }

  async delete(hash) {
    // this.log.debug(`Removendo a URL: [${fullURL}]`)
    return this.urlModel.findOneAndRemove({ hash })
  }
}

module.exports = UrlRepository
