import mongoose from "mongoose";

interface VideoMessage extends mongoose.Document {
    id: string;
    fromCelebrityId: mongoose.Types.ObjectId;
    toUserId: mongoose.Types.ObjectId;
    message: string;
    videoUrl: string;
    duration: number;
    price: number;
    status: string;
    createdAt: Date;
    updatedAt: Date;
}

const videoMessageSchema = new mongoose.Schema({
    id: {
        type: String,
        default: mongoose.Types.ObjectId,
    },
    fromCelebrityId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Celebrity",
    },
    toUserId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User",
    },
    message: {
        type: String,
        required: true,
    },
    videoUrl: {
        type: String,
    },
    duration: {
        type: Number,
    },
    price: {
        type: Number,
        required: true,
    },
    status: {
        type: String,
        enum: ["Pending", "Accepted", "Completed", "Rejected"],
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
});

export default mongoose.model<VideoMessage>("VideoMessage", videoMessageSchema);
