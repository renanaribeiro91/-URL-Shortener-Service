const { BaseRepository } = require('simple-node-framework').Base
const UrlModel = require('../model/url').default

class UrlRepository extends BaseRepository {
  constructor() {
    super({ module: UrlRepository.name })
    this.urlModel = UrlModel
  }

  async getByHash(hash) {
    return this.urlModel.findOne({ hash })
  }

  async getByFullUrl(fullURL) {
    return this.urlModel.findOne({ fullURL })
  }

  async create({ fullURL, hash, shortURL }) {
    return this.urlModel.create({ fullURL, hash, shortURL })
  }

  async update({ hash, fullURL }) {
    return this.urlModel.findOneAndUpdate(
      { hash },
      { fullURL },
      { returnOriginal: false }
    )
  }

  async delete(hash) {
    return this.urlModel.findOneAndRemove({ hash })
  }
}

module.exports = UrlRepository
