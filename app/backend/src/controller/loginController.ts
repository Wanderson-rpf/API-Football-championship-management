import { NextFunction, Request, Response } from 'express';
import Token from '../utils/generateAndValidateToken';
import IUserService from '../services/interface/IUserService';
import ILoginController from './interface/ILoginController';

export default class LoginController implements ILoginController {
  private _loginService: IUserService;

  constructor(loginService: IUserService) {
    this._loginService = loginService;
  }

  public async login(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    try {
      const { email, password } = req.body;
      const user = await this._loginService.getUser(email, password);
      const token = new Token().generateToken(user);

      return res.status(200).json({ token });
    } catch (error) {
      next(error);
    }
  }
}
