const { BaseController } = require('simple-node-framework').Base;
const CustomerService = require('./service/url-service');

// sample controller
class Controller extends BaseController {
    constructor() {
        super({
            module: 'My Sample Controller'
        });
        this.service = new CustomerService();
    }

    async startUrl(req, res, next) {
        super.activateRequestLog(req);

        const { fullUrl } = req.body;

        try {
            this.log.debug(`Loading customer [${fullUrl}]`);

            const customer = await this.service.start(fullUrl);

            res.send(200, customer);


            return next();
        } catch (error) {
            this.log.error('Unexpected error on load', error);
            res.send(500, 'Unexpected error');
            return next();
        }
    }

    async getUrl(req, res, next) {
        super.activateRequestLog(req);

        const { hash } = req.params;

        try {
            this.log.debug(`Buscando original URl [${hash}]`);

            const url = await this.service.getUrl(hash);

            if (url) return res.send(200, url);
            res.send(404, 'Cannot find URL');

            return next();
        } catch (error) {
            this.log.error('Erro ao buscar URL', error);
            res.send(500, 'Unexpected error');
            return next();
        }
    }
}

module.exports = Controller;
