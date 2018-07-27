'use strict';
var ObjectId = require('mongodb').ObjectID;
// var constants = require('./constants');
class DBHelper {
    constructor() {
        this.Mongodb = require('../configs/dbconfigMongo');
    }
	
	// HungPQ: Get setting by user
	getSetting(userId, callback)
	{
		this.Mongodb.onConnect((db) => {
		var notifications = db.collection('notifications');
		var notificationsStoredInDB = notifications.findOne({userid: userId}).then(function(doc) {
			if (doc != null) {
				callback(doc);
				db.close();
			}
			else{
				callback([]);
				db.close();
			}
		});
	});
	}
	

    // HungPQ: Create new notifications and add users to notifications
    addSetting(data, callback) {
        this.Mongodb.onConnect((db) => {
           var notifications = db.collection('notifications');
           notifications.count({userid: data.userid}, function(err, notificationsresult){
            if (!err) {
               if (notificationsresult > 0) { 
					notifications.update({userid: data.userid}, {$set: { "status" : data.status,"phone" : data.phone, "value": data.value}});
					callback(true)
					db.close();
                } 
				else
				{
                    // insert notifications setting
                    notifications.insertOne(data, (err, result )=> {
                        db.close();
                        callback(true)
                    });
				}
            }				
           });
        });
    }

    //ChuongNK: Get list technicans of branch
    getListTechniciansOfBranch(data, callback) {
        this.Mongodb.onConnect((db) => {
            var roomCollection = db.collection('socketroom');
            var room = roomCollection.findOne({roomName: data}).then(function(result) {
                if (result != null) {
                    callback(result.users);
                    db.close();
                } else {
                    callback(null);
                    db.close();
                }
            });
        });
    }

    //ChuongNK: Get user's action by time 
    getUserActionsByTime(data, callback) {
        this.Mongodb.onConnect((db) => {
            var logAction = db.collection('tracklogaction');
            var currentDate = new Date(data.time);
            var nextDay = new Date(currentDate);
            nextDay.setDate(currentDate.getDate()+1);
            nextDay.toLocaleDateString();
            var idMin = ObjectId(Math.floor((new Date(data.time))/1000).toString(16) + "0000000000000000")
            var idMax = ObjectId(Math.floor(nextDay/1000).toString(16) + "0000000000000000")
            var cursor = logAction.find({userID: data.userID, roomID: data.roomID, _id:{$gt: idMin, $lt: idMax}}).toArray(function(error, result) {
                callback(result);
                db.close();
            });
        });
    }
    //ChuongNK: Get tracking roomID
    getTrackingRoomID(roomName, callback) {
        this.Mongodb.onConnect((db) => {
            var room = db.collection('socketroom');
            var roomStoredInDB = room.findOne({roomName: roomName}).then(function(doc) {
                if (doc != null) {
                    callback(doc._id);
                    db.close();
                } else {
                    callback(null);
                    db.close();
                }
            });
        });
    }
    //TuyPK: Get userid by username
    getUserIDByUsername(username, callback) {
        this.Mongodb.onConnect((db) => {
            var room = db.collection('user');
            var user = room.findOne({username: username}).then(function(doc) {
                if (doc != null) {
                    callback(doc._id);
                    db.close();
                }
                else{db.close();}
        });
        });
    }
    //TuyPK: Get list idgroup by iduser
    getIDGroupByIDUser(idUser, callback) {
        this.Mongodb.onConnect((db) => {
            var usergroup = db.collection('usergroup');
            console.log(idUser);
            var listgroup = usergroup.find({iduser: ObjectId(idUser)}).toArray(function(err, idgroups){
                if (idgroups != null) {
                    console.log(idgroups);
                    var list=[];
                    idgroups.forEach(function(item){
                        list.push(item.idgroup)
                    });
                    callback(list);
                    db.close();
                }
                else{db.close();}
        });
        });
    }
    //TuyPK: Get list idrole by idgroup
    getIDRoleByIDGroup(IDGroup, callback) {
        this.Mongodb.onConnect((db) => {
            
            var rolegroup = db.collection('rolegroup');

            var listrole = rolegroup.find({idgroup: ObjectId(IDGroup)}).toArray(function(err, idroles){
                if (idroles != null) {
                    var list=[];
                    idroles.forEach(function(item){
                        list.push(item.idrole)
                    });
                    callback(list);
                    db.close();
                }
                else{db.close();}
        });
        });
    }
    //TuyPK: Get info Role by idrole
    getRoleByIDRole(idrole, callback) {
        this.Mongodb.onConnect((db) => {
            var role = db.collection('roles');
            var roleinfo = role.findOne({_id: ObjectId(idrole)}).then(function(doc) {
                if (doc != null) {
                    callback(doc.altcode);
                    db.close();
                }
                else{db.close();}
        });
        });
    }
     //TuyPK: Get all role
     getAllRole(callback) {
        this.Mongodb.onConnect((db) => {
            var role = db.collection('roles');
            var listgroup = role.find({}).toArray(function(err, idgroups){
                if (idgroups != null) {
                    callback(idgroups);
                    db.close();
                }
                else{db.close();}
        });
        });
    }
    //TuyPK: Get full info Role by idrole
    getFullsRoleByIDRole(idrole, callback) {
        this.Mongodb.onConnect((db) => {
            var role = db.collection('roles');
            var roleinfo = role.findOne({_id: ObjectId(idrole)}).then(function(doc) {
                if (doc != null) {
                    callback(doc);
                    db.close();
                }
                else{db.close();}
        });
        });
    }
    //TuyPK: update role
    updateRole(rolenew, callback) {
        this.Mongodb.onConnect((db) => {
            var role = db.collection('roles');
            console.log('Tuy Dep Trai');
            console.log(rolenew.altcode);
            var a=role.update({_id: ObjectId(rolenew._id)}, {$set: { "altcode" : String(rolenew.altcode), "descriptions": String(rolenew.descriptions)}}).then(function(doc){
                callback(doc);
            });
            db.close();
        });
    }
    //TuyPK: delete role
    deleteRole(rolenew, callback) {
        this.Mongodb.onConnect((db) => {
            var role = db.collection('roles');
            console.log('Tuy Dep Trai');
            var a=role.remove({_id: ObjectId(rolenew._id)}).then(function(doc){
                callback(doc);
            });
            db.close();
        });
    }
    //TuyPK: insert role
    insertRole(rolenew, callback) {
        this.Mongodb.onConnect((db) => {
            var role = db.collection('roles');
            var a=role.insertOne({ altcode: String(rolenew.altcode), descriptions:  String(rolenew.descriptions), deleted:  "0"}).then(function(doc){
                callback(doc);
            });
            db.close();
        });
    }
    //TuyPK: Get role url by email
    getRole(email, callback) {
        this.Mongodb.onConnect((db) => {
            var usergroup = db.collection('usergroup');
            var rolegroup = db.collection('rolegroup');
            var role = db.collection('roles');
            var userid=getUserIDByUsername(email, ((result) => { 
					
            }));
            console.log(userid);
            var user = room.findOne({username: email}).then(function(doc) {
                if (doc != null) {
                    console.log(doc.username);
                    console.log(doc._id);
                    var a;
                    var dsnhom=[];
                    console.log('list id role');
                    var listgroup = usergroup.find({iduser: ObjectId(doc._id)}).toArray(function(err, idgroups){
                        //Danh sach cac id group
                        idgroups.forEach(function(item){
                                console.log(item.idgroup);  
                                dsnhom.push(item.idgroup);
                                //var listroleid = rolegroup.find({idgroup: ObjectId('5a39dcff9093cf03d0eba8dd')}).toArray(function(err, idroles){
                                  //  console.log('item.idgroup1');  
                                  //  console.log(idroles);  
                                    //Danh sach cac id role
                                    //idroles.forEach(function(item1){
                                    //    console.log(item1.idrole);  
                                    //});
                           // });
                        
                        });
                        console.log(dsnhom); 
                        console.log('log ds nhom');  
                        var dsquyen=[];
                        dsnhom.forEach(function(item3){
                            var listroleid = rolegroup.find({idgroup: ObjectId(item3)}).toArray(function(err, idroles){
                                if(err == null){
                                    console.log('item.idgroup2');  
                                    console.log(idroles);  
                                    idroles.forEach(function(itemrole){
                                        dsquyen.push(itemrole.idrole);
                                    });
                                }
                                });
                            });
                        console.log('log ds quyen'); 
                        console.log(dsquyen); 
                        var dsquyen1=[];
                        dsquyen.forEach(function(dsquyenid){
                            var roles = role.findOne({_id: ObjectId(dsquyenid)}).then(function(docx) {
                                if (docx != null) {
                                    console.log(docx.descriptions);
                                    dsquyen1.push(docx.descriptions);
                                }
                                });
                                });
                        callback(dsquyen1);
                     });
                    //db.close();
                    
                } else {
                    callback(null);
                    db.close();
                }
            });
        });
    }
    //TuyPK: Get branch by email
    getBranch(email, callback) {
        this.Mongodb.onConnect((db) => {
            var room = db.collection('user');
            var listbranch = db.collection('userbranch');
            var user = room.findOne({username: email}).then(function(doc) {
                if (doc != null) {
                    console.log(doc.username);
                    console.log(doc.fullname);
                    console.log(doc._id);
                    var a;
                    var b=[];
                    var list = listbranch.find({iduser: ObjectId(doc._id)}).toArray(function(err, results){
                        console.log('--Log ra db');    
                        console.log(results);
                        console.log('--Log ra a');    
                        a=results;
                        console.log(a);
                        console.log('--Lay tung bien a');  
                        a.forEach(function(item){
                            console.log(item.idbranch);
                            b.push(item.idbranch);
                            });
                        console.log('--Lay list chi nhanh');  
                        console.log(b);  
                        callback(b);
                     });
                    db.close();
                    
                } else {
                    callback(null);
                    db.close();
                }
            });
        });
    }
    //TuyPK: insert autosavelink
    insertlinkfavorite(link, callback) {
        this.Mongodb.onConnect((db) => {
            var role = db.collection('savelinkfavorite');
            var a=role.insertOne({ url: String(link.url), description:  String(link.description), title: String(link.title), keywords: String(link.keywords)}).then(function(doc){
                callback(doc);
            });
            db.close();
        });
    }
    //TuyPK: insert allsavelink
    insertLinkall(link, callback) {
        this.Mongodb.onConnect((db) => {
            var role = db.collection('allsavelink');
            var a=role.insertOne({ url: String(link)}).then(function(doc){
                callback(doc);
            });
            db.close();
        });
    }
	//TuyPK: insert autosavelink
    insertLinkauto(link, callback) {
        this.Mongodb.onConnect((db) => {
            var role = db.collection('autosavelink1');
            var a=role.insertOne({ url: String(link.url), description:  String(link.description), title: String(link.title), keywords: String(link.keywords), linkall: String(link.links)}).then(function(doc){
                callback(doc);
            });
            db.close();
        });
    }
/*
            var role1 = db.collection('allsavelink');
            var b=role1.insertOne({ url: String(link.links)}).then(function(doc1){
                callback(doc1);
            });
            db.close();
        });*/
    
}

module.exports = new DBHelper();