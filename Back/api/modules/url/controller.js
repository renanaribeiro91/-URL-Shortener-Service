const { BaseController } = require('simple-node-framework').Base
const UrlService = require('./service/url-service.js')
const { HandleError } = require('../../shared/helpers/handlerError.js')
const { NOT_FOUND, NOT_GENERATE } = require('../../shared/enum/ErrorEnum.js')

class UrlController extends BaseController {
  constructor() {
    super({ module: UrlController.name })
    this.urlService = new UrlService()
    this.handle = new HandleError(UrlController.name)
  }

  async get(req, res, next) {
    super.activateRequestLog(req)

    const { hash } = req.params

    try {
      this.log.debug(`Iniciando a busca da original URl com a hash:[${hash}]`)
      const url = await this.urlService.get(hash)
      if (url) return res.send(url.fullURL, next)
      res.send(404, NOT_FOUND)
      return next()
    } catch (error) {
      return this.handle.handleControllerError('get', res, next, error)
    }
  }

  async generate(req, res, next) {
    super.activateRequestLog(req)

    const { fullURL } = req.body

    try {
      this.log.debug(`Iniciando a geração da URl curta:[${fullURL}]`)
      const url = await this.urlService.generate(fullURL)
      if (url) return res.send(201, url)
      res.send(409, NOT_GENERATE)
      return next()
    } catch (error) {
      return this.handle.handleControllerError('generate', res, next, error)
    }
  }

  async update(req, res, next) {
    super.activateRequestLog(req)

    const { hash } = req.params
    const { fullURL } = req.body

    try {
      this.log.debug(
        `Iniciando a atualização da original URl com a hash:[${hash}]`
      )
      const url = await this.urlService.update(hash, fullURL)
      if (url) return res.send(200, url)

      res.send(404, NOT_FOUND)
      return next()
    } catch (error) {
      return this.handle.handleControllerError('update', res, next, error)
    }
  }

  async delete(req, res, next) {
    super.activateRequestLog(req)

    const { hash } = req.params

    try {
      this.log.debug(`Iniciando a remoção da original URl com a hash:[${hash}]`)
      const url = await this.urlService.delete(hash)
      if (url) return res.send(202)

      res.send(404, NOT_FOUND)
      return next()
    } catch (error) {
      return this.handle.handleControllerError('delete', res, next, error)
    }
  }
}

module.exports = UrlController
