export interface IUser {
  username: string;
  role: string;
  email: string;
  password: string;
}

export interface IUserID extends IUser {
  id: number;
}

export default interface IUserService {
  getUser(value: string, password: string): Promise<IUser>
  verifyAuthentication(value: string): Promise<IUser>
}
