import { logger } from '../config/Logger'
import redis from '../config/redis'
import Fuse from "fuse.js"

export const cityFuzzySearch = async (cityName: string) => {
    logger.debug("util...cityFuzzySearch...")


    const cities = await redis.get("cities");


    const fuse = new Fuse(JSON.parse(cities ?? ""), {
        includeScore: true,
        threshold: 0.5
    });

    const results = fuse.search(cityName);

    const possibleCities = results.map(result => result.item);

    if (!cities || !possibleCities.length) {
        return cityName;
    }
    return possibleCities[0];

}