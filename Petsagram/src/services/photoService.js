const Photo = require('../models/Photo.js');

exports.create = (photoData) => Photo.create(photoData);

