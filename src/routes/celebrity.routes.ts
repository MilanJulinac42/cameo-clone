import express, { Router } from "express";
import celebrityController from "../controllers/celebrity.controller";

const router: Router = express.Router();

router.get("/", celebrityController.getAllCelebrities);
router.get("/:id", celebrityController.getCelebrityById);
router.post("/", celebrityController.createCelebrity);
router.patch("/:id", celebrityController.updateCelebrity);
router.delete("/delete/:id", celebrityController.deleteCelebrity);
router.delete("/:id", celebrityController.removeCelebrity);

export default router;
