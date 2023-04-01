import { ModelStatic } from 'sequelize';
import Teams from '../database/models/Teams';
import Matches from '../database/models/Matches';
import IMatchesService, { IScore } from './interface/IMatchesService';

export default class MatchesService implements IMatchesService {
  private _matchesModel: ModelStatic<Matches> = Matches;

  public async getAllMatches(): Promise<Matches[]> {
    const allMatches = await this._matchesModel.findAll({
      include: [
        {
          model: Teams,
          as: 'homeTeam',
          attributes: ['teamName'],
        },
        {
          model: Teams,
          as: 'awayTeam',
          attributes: ['teamName'],
        },
      ],
    });
    return allMatches;
  }

  public async getMatchesInProgress(statusProgress: string): Promise<Matches[]> {
    const inProgress = statusProgress === 'true' ? 1 : 0;

    const matchesInProgress = await this._matchesModel.findAll({
      where: { inProgress },
      include: [
        {
          model: Teams,
          as: 'homeTeam',
          attributes: ['teamName'],
        },
        {
          model: Teams,
          as: 'awayTeam',
          attributes: ['teamName'],
        },
      ],
    });
    return matchesInProgress;
  }

  public async updateStatusMatches(newStatus: string, id: number): Promise<void> {
    await this._matchesModel.update({ inProgress: newStatus }, { where: { id } });
  }

  public async updateScoreBoardMatches(newScore: IScore, id: number): Promise<void> {
    await this._matchesModel.update({
      homeTeamGoals: newScore.homeTeamGoals,
      awayTeamGoals: newScore.awayTeamGoals,
    }, { where: { id } });
  }
}
