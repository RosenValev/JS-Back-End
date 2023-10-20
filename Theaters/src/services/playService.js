const Play = require('../models/Play.js');

exports.create = (playData) => Play.create(playData);

exports.getById = (playId) => Play.findById(playId);

exports.getThreeSortedByLikes = () => Play.find({ isPublic: true }).sort({ usersLiked: -1 }).limit(3);

exports.AllPublicPlays = () => Play.find({ isPublic: true }).sort({ createdAt: -1 });

exports.like = (playId, userId) => {
    return Play.findOneAndUpdate({ _id: playId, usersLiked: { $ne: userId } }, { $push: { usersLiked: userId } });
};

exports.edit = (playId, playData) => Play.findByIdAndUpdate(playId, playData);

exports.delete = (playId) => Play.findByIdAndDelete(playId);

exports.sortedByDate = () => Play.find().sort({ createdAt: 1 });

exports.sortLikes = () => Play.find().sort({ usersLiked: 1 })




// Play.find({ $sortArray: { input: usersLiked, sortBy: 1 } })   не стана


// exports.getAll = () => Book.find().populate('owner');

// exports.create = (bookData) => Book.create(bookData);

// exports.getById = (bookId) => Book.findById(bookId).populate('owner');

// exports.wishToRead = (bookId, userId) => {
//     return Book.findOneAndUpdate({ _id: bookId, wishingList: { $ne: userId } }, { $push: { wishingList: userId } });
// };

// exports.delete = (bookId) => Book.findByIdAndDelete(bookId);

// exports.edit = (bookId, bookData) => Book.findByIdAndUpdate(bookId, bookData);

// exports.wishedBooks = (userId) => Book.find({ wishingList: userId }).populate('owner');

