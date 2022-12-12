import express from 'express';
import controller from '../controllers/Auth';
import { Schemas, ValidateSchema } from '../middleware/ValidateSchema';

const router = express.Router();

router.post('/register', ValidateSchema(Schemas.user.register), controller.registerUser);
router.post('/login', ValidateSchema(Schemas.user.login), controller.loginUser);

export = router;
