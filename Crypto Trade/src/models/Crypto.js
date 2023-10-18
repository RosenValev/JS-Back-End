const mongoose = require('mongoose');

const cryptoSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'name is required'],
        minLength: [2, 'name must be at least 2 characters long'],
    },
    image: {
        type: String,
        required: [true, 'image is required'],
        match: [/^https?:\/\//, 'Invalid URL'],
    },
    price: {
        type: Number,
        required: [true, 'price is required'],
        validate: {
            validator: function (value) {
                return value > 0
            },
            message: "price must be possitive number!"
        },
    },
    description: {
        type: String,
        required: [true, 'description is required'],
        minLength: [10, 'description must be at least 10 characters long'],
    },
    paymentMethod: {
        type: String,
        required: [true, 'payment method is required'],
        minLength: [3, 'payment method must be at least 3 characters long'],
    },
    buyCrypto: [{
        type: mongoose.Types.ObjectId,
        ref: 'User',
    }],
    owner: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
    },
});

const Crypto = mongoose.model('Crypto', cryptoSchema);

module.exports = Crypto;