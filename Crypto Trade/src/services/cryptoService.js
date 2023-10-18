const Crypto = require('../models/Crypto.js')

exports.getAllCryptos = () => Crypto.find().populate('owner');

exports.create = (cryptoData) => Crypto.create(cryptoData);

exports.getById = (cryptoId) => Crypto.findById(cryptoId).populate('owner');

exports.delete = (cryptoId) => Crypto.findByIdAndDelete(cryptoId);

exports.edit = (cryptoId, cryptoData) => Crypto.findByIdAndUpdate(cryptoId, cryptoData);

exports.buyCrypto = (cryptoId, userId) => {
    return Crypto.findOneAndUpdate({ _id: cryptoId, buyCrypto: { $ne: userId } }, { $push: { buyCrypto: userId } });
}

exports.search = async (search, paymentMethod) => {
    let cryptos = await Crypto.find().lean();

    if (search) {
        cryptos = cryptos.filter(crypto => crypto.name.toLowerCase().includes(search.toLowerCase()));
    }

    if (paymentMethod) {
        cryptos = cryptos.filter(crypto => crypto.paymentMethod == paymentMethod);
    }
    
    return cryptos;
};



// exports.create = (bookData) => Book.create(bookData);

// exports.getById = (bookId) => Book.findById(bookId).populate('owner');

// exports.wishToRead = (bookId, userId) => {
//     return Book.findOneAndUpdate({ _id: bookId, wishingList: { $ne: userId } }, { $push: { wishingList: userId } });
// };

// exports.delete = (bookId) => Book.findByIdAndDelete(bookId);

// exports.edit = (bookId, bookData) => Book.findByIdAndUpdate(bookId, bookData);

// exports.wishedBooks = (userId) => Book.find({ wishingList: userId }).populate('owner');

