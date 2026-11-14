import { body } from "express-validator";

// .bail() // stops the current validation chain when the previous validation fails.

const registerValidator = () => { 
    return [
        body("username")
        .trim()
        .notEmpty().withMessage("Username is required")
        .bail()
        .isLength({ min: 3, max: 30 })
        .withMessage("Username must be 3-30 characters"),

        body("email")
        .trim()
        .notEmpty().withMessage("Email is required")
        .bail()
        .isEmail().withMessage("Please provide a valid email"),

        body("password")
        .notEmpty().withMessage("Password is required")
        .bail()
        .isLength({ min: 8 })
        .withMessage("Password must be at least 8 characters")
    ]
};

const loginValidator = () => {
    return [
        
        body("email")
            .optional()
            .trim()
            .isEmail().withMessage("Email is not valid"),
        body("username")
            .optional()
            .trim()
            .isLength({ min: 3 }).withMessage("Username must be at least 3 characters"),
        body("password")
            .trim()
            .bail() 
            .notEmpty().withMessage("Password is required")
    ];
};

export { registerValidator, loginValidator };