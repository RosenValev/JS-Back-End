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












//EDIT








//DELETE


module.exports = router;

