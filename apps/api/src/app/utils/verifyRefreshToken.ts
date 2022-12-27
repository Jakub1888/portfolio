import jwt from 'jsonwebtoken';
import UserToken from '../models/UserToken.model';

export interface tokenObject {
    tokenDetails?: any;
    error?: any;
    message: string;
}

const verifyRefreshToken = (refreshToken: string): Promise<tokenObject> => {
    return new Promise((resolve, reject): void => {
        UserToken.findOne({ token: refreshToken }, (error, document) => {
            if (!document) {
                return reject({ error, message: 'Invalid refresh token!' });
            }

            jwt.verify(refreshToken, process.env.REFRESH_SECRET, (error, tokenDetails) => {
                if (error) {
                    return reject({ error, message: 'Invalid refresh token' });
                }

                resolve({
                    tokenDetails,
                    message: 'Valid refresh token'
                });
            });
        });
    });
};

export default verifyRefreshToken;
