module.exports = {
  app: {
    name: 'encurtador-url',
    baseRoute: '/api',
    port: 8090,
    baseUrl: `http://localhost:${8090}`
  },
  db: {
    mongodb: {
      app: {
        url: 'mongodb://localhost:27017/encurtador-url-testing',
        name: 'desafio-encurtador-url-testing'
      }
    }
  },
  cors: {
    preflightMaxAge: 5,
    origins: ['*'],
    allowHeaders: [
      'x-origin-channel',
      'x-origin-application',
      'x-origin-device',
      'x-identifier'
    ],
    exposeHeaders: []
  },
  log: {
    debug: false,
    bunyan: {
      name: 'Application',
      streams: [
        {
          level: 'info',
          type: 'rotating-file',
          path: 'logs/{hostname}.log',
          period: '1d',
          count: 2
        }
      ]
    }
  },
  authorization: {
    enabled: true,
    basic: {
      users: [
        {
          username: 'process.env.SAMPLE_USER',
          password: 'process.env.SAMPLE_PASS'
        }
      ]
    }
  },
  origin: {
    ignoreExact: ['/'],
    ignore: ['/doc/'],
    require: {
      application: true,
      channel: true,
      device: false
    }
  }
}
