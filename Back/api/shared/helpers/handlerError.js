const { BaseClass } = require('simple-node-framework').Base
const { UNEXPECTED_ERROR } = require('../../shared/enum/ErrorEnum')
class HandleError extends BaseClass {
  constructor(className) {
    super({
      module: HandleError.name
    })
    this.className = className
  }

  handleControllerError(method, res, next, error) {
    this.log.error(`Erro em [${this.className}] [${method}]`, error)

    const code = error instanceof Error && UNEXPECTED_ERROR.code
    const message = error instanceof Error && UNEXPECTED_ERROR.message
    const status = error instanceof Error && UNEXPECTED_ERROR.status

    res.send(status, { code, message })

    return next()
  }
}

module.exports = { HandleError }
