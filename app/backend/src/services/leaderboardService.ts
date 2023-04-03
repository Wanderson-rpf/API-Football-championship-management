import { Op, ModelStatic } from 'sequelize';
import sequelize = require('sequelize');
import Matches from '../database/models/Matches';
import Teams from '../database/models/Teams';
import ILeaderBoardService, { IAllGoals, IReport } from './interface/ILeaderboardService';

export default class LeaderBoardService implements ILeaderBoardService {
  private _teamsModel: ModelStatic<Teams> = Teams;
  private _matchesModel: ModelStatic<Matches> = Matches;

  public async getAllTeam(): Promise<Teams[]> {
    const teams = await this._teamsModel.findAll();
    return teams;
  }

  public async getAllMatchesOfTeam(idTeam: number): Promise<number> {
    const allMatchesOfTeam = await this._matchesModel.count({
      where: {
        inProgress: 0,
        homeTeamId: idTeam,
      },
    });

    return allMatchesOfTeam;
  }

  public async getWinsTeam(idTeam: number): Promise<number> {
    const wins = await this._matchesModel.count({
      where: {
        inProgress: 0,
        homeTeamGoals: { [Op.gt]: sequelize.col('away_team_goals') },
        homeTeamId: idTeam,
      },
      distinct: true,
      col: 'id',
    });

    return wins;
  }

  public async getDrawsTeam(idTeam: number): Promise<number> {
    const draws = await this._matchesModel.count({
      where: {
        inProgress: 0,
        homeTeamGoals: { [Op.eq]: sequelize.col('away_team_goals') },
        homeTeamId: idTeam,
      },
      distinct: true,
      col: 'id',
    });

    return draws;
  }

  public async getLossesTeam(idTeam: number): Promise<number> {
    const draws = await this._matchesModel.count({
      where: {
        inProgress: 0,
        homeTeamGoals: { [Op.lt]: sequelize.col('away_team_goals') },
        homeTeamId: idTeam,
      },
      distinct: true,
      col: 'id',
    });

    return draws;
  }

  public async getGoalsTeam(idTeam: number): Promise<IAllGoals> {
    const goalsFavorInHome = await this._matchesModel.sum('home_team_goals', {
      where: {
        inProgress: 0,
        homeTeamId: idTeam,
      },
    });

    const goalsOwnInHome = await this._matchesModel.sum('away_team_goals', {
      where: {
        inProgress: 0,
        homeTeamId: idTeam,
      },
    });

    const allGoals = {
      goalsFavor: goalsFavorInHome,
      goalsOwn: goalsOwnInHome,
    };

    return allGoals;
  }

  public async getScoreTeam(idTeam: number): Promise<number> {
    const matches = await this.getAllMatchesOfTeam(idTeam);
    const wins = await this.getWinsTeam(idTeam);
    const draw = await this.getDrawsTeam(idTeam);
    const loss = await this.getLossesTeam(idTeam);

    const score = ((matches - draw - loss) * 3) + (matches - wins - loss);

    return score;
  }

  public async report(): Promise<IReport[]> {
    const allTeams = await this.getAllTeam();

    const report = await Promise.all(allTeams.map(async (team) => ({
      name: team.teamName,
      totalPoints: await this.getScoreTeam(team.id),
      totalGames: await this.getAllMatchesOfTeam(team.id),
      totalVictories: await this.getWinsTeam(team.id),
      totalDraws: await this.getDrawsTeam(team.id),
      totalLosses: await this.getLossesTeam(team.id),
      goalsFavor: (await this.getGoalsTeam(team.id)).goalsFavor,
      goalsOwn: (await this.getGoalsTeam(team.id)).goalsOwn,
    })));

    return report;
  }
}
