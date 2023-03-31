import * as jwt from 'jsonwebtoken';
import 'dotenv/config';
import { IUser } from '../services/interface/IUserService';
import IToken from './interface/IToken';

export default class Token implements IToken {
  private secret: jwt.Secret = process.env.JWT_SECRET || 'secret';
  private jwtConfig: jwt.SignOptions = {
    algorithm: 'HS256',
    expiresIn: '1d',
  };

  public generate(payload: Omit<IUser, 'password'>): string {
    try {
      const token = jwt.sign(payload, this.secret, this.jwtConfig);
      return token;
    } catch (err) {
      return (err as Error).message;
    }
  }

  public verify(token: string): jwt.JwtPayload | string | void {
    try {
      const payload = jwt.verify(token, this.secret);
      return payload;
    } catch (err) {
      return (err as Error).message;
    }
  }
}
