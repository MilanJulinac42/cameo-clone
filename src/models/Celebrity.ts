import mongoose, { Document, Schema, Model } from "mongoose";
import bcrypt from "bcrypt";

export interface ICelebrity extends Document {
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
    deleted: boolean;
}

export interface ICelebrityModel extends ICelebrity {
    hashPassword(password: string): Promise<string>;
    checkPassword(password: string): Promise<boolean>;
}

const celebritySchema = new Schema<ICelebrityModel>(
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
        deleted: {
            type: Boolean,
            default: false,
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

celebritySchema.methods.hashPassword = async function (
    password: string
): Promise<string> {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword;
};

celebritySchema.methods.checkPassword = async function (
    password: string
): Promise<boolean> {
    const isMatch = await bcrypt.compare(password, this.password);
    return isMatch;
};

const CelebrityModel = mongoose.model<ICelebrityModel>(
    "Celebrity",
    celebritySchema
);

export default CelebrityModel;
