const mongoose = require('mongoose');

const uri = 'mongodb://127.0.0.1:27017/gaming-team';

async function dbConnect() {
    await mongoose.connect(uri);
}

module.exports = dbConnect;