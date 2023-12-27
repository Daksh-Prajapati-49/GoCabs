// server.js
require("dotenv").config(); //added
const express = require("express");
const app = express();
// const cors = require("cors");
const cookieParser = require("cookie-parser");

const cors = require('cors');
const corsOptions ={
    origin:'https://gocabs-rho.vercel.app/', 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200,
    origin: true
}
app.use(cors(corsOptions));
app.use(cookieParser());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'https://gocabs-rho.vercel.app');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    // ... other headers and middleware
    next();
});

const connectDB = require("./config/db"); //added

const authRouter = require("./routes/auth-routes.js");
const pathRouter = require("./routes/path-routes");
const cabRouter = require("./routes/cab-routes");
const bookRouter = require("./routes/book-routes");
const usersRouter = require("./routes/user-routes");


// app.use(cors());


// connect database
connectDB();//added

// initialize middleware
app.use(express.json({ extended: false }));

app.use("/api/auth",authRouter);
app.use("/api/users",usersRouter);
app.use("/api/paths",pathRouter);
app.use("/api/cabs",cabRouter);
app.use("/api/bookings",bookRouter);

app.use((err, req, res, next) => {
    const errorStatus = err.status || 500;
    const errorMessage = err.message || "Something went wrong!";
    return res.status(errorStatus).json({
        success: false,
        status: errorStatus,
        message: errorMessage,
        stack: err.stack,
    });
});

app.get("/", (req, res) => res.send("Server up and running"));

// setting up port
const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
    console.log(`server is running on http://localhost:${PORT}`);
});