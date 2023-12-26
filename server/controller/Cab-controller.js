const mongoose = require("mongoose");
const Cab = require("../models/Cab");
const Booking = require("../models/Booking");
const { availableCabs } = require("../service/getAvailableCabs");

const getAllCabs = (req, res) => {
    // console.log(req.body);
    Cab.find()
        .then((todo) => {
            // let data = availableCabs(todo,req.body.time);
            // console.log(data);
            res.status(200).json(todo);
        })
        .catch((err) =>
            res
                .status(404)
                .json({ message: "Cabs not found", error: err.message })
        );
}

const getAvailableCabs = async (req, res) => {
    try {
        const existingBookings = await Booking.find({
            $or: [
                {
                    start_time: { $lte: req.body.startTime },
                    end_time: { $gte: req.body.startTime }
                },
                {
                    start_time: { $lte: req.body.endTime },
                    end_time: { $gte: req.body.endTime }
                },
                {
                    start_time: { $gte: req.body.startTime },
                    end_time: { $lte: req.body.endTime }
                }
            ]
        }).distinct('nameplate');

        const availableCabs = await Cab.find({ nameplate: { $nin: existingBookings } });

        res.status(200).json(availableCabs);
    } catch (err) {
        res.status(500).json({ message: "Internal Server Error", error: err.message });
    }
};


const postCreateCabs = (req, res) => {
    const { name, nameplate, price } = req.body;

    // Check if a cab with the same nameplate already exists
    Cab.findOne({ nameplate })
        .then(existingCab => {
            if (existingCab) {
                // Cab with the same nameplate already exists
                return res.status(400).json({ message: "Cab already exists with the same nameplate" });
            }

            // Cab does not exist, create a new one
            return Cab.create({ name, nameplate, price });
        })
        .then((data) => res.status(200).json({ message: "Cab added successfully", data }))
        .catch((err) =>
            res.status(400).json({ message: "Failed to add Cab details", error: err.message })
        );
};



const putUpdateCabs = (req, res) => {
    // console.log(req.body);
    // console.log(req.headers);
    Cab.findByIdAndUpdate(req.params.id, req.body)
        .then((data) => res.status(201).json({ message: "updated successfully", data }))
        .catch((err) =>
            res
                .status(400)
                .json({ message: "Failed to update Cab details", error: err.message })
        );
};

const deleteCabs = (req, res) => {
    Cab.findByIdandDelete(req.params.id)
        .then((data) => res.status(200).json({ message: "Deleted successfully", data }))
        .catch((err) =>
            res
                .status(400)
                .json({ message: "Failed to delete Cab details", error: err.message })
        );
}


module.exports = { getAllCabs: getAllCabs, getAvailableCabs: getAvailableCabs, postCreateCabs: postCreateCabs, putUpdateCabs: putUpdateCabs, deleteCabs: deleteCabs };