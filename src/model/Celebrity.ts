import mongoose from "mongoose";

interface Celebrity extends mongoose.Document {
    id: string;
    name: string;
    profession: string;
    imageUrl: string;
    bio: string;
    demoVideo: mongoose.Types.ObjectId;
    socialMediaLinks: { [key: string]: string };
    pricePerMessage: number;
    availability: boolean;
    createdAt: Date;
    updatedAt: Date;
}

const celebritySchema = new mongoose.Schema({
    id: {
        type: String,
        default: mongoose.Types.ObjectId,
    },
    name: {
        type: String,
        required: true,
    },
    profession: {
        type: String,
        required: true,
    },
    imageUrl: {
        type: String,
        required: true,
    },
    bio: {
        type: String,
    },
    demoVideo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "VideoMessage",
    },
    socialMediaLinks: {
        type: Map,
        of: String,
    },
    pricePerMessage: {
        type: Number,
        required: true,
    },
    availability: {
        type: Boolean,
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

export default mongoose.model<Celebrity>("Celebrity", celebritySchema);
