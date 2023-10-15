const User = require('../models/User.js');
const bcrypt = require('bcrypt');
const { SECRET } = require('../config/secretConfig.js');
const jwtPromises = require('../lib/jwt.js');

exports.register = async (userData) => {
    const user = await User.findOne({ username: userData.username });
    if (user) {
        throw new Error('Username already exists');
    }

    const newUser = await User.create(userData);
    return newUser;
};

exports.login = async (email, password) => {
    const user = await User.findOne({ email });
    if (!user) {
        throw new Error('Cannot find email or password');
    }

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
        throw new Error('Cannot find email or password');
    }

    const token = await generateToken(user);
    return token;
};


async function generateToken(user) {
    const payload = {
        _id: user._id,
        username: user.username,
        email: user.email
    }

    const token = jwtPromises.sign(payload, SECRET, { expiresIn: '2d' });
    return token;
}