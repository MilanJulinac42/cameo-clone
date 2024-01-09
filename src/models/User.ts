import mongoose, { Document, Schema, Model } from "mongoose";
import bcrypt from "bcrypt";

export interface IUser extends Document {
    name: string;
    email: string;
    password: string;
    phoneNumber?: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface IUserModel extends IUser {
    hashPassword(password: string): Promise<string>;
    checkPassword(password: string): Promise<boolean>;
}

const userSchema = new Schema<IUserModel>(
    {
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            lowercase: true,
            match: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/,
        },
        password: {
            type: String,
            required: true,
            minlength: 6,
        },
        phoneNumber: {
            type: String,
            validate: {
                validator: (value: string) => /^\d{10}$/.test(value),
                message: (props) =>
                    `${props.value} is not a valid phone number!`,
            },
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

userSchema.methods.hashPassword = async function (
    password: string
): Promise<string> {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword;
};

userSchema.methods.checkPassword = async function (
    password: string
): Promise<boolean> {
    const isMatch = await bcrypt.compare(password, this.password);
    return isMatch;
};

const User = mongoose.model<IUserModel>("User", userSchema);

export default User;
