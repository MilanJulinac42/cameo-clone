import express, { Router } from "express";
import celebrityController from "../controllers/celebrity.controller";
import {
    createCelebrityValidation,
    updateCelebrityValidation,
} from "../middleware/validation/celebrityValidation.middleware";
import objectIdValidation from "../middleware/validation/idValidation.middleware";

const router: Router = express.Router();

router.get("/", celebrityController.getAllCelebrities);
router.get("/:id", objectIdValidation, celebrityController.getCelebrityById);
router.post(
    "/",
    createCelebrityValidation,
    celebrityController.createCelebrity
);
router.patch(
    "/:id",
    objectIdValidation,
    updateCelebrityValidation,
    celebrityController.updateCelebrity
);
router.delete(
    "/delete/:id",
    objectIdValidation,
    celebrityController.deleteCelebrity
);
router.delete("/:id", objectIdValidation, celebrityController.removeCelebrity);

export default router;
