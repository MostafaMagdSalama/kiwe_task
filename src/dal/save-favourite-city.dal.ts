import { logger } from "../config/Logger"
import userModel from '../models/User.model'

export const saveFavouriteCity = async (userId: string, city: string) => {
    logger.debug("dal....saveFavouriteCity...")

    const user = await userModel.findOne({ _id: userId })

    if (!user) {
        logger.warn(`User with ID ${userId} not found.`);
        return { success: false, message: "User not found" };
    }

    const result = await userModel.updateOne(
        { _id: userId },
        { $addToSet: { favouriteCities: city } }
    );


    if (result.modifiedCount > 0) {
        logger.info(`City "${city}" added to user ${userId}`);
        return { success: true, message: "City added successfully" };
    } else {
        logger.info(`City "${city}" already exists for user ${userId}`);
        return { success: false, message: "City already exists" };
    }


}