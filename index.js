const http = require('http')
const dotenv = require('dotenv');
const connectDB = require('./config/db');

dotenv.config({ path: './config/config.env' });
connectDB();


const server = http.createServer((req, res) => {

    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: "success" }))

});

const PORT = process.env.PORT || 5000

server.listen(PORT, () => console.log(`Server running on port ${PORT}`))