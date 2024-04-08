const 
express = require('express'), // Load express
userController = require('../controllers/user'), // Load Controller
api = express.Router(); // Express Router

api.post('/login', userController.login)
api.post('/create-account',userController.createAccount)

module.exports = api;