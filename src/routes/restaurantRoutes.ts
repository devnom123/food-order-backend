import express from 'express';
import { uploadImage } from "../config/file.config"
const router = express.Router();
import restaurantController from '../controllers/restaurant.controller';
import {jwtCheck, jwtParse} from '../middleware/auth';
import { validateRestaurantRequest, searchRestaurantRequest } from '../middleware/validation';

router.get("/search/:city", searchRestaurantRequest,  restaurantController.searchRestaurants)

router.use(jwtCheck);
router.use(jwtParse);
// router.post("/", uploadImage, validateRestaurantRequest, restaurantController.createMyRestaurant)
router.post("/", uploadImage,  restaurantController.createMyRestaurant)
router.get("/", restaurantController.getMyRestaurant)
router.put("/", uploadImage, restaurantController.updateMyRestaurant)


export default router;