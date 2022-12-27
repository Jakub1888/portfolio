import { connectDB } from './app/server';
import Logging from './app/utils/logging';

const start = async () => {
    try {
        await connectDB();
    } catch (error) {
        Logging.error(error);
    }
};

start();
