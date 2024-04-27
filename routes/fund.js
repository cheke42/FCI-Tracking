const 
express = require('express'), // Load express
fundController = require('../controllers/fund'), // Load Controller
md_auth = require('../middlewares/authenticated'),
api = express.Router(); // Express Router

// Routes:
api.get('/:ticker?', md_auth.ensureAuth, fundController.get)
api.get('/remote/list',fundController.getRemoteList)
api.get('/remote/analytics/:ticker/:year?/:month?/:day?',fundController.getAnalytics)
api.get('/periodicAnalyticalData/:ticker/:amount',fundController.periodicAnalyticalData)
api.get('/header/:ticker',fundController.getHeader)

module.exports = api;