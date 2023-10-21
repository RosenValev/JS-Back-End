const router = require('express').Router();
const { extractErrorMessage } = require('../utils/errorHelper.js');
const { isAuth } = require('../middlewares/authorizationMiddleware.js');
const electronicService = require('../services/electronicService.js');

//CATALOG
router.get('/catalog', async (req, res) => {
    try {
        const electronics = await electronicService.getAll().lean();
        res.render('electronics/catalog', { electronics });
    } catch (err) {
        const errorMessages = extractErrorMessage(err);
        res.render('electronics/catalog', { errorMessages });
    }
});

//CREATE
router.get('/create', isAuth, (req, res) => {
    res.render('electronics/create');
});

router.post('/create', isAuth, async (req, res) => {
    const { name, type, production, exploitation, damages, image, price, description } = req.body;
    try {
        await electronicService.create({
            name,
            type,
            production,
            exploitation,
            damages,
            image,
            price,
            description,
            owner: req.user._id,
        });
        res.redirect('/electronics/catalog');
    } catch (err) {
        const errorMessages = extractErrorMessage(err);
        res.render('electronics/create', {
            errorMessages,
            name,
            type,
            production,
            exploitation,
            damages,
            image,
            price,
            description
        });
    }
});

//DETAILS
router.get('/:electronicId/details', async (req, res) => {
    const electronicId = req.params.electronicId;
    const userId = req.user?._id;
    let isBought = false;

    try {
        const electronic = await electronicService.getById(electronicId).lean()
        const isOwner = userId === electronic.owner._id.toString();

        if (JSON.parse(JSON.stringify(electronic.buyingList)).includes(userId)) {
            isBought = true;
        }

        res.render('electronics/details', { electronic, isOwner, isBought })
    } catch (err) {
        const errorMessages = extractErrorMessage(err);
        res.render('electronics/details', { errorMessages })
    }
});

//EDIT
router.get('/:electronicId/edit', isAuth, async (req, res) => {
    const electronicId = req.params.electronicId;

    try {
        const electronic = await electronicService.getById(electronicId).lean();
        res.render('electronics/edit', { electronic });
    } catch (err) {
        const errorMessages = extractErrorMessage(err);
        res.render('electronics/edit', { errorMessages });
    }
});

router.post('/:electronicId/edit', isAuth, async (req, res) => {
    const electronicId = req.params.electronicId;
    const electronicData = req.body;

    try {
        await electronicService.edit(electronicId, electronicData);
        res.redirect(`/electronics/${electronicId}/details`);
    } catch (err) {
        const errorMessages = extractErrorMessage(err);
        const electronic = await electronicService.getById(electronicId).lean();
        res.render('electronics/edit', { errorMessages, electronic });
    }
});

//BUY
router.get('/:electronicId/buy', isAuth, async (req, res) => {
    const electronicId = req.params.electronicId;
    const userId = req.user?._id;

    try {
        await electronicService.buyElectronic(electronicId, userId);
        res.redirect(`/electronics/${electronicId}/details`)
    } catch (err) {
        const errorMessages = extractErrorMessage(err);
        res.redirect(`/electronics/${electronicId}/details`, { errorMessages });
    }
});


//DELETE
router.get('/:electronicId/delete', isAuth, async (req, res) => {
    const electronicId = req.params.electronicId;

    try {
        await electronicService.delete(electronicId);
        res.redirect('/electronics/catalog');
    } catch (err) {
        const errorMessages = extractErrorMessage(err);
        res.redirect(`/electronics/${electronicId}/details`, { errorMessages });
    }
});

//SEARCH
router.get('/search', isAuth, async (req, res) => {
    const { searchName, searchType } = req.query;

    try {
        const electronics = await electronicService.search(searchName, searchType);
        res.render('electronics/search', { electronics })
    } catch (err) {
        const errorMessages = extractErrorMessage(err);
        res.render('electronics/search', { errorMessages })
    }
})

module.exports = router;