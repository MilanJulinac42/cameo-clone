import express, { Router } from "express";
import celebrityController from "../controllers/celebrity.controller";
import {
    createCelebrityValidation,
    updateCelebrityValidation,
} from "../middleware/validation/celebrityValidation.middleware";

const router: Router = express.Router();

router.get("/", celebrityController.getAllCelebrities);
router.get("/:id", celebrityController.getCelebrityById);
router.post(
    "/",
    createCelebrityValidation,
    celebrityController.createCelebrity
);
router.patch(
    "/:id",
    updateCelebrityValidation,
    celebrityController.updateCelebrity
);
router.delete("/delete/:id", celebrityController.deleteCelebrity);
router.delete("/:id", celebrityController.removeCelebrity);

export default router;
