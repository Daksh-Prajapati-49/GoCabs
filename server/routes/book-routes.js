const express = require("express")
const bookRouter = express.Router();
const { getAllBookings , getUserBookings, postCreateBookings , putUpdateBookings, deleteBookings } = require("../controller/Book-controller");
const { verifyAdmin, verifyToken, verifyUser } = require("../utils/verifyToken.js");

bookRouter.get("/", verifyAdmin, getAllBookings);
bookRouter.get("/:mail", verifyUser, getUserBookings);
bookRouter.post("/", verifyUser, postCreateBookings);
bookRouter.put("/:id", verifyAdmin, putUpdateBookings);
bookRouter.delete("/:id", verifyAdmin, deleteBookings);
module.exports = bookRouter ;