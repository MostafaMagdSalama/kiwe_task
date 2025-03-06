import { logger } from "../config/Logger"
import * as weatherDal from '../dal/weather.dal'

export const getWeatherByLocKey = async (key: string) => {

    logger.info("service...getWeatherByLocKey...")

    const weatherData = await weatherDal.getWeatherByLocKey(key);


    return weatherData;

}