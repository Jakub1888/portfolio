/* eslint-disable @typescript-eslint/no-var-requires */
require('dotenv').config();
import express from 'express';
import * as path from 'path';
import cors = require('cors');
const connectDB = require('./app/utils/connect');

const app = express();

app.use(cors());

app.use('/assets', express.static(path.join(__dirname, 'assets')));

app.get('/api', (req, res) => {
    res.send({ message: 'Welcome to api!' });
});

const port = process.env.port || 3333;

const start = async () => {
    try {
        // await connectDB(process.env.MONGO_URI);
        app.listen(port, () => {
            return console.log(`Listening at http://localhost:${port}/api`);
        });
    } catch (error) {
        console.log(error);
    }
};

start();
