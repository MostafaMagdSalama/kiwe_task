import { json } from "body-parser";
import { logger } from "../config/Logger";
import redis from '../config/redis'

export const getWeatherByIPAddress = async (ip: string) => {

    logger.debug("dal...getWeatherByIPAddress...")

    const params = new URLSearchParams({
        key: process.env.WEATHER_KEY ?? "",
        q: ip
    });

    const response = await fetch(`${process.env.WEATHER_BAS_URL}?${params.toString()}`);
    const data = await response.json();
    // set retuned data to redis with ex duration 1 hour 
    redis.set(ip, JSON.stringify(data), "EX", 60 * 60)

    return data;
}