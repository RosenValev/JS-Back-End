const mongoose = require('mongoose');

const auctionSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'title is required'],
        minLength: [4, 'title must be at least 4 characters long'],
    },
    description: {
        type: String,
        required: [true, 'description is required'],
        maxLength: [200, 'description must be max 200 characters long'],
    },
    image: {
        type: String,
        required: [true, 'image is required'],
        match: [/^https?:\/\//, 'Invalid URL'],
    },
    category: {
        type: String,
        required: [true, 'category is required'],
    },
    price: {
        type: Number,
        required: [true, 'price is required'],
        min: 0,
    },
    bidder: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
    },
    author: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
    },
});

const Auction = mongoose.model('Auction', auctionSchema);

module.exports = Auction;