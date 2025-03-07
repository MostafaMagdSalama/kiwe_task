import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { logger } from "../config/Logger";

export const userAuth = async (req: Request & { userId?: string }, res: Response, next: NextFunction) => {
    logger.info("middleware...userAuth... ")

    try {

        const token = req.headers.authorization?.split(' ')[1];

        if (!token) {
            return res.status(401).json({ message: "Access Denied. No token provided." });
        }


        const decoded = jwt.verify(token, process.env.SECRET ?? "") as { userId: string };

        req.userId = decoded.userId;

        next();
    } catch (error) {
        return res.status(401).json({ message: "Invalid or expired token." });
    }
}