import mongoose from "mongoose";

const restaurantSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        default: null,
    },
    name: {
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
    deliveryFee: {
        type: Number,
        default: null,
    },
    estimatedDeliveryTime: {
        type: Number,
        default: null,
    },
    cuisines: [
        {
            type: String,
            default: null,
        }
    ],
    menuItems: [{
        name: {
            type: String,
            default: null,
        },
        price: {
            type: Number,
            default: null,
        }
    }],
    image: {
        type: String,
        default: null,
    },
    lastUpdated: {
        type: Date,
        default: Date.now,
    },
},{timestamps: true});    

export default mongoose.model("Restaurant", restaurantSchema);