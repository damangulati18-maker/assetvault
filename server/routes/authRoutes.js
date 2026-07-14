const express = require("express");
const jwt =require("jsonwebtoken");
const bcrypt=require("bcrypt");

const User = require("../modals/user");
const { loggedUser } = require("../middleware/loggedUser");

const authRouter = express.Router();

authRouter.post("/signupNewUser", async (req, res) => {
    try {
        const { userName, email, password, organization } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);

        const addUser = new User({
            userName,
            email,
            password: hashedPassword,
            organization
        });
        await addUser.save();

        const token = await jwt.sign({ _id: addUser._id }, "secretkeyassetvault");
        res.cookie("token", token);
        res.send(addUser);
    } catch (err) {
        res.status(400).send({ error: err.message });
    }
});

authRouter.post("/loginUser", async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            throw new Error("Email and password are required");
        }

        const usercheck = await User.findOne({ email: email });
        if (!usercheck) {
            throw new Error("Incorrect Email ID");
        }

        const checkpass = await bcrypt.compare(password, usercheck.password);
        if (checkpass) {
            const token = await jwt.sign({ _id: usercheck._id }, "secretkeyassetvault");
            res.cookie("token", token);
            res.send(usercheck);
        } else {
            throw new Error("Incorrect password");
        }
    } catch (err) {
        res.status(400).send({ error: err.message });
    }
});

authRouter.post("/logout",loggedUser, async(req,res)=>{
    res.cookie("token",null,{
        expires:new Date(Date.now()),//we will only expire the cookie ans setting token to null
    });
    res.send("Logged out");
});
module.exports = authRouter;