import { logger } from "../config/Logger"
import * as saveFavouriteCityDal from '../dal/save-favourite-city.dal'

export const saveFavouriteCity = async (userId: string, city: string) => {

    logger.info("servive...saveFavouriteCity...")

    return await saveFavouriteCityDal.saveFavouriteCity(userId, city)

}