import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

export default (req: any, res: Response, next: NextFunction) => {
    const authHeader = req.get('Authorization');

    if (!authHeader) {
        return res.status(401).json({ error: 'Not Authenticated' });
    }
    const token = req.get('Authorization').split(' ')[1];
    let decodedToken;

    try {
        decodedToken = jwt.verify(token, 'secret'); // TODO change secret
    } catch (error) {
        if (!decodedToken) {
            return res.status(401).json({ error: 'Not Authenticated' });
        }
        return res.status(500).json({ error });
    }

    req.userId = decodedToken.userId;
    next();
};
