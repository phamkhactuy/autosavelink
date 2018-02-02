'use strict';

const mongodb = require('mongodb')
const assert = require('assert');

class Database {
    constructor() {
        this.mongoClient = mongodb.MongoClient;
        this.ObjectID = mongodb.ObjectID;
        this.mongoURL = 'mongodb://10.104.25.36:27017/autosavelink';
    }

   onConnect(callback) {
       this.mongoClient.connect(this.mongoURL, (err, db) => {
            assert.equal(null, err);
            callback(db);
          
       });
   }
}

module.exports = new Database();