import { NextFunction, Request, Response } from 'express';

export default interface ITeamsController {
  getAllTeams(req: Request, res: Response, next: NextFunction): Promise<Response>
  getByIdTeam(req: Request, res: Response, next: NextFunction): Promise<Response>
}
