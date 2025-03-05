import express from "express";
import dotenv from "dotenv";
import requestIP from "request-ip"
import { initDB } from "./src/config/DB";
import AuthRouter from './src/routes/auth.router'
import WeatherRouter from './src/routes/weather.router'

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

app.use("/auth", AuthRouter)
app.use("/", WeatherRouter)


// Start Server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    initDB();
});
