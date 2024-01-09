import { Request, Response } from "express";
import videoMessageService from "../services/videoMessage.service";
import { IVideoMessage } from "../models/VideoMessage";

class VideoMessageController {
    async getAllVideoMessages(req: Request, res: Response): Promise<void> {
        try {
            const videoMessages =
                await videoMessageService.getAllVideoMessages();
            res.json(videoMessages);
        } catch (error) {
            res.status(500).json({ error: (error as Error).message });
        }
    }

    async getVideoMessageById(req: Request, res: Response): Promise<void> {
        const videoMessageId = req.params.id;
        try {
            const videoMessage = await videoMessageService.getVideoMessageById(
                videoMessageId
            );
            if (videoMessage) {
                res.json(videoMessage);
            } else {
                res.status(404).json({ message: "Video message not found" });
            }
        } catch (error) {
            res.status(500).json({ error: (error as Error).message });
        }
    }

    async createVideoMessage(req: Request, res: Response): Promise<void> {
        const videoMessageData = req.body;
        try {
            const newVideoMessage =
                await videoMessageService.createVideoMessage(videoMessageData);
            res.status(201).json(newVideoMessage);
        } catch (error) {
            res.status(500).json({ error: (error as Error).message });
        }
    }

    async updateVideoMessage(req: Request, res: Response): Promise<void> {
        const videoMessageId = req.params.id;
        const videoMessageData = req.body;
        try {
            const updatedVideoMessage =
                await videoMessageService.updateVideoMessage(
                    videoMessageId,
                    videoMessageData
                );
            if (updatedVideoMessage) {
                res.json(updatedVideoMessage);
            } else {
                res.status(404).json({ message: "Video message not found" });
            }
        } catch (error) {
            res.status(500).json({ error: (error as Error).message });
        }
    }

    async deleteVideoMessage(req: Request, res: Response): Promise<void> {
        const videoMessageId = req.params.id;
        try {
            await videoMessageService.deleteVideoMessage(videoMessageId);
            res.json({ message: "Video message deleted successfully" });
        } catch (error) {
            res.status(500).json({ error: (error as Error).message });
        }
    }
}

export default new VideoMessageController();
