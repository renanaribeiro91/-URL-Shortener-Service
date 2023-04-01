const UNEXPECTED_ERROR = {
  code: 'UNEXPECTED',
  message: 'Unexpected Error',
  status: 500
}

const NOT_FOUND = {
  code: 'NOT_FOUND',
  message: 'Cannot find URL this hash'
}

const NOT_GENERATE = {
  code: 'NOT_GENERATE',
  message: 'URL already exists'
}

const NOT_EXIST = {
  code: 'NOT_EXIST',
  message: 'URL not exist, try again',
  type: 'failure'
}

module.exports = {
  UNEXPECTED_ERROR,
  NOT_FOUND,
  NOT_GENERATE,
  NOT_EXIST
}