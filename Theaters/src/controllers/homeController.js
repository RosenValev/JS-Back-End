const router = require('express').Router();
const userService = require('../services/userService.js');


router.get('/', async (req, res) => {
    const currentUserId = req.user?._id;
    const isRegisteredUser = await userService.findUser(currentUserId).lean();

    if (isRegisteredUser.length !== 0) {
        res.render('user-home');
    } else {
        res.render('guest-home')
    }
})

module.exports = router;