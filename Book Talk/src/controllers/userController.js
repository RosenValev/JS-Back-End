const router = require('express').Router();
const userService = require('../services/userService.js');
const { extractErrorMessage } = require('../utils/errorHelper.js');
const bookService = require('../services/bookService.js')


//REGISTER
router.get('/register', (req, res) => {
    res.render('users/register');
});

router.post('/register', async (req, res) => {
    const { email, username, password, repeatPassword } = req.body;

    try {
        await userService.register({ email, username, password, repeatPassword });
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
    const { email, password } = req.body;

    try {
        const token = await userService.login(email, password);
        res.cookie('authorization', token);
        res.redirect('/')
    } catch (err) {
        const errorMessages = extractErrorMessage(err);
        res.render('users/login', { errorMessages });
    }
});

// PROFILE
router.get('/profile', async (req, res) => {
    const userId = req.user?._id;

    try {
        const wishedBooks = await bookService.wishedBooks(userId).lean();
        res.render('users/profile', { wishedBooks });

    } catch (err) {
        const errorMessages = extractErrorMessage(err);
        res.render('users/profile', { errorMessages });
    }
});

//LOGOUT
router.get('/logout', (req, res) => {
    res.clearCookie('authorization');
    res.redirect('/');
})

module.exports = router;
