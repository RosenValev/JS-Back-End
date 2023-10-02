const router = require('express').Router();
const homeController = require('./controllers/homeController.js')

router.use(homeController);   // This controller will work all the time.

module.exports = router;