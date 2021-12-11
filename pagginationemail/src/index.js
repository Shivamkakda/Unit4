const express = require('express');

const app = express();

app.use(express.json());
// express call
const userController = require("./controllers/user.controller");

app.use("/users", userController);

// app ko export
module.exports = app;