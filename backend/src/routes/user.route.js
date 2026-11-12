import { Router } from "express";
import { registerUser } from "../controllers/user.controller.js";

console.log("Imported handler:", registerUser); // Will likely print 'undefined'

const router = Router();

router.post("/register", registerUser);

export default router;