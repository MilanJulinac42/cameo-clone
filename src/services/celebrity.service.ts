import CelebrityModel, { ICelebrity } from "../models/Celebrity";

class CelebrityService {
    async getAllCelebrities(): Promise<ICelebrity[]> {
        try {
            const celebrities = await CelebrityModel.find();
            return celebrities;
        } catch (error) {
            throw new Error(
                `Error fetching celebrities: ${(error as Error).message}`
            );
        }
    }

    async getCelebrityById(celebrityId: string): Promise<ICelebrity | null> {
        try {
            const celebrity = await CelebrityModel.findById(celebrityId);
            return celebrity;
        } catch (error) {
            throw new Error(
                `Error fetching celebrity: ${(error as Error).message}`
            );
        }
    }

    async createCelebrity(celebrityData: ICelebrity): Promise<ICelebrity> {
        try {
            const newCelebrity = await CelebrityModel.create(celebrityData);
            return newCelebrity;
        } catch (error) {
            throw new Error(
                `Error creating celebrity: ${(error as Error).message}`
            );
        }
    }

    async updateCelebrity(
        celebrityId: string,
        celebrityData: Partial<ICelebrity>
    ): Promise<ICelebrity | null> {
        try {
            const updatedCelebrity = await CelebrityModel.findByIdAndUpdate(
                celebrityId,
                { $set: celebrityData },
                { new: true }
            );
            return updatedCelebrity;
        } catch (error) {
            throw new Error(
                `Error updating celebrity: ${(error as Error).message}`
            );
        }
    }

    async deleteCelebrity(celebrityId: string): Promise<void> {
        try {
            await CelebrityModel.findByIdAndDelete(celebrityId);
        } catch (error) {
            throw new Error(
                `Error deleting celebrity: ${(error as Error).message}`
            );
        }
    }
}

export default new CelebrityService();
