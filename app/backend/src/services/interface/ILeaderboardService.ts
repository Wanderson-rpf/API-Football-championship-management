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
  getAllMatchesOfTeam(idTeam: number): Promise<number>;
  getScoreTeam(idTeam: number): Promise<number>;
  getWinsTeam(idTeam: number): Promise<number>;
  getDrawsTeam(idTeam: number): Promise<number>;
  getGoalsTeam(idTeam: number): Promise<IAllGoals>;
  goalsBalance(idTeam: number): Promise<number>;
  efficiencyTeam(idTeam: number): Promise<string>
  report(): Promise<IReport[]>;
}
