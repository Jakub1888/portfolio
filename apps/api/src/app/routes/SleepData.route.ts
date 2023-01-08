import express from 'express';
import controller from '../controllers/SleepData.controller';
import { Schemas, ValidateSchema } from '../middleware/ValidateSchema';

const router = express.Router();

router.post('/create', ValidateSchema(Schemas.sleepData.create), controller.createSleepData);
router.patch('/patch', ValidateSchema(Schemas.sleepData.update), controller.updateSleepData);
router.delete('/delete', ValidateSchema(Schemas.sleepData.delete), controller.deleteSleepData);
router.get('/getAll', controller.getAllSleepData);
router.get('/getAverages/:limit', controller.getAverageSleepData);
router.get('/get/:dateOfSleep', controller.getSleepData);

export = router;
