const router = require('express').Router();
const homeController = require('./controllers/homeController.js');
const userController = require('./controllers/userController.js');
const bookControler = require('./controllers/bookControler.js');


router.use(homeController);   // This controller will work all the time.
router.use('/users', userController);
router.use('/books', bookControler);

router.get('*', (req, res) => {  //Redirect everything else to page 404
    res.redirect('/404')
});

module.exports = router;