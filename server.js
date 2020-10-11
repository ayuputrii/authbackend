const express = require('express');
const app = express();
const bodyParser = require("body-parser");
const db = require('./src/Helpers/db');
const userRoute = require('./src/Routes/userRoutes');
const authRoute = require('./src/Routes/authRoutes');
require('dotenv').config()
    // const router = require("./src/Routes");
    // const { login } = require("./src/Controllers/Auth");

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/", (req, res) => {
    res.send("Hello Gais!");
});


app.use('/api/v1/users', userRoute);
app.use('/api/v1/auth', authRoute);

app.listen(process.env.DEFAULT_PORT, () => {
    console.log(`Server is running on port ${process.env.DEFAULT_PORT}`)
})