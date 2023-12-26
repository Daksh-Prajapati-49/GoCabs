const mongoose = require("mongoose");

const CabSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    nameplate:{
        type: String,
        unique: true,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    }
});

CabSchema.index({ nameplate: 1 }, { unique: true });
const Cab = mongoose.model("cab", CabSchema);

module.exports = Cab;