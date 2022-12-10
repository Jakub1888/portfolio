/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import User from '../models/User';
import SleepData from '../models/SleepData';

export interface Req extends Request {
    userId: string;
}

const createSleepData = (req: Req, res: Response, next: NextFunction) => {
    const { quality, wentToBedAt, wokeUpAt, mood, description } = req.body;
    let creator;

    const sleepData = new SleepData({
        _id: new mongoose.Types.ObjectId(),
        quality,
        wentToBedAt,
        wokeUpAt,
        mood,
        description,
        user: "638f0120a6a0039e937aebe1"
    });

    return sleepData
        .save()
        .then(() => {
            return User.findById(req.userId);
        })
        .then((user) => {
            creator = user;
            user.sleepDataCollection.push(sleepData);
            return user.save();
        })
        .then((result) => {
            res.status(201).json({
                message: 'Sleep data added successfully',
                sleepData,
                creator: { id: creator._id, name: creator.name }
            });
        })
        .catch((error) =>  {
            console.log(error);
            return res.status(500).json({ error })
        });
};

export default {
    createSleepData
}