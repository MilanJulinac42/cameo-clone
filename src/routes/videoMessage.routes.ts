import express, { Router } from "express";
import videoMessageController from "../controllers/videoMessage.controller";
import {
    createVideoMessageValidation,
    updateVideoMessageValidation,
} from "../middleware/validation/videoMessageValidation.middleware";
import objectIdValidation from "../middleware/validation/idValidation.middleware";

const router: Router = express.Router();

router.get("/", videoMessageController.getAllVideoMessages);
router.get(
    "/:id",
    objectIdValidation,
    videoMessageController.getVideoMessageById
);
router.post(
    "/",
    createVideoMessageValidation,
    videoMessageController.createVideoMessage
);
router.patch(
    "/:id",
    objectIdValidation,
    updateVideoMessageValidation,
    videoMessageController.updateVideoMessage
);
router.delete(
    "/delete/:id",
    objectIdValidation,
    videoMessageController.deleteVideoMessage
);
router.delete(
    "/:id",
    objectIdValidation,
    videoMessageController.removeVideoMessage
);

export default router;
