const dbhelper = require('../../helpers/mongoDBHelper');
const authentication = require('../../utils/authentication');
var constants = require('../../utils/constants');
var async = require('async');

module.exports = (request, response) => {
    var requestData = request.body;
    console.log(requestData);
    console.log(requestData.role);
    var role = {"url": requestData.role.url1, "keywords": requestData.role.keywords1, "description": requestData.role.description1, "title":requestData.role.title1};
    
    console.log(role);
    dbhelper.insertlinkfavorite(role, ((iduser) => { 
    if(iduser !=null)
              {
                  console.log('Cap nhat thanh cong');
                  response.status(200).send({ success: true, message: constants.SUCCESS_FOUND_DATA, data: iduser });
              }}), err => 
              {
                  response.status(200).send({ success: false, message: 'Cap nhat that bai',data: err});
              }
          );
};
