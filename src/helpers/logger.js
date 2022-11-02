const log4js = require('log4js');

log4js.configure({
    appenders: {
        loggerInfo: { type: 'console' },
        loggerError: { type: 'file', filename: './logs/error.log' }
    },
    categories: {
        default: { appenders: ["loggerInfo"], level: 'trace' },
        consola: { appenders: ["loggerInfo"], level: 'info' },
        errorArchivo: { appenders: ["loggerError", "loggerInfo"], level: 'error' }
    },
})

const logger = log4js.getLogger();
const loggErrorFile = log4js.getLogger('errorArchivo');

module.exports = { logger, loggErrorFile,  }