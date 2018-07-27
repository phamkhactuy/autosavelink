const dbhelper = require('../../helpers/mongoDBHelper');
const authentication = require('../../utils/authentication');
var constants = require('../../utils/constants');
var async = require('async');

module.exports = (request, response) => {
    var requestData = request.body;
    //console.log(requestData);
    //console.log(requestData.role);
    //console.log(requestData.role.links);
    var role = {"url": requestData.role.url, "keywords": requestData.role.keywords, "description": requestData.role.description, "title":requestData.role.title, "links":requestData.role.links};
    /*
    for(var i = 0; i < requestData.role.links.length; i++)
        dbhelper.insertLinkall(requestData.role.links[i], ((iduser) => { 
            if(iduser !=null)
                      {
                          response.status(200).send({ success: true, message: constants.SUCCESS_FOUND_DATA, data: iduser });
                      }}), err => 
                      {
                          response.status(200).send({ success: false, message: 'Cap nhat that bai',data: err});
                      }
                  );
    */  
   //console.log(role);
   dbhelper.insertLinkauto(role, ((iduser) => { 
    if(iduser !=null)
              {
                  console.log('Cap nhat thanh cong');
                  response.status(200).send({ success: true, message: constants.SUCCESS_FOUND_DATA, data: iduser });
              }}), err => 
              {
                  response.status(200).send({ success: false, message: 'Cap nhat that bai',data: err});
              }
          );
          /*
   dbhelper.insertLinkall(requestData.role.links, ((iduser) => { 
    if(iduser !=null)
              {
                  response.status(200).send({ success: true, message: constants.SUCCESS_FOUND_DATA, data: iduser });
              }}), err => 
              {
                  response.status(200).send({ success: false, message: 'Cap nhat that bai',data: err});
              }
          );
    */
};
