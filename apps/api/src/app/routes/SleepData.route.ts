import express from 'express';
import controller from '../controllers/SleepData.controller';

const router = express.Router();

router.post('/create', controller.createSleepData);

export = router;
