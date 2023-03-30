import { Request, Response, NextFunction } from 'express';
import ITeamsService from '../services/interface/ITeamsService';

import ITeamsController from './interface/ITeamsController';

export default class TeamsController implements ITeamsController {
  private _teamsService: ITeamsService;

  constructor(teamsService: ITeamsService) {
    this._teamsService = teamsService;
  }

  async getAllTeams(_req: Request, res: Response, _next: NextFunction): Promise<Response> {
    const allTeams = await this._teamsService.getAllTeams();
    return res.status(200).json(allTeams);
  }
}
