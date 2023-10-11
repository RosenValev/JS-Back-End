const router = require('express').Router();
const { isAuth } = require('../middlewares/authorizationMiddleware.js');
const userService = require('../services/userService.js');
const animalService = require('../services/animalService.js');
const { extractErrorMessage } = require('../utils/errorHelper.js');


//REGISTER
router.get('/register', (req, res) => {
    res.render('users/register');
});

router.post('/register', async (req, res) => {
    const { firstName, lastName, email, password, repeatPassword } = req.body;

    try {
        const token = await userService.register({ firstName, lastName, email, password, repeatPassword });
        res.cookie('authorization', token);
        res.redirect('/')
    } catch (err) {
        const errorMessages = extractErrorMessage(err);
        res.render('users/register', { errorMessages, firstName, lastName, email });
    }
})


//LOGIN
router.get('/login', (req, res) => {
    res.render('users/login');
});

router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const token = await userService.login(email, password);
        res.cookie('authorization', token);
        res.redirect('/')
    } catch (err) {
        const errorMessages = extractErrorMessage(err);
        res.render('users/login', { errorMessages, email });
    }
});

//PROFILE
router.get('/profile', isAuth, async (req, res) => {
    const userId = req.user?._id;

    try {
        const result = await animalService.getProfile(userId).lean();
        res.render('users/my-posts', { result });

    } catch (err) {
        const errorMessages = extractErrorMessage(err);
        res.render('users/all-posts', { errorMessages });
    }
});


//LOGOUT
router.get('/logout', (req, res) => {
    res.clearCookie('authorization');
    res.redirect('/');
})

module.exports = router;
