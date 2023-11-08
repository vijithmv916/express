import {Document, Schema, model} from 'mongoose';

export interface IUser extends Document {
    name: string;
    email: string;
    password: string;
    age: number;
}

const userSchema = new Schema<IUser>({
    id:{
        type: Number,
        required: [true, 'Please enter your id'],
        unique: true,
    },
    name: {
        type: String,
        required: [true, 'Please enter your name'],
        maxLength: [30, 'Your name cannot exceed 30 characters'],
        unique: true
    },
    email: {
        type: String,
        required: [true, 'Please enter your email'],
        unique: true,
        match: [/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, 'Please enter a valid email address']
    },
    password: {
        type: String,
        required: [true, 'Please enter your password'],
        minLength: [6, 'Your password must be longer than 6 characters'],
        select: false
    },
    age: {
        type: Number,
        required: [true, 'Please enter your age'],
    }
}, {
    timestamps: true
})

export const User = model<IUser>('User', userSchema);