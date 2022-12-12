/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from 'express';
import User from '../models/User';
import { serverError } from '../library/serverError';

const readUser = (req: Request, res: Response, next: NextFunction) => {
    const userId = req.params.userId;

    return User.findById(userId)
        .then((user) => (user ? res.status(200).json({ user }) : res.status(404).json({ message: 'Not found' })))
        .catch((error) => serverError(error, res));
};

const readAll = (req: Request, res: Response, next: NextFunction) => {
    return User.find()
        .then((users) => res.status(200).json({ users }))
        .catch((error) => serverError(error, res));
};

const updateUser = (req: Request, res: Response, next: NextFunction) => {
    const userId = req.params.userId;

    return User.findById(userId)
        .then((user) => {
            if (user) {
                user.set(req.body);

                return user
                    .save()
                    .then((user) => res.status(201).json({ user }))
                    .catch((error) => serverError(error, res));
            } else {
                res.status(404).json({ message: 'Not found' });
            }
        })
        .catch((error) => serverError(error, res));
};
const deleteUser = (req: Request, res: Response, next: NextFunction) => {
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
