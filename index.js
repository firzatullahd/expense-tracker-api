const http = require('http')
const dotenv = require('dotenv');
const winston = require('winston');
const logging = require('./utils/logging');
const connectDB = require('./config/db');
const { getTransactions, addTransaction, deleteTransaction } = require('./controllers/transactions');
const { addUser, loginUser } = require('./controllers/users');

dotenv.config({ path: './config/config.env' });
connectDB();

const server = http.createServer((req, res) => {
    // user?
    if (req.url.replace(/\/$/, "") === "/api/transactions" && req.method === "GET") {
        getTransactions(req, res);
    } else if (req.url.replace(/\/$/, "") === "/api/transactions" && req.method === "POST") {
        addTransaction(req, res);
    } else if (req.url.match(/\/api\/transactions\/\w+/) && req.method === "DELETE") {
        const id = req.url.split('/')[3]
        deleteTransaction(req, res, id);
    } else if (req.url.replace(/\/$/, "") === "/register" && req.method === "POST") {
        addUser(req, res);
    } else if (req.url.replace(/\/$/, "") === "/login" && req.method === "POST") {
        loginUser(req, res);
    } else {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: "route not found" }));
    }
});
const PORT = process.env.PORT || 5000
logging();
if (!process.env.JWT_SECRET) throw new Error("FATAL ERROR: JWT_SECRET is not defined");
server.listen(PORT, () => winston.info(`Server running on port ${PORT}`))