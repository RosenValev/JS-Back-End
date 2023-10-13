const router = require('express').Router();
const { extractErrorMessage } = require('../utils/errorHelper.js');
const { isAuth } = require('../middlewares/authorizationMiddleware.js')
const gameService = require('../services/gameService.js')
const { getViewPlatform } = require('../utils/viewHelper.js')


//CATALOG
router.get('/catalog', async (req, res) => {
    try {
        const games = await gameService.getAll().lean()
        res.render('games/catalog', { games })

    } catch (err) {
        const errorMessages = extractErrorMessage(err);
        res.render('games/catalog', { errorMessages })

    }
});

//CREATE
router.get('/create', isAuth, (req, res) => {
    try {
        res.render('games/create');
    } catch (err) {
        const errorMessages = extractErrorMessage(err);
        res.render('games/create', { errorMessages });
    }
});

router.post('/create', isAuth, async (req, res) => {
    const { platform, name, image, price, genre, description } = req.body;

    try {
        await gameService.create({ platform, name, image, price, genre, description, owner: req.user._id });
        res.redirect('/games/catalog');
    } catch (err) {
        const errorMessages = extractErrorMessage(err);
        res.render('games/create', { errorMessages, name, image, price, genre, description })
    }
});

//DETAILS

router.get('/:gameId/details', async (req, res) => {
    const gameId = req.params.gameId;

    try {
        const game = await gameService.getById(gameId).lean();
        const isOwner = req.user?._id == game.owner._id;
        res.render('games/details', { game, isOwner });
    } catch (err) {
        const errorMessages = extractErrorMessage(err);
        res.render('games/details', { errorMessages });
    }
});



//EDIT
router.get('/:gameId/edit', isAuth, async (req, res) => {
    const gameId = req.params.gameId;

    try {
        const game = await gameService.getById(gameId).lean();
        const isOwner = req.user?._id == game.owner._id;
        if (!isOwner) {
            return res.redirect(`/games/${gameId}/details`);   // Dont have acces if it is not the owner
        }

        const options = getViewPlatform(game.platform)
        res.render('games/edit', { game, options });
    } catch (err) {
        const errorMessages = extractErrorMessage(err);
        res.render('games/edit', { errorMessages });
    }
});

router.post('/:gameId/edit', isAuth, async (req, res) => {
    const gameId = req.params.gameId;
    const gameData = req.body;

    try {
        await gameService.edit(gameId, gameData);
        res.redirect(`/games/${gameId}/details`);

    } catch (err) {
        const errorMessages = extractErrorMessage(err);
        res.render('games/edit', { errorMessages })
    }
});

//DELETE
router.get('/:gameId/delete', isAuth, async (req, res) => {
    const gameId = req.params.gameId;

    try {
        await gameService.delete(gameId);
        res.redirect('/games/catalog')
    } catch (err) {
        const errorMessages = extractErrorMessage(err);
        res.redirect(`/games/${gameId}/details`, { errorMessages });
    }
});

module.exports = router;
