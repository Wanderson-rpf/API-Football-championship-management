import { NextFunction, Request, Response } from 'express';
import Token from '../utils/generateToken';
import IUserService from '../services/interface/IUserService';

export default class LoginController {
  private _loginService: IUserService;

  constructor(loginService: IUserService) {
    this._loginService = loginService;
  }

  public async login(req: Request, res: Response, _next: NextFunction): Promise<Response> {
    try {
      const { email } = req.body;
      const user = await this._loginService.getUser(email);
      const token = new Token().generateToken(user);

      return res.status(200).json({ token });
    } catch (error) {
      return res.status(500).json({ message: (error as Error).message });
    }
  }
}
