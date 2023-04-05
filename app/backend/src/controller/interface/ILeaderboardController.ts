import { Request, Response, NextFunction } from 'express';

export default interface ILeaderBoardController {
  reportHome(req: Request, res: Response, next: NextFunction): Promise<Response | void>
  reportAway(req: Request, res: Response, next: NextFunction): Promise<Response | void>
  generalReport(req: Request, res: Response, next: NextFunction): Promise<Response | void>
}
