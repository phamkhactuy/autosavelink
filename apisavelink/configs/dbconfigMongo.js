'use strict';

const mongodb = require('mongodb')
const assert = require('assert');

class Database {
    constructor() {
        this.mongoClient = mongodb.MongoClient;
        this.ObjectID = mongodb.ObjectID;
        this.mongoURL = 'mongodb://localhost:27017/autosavelink';
    }

   onConnect(callback) {
       this.mongoClient.connect(this.mongoURL, (err, db) => {
            assert.equal(null, err);
            callback(db);
          
       });
   }
}

module.exports = new Database();