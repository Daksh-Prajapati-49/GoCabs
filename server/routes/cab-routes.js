const express = require("express")
const cabRouter = express.Router();
const { getAllCabs, getAvailableCabs, postCreateCabs, putUpdateCabs, deleteCabs } = require("../controller/Cab-controller");
const { verifyAdmin, verifyToken, verifyUser } = require("../utils/verifyToken.js");

cabRouter.get("/", verifyUser, getAllCabs);
cabRouter.post("/", verifyUser, getAvailableCabs);
cabRouter.post("/create", verifyAdmin, postCreateCabs);
cabRouter.put("/:id", verifyAdmin, putUpdateCabs);
cabRouter.delete("/:id", verifyAdmin, deleteCabs);
module.exports = cabRouter ;