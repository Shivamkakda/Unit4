const express = require('express');

const connect = require('../src/configs/db');
const usersController = require("../src/controllers/user.controller");
const app = express();
app.use(express.json());

app.use("/",usersController);


const start = async () => {
    await connect();
    app.listen(2727, () =>{
        console.log("Listening to port 2727");
    });
};

module.exports = start;