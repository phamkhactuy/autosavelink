const dbhelper = require('../../helpers/mongoDBHelper');
const authentication = require('../../utils/authentication');
var constants = require('../../utils/constants');
var async = require('async');

module.exports = (request, response) => {
    var requestData = request.body;
	//1 - Check user token is valid or not
	var auth = new authentication(requestData.token).auth(function(isAuthenticated, authData) {
		if (isAuthenticated) {
            dbhelper.getAllRole(((iduser) => { 
                if(iduser !=null)
                {
                    console.log('iduser');
                    response.status(200).send({ success: true, message: constants.SUCCESS_FOUND_DATA, data: iduser});
                }
                else{
                    response.status(200).send({ success: true, message: constants.SUCCESS_FOUND_DATA, data: ""});
                }
            }));
            /*
            dbhelper.getUserIDByUsername(authData.decoded.username, ((iduser) => { 
				if(iduser !=null)
					{
                        console.log('UserID:');
                        console.log(iduser);
                        dbhelper.getIDGroupByIDUser(iduser, ((listIDgroup) => { 
                            if(listIDgroup !=null)
                            {
                                var listRole=[];
                                async.forEachOf(listIDgroup, (value, key, callback) => {
                                    dbhelper.getIDRoleByIDGroup(value, ((listIDRole) => { 
                                            listIDRole.forEach(function(item){
                                                if(listRole.indexOf(String(item))<0){
                                                    listRole.push(String(item));
                                                }
                                            });
                                            callback();
                                    }));
                                }, err => {
                                    console.log('listRole');
                                    console.log(listRole);
                                    var Roles=[];
                                    async.forEachOf(listRole, (value, key, callback) => {
                                        dbhelper.getFullsRoleByIDRole(value, ((Role) => {
                                                console.log('-'); 
                                                Roles.push(Role);
                                                callback();
                                        }));
                                    }, err => {
                                        console.log('Role');
                                        console.log(Roles);
                                        response.status(200).send({ success: true, message: constants.SUCCESS_FOUND_DATA, data: Roles});
                                    });
                                });
                                
                            }
                            else
                                response.status(200).send({ success: false, message: 'Ban khong thuoc nhom quyen nao ca'});
                            }));
                            
                    }
				else
                    response.status(200).send({ success: false, message: 'Khong ton tai user tren he thong!'});
                
            }));*/
            //response.status(200).send({ success: false, message: '2323'});
            /*
            var roomName = "icab-" + requestData.data.branchID;            
			dbhelper.getTrackingRoomID(roomName, ((roomID) => {
				if (roomID) {
				
					var userData = {
						roomID : roomID,
						userID: requestData.data.userID,
						time: requestData.data.time
					}
					//3 - Get list user's action
					dbhelper.getUserActionsByTime(userData, ((result) => { 
						if (result) {
							var responseData = {
								"listActions" : result
							}
							response.status(200).send({ success: false, message: constants.SUCCESS_FOUND_DATA, data: responseData });
						} else {
							response.status(200).send({ success: false, message: constants.ERROR_NO_DATA });
						}
					}));
				} else {
					response.status(200).send({ success: false, message: constants.ERROR_NO_DATA });
				}
			}));*/
		} else {
			response.status(200).send({ success: false, message: constants.ERROR_INVALID_TOKEN });
		}
	});
};
