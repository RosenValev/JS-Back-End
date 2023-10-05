const router = require('express').Router();
const photoService = require('../services/photoService.js');
const { extractErrorMessage } = require('../utils/errorHelper.js');

//CATALOG
router.get('/catalog', (req, res) => {
    res.render('photos/catalog')
});


//CREATE
router.get('/create', (req, res) => {
    res.render('photos/create')
});

router.post('/create', async (req, res) => {
    const { name, age, description, location, image } = req.body;

    try {
        await photoService.create({
            name,
            age,
            description,
            location,
            image,
            owner: req.user._id,
        });

        res.redirect('/photos/catalog')

    } catch (err) {
        const errorMessages = extractErrorMessage(err);
        res.render('photos/create', { errorMessages, name, age, description, location, image });
    }
});


module.exports = router;
