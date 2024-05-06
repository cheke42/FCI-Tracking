/**
 * Example Token: "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VybmFtZSI6eyJzdGF0dXMiOiJzdWNjZXNzIiwiZGF0YSI6W3siaWQiOjEsInVzZXJuYW1lIjoiYWRtaW4iLCJwYXNzd29yZCI6Ik5sNzBsMmxWVWFUSlFYdEU3emFySEdKNHpTeVBJdWI4VEhRVHhyL01KSlk9In1dfSwicHdkIjoiTmw3MGwybFZVYVRKUVh0RTd6YXJIR0o0elN5UEl1YjhUSFFUeHIvTUpKWT0iLCJpYXQiOjE3MTI1NDY2NTB9.gdWPAG45ZupQk1H_eA67W6XLlyupgwAp5I7ofZeBgA8"
 * 
 */

const 
express = require('express'), // Load express
walletController = require('../controllers/wallet'), // Load Controller
md_auth = require('../middlewares/authenticated')
api = express.Router(); // Express Router


// Routes:
// GET:
api.get('/:id_wallet?', md_auth.ensureAuth, walletController.get)
api.get('/detail/:id_wallet?', md_auth.ensureAuth, walletController.getDetails)
api.get('/daily_perfomance/:id_wallet/:fecha', md_auth.ensureAuth, walletController.getDailyPerfomance)
api.get('/previous_detail/:id/:fecha',walletController.getDateByDate)
api.get('/detail_between/:id/:limit',walletController.getRangeDate)
api.get('/balance/:id/:fecha',walletController.getBalance)
api.get('/previous_balance/:id/:fecha',walletController.getPreviousBalance)
api.get('/ticker/:id',walletController.getTicker)
api.get('/last_perfomance/:id',walletController.getLastPerfomance)

// POST:
api.post('/save',walletController.saveWallet)

module.exports = api;