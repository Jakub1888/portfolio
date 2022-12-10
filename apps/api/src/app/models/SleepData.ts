import mongoose, { Document, Schema } from 'mongoose';

export interface ISleepData {
    quality: number;
    wentToBedAt: string;
    wokeUpAt: string;
    mood: number; // možno enum?
    description: string;
    user: string;
}

export interface ISleepDataModel extends ISleepData, Document {}

const currentDate = new Date(new Date().toDateString());

const SleepDataSchema: Schema = new Schema(
    {
        quality: { type: Number, required: true },
        wentToBedAt: { type: String, required: true },
        wokeUpAt: { type: String, required: true },
        mood: { type: Number, required: false },
        description: { type: String, required: true },
        user: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
        createdAt: { type: Date, reequired:true, unique: true, default: currentDate }
    },
    {
        timestamps: { createdAt: false, updatedAt: true }
    }
);

export default mongoose.model<ISleepDataModel>('SleepData', SleepDataSchema);
