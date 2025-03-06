import { json } from "body-parser";
import redis from "./redis"
import { logger } from "./Logger";

export const initCities = async () => {
    logger.debug("config...initCities...");

    const response = await fetch(process.env.CITIES_API ?? "");
    const data = await response.json();

    const cities = data.features.map((city: any) => city.attributes.City);
    redis.set("cities", JSON.stringify(cities))
}