import { Request, Response } from "express";
import * as authService from '../services/auth.service'
import { logger } from "../config/Logger";


export const authController = async (req: Request, res: Response) => {
    logger.info("...register router...");

    try {
        const { userName, password } = req.body
        await authService.createUser(userName, password);
        res.status(201).json({ message: 'User registered successfully' })
    }
    catch (err) {
        res.status(500).json({ error: 'Registration failed' });
    }
}

export const login = async (req: Request, res: Response) => {
    logger.info("controller... login ...");

    const { userName, password } = req.body

    const token = await authService.login(userName, password);

    res.status(200).json({ token });
}