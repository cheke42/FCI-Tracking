const 
express = require('express'), // Load express
FundController = require('../controllers/fund'), // Load Controller
md_auth = require('../middlewares/authenticated'),
api = express.Router(); // Express Router

// Routes:
api.get('/:ticker?', md_auth.ensureAuth, FundController.get)


module.exports = api;