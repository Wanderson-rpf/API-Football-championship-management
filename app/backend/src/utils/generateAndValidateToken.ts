import * as jwt from 'jsonwebtoken';
import 'dotenv/config';
import { IUser } from '../services/interface/IUserService';

export default class Token {
  private secret: jwt.Secret = process.env.JWT_SECRET || 'secret';
  private jwtConfig: jwt.SignOptions = {
    algorithm: 'HS256',
    expiresIn: '1d',
  };

  public generateToken(payload: Omit<IUser, 'password'>): string {
    try {
      const token = jwt.sign(payload, this.secret, this.jwtConfig);
      return token;
    } catch (err) {
      return (err as Error).message;
    }
  }
}
