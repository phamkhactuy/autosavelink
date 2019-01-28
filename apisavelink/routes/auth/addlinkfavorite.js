const authentication = require('../../utils/authentication');
var constants = require('../../utils/constants');
var async = require('async');

module.exports = (request, response) => {
    var requestData = request.body;
    console.log(requestData);
    console.log(requestData.role);
    var role = {"url": requestData.role.url1, "keywords": requestData.role.keywords1, "description": requestData.role.description1, "title":requestData.role.title1};
    
    console.log(role);
};
