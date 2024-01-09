import mongoose, { Document, Schema } from "mongoose";

export interface IOrder extends Document {
    userId: mongoose.Types.ObjectId;
    celebrityId: mongoose.Types.ObjectId;
    message: string;
    price: number;
    paymentMethod: string;
    paymentStatus: "Paid" | "Pending" | "Failed";
    videoMessageId?: mongoose.Types.ObjectId;
    createdAt: Date;
    updatedAt: Date;
}

const orderSchema = new Schema<IOrder>(
    {
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
    },
    { timestamps: true }
);

const OrderModel = mongoose.model<IOrder>("Order", orderSchema);

export default OrderModel;
