import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { Request, Response, NextFunction } from "express";

dotenv.config();

const SECRET = process.env.SECRET || "";

interface TokenPayload {
    userId: string;
}

export const authMiddleware = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const token = req.headers.authorization?.split(" ")[1];
        if (!token) {
            res.status(401)
                .json({ message: "Unauthorized: Token missing" })
                .end();
            return;
        }

        const decoded = jwt.verify(token, SECRET) as TokenPayload;
        (req as Request & { user: { [key: string]: any } }).user = decoded;
        next();
    } catch (error) {
        console.error(`JWT Verification Error: ${(error as Error).message}`);
        res.status(401).json({ message: "Unauthorized: Invalid token" }).end();
    }
};
