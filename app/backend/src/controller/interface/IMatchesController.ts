import { NextFunction, Request, Response } from 'express';

export default interface IMatchesController {
  getAllMatches(req: Request, res: Response, next: NextFunction): Promise<Response | void>
}
