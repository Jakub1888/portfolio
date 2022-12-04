/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import mongoose from 'mongoose';
import User, { IUserModel } from '../models/User';
import jwt from 'jsonwebtoken';

const registerUser = (req: Request, res: Response, next: NextFunction) => {
    const { username, password } = req.body;

    User.findOne({ username })
        .then((user) => {
            if (user) {
                return res.status(409).json({ message: 'This username already exists' });
            } else {
                bcrypt
                    .hash(password, 12)
                    .then((hashedPw) => {
                        const user = new User({
                            _id: new mongoose.Types.ObjectId(),
                            username,
                            password: hashedPw
                        });

                        return user.save();
                    })
                    .then((user) => {
                        const token = jwt.sign(
                            {
                                username: user.username,
                                userId: user._id.toString()
                            },
                            'secret', // TODO change secret
                            { expiresIn: '1h' }
                        );
                        res.status(200).json({ token, userId: user._id.toString() });
                    })
                    .catch((error) => res.status(500).json({ error }));
            }
        })
        .catch((error) => res.status(500).json({ error }));
};

const loginUser = (req: Request, res: Response, next: NextFunction) => {
    const { username, password } = req.body;
    let loadedUser: IUserModel;

    User.findOne({ username })
        .then((user): any => {
            if (!user) {
                return res.status(401).json({ message: 'User not found.' });
            }
            loadedUser = user;
            return bcrypt.compare(password, user.password);
        })
        .then((isEqual) => {
            if (!isEqual) {
                return res.status(401).json({ message: 'Wrong password' });
            }
            const token = jwt.sign(
                {
                    username: loadedUser.username,
                    userId: loadedUser._id.toString()
                },
                'secret',
                { expiresIn: '1h' }
            );
            res.status(200).json({ token, userId: loadedUser._id.toString() });
        })
        .catch((error) => res.status(500).json({ error }));
};

const readUser = (req: Request, res: Response, next: NextFunction) => {
    const userId = req.params.userId;

    return User.findById(userId)
        .then((user) => (user ? res.status(200).json({ user }) : res.status(404).json({ message: 'Not found' })))
        .catch((error) => res.status(500).json({ error }));
};

const readAll = (req: Request, res: Response, next: NextFunction) => {
    return User.find()
        .then((users) => res.status(200).json({ users }))
        .catch((error) => res.status(500).json({ error }));
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
                    .catch((error) => res.status(500).json({ error }));
            } else {
                res.status(404).json({ message: 'Not found' });
            }
        })
        .catch((error) => res.status(500).json({ error }));
};
const deleteUser = (req: Request, res: Response, next: NextFunction) => {
    const userId = req.params.userId;

    return User.findByIdAndDelete(userId)
        .then((user) =>
            user ? res.status(201).json({ message: 'Deleted' }) : res.status(404).json({ message: 'Not found' })
        )
        .catch((error) => res.status(500).json({ error }));
};

export default {
    registerUser,
    loginUser,
    readUser,
    readAll,
    updateUser,
    deleteUser
};
