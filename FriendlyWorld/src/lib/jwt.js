const jsonwebtoken = require('jsonwebtoken');
const util = require('util');

const jwtPromises = {
    sign: util.promisify(jsonwebtoken.sign),
    verify: util.promisify(jsonwebtoken.verify),
}

module.exports = jwtPromises;