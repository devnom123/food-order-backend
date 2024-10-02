import express from 'express';
import userController from '../controllers/user.controller';
import {jwtCheck, jwtParse} from '../middleware/auth';
import { validateMyUserRequest } from '../middleware/validation';

const router = express.Router();

router.use(jwtCheck);

router.post('/', userController.createUser);
router.use(jwtParse);
router.put('/', validateMyUserRequest, userController.updateUser);
router.get('/', userController.getUser);

export default router;