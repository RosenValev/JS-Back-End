const mongoose = require('mongoose');

const animalSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required!'],
        minLength: [3, 'characters required minimum with 3 length'],
        maxLength: [50, 'characters required maximum with 50 length'],
    },
    years: {
        type: Number,
        required: [true, 'Years are required!'],
        min: [0, 'Years should be a possitive number'],
    },
    kind: {
        type: String,
        required: [true, 'Kind is required!'],
        minLength: [3, 'characters required minimum with 3 length'],
        maxLength: [50, 'characters required maximum with 50 length'],
    },
    image: {
        type: String,
        required: [true, 'Image is required!'],
    },
    need: {
        type: String,
        required: [true, 'Need is required!'],
        minLength: [3, 'characters required minimum with 3 length'],
        maxLength: [50, 'characters required maximum with 50 length'],
    },
    location: {
        type: String,
        required: [true, 'Location is required!'],
        minLength: [3, 'characters required minimum with 3 length'],
        maxLength: [50, 'characters required maximum with 50 length'],
    },
    description: {
        type: String,
        required: [true, 'Description is required!'],
        minLength: [3, 'characters required minimum with 3 length'],
        maxLength: [500, 'characters required maximum with 500 length'],
    },
    donations: [{
        type: mongoose.Types.ObjectId,
        ref: 'User'
    }],
    owner: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    }
});

const Animal = mongoose.model('Animal', animalSchema);

module.exports = Animal;

