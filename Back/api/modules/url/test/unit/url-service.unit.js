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
        fullURL: fullURL,
        shortURL: 'wwww.localhost.com/abc123'
      }

      const urlStub = sandbox.stub(sut, '_getUrl').resolves(getMock)
      sandbox.stub(sut, '_incrementHitsClick')

      const result = await sut.get(hash)

      expect(urlStub.calledOnce).to.be.ok
      expect(result).is.deep.eq(getMock)
    })

    it('Should be returns null if not exist hash', async () => {
      const sut = makeSUT()

      const hash = 'adc123'

      const urlStub = sandbox.stub(sut, '_getUrl').resolves(null)
      sandbox.stub(sut, '_incrementHitsClick')

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

      const generateMock = {
        fullURL: fullURL,
        shortURL: 'wwww.localhost.com/abc123'
      }

      sandbox.stub(sut, '_getUrl').resolves(null)
      sandbox.stub(sut.urlRepository, 'create').resolves(generateMock)

      const result = await sut.generate(fullURL)
      const baseURL = config.app.baseUrl

      expect(result).is.deep.eq(generateMock)
    })

    it('Should returns null if fullURL already exist', async () => {
      const sut = makeSUT()

      const fullURL = 'wwww.fakeURL.com'

      const getMock = {
        fullURL: fullURL,
        shortURL: 'wwww.localhost.com/abc123'
      }

      sandbox.stub(sut, '_getUrl').resolves(getMock)

      const result = await sut.generate(fullURL)

      expect(result).to.be.null
    })

    it('Should be returns err to find hash', async () => {
      const sut = makeSUT()

      const mockError = new Error('Erro ao buscar URL')
      const fullURL = 'wwww.fakeURL.com'

      sandbox.stub(sut, '_getUrl').rejects(mockError)

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

  describe('_getUrl', () => {
    it('Should get url by getFullUrl', async () => {
      const sut = makeSUT()

      const fullURL = 'wwww.fakeURL.com'

      const generateEndPoint = true
      const getMock = {
        hash: 'adc123',
        fullURL: 'wwww.fakeURL.com',
        shortURL: 'www.localhost.com/abc123'
      }
      sandbox.stub(sut.urlRepository, 'getFullUrl').resolves(getMock)

      const result = await sut._getUrl(null, fullURL, generateEndPoint)

      expect(result).is.deep.eq(getMock)
    })

    it('Should get url by getUrlByHash', async () => {
      const sut = makeSUT()

      const fullURL = 'wwww.fakeURL.com'
      const hash = 'adc123'

      const getMock = {
        hash: 'adc123',
        fullURL: 'wwww.fakeURL.com',
        shortURL: 'www.localhost.com/abc123'
      }

      sandbox.stub(sut.hashService, 'getUrlByHash').resolves(getMock)

      const result = await sut._getUrl(hash)

      expect(result).is.deep.eq(getMock)
    })
  })
  describe('_create', () => {
    it('Should be _create shordata url', async () => {
      const sut = makeSUT()

      const fullURL = 'wwww.fakeURL.com'
      const hash = 'abc123'
      const shortURL = 'wwww.localhost.com/abc123'

      const dataMock = {
        fullURL: 'wwww.fakeURL.com',
        hash: 'abc123',
        shortURL: 'wwww.localhost.com/abc123'
      }

      sandbox.stub(sut.hashService, 'generateHash').resolves(hash)
      sandbox.stub(sut, '_generateShortURL').resolves(shortURL)
      sandbox.stub(sut.urlRepository, 'create').resolves(dataMock)

      const result = await sut._create(fullURL)

      expect(result).is.deep.eq(dataMock)
    })
  })

  describe('_generateShortURL', () => {
    it('Should be _create shordata url', async () => {
      const sut = makeSUT()

      const hash = 'abc123'
      const baseURL = config.app.baseUrl

      const result = sut._generateShortURL(hash)

      expect(result).is.deep.eq(`${baseURL}/api/url/${hash}`)
    })
  })

  describe('_urlData', () => {
    it('Should be _create shordata url', async () => {
      const sut = makeSUT()

      const dataMock = {
        fullURL: 'wwww.fakeURL.com',
        hash: 'abc123',
        shortURL: 'wwww.localhost.com/abc123'
      }

      const result = sut._urlData(dataMock)

      expect(result).is.deep.eq({
        fullURL: 'wwww.fakeURL.com',
        shortURL: 'wwww.localhost.com/abc123'
      })
    })

    it('Should be _create shordata url', async () => {
      const sut = makeSUT()

      const result = sut._urlData()

      expect(result).is.null
    })
  })
})
