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

        const { originalUrl } = req.body;

        try {
            this.log.debug(`Loading customer [${originalUrl}]`);

            const customer = await this.service.start(originalUrl);

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

        const { originalUrl } = req.params;

        try {
            this.log.debug(`Buscando original URl [${originalUrl}]`);

            const url = await this.service.getUrl(originalUrl);

            if (url) res.redirect(200, url);
            else res.send(404);

            return next();
        } catch (error) {
            this.log.error('Erro ao buscar URL', error);
            res.send(500, 'Unexpected error');
            return next();
        }
    }
}

module.exports = Controller;
