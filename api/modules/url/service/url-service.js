const { BaseService } = require('simple-node-framework').Base
const { config } = require('simple-node-framework').Singleton
const UrlRepository = require('../repository/url-reposittory')
const HashService = require('../../../shared/helpers/Utils/Hash.js')

class UrlService extends BaseService {
  constructor() {
    super({ module: UrlService.name })
    this.baseUrl = config.app.baseUrl
    this.urlRepository = new UrlRepository()
    this.hashService = new HashService()
  }

  async get(hash) {
    try {
      const urlExist = await this.hashService.getUrlByHash(hash)
      if (!urlExist) {
        this.log.debug(`URL não encontrada com a hash de:[${hash}]`)
        return null
      }
      this.log.debug(`Busca de URL realizada:[${urlExist.fullURL}]`)
      return urlExist.fullURL
    } catch (error) {
      this.log.error('Erro inesperado', error)
      return error
    }
  }

  async create(fullURL) {
    const hash = await this.hashService.generateHash()
    const shortURL = await this.generateshortURL(hash)

    try {
      const urlExist = await this.urlRepository.getUrl(fullURL)
      if (urlExist) {
        this.log.debug(`URL existente`)
        return null
      }
      await this.urlRepository.create(fullURL, hash, shortURL)
      return shortURL
    } catch (error) {
      this.log.error('Erro inesperado', error)
      return error
    }
  }

  async update(hash, fullURL) {
    try {
      const urlExist = await this.hashService.getUrlByHash(hash)

      if (!urlExist) {
        this.log.debug(`URL não encontrada com a hash de:[${hash}]`)
        return null
      }
      return this.urlRepository.update(hash, fullURL)
    } catch (error) {
      this.log.error('Erro inesperado', error)
      return error
    }
  }

  async delete(hash, fullURL) {
    try {
      const urlExist = await this.hashService.getUrlByHash(hash)

      if (!urlExist) {
        this.log.debug(`URL não encontrada com a hash de:[${hash}]`)
        return null
      }
      return this.urlRepository.delete(hash, fullURL)
    } catch (error) {
      this.log.error('Erro inesperado', error)
      return error
    }
  }

  async generateshortURL(hash) {
    return `${this.baseUrl}/${hash}`
  }
}

module.exports = UrlService
