"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const userSchema = new mongoose_1.default.Schema({
    auth0Id: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        default: null,
    },
    email: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        default: null,
    },
    city: {
        type: String,
        default: null,
    },
    country: {
        type: String,
        default: null,
    },
});
const User = mongoose_1.default.model("User", userSchema);
exports.default = User;
