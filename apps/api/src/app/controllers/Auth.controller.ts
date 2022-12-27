/* eslint-disable prefer-const */
import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import mongoose from 'mongoose';
import User, { IUserModel } from '../models/User.model';
import { serverError } from '../utils/serverError';
import dotenv from 'dotenv';
import generateTokens from '../utils/generateTokens';
dotenv.config();

const registerUser = async (req: Request, res: Response) => {
    try {
        const { username, password } = req.body;

        const user = await User.findOne({ username });
        if (user) {
            return res.status(409).json({ message: 'This username already exists' });
        }

        const hashPassword = await bcrypt.hash(password, 12);
        const newUser = new User({
            _id: new mongoose.Types.ObjectId(),
            username,
            password: hashPassword
        });

        const { accessToken, refreshToken } = await generateTokens(newUser);

        await newUser.save();
        res.status(201).json({ accessToken, refreshToken, userId: newUser._id.toString() });
    } catch (error) {
        serverError(error, res);
    }
};

const loginUser = async (req: Request, res: Response) => {
    try {
        const { username, password } = req.body;
        let loadedUser: IUserModel;
        const user = await User.findOne({ username });

        if (!user) {
            return res.status(401).json({ message: 'User not found.' });
        }

        loadedUser = user;
        const isEqual = await bcrypt.compare(password, user.password);

        if (!isEqual) {
            return res.status(401).json({ message: 'Wrong password' });
        }

        const { accessToken, refreshToken } = await generateTokens(user);
        res.status(200).json({ accessToken, refreshToken, userId: loadedUser._id.toString() });
    } catch (error) {
        console.log(error);
        serverError(error, res);
    }
};

export default { registerUser, loginUser };
