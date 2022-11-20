import mongoose from 'mongoose';

const connectDB = (url: string) => {
    return mongoose.connect(url).then((res) => console.log(res));
};

module.exports = connectDB;
