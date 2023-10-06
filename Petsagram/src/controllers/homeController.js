const router = require('express').Router();
const { extractErrorMessage } = require('../utils/errorHelper.js');

router.get('/', async (req, res) => {
    res.render('home');
})


router.get('/404', (req, res) => {
    res.render('404');
});

module.exports = router;