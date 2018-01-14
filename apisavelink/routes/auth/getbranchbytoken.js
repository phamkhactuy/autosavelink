const dbhelper = require('../../helpers/mongoDBHelper');
const authentication = require('../../utils/authentication');
var constants = require('../../utils/constants');


module.exports = (request, response) => {
	var requestData = request.body;
	//1 - Check user token is valid or not
	var auth = new authentication(requestData.token).auth(function(isAuthenticated, authData) {
		if (isAuthenticated) {
			//2 - Lay danh sach token tu token
			console.log(authData);
			console.log(authData.decoded);
            console.log(authData.decoded.username);
            dbhelper.getBranch(authData.decoded.username, ((result) => { 
				//if(result !=null)
					console.log('Ket qua a:');
					console.log(result);
					response.status(200).send({ success: true, message: 'Lay danh sach CN thanh cong', data: result });
				//else
					//response.status(200).send({ success: false, message: 'Lay du lieu that bai'});
            }));
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
