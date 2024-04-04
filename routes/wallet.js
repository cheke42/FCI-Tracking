const 
express = require('express'), // Load express
WalletController = require('../controllers/wallet'), // Load Controller
api = express.Router(); // Express Router

// Routes:
api.get('/:id_wallet?', WalletController.get)
api.get('/detail/:id_wallet?', WalletController.getDetails)

module.exports = api;