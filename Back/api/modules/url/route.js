const { ControllerFactory } = require('simple-node-framework');
const { route } = require('simple-node-framework').Singleton;
const server = require('../../../index');
const UrlController = require('./controller');
const validateURL = require('./middleware/validateUrl');


const { full } = route.info(__filename);

server.get(`${full}/:hash`, ControllerFactory.build(UrlController, 'get'));
server.post(`${full}/generate`, ControllerFactory.build(UrlController, 'generate'));
server.put(`${full}/:hash`, ControllerFactory.build(UrlController, 'update'));
server.del(`${full}/:hash`, ControllerFactory.build(UrlController, 'delete'));
