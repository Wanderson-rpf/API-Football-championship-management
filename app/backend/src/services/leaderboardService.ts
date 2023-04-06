import { ModelStatic } from 'sequelize';
import Matches from '../database/models/Matches';
import Teams from '../database/models/Teams';
import ILeaderBoardService, { IReport, IStatistic } from './interface/ILeaderboardService';

export default class LeaderBoardService implements ILeaderBoardService {
  private _teamsModel: ModelStatic<Teams> = Teams;
  private _matchesModel: ModelStatic<Matches> = Matches;

  public async getAllTeam(): Promise<Teams[]> {
    const teams = await this._teamsModel.findAll();
    return teams;
  }

  public async getAllMatches(): Promise<Matches[]> {
    const matches = await this._matchesModel.findAll({
      where: { inProgress: false },
    });
    return matches;
  }

  static getMatchesTeam(
    idTeam: number,
    team: 'homeTeamId' | 'awayTeamId',
    matches: Matches[],
  ) {
    if (team === 'homeTeamId') {
      const countMatches = matches.map((match) => match.homeTeamId === idTeam)
        .reduce((acc, cur) => Number(acc) + Number(cur), 0);

      return countMatches;
    }
    if (team === 'awayTeamId') {
      const countMatches = matches.map((match) => match.awayTeamId === idTeam)
        .reduce((acc, cur) => Number(acc) + Number(cur), 0);

      return countMatches;
    }
  }

  static getWinsTeam(
    idTeam: number,
    team: 'homeTeamId' | 'awayTeamId',
    matches: Matches[],
  ) {
    if (team === 'homeTeamId') {
      const countWinsHome = matches.map((match) =>
        match.homeTeamGoals > match.awayTeamGoals && match.homeTeamId === idTeam)
        .reduce((acc, cur) => Number(acc) + Number(cur), 0);

      return countWinsHome;
    }
    if (team === 'awayTeamId') {
      const countWinsAway = matches.map((match) =>
        match.awayTeamGoals > match.homeTeamGoals && match.awayTeamId === idTeam)
        .reduce((acc, cur) => Number(acc) + Number(cur), 0);

      return countWinsAway;
    }
  }

  static getDrawsTeam(
    idTeam: number,
    team: 'homeTeamId' | 'awayTeamId',
    matches: Matches[],
  ) {
    if (team === 'homeTeamId') {
      const countDrawHome = matches.map((match) =>
        match.homeTeamGoals === match.awayTeamGoals && match.homeTeamId === idTeam)
        .reduce((acc, cur) => Number(acc) + Number(cur), 0);

      return countDrawHome;
    }
    if (team === 'awayTeamId') {
      const countDrawAway = matches.map((match) =>
        match.awayTeamGoals === match.homeTeamGoals && match.awayTeamId === idTeam)
        .reduce((acc, cur) => Number(acc) + Number(cur), 0);

      return countDrawAway;
    }
  }

  static getLossesTeam(
    idTeam: number,
    team: 'homeTeamId' | 'awayTeamId',
    matches: Matches[],
  ) {
    if (team === 'homeTeamId') {
      const countLossHome = matches.map((match) =>
        match.homeTeamGoals < match.awayTeamGoals && match.homeTeamId === idTeam)
        .reduce((acc, cur) => Number(acc) + Number(cur), 0);

      return countLossHome;
    }
    if (team === 'awayTeamId') {
      const countLossAway = matches.map((match) =>
        match.awayTeamGoals < match.homeTeamGoals && match.awayTeamId === idTeam)
        .reduce((acc, cur) => Number(acc) + Number(cur), 0);

      return countLossAway;
    }
  }

  static getGoalsTeam(
    idTeam: number,
    team: 'homeTeamId' | 'awayTeamId',
    matches: Matches[],
  ) {
    if (team === 'homeTeamId') {
      const goalsFavor = matches.map((match) => match.homeTeamId === idTeam && match.homeTeamGoals)
        .reduce((acc, cur) => Number(acc) + Number(cur), 0);

      const goalsOwn = matches.map((match) => match.homeTeamId === idTeam && match.awayTeamGoals)
        .reduce((acc, cur) => Number(acc) + Number(cur), 0);

      return { goalsFavor, goalsOwn };
    }
    if (team === 'awayTeamId') {
      const goalsFavor = matches.map((match) => match.awayTeamId === idTeam && match.awayTeamGoals)
        .reduce((acc, cur) => Number(acc) + Number(cur), 0);

      const goalsOwn = matches.map((match) => match.awayTeamId === idTeam && match.homeTeamGoals)
        .reduce((acc, cur) => Number(acc) + Number(cur), 0);

      return { goalsFavor, goalsOwn };
    }
  }

  static getScoreTeam(idTeam: number, team: 'homeTeamId' | 'awayTeamId', allMatches: Matches[]) {
    const matches = LeaderBoardService.getMatchesTeam(idTeam, team, allMatches) as number;
    const wins = LeaderBoardService.getWinsTeam(idTeam, team, allMatches) as number;
    const draw = LeaderBoardService.getDrawsTeam(idTeam, team, allMatches) as number;
    const loss = LeaderBoardService.getLossesTeam(idTeam, team, allMatches) as number;
    const score = ((matches - draw - loss) * 3) + (matches - wins - loss);

    return score;
  }

  static goalsBalance(idTeam: number, team: 'homeTeamId' | 'awayTeamId', allMatches: Matches[]) {
    const goals = LeaderBoardService.getGoalsTeam(idTeam, team, allMatches);
    const goalsBalance = Number(goals?.goalsFavor) - Number(goals?.goalsOwn);

    return goalsBalance;
  }

  static efficiencyTeam(
    idTeam: number,
    team: 'homeTeamId' | 'awayTeamId',
    allMatches: Matches[],
  ) {
    const score = LeaderBoardService.getScoreTeam(idTeam, team, allMatches);
    const matches = LeaderBoardService.getMatchesTeam(idTeam, team, allMatches) as number;
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
    const allMatches = await this.getAllMatches();

    const report = await Promise.all(allTeams.map(async (team) => ({
      name: team.teamName,
      totalPoints: LeaderBoardService.getScoreTeam(team.id, teamHomeOrAway, allMatches),
      totalGames: LeaderBoardService.getMatchesTeam(team.id, teamHomeOrAway, allMatches) as number,
      totalVictories: LeaderBoardService.getWinsTeam(team.id, teamHomeOrAway, allMatches) as number,
      totalDraws: LeaderBoardService.getDrawsTeam(team.id, teamHomeOrAway, allMatches) as number,
      totalLosses: LeaderBoardService.getLossesTeam(team.id, teamHomeOrAway, allMatches) as number,
      goalsFavor: LeaderBoardService.getGoalsTeam(team.id, teamHomeOrAway, allMatches)
        ?.goalsFavor as number,
      goalsOwn: LeaderBoardService.getGoalsTeam(team.id, teamHomeOrAway, allMatches)
        ?.goalsOwn as number,
      goalsBalance: LeaderBoardService.goalsBalance(team.id, teamHomeOrAway, allMatches),
      efficiency: LeaderBoardService.efficiencyTeam(team.id, teamHomeOrAway, allMatches),
    })));

    const reportSorted = LeaderBoardService.sortReport(report);
    return reportSorted;
  }

  static calcEfficiency(score: number, matches: number) {
    const efficiency = (score / (matches * 3)) * 100;
    return efficiency.toFixed(2);
  }

  static calcGoalsBalance(GP: number, GC: number) {
    const balance = GP - GC;
    return balance.toFixed(2);
  }

  // Function created due to a lint error in the generalReport() method.
  private async calcEfficientAndGoalsBalance() {
    const dataInHome = await this.report('homeTeamId');
    const dataInAway = await this.report('awayTeamId');

    const resumeStatisticTeams = dataInHome.map((teamHome) => {
      const dataAway = dataInAway.find((teamAway) => teamHome.name === teamAway.name) as IStatistic;
      return {
        goalsBalance: LeaderBoardService.calcGoalsBalance(
          teamHome.goalsFavor + dataAway.goalsFavor,
          teamHome.goalsOwn + dataAway.goalsOwn,
        ),
        efficiency: LeaderBoardService.calcEfficiency(
          teamHome.totalPoints + dataAway.totalPoints,
          teamHome.totalGames + dataAway.totalGames,
        ),
      };
    });

    return resumeStatisticTeams;
  }

  public async generalReport(): Promise<IReport[]> {
    const dataInHome = await this.report('homeTeamId');
    const dataInAway = await this.report('awayTeamId');
    const statistic = await this.calcEfficientAndGoalsBalance();

    return LeaderBoardService.sortReport(dataInHome.map((teamHome, index) => {
      const dataAway = dataInAway.find((teamAway) => teamHome.name === teamAway.name) as IReport;
      return {
        name: teamHome.name,
        totalPoints: teamHome.totalPoints + dataAway.totalPoints,
        totalGames: teamHome.totalGames + dataAway.totalGames,
        totalVictories: teamHome.totalVictories + dataAway.totalVictories,
        totalDraws: teamHome.totalDraws + dataAway.totalDraws,
        totalLosses: teamHome.totalLosses + dataAway.totalLosses,
        goalsFavor: teamHome.goalsFavor + dataAway.goalsFavor,
        goalsOwn: teamHome.goalsOwn + dataAway.goalsOwn,
        goalsBalance: Number(statistic[index].goalsBalance),
        efficiency: statistic[index].efficiency,
      };
    }));
  }
}
