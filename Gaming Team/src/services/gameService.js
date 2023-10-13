const Game = require('../models/Game.js');

exports.create = (gameData) => Game.create(gameData);

exports.getAll = () => Game.find().populate('owner');

exports.getById = (gameId) => Game.findById(gameId);

exports.edit = (gameId, gameData) => Game.findByIdAndUpdate(gameId, gameData);

exports.delete = (gameId) => Game.findByIdAndDelete(gameId);