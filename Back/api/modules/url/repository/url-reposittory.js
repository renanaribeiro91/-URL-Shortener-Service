const { BaseRepository } = require('simple-node-framework').Base
const UrlModel = require('../model/url')

class UrlRepository extends BaseRepository {
  constructor() {
    super({ module: UrlRepository.name })
    this.urlModel = UrlModel
  }

  async getHash(hash) {
    this.log.debug(`Buscando a hash: [${hash}]`)
    return this.urlModel.findOne({ hash })
  }

  async getFullUrl(fullURL) {
    this.log.debug(`Buscando a URL: [${fullURL}]`)
    return this.urlModel.findOne({ fullURL })
  }

  async create(data) {
    const {fullURL, hash, shortURL} = data
    this.log.debug(`Criando a URL: [${fullURL}]`)
    return this.urlModel.create({ fullURL, hash, shortURL })
  }

  async update(data) {
    const {hash, fullURL} = data    
    this.log.debug(`Atualizando a URL: [${fullURL}]`)

    return this.urlModel.findOneAndUpdate(
      { hash },
      { fullURL },
      { returnOriginal: false }
    )
  }

  async delete(hash) {
    this.log.debug(`Removendo a URL com a hash: [${hash}]`)
    return this.urlModel.findOneAndRemove({ hash })
  }
}

module.exports = UrlRepository
