const express = require("express");
const { register, login } = require("./controllers/auth.controller");

const userController = require("./controllers/user.controller");

const app = express();

app.use(express.json());

app.use("/user", userController);

app.use("/register", register);

app.use("/login", login);

module.exports = app;
