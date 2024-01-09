import mongoose, { Document, Schema } from "mongoose";

export interface IVideoMessage extends Document {
    fromCelebrityId: mongoose.Types.ObjectId;
    toUserId: mongoose.Types.ObjectId;
    message: string;
    videoUrl?: string;
    duration?: number;
    price: number;
    status: "Pending" | "Accepted" | "Completed" | "Rejected";
    deleted: boolean;
    createdAt: Date;
    updatedAt: Date;
}

const videoMessageSchema = new Schema<IVideoMessage>(
    {
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
        deleted: {
            type: Boolean,
            default: false,
        },
    },
    { timestamps: true }
);

const VideoMessageModel = mongoose.model<IVideoMessage>(
    "VideoMessage",
    videoMessageSchema
);

export default VideoMessageModel;
