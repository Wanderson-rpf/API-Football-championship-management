import InvalidParamError from '../../errors/invalidParamError';
import ILoginValidations from './interface/IloginValidations';

export default class LoginValidations implements ILoginValidations {
  validateEmailLogin = (email: string): void => {
    const emailValidation = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    if (!emailValidation.test(email)) {
      throw new InvalidParamError('Invalid email or password');
    }
  };

  validatePassword = (password: string): void => {
    if (password.length < 6) {
      throw new InvalidParamError('Invalid email or password');
    }
  };
}
