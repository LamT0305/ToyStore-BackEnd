const { constants } = require('../constants');

const errorHandler = (err, req, res, next) => {
    const statusCode = res.statusCode ? res.statusCode : 500;
    switch (statusCode) {
        case constants.Validation_error:
            res.json({ title: "Validation failed", message: err.message, stackTrace: err.stack });
            break;
        case constants.Not_found:
            res.json({ title: "Not found", message: err.message, stackTrace: err.stack });
            break;
        case constants.Forbidden:
            res.json({ title: "Error", message: err.message, stackTrace: err.stack });
            break;
        case constants.Unauthorized:
            res.json({ title: "User is unauthorized", message: err.message, stackTrace: err.stack });
            break;
        default:
            break;
    }
}

module.exports = errorHandler;