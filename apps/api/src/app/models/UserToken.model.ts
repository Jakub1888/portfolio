import mongoose, { Document, Schema } from 'mongoose';

export interface IUserToken {
    userId: string;
    token: string;
    createdAt: Date;
}

export interface UserTokenModel extends IUserToken, Document {}

const userTokenSchema: Schema = new Schema({
    userId: { type: Schema.Types.ObjectId, required: true },
    token: { type: String, required: true },
    createdAt: { type: Date, default: Date.now, expires: 30 * 86400 },
});

export default mongoose.model<IUserToken>('UserToken', userTokenSchema);
