import ITeamValidations from './interface/ITeamValidations';
import TeamsService from '../../services/teamsService';
import NotFoundError from '../../errors/notFoundError';
import UnprocessableError from '../../errors/unprocessableError';

export default class TeamValidations implements ITeamValidations {
  teamExist = async (id: number): Promise<void> => {
    const hasTeam = await new TeamsService().getByIdTeam(id);
    if (!hasTeam) throw new NotFoundError('There is no team with such id!');
  };

  teamsToBeEqual = (teamHomeId: number, awayTeamId: number): void => {
    if (teamHomeId === awayTeamId) {
      throw new UnprocessableError('It is not possible to create a match with two equal teams');
    }
  };
}
