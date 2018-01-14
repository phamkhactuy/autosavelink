const dbhelper = require('../../helpers/mongoDBHelper');
const authentication = require('../../utils/authentication');
var constants = require('../../utils/constants');
var async = require('async');

module.exports = (request, response) => {
    var requestData = request.body;
    console.log(requestData);
    console.log(requestData.token);
    console.log(requestData.role);
    console.log(requestData.role._id);
    var role = {"_id": requestData.role._id, "altcode": requestData.role.altcode, "descriptions": requestData.role.descriptions, "deleted":requestData.role.deleted};
    
    //console.log(requestData.role);
    console.log(role);
	var auth = new authentication(requestData.token).auth(function(isAuthenticated, authData) {
		if (isAuthenticated) {
            console.log('Lay ra userid');
            dbhelper.insertRole(role, ((iduser) => { 
				if(iduser !=null)
                {
                    console.log('Cap nhat thanh cong');
                    response.status(200).send({ success: true, message: constants.SUCCESS_FOUND_DATA, data: iduser });
                }}), err => 
                {
                    response.status(200).send({ success: false, message: 'Cap nhat that bai',data: err});
                }
            );
            
		} else {
			response.status(200).send({ success: false, message: constants.ERROR_INVALID_TOKEN });
		}
	});
};
