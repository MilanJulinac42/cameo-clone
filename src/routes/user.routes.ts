import { Router } from "express";
import userController from "../controllers/user.controller";

const router = Router();

router.get("/", userController.getAllUsers);
router.get("/:id", userController.getUserById);
router.post("/", userController.createUser);
router.patch("/:id", userController.updateUser);
router.delete("/delete/:id", userController.deleteUser);
router.delete("/:id", userController.removeUser);

export default router;
