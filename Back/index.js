require('dotenv').config({ path: `./.env.${process.env.NODE_ENV}` });

const customServer = require('./api/config/custom-server');

const { server, baseServer: restify } = customServer;

// serving the swagger documentation
// http://localhost:8091/doc/
server.get(
    '/doc/*',
    restify.plugins.serveStatic({
        directory: __dirname,
        default: 'index.html'
    })
);

module.exports = server;
