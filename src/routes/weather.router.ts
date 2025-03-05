import express from "express"
import * as weatherController from '../controllers/weather.controller'

const router = express.Router();

router.get("/weather", weatherController.getWeatherByIP);

export default router;
