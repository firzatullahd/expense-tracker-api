const express = require('express');
const dotenv = require('dotenv');
const winston = require('winston');
const logging = require('./utils/logging');
const connectDB = require('./config/db');
const users = require('./routes/users');
const transactions = require('./routes/transactions');
const cors = require('cors');
const compression = require('compression');

dotenv.config({ path: './config/config.env' });
connectDB();
const app = express();

app.use(express.json());
app.use(cors())
app.use(compression())

app.use('/api', users);
app.use('/api', transactions);

const PORT = process.env.PORT || 5000
logging();
if (!process.env.JWT_SECRET) throw new Error("FATAL ERROR: JWT_SECRET is not defined");

app.listen(PORT, () => winston.info(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`))
