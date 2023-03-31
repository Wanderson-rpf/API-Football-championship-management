import { ModelStatic } from 'sequelize';
import Teams from '../database/models/Teams';
import Matches from '../database/models/Matches';
import IMatchesService from './interface/IMatchesService';

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
}
