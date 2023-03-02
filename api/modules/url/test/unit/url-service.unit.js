const { expect, use } = require('chai')
const sandbox = require('sinon').createSandbox()
const sinonChai = require('sinon-chai')
const UrlService = require('../../service/url-service')
const { config } = require('simple-node-framework').Singleton

use(sinonChai)

const makeSUT = () => {
  return new UrlService()
}

describe('Services -> UrlService', () => {
  beforeEach(() => {
    sandbox.restore()
  })

  describe('get', () => {
    it('Should be get fullURL', async () => {
      const sut = makeSUT()

      const fullURL = 'wwww.fakeURL.com'
      const hash = 'adc123'
      const getMock = {
        fullURL: fullURL
      }

      const urlStub = sandbox
        .stub(sut.hashService, 'getUrlByHash')
        .resolves(getMock)

      const result = await sut.get(hash)

      expect(urlStub.calledOnce).to.be.ok
      expect(result).is.deep.eq('wwww.fakeURL.com')
    })

    it('Should be returns null if not exist hash', async () => {
      const sut = makeSUT()

      const fullURL = 'wwww.fakeURL.com'
      const hash = 'adc123'
      const getMock = {
        fullURL: fullURL
      }

      const urlStub = sandbox
        .stub(sut.hashService, 'getUrlByHash')
        .resolves(null)

      const result = await sut.get(hash)

      expect(urlStub.calledOnce).to.be.ok
      expect(result).is.null
    })

    it('Should be returns err to find hash', async () => {
      const sut = makeSUT()

      const mockError = new Error('Erro ao buscar hash')
      const hash = 'adc123'

      sandbox.stub(sut.hashService, 'getUrlByHash').rejects(mockError)

      try {
        await sut.get(hash)
      } catch (error) {
        expect(error).to.be.deep.eq('Erro ao buscar hash')
      }
    })
  })

  describe('generate', () => {
    it('Should be generate shortURL', async () => {
      const sut = makeSUT()

      const fullURL = 'wwww.fakeURL.com'

      const createMock = {
        fullURL: fullURL
      }

      sandbox.stub(sut.urlRepository, 'getUrl').resolves(null)
      sandbox.stub(sut.urlRepository, 'create').resolves(createMock)

      const result = await sut.generate(fullURL)
      const hash = result.substr(22)
      const baseURL = config.app.baseUrl

      expect(result).is.deep.eq(`${baseURL}/${hash}`)
    })

    it('Should returns null if fullURL already exist', async () => {
      const sut = makeSUT()

      const fullURL = 'wwww.fakeURL.com'

      const getMock = {
        fullURL: fullURL
      }

      sandbox.stub(sut.urlRepository, 'getUrl').resolves(getMock)

      const result = await sut.generate(fullURL)

      expect(result).to.be.null
    })

    it('Should be returns err to find hash', async () => {
      const sut = makeSUT()

      const mockError = new Error('Erro ao buscar URL')
      const fullURL = 'wwww.fakeURL.com'

      sandbox.stub(sut.urlRepository, 'getUrl').rejects(mockError)

      try {
        await sut.generate(fullURL)
      } catch (error) {
        expect(error).to.be.deep.eq('Erro ao buscar URL')
      }
    })
  })

  describe('update', () => {
    it('Should update fullURL', async () => {
      const sut = makeSUT()

      const fullURL = 'wwww.fakeURL.com'
      const newFullURL = 'wwww.newFakeURL.com'
      const hash = 'adc123'

      const getMock = {
        hash: 'adc123'
      }
      const setMock = {
        shortURL: 'wwww.fakeURL.com/adc123',
        fullURL: newFullURL
      }

      sandbox.stub(sut.hashService, 'getUrlByHash').resolves(getMock)
      sandbox.stub(sut.urlRepository, 'update').resolves(setMock)

      const result = await sut.update(hash, fullURL)

      expect(result).is.deep.eq({
        shortURL: 'wwww.fakeURL.com/adc123',
        fullURL: 'wwww.newFakeURL.com'
      })
    })

    it('Should returns null if hash not exist', async () => {
      const sut = makeSUT()

      sandbox.stub(sut.hashService, 'getUrlByHash').resolves(null)

      const fullURL = 'wwww.fakeURL.com'
      const hash = 'adc123'

      const result = await sut.update(hash, fullURL)

      expect(result).to.be.null
    })

    it('Should be returns err to find hash', async () => {
      const sut = makeSUT()

      const mockError = new Error('Erro ao buscar hash')
      const hash = 'adc123'

      sandbox.stub(sut.hashService, 'getUrlByHash').rejects(mockError)

      try {
        await sut.update(hash)
      } catch (error) {
        expect(error).to.be.deep.eq('Erro ao buscar hash')
      }
    })
  })

  describe('delete', () => {
    it('Should be delete fullURL', async () => {
      const sut = makeSUT()

      const fullURL = 'wwww.fakeURL.com'
      const hash = 'adc123'
      const getMock = {
        hash: 'adc123',
        fullURL: fullURL
      }

      sandbox.stub(sut.hashService, 'getUrlByHash').resolves(getMock)
      sandbox.stub(sut.urlRepository, 'delete').resolves(getMock)

      const result = await sut.delete(hash, fullURL)

      expect(result).is.deep.eq(getMock)
    })

    it('Should be returns null if hash not exist', async () => {
      const sut = makeSUT()

      const fullURL = 'wwww.fakeURL.com'
      const hash = 'adc123'

      sandbox.stub(sut.hashService, 'getUrlByHash').resolves(null)

      const result = await sut.delete(hash, fullURL)

      expect(result).to.be.null
    })

    it('Should be returns err to find hash', async () => {
      const sut = makeSUT()

      const mockError = new Error('Erro ao buscar hash')
      const hash = 'adc123'

      sandbox.stub(sut.hashService, 'getUrlByHash').rejects(mockError)

      try {
        await sut.delete(hash)
      } catch (error) {
        expect(error).to.be.deep.eq('Erro ao buscar hash')
      }
    })
  })
})
