import { NextFunction, Request, Response } from 'express';
import ILeaderBoardService from '../services/interface/ILeaderboardService';
import ILeaderBoardController from './interface/ILeaderboardController';

export default class LeaderBoardController implements ILeaderBoardController {
  private _leaderBoardService: ILeaderBoardService;

  constructor(
    leaderBoardService: ILeaderBoardService,
  ) {
    this._leaderBoardService = leaderBoardService;
  }

  public async reportHome(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | void> {
    try {
      const report = await this._leaderBoardService.report('homeTeamId');

      return res.status(200).json(report);
    } catch (error) {
      next(error);
    }
  }

  public async reportAway(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | void> {
    try {
      const report = await this._leaderBoardService.report('awayTeamId');

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
