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


export { registerUser };