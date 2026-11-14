import { Router } from "express";
import { registerUser, loginUser } from "../controllers/user.controller.js";
import { registerValidator, loginValidator } from "../validators/user.validator.js";
import { validate } from "../middlewares/validate.middleware.js";

const router = Router();

router.post("/register",registerValidator, validate, registerUser);
router.post("/login",loginValidator, validate, loginUser);

export default router;