import Matches from '../../database/models/Matches';

export default interface IMatchesService {
  getAllMatches(): Promise<Matches[]>
  getMatchesInProgress(inProgress: string): Promise<Matches[]>
}
