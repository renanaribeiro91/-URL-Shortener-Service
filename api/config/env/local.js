module.exports = {
    app: {
        name: 'encurtador-url',
        baseRoute: '/api',
        port: process.env.PORT,
        baseUrl: `http://localhost:${process.env.PORT}`
    },
    db: {
        mongodb: {
            app: {
                url: process.env.DB_MONGODB_HOST,
                options: {
                    minPoolSize: 5,
                    maxPoolSize: 10,
                    useNewUrlParser: true,
                    useUnifiedTopology: true
                },
                name: process.env.DB_MONGODB_NAME,

            }
        } },
    cors: {
        preflightMaxAge: 5,
        origins: [
            '*'
        ],
        allowHeaders: [
            'x-origin-channel',
            'x-origin-application',
            'x-origin-device',
            'x-identifier'
        ],
        exposeHeaders: []
    },
    log: {
        debug: true,
        bunyan: {
            name: 'Application',
            streams: [
                {
                    level: 'debug',
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
                    username: process.env.AUTH_USER,
                    password: process.env.AUTH_PASS
                }
            ]
        }
    },
    origin: {
        ignoreExact: [
            '/'
        ],
        ignore: [
            '/doc/'
        ],
        require: {
            application: true,
            channel: true,
            device: false
        }
    }
};
