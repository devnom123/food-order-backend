"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_1 = __importDefault(require("../models/user"));
const getUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let existingUser = yield user_1.default.findById(req.userId);
        if (!existingUser) {
            return res.status(404).json({ message: "User not found" });
        }
        return res.status(200).json(existingUser);
    }
    catch (error) {
        // console.log(error);
        return res.status(500).json({ message: "Something went wrong" });
    }
});
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let { auth0Id } = req.body;
        let existingUser = yield user_1.default.findOne({
            auth0Id
        });
        if (existingUser) {
            return res.status(200).json(existingUser);
        }
        const newUser = new user_1.default(req.body);
        let savedUser = yield newUser.save();
        return res.status(200).json(savedUser);
    }
    catch (error) {
        // console.log(error);
        return res.status(500).json({ message: "Something went wrong" });
    }
});
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let existingUser = yield user_1.default.findById(req.userId);
        console.log(existingUser);
        if (!existingUser) {
            return res.status(404).json({ message: "User not found" });
        }
        existingUser.name = req.body.name;
        existingUser.address = req.body.address;
        existingUser.city = req.body.city;
        existingUser.country = req.body.country;
        let savedUser = yield existingUser.save();
        return res.status(200).json(savedUser);
    }
    catch (error) {
        // console.log(error);
        return res.status(500).json({ message: "Something went wrong" });
    }
});
exports.default = {
    createUser,
    updateUser,
    getUser
};
