const router = require('express').Router();
const userService = require('../services/userService.js');
const { extractErrorMessage } = require('../utils/errorHelper.js');


router.get('/register', (req, res) => {
    res.render('users/register');
});

router.post('/register', async (req, res) => {
    const { email, password, repeatPassword } = req.body;

    try {
        await userService.register({ email, password, repeatPassword });
        res.redirect('/users/login');
    } catch (err) {
        const errorMessages = extractErrorMessage(err);
        console.log(errorMessages);
        res.status(404).render('users/register', { errorMessages });
    }
})


router.get('/login', (req, res) => {
    res.render('users/login');
});


module.exports = router;
