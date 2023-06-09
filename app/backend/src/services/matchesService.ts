import { ModelStatic } from 'sequelize';
import Teams from '../database/models/Teams';
import Matches from '../database/models/Matches';
import IMatchesService, { IMatch, IScore } from './interface/IMatchesService';
import ITeamValidations from '../validations/team/interface/ITeamValidations';
import NotFoundError from '../errors/notFoundError';

export default class MatchesService implements IMatchesService {
  private _matchesModel: ModelStatic<Matches> = Matches;
  private _teamValidations: ITeamValidations;

  constructor(teamValidations: ITeamValidations) {
    this._teamValidations = teamValidations;
  }

  public async getByIdMatches(id: number): Promise<Matches> {
    const match = await this._matchesModel.findByPk(id);

    if (!match) throw new NotFoundError('Match not found');
    return match.dataValues;
  }

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

  public async getMatchesInProgress(progress: string): Promise<Matches[]> {
    if (progress !== 'true' && progress !== 'false') throw new Error('Invalid parameter');

    const inProgress = progress === 'true' ? 1 : 0;

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
    await this.getByIdMatches(id);
    await this._matchesModel.update({ inProgress: newStatus }, { where: { id } });
  }

  public async updateScoreBoardMatches(newScore: IScore, id: number): Promise<void> {
    await this.getByIdMatches(id);
    await this._matchesModel.update({
      homeTeamGoals: newScore.homeTeamGoals,
      awayTeamGoals: newScore.awayTeamGoals,
    }, { where: { id } });
  }

  public async addNewMatch(newMatch: IMatch): Promise<Matches> {
    await this._teamValidations.teamExist(newMatch.homeTeamId);
    await this._teamValidations.teamExist(newMatch.awayTeamId);
    this._teamValidations.teamsToBeEqual(newMatch.homeTeamId, newMatch.awayTeamId);

    const matchInserted = await this._matchesModel.create(
      { ...newMatch, inProgress: true },
    );

    return matchInserted;
  }
}
