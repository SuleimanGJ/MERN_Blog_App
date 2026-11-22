import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { ACCESS_TOKEN_SECRET, ACCESS_TOKEN_EXPIRY, REFRESH_TOKEN_SECRET, REFRESH_TOKEN_EXPIRY } from "../config/config.js";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        trim: true,
        lowercase: true,
        unique: true,
        required: true,
    },
    email: {
        type: String,
        trim: true,
        lowercase: true,
        unique: true,
        required: true,
    },
    password: {
        type: String,
        required: true,
        minLength: 8,
        select: false
    },
    avatar: {
        type: String
    },
    refreshToken: {
        type: String,
        default: null,
        select: false
    }
}, { timestamps: true } );



// password hashing

userSchema.pre("save", async function () {
    if(!this.isModified("password")){
        return;
    }
    this.password = await bcrypt.hash(this.password, 10);
});


userSchema.methods.isPasswordCorrect = async function (givenPassword) {
    return await bcrypt.compare(givenPassword, this.password);
};


userSchema.methods.generateAccessToken = function (){
    return jwt.sign(
        {
            _id: this._id,
            email: this.email 
        },
        ACCESS_TOKEN_SECRET,
        { expiresIn: ACCESS_TOKEN_EXPIRY }
    );
};
userSchema.methods.generateRefreshToken = function (){
    return jwt.sign(
        {
            _id: this._id,
            email: this.email 
        },
        REFRESH_TOKEN_SECRET,
        { expiresIn: REFRESH_TOKEN_EXPIRY }
    );
};


const User = mongoose.model("User", userSchema);

export default User;


