import { Request, Response } from "express";
import celebrityService from "../services/celebrity.service";
import { ICelebrity } from "../models/Celebrity";

class CelebrityController {
    async getAllCelebrities(req: Request, res: Response): Promise<void> {
        try {
            const celebrities = await celebrityService.getAllCelebrities();
            res.json(celebrities);
        } catch (error) {
            res.status(500).json({ error: (error as Error).message });
        }
    }

    async getCelebrityById(req: Request, res: Response): Promise<void> {
        const celebrityId = req.params.id;
        try {
            const celebrity = await celebrityService.getCelebrityById(
                celebrityId
            );
            if (celebrity) {
                res.json(celebrity);
            } else {
                res.status(404).json({ message: "Celebrity not found" });
            }
        } catch (error) {
            res.status(500).json({ error: (error as Error).message });
        }
    }

    async createCelebrity(req: Request, res: Response): Promise<void> {
        const celebrityData = req.body;
        try {
            const newCelebrity = await celebrityService.createCelebrity(
                celebrityData
            );
            res.status(201).json(newCelebrity);
        } catch (error) {
            res.status(500).json({ error: (error as Error).message });
        }
    }

    async updateCelebrity(req: Request, res: Response): Promise<void> {
        const celebrityId = req.params.id;
        const celebrityData = req.body;
        try {
            const updatedCelebrity = await celebrityService.updateCelebrity(
                celebrityId,
                celebrityData
            );
            if (updatedCelebrity) {
                res.json(updatedCelebrity);
            } else {
                res.status(404).json({ message: "Celebrity not found" });
            }
        } catch (error) {
            res.status(500).json({ error: (error as Error).message });
        }
    }

    async deleteCelebrity(req: Request, res: Response): Promise<void> {
        const celebrityId = req.params.id;
        try {
            await celebrityService.deleteCelebrity(celebrityId);
            res.json({ message: "Celebrity deleted successfully" });
        } catch (error) {
            res.status(500).json({ error: (error as Error).message });
        }
    }
}

export default new CelebrityController();
