const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    mail: {
        type: String,
        unique: true,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    isAdmin: {
        type: Boolean,
        default: false,
    }
});


UserSchema.index({ mail: 1 }, { unique: true });
const User = mongoose.model("user", UserSchema);

module.exports = User;