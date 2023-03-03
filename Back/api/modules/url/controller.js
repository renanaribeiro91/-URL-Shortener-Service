const { BaseController } = require('simple-node-framework').Base
const UrlService = require('./service/url-service.js')

class UrlController extends BaseController {
  constructor() {
    super({ module: UrlController.name })
    this.urlService = new UrlService()
  }

  async get(req, res, next) {
    super.activateRequestLog(req)
    // this.log.debug(`Iniciando a busca da original URl com a hash:[${hash}]`)

    const { hash } = req.params

    try {
      const url = await this.urlService.get(hash)

      if (url) {
        return res.redirect(url, next)
        
      }
      res.send(404, { code: 'NOT_FOUND', message: 'Cannot find URL this hash' })

      return next()
    } catch (error) {
      this.log.error('Erro ao buscar URL', error)
      res.send(500, {
        message: 'Unexpected error'
      })
      return next()
    }
  }

  async generate(req, res, next) {
    super.activateRequestLog(req)
    // this.log.debug(`Iniciando a geração da URl curta:[${fullURL}]`)

    const { fullURL } = req.body

    try {
      const url = await this.urlService.generate(fullURL)

      if (url) return res.send(201, url)
      res.send(400, { message: 'URL already exists' })

      return next()
    } catch (error) {
      this.log.error('Erro ao gerar url', error)
      res.send(500, {
        message: 'Unexpected error'
      })
      return next()
    }
  }

  async update(req, res, next) {
    super.activateRequestLog(req)
    // this.log.debug(`Iniciando a atualização da original URl com a hash:[${hash}]`)

    const { hash } = req.params
    const { fullURL } = req.body

    try {
      const url = await this.urlService.update(hash, fullURL)

      if (url) {
        res.send(200, url)
      } else {
        res.send(404, {
          code: 'NOT_FOUND',
          message: 'Cannot find URL this hash'
        })
      }

      return next()
    } catch (error) {
      // this.log.error('Erro inesperado ao Atualizar', error)
      res.send(500, { message: 'Unexpected error' })
      return next()
    }
  }

  async delete(req, res, next) {
    super.activateRequestLog(req)
    // this.log.debug(`Iniciando a remoção da original URl com a hash:[${hash}]`)

    const { hash } = req.params

    try {
      const url = await this.urlService.delete(hash)

      if (url) {
        res.send(202)
      } else {
        res.send(404, {
          code: 'NOT_FOUND',
          message: 'Cannot find URL this hash'
        })
      }

      return next()
    } catch (error) {
      // this.log.error('Erro inesperado ao Deletar', error)
      res.send(500, { message: 'Unexpected error' })
      return next()
    }
  }
}

module.exports = UrlController
