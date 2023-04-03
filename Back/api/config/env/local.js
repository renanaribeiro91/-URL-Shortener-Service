module.exports = {
  app: {
    name: 'encurtador-url',
    baseRoute: '/api',
    port: process.env.PORT,
    baseUrl: process.env.BASEURL
  },
  environment: {
    name: 'local'
  },
  db: {
    mongodb: {
      app: {
        url:'mongodb+srv://encurtador-url:encurtador-url@encurtador-url.z0dssrd.mongodb.net/test',
        options: {
          minPoolSize: 5,
          maxPoolSize: 10,
          useNewUrlParser: true,
          useUnifiedTopology: true
        },
        name: 'test'
      }
    }
  },

  cors: { 
    preflightMaxAge: 5,
    origins: ['*'],
    allowHeaders: ['*'],
    exposeHeaders: []
  },
  log: {
    debug: false,
    bunyan: {
      name: 'Application',
      streams: [
        {
          "level": "debug",
          "stream": "process.stdout"
      }
      ]
    }
  },
  authorization: {
    enabled: true,
    basic: {
      users: [
        {
          username: process.env.AUTH_USER,
          password: process.env.AUTH_PASS
        }
      ]
    }
  },
  origin: {
    ignoreExact: ['/'],
    ignore: ['/doc/', '/api/indice-erros'],
    require: {
      application: false,
      channel: false,
      device: false
    }
  },
}

