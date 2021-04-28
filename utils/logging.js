const winston = require('winston');

module.exports = function () {

    process.on('uncaughtException', ex => {
        console.log("uncaught exception");
        winston.error(ex.message, ex);
        process.exit(1);
    });

    process.on('unhandledRejection', ex => {
        console.log("unhandled rejection");
        winston.error(ex.message, ex);
        process.exit(1);
    });

    winston.add(new winston.transports.Console());
    winston.add(new winston.transports.File({ filename: 'logfile.log' }));
}