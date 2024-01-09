import { Request, Response } from "express";
import userService from "../services/user.service";

class UserController {
    async getAllUsers(req: Request, res: Response): Promise<void> {
        try {
            const users = await userService.getAllUsers();
            res.json(users);
        } catch (error) {
            res.status(500).json({ error: (error as Error).message });
        }
    }

    async getUserById(req: Request, res: Response): Promise<void> {
        const userId = req.params.id;
        try {
            const user = await userService.getUserById(userId);
            if (user) {
                res.json(user);
            } else {
                res.status(404).json({ message: "User not found" });
            }
        } catch (error) {
            res.status(500).json({ error: (error as Error).message });
        }
    }

    async createUser(req: Request, res: Response): Promise<void> {
        const userData = req.body;
        try {
            const newUser = await userService.createUser(userData);
            res.status(201).json(newUser);
        } catch (error) {
            res.status(500).json({ error: (error as Error).message });
        }
    }

    async updateUser(req: Request, res: Response): Promise<void> {
        const userId = req.params.id;
        const userData = req.body;
        try {
            const updatedUser = await userService.updateUser(userId, userData);
            if (updatedUser) {
                res.json(updatedUser);
            } else {
                res.status(404).json({ message: "User not found" });
            }
        } catch (error) {
            res.status(500).json({ error: (error as Error).message });
        }
    }

    async deleteUser(req: Request, res: Response): Promise<void> {
        const userId = req.params.id;
        try {
            await userService.deleteUser(userId);
            res.json({ message: "User deleted successfully" });
        } catch (error) {
            res.status(500).json({ error: (error as Error).message });
        }
    }
}

export default new UserController();
