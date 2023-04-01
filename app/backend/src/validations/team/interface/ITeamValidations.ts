export default interface ITeamValidations {
  teamExist(id: number): Promise<void>;
  teamsToBeEqual(teamHomeId: number, awayTeamId: number): void
}
