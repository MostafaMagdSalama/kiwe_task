import { Request, Response, NextFunction } from "express";
import { logger } from "../config/Logger";
import { HttpError } from "../errors/http-error";

export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
    let statusCode = 500;
    let message = "Internal Server Error";

    if (err instanceof HttpError) {
        statusCode = err.statusCode;
        message = err.message;
    }

    logger.error(`Error: ${message} | Status: ${statusCode} | Path: ${req.originalUrl}`);

    return res.status(statusCode).json({
        statusCode,
        message,
    });
};
