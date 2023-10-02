const router = require('express').Router();
const animalService = require('../services/animalService.js')
const { extractErrorMessage } = require('../utils/errorHelper.js');


router.get('/dashboard', (req, res) => {
    res.render('animals/dashboard')
});



module.exports = router; 