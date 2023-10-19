const jwtPromises = require('../lib/jwt.js');
const { SECRET } = require('../config/secretConfig.js')

exports.auth = async (req, res, next) => {
    const token = req.cookies['authorization'];

    if (token) {
        try {
            const decodedToken = await jwtPromises.verify(token, SECRET);
            req.user = decodedToken // Adding information for the user for all actions afterwards.
            res.locals.user = decodedToken;
            res.locals.isLogged = true;
            next();

        } catch (err) {
            res.clearCookie('authorization');
            res.redirect('/users/login');
        }
    } else {
        next();
    }
};

exports.isAuth = (req, res, next) => {
    if (!req.user) {
        return res.redirect('/users/login');
    }
    next();
}