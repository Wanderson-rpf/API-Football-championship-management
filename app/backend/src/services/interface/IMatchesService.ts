import Matches from '../../database/models/Matches';

export default interface IMatchesService {
  getAllMatches(): Promise<Matches[]>
}
