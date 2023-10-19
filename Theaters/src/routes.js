const router = require('express').Router();
const homeController = require('./controllers/homeController.js');
const userController = require('./controllers/userController.js');
const playController = require('./controllers/playController.js')


router.use(homeController);   // This controller will work all the time.
router.use('/users', userController);
router.use('/theater', playController);

router.get('*', (req, res) => {  //Redirect everything else to page 404
    res.send('No such page')
});

module.exports = router;