const { BaseService } = require('simple-node-framework').Base
const { config } = require('simple-node-framework').Singleton
const UrlRepository = require('../repository/url-reposittory')
const HashService = require('./hash')

class UrlService extends BaseService {
  constructor() {
    super({ module: UrlService.name })
    this.baseUrl = config.app.baseUrl
    this.urlRepository = new UrlRepository()
    this.hashService = new HashService()
  }

  async get(hash) {
    try {
      const url = await this._getUrl(hash)
      this._incrementHitsClick(url)

      return this._urlData(url)
    } catch (error) {
      return error
    }
  }

  async generate(fullURL) {
    const generateEndPoint = true

    try {
      const urlExist = await this._getUrl({}, fullURL, generateEndPoint)
      if (urlExist) {
        return null
      }

      const url = await this._create(fullURL)

      return this._urlData(url)
    } catch (error) {
      return error
    }
  }

  async update(hash, fullURL) {
    try {
      const urlExist = await this._getUrl(hash)
      if (!urlExist) {
        return null
      }

      const url = await this.urlRepository.update({ hash, fullURL })

      return this._urlData(url)
    } catch (error) {
      return error
    }
  }

  async delete(hash) {
    try {
      const urlExist = await this._getUrl(hash)
      if (!urlExist) {
        return null
      }

      return this.urlRepository.delete(hash)
    } catch (error) {
      return error
    }
  }

  _getUrl(hash, fullURL, generateEndPoint = false) {
    if (generateEndPoint) {
      return this.urlRepository.getByFullUrl(fullURL)
    }
    return this.hashService.getUrlByHash(hash)
  }

  async _create(fullURL) {
    const hash = await this.hashService.generateHash()
    const shortURL = this._generateShortURL(hash)

    return await this.urlRepository.create({ fullURL, hash, shortURL })
  }

  _generateShortURL(hash) {
    return `${this.baseUrl}/api/url/${hash}`
  }

  _urlData(url) {
    if (!url) return null
    return {
      fullURL: url.fullURL,
      shortURL: url.shortURL
    }
  }

  _incrementHitsClick(url) {
    if (!url) return null

    url.clicks++
    return url.save()
  }
}

module.exports = UrlService
