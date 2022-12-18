import express from 'express';
import controller from '../controllers/SleepData';

const router = express.Router();

router.post('/create', controller.createSleepData);

export = router;
