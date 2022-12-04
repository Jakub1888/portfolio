import { IUserWithBooks } from '@portfolio/interfaces';
import mongoose, { Document, Schema } from 'mongoose';

export interface IUserModel extends IUserWithBooks, Document {}

const UserSchema: Schema = new Schema(
    {
        username: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        books: [{ type: Schema.Types.ObjectId, ref: 'Book' }]
    },
    {
        versionKey: false
    }
);

export default mongoose.model<IUserModel>('User', UserSchema);
