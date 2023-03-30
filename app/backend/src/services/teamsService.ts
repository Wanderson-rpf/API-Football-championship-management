import { ModelStatic } from 'sequelize';
import Teams from '../database/models/Teams';
import ITeamsService, { ITeamId } from './interface/ITeamsService';

export default class TeamsService implements ITeamsService {
  private teamsModel: ModelStatic<Teams> = Teams;

  public async getAllTeams(): Promise<ITeamId[]> {
    const allTeams = await this.teamsModel.findAll();
    return allTeams;
  }

  public async getByIdTeam(id: number): Promise<ITeamId> {
    const [team] = await this.teamsModel.findAll({
      where: { id },
    });
    return team;
  }
}
