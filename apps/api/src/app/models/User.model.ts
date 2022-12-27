import { IUserWithSleepDataCollection } from '@portfolio/interfaces';
import mongoose, { Document, Schema } from 'mongoose';

export interface IUserModel extends IUserWithSleepDataCollection, Document {}

const UserSchema: Schema = new Schema(
    {
        username: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        sleepDataCollection: [{ type: Schema.Types.ObjectId, ref: 'SleepData' }]
    },
    {
        versionKey: false
    }
);

export default mongoose.model<IUserModel>('User', UserSchema);
