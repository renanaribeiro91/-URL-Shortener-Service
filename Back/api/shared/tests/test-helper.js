function onDbConnected(...dbs) {
  Object.keys(require.cache).forEach(key => {
    delete require.cache[key]
  })

  return new Promise((resolve, reject) => {
    const { database } = require('simple-node-framework').Singleton
    try {
      let connecteds = 0

      const finish = () => {
        if (connecteds === dbs.length) {
          resolve()
        }
      }

      if (dbs.includes('mongo')) {
        database.onMongoConnected = () => {
          connecteds += 1
          finish()
        }

        database.onMongoError = (error) => {
          reject(new Error(`Erro ao conectar com o banco de dados MongoDB: ${error.message}`))
        }
      }
    } catch (error) {
      reject(error)
    }
  })
}

module.exports = { onDbConnected }
