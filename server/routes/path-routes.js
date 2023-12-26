const express = require("express")
const pathRouter = express.Router();
const { getAllPaths , getShortestPath, postCreatePath, putUpdatePath, deletePath } = require("../controller/Path-controller");
const { verifyAdmin, verifyToken, verifyUser } = require("../utils/verifyToken.js");

pathRouter.get("/", verifyUser, getAllPaths);
pathRouter.post("/shortest_path", verifyUser, getShortestPath);
pathRouter.post("/create", verifyAdmin, postCreatePath);
pathRouter.put("/:id", verifyAdmin, putUpdatePath);
pathRouter.delete("/:id", verifyAdmin, deletePath);

module.exports = pathRouter ;