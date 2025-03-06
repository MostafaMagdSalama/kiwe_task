import { json } from "body-parser";
import { logger } from "../config/Logger";
import redis from '../config/redis'

export const getWeatherByLocKey = async (key: string) => {

    logger.debug("dal...getWeatherByLocKey...")

    const params = new URLSearchParams({
        key: process.env.WEATHER_KEY ?? "",
        q: key
    });

    const response = await fetch(`${process.env.WEATHER_BAS_URL}?${params.toString()}`);
    const data = await response.json();
    // set retuned data to redis with ex duration 1 hour 
    redis.set(key, JSON.stringify(data), "EX", 60 * 60)

    return data;
}
