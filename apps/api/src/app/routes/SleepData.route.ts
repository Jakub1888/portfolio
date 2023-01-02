import express from 'express';
import controller from '../controllers/SleepData.controller';

const router = express.Router();

router.post('/create', controller.createSleepData);
router.patch('/patch', controller.updateSleepData);
router.delete('/delete', controller.deleteSleepData);
router.get('/getAll', controller.getAllSleepData);
router.get('/getAverages', controller.getAverageSleepData);
router.get('/get/:dateOfSleep', controller.getSleepData);

export = router;
