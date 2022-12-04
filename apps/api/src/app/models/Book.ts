import mongoose, { Document, Schema } from 'mongoose';

export interface IBook {
    title: string;
    user: string;
}

export interface IBookModel extends IBook, Document {}

const BookSchema: Schema = new Schema(
    {
        title: { type: String, required: true },
        user: { type: Schema.Types.ObjectId, required: true, ref: 'User' }
    },
    {
        timestamps: true
    }
);

export default mongoose.model<IBookModel>('Book', BookSchema);
