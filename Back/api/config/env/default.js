module.exports = {
    app: {
        name: 'encurtador-url',
        baseRoute: '/api',
        port: 8091
    },
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
                    username: 'process.env.SAMPLE_USER',
                    password: 'process.env.SAMPLE_PASS'
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
