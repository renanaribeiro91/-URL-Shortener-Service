const { BaseRepository } = require('simple-node-framework').Base
const UrlModel = require('../model/url')

class UrlRepository extends BaseRepository {
  constructor() {
    super({ module: UrlRepository.name })
    this.urlModel = UrlModel
  }

  async getHash(hash) {
    return this.urlModel.findOne({ hash })
  }

  async getFullUrl(fullURL) {
    return this.urlModel.findOne({ fullURL })
  }

  async create(data) {
    const { fullURL, hash, shortURL } = data

    return this.urlModel.create({ fullURL, hash, shortURL })
  }

  async update(data) {
    const { hash, fullURL } = data

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
