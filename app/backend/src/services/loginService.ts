import { ModelStatic } from 'sequelize';
import Users from '../database/models/Users';
import IUserService, { IUserID } from './interface/IUserService';

export default class LoginService implements IUserService {
  private _userModel: ModelStatic<Users> = Users;

  public async getUser(email: string): Promise<IUserID> {
    const [user] = await this._userModel.findAll({
      where: { email },
    });

    if (!user) throw new Error('Email not found.');

    return user.dataValues;
  }
}
