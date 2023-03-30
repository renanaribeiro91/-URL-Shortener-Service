const { database } = require('simple-node-framework').Singleton
const mongoose = require('mongoose')

const connection = database.connections.mongodb.app || mongoose

const MODEL_NAME = 'URLS'

const schema = mongoose.Schema(
  {
    fullURL: String,
    shortURL: String,
    hash: String,
    clicks: { type: Number, default: 0 }
  },
  {
    collection: MODEL_NAME,
    timestamps: true
  }
)

schema.index({ hash: 1, fullURL: 1, clicks: 1 }, { unique: true })

module.exports = connection.model(MODEL_NAME, schema)
