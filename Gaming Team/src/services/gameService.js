const Game = require('../models/Game.js');

exports.create = (gameData) => Game.create(gameData);