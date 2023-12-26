const mongoose = require("mongoose");

const PathSchema = new mongoose.Schema({
    v1: {
        type: String,
        required: true,
    },
    v2: {
        type: String,
        required: true,
    },
    t1: {
        type: Number,
        required: true,
    }
});

const Path = mongoose.model("path", PathSchema);

module.exports = Path;