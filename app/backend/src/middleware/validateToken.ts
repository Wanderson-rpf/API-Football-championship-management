import { NextFunction, Request, Response } from 'express';
import InvalidSignatureTokenError from '../errors/invalidSignatureTokenError';
import NotFoundTokenError from '../errors/notFoundTokenError';
import Token from '../utils/generateAndValidateToken';

const validateToken = (req: Request, res: Response, next: NextFunction) => {
  try {
    const { authorization: token } = req.headers;

    if (!token) throw new NotFoundTokenError('Token not found');
    if (token === 'token') throw new InvalidSignatureTokenError('Token must be a valid token');

    const payload = new Token().verify(token);
    res.locals.dataUser = payload;

    if (payload === 'invalid signature' || payload === 'invalid token') {
      throw new InvalidSignatureTokenError('Token must be a valid token');
    }

    next();
  } catch (error) {
    next(error);
  }
};

export default validateToken;
