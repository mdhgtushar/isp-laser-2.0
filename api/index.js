const express = require('express');
const fs = require('fs');
const app = express();
const featureRoutes = require('./feature/routes');
const notfoundHandler = require('./util/notfoundHandler');
const connectDB = require('./util/db');
const dotenv = require('dotenv');
dotenv.config();

app.use(express.json());

// main route
app.get("/", (req, res) => {
    const html = fs.readFileSync('index.html', 'utf8');
    res.send(html);
})

// feature routes
app.use("/api", featureRoutes);


// 404 error handler - catches all non-existent routes
app.use(notfoundHandler);

//app start
app.listen(5000, () => {
    connectDB();
    console.log('Server is running on port 5000');
})