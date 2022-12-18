import { SleepData } from '@portfolio/interfaces';
import mongoose, { Document, Schema } from 'mongoose';

export interface ISleepDataModel extends SleepData, Document {}

const SleepDataSchema: Schema = new Schema(
    {
        quality: { type: Number, required: true },
        dateOfSleep: { type: Date, required: true },
        wentToBedAt: { type: String, required: true },
        wokeUpAt: { type: String, required: true },
        mood: { type: Number, required: false },
        description: { type: String, required: false },
        user: { type: Schema.Types.ObjectId, required: true, ref: 'User' }
    },
    {
        timestamps: true
    }
);

export default mongoose.model<ISleepDataModel>('SleepData', SleepDataSchema);
