import { logger } from "../config/Logger"
import * as weatherDal from '../dal/weather.dal'

export const getWeatherByIPAddress = async (ip: string) => {

    logger.info("service...getWeatherByIPAddress...")

    const weatherData = await weatherDal.getWeatherByIPAddress(ip);


    return weatherData;

}