import mongoose, { Document, Schema } from "mongoose";

export interface ICelebrity extends Document {
    name: string;
    profession: string;
    imageUrl: string;
    bio?: string;
    demoVideo?: mongoose.Types.ObjectId;
    socialMediaLinks: Record<string, string>;
    pricePerMessage: number;
    availability: boolean;
    createdAt: Date;
    updatedAt: Date;
}

const celebritySchema = new Schema<ICelebrity>(
    {
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
    },
    { timestamps: true }
);

const CelebrityModel = mongoose.model<ICelebrity>("Celebrity", celebritySchema);

export default CelebrityModel;
