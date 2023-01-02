import jwt from 'jsonwebtoken';
import UserToken from '../models/UserToken.model';

const generateTokens = async (user: any) => {
    try {
        const payload = {
            username: user.username,
            userId: user._id.toString()
        };

        const accessToken = jwt.sign(payload, process.env.ACCESS_SECRET, { expiresIn: process.env.ACCESS_EXPIRE }); //
        const refreshToken = jwt.sign(payload, process.env.REFRESH_SECRET, { expiresIn: process.env.REFRESH_EXPIRE });

        const userToken = await UserToken.findOne({ userId: user._id });
        if (userToken) await userToken.remove();

        await new UserToken({ userId: user._id, token: refreshToken }).save();
        return Promise.resolve({ accessToken, refreshToken });
    } catch (error) {
        return Promise.reject(error);
    }
};

export default generateTokens;
