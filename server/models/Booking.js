const mongoose = require("mongoose");

const BookingSchema = new mongoose.Schema({
    user_mail: {
        type: String,
        required: true,
    },
    cab_name: {
        type: String,
        required: true,
    },
    nameplate:{
        type: String,
        required: true,
    },
    start_time:{
        type: Date,
        required: true,
    },
    end_time: {
        type: Date,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    source:{
        type: String,
        required: true,
    },
    destination:{
        type: String,
        required: true,
    },
});

BookingSchema.index({ user_mail: 1 });

const Book = mongoose.model("booking", BookingSchema);

module.exports = Book;