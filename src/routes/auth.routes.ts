import express from "express";
import authController from "../controllers/auth.controller";
import { loginUserValidation } from "../middleware/validation/loginValidation.middleware";

const router = express.Router();

router.post("/register", authController.registerUser);
router.post("/login", loginUserValidation, authController.loginUser);

export default router;
