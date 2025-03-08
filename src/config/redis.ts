import { Redis } from "ioredis"
import { logger } from "./Logger";

// const redis = new Redis({
//     port: 6379, // Redis port
//     host: "127.0.0.1", // Redis host
// });
const redis = new Redis({
    host: process.env.REDIS_HOST || "redis",
    port: Number(process.env.REDIS_PORT) || 6379,
    retryStrategy: (times) => Math.min(times * 50, 2000),
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