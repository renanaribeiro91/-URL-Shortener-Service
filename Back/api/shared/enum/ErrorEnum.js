module.exports = {
  UNEXPECTED_ERROR: {
    code: 'UNEXPECTED',
    message: 'Unexpected Error',
    status: 500
  },
  NOT_FOUND: {
    code: 'NOT_FOUND',
    message: 'Cannot find URL this hash',
    status: 404
  },
  NOT_GENERATE:{
    code: 'NOT_GENERATE',
    message: 'URL already exists',
    status: 400
  }
}
