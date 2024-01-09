import express, { Router } from "express";
import videoMessageController from "../controllers/videoMessage.controller";

const router: Router = express.Router();

router.get("/", videoMessageController.getAllVideoMessages);
router.get("/:id", videoMessageController.getVideoMessageById);
router.post("/", videoMessageController.createVideoMessage);
router.put("/:id", videoMessageController.updateVideoMessage);
router.delete("/:id", videoMessageController.deleteVideoMessage);

export default router;
