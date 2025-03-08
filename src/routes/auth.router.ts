import express from "express"
import UserModel from "../models/User.model"
import { logger } from "../config/Logger"
import jwt from "jsonwebtoken"
import validate from "../middleware/validate.middleware";
import { auth } from "../validations/auth.schema";
import * as authController from "../controllers/auth.controller"

const router = express.Router();


router.post("/register", validate(auth), authController.authController)

router.post("/login", validate(auth), authController.login)


export default router;
