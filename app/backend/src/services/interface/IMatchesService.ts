import Matches from '../../database/models/Matches';

export interface IScore {
  homeTeamGoals: number;
  awayTeamGoals: number;
}

export default interface IMatchesService {
  getAllMatches(): Promise<Matches[]>
  getMatchesInProgress(statusProgress: string): Promise<Matches[]>
  updateStatusMatches(newStatus: string, id: number): Promise<void>
  updateScoreBoardMatches(newScore: IScore, id: number): Promise<void>
}
