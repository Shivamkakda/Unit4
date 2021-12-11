const express = require('express');

const User = require("../models/user.model");

const sendMail = require("../utils/send-mail");

const router = express.Router();


router.post("/user", async (req, res) => {
    try {
        const user = await User.create(req.body);

        // User ki detiles
        sendMail(
            "shi@masaischool.com",
            req.body.email,
            `Welcome to Masai School ${req.body.first_name} ${req.body.last_name}`,
            `Hi ${req.body.first_name}, Please Enter your email address`,
            `<h1>Hi ${req.body.first_name}, Please confirm your email address</h1>`
        );

        // For Admins .. 5 admin bna k 5 ko mail confirm krega
        const adminEmails = ["admin1@gmail.com", "admin2@gmail.com", "admin3@gmail.com", "admin4@gmail.com", "admin5@gmail.com"];

        sendMail(
            "shi@masaischool.com",
            adminEmails,
            `${req.body.first_name} ${req.body.last_name} has registered with us `,
            `Please welcome ${req.body.first_name} ${req.body.last_name}`,
            `<h1>Please welcome ${req.body.first_name} ${req.body.last_name}</h1>`
        );

        return res.send(user);

    } catch (e) {
        return res.status(500).json({ message: e.message, status: "Failed" });
    }
});

router.get("/", async (req, res) => {
    try {
        const page = +req.query.page || 1;

        const size = +req.query.size || 2;

        const skip = ((page - 1) * size);

        const users = await User.find().skip(skip).limit(size).lean().exec();

        const totalPages = Math.ceil((await User.find().countDocuments()) / size);

        return res.json({ users, totalPages });

    } catch (e) {
        return res.status(500).json({ message: e.message, status: "Failed" });
    }
});

router.get("/:id", async (req, res) => {
    try {
        const user = await User.findById(req.params.id).lean().exec();

        return res.send(user);

    } catch (e) {
        return res.status(500).json({ message: e.message, status: "Failed" });
    }
});

router.patch("/:id", async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true }).lean().exec();

        return res.send(user);

    } catch (e) {
        return res.status(500).json({ message: e.message, status: "Failed" });
    }
});

router.delete("/:id", async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(req.params.id).lean().exec();

        return res.send(user);

    } catch (e) {
        return res.status(500).json({ message: e.message, status: "Failed" });
    }
});




module.exports = router;