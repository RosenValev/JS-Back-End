const Play = require('../models/Play.js');

exports.create = (playData) => Play.create(playData);







// exports.getAll = () => Book.find().populate('owner');

// exports.create = (bookData) => Book.create(bookData);

// exports.getById = (bookId) => Book.findById(bookId).populate('owner');

// exports.wishToRead = (bookId, userId) => {
//     return Book.findOneAndUpdate({ _id: bookId, wishingList: { $ne: userId } }, { $push: { wishingList: userId } });
// };

// exports.delete = (bookId) => Book.findByIdAndDelete(bookId);

// exports.edit = (bookId, bookData) => Book.findByIdAndUpdate(bookId, bookData);

// exports.wishedBooks = (userId) => Book.find({ wishingList: userId }).populate('owner');

