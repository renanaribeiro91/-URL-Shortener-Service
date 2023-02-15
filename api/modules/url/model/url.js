const { database } = require('simple-node-framework').Singleton;
const mongoose = require('mongoose');
const { nanoid } = require('nanoid');

const connection = database.connections.mongodb.app || mongoose;
const MODEL_NAME = 'URLS'; 

const schema = mongoose.Schema(
    { fullUrl: String,
      hash: String
    },
    {
        collection: MODEL_NAME,
        timestamps: true
    }
);

schema.index({ hash: 1 }, { unique: true });

class UrlModel {
    constructor() {
        this.db = connection.model[MODEL_NAME] || connection.model(MODEL_NAME, schema);
    }
}

module.exports = { UrlModel };
