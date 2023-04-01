import { Router } from 'express';
import verifyRequiredFields from '../middleware/verifyRequiredFields';
import LoginService from '../services/loginService';
import LoginController from '../controller/loginController';
import LoginValidations from '../validations/login/loginValidations';
import validateToken from '../middleware/validateToken';

const router = Router();

const loginValidations = new LoginValidations();
const loginService = new LoginService(loginValidations);
const loginController = new LoginController(loginService);

router.post(
  '/',
  verifyRequiredFields('login'),
  loginController.login.bind(loginController),
)
  .get(
    '/role',
    validateToken,
    loginController.role.bind(loginController),
  );

export default router;
