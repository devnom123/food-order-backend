const { auth } = require('express-oauth2-jwt-bearer');
import { Request,Response,NextFunction } from "express";
import jwt from 'jsonwebtoken';
import User from "../models/user";

declare global {
  namespace Express {
    interface Request {
      auth0Id?: string;
      userId?: string;
    }
  }
}

export const jwtCheck = auth({
  audience: process.env.AUTH0_AUDIENCE,
  issuerBaseURL: process.env.AUTH0_ISSUER_BASE_URL,
  tokenSigningAlg: 'RS256'
});

export const jwtParse = async(req: Request, res: Response, next: NextFunction) => {
  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    const token = req.headers.authorization.split(' ')[1];
    try {
      const decoded = jwt.decode(token) as jwt.JwtPayload;
      const auth0Id = decoded.sub;

      const user = await User.findOne({
        auth0Id
      });
      if(user){
        req.auth0Id = auth0Id;
        req.userId = user._id.toString();
        next();
      }
      else{
        return res.status(401).json({ message: "Unauthorized" });
      }
    }
    catch (err) {
      return res.status(401).json({ message: "Unauthorized" });
    }
  }
  else{
    return res.status(401).json({ message: "Unauthorized" });
  }
};