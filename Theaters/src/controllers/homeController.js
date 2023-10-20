const router = require('express').Router();
const playService = require('../services/playService.js')
const { extractErrorMessage } = require('../utils/errorHelper.js');

router.get('/', async (req, res) => {
    let plays;

    if (req.user) {
        plays = await playService.AllPublicPlays().lean();
        res.render('user-home', { plays });
    } else {
        plays = await playService.getThreeSortedByLikes().lean();
        res.render('guest-home', { plays })
    }
})

router.get('/sort-by-date', async (req, res) => {
    try {
        const plays = await playService.sortedByDate().lean()
        res.render('user-home', { plays });
    } catch (err) {
        const errorMessages = extractErrorMessage(err);
        res.render('user-home', { errorMessages })
    }
});

router.get('/sort-by-likes', async (req, res) => {
    try {
        const plays = await playService.sortLikes().lean()
        res.render('user-home', { plays });
    } catch (err) {
        const errorMessages = extractErrorMessage(err);
        res.render('user-home', { errorMessages })
    }
});

module.exports = router;