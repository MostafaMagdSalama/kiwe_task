import { Redis } from "ioredis"
import { logger } from "./Logger";

const redis = new Redis({
    host: "localhost",  // Redis is running on localhost
    port: 6379,         // Default Redis port
});

// Check Redis Connection
redis.ping()
    .then((result) => {
        logger.info("Redis is connected:", result); // Expected: "PONG"
    })
    .catch((err) => {
        console.error("Redis connection failed:", err);
    });

export default redis;