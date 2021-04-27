const http = require('http')
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const { getTransactions, addTransaction, deleteTransaction } = require('./controllers/transactions');

dotenv.config({ path: './config/config.env' });
connectDB();

const server = http.createServer((req, res) => {
    if (req.url.replace(/\/$/, "") === "/api/transactions" && req.method === "GET") {
        getTransactions(req, res);
    } else if (req.url.replace(/\/$/, "") === "/api/transactions" && req.method === "POST") {
        addTransaction(req, res);
    } else if (req.url.match(/\/api\/transactions\/\w+/) && req.method === "DELETE") {
        const id = req.url.split('/')[3]
        deleteTransaction(req, res, id);
    } else {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: "route not found" }));
    }
});

const PORT = process.env.PORT || 5000

server.listen(PORT, () => console.log(`Server running on port ${PORT}`))