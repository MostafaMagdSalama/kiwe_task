import { logger } from "../config/Logger"
import UserModel from "../models/User.model";

export const listFavouriteCities = async (userId: string) => {
    logger.info("dal...listFavouriteCities...")
    const user = await UserModel.findOne({ _id: userId })
    if (!user) {
        logger.warn(`User with ID ${userId} not found.`);
        return { success: false, message: "User not found" };
    }
    return user.favouriteCities
}