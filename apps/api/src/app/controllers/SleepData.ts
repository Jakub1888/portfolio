/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Response } from 'express';
import mongoose from 'mongoose';
import User from '../models/User';
import SleepData from '../models/SleepData';
import { serverError } from '../library/serverError';
import { Req } from '@portfolio/interfaces';

const createSleepData = async (req: Req, res: Response, next: NextFunction) => {
    let creator;
    const sleepData = createSleepDataModel(req);

    const date = await SleepData.findOne({ dateOfSleep: sleepData.dateOfSleep, user: sleepData.user });
    if (date) {
        return res.status(409).json({ message: 'Sleep data for the selected day already exists.' });
    }

    return sleepData
        .save()
        .then(() => {
            return User.findById(sleepData.user);
        })
        .then((user) => {
            creator = user;
            user.sleepDataCollection.push(sleepData);
            return user.save();
        })
        .then(() => {
            res.status(201).json({
                message: 'Sleep data added successfully',
                sleepData,
                creator: { id: creator._id, name: creator.name }
            });
        })
        .catch((error) => serverError(error, res));
};

const createSleepDataModel = (req: Req) => {
    const { dateOfSleep, quality, wentToBedAt, wokeUpAt, mood, description, user } = req.body;

    const sleepData = new SleepData({
        _id: new mongoose.Types.ObjectId(),
        dateOfSleep,
        quality,
        wentToBedAt,
        wokeUpAt,
        mood,
        description,
        user
    });

    return sleepData;
};

export default {
    createSleepData
};
