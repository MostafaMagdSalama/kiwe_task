import { Request, Response } from "express";
import { logger } from "../config/Logger";
import * as UserService from '../services/user.service'

export const saveFavouriteCity = async (req: Request & { userId?: string }, res: Response) => {
    logger.info("controller...saveFavouriteCity...")
    const userId = req.userId
    const city = req.body.city
    const result = await UserService.saveFavouriteCity(userId!, city)
    return res.status(200).json(result)
}