const sinonChai = require('sinon-chai')
const sandbox = require('sinon').createSandbox()
const { expect, use } = require('chai')
const urlRepository = require('../../repository/url-reposittory')

const makeSUT = () => new urlRepository()

describe('UrlRepository', () => {
  before(() => {
    use(sinonChai)
  })

  afterEach(() => {
    sandbox.restore()
  })

  describe('getByHash', () => {
    it('Should expect get hash', async () => {
      const sut = makeSUT()

      const hash = 'abc123'
      const urlStub = sandbox.stub(sut.urlModel, 'findOne').returns(hash)

      await sut.getByHash(hash)

      expect(urlStub).have.been.calledWith({ hash: hash })
    })
  })

  describe('getUrl', () => {
    it('Should get fullURL', async () => {
      const sut = makeSUT()

      const fullURL = 'www.fakeURL.com/urlLongaDemais'
      const urlStub = sandbox.stub(sut.urlModel, 'findOne').returns(fullURL)

      await sut.getByFullUrl(fullURL)

      expect(urlStub).have.been.calledWith({ fullURL: fullURL })
    })
  })

  describe('create', () => {
    it('Should create fullURL', async () => {
      const sut = makeSUT()

      const fullURL = 'www.fakeURL.com/urlLongaDemais'
      const shortURL = 'www.fakeURL.com/abc123'
      const hash = 'abc123'

      const data = {
        fullURL: 'www.fakeURL.com/urlLongaDemais',
        shortURL: 'www.fakeURL.com/abc123',
        hash: 'abc123'
      }
      const urlStub = sandbox.stub(sut.urlModel, 'create').returns(data)

      await sut.create(data)

      expect(urlStub).have.been.calledWith(data)
    })
  })

  describe('update', () => {
    it('Should expect update url', async () => {
      const sut = makeSUT()

      const newFullURL = 'www.fakeURL.com/newUrlLongaDemais'
      const hash = 'abc123'

      const data = {
        fullURL: 'www.fakeURL.com/newUrlLongaDemais',
        hash: 'abc123'
      }

      const urlStub = sandbox
        .stub(sut.urlModel, 'findOneAndUpdate')
        .returns(data)

      await sut.update(data)

      expect(urlStub).have.been.calledWith(
        { hash: 'abc123' },
        { fullURL: 'www.fakeURL.com/newUrlLongaDemais' },
        { returnOriginal: false }
      )
    })
  })

  describe('delete', () => {
    it('Should delete settings by _id', async () => {
      const sut = makeSUT()

      const hash = 'abc123'

      const deleteStub = sandbox.stub(sut.urlModel, 'findOneAndRemove')

      await sut.delete(hash)

      expect(deleteStub).have.been.calledWithExactly({ hash: hash })
    })
  })
})
