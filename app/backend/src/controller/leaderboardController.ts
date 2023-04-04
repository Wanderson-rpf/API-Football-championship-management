import { NextFunction, Request, Response } from 'express';
import ILeaderBoardService from '../services/interface/ILeaderboardService';
import ILeaderBoardController from './interface/ILeaderboardController';

export default class LeaderBoardController implements ILeaderBoardController {
  private _leaderBoardService: ILeaderBoardService;

  constructor(leaderBoardService: ILeaderBoardService) {
    this._leaderBoardService = leaderBoardService;
  }

  public async report(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    try {
      const { path } = req;
      const report = await this._leaderBoardService
        .report(path === '/home' ? 'homeTeamId' : 'awayTeamId');

      return res.status(200).json(report);
    } catch (error) {
      next(error);
    }
  }

  public async generalReport(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | void> {
    try {
      const report = await this._leaderBoardService.generalReport();

      return res.status(200).json(report);
    } catch (error) {
      next(error);
    }
  }
}
