import express from "express"
import * as weatherController from '../controllers/weather.controller'

const router = express.Router();

router.get("/weather", weatherController.getWeatherByIP);
router.get("/weather/:city", weatherController.getWeatherByCity);

export default router;
