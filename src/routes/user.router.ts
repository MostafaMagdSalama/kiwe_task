import express from 'express'
import * as UserController from "../controllers/user.controller"
import validate from '../middleware/validate.middleware';
import { favouriteCity } from '../validations/favourite-city-schema';
const router = express.Router();

router.post('/add/favorite', validate(favouriteCity), UserController.saveFavouriteCity)
router.get('/fav-cities', UserController.listFavouriteCities)

export default router;