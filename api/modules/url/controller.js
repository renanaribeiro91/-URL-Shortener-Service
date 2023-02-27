const { BaseController } = require('simple-node-framework').Base;
const UrlService = require('./service/url-service.js');

// sample controller
class UrlController extends BaseController {
    constructor() {
        super({module: UrlController.name});
        this.urlService = new UrlService();
    }

    

    async get(req, res, next) {
        super.activateRequestLog(req);

        const { hash } = req.params;

        try {
            this.log.debug(`Iniciando a busca da original URl com a hash :[${hash}]`);

            const url = await this.urlService.getUrl(hash);

            if (url) return res.send(200, url);
            res.send(404, { code: 'NOT_FOUND', message: 'Cannot find URL this hash' });

            return next();
        } catch (error) {
            this.log.error('Erro ao buscar URL', error);
            res.send(500, 'Unexpected error');
            return next();
        }
    }

    async generate(req, res, next) {
      super.activateRequestLog(req);

      const { fullUrl } = req.body;

      try {
          const url = await this.urlService.createShortUrl(fullUrl);

          if (url) return res.send(200, url); 
          res.send(400, { message: 'URL already exists' })          

          return next();
      } catch (error) {
          this.log.error('Unexpected error on load', error);
          res.send(500, 'Unexpected error');
          return next();
      }
  }

    async update(req, res, next) {
        super.activateRequestLog(req)
    
        const { hash } = req.params;
        const { fullUrl } = req.body;
    
        try {
        
          const url = await this.service.update(hash, fullUrl)
    
          if (url) {
            res.send(200, url)
          } else {
            res.send(404, { code: 'NOT_FOUND', message: 'Cannot find URL this hash' });
          }
    
          return next()
        } catch (error) {
          this.log.error('Erro inesperado ao Atualizar', error)
          res.send(500, { message: 'Unexpected error' })
          return next()
        }
      }
    
      async delete(req, res, next) {
        super.activateRequestLog(req)
    
        const { hash } = req.params;
    
        try {
    
          const url = await this.service.delete(hash)
    
          if (url) {
            res.send(202)
          } else {
            res.send(404, { code: 'NOT_FOUND', message: 'Cannot find URL this hash' });
          }
    
          return next()
        } catch (error) {
          this.log.error('Erro inesperado ao Deletar', error)
          res.send(500, { message: 'Unexpected error' })
          return next()
        }
      }
}

module.exports = UrlController;
