import { NextFunction, Request, Response } from 'express';

export default interface IMatchesController {
  getAllMatches(req: Request, res: Response, next: NextFunction): Promise<Response | void>
  updateStatusMatches(req: Request, res: Response, next: NextFunction): Promise<Response | void>
  updateScoreBoardMatches(req: Request, res: Response, next: NextFunction): Promise<Response | void>
}
