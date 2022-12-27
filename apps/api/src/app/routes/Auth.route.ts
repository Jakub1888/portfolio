import express from 'express';
import authController from '../controllers/Auth.controller';
import userTokenController from '../controllers/UserToken.controller';
import { Schemas, ValidateSchema } from '../middleware/ValidateSchema';

const router = express.Router();

router.post('/register', ValidateSchema(Schemas.user.register), authController.registerUser);
router.post('/login', ValidateSchema(Schemas.user.login), authController.loginUser);
router.post('/refreshToken', userTokenController.getNewToken);
router.delete('/logout', userTokenController.deleteToken);

export = router;
