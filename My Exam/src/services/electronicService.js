const Electronic = require('../models/Electronic.js')

exports.create = (electronicData) => Electronic.create(electronicData);

exports.getAll = () => Electronic.find();

exports.getById = (electronicId) => Electronic.findById(electronicId).populate('owner');

exports.edit = (electronicId, electronicData) => Electronic.findByIdAndUpdate(electronicId, electronicData, { runValidators: true });

exports.delete = (electronicId) => Electronic.findByIdAndDelete(electronicId);

exports.buyElectronic = (electronicId, userId) => {
    return Electronic.findOneAndUpdate({ _id: electronicId, buyingList: { $ne: userId } }, { $push: { buyingList: userId } });
};

exports.search = async (searchName, searchType) => {
    let electronics = await Electronic.find().lean();

    if (searchName) {
        electronics = electronics.filter(el => el.name.toLowerCase().includes(searchName.toLowerCase()));
    }

    if (searchType) {
        electronics = electronics.filter(el => el.type.toLowerCase().includes(searchType.toLowerCase()));
    }
    return electronics;
}


