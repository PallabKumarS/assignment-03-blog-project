import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { UserValidations } from '../user/user.validation';
import { AuthController } from './auth.controller';

const router = express.Router();

router.post(
  '/register',
  validateRequest(UserValidations.userValidationSchema),
  AuthController.registerUser,
);

router.post(
  '/login',
  validateRequest(UserValidations.loginValidationSchema),
  AuthController.loginUser,
);

export const AuthRoutes = router;
