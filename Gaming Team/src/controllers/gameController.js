const router = require('express').Router();
const { extractErrorMessage } = require('../utils/errorHelper.js');
const { isAuth } = require('../middlewares/authorizationMiddleware.js')
const gameService = require('../services/gameService.js')


//CATALOG
router.get('/catalog', (req, res) => {

    res.render('games/catalog')
});






//CREATE
router.get('/create', isAuth, (req, res) => {
    res.render('games/create');
});

router.post('/create', isAuth, async (req, res) => {
    const { platform, name, image, price, genre, description } = req.body;

    try {
        await gameService.create({ platform, name, image, price, genre, description, owner: req.user._id });
        res.redirect('/games/catalog');
    } catch (err) {
        const errorMessages = extractErrorMessage(err);
        res.render('games/create', { errorMessages, name, image, price, genre, description })
    }
});



//DETAILS












//EDIT








//DELETE


module.exports = router;
