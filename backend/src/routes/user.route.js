import { Router } from "express";
import { registerUser } from "../controllers/user.controller.js";
import { registerValidator } from "../validators/user.validator.js";
import { validate } from "../middlewares/validate.middleware.js";

const router = Router();

router.post("/register",registerValidator, validate, registerUser);

export default router;