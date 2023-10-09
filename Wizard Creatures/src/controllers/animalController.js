const router = require('express').Router();
const { extractErrorMessage } = require('../utils/errorHelper.js');
const { isAuth } = require('../middlewares/authorizationMiddleware.js')
const animalService = require('../services/animalService.js')



//CATALOG i.e. all-posts
router.get('/all-posts', async (req, res) => {

    try {
        const animals = await animalService.getAllAnimals().lean();
        res.render('animals/all-posts', { animals });
    } catch (err) {
        const errorMessages = extractErrorMessage(err);
        res.render('animals/all-posts', { errorMessages })
    }
});

//CREATE
router.get('/create', isAuth, (req, res) => {
    res.render('animals/create');
});


router.post('/create', isAuth, async (req, res) => {
    const { name, species, skinColor, eyeColor, image, description } = req.body;

    try {
        await animalService.create({ name, species, skinColor, eyeColor, image, description, owner: req.user._id });
        res.redirect('/animals/all-posts');
    } catch (err) {
        const errorMessages = extractErrorMessage(err);
        res.render('animals/create', { errorMessages, name, species, skinColor, eyeColor, image, description })
    }
});


//DETAILS

router.get('/:animalId/details', async (req, res) => {
    const animalId = req.params.animalId
    const userId = req.user?._id;
    let isVoted = false;
    let emails = [];

    try {
        const animal = await animalService.getOne(animalId).lean();
        const isOwner = req.user?._id === animal.owner._id.toString();

        if (JSON.parse(JSON.stringify(animal.votes)).includes(userId)) {
            isVoted = true;
        }

        const totalVotes = animal.votes.length;
        const votesResult = await animalService.getVoted(animalId).lean();
        votesResult.votes.forEach(el => emails.push(el.email));
        const resultEmails = emails.join(', ');

        res.render('animals/details', { animal, isOwner, isVoted, totalVotes, resultEmails });

    } catch (err) {
        const errorMessages = extractErrorMessage(err);
        res.render('/animals/details', { errorMessages });
    }
});

//VOTE

router.get('/:animalId/vote', isAuth, async (req, res) => {
    const animalId = req.params.animalId
    const userId = req.user?._id;

    try {
        await animalService.vote(animalId, userId);
        res.redirect(`/animals/${animalId}/details`);

    } catch (err) {
        const errorMessages = extractErrorMessage(err);
        res.redirect(`/animals/${animalId}/details`, { errorMessages });
    }
});


//EDIT
router.get('/:animalId/edit', isAuth, async (req, res) => {
    const animalId = req.params.animalId;

    try {
        const animal = await animalService.getOne(animalId).lean();
        const isOwner = req.user?._id === animal.owner._id.toString();
        if (!isOwner) {
            return res.redirect(`/animals/${animalId}/details`);   // Dont have acces if it is not the owner
        }
        res.render('animals/edit', { animal });

    } catch (err) {
        const errorMessages = extractErrorMessage(err);
        res.render('animals/edit', { errorMessages });
    }
});

router.post('/:animalId/edit', isAuth, async (req, res) => {
    const animalId = req.params.animalId;
    const animalData = req.body;

    try {
        await animalService.edit(animalId, animalData);
        res.redirect(`/animals/${animalId}/details`);

    } catch (err) {
        const errorMessages = extractErrorMessage(err);
        res.render('animals/edit', { errorMessages });
    }
});

//DELETE

router.get('/:animalId/delete', isAuth, async (req, res) => {
    const animalId = req.params.animalId;

    try {
        await animalService.delete(animalId);
        res.redirect('/animals/all-posts');
    } catch (err) {
        const errorMessages = extractErrorMessage(err);
        res.redirect(`/animals/${animalId}/details`, { errorMessages });
    }
});

module.exports = router;
