module.exports = {
  UNEXPECTED_ERROR: {
    code: 'UNEXPECTED',
    message: 'Unexpected Error',
    status: 500
  },
  NOT_FOUND: {
    code: 'NOT_FOUND',
    message: 'Cannot find URL this hash'
  },
  NOT_GENERATE: {
    code: 'NOT_GENERATE',
    message: 'URL already exists'
  },
  NOT_EXIST: {
    code: 'NOT_EXIST',
    message: 'URL not exist, try again',
    type: 'failure'
  }
}
