import { Router } from 'express';
import verifyRequiredFields from '../middleware/verifyRequiredFields';
import LoginService from '../services/loginService';
import LoginController from '../controller/loginController';

const router = Router();

const loginService = new LoginService();
const loginController = new LoginController(loginService);

router.post(
  '/login',
  verifyRequiredFields('login'),
  loginController.login.bind(loginController),
);

export default router;
