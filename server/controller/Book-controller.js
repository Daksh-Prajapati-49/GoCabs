const Book = require("../models/Booking");
const nodemailer = require("nodemailer")
// require("dotenv").config


const getAllBookings = (req, res) => {
    Book.find()
        .then((todo) => {
            res.status(200).json(todo);
            // res.status(200).json(todo.sort((a, b) => a.price - b.price));
        })
        .catch((err) =>
            res
                .status(404)
                .json({ message: "Bookings not found", error: err.message })
        );
}

const getUserBookings = (req, res) => {
    Book.find({ user_mail: req.params.mail })
        .then((todo) => {
            res.status(200).json(todo);
        })
        .catch((err) =>
            res
                .status(404)
                .json({ message: "Bookings not found", error: err.message })
        );
}   

// const postCreateBookinkgs = async (req, res) => {
//     // console.log(req.headers);
//     // req = req.headers;
//     try{
//         const obj = new Book ({
//             "mail" : req.headers.mail,
//             "start_time" : req.headers.start_time,
//             "end_time": req.headers.end_time,
//             "price": req.headers.price,
//             "source": req.headers.source,
//             "destination": req.headers.destination,
//         });
//         await obj.save();
//         res.status(201).json(obj);
//     } catch(error)
//     {
//         console.error('error',error);
//         res.status(500).json({error:'failed'});
//     }
//     // res.satus(201).json({});

// };

const postCreateBookings = async (req, res) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        host: "smtp.ethereal.gmail",
        port: 587,
        secure: false,
        auth: {
            user: process.env.MAIL, // Your Gmail email address
            pass: process.env.PWD,       // Your Gmail password or an "App Password"
        },
    });

    // Define your email content
    async function sendConfirmationEmail(obj) {
        // console.log(obj.user_mail);
        try {
            const info = await transporter.sendMail({
                from: 'gocabsbooking49@gmail.com', // Sender's email address
                to: obj.user_mail,               // Recipient's email address collected from the booking form
                subject: "Your Booking is confirmed",
                html: `
                <h1>Hello,</h1>
                <p>Your cab booking has been confirmed!</p>
                <p>Details of your booking:</p>
                <ul>
                    <li>Date-Time : ${obj.start_time}</li>
                    <li>Pickup Location: ${obj.source}</li>
                    <li>Drop-off Location: ${obj.destination}</li>
                </ul>
                <p>Thank you for choosing our cab service. Have a great trip!</p>
            `,
            });

            // console.log(info.messageId); // Random ID generated after a successful send (optional)
        } catch (error) {
            console.error("Error sending confirmation email:", error);
        }
    }
    try {
        const data = await Book.create(req.body); // Use 'await' to wait for the promise to resolve
        await sendConfirmationEmail(req.body);
        res.json({ message: "Bookings added successfully", data });
    } catch (err) {
        res
            .status(400)
            .json({ message: "Failed to add todo", error: err.message });
    }

};


const putUpdateBookings = (req, res) => {
    Book.findByIdAndUpdate(req.params.id, req.body)
        .then((data) => res.json({ message: "updated successfully", data }))
        .catch((err) =>
            res
                .status(400)
                .json({ message: "Failed to update Cab details", error: err.message })
        );
};

const deleteBookings = (req, res) => {
    Book.findByIdandDelete(req.params.id)
        .then((data) => res.status(200).json({ message: "Deleted successfully", data }))
        .catch((err) =>
            res
                .status(400)
                .json({ message: "Failed to delete Booking details", error: err.message })
        );

}


module.exports = { getAllBookings: getAllBookings, getUserBookings : getUserBookings, postCreateBookings: postCreateBookings, putUpdateBookings: putUpdateBookings, deleteBookings: deleteBookings };