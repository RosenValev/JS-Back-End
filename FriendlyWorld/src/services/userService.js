const User = require('../models/User.js');
const bcrypt = require('bcrypt');
const { SECRET } = require('../config/secretConfig.js');
const jwtPromises = require('../lib/jwt.js');

exports.register = (userData) => User.create(userData);




