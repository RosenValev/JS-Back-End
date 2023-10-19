const router = require('express').Router();
const playService = require('../services/playService.js')


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

module.exports = router;