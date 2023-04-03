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
}

export default interface ILeaderBoardService {
  getAllTeam(): Promise<Teams[]>;
  getAllMatchesOfTeam(idTeam: number): Promise<number>;
  getScoreTeam(idTeam: number): Promise<number>;
  getWinsTeam(idTeam: number): Promise<number>;
  getDrawsTeam(idTeam: number): Promise<number>;
  getGoalsTeam(idTeam: number): Promise<IAllGoals>;
  report(): Promise<IReport[]>;
}
