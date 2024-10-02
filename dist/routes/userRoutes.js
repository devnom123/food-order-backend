"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_controller_1 = __importDefault(require("../controllers/user.controller"));
const auth_1 = require("../middleware/auth");
const validation_1 = require("../middleware/validation");
const router = express_1.default.Router();
router.use(auth_1.jwtCheck);
router.post('/', user_controller_1.default.createUser);
router.use(auth_1.jwtParse);
router.put('/', validation_1.validateMyUserRequest, user_controller_1.default.updateUser);
router.get('/', user_controller_1.default.getUser);
exports.default = router;
