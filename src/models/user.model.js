import { verify } from "crypto";
import mongoose from "mongoose"
const userSchema = mongoose.Schema({
    userName: {
        type: String,
        required: [true, "Username is required"],
        unique: true
    },
    email: {
        type: String,
        required: [true, "Email is required"]
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        select: false
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    forgotPasswordToken: {
        type: String
    },
    forgotPasswordTokenExpiry: {
        type: Date
    },
    verifyToken: {
        type: String
    },
    verifyTokenExpiry: {
        type: Date
    },

}, {
    timestamps: true
})

const User = mongoose.models.users || mongoose.model("users", userSchema);
export default User;