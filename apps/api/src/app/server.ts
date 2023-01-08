/* eslint-disable @typescript-eslint/no-unused-vars */
import express, { NextFunction, Request, Response } from 'express';
import http from 'http';
import mongoose from 'mongoose';
import { config } from './config/config';
import Logging from './utils/logging';
import * as path from 'path';
import userRoutes from './routes/User.route';
import authRoutes from './routes/Auth.route';
import sleepDataRoutes from './routes/SleepData.route';

import isAuthenticated from './middleware/is-auth';

const router = express();

//** Use static files */
router.use('/assets', express.static(path.join(__dirname, 'assets')));

/** Connect to Mongo */
export const connectDB = async () => {
    try {
        await mongoose.connect(config.mongo.url, {
            retryWrites: true,
            w: 'majority'
        });
        Logging.info('Connected');
        StartServer();
    } catch (error) {
        Logging.error('Unable to connect');
        Logging.error(error);
    }
};

/** Start server only if Mongo connects */
const StartServer = () => {
    router.use((req: Request, res: Response, next: NextFunction) => {
        /** Log the request */
        Logging.info(`Incoming -> Method: [${req.method}] - Url: [${req.url}] - IP: [${req.socket.remoteAddress}]`);

        res.on('finish', () => {
            Logging.info(
                `Incoming -> Method: [${req.method}] - Url: [${req.url}] - IP: [${req.socket.remoteAddress}] - Status [${res.statusCode}]`
            );
        });

        next();
    });

    router.use(express.urlencoded({ extended: true }));
    router.use(express.json());

    /** Api Rules */
    router.use((req: Request, res: Response, next: NextFunction) => {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');

        if (req.method == 'Options') {
            res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
            return res.status(200).json({});
        }

        next();
    });

    /** Routes */
    router.use('/api/user', userRoutes);
    router.use('/api/auth', authRoutes);
    router.use('/api/sleepData', isAuthenticated, sleepDataRoutes);

    /** Healthcheck */
    router.get('/', (req: Request, res: Response) => res.status(200).json({ message: 'pong' }));

    /** Error handling */
    router.use((req: Request, res: Response) => {
        const error = new Error('not found');
        Logging.error(error);

        return res.status(404).json({ message: error.message });
    });

    http.createServer(router).listen(config.server.port, () =>
        Logging.info(`Server is running on port ${config.server.port}`)
    );
};
