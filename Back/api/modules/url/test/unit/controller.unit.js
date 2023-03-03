const sandbox = require('sinon').createSandbox()
const { expect, use } = require('chai')
const sinonChai = require('sinon-chai')
const UrlController = require('../../controller.js')

const makeSUT = () => new UrlController()

describe('Controllers -> UrlController', () => {
  before(() => {
    use(sinonChai)
  })

  afterEach(() => {
    sandbox.restore()
  })

  describe('get', () => {
    it('Should reply 200 when success.', async () => {
      const sut = makeSUT()

      const next = sandbox.spy()
      const redirect = sandbox.spy()

      const req = {
        params: 'fakeHash'
      }

      const result = {
        fullURL: 'www.fakeURL.com'
      }

      sandbox.stub(sut.urlService, 'get').resolves(result)

      await sut.get(req, { redirect }, next)

      const body = redirect.args[0][0]

      expect(body).to.be.deep.eq(result)
    })

    it('Should reply 404 when hash not founded.', async () => {
      const sut = makeSUT()

      const send = sandbox.spy()
      const next = sandbox.spy()

      const req = {
        params: 'fakeHash'
      }

      sandbox.stub(sut.urlService, 'get').resolves(null)

      await sut.get(req, { send }, next)

      const status = send.args[0][0]
      const body = send.args[0][1]

      expect(status).to.be.eq(404)
      expect(body).to.be.deep.eq({
        code: 'NOT_FOUND',
        message: 'Cannot find URL this hash'
      })
    })

    it('Should reply 500 when unexpected error.', async () => {
      const sut = makeSUT()

      const send = sandbox.spy()
      const next = sandbox.spy()

      sandbox.stub(sut.urlService, 'get').rejects(new Error('any_value'))

      const req = {
        params: 'fakeHash'
      }

      await sut.get(req, { send }, next)

      const status = send.args[0][0]
      const body = send.args[0][1]

      expect(status).to.be.eq(500)
      expect(body).to.be.deep.eq({
        message: 'Unexpected error'
      })
    })
  })

  describe('generate', () => {
    it('Should reply 201 when success.', async () => {
      const sut = makeSUT()

      const send = sandbox.spy()
      const next = sandbox.spy()

      const req = {
        params: { hash: 'fakeHash' },
        body: { fullURL: 'fakeURL' }
      }

      const result = {
        fullURL: 'www.fakeURL.com'
      }

      sandbox.stub(sut.urlService, 'generate').resolves(result)

      await sut.generate(req, { send }, next)

      const status = send.args[0][0]
      const body = send.args[0][1]

      expect(status).to.be.eq(201)
      expect(body).to.be.eq(result)
    })

    it('Should reply 400 when URL already exists.', async () => {
      const sut = makeSUT()

      const send = sandbox.spy()
      const next = sandbox.spy()

      const req = {
        params: { hash: 'fakeHash' },
        body: { fullURL: 'fakeURL' }
      }

      sandbox.stub(sut.urlService, 'generate').resolves(null)

      await sut.generate(req, { send }, next)

      const status = send.args[0][0]
      const body = send.args[0][1]

      expect(status).to.be.eq(400)
      expect(body.message).to.be.eq('URL already exists')
    })

    it('Should reply 500 unexpected error.', async () => {
      const sut = makeSUT()

      const send = sandbox.spy()
      const next = sandbox.spy()

      const req = {
        params: { hash: 'fakeHash' },
        body: { fullURL: 'fakeURL' }
      }

      sandbox.stub(sut.urlService, 'generate').rejects(new Error('any_error'))

      await sut.generate(req, { send }, next)

      const status = send.args[0][0]
      const body = send.args[0][1]

      expect(status).to.be.eq(500)
      expect(body).to.be.deep.eq({
        message: 'Unexpected error'
      })
    })
  })

  describe('update', () => {
    it('Should reply 200 when success.', async () => {
      const sut = makeSUT()

      const send = sandbox.spy()
      const next = sandbox.spy()

      const req = {
        params: { hash: 'fakeHash' },
        body: { fullURL: 'fakeURL' }
      }

      const result = {
        fullURL: 'www.fakeURL.com'
      }

      sandbox.stub(sut.urlService, 'update').resolves(result)

      await sut.update(req, { send }, next)

      const status = send.args[0][0]
      const body = send.args[0][1]

      expect(status).to.be.eq(200)
      expect(body).to.be.eq(result)
    })

    it('Should reply 404 when hash not founded', async () => {
      const sut = makeSUT()

      const send = sandbox.spy()
      const next = sandbox.spy()

      const req = {
        params: { hash: 'fakeHash' },
        body: { fullURL: 'fakeURL' }
      }

      sandbox.stub(sut.urlService, 'update').resolves(null)

      await sut.update(req, { send }, next)

      const status = send.args[0][0]
      const body = send.args[0][1]

      expect(status).to.be.eq(404)
      expect(body).to.be.deep.eq({
        code: 'NOT_FOUND',
        message: 'Cannot find URL this hash'
      })
    })

    it('Should reply 500 unexpected error.', async () => {
      const sut = makeSUT()

      const send = sandbox.spy()
      const next = sandbox.spy()

      const req = {
        params: { hash: 'fakeHash' },
        body: { fullURL: 'fakeURL' }
      }

      sandbox.stub(sut.urlService, 'update').rejects(new Error('any_error'))

      await sut.update(req, { send }, next)

      const status = send.args[0][0]
      const body = send.args[0][1]

      expect(status).to.be.eq(500)
      expect(body).to.be.deep.eq({
        message: 'Unexpected error'
      })
    })
  })

  describe('delete', () => {
    it('Should reply 202 when success.', async () => {
      const sut = makeSUT()

      const send = sandbox.spy()
      const next = sandbox.spy()

      const req = {
        params: { hash: 'fakeHash' },
        body: { fullURL: 'fakeURL' }
      }

      const result = {
        fullURL: 'www.fakeURL.com'
      }

      sandbox.stub(sut.urlService, 'delete').resolves(result)

      await sut.delete(req, { send }, next)

      const status = send.args[0][0]

      expect(status).to.be.eq(202)
    })

    it('Should reply 404 when hash not founded.', async () => {
      const sut = makeSUT()

      const send = sandbox.spy()
      const next = sandbox.spy()

      const req = {
        params: { hash: 'fakeHash' },
        body: { fullURL: 'fakeURL' }
      }
      sandbox.stub(sut.urlService, 'delete').resolves(null)

      await sut.delete(req, { send }, next)

      const status = send.args[0][0]
      const body = send.args[0][1]

      expect(status).to.be.eq(404)
      expect(body.message).to.be.deep.eq('Cannot find URL this hash')
    })

    it('Should reply 500 when unexpected error.', async () => {
      const sut = makeSUT()

      const send = sandbox.spy()
      const next = sandbox.spy()

      sandbox.stub(sut.urlService, 'delete').rejects(new Error('any_value'))

      const req = {
        params: { hash: 'fakeHash' },
        body: { fullURL: 'fakeURL' }
      }

      await sut.delete(req, { send }, next)

      const status = send.args[0][0]
      const body = send.args[0][1]

      expect(status).to.be.eq(500)
      expect(body).to.be.deep.eq({
        message: 'Unexpected error'
      })
    })
  })
})
