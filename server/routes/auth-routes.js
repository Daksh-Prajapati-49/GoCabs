const express = require("express")
const AuthRouter = express.Router();
const { login, register } = require("../controller/Auth-controller");
AuthRouter.post("/login",login);
AuthRouter.post("/register",register);
module.exports = AuthRouter ;