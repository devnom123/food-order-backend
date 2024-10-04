import express from 'express';
import { uploadImage } from "../config/file.config"
const router = express.Router();
import restaurantController from '../controllers/restaurant.controller';
import {jwtCheck, jwtParse} from '../middleware/auth';

router.use(jwtCheck);
router.use(jwtParse);
router.post("/", uploadImage, restaurantController.createMyRestaurant)

export default router;