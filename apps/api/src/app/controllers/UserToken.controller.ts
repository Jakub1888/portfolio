import { Request, Response } from 'express';
import { serverError } from '../utils/serverError';
import jwt from 'jsonwebtoken';
import verifyRefreshToken from '../utils/verifyRefreshToken';
import UserTokenModel from '../models/UserToken.model';

const getNewToken = async (req: Request, res: Response): Promise<void> => {
    try {
        verifyRefreshToken(req.body.refreshToken)
            .then(({ tokenDetails }) => {
                const payload = {
                    username: tokenDetails.username,
                    userId: tokenDetails.userId
                };
                const accessToken = jwt.sign(payload, process.env.ACCESS_SECRET, {
                    expiresIn: process.env.ACCESS_EXPIRE
                });

                res.status(200).json({
                    accessToken,
                    message: 'Access token created successfully'
                });
            })
            .catch((error) => {
                console.log(error);
                res.status(400).json({ error });
            });
    } catch (error) {
        serverError(error, res);
    }
};

const deleteToken = async (req: Request, res: Response) => {
    try {
        const userToken = await UserTokenModel.findOne({ token: req.body.refrereshToken });

        if (!userToken) {
            return logout(res);
        }

        await userToken.remove();
        logout(res);
    } catch (error) {
        serverError(error, res);
    }
};

const logout = (res: Response) => res.status(200).json({ message: 'Logged Out Successfully' });

export default {
    getNewToken,
    deleteToken
};
