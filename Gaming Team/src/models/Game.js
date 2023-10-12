const mongoose = require('mongoose');

const gameSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'name is required'],
        minLength: [4, 'name must be at least 4 characters long'],
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
        }
    },
    description: {
        type: String,
        required: [true, 'description is required'],
        minLength: [10, 'description must be at least 10 characters long'],
    },
    genre: {
        type: String,
        required: [true, 'genre is required'],
        minLength: [2, 'genre must be at least 2 characters long'],
    },
    platform: {
        type: String,
        required: [true, 'platform is required'],
        // match: ['PC', 'Nintendo', 'PS4', 'PS5', 'XBOX'],
    },
    boughtBy: [{
        type: mongoose.Types.ObjectId,
        ref: 'User',
    }],
    owner: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
    },
});

const Game = mongoose.model('Game', gameSchema);

module.exports = Game;