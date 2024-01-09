import User, { IUser } from "../models/User";
import bcrypt from "bcrypt";

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

    async loginUser(email: string, password: string): Promise<IUser | null> {
        try {
            const user = await User.findOne({ email });

            if (user && (await bcrypt.compare(password, user.password))) {
                return user;
            }

            return null;
        } catch (error) {
            throw new Error(`Error logging in: ${(error as Error).message}`);
        }
    }
}

export default new AuthService();
