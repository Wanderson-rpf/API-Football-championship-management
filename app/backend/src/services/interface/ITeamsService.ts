export interface ITeam {
  teamName: string;
}

export interface ITeamId extends ITeam {
  id: number
}

export default interface ITeamsService {
  getAllTeams(): Promise<ITeamId[]>
  getByIdTeam(id: number): Promise<ITeamId>;
}
