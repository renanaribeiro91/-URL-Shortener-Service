const util = require('util')
const urlExists = util.promisify(require('url-exists'))
const { NOT_EXIST } = require('../../../shared/enum/ErrorEnum')

module.exports = async (req, res, next) => {
  try {
    const { fullURL } = req.body

    const isExist = await urlExists(fullURL)

    if (!isExist) {
      return res.send(400, NOT_EXIST)
    }
    return next()
  } catch (error) {
    return next(error)
  }
}
