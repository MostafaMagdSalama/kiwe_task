import { logger } from "../config/Logger"
import * as saveFavouriteCityDal from '../dal/save-favourite-city.dal'
import * as listFavouriteCitiesDal from '../dal/list-favourite-cities.dal'

export const saveFavouriteCity = async (userId: string, city: string) => {

    logger.info("servive...saveFavouriteCity...")

    return await saveFavouriteCityDal.saveFavouriteCity(userId, city)

}
export const listFavouriteCities = async (userId: string) => {

    logger.info("servive...listFavouriteCities...")

    return await listFavouriteCitiesDal.listFavouriteCities(userId)

}