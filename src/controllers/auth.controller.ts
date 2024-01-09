import { Request, Response } from "express";
import authService from "../services/auth.service";

class AuthController {
    async registerUser(req: Request, res: Response): Promise<void> {
        const userData = req.body;
        try {
            const newUser = await authService.registerUser(userData);
            res.status(201).json(newUser);
        } catch (error) {
            res.status(500).json({ error: (error as Error).message });
        }
    }

    async loginUser(req: Request, res: Response): Promise<void> {
        const { email, password } = req.body;
        try {
            const user = await authService.loginUser(email, password);

            if (user) {
                // TODO: Generate and send JWT token
                res.json({ message: "Login successful", user });
            } else {
                res.status(401).json({ message: "Invalid email or password" });
            }
        } catch (error) {
            res.status(500).json({ error: (error as Error).message });
        }
    }
}

export default new AuthController();
