import { Request, Response } from "express";
import User from "../models/user";

const getUser = async(req:Request, res:Response) => {
    try {
        let existingUser = await User.findById(req.userId);
        if (!existingUser) {
            return res.status(404).json({ message: "User not found" });
        }
        return res.status(200).json(existingUser);
    } catch (error) {
        // console.log(error);
        return res.status(500).json({ message: "Something went wrong" });
    }
}

const createUser = async (req: Request, res: Response) => {
    try {
        let { auth0Id } = req.body;
        let existingUser = await User.findOne({
            auth0Id
        })
        if (existingUser) {
            return res.status(200).json(existingUser)
        }
        const newUser = new User(req.body);
        let savedUser = await newUser.save();
        return res.status(200).json(savedUser);
    } catch (error) {
        // console.log(error);
        return res.status(500).json({ message: "Something went wrong" });

    }
}

const updateUser = async (req: Request, res: Response) => {
    try {
        let existingUser = await User.findById(req.userId);
        console.log(existingUser);
        if (!existingUser) {
            return res.status(404).json({ message: "User not found" });
        }
        existingUser.name = req.body.name;
        existingUser.address = req.body.address;
        existingUser.city = req.body.city;
        existingUser.country = req.body.country;
        let savedUser = await existingUser.save();
        return res.status(200).json(savedUser);
    } catch (error) {
        // console.log(error);
        return res.status(500).json({ message: "Something went wrong" });
    }
}

export default {
    createUser,
    updateUser,
    getUser
}