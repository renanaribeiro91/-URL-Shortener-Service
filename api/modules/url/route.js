const { ControllerFactory } = require('simple-node-framework');
const { route } = require('simple-node-framework').Singleton;
const server = require('../../../index');
const Controller = require('./controller');
const validateURL = require('./middleware/validateUrl');


// retreive route information
// ex: { baseRoute: '/api', module: 'customer', full: '/api/customer' }
const { full } = route.info(__filename);

server.get(`${full}/:hash`, ControllerFactory.build(Controller, 'getUrl'));

server.post(full, validateURL, ControllerFactory.build(Controller, 'startUrl'));
