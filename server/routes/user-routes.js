const express = require("express");
const {
    updateUser,
    deleteUser,
    getUser,
    getUsers,
} = require("../controller/User-controller.js");
const { verifyAdmin, verifyToken, verifyUser } = require("../utils/verifyToken.js");

const usersRouter = express.Router();


//UPDATE
usersRouter.put("/:id", verifyUser, updateUser);

//DELETE
usersRouter.delete("/:id", verifyUser, deleteUser);

//GET
usersRouter.get("/:id", verifyUser, getUser);

//GET ALL
usersRouter.get("/", verifyAdmin, getUsers);

module.exports = usersRouter;