import User, { IUser } from "../models/User";

class UserService {
    async getAllUsers(): Promise<IUser[]> {
        try {
            const users = await User.find();
            return users;
        } catch (error) {
            throw new Error(
                `Error fetching users: ${(error as Error).message}`
            );
        }
    }

    async getUserById(userId: string): Promise<IUser | null> {
        try {
            const user = await User.findById(userId);
            return user;
        } catch (error) {
            throw new Error(`Error fetching user: ${(error as Error).message}`);
        }
    }

    async createUser(userData: IUser): Promise<IUser> {
        try {
            const newUser = await User.create(userData);
            return newUser;
        } catch (error) {
            throw new Error(`Error creating user: ${(error as Error).message}`);
        }
    }
    async updateUser(
        userId: string,
        userData: Partial<IUser>
    ): Promise<IUser | null> {
        try {
            const updatedUser = await User.findByIdAndUpdate(
                userId,
                { $set: userData },
                { new: true }
            );
            return updatedUser;
        } catch (error) {
            throw new Error(`Error updating user: ${(error as Error).message}`);
        }
    }

    async deleteUser(userId: string): Promise<void> {
        try {
            await User.findByIdAndDelete(userId);
        } catch (error) {
            throw new Error(`Error deleting user: ${(error as Error).message}`);
        }
    }
}

export default new UserService();
