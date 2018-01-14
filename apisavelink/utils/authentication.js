'use strict';

var fs=require("fs");
var jwt = require('jsonwebtoken'); 

class Authentication {
    constructor(token) {
        this.certification = fs.readFileSync('./certs/public.pem'); 
        this.userToken = token;
    }

   auth(callback) {
    jwt.verify(this.userToken, this.certification, function(err, decoded) {      
        if (err) {
            callback(false, {err, decoded});
        } else {
            callback(true, {err, decoded});
       }
    });
   }
}

module.exports = Authentication;