const { expect } = require('chai')
const urlExists = require('../../middleware/validateUrl')
const sandbox = require('sinon').createSandbox()

describe('Middleware -> urlExists', () => {
  beforeEach(() => {
    sandbox.restore()
  })

  it('Should be a not validate fullURL', async () => {
    const send = sandbox.spy()
    const next = sandbox.spy()

    const req = {
      body: { fullURL: 'www.youtube.com' }
    }

    await urlExists(req, { send }, next)
    const body = send.args[0]

    var dados

    for (let elemento of body) {
      dados = elemento
    }

    expect(dados).to.be.deep.eq({
      message: 'URL not exist',
      type: 'failure'
    })
    expect(next).not.to.be.called
  })

  it('Should be validate a fullURL', async () => {
    const send = sandbox.spy()
    const next = sandbox.spy()

    const req = {
      body: {
        fullURL:
          'https://www.google.com/search?q=ameixa&sxsrf=AJOqlzWXLMkevNzWVnkqt_c7ExjuduFe5g%3A1677783529575&source=hp&ei=6fEAZJLyIKva5OUPtqCfmAs&iflsig=AK50M_UAAAAAZAD_-TF0xshIF7Gdqrl_HDneSvYLDHK5&ved=0ahUKEwjSiqfa9r39AhUrLbkGHTbQB7MQ4dUDCAg&uact=5&oq=ameixa&gs_lcp=Cgdnd3Mtd2l6EAMyBAgjECcyCgguELEDEIAEEAoyCgguEIAEELEDEAoyCggAEIAEELEDEAoyCggAEIAEELEDEAoyBwgAEIAEEAoyBwgAEIAEEAoyBwgAEIAEEAoyCggAEIAEELEDEAoyBwgAEIAEEAo6BggjECcQEzoRCC4QgAQQsQMQgwEQxwEQ0QM6CAguEIMBELEDOgsILhCABBCxAxCDAToOCC4QgAQQsQMQxwEQ0QM6CwgAEIAEELEDEIMBOgUIABCABDoQCC4QsQMQgwEQxwEQ0QMQQzoECAAQQzoFCC4QgAQ6CAguEIAEELEDOggIABCABBCxAzoKCC4QxwEQ0QMQQzoLCC4QgwEQsQMQgAQ6CwguEIAEEMcBEK8BOggILhCxAxCABDoNCC4QgAQQxwEQ0QMQCjoLCC4QgAQQsQMQ1AJQAFiQC2DJDGgAcAB4AIABmgGIAa4GkgEDMC42mAEAoAEB&sclient=gws-wiz'
      }
    }

    await urlExists(req, { send }, next)

    expect(next).to.be.called
  })

  it('Should be err if not send fullURL', async () => {
    const send = sandbox.spy()
    const next = sandbox.spy()

    const error = new Error('error')
    const req = error

    try {
      await urlExists(req, { send }, next)
    } catch (error) {
      expect(error).to.be.called
    }
    
  })
})
