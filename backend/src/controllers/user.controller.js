import User from "../models/user.model.js";

import { ApiError } from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";


const registerUser = asyncHandler(async (req, res, next) => {
    const { username, email, password } = req.body;

    const existingUser = await User.findOne({
        $or: [{username}, {email}]
    });

    if(existingUser){
        throw new ApiError(
            409,
            "Username or email already exists"
        );
    }

    const user = await User.create({
        username,
        email,
        password
    });

    const createdUser = await User.findById(user._id);

    if(!createdUser){
        throw new ApiError(
            500,
            "Something went wrong while registering the user"
        );
    }

    return res.status(201).json(
        new ApiResponse(
            201,
            createdUser,
            "User registered successfully"
        )
    );

});


const loginUser = asyncHandler(async (req, res, next) => {

    const { username, email, password } = req.body;

    const existingUser = await User.findOne({
        $or: [{username}, {email}]
    });

    if(existingUser){
        throw new ApiError(
            409,
            "Invalid credentials"
        );
    }

    const isMatchedPassword = await existingUser.isPasswordCorrect(password);

    if(!isMatchedPassword){
        throw new ApiError(
            401,
            "Invalid credentials"
        )
    };

    const loggedInUser = existingUser.toObject();

    // delete loggedInUser.password;

    return res.status(200).json(
        new ApiResponse(
            200,
            loggedInUser,
            "User logged in successfully"
        )
    );

});


export { registerUser, loginUser };