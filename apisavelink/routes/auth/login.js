const core = require('../../helpers/core');
var User   = require('../../models/user'); // get our mongoose model
var fs          = require("fs");
var jwt    = require('jsonwebtoken'); // used to create, sign, and verify tokens
var ActiveDirectory = require('activedirectory');
var config = { url: 'ldap://10.104.20.101/ou=VTVCAB Users',
               baseDN: 'dc=vtvcab,dc=vn',
               tlsOptions:  {
                'rejectUnauthorized': false
              } 
            }
module.exports = (req, res, next) => {
  var ad = new ActiveDirectory(config);
  var username = req.body.email;
  console.log(req.body.email); // true
  if(username.endsWith('@vtvcab.vn')==false)
    username=username+'@vtvcab.vn';
  
  var password = req.body.password;
  ad.authenticate(username, password, function(err, auth) {
    if (err) {
      res.json({ success: false, message: 'Tai khoan hoac mat khau khong dung!' });
      return;
    }
    if (auth) {
      console.log('Authenticated!');
      console.log(req.body.email);
        const payload = {
          username: username
        };
        var cert = fs.readFileSync('certs/jwtRS256.key');
        var token =jwt.sign(payload,cert,{ algorithm: 'RS256'});
        res.json({
            success: true,
            message: 'Dang nhap thanh cong!',
            token: token
        });
    }
    else {
      console.log('Tai khoan hoac mat khau khong dung!');
    }
  });

  /*
  // find the user
  User.findOne({
    name: req.body.name
  }, function(err, user) {

    if (err) throw err;

    if (!user) {
      res.json({ success: false, message: 'Khong ton tai tai khoan!' });
    } else if (user) {
        if (user.password != req.body.password) {
        res.json({ success: false, message: 'Mat khau khong dung!' });
        } else {
            const payload = {
                admin: user.admin
            };
            var cert = fs.readFileSync('jwtRS256.key');
            var token =jwt.sign(payload,cert,{ algorithm: 'RS256'});
            res.json({
                success: true,
                message: 'Dang nhap thanh cong!',
                token: token
            });
      }   

    }

  });*/
}
