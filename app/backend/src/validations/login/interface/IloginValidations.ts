export default interface ILoginValidations {
  validateEmailLogin(email: string): void;
  validatePassword(password: string): void;
}
