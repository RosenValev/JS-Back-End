const mongoose = require('mongoose');

const animalSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'name is required'],
        minLength: [2, 'name must be at least 2 characters long'],
    },
    species: {
        type: String,
        required: [true, 'species is required'],
        minLength: [3, 'species must be at least 3 characters long'],
    },
    skinColor: {
        type: String,
        required: [true, 'skinColor is required'],
        minLength: [3, 'skinColor must be at least 3 characters long'],
    },
    eyeColor: {
        type: String,
        required: [true, 'eyeColor is required'],
        minLength: [3, 'eyeColor must be at least 3 characters long'],
    },
    image: {
        type: String,
        required: [true, 'Image is required'],
        match: [/^https?:\/\//, 'Invalid URL'],
    },
    description: {
        type: String,
        required: [true, 'description is required'],
        minLength: [5, 'description must be at least 5 characters long'],
        maxLength: [500, 'description must be no longer than 500 characters long'],
    },
    votes: [{
        type: mongoose.Types.ObjectId,
        ref: 'User',
    }],
    owner: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
    }
});


const Animal = mongoose.model('Animal', animalSchema);

module.exports = Animal;