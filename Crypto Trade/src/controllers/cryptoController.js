const router = require('express').Router();
const { extractErrorMessage } = require('../utils/errorHelper.js');
const { isAuth } = require('../middlewares/authorizationMiddleware.js')
const cryptoService = require('../services/cryptoService.js')
const { viewPaymentMethod } = require('../utils/viewHelper.js')

//CATALOG
router.get('/catalog', async (req, res) => {
    try {
        const cryptos = await cryptoService.getAllCryptos().lean()
        res.render('crypto/catalog', { cryptos });

    } catch (err) {
        const errorMessages = extractErrorMessage(err);
        res.render('crypto/catalog', errorMessages);
    }
});

//CREATE
router.get('/create', isAuth, (req, res) => {
    res.render('crypto/create');
});

router.post('/create', isAuth, async (req, res) => {
    const { name, image, price, description, paymentMethod } = req.body;

    try {
        await cryptoService.create({ name, image, price, description, paymentMethod, owner: req.user._id, });
        res.redirect('/crypto/catalog');
    } catch (err) {
        const errorMessages = extractErrorMessage(err);
        res.render('crypto/create', { errorMessages, name, image, price, description, paymentMethod });
    }
});

//DETAILS
router.get('/:cryptoId/details', async (req, res) => {
    const cryptoId = req.params.cryptoId;
    const userId = req.user?._id
    let isBought = false;

    try {
        const crypto = await cryptoService.getById(cryptoId).lean();
        const isOwner = userId == crypto.owner._id;

        if (JSON.parse(JSON.stringify(crypto.buyCrypto)).includes(userId)) {
            isBought = true;
        }

        res.render('crypto/details', { crypto, isOwner, isBought });
    } catch (err) {
        const errorMessages = extractErrorMessage(err);
        res.render('crypto/details', { errorMessages });
    }
});

//BUY 
router.get('/:cryptoId/buy', isAuth, async (req, res) => {
    const cryptoId = req.params.cryptoId;
    const userId = req.user?._id;

    try {
        await cryptoService.buyCrypto(cryptoId, userId);
        res.redirect(`/crypto/${cryptoId}/details`);
    } catch (err) {
        const errorMessages = extractErrorMessage(err);
        res.render('crypto/details', { errorMessages });
    }
});

//EDIT
router.get('/:cryptoId/edit', isAuth, async (req, res) => {
    const cryptoId = req.params.cryptoId;

    try {
        const crypto = await cryptoService.getById(cryptoId).lean();
        const options = viewPaymentMethod(crypto.paymentMethod);
        res.render('crypto/edit', { crypto, options })
    } catch (err) {
        const errorMessages = extractErrorMessage(err);
        res.render('crypto/edit', { errorMessages });
    }
});

router.post('/:cryptoId/edit', isAuth, async (req, res) => {
    const cryptoId = req.params.cryptoId;
    const cryptoData = req.body;

    try {
        await cryptoService.edit(cryptoId, cryptoData)
        res.redirect(`/crypto/${cryptoId}/details`)
    } catch (err) {
        const errorMessages = extractErrorMessage(err);
        res.render('crypto/edit', { errorMessages });
    }
});


//DELETE
router.get('/:cryptoId/delete', isAuth, async (req, res) => {
    const cryptoId = req.params.cryptoId;

    try {
        await cryptoService.delete(cryptoId);
        res.redirect('/crypto/catalog');
    } catch (err) {
        const errorMessages = extractErrorMessage(err);
        res.render(`crypto/${cryptoId}/details`, { errorMessages });
    }
});

//SEARCH
router.get('/search', isAuth, async (req, res) => {
    const { search, paymentMethod } = req.query;

    try {
        const cryptos = await cryptoService.search(search, paymentMethod);
        res.render('crypto/search', { cryptos });
    } catch (err) {
        const errorMessages = extractErrorMessage(err);
        res.render('crypto/search', { errorMessages });
    }
});

module.exports = router;