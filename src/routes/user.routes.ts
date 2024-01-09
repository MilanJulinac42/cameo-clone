import { Router } from "express";
import userController from "../controllers/user.controller";
import {
    createUserValidation,
    updateUserValidation,
} from "../middleware/validation/userValidation.middleware";
import objectIdValidation from "../middleware/validation/idValidation.middleware";

const router = Router();

router.get("/", userController.getAllUsers);
router.get("/:id", objectIdValidation, userController.getUserById);
router.post("/", createUserValidation, userController.createUser);
router.patch(
    "/:id",
    objectIdValidation,
    updateUserValidation,
    userController.updateUser
);
router.delete("/delete/:id", objectIdValidation, userController.deleteUser);
router.delete("/:id", objectIdValidation, userController.removeUser);

export default router;
