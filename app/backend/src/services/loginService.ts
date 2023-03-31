import { ModelStatic } from 'sequelize';
import * as bcrypt from 'bcryptjs';
import Users from '../database/models/Users';
import IUserService, { IUserID } from './interface/IUserService';
import ILoginValidations from '../validations/login/interface/IloginValidations';
import InvalidParamError from '../errors/invalidParamError';

export default class LoginService implements IUserService {
  private _userModel: ModelStatic<Users> = Users;
  private _loginValidations: ILoginValidations;

  constructor(loginValidations: ILoginValidations) {
    this._loginValidations = loginValidations;
  }

  public async getUser(email: string, password: string): Promise<IUserID> {
    this._loginValidations.validateEmailLogin(email);
    this._loginValidations.validatePassword(password);

    const [user] = await this._userModel.findAll({
      where: { email },
    });

    if (!user) {
      throw new InvalidParamError('Invalid email or password');
    }
    if (!bcrypt.compareSync(password, user.password)) {
      throw new InvalidParamError('Invalid email or password');
    }

    return user.dataValues;
  }
}
