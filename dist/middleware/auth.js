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
exports.jwtParse = exports.jwtCheck = void 0;
const { auth } = require('express-oauth2-jwt-bearer');
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_1 = __importDefault(require("../models/user"));
exports.jwtCheck = auth({
    audience: process.env.AUTH0_AUDIENCE,
    issuerBaseURL: process.env.AUTH0_ISSUER_BASE_URL,
    tokenSigningAlg: 'RS256'
});
const jwtParse = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        const token = req.headers.authorization.split(' ')[1];
        try {
            const decoded = jsonwebtoken_1.default.decode(token);
            const auth0Id = decoded.sub;
            const user = yield user_1.default.findOne({
                auth0Id
            });
            if (user) {
                req.auth0Id = auth0Id;
                req.userId = user._id.toString();
                next();
            }
            else {
                return res.status(401).json({ message: "Unauthorized" });
            }
        }
        catch (err) {
            return res.status(401).json({ message: "Unauthorized" });
        }
    }
    else {
        return res.status(401).json({ message: "Unauthorized" });
    }
});
exports.jwtParse = jwtParse;