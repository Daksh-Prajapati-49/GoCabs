const User = require("../models/User.js");
const bcrypt = require("bcryptjs");
const { createError } = require("../utils/error.js");
const jwt = require("jsonwebtoken");

const register = async (req, res, next) => {
    try {
        const user = await User.findOne({ mail: req.body.mail });
        if (user) return next(createError(404, "User already exist!"));

        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt);

        const newUser = new User({
            ...req.body,
            password: hash,
        });

        await newUser.save();
        res.status(200).send("User has been created.");
    } catch (err) {
        next(err);
    }
};

const login = async (req, res, next) => {
    try {
        // console.log(req.body);
        const user = await User.findOne({ mail: req.body.mail });
        if (!user) return next(createError(404, "User not found!"));

        const isPasswordCorrect = await bcrypt.compare(
            req.body.password,
            user.password
        );
        if (!isPasswordCorrect)
            return next(createError(400, "Wrong password or username!"));

        const token = jwt.sign(
            { id: user._id, isAdmin: user.isAdmin },
            process.env.JWT
        );

        const { password, ...otherDetails } = user._doc;
        res
            .status(200)
            .cookie('access_token', token, {
                expires: new Date(
                    Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
                ),
                httpOnly: true , sameSite: 'None', secure: true
            })
            .json({ details: { ...otherDetails }, token });
    } catch (err) {
        next(err);
    }
};

module.exports = { register: register, login: login };