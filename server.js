const express = require('express');
const morgan = require('morgan');
const colors = require('colors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

const app = express();

app.use(morgan('dev'));
app.use(express.json());
app.use(express.json({
    extended: true
}));

//Add environment values
dotenv.config({path: "./config/config.env"});

//Connect to Database
connectDB();

app.use("/api", require('./routes/students'));

const port = process.env.PORT || 3000

app.listen(port, console.log(`The server is running on port ${port}`.yellow.underline));
