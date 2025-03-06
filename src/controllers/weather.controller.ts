import { logger } from "../config/Logger"
import { Request, Response } from "express"
import * as weatherService from "../services/weather.service"
import redis from '../config/redis'
import { cityFuzzySearch } from "../utils/fuzzy-search"


export const getWeatherByIP = async (req: Request, res: Response) => {

    logger.info("controller...getWeatherByIP...")

    // check if the value in cache 
    const cashedValue = await await redis.get(req.clientIp ?? "")
    if (cashedValue) {
        return res.status(200).json({
            data: JSON.parse(cashedValue)
        })
    }

    const data = await weatherService.getWeatherByLocKey(req.clientIp ?? "");



    res.status(200).json({
        data
    })

}

export const getWeatherByCity = async (req: Request, res: Response) => {
    logger.info("controller...getWeatherByCity...")

    const city = await cityFuzzySearch(req.params.city);

    const data = await weatherService.getWeatherByLocKey(city as string);

    res.status(200).json({
        data
    })
}