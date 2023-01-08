import { SleepData } from '@portfolio/interfaces';
import mongoose, { Document, Schema } from 'mongoose';

export interface ISleepDataModel extends Omit<SleepData, '_id'>, Document {}

const SleepDataSchema: Schema = new Schema(
    {
        quality: { type: Number, required: true },
        dateOfSleep: { type: Date, required: true },
        wentToBedAt: { type: Number, required: true },
        wokeUpAt: { type: Number, required: true },
        mood: { type: Number, required: false },
        description: { type: String, required: false },
        user: { type: Schema.Types.ObjectId, required: true, ref: 'User' }
    },
    {
        timestamps: true
    }
);

export default mongoose.model<ISleepDataModel>('SleepData', SleepDataSchema);
