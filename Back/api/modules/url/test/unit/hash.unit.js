const { expect, use } = require('chai')
const sandbox = require('sinon').createSandbox()
const sinonChai = require('sinon-chai')
const hashService = require('../../service/hash')

use(sinonChai)

const makeSUT = () => {
  return new hashService()
}

describe('Services -> hashService', () => {
  beforeEach(() => {
    sandbox.restore()
  })

  describe('generateHash', () => {
    it('Should be generate hash', async () => {
      const sut = makeSUT()

      const result = await sut.generateHash()

      expect(result).to.be.a("string")
    })
  })

  describe('getUrlByHash', () => {
    it('Should be get url by hash', async () => {
      const sut = makeSUT()

      const hash = '123abc'

      sandbox.stub(sut.urlRepository, 'getHash').returns(hash)

      const result = await sut.getUrlByHash(hash)

      expect(result).to.be.eq(hash)
    })
  })
})
