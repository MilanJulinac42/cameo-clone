import mongoose from "mongoose";

interface Celebrity extends mongoose.Document {
    id: string;
    name: string;
    profession: string;
    image_url: string;
    bio: string;
    social_media_links: { [key: string]: string };
    price_per_message: number;
    availability: boolean;
    created_at: Date;
    updated_at: Date;
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
    image_url: {
        type: String,
        required: true,
    },
    bio: {
        type: String,
    },
    social_media_links: {
        type: Map,
        of: String,
    },
    price_per_message: {
        type: Number,
        required: true,
    },
    availability: {
        type: Boolean,
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

export default mongoose.model<Celebrity>("Celebrity", celebritySchema);
