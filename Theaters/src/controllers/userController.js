const router = require('express').Router();
const userService = require('../services/userService.js');
const { extractErrorMessage } = require('../utils/errorHelper.js');


//REGISTER
router.get('/register', (req, res) => {
    res.render('users/register');
});

router.post('/register', async (req, res) => {
    const { username, password, repeatPassword } = req.body;

    try {
        await userService.register({ username, password, repeatPassword });
        res.redirect('/')
    } catch (err) {
        const errorMessages = extractErrorMessage(err);
        res.render('users/register', { errorMessages});
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
        res.render('users/login', { errorMessages});
    }
});


//LOGOUT
router.get('/logout', (req, res) => {
    res.clearCookie('authorization');
    res.redirect('/');
})

module.exports = router;
