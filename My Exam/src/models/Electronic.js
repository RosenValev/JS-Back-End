const mongoose = require('mongoose');

const electronicSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'name is required'],
        minLength: [10, 'name must be at least 10 characters long'],
    },
    type: {
        type: String,
        required: [true, 'type is required'],
        minLength: [2, 'type must be at least 2 characters long'],
    },
    damages: {
        type: String,
        required: [true, 'damages is required'],
        minLength: [10, 'damages must be at least 10 characters long'],
    },
    image: {
        type: String,
        required: [true, 'image is required'],
        match: [/^https?:\/\//, 'Invalid URL'],
    },
    description: {
        type: String,
        required: [true, 'description is required'],
        minLength: [10, 'description must be at least 10 characters long'],
        maxLength: [200, 'description must less than 200 characters long'],
    },
    production: {
        type: Number,
        required: [true, 'production is required'],
        min: 1900,
        max: 2023,
    },
    exploitation: {
        type: Number,
        required: [true, 'exploitation is required'],
        min: 0,
    },
    price: {
        type: Number,
        required: [true, 'price is required'],
        min: 0,
    },
    buyingList: [{
        type: mongoose.Types.ObjectId,
        ref: 'User',
    }],
    owner: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
    },
});

const Electronic = mongoose.model('Electronic', electronicSchema);

module.exports = Electronic;