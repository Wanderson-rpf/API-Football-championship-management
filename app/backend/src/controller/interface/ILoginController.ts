import { NextFunction, Request, Response } from 'express';

export default interface ILoginController {
  login(req: Request, res: Response, next: NextFunction): Promise<Response | void>;
  role(req: Request, res: Response, next: NextFunction): Promise<Response | void>;
}
