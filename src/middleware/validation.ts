import { NextFunction, Request, Response } from 'express';
import { body, param, query, validationResult } from 'express-validator';

const handleValidationErrors = (req:Request, res:Response, next:NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
}

export const validateMyUserRequest = [
    body("name").isString().notEmpty().withMessage("Name is required"),
    body("address").isString().notEmpty().withMessage("Address is required"),
    body("city").isString().notEmpty().withMessage("City is required"),
    body("country").isString().notEmpty().withMessage("Country is required"),
    handleValidationErrors
]

export const validateRestaurantRequest = [
    body("name").isString().notEmpty().withMessage("Name is required"),
    body("address").isString().notEmpty().withMessage("Address is required"),
    body("city").isString().notEmpty().withMessage("City is required"),
    body("country").isString().notEmpty().withMessage("Country is required"),
    body("deliveryFee").isNumeric().notEmpty().withMessage("Delivery Fee is required"),
    body("estimatedDeliveryTime").isNumeric().notEmpty().withMessage("Estimated Delivery Time is required"),
    body("cuisines").isArray().notEmpty().withMessage("Cuisines is required"),
    body("menuItems").isArray().notEmpty().withMessage("Menu Items is required"),
    body("menuItems.*.name").isString().notEmpty().withMessage("Menu Item Name is required"),
    body("menuItems.*.price").isNumeric().notEmpty().withMessage("Menu Item Price is required"),
    handleValidationErrors
]

export const searchRestaurantRequest = [
    param("city").isString().notEmpty().withMessage("City is required"),
    query("searchQuery").optional().isString(),
    query("selectedCuisines").optional().isString(),
    query("sortOption").optional().isString(),
    query("page").optional().isNumeric(),
    handleValidationErrors
]