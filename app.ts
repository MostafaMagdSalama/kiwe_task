import express from "express";
import dotenv from "dotenv";
import requestIP from "request-ip"
import { initDB } from "./src/config/DB";
import AuthRouter from './src/routes/auth.router'
import WeatherRouter from './src/routes/weather.router'
import UserRouter from './src/routes/user.router'
import { logger } from "./src/config/Logger";
import { initCities } from "./src/config/fuzzy-search";
import { userAuth } from "./src/middleware/user-auth.middleware";

dotenv.config();


const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(requestIP.mw());
// Health Check
app.get("/", (req, res) => {
    res.send("Weather API is running!");
});


// handle routes 

app.use("/", WeatherRouter)
app.use("/auth", AuthRouter)
app.use("/user", userAuth, UserRouter)


// Start Server
app.listen(PORT, () => {
    logger.info(`Server is running on port ${PORT}`);
    initDB();
    initCities()
});
