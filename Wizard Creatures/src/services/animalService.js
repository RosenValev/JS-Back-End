const Animal = require('../models/Animal.js');

exports.create = (animalData) => Animal.create(animalData);

exports.getAllAnimals = () => Animal.find().populate('owner');

exports.getOne = (animalId) => Animal.findById(animalId).populate('owner');

exports.edit = (animalId, animalData) => Animal.findByIdAndUpdate(animalId, animalData);

exports.delete = (animalId) => Animal.findByIdAndDelete(animalId);

exports.vote = (animalId, userId) => Animal.findByIdAndUpdate(animalId, { $push: { votes: userId } });

exports.getVoted = (animalId) => Animal.findById(animalId).populate('votes');