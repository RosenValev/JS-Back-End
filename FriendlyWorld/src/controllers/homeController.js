const router = require('express').Router();
const { extractErrorMessage } = require('../utils/errorHelper.js');
const animalService = require('../services/animalService.js')


router.get('/', async (req, res) => {

    try {
        const animals = await animalService.lastThreeRecored().lean()
        res.render('home', { animals })
    }
    catch (err) {
        const errorMessages = extractErrorMessage(err);
        res.status(404).render('/', { errorMessages });
    }

})


router.get('/404', (req, res) => {
    res.render('404');
});


module.exports = router;