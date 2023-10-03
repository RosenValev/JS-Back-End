const Animal = require('../models/Animal.js');

exports.create = (animalData) => Animal.create(animalData);

exports.lastThreeRecored = () => Animal.find().sort({ _id: -1 }).limit(3);

exports.getAllAnimals = () => Animal.find().populate('owner');

exports.getById = (animalId) => Animal.findById(animalId).populate('owner');

exports.edit = (animalId, animalData) => Animal.findByIdAndUpdate(animalId, animalData);

exports.delete = (animalId) => Animal.findByIdAndDelete(animalId);