import express from "express"
import UserModel from "../models/User.model"
import { logger } from "../config/Logger"
import jwt from "jsonwebtoken"
import validate from "../middleware/validate.middleware";
import { auth } from "../validations/auth.schema";

const router = express.Router();


router.post("/register", validate(auth), (req, res) => {
    logger.info("...register router...");
    try {
        const { userName, password } = req.body
        const user = UserModel.create({
            userName,
            password
        })
        res.status(201).json({ message: 'User registered successfully' })
    }
    catch (err) {
        res.status(500).json({ error: 'Registration failed' });
    }
})

router.post("/login", validate(auth), async (req, res) => {
    logger.info("... login router ...");
    try {
        const { userName, password } = req.body
        const user = await UserModel.findOne({ userName });
        if (!user || !(await user.comparePassword(password))) {
            return res.status(401).json({ message: 'userName or password not correct' });
        }

        const token = jwt.sign({ userId: user._id }, process.env.SECRET ?? "", {
            expiresIn: '1h',
        });
        res.status(200).json({ token });
    } catch (error) {
        res.status(500).json({ message: "login failed" });
    }
})


export default router;
