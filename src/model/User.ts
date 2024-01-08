import mongoose from "mongoose";

interface User extends mongoose.Document {
    id: string;
    name: string;
    email: string;
    password: string;
    phone_number?: string;
    created_at: Date;
    updated_at: Date;
}

const userSchema = new mongoose.Schema({
    id: {
        type: String,
        default: mongoose.Types.ObjectId,
    },
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    phone_number: {
        type: String,
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

export default mongoose.model<User>("User", userSchema);
