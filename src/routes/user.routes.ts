import { Router } from "express";
import userController from "../controllers/user.controller";
import {
    createUserValidation,
    updateUserValidation,
} from "../middleware/validation/userValidation.middleware";

const router = Router();

router.get("/", userController.getAllUsers);
router.get("/:id", userController.getUserById);
router.post("/", createUserValidation, userController.createUser);
router.patch("/:id", updateUserValidation, userController.updateUser);
router.delete("/delete/:id", userController.deleteUser);
router.delete("/:id", userController.removeUser);

export default router;
