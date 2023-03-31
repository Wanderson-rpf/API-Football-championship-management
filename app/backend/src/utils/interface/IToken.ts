import * as Jwt from 'jsonwebtoken';
import { IUser } from '../../services/interface/IUserService';

export default interface IToken {
  generate(payload: Omit<IUser, 'password'>): string;
  verify(token: string): Jwt.JwtPayload | string | void;
}
