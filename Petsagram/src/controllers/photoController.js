const router = require('express').Router();
const photoService = require('../services/photoService.js');
const { extractErrorMessage } = require('../utils/errorHelper.js');
const { isAuth } = require('../middlewares/authorizationMiddleware.js')


//CATALOG
router.get('/catalog', async (req, res) => {
    try {
        const photos = await photoService.getAllPhotos().lean();
        res.render('photos/catalog', { photos });

    } catch (err) {
        const errorMessages = extractErrorMessage(err);
        res.render('photos/catalog', { errorMessages });
    }
});


//CREATE
router.get('/create', isAuth, (req, res) => {
    res.render('photos/create')
});

router.post('/create', isAuth, async (req, res) => {
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

        res.redirect('/photos/catalog');

    } catch (err) {
        const errorMessages = extractErrorMessage(err);
        res.render('photos/create', { errorMessages, name, age, description, location, image });
    }
});

//DETAILS
router.get('/:photoId/details', async (req, res) => {
    const photoId = req.params.photoId;
    let isOwner = false;
    // const userId = req.user?._id; 

    try {
        const photo = await photoService.getById(photoId).lean();
        isOwner = req.user?._id === photo.owner._id.toString();
        res.render('photos/details', { photo, isOwner });

    } catch (err) {
        const errorMessages = extractErrorMessage(err);
        res.render('photos/details', { errorMessages });
    }
});


//EDIT
router.get('/:photoId/edit', isAuth, async (req, res) => {
    const photoId = req.params.photoId;

    try {
        const photo = await photoService.getById(photoId).lean();
        res.render('photos/edit', { photo });

    } catch (err) {
        const errorMessages = extractErrorMessage(err);
        res.render('photos/details', { errorMessages });
    }
});

router.post('/:photoId/edit', isAuth, async (req, res) => {
    const photoId = req.params.photoId;
    const photoData = req.body;

    try {
        await photoService.edit(photoId, photoData);
        res.redirect(`/photos/${photoId}/details`);

    } catch (err) {
        const errorMessages = extractErrorMessage(err);
        res.render('photos/details', { errorMessages });
    }
});


module.exports = router;
