import User, { IUser } from "../models/User";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const SECRET = process.env.SECRET || "";

class AuthService {
    async registerUser(userData: IUser): Promise<IUser> {
        try {
            const hashedPassword = await bcrypt.hash(userData.password, 10);
            const userWithHashedPassword = {
                ...userData,
                password: hashedPassword,
            };

            const newUser = await User.create(userWithHashedPassword);
            return newUser;
        } catch (error) {
            throw new Error(
                `Error registering user: ${(error as Error).message}`
            );
        }
    }

    async loginUser(
        email: string,
        password: string
    ): Promise<{ user: IUser; token: string } | null> {
        try {
            const user = await User.findOne({ email });

            if (user && (await user.checkPassword(password))) {
                const token = jwt.sign({ userId: user._id }, SECRET, {
                    expiresIn: "3h",
                });

                return { user: user as IUser, token };
            }

            return null;
        } catch (error) {
            throw new Error(`Error logging in: ${(error as Error).message}`);
        }
    }
}

export default new AuthService();
