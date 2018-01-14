const core = require('../../helpers/core');
var User   = require('../../models/user'); // get our mongoose model

module.exports = (req, res, next) => {
    
    var nick = new User({ 
        name: 'Nick Cerminara', 
        password: 'password',
        admin: true 
      });
    
      nick.save(function(err) {
        if (err) throw err;
        console.log('User saved successfully');
        res.json({ success: true });
      });
}
