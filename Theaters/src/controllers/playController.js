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
        await playService.create({ title, description, image, isPublic, owner: req.user._id, });
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
router.get('/:playId/edit', isAuth, async (req, res) => {
    const playId = req.params.playId;

    try {
        const play = await playService.getById(playId).lean()
        const isChecked = play.isPublic == true;
        res.render('theater/edit', { play, isChecked })
    } catch (err) {
        const errorMessages = extractErrorMessage(err);
        res.render('theater/edit', { errorMessages });
    }
});

router.post('/:playId/edit', isAuth, async (req, res) => {
    const playId = req.params.playId;
    let { title, description, image, isPublic } = req.body
    // console.log({ isPublic })

    try {
        if (isPublic === 'on') {
            isPublic = true;
        } else {
            isPublic = false;
        }
        await playService.edit(playId, { title, description, image, isPublic });
        res.redirect(`/theater/${playId}/details`)
    } catch (err) {
        const errorMessages = extractErrorMessage(err);
        res.render('theater/edit', { errorMessages });
    }
});

//DELETE
router.get('/:playId/delete', isAuth, async (req, res) => {
    const playId = req.params.playId;

    try {
        await playService.delete(playId);
        res.redirect('/');
    } catch (err) {
        const errorMessages = extractErrorMessage(err);
        res.redirect(`/theater/${playId}/details`);
    }
});

module.exports = router;

