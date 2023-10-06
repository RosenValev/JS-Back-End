const mongoose = require('mongoose');
// const User = require('./User.js');

const photoSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
        minLength: [2, 'Name must be at least 2 characters long'],

    },
    image: {
        type: String,
        required: [true, 'Image is required'],
    },
    age: {
        type: Number,
        required: [true, 'Name is required'],
        min: [1, 'Age must be greater than 1'],
        max: [100, 'Age must less than 100'],
    },
    description: {
        type: String,
        required: [true, 'Name is required'],
        minLength: [5, 'Description must be at least 5 characters long'],
        maxLength: [50, 'Description must not more than 50 characters long'],
    },
    location: {
        type: String,
        required: [true, 'Name is required'],
        minLength: [5, 'Location must be at least 5 characters long'],
        maxLength: [50, 'Location must not more than 50 characters long'],
    },
    commentList: [{
        userId: String,
        comment: String,
    }],
    owner: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    },
});

const Photo = mongoose.model('Photo', photoSchema);

module.exports = Photo;