/**
 * Token: "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VybmFtZSI6eyJzdGF0dXMiOiJzdWNjZXNzIiwiZGF0YSI6W3siaWQiOjEsInVzZXJuYW1lIjoiYWRtaW4iLCJwYXNzd29yZCI6Ik5sNzBsMmxWVWFUSlFYdEU3emFySEdKNHpTeVBJdWI4VEhRVHhyL01KSlk9In1dfSwicHdkIjoiTmw3MGwybFZVYVRKUVh0RTd6YXJIR0o0elN5UEl1YjhUSFFUeHIvTUpKWT0iLCJpYXQiOjE3MTI1NDY2NTB9.gdWPAG45ZupQk1H_eA67W6XLlyupgwAp5I7ofZeBgA8"
 * 
 */

const 
express = require('express'), // Load express
WalletController = require('../controllers/wallet'), // Load Controller
api = express.Router(); // Express Router

// Routes:
api.get('/:id_wallet?', WalletController.get)
api.get('/detail/:id_wallet?', WalletController.getDetails)
api.get('/daily_perfomance/:id_wallet/:fecha', WalletController.getDailyPerfomance)

module.exports = api;