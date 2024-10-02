import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    auth0Id:{
        type: String,
        required: true,
    },
    name:{
        type: String,
        default: null,
    },
    email:{
        type: String,
        required: true,
    },
    address:{
        type: String,
        default: null,
    },
    city:{
        type: String, 
        default: null, 
    },
    country:{
        type: String,
        default: null,
    },
});

const User = mongoose.model("User", userSchema);
export default User;