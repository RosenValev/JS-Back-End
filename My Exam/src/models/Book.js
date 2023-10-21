const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'title is required'],
        minLength: [2, 'title must be at least 2 characters long'],
    },
    author: {
        type: String,
        required: [true, 'author is required'],
        minLength: [5, 'author must be at least 5 characters long'],
    },
    image: {
        type: String,
        required: [true, 'image is required'],
        match: [/^https?:\/\//, 'Invalid URL'],
    },
    bookReview: {
        type: String,
        required: [true, 'bookReview is required'],
        minLength: [10, 'bookReview must be at least 10 characters long'],
    },
    genre: {
        type: String,
        required: [true, 'genre is required'],
        minLength: [3, 'genre must be at least 3 characters long'],
    },
    stars: {
        type: Number,
        required: [true, 'stars is required'],
        min: 1,
        max: 5,
    },
    wishingList: [{
        type: mongoose.Types.ObjectId,
        ref: 'User',
    }],
    owner: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
    },
});

const Book = mongoose.model('Book', bookSchema);

module.exports = Book;