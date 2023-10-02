const Animal = require('../models/Animal.js');


exports.create = (animalData) => Animal.create(animalData);


exports.lastThreeRecored = () => Animal.find().sort({ _id: -1 }).limit(3);