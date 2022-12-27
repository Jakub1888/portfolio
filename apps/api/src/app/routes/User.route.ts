import express from 'express';
import controller from '../controllers/User.controller';
import { Schemas, ValidateSchema } from '../middleware/ValidateSchema';

const router = express.Router();

router.get('/get/:userId', controller.readUser);
router.get('/get', controller.readAll);
router.patch('/update/:userId', ValidateSchema(Schemas.user.update), controller.updateUser);
router.delete('/delete/:userId', controller.deleteUser);

export = router;
