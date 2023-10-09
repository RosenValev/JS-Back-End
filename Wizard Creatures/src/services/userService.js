const User = require('../models/User.js');
const bcrypt = require('bcrypt');
const { SECRET } = require('../config/secretConfig.js');
const jwtPromises = require('../lib/jwt.js');

exports.register = async (userData) => {
    //Logic for automatic login after register
    const user = await User.findOne({ email: userData.email });
    if (user) {
        throw new Error('Email already exists');
    }

    const newUser = await User.create(userData);
    const token = generateToken(newUser);
    return token;
};

exports.login = async (email, password) => {
    const user = await User.findOne({ email });
    if (!email) {
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
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email
    }

    const token = jwtPromises.sign(payload, SECRET, { expiresIn: '2d' });
    return token;
}