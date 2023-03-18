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
      this.log.error('Erro inesperado', error)
      return error
    }
  }

  async generate(fullURL) {
    const generateEndPoint = true

    try {
      const urlExist = await this._getUrl({}, fullURL, generateEndPoint)
      if (urlExist) {
        this.log.debug(`URL já existente em nossa base de dados`)
        return null
      }

      const url = await this._create(fullURL)
      this.log.debug(`URL criada em nossa base de dados :[${fullURL}]`)
      return this._urlData(url)
    } catch (error) {
      this.log.error('Erro inesperado', error)
      return error
    }
  }

  async update(hash, fullURL) {
    try {
      const urlExist = await this._getUrl(hash)
      if (!urlExist) {
        this.log.debug(`URL não encontrada com a hash de:[${hash}]`)
        return null
      }

      const data = { hash, fullURL }
      const url = await this.urlRepository.update(data)
      this.log.debug(`URL atualizada em nossa base de dados :${fullURL}`)

      return this._urlData(url)
    } catch (error) {
      this.log.error('Erro inesperado', error)
      return error
    }
  }

  async delete(hash) {
    try {
      const urlExist = await this._getUrl(hash)
      if (!urlExist) {
        this.log.debug(`URL não encontrada com a hash de:[${hash}]`)
        return null
      }

      return this.urlRepository.delete(hash)
    } catch (error) {
      this.log.error('Erro inesperado', error)
      return error
    }
  }

  _getUrl(hash, fullURL, generateEndPoint = false) {
    if (generateEndPoint) {
      return this.urlRepository.getFullUrl(fullURL)
    }
    return this.hashService.getUrlByHash(hash)
  }

  async _create(fullURL) {
    const hash = await this.hashService.generateHash()
    const shortURL = this._generateShortURL(hash)
    const data = { fullURL, hash, shortURL }

    return this.urlRepository.create(data)
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
