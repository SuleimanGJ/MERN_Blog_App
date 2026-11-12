import { ApiError } from "../utils/ApiError.js";
import { validationResult } from "express-validator";

const validate = (req, res, next) => {
    
    // console.log("REQUEST BODY:", req.body);

    // Gather validation errors
    const errors = validationResult(req); 

    // console.log("Validation errors:", errors.array());

    if(errors.isEmpty()){
        return next();
    };

    const extractedErrors = errors.array().map(err => ({ [err.path]: err.msg }) );
    throw new ApiError(422, "Received data is not valid", extractedErrors);
};

export { validate };