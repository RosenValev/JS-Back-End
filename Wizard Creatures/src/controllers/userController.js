const router = require('express').Router();
const userService = require('../services/userService.js');
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


//LOGOUT
router.get('/logout', (req, res) => {
    res.clearCookie('authorization');
    res.redirect('/');
})

module.exports = router;
