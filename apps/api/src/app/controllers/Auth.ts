/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import mongoose, { Error } from 'mongoose';
import User, { IUserModel } from '../models/User';
import jwt from 'jsonwebtoken';
import { serverError } from '../library/serverError';
import dotenv from 'dotenv';
dotenv.config();

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
                            process.env.JWT_SECRET,
                            { expiresIn: process.env.JWT_EXPIRE }
                        );
                        res.status(200).json({ token, userId: user._id.toString() });
                    })
                    .catch((error) => serverError(error, res));
            }
        })
        .catch((error) => serverError(error, res));
};

const loginUser = (req: Request, res: Response, next: NextFunction) => {
    const { username, password } = req.body;
    let loadedUser: IUserModel;

    User.findOne({ username }, async (error: Error, user: IUserModel) => {
        if (error) {
            return serverError(error, res);
        }

        if (!user) {
            return res.status(401).json({ message: 'User not found.' });
        } else {
            loadedUser = user;
            const isEqual = await bcrypt.compare(password, user.password);

            if (!isEqual) {
                return res.status(401).json({ message: 'Wrong password' });
            }
            const token = jwt.sign(
                {
                    username: loadedUser.username,
                    userId: loadedUser._id.toString()
                },
                process.env.JWT_SECRET,
                { expiresIn: process.env.JWT_EXPIRE }
            );
            res.status(200).json({ token, userId: loadedUser._id.toString() });
        }
    });
};

export default { registerUser, loginUser };
