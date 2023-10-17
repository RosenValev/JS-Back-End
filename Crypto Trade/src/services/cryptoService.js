const Crypto = require('../models/Crypto.js')


exports.getAllCryptos = () => Crypto.find().populate('owner');

exports.create = (cryptoData) => Crypto.create(cryptoData);

exports.getById = (cryptoId) => Crypto.findById(cryptoId).populate('owner');


// exports.create = (bookData) => Book.create(bookData);

// exports.getById = (bookId) => Book.findById(bookId).populate('owner');

// exports.wishToRead = (bookId, userId) => {
//     return Book.findOneAndUpdate({ _id: bookId, wishingList: { $ne: userId } }, { $push: { wishingList: userId } });
// };

// exports.delete = (bookId) => Book.findByIdAndDelete(bookId);

// exports.edit = (bookId, bookData) => Book.findByIdAndUpdate(bookId, bookData);

// exports.wishedBooks = (userId) => Book.find({ wishingList: userId }).populate('owner');

