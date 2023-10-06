const Photo = require('../models/Photo.js');

exports.create = (photoData) => Photo.create(photoData);

exports.getAllPhotos = () => Photo.find().populate('owner');

exports.getById = (photoId) => Photo.findById(photoId).populate('owner');

exports.edit = (photoId, photoData) => Photo.findByIdAndUpdate(photoId, photoData);

exports.delete = (photoId) => Photo.findByIdAndDelete(photoId);