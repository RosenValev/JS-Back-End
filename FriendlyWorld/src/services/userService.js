const User = require('../models/User.js');
const bcrypt = require('bcrypt');
const { SECRET } = require('../config/secretConfig.js');
const jwtPromises = require('../lib/jwt.js');

exports.register = (userData) => User.create(userData);

exports.login = async (email, password) => {
    const user = await User.findOne({ email });
    if (!user) {
        throw new Error('Cannot find username or password');
    }

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
        throw new Error('Cannot find username or password');
    }

    const payload = {
        _id: user._id,
        email: user.email,
    }

    const token = jwtPromises.sign(payload, SECRET, { expiresIn: '2d' });
    return token;
};
