import mongoose from "mongoose";

interface Order extends mongoose.Document {
    id: string;
    user_id: mongoose.Types.ObjectId;
    celebrity_id: mongoose.Types.ObjectId;
    message: string;
    price: number;
    payment_method: string;
    payment_status: string;
    video_message_id: mongoose.Types.ObjectId;
    created_at: Date;
    updated_at: Date;
}

const orderSchema = new mongoose.Schema({
    id: {
        type: String,
        default: mongoose.Types.ObjectId,
    },
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User",
    },
    celebrity_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Celebrity",
    },
    message: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    payment_method: {
        type: String,
        required: true,
    },
    payment_status: {
        type: String,
        enum: ["Paid", "Pending", "Failed"],
        required: true,
    },
    video_message_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "VideoMessage",
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

export default mongoose.model<Order>("Order", orderSchema);
