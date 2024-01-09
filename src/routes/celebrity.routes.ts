import express, { Router } from "express";
import celebrityController from "../controllers/celebrity.controller";

const router: Router = express.Router();

router.get("/", celebrityController.getAllCelebrities);
router.get("/:id", celebrityController.getCelebrityById);
router.post("/", celebrityController.createCelebrity);
router.patch("/:id", celebrityController.updateCelebrity);
router.delete("/:id", celebrityController.deleteCelebrity);

export default router;
