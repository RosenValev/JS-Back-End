const Photo = require('../models/Photo.js');

exports.create = (photoData) => Photo.create(photoData);

exports.getAllPhotos = () => Photo.find().populate('owner');

exports.getById = (photoId) => Photo.findById(photoId).populate('owner');

exports.edit = (photoId, photoData) => Photo.findByIdAndUpdate(photoId, photoData);

exports.delete = (photoId) => Photo.findByIdAndDelete(photoId);

exports.addComment = async (photoId, comment, userId) => {
    let photo = await Photo.findById(photoId);
    if (comment == "") {
        return;
    }

    photo.commentList.push({
        userId,
        comment,
    });
    await photo.save();

    return photo;
};

exports.findOwnPhotos = async (userId) => {
    let photos = await Photo.find().populate('owner').lean();

    if (userId) {
        photos = photos.filter(photo => photo.owner._id.toString() == userId);
    }

    return photos;
}