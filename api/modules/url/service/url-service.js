const { BaseService } = require('simple-node-framework').Base;
const { config } = require('simple-node-framework').Singleton;
const UrlRepository = require('../repository/url-reposittory');
const HashService = require('../../helpers/HashService.js')


class UrlService extends BaseService {
    constructor() {
        super({ module: UrlService.name });
        this.urlRepository = new UrlRepository();
        this.baseUrl = config.app.baseUrl;
        this.hashService = new HashService()
    }

    async getUrl(hash) {
        try {
            const url = await this.hashService.getUrlByHash(hash);
            if(!url) {
              this.log.debug(`URL não encontrada com a hash de:[${hash}]`);
              return null
            }
            this.log.debug(`Busca de URL realizada:[${url.fullURL}]`);
            return url.fullURL

        } catch (error) {
            this.log.error('Erro inesperado', error);
            return error;
        }
    }


    async createshortURL(fullURL) {
          const hash = await this.hashService.generateHash()
          const shortURL = await this.generateshortURL(hash)    
       try {
          const urlExist = await this.getUrl(fullURL)
          if (urlExist) {
            this.log.debug(`URL existente`);
            return null
          }
          await this.urlRepository.create(fullURL, hash, shortURL)  
            return shortURL        
      }  catch (error) {
            this.log.error('Erro inesperado', error);
            return error;        
      }     
    }

    async update(fullURL, hash) {
          const urlExist = await this.urlRepository.getHash(hash)

          if (!urlExist) return null

            return await this.urlRepository.update(fullURL, hash)
    }

    async delete(fullURL, hash) {
        const urlExist = await this.urlRepository.getHash(hash)

        if (!urlExist) return null

        return this.urlRepository.delete(fullURL, hash)
     }

    async getUrl(fullURL) {
      return this.urlRepository.getUrl(fullURL)
    }

    async generateshortURL(hash) {
      return `${this.baseUrl}/${hash}`;
    } 

    
}

module.exports = UrlService;
