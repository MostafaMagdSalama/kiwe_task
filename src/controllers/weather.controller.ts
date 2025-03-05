import { logger } from "../config/Logger"
import { Request, Response } from "express"
import * as weatherService from "../services/weather.service"

export const getWeatherByIP = async (req: Request, res: Response) => {

    logger.info("controller...getWeatherByIP...")

    const data = await weatherService.getWeatherByIPAddress(req.clientIp ?? "");

    res.status(200).json({
        data
    })

}