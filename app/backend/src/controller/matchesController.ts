import { NextFunction, Request, Response } from 'express';
import IMatchesService from '../services/interface/IMatchesService';

export default class MatchesController {
  private _matchesService: IMatchesService;

  constructor(matchesService: IMatchesService) {
    this._matchesService = matchesService;
  }

  public async getAllMatches(
    _req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | void> {
    try {
      const allMatches = await this._matchesService.getAllMatches();

      return res.status(200).json(allMatches);
    } catch (error) {
      next(error);
    }
  }
}
