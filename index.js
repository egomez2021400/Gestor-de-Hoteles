'use strict'

const express = require("express")
const app = express();
const { connection } = require("./src/database/connection");
require('dotenv').config();
const port = process.env.PORT;
const user = require('./src/routes/user.routes');
const hotel = require('./src/routes/hotel.routes');
const { adminApp } = require("./AdminAPP.controller");

connection();

app.use(express.urlencoded({extended: false}));

app.use('/api', user, hotel);

app.listen(port, () =>{
    console.log(`The server is connected to the port ${port}`);
});

adminApp();