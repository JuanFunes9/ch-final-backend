const {logger, loggErrorFile} = require('../helpers/logger');

const loggerMiddleware = (req, res, next) => {
    const fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
    logger.info(`${req.method}: ${fullUrl}`);
    next();
}

module.exports = loggerMiddleware;