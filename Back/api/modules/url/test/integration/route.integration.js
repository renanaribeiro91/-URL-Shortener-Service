/* eslint-disable global-require */
const nock = require('nock')
const supertest = require('supertest')
const { expect } = require('chai')
const { config } = require('simple-node-framework').Singleton

const { onDbConnected } = require('../../../../shared/tests/test-helper')

function callGetAPI(server, hash) {
  return supertest(server)
    .get(`/api/url/${hash}`)
    .set('x-origin-application', 'integration-test')
    .set('x-origin-channel', 'integration-test')
    .redirects(1)
}

function callPostAPI(server, body) {
  return supertest(server)
    .post('/api/url/generate')
    .send(body)
    .set('x-origin-application', 'integration-test')
    .set('x-origin-channel', 'integration-test')
}

function callUpdateAPI(server, hash, body) {
  return supertest(server)
    .put(`/api/url/${hash}`)
    .send(body)
    .set('x-origin-application', 'integration-test')
    .set('x-origin-channel', 'integration-test')
}

function callDeleteAPI(server, hash) {
  return supertest(server)
    .del(`/api/url/${hash}`)
    .set('x-origin-application', 'integration-test')
    .set('x-origin-channel', 'integration-test')
}

const getUrlModel = () => {
  return require('../../model/url')
}

describe('Integration -> URL', () => {
  let server

  beforeEach(done => {
    onDbConnected('mongo').then(async () => {
      const urlModel = getUrlModel()

      await urlModel.deleteMany({})

      done()
    })

    server = require('../../../../../index')
  })

  afterEach(() => {
    nock.cleanAll()
    server.close()
  })

  describe('GET /:hash', () => {
    it('Should returns url with success.', async () => {
      await getUrlModel().create({
        fullURL: 'www.fakeURL.com',
        shortURL: 'www.fakeURL.com/abc123',
        hash: 'abc123'
      })

      const hash = 'abc123'

      const { status, body } = await callGetAPI(server, hash)

      expect(status).is.eq(200)

      expect(body).to.contain('www.fakeURL.com')
    })

    it('Should returns 404 if url not exist.', async () => {
      await getUrlModel().create({
        fullURL: 'www.fakeURL.com',
        shortURL: 'www.fakeURL.com/abc123',
        hash: 'abc123'
      })

      const hash = 'abc123_other'

      const { status, body } = await callGetAPI(server, hash)

      expect(status).is.eq(404)
      expect(body).to.be.deep.eq({
        code: 'NOT_FOUND',
        message: 'Cannot find URL this hash'
      })
    })
  })

  describe('POST /generate', () => {
    it('Should generate shortURL with success.', async () => {
      const { status, body } = await callPostAPI(server, {
        fullURL: 'https://www.youtube.com'
      })
      const hash = body.shortURL.substr(22)
      const baseURL = config.app.baseUrl

      expect(status).is.eq(201)
      expect(body).to.be.deep.eq({
        fullURL: 'https://www.youtube.com',
        shortURL: `${baseURL}/${hash}`
      })
    })

    it('Should returns 400 if url already exist.', async () => {
      await getUrlModel().create({
        fullURL: 'https://www.youtube.com',
        shortURL: 'www.fakeURL.com/abc123',
        hash: 'abc123'
      })

      const { status, body } = await callPostAPI(server, {
        fullURL: 'https://www.youtube.com'
      })

      expect(status).is.eq(409)
      expect(body).to.be.deep.eq({
        code: 'NOT_GENERATE',
        message: 'URL already exists'
      })
    })
  })

  describe('UPDATE /url', () => {
    it('Should update url with success.', async () => {
      await getUrlModel().create({
        fullURL: 'https://www.youtube.com',
        shortURL: 'www.fakeURL.com/abc123',
        hash: 'abc123'
      })

      const hash = 'abc123'

      const { status, body } = await callUpdateAPI(server, hash, {
        fullURL: 'https://www.youtube.com/watch?v=crkg70WiA7A'
      })

      expect(status).is.eq(200)
      expect(body).to.be.deep.eq({
        fullURL: 'https://www.youtube.com/watch?v=crkg70WiA7A',
        shortURL: 'www.fakeURL.com/abc123'
      })
    })

    it('Should returns 404 if url not exist.', async () => {
      await getUrlModel().create({
        fullURL: 'https://www.youtube.com',
        shortURL: 'www.fakeURL.com/abc123',
        hash: 'abc123'
      })

      const hash = 'abc123_other'

      const { status, body } = await callUpdateAPI(server, hash, {
        fullURL: 'https://www.youtube.com/watch?v=crkg70WiA7A'
      })

      expect(status).is.eq(404)
      expect(body).to.be.deep.eq({
        code: 'NOT_FOUND',
        message: 'Cannot find URL this hash'
      })
    })
  })

  describe('DELETE /url', () => {
    it('Should delete user with success.', async () => {
      await getUrlModel().create({
        fullURL: 'https://www.youtube.com',
        shortURL: 'www.fakeURL.com/abc123',
        hash: 'abc123'
      })

      const hash = 'abc123'

      const { status } = await callDeleteAPI(server, hash)

      expect(status).is.eq(202)
    })

    it('Should returns 404 if key not exist.', async () => {
      await getUrlModel().create({
        fullURL: 'https://www.youtube.com',
        shortURL: 'www.fakeURL.com/abc123',
        hash: 'abc123'
      })

      const hash = 'abc123_other'

      const { status, body } = await callDeleteAPI(server, hash)

      expect(status).is.eq(404)
      expect(body).to.be.deep.eq({
        code: 'NOT_FOUND',
        message: 'Cannot find URL this hash'
      })
    })
  })
})
