const router = require('express').Router();
const { extractErrorMessage } = require('../utils/errorHelper.js');
const { isAuth } = require('../middlewares/authorizationMiddleware.js')
const playService = require('../services/playService.js')



//CATALOG




//CREATE
router.get('/create', isAuth, (req, res) => {
    res.render('theater/create')
});

router.post('/create', isAuth, async (req, res) => {
    let { title, description, image, isPublic } = req.body
    try {
        // console.log({ isPublic })
        if (isPublic === '') {
            isPublic = true;
        }
        await playService.create({ title, description, image, isPublic });
        res.redirect('/')
    } catch (err) {
        const errorMessages = extractErrorMessage(err);
        res.render('theater/create', { errorMessages, title, description, image, isPublic })
    }
});

//DETAILS
router.get('/:playId/details', isAuth, async (req, res) => {
    const playId = req.params.playId;
    const userId = req.user?._id;
    let isLiked = false;

    try {
        const play = await playService.getById(playId).lean();
        const isOwner = userId == play.owner._id;

        if (JSON.parse(JSON.stringify(play.usersLiked)).includes(userId)) {
            isLiked = true;
        }

        res.render('theater/details', { play, isOwner, isLiked })
    } catch (err) {
        const errorMessages = extractErrorMessage(err);
        res.render('theater/details', { errorMessages })
    }
});

//LIKE
router.get('/:playId/like', isAuth, async (req, res) => {
    const playId = req.params.playId;
    const userId = req.user?._id

    try {
        await playService.like(playId, userId);
        res.redirect(`/theater/${playId}/details`)

    } catch (err) {
        const errorMessages = extractErrorMessage(err);
        res.redirect(`/theater/${playId}/details`, { errorMessages });
    }
});












//EDIT








//DELETE


module.exports = router;

