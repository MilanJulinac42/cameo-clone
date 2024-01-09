import express, { Router } from "express";
import videoMessageController from "../controllers/videoMessage.controller";

const router: Router = express.Router();

router.get("/", videoMessageController.getAllVideoMessages);
router.get("/:id", videoMessageController.getVideoMessageById);
router.post("/", videoMessageController.createVideoMessage);
router.patch("/:id", videoMessageController.updateVideoMessage);
router.delete("/delete/:id", videoMessageController.deleteVideoMessage);
router.delete("/:id", videoMessageController.removeVideoMessage);

export default router;
