import { Request, Response } from 'express';
import Restaurant from '../models/restaurant';
import { Model } from 'mongoose';
import cloudinary from '../config/cloudinary.config';

const createMyRestaurant = async (req: Request, res: Response) => {
    try {
        console.log("req.body", req.body);
        const existingRestaurant = await Restaurant.findOne({
            user: req.userId
        });
        if (existingRestaurant) {
            return res.status(409).json({ message: "Restaurant already exists" });
        }
        const image = req.file as Express.Multer.File;
        console.log(image);
        const base64Image = Buffer.from(image.buffer).toString('base64');
        const dataURI = `data:${image.mimetype};base64,${base64Image}`;
        const uploadedImage = await cloudinary.uploader.upload(dataURI);
        const newRestaurant = new Restaurant({
            ...req.body,
            image: uploadedImage.secure_url,
            user: req.userId
        });
        const savedRestaurant = await newRestaurant.save();
        return res.status(201).json(savedRestaurant);

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Something went wrong" });
    }
}

const getMyRestaurant = async (req: Request, res: Response) => {
    try {
        const existingRestaurant = await Restaurant.findOne({
            user: req.userId
        });
        if (!existingRestaurant) {
            return res.status(404).json({ message: "Restaurant not found" });
        }
        return res.status(200).json(existingRestaurant);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Something went wrong" });
    }
}

const updateMyRestaurant = async (req: Request, res: Response) => {
    try {
        const existingRestaurant = await Restaurant.findOne({
            user: req.userId
        });
        if (!existingRestaurant) {
            return res.status(404).json({ message: "Restaurant not found" });
        }
        console.log("req.file", req.file);
        if (req.file && req.file.buffer && req.file.size > 0) {
            const image = req.file as Express.Multer.File;
            const base64Image = Buffer.from(image.buffer).toString('base64');
            const dataURI = `data:${image.mimetype};base64,${base64Image}`;
            const uploadedImage = await cloudinary.uploader.upload(dataURI);
            req.body.image = uploadedImage.secure_url;
        }
        req.body.lastUpdated = new Date();
        const updatedRestaurant = await Restaurant.findOneAndUpdate({
            user: req.userId
        }, {
            ...req.body
        }, { new: true });
        return res.status(200).json(updatedRestaurant);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Something went wrong" });
    }
}

const searchRestaurants = async (req: Request, res: Response) => {
    try {
        const { city } = req.params;

        const searchQuery = (req.query.query as string) || "";
        const selectedCuisines = (req.query.selectedCuisines as string) || "";
        const sortOption = (req.query.sortOption as string) || "lastUpdated";
        const page = parseInt((req.query.page as string)) || 1;

        interface Query {
            city: {
                $regex: string,
                $options: string
            },
            cuisines?: {
                $all: string[]
            },
            $or?: [
                {
                    name: {
                        $regex: string,
                        $options: string
                    },
                },
                {
                    cuisines: {
                        $in: string[]
                    }
                }
            ]
        }

        let query: Query = {
            city: {
                $regex: city as string,
                $options: 'i'
            }
        }

        if (selectedCuisines) {
            query['cuisines'] = {
                $all: selectedCuisines.split(",")
            }
        }

        if (searchQuery) {
            query['$or'] = [
                {
                    name: {
                        $regex: searchQuery,
                        $options: 'i'
                    }
                },
                {
                    cuisines: {
                        $in: searchQuery.split(",")
                    }
                }
            ]
        }

        const pageSize = 10;
        const skip = pageSize * (page - 1);

        const restaurants = await Restaurant.find(query)
            .sort({ [sortOption]: -1 })
            .skip(skip)
            .limit(pageSize);

        const totalRestaurants = await Restaurant.countDocuments(query);    

        return res.status(200).json({
            data: restaurants,
            meta: {
                totalRestaurants,
                totalPages: Math.ceil(totalRestaurants / pageSize),
                currentPage: page
            }
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Something went wrong" });
    }
}

export default {
    createMyRestaurant,
    getMyRestaurant,
    updateMyRestaurant,
    searchRestaurants
}