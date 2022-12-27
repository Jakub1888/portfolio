/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from 'express';
import User from '../models/User.model';
import { serverError } from '../utils/serverError';

const readUser = async (req: Request, res: Response) => {
    try {
        const userId = req.params.userId;
        const user = await User.findById(userId).select(['-password']);
        return user ? res.status(200).json({ user }) : res.status(404).json({ message: 'Not found' });
    } catch (error) {
        return serverError(error, res);
    }
};

const readAll = async (req: Request, res: Response) => {
    try {
        const users = await User.find().select(['-password']);
        return res.status(200).json({ users });
    } catch (error) {
        return serverError(error, res);
    }
};

const updateUser = async (req: Request, res: Response) => {
    try {
        const userId = req.params.userId;
        const user = await User.findById(userId);

        if (!user) {
            return res.status(401).json({ message: 'User not found.' });
        }

        await user.set(req.body).save();

        return res.status(201).json({ user });
    } catch (error) {
        serverError(error, res);
    }
};
const deleteUser = async (req: Request, res: Response) => {
    const userId = req.params.userId;

    return User.findByIdAndDelete(userId)
        .then((user) =>
            user ? res.status(201).json({ message: 'Deleted' }) : res.status(404).json({ message: 'Not found' })
        )
        .catch((error) => serverError(error, res));
};

export default {
    readUser,
    readAll,
    updateUser,
    deleteUser
};
