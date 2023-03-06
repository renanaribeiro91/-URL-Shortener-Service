const { BaseClass } = require('simple-node-framework').Base
const {
  UNEXPECTED_ERROR,
  NOT_FOUND,
  NOT_GENERATE
} = require('../enum/ErrorEnum')

class HandleError extends BaseClass {
  constructor(className) {
    super({
      module: HandleError.name
    })
    this.className = className
  }

  handleControllerError(method, res, next, error) {
    this.log.error(`Erro em [${this.className}] [${method}]`, error)

    if (method === 'generate') {
      const code = !error ? NOT_GENERATE.code : UNEXPECTED_ERROR.code
      const message = !error ? NOT_GENERATE.message : UNEXPECTED_ERROR.message
      const status = !error ? NOT_GENERATE.status : UNEXPECTED_ERROR.status

      res.send(status, { code, message })

      return next()
    }

    const code = !error ? NOT_FOUND.code : UNEXPECTED_ERROR.code
    const message = !error ? NOT_FOUND.message : UNEXPECTED_ERROR.message
    const status = !error ? NOT_FOUND.status : UNEXPECTED_ERROR.status

    res.send(status, { code, message })

    return next()
  }
}

module.exports = { HandleError }
