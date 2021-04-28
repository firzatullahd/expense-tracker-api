const mongoose = require('mongoose');
const winston = require('winston');

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.DB_URI, {
            useNewUrlParser: true,
            useCreateIndex: true,
            useUnifiedTopology: true
        });

        winston.info(`MongoDB Connected: ${conn.connection.host}`);
    } catch (err) {
        winston.error(`Error: ${err.message}`);
        process.exit(1);
    }
}

module.exports = connectDB;