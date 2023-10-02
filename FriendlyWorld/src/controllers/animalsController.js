const router = require('express').Router();
const animalService = require('../services/animalService.js')
const { extractErrorMessage } = require('../utils/errorHelper.js');


router.get('/dashboard', (req, res) => {



    res.render('animals/dashboard')
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
        console.log(name, years, kind, image, need, location, description)
        res.redirect('/animals/dashboard')


    } catch (err) {
        const errorMessages = extractErrorMessage(err);
        console.log(errorMessages);
        res.status(404).render('animals/create', { errorMessages });
    }
});


router.get('/search', (req, res) => {
    res.render('animals/search');
});



module.exports = router; 