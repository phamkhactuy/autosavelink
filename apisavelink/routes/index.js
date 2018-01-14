const routes = require('express').Router();
const auth = require('./auth');
routes.use('/auth', auth);

routes.get('/', (req, res) => {
  res.status(200).json({ message: 'Connected!' });
});

module.exports = routes;

