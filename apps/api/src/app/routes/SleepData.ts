import express from 'express';
import controller from '../controllers/SleepData';
import { Schemas, ValidateSchema } from '../middleware/ValidateSchema';

const router = express.Router();

router.post('/create', controller.createSleepData);

export = router;
