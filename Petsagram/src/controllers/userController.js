const router = require('express').Router();
const { isAuth } = require('../middlewares/authorizationMiddleware.js');
const userService = require('../services/userService.js');
const photoService = require('../services/photoService.js');
const { extractErrorMessage } = require('../utils/errorHelper.js');

//REGISTER
router.get('/register', (req, res) => {
    res.render('users/register');
});

router.post('/register', async (req, res) => {
    const { username, email, password, repeatPassword } = req.body;

    try {
        const token = await userService.register({ username, email, password, repeatPassword });
        res.cookie('authorization', token);
        res.redirect('/')
    } catch (err) {
        const errorMessages = extractErrorMessage(err);
        res.render('users/register', { errorMessages, username, email });
    }
})

//LOGIN
router.get('/login', (req, res) => {
    res.render('users/login');
});

router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        const token = await userService.login(username, password);
        res.cookie('authorization', token);
        res.redirect('/')
    } catch (err) {
        const errorMessages = extractErrorMessage(err);
        res.render('users/login', { errorMessages });
    }
});

//PROFILE
router.get('/profile', isAuth, async (req, res) => {
    const userId = req.user._id;

    try {
        const result = await photoService.findOwnPhotos(userId);
        const numberOfPictures = result.length;
        res.render('users/profile', { result, numberOfPictures })

    } catch (err) {
        const errorMessages = extractErrorMessage(err);
        res.render('home', { errorMessages });
    }
});

//LOGOUT
router.get('/logout', (req, res) => {
    res.clearCookie('authorization');
    res.redirect('/');
})

module.exports = router;
