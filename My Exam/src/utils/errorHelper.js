const { MongooseError } = require('mongoose');

exports.extractErrorMessage = (err) => {

    if (err instanceof MongooseError) {
        return Object.values(err.errors).map(er => er.message)
    } else if (err) {
        return [err.message];
    }
}