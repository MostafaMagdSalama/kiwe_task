import { logger } from "../config/Logger";

export const getWeatherByIPAddress = async (ip: string) => {

    logger.debug("dal...getWeatherByIPAddress...")

    const params = new URLSearchParams({
        key: process.env.WEATHER_KEY ?? "",
        q: ip
    });

    const response = await fetch(`${process.env.WEATHER_BAS_URL}?${params.toString()}`);
    const data = await response.json();

    return data;
}