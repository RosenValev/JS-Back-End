const mongoose = require('mongoose');

const playSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'title is required'],
        minLength: [2, 'title must be at least 2 characters long'],
        unique: true,
    },
    description: {
        type: String,
        required: [true, 'description is required'],
        manLength: [50, 'description must max 50 characters long'],
    },
    image: {
        type: String,
        required: [true, 'image is required'],
        match: [/^https?:\/\//, 'Invalid URL'],
    },
    isPublic: {
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Date,
        default: Date.now,
        required: [true, 'date is required'],
    },
    usersLiked: [{
        type: mongoose.Types.ObjectId,
        ref: 'User',
    }],
    owner: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
    },
});

const Play = mongoose.model('Play', playSchema);

module.exports = Play;