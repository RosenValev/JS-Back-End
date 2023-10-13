const Game = require('../models/Game.js');

exports.create = (gameData) => Game.create(gameData);

exports.getAll = () => Game.find().populate('owner');

exports.getById = (gameId) => Game.findById(gameId).populate('owner');

exports.edit = (gameId, gameData) => Game.findByIdAndUpdate(gameId, gameData);

exports.delete = (gameId) => Game.findByIdAndDelete(gameId);

exports.buyGame = (gameId, userId) => Game.findByIdAndUpdate(gameId, { $push: { boughtBy: userId } });

exports.search = async (search, platform) => {
    let games = await Game.find().lean();

    if (search) {
        games = games.filter(game => game.name.toLowerCase().includes(search.toLowerCase()));
    }

    if (platform) {
        games = games.filter(game => game.platform == platform);
    }
    return games;
}

// exports.search = (search, platform) => Game.find({ name: { $regex: search, $options: 'i' }, platform: { $regex: platform } })
