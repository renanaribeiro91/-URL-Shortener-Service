const { BaseClass } = require('simple-node-framework').Base
const { UNEXPECTED_ERROR } = require('../../shared/enum/ErrorEnum')

class HandleError extends BaseClass {
  constructor(className) {
    super({ module: HandleError.name })
    this.className = className
  }

  handleControllerError(method, res, next, error) {
    this.log.error(`Erro em [${this.className}] [${method}]`, error)

    const { code, message, status } = UNEXPECTED_ERROR

    res.send(status, { code, message })

    return next()
  }
}

module.exports = { HandleError }
