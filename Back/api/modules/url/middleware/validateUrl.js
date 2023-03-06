const util = require('util')
const urlExists = util.promisify(require('url-exists'))

module.exports = async (req, res, next) => {
  try {
    const { fullURL } = req.body

    const isExist = await urlExists(fullURL)

    if (!isExist) {
      return res.send(400, {
        code: 'NOT_EXIST',
        message: 'URL not exist, try again',
        type: 'failure'
      })
    }
    return next()
  } catch (error) {
    return next(error)
  }
}
