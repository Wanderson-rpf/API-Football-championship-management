import Teams from '../../database/models/Teams';

export interface IAllGoals {
  goalsFavor: number;
  goalsOwn: number;
}

export interface IReport {
  name: string,
  totalPoints: number,
  totalGames: number,
  totalVictories: number,
  totalDraws: number,
  totalLosses: number,
  goalsFavor: number,
  goalsOwn: number,
  goalsBalance: number,
  efficiency: string,
}

export default interface ILeaderBoardService {
  getAllTeam(): Promise<Teams[]>;
  getAllMatchesOfTeam(idTeam: number, team: string): Promise<number>;
  getScoreTeam(idTeam: number, team: 'homeTeamId' | 'awayTeamId'): Promise<number>;
  getWinsTeam(idTeam: number, team: 'homeTeamId' | 'awayTeamId'): Promise<number>;
  getDrawsTeam(idTeam: number, team: 'homeTeamId' | 'awayTeamId'): Promise<number>;
  getLossesTeam(idTeam: number, team: 'homeTeamId' | 'awayTeamId'): Promise<number>
  getGoalsTeam(idTeam: number, team: 'homeTeamId' | 'awayTeamId'): Promise<IAllGoals>;
  goalsBalance(idTeam: number, team: 'homeTeamId' | 'awayTeamId'): Promise<number>;
  efficiencyTeam(idTeam: number, team: 'homeTeamId' | 'awayTeamId'): Promise<string>
  report(teamHomeOrAway: string): Promise<IReport[]>;
}
