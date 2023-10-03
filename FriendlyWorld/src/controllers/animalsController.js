const router = require('express').Router();
const animalService = require('../services/animalService.js')
const { extractErrorMessage } = require('../utils/errorHelper.js');
const { isAuth } = require('../middlewares/authorizationMiddleware.js')

//DASHBOARD
router.get('/dashboard', async (req, res) => {

    try {
        const animals = await animalService.getAllAnimals().lean()
        res.render('animals/dashboard', { animals });

    } catch (err) {
        const errorMessages = extractErrorMessage(err);
        render('animals/dashboard', errorMessages);
    }
});

//CREATE
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
        res.render('animals/create', { errorMessages, name, years, kind, image, need, location, description });
    }
});

//DETAILS
router.get('/:animalId/details', async (req, res) => {
    const animalId = req.params.animalId;
    const userId = req.user?._id
    let donated = false;

    try {
        const animal = await animalService.getById(animalId).lean();
        const isOwner = req.user?._id === animal.owner._id.toString();

        if ((JSON.stringify(animal.donations)).includes(userId)) {
            donated = true;
        }

        res.render('animals/details', { animal, isOwner, donated });

    } catch (err) {
        const errorMessages = extractErrorMessage(err);
        res.render('animals/details', errorMessages)
    }
});

//EDIT

router.get('/:animalId/edit', isAuth, async (req, res) => {
    const animalId = req.params.animalId;

    try {
        const animal = await animalService.getById(animalId).lean();
        res.render('animals/edit', { animal });
    } catch (err) {
        const errorMessages = extractErrorMessage(err);
        res.render('animals/edit', errorMessages)
    }
});

router.post('/:animalId/edit', isAuth, async (req, res) => {
    const animalId = req.params.animalId;
    const animalData = req.body;

    try {
        await animalService.edit(animalId, animalData);
        res.redirect(`/animals/${animalId}/details`)

    } catch (err) {
        const errorMessages = extractErrorMessage(err);
        res.render('animals/edit', errorMessages)
    }
});

//DELETE
router.get('/:animalId/delete', isAuth, async (req, res) => {
    const animalId = req.params.animalId;
    try {
        await animalService.delete(animalId)
        res.redirect('/animals/dashboard')

    } catch (err) {
        const errorMessages = extractErrorMessage(err);
        res.render('animals/details', errorMessages)
    }
});

//DONATE
router.get('/:animalId/donate', isAuth, async (req, res) => {
    const animalId = req.params.animalId;
    const userId = req.user?._id

    try {
        const animal = await animalService.getById(animalId);
        animal.donations.push(userId);
        await animal.save()
        res.redirect(`/animals/${animalId}/details`)
    } catch (err) {
        const errorMessages = extractErrorMessage(err);
        res.render(`/animals/${animalId}donate`, errorMessages)
    }

});

//SEARCH
router.get('/search', async (req, res) => {
    const { search } = req.query;

    try {
        const animals = await animalService.search(search);
        res.render('animals/search', { animals, search });
    } catch (err) {
        const errorMessages = extractErrorMessage(err);
        res.render('/animals/search', { errorMessages })

    }
});

module.exports = router; 