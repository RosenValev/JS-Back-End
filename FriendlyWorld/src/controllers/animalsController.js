const router = require('express').Router();
const animalService = require('../services/animalService.js')
const { extractErrorMessage } = require('../utils/errorHelper.js');


router.get('/dashboard', async (req, res) => {

    try {
        const animals = await animalService.getAllAnimals().lean()
        res.render('animals/dashboard', { animals });

    } catch (err) {
        const errorMessages = extractErrorMessage(err);
        render('/', errorMessages);
    }

});


router.get('/create', (req, res) => {
    res.render('animals/create')
});


router.post('/create', async (req, res) => {
    const { name, years, kind, image, need, location, description } = req.body;

    try {
        await animalService.create({
            name,
            years,
            kind,
            image,
            need,
            location,
            description,
            owner: req.user._id,
        });

        res.redirect('/animals/dashboard')

    } catch (err) {
        const errorMessages = extractErrorMessage(err);
        render('animals/create', { errorMessages, name, years, kind, image, need, location, description });
    }
});

router.get('/:animalId/details', async (req, res) => {
    const animalId = req.params.animalId;

    try {
        const animal = await animalService.getById(animalId).lean();
        res.render('animals/details', {animal});
    } catch (err) {
        const errorMessages = extractErrorMessage(err);
        render('animals/details', errorMessages)
    }
});



router.get('/search', (req, res) => {
    res.render('animals/search');
});



module.exports = router; 