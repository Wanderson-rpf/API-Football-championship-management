import Matches from '../../database/models/Matches';

export interface IScore {
  homeTeamGoals: number;
  awayTeamGoals: number;
}

export interface IMatch {
  homeTeamId: number,
  awayTeamId: number,
  homeTeamGoals: number,
  awayTeamGoals: number,
}

export default interface IMatchesService {
  getByIdMatches(id: number): Promise<Matches>
  getAllMatches(): Promise<Matches[]>
  getMatchesInProgress(statusProgress: string): Promise<Matches[]>
  updateStatusMatches(newStatus: string, id: number): Promise<void>
  updateScoreBoardMatches(newScore: IScore, id: number): Promise<void>
  addNewMatch(newMatcher: IMatch): Promise<Matches>
}
