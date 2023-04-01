import Matches from '../../database/models/Matches';

export default interface IMatchesService {
  getAllMatches(): Promise<Matches[]>
  getMatchesInProgress(statusProgress: string): Promise<Matches[]>
  updateStatusMatches(newStatus: string, id: number): Promise<void>
}
