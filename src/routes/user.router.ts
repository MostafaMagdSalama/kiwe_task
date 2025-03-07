import express from 'express'
import * as UserController from "../controllers/user.controller"
const router = express.Router();

router.post('/add/favorite', UserController.saveFavouriteCity)

export default router;