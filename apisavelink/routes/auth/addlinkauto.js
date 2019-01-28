const authentication = require('../../utils/authentication');
var constants = require('../../utils/constants');
var async = require('async');
var datetime = require('node-datetime');
var dt = datetime.create();
var formatted = dt.format('Ymd');
const SimpleNodeLogger = require('simple-node-logger'),
    opts = {
        logFilePath:'File'+formatted+'.log',
        timestampFormat:'YYYY-MM-DD HH:mm:ss.SSS'
    },log = SimpleNodeLogger.createSimpleLogger( opts );
const SimpleNodeLogger1 = require('simple-node-logger'),
    opts1 = {
        logFilePath:'F'+formatted+'.log',
        timestampFormat:'YYYY-MM-DD HH:mm:ss.SSS'
    },log1 = SimpleNodeLogger1.createSimpleLogger( opts1 );

module.exports = (request, response) => {
    console.log('A1');  
    var requestData = request.body;
    console.log(requestData);
    //console.log(requestData.role);
    //console.log(requestData.role.links);
    var role = {"url": requestData.role.url, "keywords": requestData.role.keywords, "description": requestData.role.description, "title":requestData.role.title, "links":requestData.role.links};
    console.log('A2');  
    for(var i = 0; i < requestData.role.links.length; i++)
    {
        console.log('A3');  
        log1.info(requestData.role.links[i]);
        if(requestData.role.links[i].startsWith('http'))
            {
                indexOfFirst = requestData.role.links[i].indexOf('/');
                indexOfSecond=requestData.role.links[i].indexOf('/', indexOfFirst+1);
                indexOfThree=requestData.role.links[i].indexOf('/', indexOfSecond+1);
                log.info(requestData.role.links[i].substring(0, indexOfThree));
            }
    }    
    console.log('A4');  
    
    /*for(var i = 0; i < requestData.role.links.length; i++)
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
