import mongoose from "mongoose";

interface Order extends mongoose.Document {
    id: string;
    userId: mongoose.Types.ObjectId;
    celebrityId: mongoose.Types.ObjectId;
    message: string;
    price: number;
    paymentMethod: string;
    paymentStatus: string;
    videoMessageId: mongoose.Types.ObjectId;
    createdAt: Date;
    updatedAt: Date;
}

const orderSchema = new mongoose.Schema({
    id: {
        type: String,
        default: mongoose.Types.ObjectId,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User",
    },
    celebrityId: {
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
    paymentMethod: {
        type: String,
        required: true,
    },
    paymentStatus: {
        type: String,
        enum: ["Paid", "Pending", "Failed"],
        required: true,
    },
    videoMessageId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "VideoMessage",
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

export default mongoose.model<Order>("Order", orderSchema);
