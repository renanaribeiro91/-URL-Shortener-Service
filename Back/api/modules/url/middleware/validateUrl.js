const util = require('util')
const urlExists = util.promisify(require('url-exists'))
const { NOT_EXIST } = require('../../../shared/enum/ErrorEnum')

const checkUrlExistsMiddleware = async (req, res, next) => {
  try {
    const isExist = await urlExists(req.body.fullURL)

    if (!isExist) {
      return res.status(400).send(NOT_EXIST)
    }

    return next()
  } catch (error) {
    return next(error)
  }
}

module.exports = checkUrlExistsMiddleware
