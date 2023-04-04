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

  public async getAllMatchesOfTeam(
    idTeam: number,
    team: 'homeTeamId' | 'awayTeamId',
  ): Promise<number> {
    const allMatchesOfTeam = await this._matchesModel.count({
      where: {
        inProgress: 0,
        [team]: idTeam,
      },
    });

    return allMatchesOfTeam;
  }

  public async getWinsTeam(idTeam: number, team: 'homeTeamId' | 'awayTeamId'): Promise<number> {
    const baseGoals = team === 'homeTeamId' ? 'homeTeamGoals' : 'awayTeamGoals';
    const compareGoals = team === 'homeTeamId' ? 'away_team_goals' : 'home_team_goals';
    const wins = await this._matchesModel.count({
      where: {
        inProgress: 0,
        [baseGoals]: { [Op.gt]: sequelize.col(compareGoals) },
        [team]: idTeam,
      },
      distinct: true,
      col: 'id',
    });

    return wins;
  }

  public async getDrawsTeam(idTeam: number, team: 'homeTeamId' | 'awayTeamId'): Promise<number> {
    const baseGoals = team === 'homeTeamId' ? 'homeTeamGoals' : 'awayTeamGoals';
    const compareGoals = team === 'homeTeamId' ? 'away_team_goals' : 'home_team_goals';
    const draws = await this._matchesModel.count({
      where: {
        inProgress: 0,
        [baseGoals]: { [Op.eq]: sequelize.col(compareGoals) },
        [team]: idTeam,
      },
      distinct: true,
      col: 'id',
    });

    return draws;
  }

  public async getLossesTeam(idTeam: number, team: 'homeTeamId' | 'awayTeamId'): Promise<number> {
    const baseGoals = team === 'homeTeamId' ? 'homeTeamGoals' : 'awayTeamGoals';
    const compareGoals = team === 'homeTeamId' ? 'away_team_goals' : 'home_team_goals';
    const draws = await this._matchesModel.count({
      where: {
        inProgress: 0,
        [baseGoals]: { [Op.lt]: sequelize.col(compareGoals) },
        [team]: idTeam,
      },
      distinct: true,
      col: 'id',
    });

    return draws;
  }

  public async getGoalsTeam(idTeam: number, team: 'homeTeamId' | 'awayTeamId'): Promise<IAllGoals> {
    const goalsF = team === 'homeTeamId' ? 'home_team_goals' : 'away_team_goals';
    const goalsO = team === 'homeTeamId' ? 'away_team_goals' : 'home_team_goals';
    const goalsFavor = await this._matchesModel.sum(goalsF, {
      where: {
        inProgress: 0,
        [team]: idTeam,
      },
    });
    const goalsOwn = await this._matchesModel.sum(goalsO, {
      where: {
        inProgress: 0,
        [team]: idTeam,
      },
    });
    const allGoals = { goalsFavor, goalsOwn };

    return allGoals;
  }

  public async getScoreTeam(idTeam: number, team: 'homeTeamId' | 'awayTeamId'): Promise<number> {
    const matches = await this.getAllMatchesOfTeam(idTeam, team);
    const wins = await this.getWinsTeam(idTeam, team);
    const draw = await this.getDrawsTeam(idTeam, team);
    const loss = await this.getLossesTeam(idTeam, team);

    const score = ((matches - draw - loss) * 3) + (matches - wins - loss);

    return score;
  }

  public async goalsBalance(idTeam: number, team: 'homeTeamId' | 'awayTeamId'): Promise<number> {
    const { goalsFavor } = await this.getGoalsTeam(idTeam, team);
    const { goalsOwn } = await this.getGoalsTeam(idTeam, team);
    const goalsBalance = goalsFavor - goalsOwn;

    return goalsBalance;
  }

  public async efficiencyTeam(idTeam: number, team: 'homeTeamId' | 'awayTeamId'): Promise<string> {
    const score = await this.getScoreTeam(idTeam, team);
    const matches = await this.getAllMatchesOfTeam(idTeam, team);
    const efficiency = (score / (matches * 3)) * 100;

    return efficiency.toFixed(2);
  }

  static sortReport(array: Array<IReport>) {
    return array.sort((a, b) => {
      if (a.totalPoints !== b.totalPoints) {
        return b.totalPoints - a.totalPoints;
      }
      if (a.goalsBalance !== b.goalsBalance) {
        return b.goalsBalance - a.goalsBalance;
      }
      return b.goalsFavor - a.goalsFavor;
    });
  }

  public async report(teamHomeOrAway: 'homeTeamId' | 'awayTeamId'): Promise<IReport[]> {
    const allTeams = await this.getAllTeam();

    const report = await Promise.all(allTeams.map(async (team) => ({
      name: team.teamName,
      totalPoints: await this.getScoreTeam(team.id, teamHomeOrAway),
      totalGames: await this.getAllMatchesOfTeam(team.id, teamHomeOrAway),
      totalVictories: await this.getWinsTeam(team.id, teamHomeOrAway),
      totalDraws: await this.getDrawsTeam(team.id, teamHomeOrAway),
      totalLosses: await this.getLossesTeam(team.id, teamHomeOrAway),
      goalsFavor: (await this.getGoalsTeam(team.id, teamHomeOrAway)).goalsFavor,
      goalsOwn: (await this.getGoalsTeam(team.id, teamHomeOrAway)).goalsOwn,
      goalsBalance: await this.goalsBalance(team.id, teamHomeOrAway),
      efficiency: await this.efficiencyTeam(team.id, teamHomeOrAway),
    })));

    const reportSorted = LeaderBoardService.sortReport(report);
    return reportSorted;
  }
}
