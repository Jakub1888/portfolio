import express from 'express';
import controller from '../controllers/Auth';

import { Schemas, ValidateSchema } from '../middleware/ValidateSchema';

const router = express.Router();

router.put('/signup', ValidateSchema(Schemas.user.create), controller.signup);

export = router;
