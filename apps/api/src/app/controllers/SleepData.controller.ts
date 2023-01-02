/* eslint-disable @typescript-eslint/no-unused-vars */
import { Response } from 'express';
import mongoose from 'mongoose';
import User from '../models/User.model';
import SleepData from '../models/SleepData.model';
import { serverError } from '../utils/serverError';
import { Req } from '@portfolio/interfaces';

const createSleepData = async (req: Req, res: Response) => {
    let creator;
    const sleepData = createSleepDataModel(req);

    const date = await SleepData.findOne({ dateOfSleep: sleepData.dateOfSleep, user: req.userId });
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
                message: 'Sleep data successfully added.',
                sleepData,
                creator: { id: creator._id, name: creator.name }
            });
        })
        .catch((error) => serverError(error, res));
};

const updateSleepData = async (req: Req, res: Response) => {
    try {
        const sleepDataId = req.body._id;
        const sleepData = await SleepData.findById(sleepDataId);

        if (!sleepData) {
            return res.status(404).json({ message: 'Sleep data not found.' });
        }

        await sleepData.set(req.body).save();

        return res.status(201).json({ message: 'Sleep data successfully updated.', sleepData });
    } catch (error) {
        serverError(error, res);
    }
};

const getAllSleepData = async (req: Req, res: Response) => {
    try {
        const { user, sortDate } = req.body;
        const sort = sortDate ? sortDate : -1;
        const sleepData = await SleepData.find({ user }).sort({ dateOfSleep: sort });

        return sleepData
            ? res.status(200).json({ sleepData })
            : res.status(404).json({ message: 'No sleep data found.' });
    } catch (error) {
        return serverError(error, res);
    }
};

const getAverageSleepData = async (req: Req, res: Response) => {
    const ObjectId = mongoose.Types.ObjectId;
    const limit = req.body.limit ? req.body.limit : 7;

    const averages = await SleepData.aggregate([
        {
            $match: { user: new ObjectId(req.userId) }
        },
        { $sort: { dateOfSleep: -1 } },
        { $limit: limit },
        {
            $group: {
                _id: null,
                quality: { $avg: '$quality' },
                mood: { $avg: '$mood' },
                wentToBedAt: { $avg: '$wentToBedAt' },
                wokeUpAt: { $avg: '$wokeUpAt' }
            }
        },
        {
            $project: {
                _id: '$_id',
                quality: { $round: ['$quality', 1] },
                mood: { $round: ['$mood', 1] },
                wentToBedAt: { $round: ['$wentToBedAt'] },
                wokeUpAt: { $round: ['$wokeUpAt'] },
                awakeTime: { $subtract: ['$wentToBedAt', '$wokeUpAt'] }
            }
        }
    ]);
    const firstAndLast = await SleepData.aggregate([
        { $sort: { dateOfSleep: -1 } },
        { $limit: limit },
        {
            $group: {
                _id: null,
                first: { $first: '$dateOfSleep' },
                last: { $last: '$dateOfSleep' }
            }
        }
    ]);

    try {
        return averages
            ? res.status(200).json({ averages, firstAndLast })
            : res.status(404).json({ message: 'No sleep data found.' });
    } catch (error) {
        return serverError(error, res);
    }
};

const getSleepData = async (req: Req, res: Response) => {
    const { dateOfSleep } = req.params;
    const sleepData = await SleepData.findOne({ dateOfSleep, user: req.userId }).select([
        '-createdAt',
        '-updatedAt',
        '-user',
        '-__v'
    ]);

    try {
        return sleepData
            ? res.status(200).json({ sleepData })
            : res.status(200).json({ message: 'Sleep data for selected day was not found.' });
    } catch (error) {
        return serverError(error, res);
    }
};

const deleteSleepData = async (req: Req, res: Response) => {
    try {
        const sleepDataId = req.body._id;
        if (!sleepDataId) {
            return res.status(404).json({ message: 'Sleep data not fouund.' });
        }

        await SleepData.findByIdAndDelete(sleepDataId);

        return res.status(201).json({ message: 'Sleep data successfully deleted.' });
    } catch (error) {
        serverError(error, res);
    }
};

const createSleepDataModel = (req: Req) => {
    const { dateOfSleep, quality, wentToBedAt, wokeUpAt, mood, description } = req.body;

    const sleepData = new SleepData({
        _id: new mongoose.Types.ObjectId(),
        dateOfSleep,
        quality,
        wentToBedAt,
        wokeUpAt,
        mood,
        description,
        user: req.userId
    });

    return sleepData;
};

export default {
    createSleepData,
    updateSleepData,
    getAllSleepData,
    getAverageSleepData,
    deleteSleepData,
    getSleepData
};
