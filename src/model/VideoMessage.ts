import mongoose from "mongoose";

interface VideoMessage extends mongoose.Document {
    id: string;
    from_celebrity_id: mongoose.Types.ObjectId;
    to_user_id: mongoose.Types.ObjectId;
    message: string;
    video_url: string;
    duration: number;
    price: number;
    status: string;
    created_at: Date;
    updated_at: Date;
}

const videoMessageSchema = new mongoose.Schema({
    id: {
        type: String,
        default: mongoose.Types.ObjectId,
    },
    from_celebrity_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Celebrity",
    },
    to_user_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User",
    },
    message: {
        type: String,
        required: true,
    },
    video_url: {
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
    created_at: {
        type: Date,
        default: Date.now,
    },
    updated_at: {
        type: Date,
        default: Date.now,
    },
});

export default mongoose.model<VideoMessage>("VideoMessage", videoMessageSchema);
