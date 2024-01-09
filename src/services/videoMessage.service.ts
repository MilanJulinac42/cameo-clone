import VideoMessageModel, { IVideoMessage } from "../models/VideoMessage";

class VideoMessageService {
    async getAllVideoMessages(): Promise<IVideoMessage[]> {
        try {
            const videoMessages = await VideoMessageModel.find();
            return videoMessages;
        } catch (error) {
            throw new Error(
                `Error fetching video messages: ${(error as Error).message}`
            );
        }
    }

    async getVideoMessageById(
        videoMessageId: string
    ): Promise<IVideoMessage | null> {
        try {
            const videoMessage = await VideoMessageModel.findById(
                videoMessageId
            );
            return videoMessage;
        } catch (error) {
            throw new Error(
                `Error fetching video message: ${(error as Error).message}`
            );
        }
    }

    async createVideoMessage(
        videoMessageData: IVideoMessage
    ): Promise<IVideoMessage> {
        try {
            const newVideoMessage = await VideoMessageModel.create(
                videoMessageData
            );
            return newVideoMessage;
        } catch (error) {
            throw new Error(
                `Error creating video message: ${(error as Error).message}`
            );
        }
    }

    async updateVideoMessage(
        videoMessageId: string,
        videoMessageData: Partial<IVideoMessage>
    ): Promise<IVideoMessage | null> {
        try {
            const updatedVideoMessage =
                await VideoMessageModel.findByIdAndUpdate(
                    videoMessageId,
                    videoMessageData,
                    { new: true }
                );
            return updatedVideoMessage;
        } catch (error) {
            throw new Error(
                `Error updating video message: ${(error as Error).message}`
            );
        }
    }

    async deleteVideoMessage(videoMessageId: string): Promise<void> {
        try {
            await VideoMessageModel.findByIdAndDelete(videoMessageId);
        } catch (error) {
            throw new Error(
                `Error deleting video message: ${(error as Error).message}`
            );
        }
    }
}

export default new VideoMessageService();
