const 
express = require('express'), // Load express
FundController = require('../controllers/fund'), // Load Controller
api = express.Router(); // Express Router

// Routes:
api.get('/:ticker?', FundController.get)


module.exports = api;