const { mongoose, Schema } = require('mongoose')
const { Singleton } = require('simple-node-framework')
const {
  database: {
    connections: {
      mongodb: { app }
    }
  }
} = Singleton

const connection = app || mongoose

const MODEL_NAME = 'URLS'

const schema = Schema(
  {
    fullURL: String,
    shortURL: String,
    hash: String,
    clicks: { type: Number, default: 0 }
  },
  {
    collection: MODEL_NAME,
    timestamps: true,
    _id: false // default
  }
)

schema.index({ hash: 1 }, { unique: true })

module.exports = connection.model(MODEL_NAME, schema)
