import { NextFunction, Request, Response } from 'express';
import IMatchesService from '../services/interface/IMatchesService';
import IMatchesController from './interface/IMatchesController';

export default class MatchesController implements IMatchesController {
  private _matchesService: IMatchesService;

  constructor(matchesService: IMatchesService) {
    this._matchesService = matchesService;
  }

  public async getAllMatches(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | void> {
    try {
      const { inProgress } = req.query;

      if (req.query) {
        const matches = await this._matchesService
          .getMatchesInProgress(inProgress as string);
        return res.status(200).json(matches);
      }

      const allMatches = await this._matchesService.getAllMatches();
      return res.status(200).json(allMatches);
    } catch (error) {
      next(error);
    }
  }
}
