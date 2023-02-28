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


  describe.only('get', () => {
    it.only('Should reply 200 when success.', async () => {
      const sut = makeSUT()

      const send = sandbox.spy()
      const next = sandbox.spy()

      const req = {
        params: 'fakeHash'
      }

      const result = {
        fullURL:'www.fakeURL.com'
      }

      sandbox.stub(sut.Urlservice, 'get').resolves(result)

      await sut.get(req, { send }, next)

      const status = send.args[0][0]
      const body = send.args[0][1]

      expect(status).to.be.eq(200)
      expect(body).to.be.deep.eq(result)
    })

    it('Should reply 404 when hash not founded.', async () => {
      const sut = makeSUT()

      const send = sandbox.spy()
      const next = sandbox.spy()

      const req = {
        params: 'fakeHash'
      }

      sandbox.stub(sut.service, 'get').resolves(null)

      await sut.get(req, { send }, next)

      const status = send.args[0][0]
      const body = send.args[0][1]

      expect(status).to.be.eq(404)
      expect(body).to.be.deep.eq({
        code: 'NOT_FOUND',
        message: 'Not found'
      })
    })

    it('Should reply 500 when unexpected error.', async () => {
      const sut = makeSUT()

      const send = sandbox.spy()
      const next = sandbox.spy()

      sandbox.stub(sut.service, 'get').rejects(new Error('any_value'))

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

  describe('update', () => {
    it('Should reply 200 when success.', async () => {
      const sut = makeSUT()

      const send = sandbox.spy()
      const next = sandbox.spy()


      const req = {
        params: {hash:'fakeHash'},
        body: {fullURL: 'fakeURL'}
      }

      const result = {
        fullURL:'www.fakeURL.com'
      }

      sandbox.stub(sut.service, 'update').resolves(result)

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
        params: {hash:'fakeHash'},
        body: {fullURL: 'fakeURL'}
      }

      sandbox.stub(sut.service, 'update').resolves(null)

      await sut.update(req, { send }, next)

      const status = send.args[0][0]
      const body = send.args[0][1]

      expect(status).to.be.eq(404)
      expect(body).to.be.deep.eq({ message: 'Key not exists' })
    })

    it('Should reply 500 unexpected error.', async () => {
      const sut = makeSUT()

      const send = sandbox.spy()
      const next = sandbox.spy()

      const req = {
        params: {hash:'fakeHash'},
        body: {fullURL: 'fakeURL'}
      }

      sandbox.stub(sut.service, 'update').rejects(new Error('any_error'))

      await sut.update(req, { send }, next)

      const status = send.args[0][0]
      const body = send.args[0][1]

      expect(status).to.be.eq(500)
      expect(body).to.be.deep.eq({
        message: 'Unexpected error'
      })
    })
  })

  describe('create', () => {
    it('Should reply 201 when success.', async () => {
      const sut = makeSUT()

      const send = sandbox.spy()
      const next = sandbox.spy()

      const req = {
        params: {hash:'fakeHash'},
        body: {fullURL: 'fakeURL'}
      }

      const result = {
        fullURL:'www.fakeURL.com'
      }

      sandbox.stub(sut.service, 'create').resolves(result)

      await sut.create(req, { send }, next)

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
        params: {hash:'fakeHash'},
        body: {fullURL: 'fakeURL'}
      }

      sandbox.stub(sut.service, 'create').resolves(null)

      await sut.create(req, { send }, next)

      const status = send.args[0][0]
      const body = send.args[0][1]

      expect(status).to.be.eq(400)
      expect(body.message).to.be.eq('Key already exists')
    })

    it('Should reply 500 unexpected error.', async () => {
      const sut = makeSUT()

      const send = sandbox.spy()
      const next = sandbox.spy()

      const req = {
        params: {hash:'fakeHash'},
        body: {fullURL: 'fakeURL'}
      }

      sandbox.stub(sut.service, 'create').rejects(new Error('any_error'))

      await sut.create(req, { send }, next)

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
        params: {hash:'fakeHash'},
        body: {fullURL: 'fakeURL'}
      }

      sandbox.stub(sut.service, 'delete').resolves(result)

      await sut.delete(req, { send }, next)

      const status = send.args[0][0]

      expect(status).to.be.eq(202)
    })

    it('Should reply 404 when hash not founded.', async () => {
      const sut = makeSUT()

      const send = sandbox.spy()
      const next = sandbox.spy()

      const req = {
        params: {hash:'fakeHash'},
        body: {fullURL: 'fakeURL'}
      }
      sandbox.stub(sut.service, 'delete').resolves(null)

      await sut.delete(req, { send }, next)

      const status = send.args[0][0]
      const body = send.args[0][1]

      expect(status).to.be.eq(404)
      expect(body.message).to.be.deep.eq('Key not exists')
    })

    it('Should reply 500 when unexpected error.', async () => {
      const sut = makeSUT()

      const send = sandbox.spy()
      const next = sandbox.spy()

      sandbox.stub(sut.service, 'delete').rejects(new Error('any_value'))

      const req = {
        params: {hash:'fakeHash'},
        body: {fullURL: 'fakeURL'}
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
