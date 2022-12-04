import { connectDB } from './app/server';
import Logging from './app/library/logging';

const start = async () => {
    try {
        await connectDB();
    } catch (error) {
        Logging.error(error);
    }
};

start();
