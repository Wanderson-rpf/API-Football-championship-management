import { Request, Response, NextFunction } from 'express';
import ITeamsService from '../services/interface/ITeamsService';

import ITeamsController from './interface/ITeamsController';

export default class TeamsController implements ITeamsController {
  private _teamsService: ITeamsService;

  constructor(teamsService: ITeamsService) {
    this._teamsService = teamsService;
  }

  public async getAllTeams(_req: Request, res: Response, _next: NextFunction): Promise<Response> {
    const allTeams = await this._teamsService.getAllTeams();
    return res.status(200).json(allTeams);
  }

  public async getByIdTeam(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const team = await this._teamsService.getByIdTeam(Number(id));
    return res.status(200).json(team);
  }
}
